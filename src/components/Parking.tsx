import * as React from "react";
import { TitleBar,  WidgetWrapper,DataList } from "uxp/components";
import { IContextProvider } from '../uxp';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import '../styles.scss';

import parking from  '../json/parking.json'

interface IParkingProps {
    uxpContext?: IContextProvider
}

const parkingUtilization : React.FunctionComponent<IParkingProps> = (props) => {

    let [data, setData] = React.useState<any>({})
    let [details, setDetails] = React.useState<any>({})
    let [result, setResult] = React.useState<any>([])
    let [parkingLables,setparkingLables]=React.useState<any>([])
    
    let [highchartsOptions, setHighchartsOptions] = React.useState<any>({}) 
    
    React.useEffect(()=>{            
            getParkingDetails('Daily')    
        },[]);

    async function getParkingDetails(DateQuery:string) {
        if(DateQuery == 'Monthly'){
            document.getElementById('Weekly-Btn').style.backgroundColor = '';
            document.getElementById('Daily-Btn').style.backgroundColor = '';
            document.getElementById('Monthly-Btn').style.background = '#D4FDC1';
        } else if(DateQuery == 'Weekly'){
            document.getElementById('Monthly-Btn').style.backgroundColor = '';
            document.getElementById('Daily-Btn').style.backgroundColor = '';
            document.getElementById('Weekly-Btn').style.backgroundColor = '#D4FDC1';
        } else if(DateQuery == 'Daily'){
            document.getElementById('Monthly-Btn').style.backgroundColor = '';
            document.getElementById('Weekly-Btn').style.backgroundColor = '';
            document.getElementById('Daily-Btn').style.backgroundColor = '#D4FDC1';
        }

        let params = {                    
                    DateQuery: DateQuery
                }
        let cdata = parking;
                
        let me=cdata.ParkingUtilization;
        let details=me.details;
        let result=details.result;
                
        constructLables(me);
        setData(me);
        setDetails(details);
        setResult(result);
        gethighchart(result,DateQuery);
    }

    function constructLables(lables:any){
        let lablesOfParking = `<ul>
                                <li>
                                    <div class="user-icon"></div>
                                    <h4> `+ lables.ParkingSpaceUsed +`
                                        <span>Parking utilization</span>
                                    </h4>
                                </li>
                                <li>
                                    <div class="user-icon"></div>
                                    <h4> `+ lables.EmployeeParkingSpaceUsed +`
                                        <span>Employee Parking</span>
                                    </h4>
                                </li>
                                <li>
                                    <div class="user-icon"></div>
                                    <h4> `+ lables.VisitorParkingSpaceUsed +`
                                        <span>Visitor Parking</span>
                                    </h4>
                                </li>
                                <li>
                                    <div class="user-icon"></div>
                                    <h4> `+ lables.details.PeakHourOccupancy +`
                                        <span>Peak hour Utilization</span>
                                    </h4>
                                </li>
                            </ul>`;

        setparkingLables(lablesOfParking);
    }

    function gethighchart(result:any, DateQuery:string){
        let tm:any[] = [], tv:any[] = [], year_list = [],
        parking_final:any[] = [], parking_final_two:any[] = [], 
        parkingString = [], parkingStringTwo = [];
        let frequency=''
        for (var i of result) {
            tm.push(parseInt(i.TotalEmployeeVehicles));
            tv.push(parseInt(i.TotalVisitorVehicles));

            let dtt = new Date(i.isoDate);
            var dows=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
            var dow= dows[(dtt).getDay()];  
            if(DateQuery == 'Daily'){
                year_list.push(parseInt(i.Number)+ ':00');
              } 
             else if(DateQuery == 'Weekly'){
                year_list.push(dow); 
             }
             else if(DateQuery == 'Monthly'){
                year_list.push('WK' + i.Number + ' <br/> ' + i.isoDate.substring(0,10)); 
             } 

             parkingString.push(i.TotalEmployeeVehicles);
             parkingStringTwo.push(i.TotalVisitorVehicles); 

        }
        
        // querry send string that we need to convert into numbers
        for (var j = 0; j < parkingString.length; j++) {
            if (parkingString[j] != null) {
            parking_final.push(parseFloat(parkingString[j]))
            } else {
            parking_final.push(null)
            };
        }
        
        for (var k = 0; k < parkingStringTwo.length; k++) {
            if (parkingStringTwo[k] != null) {
            parking_final_two.push(parseFloat(parkingStringTwo[k]))
            } else {
            parking_final_two.push(null)
            };
        }
        
        const options = {
          
            chart: {
                height: 200,
                type: 'areaspline'
            },
            title: {
                text:''
            },
            credits: {
              enabled: false
            },
            tooltip: { 
               pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y}</b><br/>',
                  enabled: true,
               shared: true, 
            },
            legend: {
                reversed: true
            },
            xAxis: {
                categories: year_list,
                tickWidth: 1,
                    tickmarkPlacement:'on',
                    crosshair: {
                      snap: false,
                      width: 1,
                      color: 'red',
                      dashStyle: 'shortdot',
                      zIndex: 10
                    }
            },
            yAxis: [{
                title: { text: 'Count' }
              }],
              navigation: {
                    buttonOptions: {
                        enabled: false
                    }
                },
            series: [{
                 name: 'Employee',
                data: parking_final,
                 color : '#c55dda'
              }, 
              {
                name: 'Visitor',
                data: parking_final_two,
                color : '#77eadd'
               
            }],
            plotOptions: {
                areaspline: {
                    pointStart: 0,
                   // tickposition:'outside',
                    marker: {
                        enabled: false,
                        symbol: 'circle',
                        radius: 2,
                        states: {
                            hover: {
                                enabled: true
                            }
                        }
                        }
                        }
            }
        };
        setHighchartsOptions(options)
    }

    const App = () => (
        <div>
          <HighchartsReact highcharts={Highcharts} options={highchartsOptions} />
        </div>
    );

    return (<WidgetWrapper className="parking-widget">
    <TitleBar title="PARKING UTILIZATION" icon="https://static.iviva.com/images/Adani_UXP/cafeteria-icon.svg">
        <div className="cafeteria-top-options">                
            <ul className="meeting-room-top-tabs">
                <li id='Monthly-Btn' onClick={() =>{getParkingDetails('Monthly')} }><a>Monthly</a></li>
                <li id='Weekly-Btn' onClick={() =>{getParkingDetails('Weekly')} }><a>Weekly</a></li>
                <li id='Daily-Btn' onClick={() =>{getParkingDetails('Daily')} }><a className="meeting_active">Daily</a></li>
            </ul> 
        </div>
    </TitleBar>

    <div className="body">
        <div className="cafeteria_utilization-cont parking_utilization-cont">
            <div className="cafeteria_utilization-cont-top">
                <div className="parking_data"> 
                    <div className="cafeteria_utilization-list parking_utilization-list" dangerouslySetInnerHTML={{__html: parkingLables }}></div>
                </div> 
            </div>
        </div>
    </div>
    <App/>
    </WidgetWrapper>)
}

export default parkingUtilization;