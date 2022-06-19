import * as React from "react";
import { TitleBar,  WidgetWrapper,DataList } from "uxp/components";
import { IContextProvider } from '../uxp';
import '../styles.scss';


import energyConsumption from  '../json/energyConsumption.json'

interface IEnergyConsumptionProps {
    uxpContext?: IContextProvider
}
declare global {
    interface Date {
        getWeek () : number
    }
}

const EnergyConsumption:React.FunctionComponent<IEnergyConsumptionProps> = (props) => {

let [data, setdata] = React.useState<any>([]);
let [energy, setenergy] = React.useState<any>({});
let [PreviousData,setPreviousData]=React.useState<any>([]);
let [dateQueryVal,setdateQueryVal]=React.useState<any>([]);
var eConsumption:any, dq:any;
React.useEffect(()=>{
        getEnergyConsumption('Month')
    },[]);
	
 async function getEnergyConsumption(DateQuery:string) {
    if(DateQuery == 'Year'){
        document.getElementById('Year').style.background = '#D4FDC1';
        document.getElementById('Month').style.background = '';
        document.getElementById('Week').style.background = '';
        document.getElementById('Day').style.background = '';
    }    
    else if(DateQuery == 'Month'){
        document.getElementById('Month').style.background = '#D4FDC1';
        document.getElementById('Year').style.background = '';
        document.getElementById('Week').style.background = '';
        document.getElementById('Day').style.background = '';
    }
    else if(DateQuery == 'Week'){
        document.getElementById('Week').style.background = '#D4FDC1';
        document.getElementById('Year').style.background = '';
        document.getElementById('Month').style.background = '';
        document.getElementById('Day').style.background = '';
    }
    else if(DateQuery == 'Day'){
        document.getElementById('Day').style.background = '#D4FDC1';
        document.getElementById('Year').style.background = '';
        document.getElementById('Week').style.background = '';
        document.getElementById('Month').style.background = '';
    }

    let params = {            
        DateQuery: DateQuery
    }
    // let edata = await props.uxpContext.executeAction('AdaniEnergyDashboard','EnergyConsumption',params,{json:true});

      let edata = energyConsumption;

    console.log(edata);

    setdata(edata);
    eConsumption = edata;
    dq = DateQuery;
    setdateQueryVal(DateQuery);
    EnergyConsumption(edata);
    }

    function EnergyConsumption(value: any){

        var electricalConsumption, gasConsumption, waterConsumption, wasteConsumption;
        if(value.Consumption.Electrical.Consumption.Value.length > 5){
            var n : number = value.Consumption.Electrical.Consumption.Value;
            let values = (n / 1000000).toString().substr(0,5);
            electricalConsumption = values + ' GWh';
        } else
        electricalConsumption = value.Consumption.Electrical.Consumption.Value + ` `+ value.Consumption.Electrical.Consumption.Unit;

        if(value.Consumption.Gas.Consumption.Value.length > 5){
            var n : number = value.Consumption.Gas.Consumption.Value;
            let values = (n / 1000000000).toString().substr(0,5);
            gasConsumption = values + ' km^3';
        } else
        gasConsumption = value.Consumption.Gas.Consumption.Value + ` `+ value.Consumption.Gas.Consumption.Unit;
        
        if(value.Consumption.Water.Consumption.Value.length > 5){
            var n : number = value.Consumption.Water.Consumption.Value;
            let values = (n / 1000000000).toString().substr(0,5);
            waterConsumption = values + ' km^3';
        } else
        waterConsumption = value.Consumption.Water.Consumption.Value + ` `+ value.Consumption.Water.Consumption.Unit;
        
        if(value.Consumption.Waste.Consumption.Value.length > 5){            
            var n : number = value.Consumption.Waste.Consumption.Value;
            let values = (n / 1000000000).toString().substr(0,5);
            wasteConsumption = values + ' Gg';
        } else
        wasteConsumption = value.Consumption.Waste.Consumption.Value + ` `+ value.Consumption.Waste.Consumption.Unit;
        
        setenergy({
            totalCost: value.Consumption.TotalCost,
            CostperSqFt: value.Consumption.CostperSqFt,
            electricalConsumption: electricalConsumption,
            electricalCost: formatINR(value.Consumption.Electrical.Cost.Label.replaceAll(",","")),
            gasConsumption: gasConsumption,
            gasCost: formatINR(value.Consumption.Gas.Cost.Label.replaceAll(",","")),
            waterConsumption: waterConsumption,
            waterCost: formatINR(value.Consumption.Water.Cost.Label.replaceAll(",","")),
            wasteConsumption: wasteConsumption,
            wasteCost: formatINR(value.Consumption.Waste.Cost.Label.replaceAll(",",""))
        })
        loadMatricData("Electrical");
    }

function handleChange(value:any){
    loadMatricData(value.target.value);
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

var getData:any, WorkingHCurrent:any, WorkingNHCurrent:any, WorkingHPrev:any, WorkingNHPrev:any, WorkingHPrevtoPrev:any, WorkingNHPrevtoPrev:any;
function loadMatricData(SelectedMatric:any){

    if(eConsumption != undefined)
    var value = eConsumption
    else if(data.length != 0)
    var value = data

    if(SelectedMatric == "Electrical"){
        getData = value.Consumption.Electrical;
        CompressNum('Electrical');
    } else if(SelectedMatric == "Gas"){
        getData = value.Consumption.Gas;
        CompressNum('Gas');  
    }        
    else if(SelectedMatric == "Water"){            
        getData = value.Consumption.Water;
        CompressNum('Water');
    }        
    else if(SelectedMatric == "Waste"){
        getData = value.Consumption.Waste;
        CompressNum('Waste');
    }    

    if(dq != undefined)
    var dateQuery = dq;
    else if(dateQueryVal.length != 0)
    var dateQuery = dateQueryVal;

    if(dateQuery == 'Year'){        
        document.querySelector('.currentDate-energy').innerHTML = value.Consumption.Electrical.Current.TrendDate.slice(0,4);
    } else if(dateQuery == 'Month'){
        document.querySelector('.currentDate-energy').innerHTML = value.Consumption.Electrical.Current.TrendDate.slice(0,4) + ' ' + getMonth(value.Consumption.Electrical.Current.TrendDate.slice(5,7));
    } else if(dateQuery == 'Week'){
        var mydate = new Date(value.Consumption.Electrical.Current.TrendDate);
        document.querySelector('.currentDate-energy').innerHTML = value.Consumption.Electrical.Current.TrendDate.slice(0,4) + ' ' + getMonth(value.Consumption.Electrical.Current.TrendDate.slice(5,7)) + ' WK-' + mydate.getWeek();
    } else if(dateQuery == 'Day'){
        var d = new Date(value.Consumption.Electrical.Prev.TrendDate);
        var mydate = new Date(value.Consumption.Electrical.Prev.TrendDate);
        document.querySelector('.currentDate-energy').innerHTML = value.Consumption.Electrical.Prev.TrendDate.slice(0,4) + ' ' + getMonth(value.Consumption.Electrical.Prev.TrendDate.slice(5,7)) + ' WK-' + mydate.getWeek() + ' ' +  WeekdayName(d.getDay());
    }

    //To set the width of the progress bar based on Working and Non working hours
    var widthOfBars = [];
    //For current
    if(getData.Current.WorkingHours.Consumption != undefined && getData.Current.NonWorkingHours.Consumption != undefined){
        var workingH = getData.Current.WorkingHours.Consumption.Value;
        var nonWorkingH = getData.Current.NonWorkingHours.Consumption.Value;
    
        if(parseInt(workingH) > parseInt(nonWorkingH)){
            var widthInPercent = nonWorkingH.substr(0,2);
            if(widthInPercent > 50)
            widthInPercent = 45;
            widthOfBars.push(100 - widthInPercent + '%');
            widthOfBars.push(widthInPercent + '%');
        } else {
            var widthInPercent = workingH.substr(0,2);
            if(widthInPercent > 50)
            widthInPercent = 45;
            widthOfBars.push(widthInPercent + '%');
            widthOfBars.push(100 - widthInPercent + '%');
        }
    }else{
        widthOfBars.push('50%');
        widthOfBars.push('50%');
    }
    
    //For prev
    if( getData.Prev.WorkingHours.Consumption != undefined && getData.Prev.NonWorkingHours.Consumption != undefined){
        var workingH = getData.Prev.WorkingHours.Consumption.Value;
        var nonWorkingH = getData.Prev.NonWorkingHours.Consumption.Value;
    
        if(parseInt(workingH) > parseInt(nonWorkingH)){
            var widthInPercent = nonWorkingH.substr(0,2);
            if(widthInPercent > 50)
            widthInPercent = 45;
            widthOfBars.push(100 - widthInPercent + '%');
            widthOfBars.push(widthInPercent + '%');
        } else {
            var widthInPercent = workingH.substr(0,2);
            if(widthInPercent > 50)
            widthInPercent = 45;
            widthOfBars.push(widthInPercent + '%');
            widthOfBars.push(100 - widthInPercent + '%');
        }
    } else{
        widthOfBars.push('50%');
        widthOfBars.push('50%');
    }    

    //For prev to prev
    if(getData.PrevtoPrev.WorkingHours.Consumption != undefined && getData.PrevtoPrev.NonWorkingHours.Consumption != undefined){
        var workingH = getData.PrevtoPrev.WorkingHours.Consumption.Value;
        var nonWorkingH = getData.PrevtoPrev.NonWorkingHours.Consumption.Value;
    
        if(parseInt(workingH) > parseInt(nonWorkingH)){
            var widthInPercent = nonWorkingH.substr(0,2);
            if(widthInPercent > 50)
            widthInPercent = 45;
            widthOfBars.push(100 - widthInPercent + '%');
            widthOfBars.push(widthInPercent + '%');
        } else {
            var widthInPercent = workingH.substr(0,2);
            if(widthInPercent > 50)
            widthInPercent = 45;            
            widthOfBars.push(widthInPercent + '%');
            widthOfBars.push(100 - widthInPercent + '%');
        }
    }else {
        widthOfBars.push('50%');
        widthOfBars.push('50%');
    }    

    //Logic based on the selected frequency filters        
    var currentTimeData, CurrMonthNum, CurrYearNum, CurrWeek:any;
    if(dateQuery == 'Year'){
        var CurrentYear = getData.Current.TrendDate != null ? getData.Current.TrendDate.substr(0,4) : 'No Data';
        if(CurrentYear == 'No Data'){
            var d = new Date();
            CurrentYear = d.getFullYear();
        }
        currentTimeData = 'Yr-'+CurrentYear;
        CurrYearNum = CurrentYear;
    }
    else if(dateQuery == 'Month'){
        var CurrentMonth = getData.Current.TrendDate != null ? getMonth(getData.Current.TrendDate) : 'No Data' ;
        var CurrentYear = getData.Current.TrendDate != null ? getData.Current.TrendDate.substr(0,4) : 'No Data';
        if(CurrentMonth == 'No Data'){
            var d = new Date();
            CurrMonthNum = d.getMonth() + 1; 
            CurrentMonth = getMonth(CurrMonthNum);
        } else CurrMonthNum = getData.Current.TrendDate.substr(5,2);
        if(CurrentYear == 'No Data') CurrentYear = d.getFullYear();
        currentTimeData = CurrentMonth + ` ` + CurrentYear;
        
    } else if(dateQuery == 'Week'){       
        var CurrentWeek;
        if(getData.Current.TrendDate != null){
            var mydate = new Date(getData.Current.TrendDate);
            CurrentWeek = mydate.getWeek();
        } else {
            var mydate = new Date();
            CurrentWeek = mydate.getWeek();
        }
        currentTimeData = 'WK' + CurrentWeek;
        CurrWeek = CurrentWeek;
    }
    else if(dateQuery == 'Day'){    
        var CurrentDay;
        if(getData.Current.TrendDate != null){
            var d = new Date(getData.Current.TrendDate);
            CurrentDay = WeekdayName(d.getDay());
        } else {
            var d = new Date();
            CurrentDay = WeekdayName(d.getDay());
        }
        currentTimeData = CurrentDay;
    }

    var CurrentHWCost = getData.Current.WorkingHours.Cost != undefined ? formatINR(getData.Current.WorkingHours.Cost.label.replaceAll(",","")) : 'No Data';
    var CurrentNHWCost = getData.Current.NonWorkingHours.Cost != undefined ? formatINR(getData.Current.NonWorkingHours.Cost.label.replaceAll(",","")) : 'No Data';
    
    PreviousData = `<div class="energy-consumption-widgets">
                         <div class="energy-consumption-date"><h6>`+ currentTimeData +`</h6></div>
                         <div class="energy-consumption-widgets-bar">
                             <div class="EMProgressBar1 WHourProgessBar" id="EMProgressBar1" style="width: `+ widthOfBars[0] +`"></div>
                             <div class="EMProgressBar11 NWHourProgessBar" id="EMProgressBar11" style="width: `+ widthOfBars[1] +`"></div>
                         </div>
                         <div class="EMValueUnit">
                            <div style="width: 50%;">
                                <div style="display:flex;">
                                    <div class="energy-consumption-legend-list-btn1"></div>
                                    <div class="EMProgressBarText EMProgressBar1Consumption WHours">`+ WorkingHCurrent +`</div>
                                </div>
                                <div class="EMValueUnitVal WHours WHoursValue1">`+ CurrentHWCost +`</div>
                            </div>                                 
                            <div style="width: 47%;">
                                <div style="display:flex; float:right;">
                                    <div class="energy-consumption-legend-list-btn2" style="margin-left: 5px !important;"></div>
                                    <div class="EMProgressBarText EMProgressBar11Consumption NWHours" style="width:86%;">`+ WorkingNHCurrent +`</div>
                                </div>
                                <div class="EMValueUnitVal NWHours NWHValue11" style="margin-top:18px;text-align:right;">`+ CurrentNHWCost +`</div>
                            </div>
                         </div>
                     </div>`;

    //Previous
    var prevTimeData;
    if(dateQuery == 'Year'){
        var CurrentYear = getData.Current.TrendDate != null ? getData.Current.TrendDate.substr(0,4) : 'No Data';
        if(CurrentYear == 'No Data' || CurrentYear != (CurrYearNum - 1))
            CurrentYear = CurrYearNum - 1;
        prevTimeData = 'Yr-'+CurrentYear;
    }else if(dateQuery == 'Month'){
        var prevMonth = getData.Prev.TrendDate != null ? getMonth(getData.Prev.TrendDate) : 'No Data' ;
        var prevYear = getData.Prev.TrendDate != null ? getData.Prev.TrendDate.substr(0,4) : 'No Data';
        if(prevMonth == 'No Data'){
            if(CurrMonthNum == '01' || CurrMonthNum == '1')
            prevMonth = getMonth(12);
            else
            prevMonth = getMonth(CurrMonthNum - 1);
        }
        if(prevYear == 'No Data') prevYear = CurrentYear;

        prevTimeData = prevMonth + ` ` + prevYear;
    } else if(dateQuery == 'Week'){
        prevTimeData = 'WK' + (CurrWeek - 1);
    }
    else if(dateQuery == 'Day'){
        if(getData.Current.TrendDate != null){
            var d = new Date(getData.Current.TrendDate);
            d.setDate(d.getDate() - 1);
            CurrentDay = WeekdayName(d.getDay());
        } else {
            var d = new Date();
            d.setDate(d.getDate() - 1);
            CurrentDay = WeekdayName(d.getDay());
        }
        prevTimeData = CurrentDay;
    }
    var prevHWCost = getData.Prev.WorkingHours.Cost != undefined ? formatINR(getData.Prev.WorkingHours.Cost.label.replaceAll(",","")) : 'No Data';
    var prevNHWCost = getData.Prev.NonWorkingHours.Cost != undefined ? formatINR(getData.Prev.NonWorkingHours.Cost.label.replaceAll(",","")) : 'No Data';
    
PreviousData = PreviousData + `<div class="energy-consumption-widgets">
                                    <div class="energy-consumption-date"><h6>`+ prevTimeData +`</h6></div>
                                    <div class="energy-consumption-widgets-bar">
                                        <div class="EMProgressBar2 WHourProgessBar" id="EMProgressBar2" style="width: `+ widthOfBars[2] +`"></div>
                                        <div class="EMProgressBar21 NWHourProgessBar" id="EMProgressBar21" style="width: `+ widthOfBars[3] +`"></div>
                                    </div>
                                    <div class="EMValueUnit">
                                        <div style="width: 50%;">
                                        <div style="display:flex;">
                                            <div class="energy-consumption-legend-list-btn1"></div>
                                            <div class="EMProgressBarText EMProgressBar2Consumption WHours">`+ WorkingHPrev +`</div>
                                        </div>
                                            <div class="EMValueUnitVal WHours WHoursValue2">`+ prevHWCost +`</div>
                                        </div>
                                        <div style="width: 47%;">
                                        <div style="display:flex;float:right;">
                                            <div class="energy-consumption-legend-list-btn2" style="margin-left: 5px !important;"></div>
                                            <div class="EMProgressBarText EMProgressBar21Consumption NWHours" style="width:86%;">`+ WorkingNHPrev +`</div>
                                        </div>
                                            <div class="EMValueUnitVal NWHours NWHValue21" style="margin-top:18px;text-align:right;">`+ prevNHWCost +`</div>
                                        </div>
                                    </div>
                                 </div>`;
    //Previous To Previous
    var prevToPrevTimeData;
    if(dateQuery == 'Year'){
        var CurrentYear = getData.Current.TrendDate != null ? getData.Current.TrendDate.substr(0,4) : 'No Data';
        if(CurrentYear == 'No Data' || CurrentYear != (CurrYearNum - 2))
            CurrentYear = CurrYearNum - 2;
        prevToPrevTimeData = 'Yr-'+CurrentYear;
    }else if(dateQuery == 'Month'){
        var prevToPrevMonth = getData.PrevtoPrev.TrendDate != null ? getMonth(getData.PrevtoPrev.TrendDate) : 'No Data' ;
        var prevToPrevYear = getData.PrevtoPrev.TrendDate != null ? getData.PrevtoPrev.TrendDate.substr(0,4) : 'No Data';
        if(prevToPrevMonth == 'No Data'){
            if(CurrMonthNum == '01' || CurrMonthNum == '1')
            prevToPrevMonth = getMonth(11);
            else
            prevToPrevMonth = getMonth(CurrMonthNum - 2);
        }
        if(prevToPrevYear == 'No Data') prevToPrevYear = CurrentYear;

        prevToPrevTimeData = prevToPrevMonth + ` ` + prevToPrevYear;
    }else if(dateQuery == 'Week'){
        prevToPrevTimeData = 'WK' + (CurrWeek - 2);
    } else if(dateQuery == 'Day'){
        if(getData.Current.TrendDate != null){
            var d = new Date(getData.Current.TrendDate);                
            d.setDate(d.getDate() - 2);
            CurrentDay = WeekdayName(d.getDay());
        } else {
            var d = new Date();
            d.setDate(d.getDate() - 2);
            CurrentDay = WeekdayName(d.getDay());
        }
        prevToPrevTimeData = CurrentDay;
    }
    var prevToPrevHWCost = getData.PrevtoPrev.WorkingHours.Cost != undefined ? formatINR(getData.PrevtoPrev.WorkingHours.Cost.label.replaceAll(",","")) : 'No Data';
    var prevToPrevNHWCost = getData.PrevtoPrev.NonWorkingHours.Cost != undefined ? formatINR(getData.PrevtoPrev.NonWorkingHours.Cost.label.replaceAll(",","")) : 'No Data';
    
 PreviousData = PreviousData + `<div class="energy-consumption-widgets">
                                     <div class="energy-consumption-date"><h6>`+ prevToPrevTimeData +`</h6></div>
                                     <div class="energy-consumption-widgets-bar">
                                         <div class="EMProgressBar3 WHourProgessBar" id="EMProgressBar3" style="width: `+ widthOfBars[4] +`"></div>
                                         <div class="EMProgressBar31 NWHourProgessBar" id="EMProgressBar31" style="width: `+ widthOfBars[5] +`"></div>
                                     </div>
                                     <div class="EMValueUnit">
                                        <div style="width: 50%;">
                                        <div style="display:flex;">
                                            <div class="energy-consumption-legend-list-btn1"></div>
                                            <div class="EMProgressBarText EMProgressBar3Consumption WHours">`+ WorkingHPrevtoPrev +`</div>
                                        </div>
                                            <div class="EMValueUnitVal WHours WHoursValue3">`+ prevToPrevHWCost +`</div>
                                        </div>
                                        <div style="width: 47%;">
                                        <div style="display:flex;float:right;">
                                            <div class="energy-consumption-legend-list-btn2" style="margin-left: 5px !important;"></div>
                                            <div class="EMProgressBarText EMProgressBar31Consumption NWHours" style="width:86%">`+ WorkingNHPrevtoPrev +`</div>
                                        </div>
                                            <div class="EMValueUnitVal NWHours NWHValue31" style="margin-top:18px;text-align:right;">`+ prevToPrevNHWCost +`</div>
                                        </div>
                                     </div>
                                 </div>`;         

setPreviousData(PreviousData);

}

//To check wheather the num is more than 5 digits or not and compress it accordingly
function CompressNum(MatricName:any){
    var divideVal, Unit;
    if(MatricName == 'Gas' || MatricName == 'Water'){
        divideVal = 1000000000;
        Unit = ' km^3';
    } else if(MatricName == 'Electrical'){
        divideVal = 1000000;
        Unit = ' GWh';
    } else if(MatricName == 'Waste'){
        divideVal = 1000000;
        Unit = ' Gg'
    }
    
    //Current working hours
    if(getData.Current.WorkingHours.Consumption != undefined){
        if(getData.Current.WorkingHours.Consumption.Value.length > 5){
            var n: number = getData.Current.WorkingHours.Consumption.Value;
            let value = (n / divideVal).toString().substr(0,5);
            WorkingHCurrent = value + Unit;
        }                     
        else
        WorkingHCurrent = getData.Current.WorkingHours.Consumption.label;
    } else 
    WorkingHCurrent = "No Data";
    
    //Current nonworking hours
    if(getData.Current.NonWorkingHours.Consumption != undefined){
        if(getData.Current.NonWorkingHours.Consumption.Value.length > 5){
            var n : number = getData.Current.NonWorkingHours.Consumption.Value;
            let value = (n / divideVal).toString().substr(0,5);
            WorkingNHCurrent = value + Unit;
        }                     
        else
        WorkingNHCurrent = getData.Current.NonWorkingHours.Consumption.label;
    } else 
    WorkingNHCurrent = "No Data";    

    //Prev working hours
    if(getData.Prev.WorkingHours.Consumption != undefined){
        if(getData.Prev.WorkingHours.Consumption.Value.length > 5){
            var n : number = getData.Prev.WorkingHours.Consumption.Value;
            let value = (n / divideVal).toString().substr(0,5);
            WorkingHPrev = value + Unit;
        }    
        else
        WorkingHPrev = getData.Prev.WorkingHours.Consumption.label;
    } else 
    WorkingHPrev = "No Data";
        
    //Prev nonworking hours
    if(getData.Prev.NonWorkingHours.Consumption != undefined){
        if(getData.Prev.NonWorkingHours.Consumption.Value.length > 5){
            var n : number = getData.Prev.NonWorkingHours.Consumption.Value;
            let value = (n / divideVal).toString().substr(0,5);
            WorkingNHPrev = value + Unit;
        }else
        WorkingNHPrev = getData.Prev.NonWorkingHours.Consumption.label;
    }else         
    WorkingNHPrev = "No Data";

    //PrevtoPrev working hour
    if(getData.PrevtoPrev.WorkingHours.Consumption != undefined){
        if(getData.PrevtoPrev.WorkingHours.Consumption.Value.length > 5){
            var n: number = getData.PrevtoPrev.WorkingHours.Consumption.Value;
            let value = (n / divideVal).toString().substr(0,5);
            WorkingHPrevtoPrev = value + Unit;
        } else
        WorkingHPrevtoPrev = getData.PrevtoPrev.WorkingHours.Consumption.label;
    }else
    WorkingHPrevtoPrev = "No Data";   
    
    //PrevtoPrev nonworking hour
    if(getData.PrevtoPrev.NonWorkingHours.Consumption != undefined){
        if(getData.PrevtoPrev.NonWorkingHours.Consumption.Value.length > 5){
            var n: number = getData.PrevtoPrev.NonWorkingHours.Consumption.Value;
            let value = (n / divideVal).toString().substr(0,5);
            WorkingNHPrevtoPrev = value + Unit;
        }                       
        else
        WorkingNHPrevtoPrev = getData.PrevtoPrev.NonWorkingHours.Consumption.label;
    }else  
    WorkingNHPrevtoPrev = "No Data";    
}

function formatINR(x:any){
    var lastThree = x.substring(x.length-3);
    var otherNumbers = x.substring(0,x.length-3);
    if(otherNumbers != '')
        lastThree = ',' + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return res;
}

function WeekdayName(Num: any){
    var weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    return weekday[Num];
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
    
    return <WidgetWrapper className="energy-consumption">
        <TitleBar icon="https://static.iviva.com/images/Adani_UXP/energy.svg" title="ENERGY CONSUMPTION" className="icons">
            <div className='currentDate-energy'></div>
        </TitleBar>     
        
        <div className="info">
            <div className="costInfo">
                <h6>Total Cost: </h6>
                <div className="energyCWTotalCost energyCWTitleChild"><h6>{energy.totalCost}</h6></div>
            </div>              
            <div className="costInfo costInfo2">
                <h6>CostPerSqFT: </h6>
                <div className="energyCWCostUnit energyCWTitleChild"><h6>{energy.CostperSqFt}</h6></div>
            </div>              
        </div>
        <div className="energy-consumption-frequency">
            <ul>
                <li id="Year" className="energy-consumption-frequency-list" onClick={() =>{getEnergyConsumption('Year')} }>Year</li>
                <li id="Month" className="energy-consumption-frequency-list" onClick={() =>{getEnergyConsumption('Month')} }>Month</li>
                <li id="Week" className="energy-consumption-frequency-list" onClick={() =>{getEnergyConsumption('Week')} }>Week</li>
                <li id="Day" className="energy-consumption-frequency-list" onClick={() =>{getEnergyConsumption('Day')} }>Day</li>
            </ul>            
        </div>

        <div className="energy-consumption-Category">
            <div className="energy-consumption-list">
                <div className="energy-consumption-listName"><h6>Electrical</h6></div>
                <div className="energy-consumption-Data">
                    <div className="energy-consumption-icon power-icon-background power-icon"></div>
                    <div className="energy-consumption-val-unit">
                        <div className="energy-consumption-unit">{energy.electricalConsumption}</div>
                        <div className="energy-consumption-val">{energy.electricalCost}</div>
                    </div>
                </div>
            </div>
            <div className="energy-consumption-list">
                <div className="energy-consumption-listName"><h6>Gas</h6></div>
                <div className="energy-consumption-Data">
                    <div className="energy-consumption-icon gas-icon-background gas-icon"></div>
                    <div className="energy-consumption-val-unit">
                        <div className="energy-consumption-unit">{energy.gasConsumption}</div>
                        <div className="energy-consumption-val">{energy.gasCost}</div>
                    </div>
                </div>
            </div>
            <div className="energy-consumption-list">
                <div className="energy-consumption-listName"><h6>Water</h6></div>
                <div className="energy-consumption-Data">
                    <div className="energy-consumption-icon water-icon-background water-icon"></div>
                    <div className="energy-consumption-val-unit">
                        <div className="energy-consumption-unit">{energy.waterConsumption}</div>
                        <div className="energy-consumption-val">{energy.waterCost}</div>
                    </div>
                </div>
            </div>
            <div className="energy-consumption-list">
                <div className="energy-consumption-listName"><h6>Waste</h6></div>
                <div className="energy-consumption-Data">
                    <div className="energy-consumption-icon waste-icon-background waste-icon"></div>
                    <div className="energy-consumption-val-unit">
                        <div className="energy-consumption-unit">{energy.wasteConsumption}</div>
                        <div className="energy-consumption-val">{energy.wasteCost}</div>
                    </div>
                </div>
            </div>
        </div>
        <div className="energyMatric">
            <div className="energy-consumption-widget">
                <div className="EMatricTitle"><h6>Select a source</h6></div>
                <div className="EMDropdownPart">
                    <div className="EMDropdownPartName">
                    </div>
                    <select name="" id="EMDropdown" onChange={(value) =>{handleChange(value)}}>
                        <option className="EMDropdownList" value="Electrical">Electrical</option>
                        <option className="EMDropdownList" value="Gas">Gas</option>
                        <option className="EMDropdownList" value="Water">Water</option>
                        <option className="EMDropdownList" value="Waste">Waste</option>
                    </select>
                </div>            
                <div className="energy-consumption-legend">
                    <div className="energy-consumption-legend-list">
                        <div className="energy-consumption-legend-list-btn1"></div>
                        <div className="energy-consumption-legend-list-name">Working Hours</div>
                    </div>
                    <div className="energy-consumption-legend-list last-list">
                        <div className="energy-consumption-legend-list-btn2"></div>
                        <div className="energy-consumption-legend-list-name">Non Working Hours</div>
                    </div>
                </div>
            </div>
            <div className="energy-consumption-data" dangerouslySetInnerHTML={{__html: PreviousData }}></div>
        </div>
    </WidgetWrapper>;
}

export default EnergyConsumption;