import * as React from "react";
import { TitleBar,  WidgetWrapper,DataList } from "uxp/components";
import { IContextProvider } from '../uxp';
import '../styles.scss';


import PerPersonConsumption from  '../json/perPersonConsumption.json'

interface IEnergyConPerPersonProps {
    uxpContext?: IContextProvider
}

const EnergyConPerPerson:React.FunctionComponent<IEnergyConPerPersonProps> = (props) => {

let [data, setdata] = React.useState([]);

React.useEffect(()=>{
        getEnergyConPerPerson()
    },[]);
	
 async function getEnergyConPerPerson() {
       // let sdata = await props.uxpContext.executeAction('AdaniEnergyDashboard','PerPersonConsumption',{json:true});
        //  let sdata = PerPersonConsumption;
		const myData = PerPersonConsumption;
        EnergyConsumptionPerPerson(myData);
    }

function EnergyConsumptionPerPerson(v: any){
    var MonthName = getMonth(v.PerPersonConsumption.DateTime) +' '+ v.PerPersonConsumption.DateTime.slice(0,4);
    document.querySelector('.curr_month').innerHTML = MonthName;

    var value = v.PerPersonConsumption.Details;
    var newArray:Array<any>=[]         
        value.forEach((i:any)=>{ 
             newArray.push(
             {
              "ConsumptionValue":i.Consumption.Value,
              "ConsumptionUnit":i.Consumption.Unit,
               "Label":i.Label,
               "CostUnit":i.Cost.Unit,
               "CostValue":formatINR(i.Cost.Value.replaceAll(",",""))
             });
          });

    setdata(newArray);
}

function formatINR(x:any){
    var lastThree = x.substring(x.length-3);
    var otherNumbers = x.substring(0,x.length-3);
    if(otherNumbers != '')
        lastThree = ',' + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return res;
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
    
    return <WidgetWrapper className="energy-consumption-per-person_widget">
        <TitleBar  icon="https://static.iviva.com/images/Adani_UXP/person.png" title="ENERGY CONSUMPTION PER PERSON">
            <div className='curr_month'></div>
        </TitleBar>        
        
        <div className='energy-consumption_widget'>
        <div className="energy-consumption-list">
            <ul>                
                {  data.map((item: any) =>  {
                   return <li>
                        <div className="person-icon"></div>
                        <h4>{item.ConsumptionValue} {item.ConsumptionUnit}</h4>
                        <span>{item.Label}</span>
                        <p>{item.CostUnit} {item.CostValue}</p>
                    </li>

                })
                }
            </ul>  
        </div> 
        </div>

    </WidgetWrapper>; 

}

export default EnergyConPerPerson;