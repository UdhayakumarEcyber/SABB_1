import * as React from "react";
import {useState} from 'react';
import { Button, DataGrid, WidgetWrapper, TitleBar, FormField, Select, DataList } from 'uxp/components';
import { IContextProvider } from '../uxp';
import '../styles.scss';


import afterhours from  '../json/afterhours.json'

interface IAfterHoursProps {
    uxpContext?: IContextProvider
}

const AfterHours: React.FunctionComponent<IAfterHoursProps> = (props) => {

    let { uxpContext } = props;
    let [sectionAfterHours, setsectionAfterHours] = React.useState<any>([]);
    let [afterhoursData,setafterhoursData]=React.useState<any>([])
    let [afterhoursColorData,setafterhoursColorData]=React.useState<any>([])
    let MaxIndex, offset = 5;
    let [upArrowStartIndex, setupArrowStartIndex] =  useState(0);
    let [upArrowMaxIndex, setupArrowMaxIndex] =  useState(0);
    let [downArrowEndIndex, setdownArrowEndIndex] =  useState(0);
    let [downArrowMaxIndex, setdownArrowMaxIndex] =  useState(0);    

    React.useEffect(()=>{
        getAfterHours()
    },[]);

    async function getAfterHours() {
        // let cdataa = await props.uxpContext.executeAction('AdaniDashboard','AfterHours',{json:true});
        // console.log('helo', cdataa)
       // let cd=JSON.parse(cdataa);
        setsectionAfterHours(afterhours.AfterHours);
        const StartIndex = 0, EndIndex = 5;
        afterhoursFun(StartIndex, EndIndex, afterhours.AfterHours); 
        
    }


    function fnAfterHoursDown(CurrentIndex:number, MaxIndex:number) {   
        let StartIndex = 0;
        let EndIndex = 5;

        if (CurrentIndex + offset < MaxIndex) {
            StartIndex = CurrentIndex;
            EndIndex = StartIndex + offset;
        }
        else {
            StartIndex = CurrentIndex;
            EndIndex = MaxIndex;
        }
        afterhoursFun(StartIndex, EndIndex, sectionAfterHours);

    }

    function fnAfterHoursUp(CurrentIndex:number, MaxIndex:number) { 
        
        let StartIndex = 0;
        let EndIndex = 5;

        if (CurrentIndex - offset > 0) {
            EndIndex = CurrentIndex;
            StartIndex = EndIndex - offset;
        }
        else {
            EndIndex = CurrentIndex;
            StartIndex = 0;
        }
        afterhoursFun(StartIndex, EndIndex, sectionAfterHours);
    }
    
    function afterhoursFun(StartIndex:number, EndIndex:number, ahdata:Array<any>) {
        let cdata = ahdata;
        MaxIndex = (cdata.length);
        let AfterTotal = 0;
        afterhoursData = `<div class="afterhours_tree"> `
        if(StartIndex!=0){
            setupArrowStartIndex(StartIndex);      
            setupArrowMaxIndex(MaxIndex);
            var element = document.getElementById("topArrowAfterhours");
            element.classList.remove("hide");
        } else {
            var element = document.getElementById("topArrowAfterhours");
            element.classList.add("hide");
        }
        afterhoursData = afterhoursData +` <ul>`

        for (var i = StartIndex; i < EndIndex; i++) {
            afterhoursData = afterhoursData + 
                            `<li>                                    
                                <p> ` + cdata[i].DepartmentName + ` 
                                    <span class="` + cdata[i].DepartmentName + `">` + cdata[i].TotalHours + `</span>
                                </p>   
                            </li>`
            AfterTotal = AfterTotal + parseInt(cdata[i].Value);
        }

        afterhoursData = afterhoursData + `</ul>`
        if(EndIndex!=MaxIndex){            
            setdownArrowEndIndex(EndIndex);
            setdownArrowMaxIndex(MaxIndex);
            var element = document.getElementById("downArrowAfterhours");
            element.classList.remove("hide");
        } else {
            var element = document.getElementById("downArrowAfterhours");
            element.classList.add("hide");
        }
        afterhoursData = afterhoursData + `</div>`;

        let afterhoursDataColor = `<div class="color_value">              
                  <ul>`
                    for (var i = StartIndex; i < EndIndex; i++) {
                        afterhoursColorData = Math.round((parseInt(cdata[i].Value) / AfterTotal) * 100);
                        afterhoursDataColor = afterhoursDataColor + `<li class="` + cdata[i].DepartmentName + `" style="width : ` + afterhoursColorData + `%"></li>`
                    }
                    
                    afterhoursDataColor = afterhoursDataColor + `</ul>                        
                </div>`;

        setafterhoursData(afterhoursData);
        setafterhoursColorData(afterhoursDataColor);
    }

    return (<WidgetWrapper className="uxp-drag-handler">
        <TitleBar title="After Hours A/C Utilization" icon="https://static.iviva.com/images/Adani_UXP/afterhours-icon.svg"></TitleBar>

        <div className="body">
            <div className='afterhours_inner_widget'>
                <div id="topArrowAfterhours" className="afterhours-arrow" onClick={() => fnAfterHoursUp(upArrowStartIndex,upArrowMaxIndex)}></div>
                <div className="afterhours_data" dangerouslySetInnerHTML={{__html: afterhoursData }}></div>
                <div className="afterhours_data_color" dangerouslySetInnerHTML={{__html: afterhoursColorData }}></div>
                <div id="downArrowAfterhours" className="afterhours-arrow" onClick= {() => fnAfterHoursDown(downArrowEndIndex,downArrowMaxIndex)}></div>
            </div>
        </div>
        
    </WidgetWrapper>)

}

export default AfterHours;
