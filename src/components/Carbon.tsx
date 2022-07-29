import * as React from "react";
import { TitleBar,  WidgetWrapper,DataList } from "uxp/components";
import { IContextProvider } from '../uxp';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import '../styles.scss';

interface ICarbonProps {
    uxpContext?: IContextProvider
}

const Carbon:React.FunctionComponent<ICarbonProps> = (props) => {

let [highchartsOptions, setHighchartsOptions] = React.useState<any>({});
let [carbonData, setcarbonData] = React.useState<any>({});

React.useEffect(()=>{
    getCarbonData('Current Year');
    },[]);
	
async function getCarbonData(DateQuery:string) {
    if(DateQuery == 'Current Year'){
        document.getElementById('currentYr').style.background = '#D4FDC1';
        document.getElementById('past5Yrs').style.background = '';
    } else if(DateQuery == 'Past 5Years'){        
        document.getElementById('currentYr').style.background = '';
        document.getElementById('past5Yrs').style.background = '#D4FDC1';
    }
    
        let cdata = await props.uxpContext.executeAction('AdaniEnergyDashboard','CarbonFootprint',{},{json:true});
		var mydata = JSON.parse(cdata.data);
        Carbon(mydata, DateQuery);
    }

    function Carbon(value:any, CCFrequency:any){
        if(CCFrequency == 'Current Year')
        document.querySelector('.carbon_curr_month').innerHTML = value.Details[4].Number;
        else if(CCFrequency == 'Past 5Years')
        document.querySelector('.carbon_curr_month').innerHTML = value.Details[0].Number +'-'+ value.Details[4].Number;

        setcarbonData({
            powerConsumedValue : value.CorbonFootprint.ElectricalConsumption.Value,
            powerConsumedUnit : value.CorbonFootprint.ElectricalConsumption.Unit,
            powerConsumedCaption : value.CorbonFootprint.ElectricalConsumption.CaptionLabel,
            co2Value : value.CorbonFootprint.CO2Emitted.Value,
            co2Unit : value.CorbonFootprint.CO2Emitted.Unit,
            co2Caption : value.CorbonFootprint.CO2Emitted.CaptionLabel,
            treesValue : value.CorbonFootprint.TreesToOffsetCO2.Value,
            treesUnit : value.CorbonFootprint.TreesToOffsetCO2.Unit,
            treesTextlabel : value.CorbonFootprint.TreesToOffsetCO2.TextLabel,
            treesCaption : value.CorbonFootprint.TreesToOffsetCO2.CaptionLabel,
            textLabelOfTrees : value.CorbonFootprint.TreesPlanted.CaptionLabel,
            numOfTrees : value.CorbonFootprint.TreesPlanted.TextLabel
        });

        var calFillBarWidth = value.CorbonFootprint.TreesPlanted.Value / value.CorbonFootprint.TreesPlanted.TotalValue * 100;
        document.getElementById('fillBar').style.width = calFillBarWidth + '%';

        var CCData = [], CCDataObj = {}, catagoriesOfCC = [], CCDataVal = value.Details, data = [];
        for(var i=0; i<CCDataVal.length; i++){
            data[i] = parseInt(CCDataVal[i].Consumption);
            if(CCFrequency == 'Past 5Years')
            catagoriesOfCC[i] = parseInt(CCDataVal[i].Number);
        }

        if(CCFrequency == 'Current Year')
        catagoriesOfCC = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','July','Aug','Sep','Oct','Nov','Dec'];

        CCDataObj = {
            showInLegend : false,
            name : 'Consumption',
            data : data,
            color : 'rgb(187 125 234 / 68%)'
        }
        CCData.push(CCDataObj);

        const options = {
          
            chart: {
                height: 150,
                type: 'areaspline'
            },
            title: {
                text:''
            },
            credits: {
              enabled: false
            },
            tooltip: { 
                shared: true,
                valueSuffix: ' units'
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                verticalAlign: 'top',
                x: 150,
                // y: 100,
                floating: true,
                borderWidth: 1
            },
            xAxis: {
                categories: catagoriesOfCC
            },
            yAxis: {
                title: {
                    text: ''
                }
              },
            navigation: {
                    buttonOptions: {
                        enabled: false
                    }
                },
            plotOptions: {
                areaspline: {
                    fillOpacity: 0.5
                }
            },
            series: CCData
        };
        setHighchartsOptions(options)
    }

    function gethighchart(catagories: any,SeriesArray: any){
        if(SeriesArray[0] == 'kWh'){
            var unit = SeriesArray[0];
            SeriesArray.shift();
        }
        const options = {
          
            chart: {
                height: 200,
                type: 'column'
            },
            title: {
                text:''
            },
            credits: {
              enabled: false
            },
            tooltip: { 
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ' + unit + '<br/>',
                enabled: true,
               shared: true, 
            },
            legend: {
                reversed: true
            },
            xAxis: {
                categories: catagories
            },
            yAxis: {
                // min: 0,
                // max:100,
                title: { text: '' }
              },
            navigation: {
                    buttonOptions: {
                        enabled: false
                    }
                },
            series: SeriesArray,
            plotOptions: {
                column: {
                    stacking: 'normal'
                },
                series: {
                    // pointWidth: 15,
                    pointPadding: 0.1
                }
            }
        };
        setHighchartsOptions(options)
    }


    const Chart = () => (
        <div>
          <HighchartsReact highcharts={Highcharts} options={highchartsOptions} />
        </div>
    );

    return <WidgetWrapper className="carbon-footprint-widget">
        <TitleBar  icon="https://static.iviva.com/images/Adani_UXP/person.png" title="CARBON FOOTPRINT">
        <div className="carbon_curr_month"></div>
        <div className="carbon-footprint-frequency">
            <div id='currentYr' className="carbon-footprint-frequency-child currentYr" onClick={() => {getCarbonData('Current Year')}}>This Year</div>
            <div id='past5Yrs' className="carbon-footprint-frequency-child past5Yrs" onClick={() => {getCarbonData('Past 5Years')}}>Last 5Years</div>
        </div>
        </TitleBar>

        <div className="cafeteria_utilization-cont carbon_footprint-cont">  
            <div className="carbon-footprint-parts">
                <div className="carbon-footprint-list">
                    <div className="carbon-footprint-list-data">
                        <div className="carbon-footprint-list-icon power-cons-icon"></div>
                        <div className="carbon-footprint-list-CostUnit">
                            <div className="carbon-footprint-list-unit powerConsumedValue">{carbonData.powerConsumedValue} {carbonData.powerConsumedUnit}</div>
                            <div className="carbon-footprint-list-cost powerConsumed">{carbonData.powerConsumedCaption}</div>
                        </div>
                    </div>
                </div>
                <div className="carbon-footprint-list">
                    <div className="carbon-footprint-list-data">
                        <div className="carbon-footprint-list-icon co2-emit-icon"></div>
                        <div className="carbon-footprint-list-CostUnit">
                            <div className="carbon-footprint-list-unit Co2Value">{carbonData.co2Value} {carbonData.co2Unit}</div>
                            <div className="carbon-footprint-list-cost Co2">{carbonData.co2Caption}</div>
                        </div>
                    </div>
                </div>
                <div className="carbon-footprint-list">
                    <div className="carbon-footprint-list-data">
                        <div className="carbon-footprint-list-icon trees-off-icon"></div>
                        <div className="carbon-footprint-list-CostUnit">
                            <div className="div">
                                <div className="carbon-footprint-list-unit treesValue">{carbonData.treesValue} {carbonData.treesUnit}</div>
                                <div className="treesTextLabel">{carbonData.treesTextlabel}</div>
                            </div>
                            <div className="carbon-footprint-list-cost trees">{carbonData.treesCaption}</div>
                        </div>
                    </div>
                </div>
            </div>
            <Chart/>
            <div className="treesBar">
                <div className="textLabelOfTrees">
                    <h6>{carbonData.textLabelOfTrees}</h6>
                </div>
                <div className="progessBarOfTrees">
                    <div className="fillBar" id="fillBar"></div>
                </div>
                <div className="numOfTrees">{carbonData.numOfTrees}</div>
            </div>
        </div> 

    </WidgetWrapper>; 

}

export default Carbon;