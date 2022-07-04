import * as React from "react";
import { TitleBar,  WidgetWrapper,DataList } from "uxp/components";
import { IContextProvider } from '../uxp';
import '../styles.scss';


import SeatBookingDetails from  '../json/hotDeskingInitData.json'
 import hotDeskingLoadData from  '../json/hotDeskingLoadData.json'
//import hotDeskingLoadData1 from  '../json/hotDeskingLoadData1.json'

interface IHotDeskingeProps {
    uxpContext?: IContextProvider
}

const HotDesking:React.FunctionComponent<IHotDeskingeProps> = (props) => {

    let [initData, setinitData] = React.useState<any>([]);
    React.useEffect(()=>{
        getHotDesking();
    },[]);
	
async function getHotDesking() {
        // let data = await props.uxpContext.executeAction('AdaniDashboard','HotDeskingInitData',{json:true});
        // var fData = JSON.parse(data);
        //HotDeskingInitData(fData);

        HotDeskingInitData(SeatBookingDetails);

        
    }

    function HotDeskingInitData(value:any){
        setinitData(value);
        var selVal=0, wings:any;
        value.Wings.forEach((v:any)=>{ 
            if(v.IsSelected==1)
            selVal=v.WingLocName;
            if(wings !=undefined)
            wings += `<option value="`+ v.WingLocName +`">`+ v.WingFullName +`</option>`
            else wings = `<option value="`+ v.WingLocName +`">`+ v.WingFullName +`</option>`
        })
        document.querySelector('#hotdeskingService').innerHTML = wings;
        wings = undefined;
        // $("#hotdeskingService option[value='"+ selVal +"']").attr("selected", "selected");
        
        value.Floors[selVal].forEach((v:any)=>{ 
            if(v.IsSelected==1)
            selVal=v.FloorKey;
            if(wings !=undefined)
            wings += `<option value="`+ v.FloorKey +`">`+ v.FloorFullName +`</option>`
            else wings = `<option value="`+ v.FloorKey +`">`+ v.FloorFullName +`</option>`
        })
        document.querySelector('#hotdeskingFloor').innerHTML = wings;
        // $("#hotdeskingFloor option[value='"+ selVal +"']").attr("selected", "selected");      
        loadHotDeskData(selVal);
}

async function loadHotDeskData(selVal:any){
    let params = {            
        FloorKey: selVal
    }
    // let fdata = await props.uxpContext.executeAction('AdaniDashboard','HotDeskingLoadData',params,{json:true});
    // hotdesking_LoadData(fdata);

   let fdata = hotDeskingLoadData;

//   let Cdata = hotDeskingLoadData1.HotDeskingLoadData;

//    let fdata = Cdata.Floors.EW;

//     if(selVal == 'WW'){
//         fdata = Cdata.Floors.WW;
//     }
//     else if(selVal == 'NW'){
//         fdata = Cdata.Floors.NW;
//     } 
//     else if(selVal == 'SW'){
//         fdata = Cdata.Floors.SW;
//     } 

   // setseries_data(fdata);


   hotdesking_LoadData(fdata);
    
}

function bindFloorddl(selVal:any){
    var value = initData, wings:any;
   
    document.querySelector('#hotdeskingFloor').innerHTML = '';
    var selFloorVal= value.Floors[selVal][0].FloorKey;    

      value.Floors[selVal].forEach((v:any)=>{ 
        if(v.IsSelected==1){
            selFloorVal=v.FloorKey;
            if(wings != undefined)
            wings += `<option value="`+ v.FloorKey +`">`+ v.FloorFullName +`</option>`
            else wings = `<option value="`+ v.FloorKey +`">`+ v.FloorFullName +`</option>`
        } else {
            if(wings != undefined)
            wings += `<option value="`+ v.FloorKey +`">`+ v.FloorFullName +`</option>`
            else wings = `<option value="`+ v.FloorKey +`">`+ v.FloorFullName +`</option>`
        }
        document.querySelector('#hotdeskingFloor').innerHTML = wings;        
        document.querySelector("#hotdeskingFloor option[value= '" + selFloorVal +"']").setAttribute('selected', 'selected');

    })
  }

function hotdesking_LoadData(value:any){
    document.querySelector(".hotdesk_data").innerHTML = '';            
              var hotdeskData=`<div class="environment_matrics_section">
                      <div class="environment_widget">`                        
                        hotdeskData = hotdeskData +` <div class="desk-cont">
                                          <div class="desk-cont_value desk-cont_used">
                                              <h3>` + value.SeatBookingDetails.Used + `
                                                  <em></em>
                                              </h3>
                                              <p>used</p>
                                          </div> 
                                          <div class="desk-cont_value desk-cont_avail">
                                              <h3>` + value.SeatBookingDetails.Available + `
                                                  <em></em>
                                              </h3>
                                              <p>available</p>
                                          </div> 
                                    </div>`   

                      hotdeskData = hotdeskData +`  

                    </div>                        
                    </div>`;        
              document.querySelector(".hotdesk_data").innerHTML = hotdeskData;
}

function hotdeskingService(v:any){
    var selVal=v.target.value;
    bindFloorddl(selVal);
    // selVal = $("#hotdeskingFloor").val();   
    // selVal = document.querySelector('#hotdeskingFloor').selectedOptions[0].value;      
    loadHotDeskData(selVal); 
}

function hotdeskingFloor(v:any){
    var selVal=v.target.value;          
    loadHotDeskData(selVal);
}

    return <WidgetWrapper className="HotDesking-widget">
        <TitleBar  icon="https://static.iviva.com/images/Adani_UXP/hotdesking-icon.svg" title="HOT DESKING CONSUMPTION">
            <div className="visitors_plan">  
                <div className="wing_angle wing_angle1">
                    <span className="wing_map"></span>
                    <select className="wings" id="hotdeskingService" onChange={(value)=>{hotdeskingService(value)}}></select>
                </div>
                <div className="wing_angle">
                    <span className="wing_map wing_floor"></span>
                    <select className="floors wings" id="hotdeskingFloor" onChange={(value)=>{hotdeskingFloor(value)}}></select>
                </div>                 
            </div>
        </TitleBar>

        <div className="hotdesk_data"></div>

    </WidgetWrapper>; 

}

export default HotDesking;

function setseries_data(fdata: { FloorFullName: string; FloorLocName: string; FloorKey: string; IsSelected: string; }[]) {
    throw new Error("Function not implemented.");
}
