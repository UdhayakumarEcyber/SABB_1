import * as React from "react";
import { TitleBar,  WidgetWrapper } from "uxp/components";
import { IContextProvider } from '../uxp';

import '../styles.scss';

interface IRecentIncidentProps {
    uxpContext?: IContextProvider
}

const RecentIncident:React.FunctionComponent<IRecentIncidentProps> = (props) => {

let [data, setData] = React.useState<any>({})
let [IncidentDetails, setDetails] = React.useState<any>([])
let [IncidentDateTime, setIncidentDateTime] = React.useState<any>([])
let [Arr, setArr] = React.useState<any>([])
let [counter, setCounter] = React.useState<any>(0)

React.useEffect(()=>{        
    getRecentIncidentDetails()
},[]);

function togglePrev() {
    document.getElementById('violationsIncident').scrollLeft -= 270;	
}

function toggleNext(){
	document.getElementById('violationsIncident').scrollLeft += 270;
}

async function getRecentIncidentDetails() {
    function formatAMPM(date:any) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    let ldata = await props.uxpContext.executeAction('AdaniDashboard','RecentActiveIncidents',{},{json:true});
        /* similar to this.setState({data:data}) */
		let cdata=JSON.parse(ldata.data);
		let Lucydata=cdata.RecentActiveIncidents;
		let details=Lucydata.IncidentDetails;
		var arr=[],counter;
		arr.push(details[0]);
		arr.push(details[1]);
		counter=1;
		setData(Lucydata);
        var dateTime:any=[];     
        details.forEach((element:any) => {
            var d = new Date(element.IncidentDateTime);
            var time = formatAMPM(new Date(d))
            var dd:any = d.getDate();
            var mm:any = d.getMonth() + 1;  
            var yyyy:any = d.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            var today = dd + '/' + mm + '/' + yyyy;
            dateTime.push(today + ' / ' + time);
        });
		setDetails(details);
		setArr(arr);
		setCounter(counter);
        setIncidentDateTime(dateTime);
}

   return <WidgetWrapper>
			<TitleBar icon='https://static.iviva.com/images/Adani_UXP/incident-icon.svg' title='Recent Incidents '/>
            <div className="body">
			<div className="incident_data">
			<div className="violations_inner_widget">
			<div className="inner_widget-top"> 
			<div className="inner_widget-top-rgt">
                <h5>  {data.TotalActiveIncidents} </h5>
                <p>Incidents</p>
            </div> 
			</div>
            <div className="violations-widget-box-overall" id="violationsIncident" >
                  <div className="violations-widget-box-overall_sub">
				  
				  { IncidentDetails.map((item: any, key: number) =>  {
                  return(
				  
				    <div className="violations-widget-box">
                        <h6>{item.IncidentCategory}</h6>
                        <p> {item.IncidentDescription}</p>
                        <ul>
                            <li>
                                <label>ID </label>
                                <span><a href="https://ictadanihouse.adani.com/Apps/IncidentManagement/incident?key=`+v.IncidentKey+`" target="_blank">{item.IncidentID}</a></span>
                            </li>    
                            <li>   
                                <label>Location </label>
                                <span>{item.IncidentLocation}</span>
                            </li>
                                <li>   
                                <label>Severity </label>
                                <span>{item.IncidentSeverity}</span>
                            </li>
                                <li>   
                                <label>From </label>
                                {/* <span>{item.IncidentDateTime}</span>*/}
                                <span>{IncidentDateTime[key]}</span>
                            </li>
                        </ul>
				    </div>
				  
				  )})}
				  </div>
				  </div>

				<div className="footfall-arrows"> 
                    <div  onClick={() => togglePrev()}>
                    <a className="lft-arrow" id="incidentLeftSlide"></a>
                    </div>
                    <div onClick={() => toggleNext()}>
                    <a className="rgt-arrow" id="incidentRightSlide"></a>
                    </div>
                </div> 
			    </div>
			</div>
        </div>
    </WidgetWrapper>;
}

export default RecentIncident;