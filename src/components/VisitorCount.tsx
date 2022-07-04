import * as React from "react";
import { TitleBar,  WidgetWrapper,DataList } from "uxp/components";
import { IContextProvider } from '../uxp';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import '../styles.scss';

 

 import visitorCount from  '../json/visitorCount.json'

 import visitorCount1 from  '../json/visitorCount1.json'


interface IVisitorCountProps {
    uxpContext?: IContextProvider
}

const VisitorCount:React.FunctionComponent<IVisitorCountProps> = (props) => {
  

    let [highchartsOptions, setHighchartsOptions] = React.useState<any>({})
     var series_data:any=[];
   //  var [series_data, setseries_data] = React.useState<any>({})
    React.useEffect(()=>{
        getVisitorCount('Daily');
    },[]);
	
async function getVisitorCount(selVal:any) {
 

        let params = {            
            DateQuery: selVal
        }
        let properties = {
			borderRadiusTopLeft: '10px',
			borderRadiusTopRight: '10px',
			borderRadiusBottomLeft: '10px',
			borderRadiusBottomRight: '10px',
		} 
        let grad = {color: {
            linearGradient: {
            x1: 0,
            x2: 0,
            y1: 0,
            y2: 1
            },
            stops: [
            [0, '#003399'],
            [1, '#5752C9']
            ]
        }}

        // let vdata = await props.uxpContext.executeAction('AdaniDashboard','Visitor',params,{json:true});
       
        // let vdata = visitorCount;   

        // let vdata = visitorCount1.Visitors;

        // let vdata = visitorCount1.Visitors;

      let vdata = visitorCount1.Visitors.Daily;

      //    console.log(vdata);

        if(selVal == 'Weekly'){
            vdata = visitorCount1.Visitors.Weekly;
        }
        else if(selVal == 'Monthly'){
            vdata = visitorCount1.Visitors.Monthly;
        } 
        else if(selVal == 'Yearly'){
            vdata = visitorCount1.Visitors.Yearly;
       } 
      //  setseries_data(vdata);

       Visitors(vdata, selVal, properties, grad);


    }

    function Visitors(data:any,  selValue:any, properties:any, grad:any){
        var cafeteriaString:any = [], year_list:any = [], cafeteria_final:any = [];
        console.log('hi',data );

        document.querySelector('.visitors_data').innerHTML = '';
        document.querySelector('.visitors_dataCount').innerHTML = '';

        var visitorsDataCount =  `   <div class="visitors_count-top">
                                            <div class="visitors_count-no">` + data.Visitors.TotalVisitorCount + `  <span class="visitors_icon"></span></div>
                                            <p>Visitor Count</p>
                                        </div>` 
        document.querySelector('.visitors_dataCount').innerHTML = visitorsDataCount;

        var visitorsData =  `<div class="visitors_chart_top">
                                <div class="visitors_chart_task">
                                    <ul>
                                        <li>
                                            <p>In Session</p>
                                            <h4>` + data.Visitors.InSession+ ` 
                                                <span class="session-pict"></span>
                                            </h4>                                            
                                        </li>
                                        <li>
                                            <p>Wi-Fi Visitors</p>
                                            <h4>` + data.Visitors.WifiVisitors + ` <em> / ` + data.Visitors.InSession+ ` </em></h4>
                                        </li>
                                        <li>
                                            <p>Concluded</p>
                                            <h4>` + data.Visitors.Concluded+ `</h4>
                                        </li>
                                        <li>
                                            <p>Pending</p>
                                            <h4>` + data.Visitors.Pending+ `</h4>
                                        </li>
                                        <li>
                                            <p>Cancelled</p>
                                            <h4>` + data.Visitors.Cancelled+ `</h4>
                                        </li>
                                    </ul>
                                </div> 

                                <div class="visitor_chart_details">
                                    <ul>
                                        <li>
                                            <p>Avg. visits</p>
                                            <h5>` + data.Visitors.AverageVisitRangeLabel+ `</h5>
                                        </li>
                                        <li>
                                            <p>Visits cancelled</p>
                                            <h5 style="color : #FC6969D8;">` + data.Visitors.VisitCancelled+ `</h5>
                                        </li>
                                        <li>
                                            <p>Peak hours</p>
                                            <h5>` + data.Visitors.PeakHoursRangeLabel+ `</h5>
                                        </li> 
                                    </ul> 
                                </div>` 
        document.querySelector('.visitors_data').innerHTML = visitorsData;

        if ( selValue == 'Daily' || selValue =='PreviousDay' || selValue == 'NextDay'){
            var temp_x:any = [];
            var data_y:any = [];
            series_data = [];
            year_list = [];

            for (const [key, v] of Object.entries(data.Visitors.Details)) {
                var value:any = v;
                value.map ((item:any)=>{
                    data_y.push(parseFloat(item.VisitorCount)); // Push all Y points (VisitorCount)
                    temp_x.push(item.Number);
                }); 

                let series_={
                name:key,
                data:data_y			
                };
                series_data.push(Object.assign({}, series_, properties, grad));
                year_list = temp_x;
                temp_x = [];
                data_y = [];
          }
          document.querySelector('.prev_next').classList.remove('hide');
        }

    if(typeof(data.Visitors.Details) == 'object' && data.Visitors.Details == undefined) {
        for (const [i, v] of Object.entries(data.Visitors.Details)) {
                var vdata:any = v;
                vdata.map ((data:any , index:any)=>{
               var dt = new Date( data.isoDate);
        
               var dows=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
               var dow= dows[(dt).getDay()]; 
        
                var monthname= ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
                var monName= monthname[(dt).getMonth()]; 
        
                if(selValue == 'Weekly'){
                  year_list.push(dow); 
                  document.querySelector('.prev_next').classList.add('hide');
                }
              
                else if(selValue == 'Monthly'){
                  year_list.push('WK' + data.Number + ' <br/> ' + data.isoDate.substring(0,10));
                  document.querySelector('.prev_next').classList.add('hide');
                }
                else if(selValue == 'Yearly'){
                  year_list.push(monName); 
                  document.querySelector('.prev_next').classList.add('hide'); 
                } 

                cafeteriaString.push(data.VisitorCount);
                });

            } 
        } else if(typeof(data.Visitors.Details) == 'object' && data.Visitors.Details.length != undefined){
            
            data.Visitors.Details.map ((v:any , index:any)=>{
                var dt = new Date( v.isoDate);
    
                var dows=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
                var dow= dows[(dt).getDay()]; 
        
                var monthname= ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
                var monName= monthname[(dt).getMonth()]; 
        
                if(selValue == 'Weekly'){
                year_list.push(dow);
                document.querySelector('.prev_next').classList.add('hide');
                }
            
                else if(selValue == 'Monthly'){
                year_list.push('WK' + v.Number + ' <br/> ' + v.isoDate.substring(0,10));
                document.querySelector('.prev_next').classList.add('hide');
                }
                else if(selValue == 'Yearly'){
                year_list.push(monName); 
                document.querySelector('.prev_next').classList.add('hide'); 
                } 
                cafeteriaString.push(v.VisitorCount);
            }); 
        }

 
       
             
    if(selValue == 'Weekly' || selValue == 'Monthly' || selValue == 'Yearly') {
        {
          series_data =[];
          let series_={
                  name:'Visitor Count',
                  minPointLength:10,
                  data:cafeteria_final				
                };
                series_data.push(Object.assign({}, series_, properties, grad));
          }
        }
 
      for (var i = 0; i < cafeteriaString.length; i++) {
        if (cafeteriaString[i] != null) {
          cafeteria_final.push(parseFloat(cafeteriaString[i]))
        } else {
          cafeteria_final.push(null)
        };
      }

      const options = {
          
        chart: {
            height: 180,
            type: 'column'
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
        subtitle: {
          text: ''
        },
         navigation: {
              buttonOptions: {
                  enabled: false
              }
          },
         plotOptions: {
          series: { 
             pointWidth: 8,
             borderRadius: 5,
          }
      },
        xAxis: [{ 
             categories: year_list,
        }],
         yAxis: [{
            title: { text: 'Count' }
            }], 

        series: series_data
    };
    setHighchartsOptions(options)

  }

    function RenderAreaChart(selVal:any,e:any){
        var elems = document.querySelector(".meeting_active");
        if(elems !=null) {
        elems.classList.remove("meeting_active");
        }
        e.target.className = "meeting_active";

        // getVisitorCount(selVal);
        getVisitorCount(selVal);

         
    }

    const Chart = () => (
        <div>
          <HighchartsReact highcharts={Highcharts} options={highchartsOptions} />
        </div>
    );


    return <WidgetWrapper className="Visitor-Count-widget">
        <div className="visitors_count">
            <div className="visitors_dataCount"></div>
            <div className="visitors_count-bot"> 
                <ul className="meeting-room-top-tabs">  
                    <li><a onClick={(value)=>{RenderAreaChart('Yearly',value)}}>Yearly</a></li>
                    <li><a onClick={(value)=>{RenderAreaChart('Monthly',value)}}>Monthly</a></li>
                    <li><a onClick={(value)=>{RenderAreaChart('Weekly',value)}}>Weekly</a></li>
                    <li><a className="meeting_active" onClick={(value)=>{RenderAreaChart('Daily',value)}}>Daily</a></li>  
                </ul>  
            </div>
        </div>

        <div className="visitors_chart">
            <div className="visitors_data"></div>
            <div className="prev_next">
                <ul>
                    <li><a onClick={()=>{getVisitorCount('PreviousDay')}}> </a></li>
                    <li><a onClick={()=>{getVisitorCount('NextDay')}}> </a></li>  
                </ul>
            </div>
            <Chart/>
        </div>

    </WidgetWrapper>; 

}

export default VisitorCount;