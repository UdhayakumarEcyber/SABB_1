import * as React from "react";
import { TitleBar,  WidgetWrapper,DataList } from "uxp/components";
import { IContextProvider } from '../uxp';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import '../styles.scss';


import cafeteriaUtilization from  '../json/cafeteriaUtilization.json'

interface ICafeteriaProps {
    uxpContext?: IContextProvider
}

const Cafeteria:React.FunctionComponent<ICafeteriaProps> = (props) => {

let [data, setData] = React.useState<any>({})
let [details, setDetails] = React.useState<any>({})
let [result, setResult] = React.useState<any>([])

let [highchartsOptions, setHighchartsOptions] = React.useState<any>({})



React.useEffect(()=>{
        
        getCafeteriaDetails('Daily')

    },[]);


async function getCafeteriaDetails(DateQuery:string) {

    if(DateQuery == 'Monthly'){
        document.getElementById('Weekly-CBtn').style.backgroundColor = '';
        document.getElementById('Daily-CBtn').style.backgroundColor = '';
        document.getElementById('Monthly-CBtn').style.backgroundColor = '#D4FDC1';
    } else if(DateQuery == 'Weekly'){
        document.getElementById('Monthly-CBtn').style.backgroundColor = '';
        document.getElementById('Daily-CBtn').style.backgroundColor = '';
        document.getElementById('Weekly-CBtn').style.backgroundColor = '#D4FDC1';
    } else if(DateQuery == 'Daily'){
        document.getElementById('Monthly-CBtn').style.backgroundColor = '';
        document.getElementById('Weekly-CBtn').style.backgroundColor = '';
        document.getElementById('Daily-CBtn').style.backgroundColor = '#D4FDC1';
    }
//let selecteddate='Daily'
let params = {            
            DateQuery: DateQuery
        }
let cdata = cafeteriaUtilization;
        /* similar to this.setState({data:data}) */
        
       
let me=cdata.CafeteriaUtilization;
let details=me.details;
let result=details.result;

setData(me);
setDetails(details);
setResult(result);
gethighchart(result,DateQuery);
}


function gethighchart(result:any,DateQuery:string){
let dt:any[] = [];
let cat=[];
let frequency=''

for (var i of result) {
    dt.push(parseInt(i.TotalHeadCount));
	frequency=i.Frequency;
	var checkdt = new Date( i.isoDate);
	var dows=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
	var dow= dows[(checkdt).getDay()];
	if(DateQuery=='Weekly'){
    cat.push(dow);
    }
	else if (DateQuery=='Daily')
	{
	cat.push(parseInt(i.Number)+ ':00');
	}
	else if (DateQuery=='Monthly')
	{
	cat.push('WK'+parseInt(i.Number)+ '<br/>' +  i.isoDate.substring(0,10));
	}
}

const options = {
  
    chart: {
	    height:200,
        type: 'areaspline'
    },
    title: {
        text:''
    },
    legend: {
        reversed: true
    },
    xAxis: {
        categories: cat
    },
    yAxis: {
        title: {
            text: 'count'
        }
    },
    tooltip: {
        shared: true,
        valueSuffix: ''
    },
    credits: {
        enabled: false
    },
   plotOptions: {
          series: {
            marker: {
              enabled: false
            }
          }
        },
    series: [{
        name: frequency,
        data: dt
    }]
};
setHighchartsOptions(options)
}
const App = () => (
  <div>
    <HighchartsReact highcharts={Highcharts} options={highchartsOptions} />
  </div>
);

   return <WidgetWrapper>
            <TitleBar  icon="https://static.iviva.com/images/Adani_UXP/cafeteria-icon.svg" title="Cafeteria Utilization">
                <div className="cafeteria-top-options" >
                    <ul className="meeting-room-top-tabs">   
                    <li id='Monthly-CBtn'><a onClick={() =>{getCafeteriaDetails('Monthly')} }>Monthly</a></li>
                    <li id='Weekly-CBtn'><a onClick={() => {getCafeteriaDetails('Weekly')} }>Weekly</a></li>
                    <li id='Daily-CBtn'><a onClick={() =>{getCafeteriaDetails('Daily')} } className="meeting_active">Daily</a></li> 
                    </ul> 
                </div>                
            </TitleBar>					
            <div className="cafeteria_utilization-cont">
                <div className="cafeteria_utilization-cont-top">
                    <div className="cafeteria_utilization-list">
                        <ul>
                            <li>
                                <div className="user-icon"></div>
                                <h4> {data.LiveHeadCount}
                                    <span>Live Head Count</span>
                                </h4>
                            </li>
                            <li>
                                <div className="user-icon"></div>
                                <h4> {details.AverageHeadCount}
                                    <span>Average Head Count</span>
                                </h4>
                            </li> 
                        </ul> 
	                </div>
				</div>
			</div>				
			<App/>
        </WidgetWrapper>;   
   
}

export default Cafeteria;