import * as React from "react";
import { TitleBar,  WidgetWrapper,DataList } from "uxp/components";
import { IContextProvider } from '../uxp';
import '../styles.scss';

interface IParkingProps {
    uxpContext?: IContextProvider
}

const Parking:React.FunctionComponent<IParkingProps> = (props) => {

let [data, setData] = React.useState<any>({});
let [details, setDetails] = React.useState<any>([]);
let [floors, setfloors] = React.useState<any>([]);
let [curfloor, setcurfloor] = React.useState<any>([]);

React.useEffect(()=>{
        getParkingData()
    },[]);
	
 async function getParkingData() {
        let sdata = await props.uxpContext.executeAction('AdaniEnergyDashboard','ParkingComsumption',{},{json:true});
		const myData = JSON.parse(sdata.data);
        parking(myData);
        setDetails(myData.ParkingConsumption.Details);
        myData.ParkingConsumption.Details.forEach((v:any, i:any)=>{ 
            floors.push('floor ' + (i+1));
         });
        setcurfloor(floors[0]);
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

function formatINR(x:any){
    var lastThree = x.substring(x.length-3);
    var otherNumbers = x.substring(0,x.length-3);
    if(otherNumbers != '')
        lastThree = ',' + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return res;
}

function parking(value : any){
    var MonthName = getMonth(value.ParkingConsumption.ISODate) + ' ' + value.ParkingConsumption.ISODate.slice(0,4);
    document.querySelector('.parking_cur_month').innerHTML = MonthName;
    var consumptionValue, consumptionValueUnit;
    if(value.ParkingConsumption.Details.length > 0){

        if(value.ParkingConsumption.Details[0].Consumption.length > 5){
            var n : number = value.ParkingConsumption.Details[0].Consumption;
            let values = (n / 1000000).toString().substr(0, 5);
            consumptionValue = values;
            consumptionValueUnit = 'GWh';
        } else {
            consumptionValue = value.ParkingConsumption.Details[0].Consumption;
            consumptionValueUnit = value.ParkingConsumption.Details[0].Unit;
        }
        setData({
                floorName : value.ParkingConsumption.Details[0].Name,
                floorconsumption: consumptionValue, 
                floorconsumptionUnit: consumptionValueUnit,
                parkingCostUnit: value.ParkingConsumption.Details[0].CostUnit,
                parkingPrice: formatINR(value.ParkingConsumption.Details[0].Cost.replaceAll(",","")),
                energyConsumed: value.ParkingConsumption.Details[0].Percentage
            });

        if(value.ParkingConsumption.Details[0].Percentage.includes('lesser'))
            document.querySelector('.indicateArrow').classList.remove('up-direction');
        else if(value.ParkingConsumption.Details[0].Percentage.includes('greater'))
            document.querySelector('.indicateArrow').classList.add('up-direction');
    }

}

function loadData(v:any){
    var consumptionValue, consumptionValueUnit;
    if(v.Consumption.length > 5){
        var n : number = v.Consumption;
        let values = (n / 1000000).toString().substr(0, 5);
        consumptionValue = values;
        consumptionValueUnit = 'GWh';
    } else {
        consumptionValue = v.Consumption;
        consumptionValueUnit = v.Unit;
    }
    setData({
            floorName : v.Name,
            floorconsumption: consumptionValue, 
            floorconsumptionUnit: consumptionValueUnit,
            parkingCostUnit: v.CostUnit,
            parkingPrice: formatINR(v.Cost.replaceAll(",","")),
            energyConsumed: v.Percentage
        });

    if(v.Percentage.includes('lesser'))
        document.querySelector('.indicateArrow').classList.remove('up-direction');
    else if(v.Percentage.includes('greater'))
        document.querySelector('.indicateArrow').classList.add('up-direction');
}

function NextFloor(){
    let f = floors.indexOf(curfloor);
    if (f < (floors.length - 1)){
        loadData(details[f+1]);
        setcurfloor(floors[f+1]);
    }
}

function PrevFloor(){
    let f = floors.indexOf(curfloor);
    if (f> 0)
    {
        loadData(details[f-1]);
        setcurfloor(floors[f-1]);
    }
}
    
    return <WidgetWrapper className="parking-weblet">
        <TitleBar  icon="https://static.iviva.com/images/Adani_UXP/parking-icon.png" title="PARKING">
            <div className='parking_cur_month'></div>
            <div className="buttons">
            <div className='parking-previous' onClick={() => PrevFloor()}></div>
            <div className='parking-next' onClick={() => NextFloor()}></div>
        </div>
        </TitleBar>       
        
        <div className="parkingInfo">
            <div className="parkingData">
                <div className="floorName">
                    <h6>{data.floorName}</h6>
                </div>
                <div className="floorData">
                    <div className="floorConsumption">{data.floorconsumption}</div>
                    <div className="floorConsumptionUnit">{data.floorconsumptionUnit}</div>
                </div>
            </div>
            <div className="parkingData">
                <div className="parkingCostUnit">{data.parkingCostUnit}</div>
                <div className="parkingPrice">{data.parkingPrice}</div>
            </div>
            <div className="parkingData">
                <div className="indicateArrow"></div>
                <div className="energyConsumed">{data.energyConsumed}</div>
            </div>
        </div>
    </WidgetWrapper>; 

}

export default Parking