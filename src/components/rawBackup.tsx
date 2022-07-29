import * as React from "react";
import { TitleBar,  WidgetWrapper,DataList } from "uxp/components";
import { IContextProvider } from '../uxp';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import '../styles.scss';

interface IRawBackupProps {
    uxpContext?: IContextProvider
}

const RawBackup:React.FunctionComponent<IRawBackupProps> = (props) => {

let [highchartsOptions, setHighchartsOptions] = React.useState<any>({});
var SeriesArray:Array<any>=[], catagories:Array<any>=[];
let [SArray, setSArray] = React.useState([]);
const [checked, setChecked] = React.useState(true);
let [backup, setbackup] = React.useState([]);
let [dQuery, setdQuery] = React.useState<any>([]);
var ListOfSeries;

React.useEffect(()=>{
    getRawBackupData('Month');
    },[]);
	
async function getRawBackupData(DateQuery:string) {
    if(DateQuery == 'Month'){
        document.getElementById('RBMonth').style.background = '#D4FDC1';
        document.getElementById('RBHour').style.background = '';
        document.getElementById('RBWeek').style.background = '';
        document.getElementById('RBDay').style.background = '';
    }
    else if(DateQuery == 'Week'){
        document.getElementById('RBWeek').style.background = '#D4FDC1';
        document.getElementById('RBHour').style.background = '';
        document.getElementById('RBMonth').style.background = '';
        document.getElementById('RBDay').style.background = '';
    }
    else if(DateQuery == 'Day'){
        document.getElementById('RBDay').style.background = '#D4FDC1';
        document.getElementById('RBHour').style.background = '';
        document.getElementById('RBWeek').style.background = '';
        document.getElementById('RBMonth').style.background = '';
    } else if(DateQuery == 'Hour'){
        document.getElementById('RBHour').style.background = '#D4FDC1';
        document.getElementById('RBMonth').style.background = '';
        document.getElementById('RBWeek').style.background = '';
        document.getElementById('RBDay').style.background = '';
    }  

    let params = {            
        DateQuery: DateQuery
    }
        let cdata = await props.uxpContext.executeAction('AdaniEnergyDashboard','Raw_Backup',params,{json:true});

        let data = JSON.parse(cdata.data);
		setdQuery(DateQuery);
        RawBackup(data, DateQuery);
        setbackup(data.ElectricalEnergyConsumption.Backup);
    }

    function getMonth(Date : any){
        var MonthName;
        if(Date.toString().length == 2 || Date.toString().length == 1){
            MonthName = Date;
        }else MonthName = Date.substr(5,2);
    
        if(MonthName == "01" || MonthName == "1") MonthName = "January"
        else if(MonthName == "02" || MonthName == "2") MonthName = "February"
        else if(MonthName == "03" || MonthName == "3") MonthName = "March"
        else if(MonthName == "04" || MonthName == "4") MonthName = "April"
        else if(MonthName == "05" || MonthName == "5") MonthName = "May"
        else if(MonthName == "06" || MonthName == "6") MonthName = "June"
        else if(MonthName == "07" || MonthName == "7") MonthName = "July"
        else if(MonthName == "08" || MonthName == "8") MonthName = "August"
        else if(MonthName == "09" || MonthName == "9") MonthName = "September"
        else if(MonthName == "10") MonthName = "October"
        else if(MonthName == "11") MonthName = "November"
        else if(MonthName == "12") MonthName = "December"
    
        return MonthName;
    }

    function WeekdayName(Num: any){
        var weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        return weekday[Num];
    }


    Date.prototype.getWeek = function() {
  
        var oneJan:any = new Date(this.getFullYear(), 0, 1);
    
        // calculating number of days
        //in given year before given date
    
        var numberOfDays = Math.floor((this - oneJan) / (24 * 60 * 60 * 1000));

        // adding 1 since this.getDay()
        //returns value starting from 0

        return Math.ceil((this.getDay() + 1 + numberOfDays) / 7) + 1;
    
    }

function RawBackup(value:any, currentFrequency:any){
    SeriesArray=[];
    var rawData = value.ElectricalEnergyConsumption.Raw;     
    var mydate = new Date(value.ElectricalEnergyConsumption.Raw[0].Data[0].ISODate);

    if(currentFrequency == 'Month')
        document.querySelector('.RB_month').innerHTML = value.ElectricalEnergyConsumption.Raw[0].Data[0].ISODate.slice(0,4);
    else if(currentFrequency == 'Week')
        document.querySelector('.RB_month').innerHTML = value.ElectricalEnergyConsumption.Raw[0].Data[0].ISODate.slice(0,4) + '-' + getMonth(value.ElectricalEnergyConsumption.Raw[0].Data[0].ISODate.slice(5,7));
    else if(currentFrequency == 'Day') 
        document.querySelector('.RB_month').innerHTML = value.ElectricalEnergyConsumption.Raw[0].Data[0].ISODate.slice(0,4) + '-' + getMonth(value.ElectricalEnergyConsumption.Raw[0].Data[0].ISODate.slice(5,7))
         + ' WK-' + mydate.getWeek();
    else if(currentFrequency == 'Hour'){
        var d = new Date(value.ElectricalEnergyConsumption.Raw[0].Data[0].ISODate);
        document.querySelector('.RB_month').innerHTML = value.ElectricalEnergyConsumption.Raw[0].Data[0].ISODate.slice(0,4) + '-' + getMonth(value.ElectricalEnergyConsumption.Raw[0].Data[0].ISODate.slice(5,7))
         + ' WK-' + mydate.getWeek() + ' ' +  WeekdayName(d.getDay());
    }

    var FullName;
    SeriesArray.push(value.ElectricalEnergyConsumption.Backup[0].Unit);
    for(var i=0; i<rawData.length; i++){
    if(currentFrequency != undefined)
    var dq = currentFrequency;
    else if(dQuery != undefined)
    var dq = dQuery;

    catagories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','July','Aug','Sep','Oct','Nov','Dec'];
    var data = [0,0,0,0,0,0,0,0,0,0,0,0];
    if(rawData[i].Name.includes(' ')){
    var names = rawData[i].Name.split(' ');
    FullName = names[0] + names[1];
    } else FullName = rawData[i].Name;

    if(FullName != ""){
        
        for(var j=0; j<rawData[i].Data.length; j++){
            if((rawData[i].Data[j].Consumption != "" || rawData[i].Data[j].Consumption != undefined) && Math.sign(rawData[i].Data[j].Consumption) == 1){
                data[rawData[i].Data[j].Number - 2] = parseInt(rawData[i].Data[j].Consumption);
            }            
        }
        ListOfSeries = {
            name: FullName,
            data: data,
            stack: 'raw'
        }      
        SeriesArray.push(ListOfSeries);
        setSArray(SeriesArray);
        }
    }
        gethighchart(catagories,SeriesArray);
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

    function activeToggleBtn(){

        var found = false, indexNum;
            for(var i = 0; i < SArray.length; i++) {
                if (SArray[i].name == 'Backup') {
                    found = true;
                    indexNum = i;
                    break;
                }
            }
        catagories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','July','Aug','Sep','Oct','Nov','Dec'];
        
        if(document.querySelector('.toggleBtn').getAttribute('value') == 'check'){
            var ListOfSeriesOfBackup = {}, data = [0,0,0,0,0,0,0,0,0,0,0,0];
            for(var k=0;k<backup.length;k++){
                if(backup[k] != undefined || backup[k] != "")
                data[backup[k].Number - 1] = parseInt(backup[k].Consumption);
            }

            ListOfSeriesOfBackup = {
                name: 'Backup',
                data: data,
                stack: 'backup'
            }
            
            SArray.unshift(backup[0].Unit);
            if(indexNum == undefined)
            SArray.push(ListOfSeriesOfBackup);
            else
            SArray[indexNum] = ListOfSeriesOfBackup;
            gethighchart(catagories,SArray);
        } else {
            SArray.splice(indexNum,1);    
            SArray.unshift(backup[0].Unit);
            gethighchart(catagories,SArray);
        }
    }

    const Chart = () => (
        <div>
          <HighchartsReact highcharts={Highcharts} options={highchartsOptions} />
        </div>
    );

    return <WidgetWrapper className="raw-backup-weblet">
        <TitleBar icon="https://static.iviva.com/images/Adani_UXP/energy.svg" title="RAW BACKUP ENERGY CONSUMPTION" className="icons">
            <div className='RB_month'></div>
            <div className="raw-backup-frequency">
                <ul>
                    <li id="RBMonth" className="raw-backup-frequency-child" onClick={() =>{getRawBackupData('Month')} }>Year</li>
                    <li id="RBWeek" className="raw-backup-frequency-child" onClick={() =>{getRawBackupData('Week')} }>Month</li>
                    <li id="RBDay" className="raw-backup-frequency-child" onClick={() =>{getRawBackupData('Day')} }>Week</li>
                    <li id="RBHour" className="raw-backup-frequency-child" onClick={() =>{getRawBackupData('Hour')} }>Day</li>
                </ul>
            </div>
            <div className="togglebar">
                <input className="toggleBtn" type="checkbox" onClick={()=>{activeToggleBtn()}} onChange={() => {setChecked(old => !old)}} value={checked ? 'check' : 'uncheck'} />
            </div>
        </TitleBar>        
        <Chart/>

    </WidgetWrapper>; 

}

export default RawBackup;