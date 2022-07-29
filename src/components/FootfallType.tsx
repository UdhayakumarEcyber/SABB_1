import * as React from "react";
import { TitleBar,  WidgetWrapper } from "uxp/components";
import { IContextProvider } from '../uxp';
import '../styles.scss';

interface IFootfallTypeProps {
    uxpContext?: IContextProvider
}

const FootfallType:React.FunctionComponent<IFootfallTypeProps> = (props) => {

React.useEffect(()=>{
    getFootfallTypes();
    },[]);
	
async function getFootfallTypes() {
        let cdata = await props.uxpContext.executeAction('AdaniDashboard','FootFallTypes',{},{json:true});
        var fData = JSON.parse(cdata.data);
        footFallTypes(fData);
    }

    function footFallTypes(value:any){
        var footfalltypesData=`<div class="user-list">    
        <ul>` 

        value.FootFallTypes.forEach((v:any)=>{ 
            if(v.Name == "Total"){ 
                footfalltypesData = footfalltypesData +`<li> 
                    <div class="user-icon" style="background-image:url(`+v.Image +`)"></div>  
                    <h4> ` + v.Value + `
                        <span>` + v.Name + `</span>
                    </h4>  
                </li>`
        }  else if(v.Name != "Total"){
            footfalltypesData = footfalltypesData +`<li>
                    <div class="user-icon" style="background-image:url(`+v.Image +`)"></div>                        
                    <h4> ` + v.Value + `
                        <span>` + v.Name + `</span>
                    </h4>  
                </li>`
        }
         });
                
        footfalltypesData = footfalltypesData +  `</ul>                      
            </div>`; 
        document.querySelector(".footfalltype_data").innerHTML = footfalltypesData;
    }

    return <WidgetWrapper className="Footfall-types-widget">
        <TitleBar  icon="https://static.iviva.com/images/Adani_UXP/floor_step_grey.svg" title="FOOTFALL TYPE">
        </TitleBar>

        <div className='footfall_widget'>
             <div className="footfalltype_data"> </div>  
        </div>

    </WidgetWrapper>; 

}

export default FootfallType;