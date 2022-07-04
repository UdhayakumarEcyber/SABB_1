import * as React from "react";
import { TitleBar,  WidgetWrapper } from "uxp/components";
import { IContextProvider } from '../uxp';
import '../styles.scss';

// import '../widget_trans.scss';

interface IMeetingProps {
    uxpContext?: IContextProvider
}


import LoggedInEmployee from  '../json/loggedInEmployee.json'

const Meeting:React.FunctionComponent<IMeetingProps> = (props) => {

let [data, setData] = React.useState<any>({});
React.useEffect(()=>{
        getVisitor()
    },[]);
	
 async function getVisitor() {
        // let sdata = await props.uxpContext.executeAction('AdaniDashboard','LoggedInEmployee',{json:true});
		// const myData = JSON.parse(sdata);        
		// setData(myData.LoggedInEmployee);

        let sdata = LoggedInEmployee;
		//const myData = JSON.parse(sdata);        
		setData(sdata.LoggedInEmployee);
    }
    
if(data.constructor === Object && Object.entries(data).length > 0)
   {
  if(data.upcomingVisits == 0 && data.VisitorName == "No Visitor")
  {
  return <WidgetWrapper>
            <div>
                {
                    <div className="visitor-card">
                        <div className='self'>Hello, 
                            <span>{data.HostName}</span>
                            <div className="calenderIcon calen">
                                <em className="visitor_count">{data.upcomingVisits}</em>
                            </div>

                        </div>
                        <div className="Visitor-info">
                            <span className='st2'  >No visits scheduled for the day </span>                            
                        </div>
                    </div>
                }
		    </div>
        </WidgetWrapper>;
	}
  else if( data.upcomingVisits > 0 && data.VisitorName == "No Visitor")
  {
  return <WidgetWrapper>
        <div>
            {
		        <div className="visitor-card">
                    <div className='self'>Hello, 
                        <span>{data.HostName}</span>
                        <div className="calenderIcon calen">
                            <em className="visitor_count">{data.upcomingVisits}</em>
                        </div>

                    </div>
                    <div className="Visitor-info">
                        <span className='st2'  >No Visitors Checked in Yet</span>                        
                    </div>
                </div>         
            }		  
        </div>
        </WidgetWrapper>;
	}
  else{
  return <WidgetWrapper>
            <div>
			{
		        <div className="visitor-card">
                    <div className='self'>Hello, 
                        <span>{data.HostName}</span>
                        <div className="calenderIcon calen">
                            <em className="visitor_count">{data.upcomingVisits}</em>
                        </div>
                    </div>
                    <div className="Visitor-info">
                        <span className='st1'  >Your visitor is here </span>
                        <span className='st2' > {data.VisitorName}  </span>
                        <span className='st3' >for the {data.MeetingTime} meeting </span>
                    </div>
                </div> 
            }
            </div>
        </WidgetWrapper>;  
        }
 }
	else {
        return (<WidgetWrapper className="employee-login-card">
                    <TitleBar title="LoggedIn User" />
                </WidgetWrapper>)
    }
}

export default Meeting;