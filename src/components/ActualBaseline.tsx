import * as React from "react";
import { TitleBar,  WidgetWrapper,DataList } from "uxp/components";
import { IContextProvider } from '../uxp';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Heatmap from 'highcharts/modules/heatmap.js';
Heatmap(Highcharts);
import '../styles.scss';

interface IActualBaselineProps {
    uxpContext?: IContextProvider
}

const ActualBaseline:React.FunctionComponent<IActualBaselineProps> = (props) => {
    
let [highchartsOptions, setHighchartsOptions] = React.useState<any>({});

React.useEffect(()=>{
    renderBaseline();
    },[]);
	
async function renderBaseline() {
        document.getElementById('baseline').style.background = '#D4FDC1';        
        document.getElementById('heatmap').style.background = '';

        let cdata = await props.uxpContext.executeAction('AdaniEnergyDashboard','BaselineComparison_Baseline',{},{json:true});
		let mydata = JSON.parse(cdata.data); 
        ActualBaseline(mydata);
                
    }

    function ActualBaseline(value:any){
        document.querySelector('.baseline_cur_month').innerHTML = value.BaselineComperison.Details[0].ISODate.slice(0,4);        
        document.querySelector('.baseline-widget').classList.remove('hide');
        
        var baselineData = value.BaselineComperison.Details;
        var baselineSeries = [], consumptionSeriesObj = {}, consumptionData = [0,0,0,0,0,0,0,0,0,0,0,0];
        for(var i=0; i<baselineData.length; i++){
            consumptionData[baselineData[i].Number - 1] = parseInt(baselineData[i].Consumption);
        }
        consumptionSeriesObj = {
            name: 'Actual',
            data: consumptionData,
            stack: 'Actual',
            color: 'rgb(241 92 128 / 68%)'
        }

        baselineSeries.push(consumptionSeriesObj);

        var baselineSeriesObj = {}, blineData = [0,0,0,0,0,0,0,0,0,0,0,0];
        for(var j=0; j<baselineData.length; j++){
            blineData[baselineData[j].Number - 1] = parseInt(baselineData[j].Baseline);
        }
        baselineSeriesObj = {
            name: 'Baseline',
            data: blineData,
            stack: 'Baseline',
            color: 'rgb(43 144 143 / 64%)'
        }
        baselineSeries.push(baselineSeriesObj);

        var unitOfConsumption = value.BaselineComperison.Min.Unit;
        const options = {
          
            chart: {
                height: 230,
                type: 'column'
            },
            title: {
                text:''
            },
            credits: {
              enabled: false
            },
            tooltip: { 
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ' + unitOfConsumption + '<br/>',
                enabled: true,
                shared: true, 
            },
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','July','Aug','Sep','Oct','Nov','Dec'],
                labels: {
                    style: {
                        color: 'black'
                    }
                },
                lineColor: '#00000038'
            },
            yAxis: {
                min: 0,
                max: 100000,
                title: {
                    text: ''
                },
                labels: {
                    style: {
                        color: 'black'
                    }
                },
                gridLineColor: '#00000038',
            },            
            plotOptions: {
                column: {
                    stacking: 'normal'
                },
                series: {
                    // pointWidth: 15,
                    pointPadding: 0.1
                }
            },
            series: baselineSeries,
        };        
        setHighchartsOptions(options);
    }

    const Chart = () => (
        <div>
          <HighchartsReact highcharts={Highcharts} options={highchartsOptions} />
        </div>
    );

  async  function RenderHeatMap(){
      
        document.getElementById('baseline').style.background = '';        
        document.getElementById('heatmap').style.background = '#D4FDC1';

        let data = await props.uxpContext.executeAction('AdaniEnergyDashboard','BaselineComparison_Heatmap',{json:true});
		let mydata = JSON.parse(data);
        heatMap(mydata);
    }

    function heatMap(value:any){
        document.querySelector('.baseline_cur_month').innerHTML = value.Heatmap.Details[0].ISODate.slice(0,4);
        document.querySelector('.baseline-widget').classList.add('hide');

        var heatMapData = value.Heatmap.Details;
        var chartData = []; var minDate;
        for(var i=0; i<heatMapData.length; i++){
            var currDate = new Date(heatMapData[i].ISODate);
            var x= Date.UTC(currDate.getFullYear(), currDate.getMonth(), currDate.getDate());//Date
            var y = parseFloat(heatMapData[i].Number);//Hours
            var val  = parseFloat(heatMapData[i].Consumption);//Consumption Value
            chartData.push([x,y,val]);

            var mincurrDate = new Date(heatMapData[1].ISODate);
            minDate = Date.UTC(mincurrDate.getFullYear(), mincurrDate.getMonth()-1, mincurrDate.getDate());
        }
        var minVal = value.Heatmap.ScaleParams.MinVal;
        var maxVal = value.Heatmap.ScaleParams.MaxVal;

        const options = {
        
            chart: {
                height: 320,
                type: 'heatmap',
                inverted: true, 
            },
            title: {
                text:'',
                align: 'left'
            },    
            subtitle: {
                text: '',
                align: 'left'
            },
            credits: {
              enabled: false
            },
            xAxis: {
                type: 'datetime',
                dateTimeLabelFormats: { // don't display the dummy year
                month: '%e %b %Y',
                year: '%Y'
                },
            },
            yAxis: {
                title: {
                    text: ''
                },
                minPadding: 0,
                maxPadding: 0,
                startOnTick: false,
                endOnTick: false,
                tickPositions: [0, 3, 6, 9, 12, 15, 18, 21, 23],
                tickWidth: 1,
                min: 0,
                max: 23
            },
    
            colorAxis: {
                stops: [
                    [0,'#dee2e6'],[0.5,'#3060cf'],[0.9,'#c4463a']
                ],                 
                min: minVal,
                max: maxVal,
                labels: {
                    format: '{value}KWH'
                }
            },
            series: [{
                type:'heatmap',
                data: chartData,
                borderWidth: 0,
                //showInLegend: true,
                colsize: 24 * 36e5, // one day
                nullColor: '#EFEFEF',
                tooltip: {
                    headerFormat: 'Energy Consumption<br/>',
                    pointFormat: '{point.x:%e %b, %Y} {point.y}:00 <b>{point.value} KWH</b>'
                }
            }]      
        };    
        setHighchartsOptions(options);  
    }

    return <WidgetWrapper className="actual-baseline-widget">
        <TitleBar icon="https://static.iviva.com/images/Adani_UXP/energy.svg" title="ACTUAL VS BASELINE CONSUMPTION" className="actual-baseline-titlebar icons">
            <div className="baseline_cur_month"></div>
            <div className="actual-baseline-btns">
                <ul>
                    <li id='baseline' className="ABBaseline actual-baseline-btns-child selectedBtn" onClick={() =>{renderBaseline()} }>Baseline</li>
                    <li id='heatmap' className="heatMap actual-baseline-btns-child" onClick={() =>{RenderHeatMap()} }>Heatmap</li>
                </ul>
            </div>
        </TitleBar>        
        
        <Chart/>
        <div className='baseline-widget hide'>
            <div className="actual"><b> Actual:</b> Actual Consumption Value</div>
            <div className="baseline"><b> Baseine: </b> Consultant Supplied Design Value</div>
        </div>
    </WidgetWrapper>; 

}

export default ActualBaseline;