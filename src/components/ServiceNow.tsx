import * as React from "react";
import { TitleBar,  WidgetWrapper,DataList } from "uxp/components";
import { IContextProvider } from '../uxp';
import '../styles.scss';


import serviceNow from  '../json/serviceNow.json'

interface IServiceNowProps {
    uxpContext?: IContextProvider
}

const ServiceNow:React.FunctionComponent<IServiceNowProps> = (props) => {
let [TicketDetails, setDetails] = React.useState<any>([])
let [Monthname, setMonthname] = React.useState<any>('')

 
 React.useEffect(()=>{        
        getServiceNowDetails()
},[]);

async function getServiceNowDetails() {

       //let ldata = await props.uxpContext.executeAction('AdaniDashboard','ServiceNow',{json:true});
        /* similar to this.setState({data:data}) */
		//let cdata=JSON.parse(ldata);

        let cdata= serviceNow;
		let details=cdata.TicketType;
		var d = new Date();         
        var monthname= ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
        var monName= monthname[(d).getMonth()];                                        
        var year = d.getFullYear();
		var currmonth=monName+' '+year;
		setDetails(details);
		setMonthname(currmonth);
}
   return <WidgetWrapper>
                <TitleBar  icon="https://static.iviva.com/images/Adani_UXP/service-now-ticket-icon.svg" title="SERVICE NOW TICKETS">
                    <div className='cur_month'>{Monthname}</div>
                </TitleBar>
				<div>
				   <div className="environment_widget serice_ticket">              
                        <ul>
                        {  TicketDetails.map((item: any, key: number) =>  {
                        return(
                        <li>
                            <div className="env_icon" ></div>                                                  
                            <h4>{item.Count}</h4>
                            <span>{item.Name} </span>   
                        </li>)
                            })}
                        </ul>
				  </div>
				</div>
             </WidgetWrapper>;   
   
}

export default ServiceNow;