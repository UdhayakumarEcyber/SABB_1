import * as React from "react";
import { TitleBar, DataGrid, FormField, Select, WidgetWrapper} from "uxp/components";
import { IContextProvider } from '../uxp';
import '../styles.scss';



import environmentalMatrixInitData from  '../json/environmentalMatrixInitData.json'


import environmentalMatrixLoadData from  '../json/environmentalMatrixLoadData.json'


interface IKeys { key1: string; key2: string }
// notice the parentheses, to avoid confusion with a block scope


interface IEnvironmentMetricsProps {
    uxpContext?: IContextProvider
}

const EnvironmentMetrics:React.FunctionComponent<IEnvironmentMetricsProps> = (props) => {

// props
    let { uxpContext } = props;

    //states
/* we are creating a state variable data with associated update function and initialising with empty array*/

let [data, setData] = React.useState<any>({})
let [selWing,setSelWing]=React.useState<any>("")
let [selFloor,setSelFloor]=React.useState<any>("")
let [floorData,setFloorData]=React.useState<any>([])
let [floors,setFloors]=React.useState<any>([])
let [wingsData, setWingsData] = React.useState([]);
const [isLoading, setIsLoading] = React.useState(false);

React.useEffect(()=>{
        getEnvironmentDetails()
},[]);

function loadData(me: {},sf:""){
    floorData.length=0;
    for (const [k, v] of Object.entries(me)) {      
        if (k === sf)
        {     
        for (const [k1,v1] of Object.entries(v))  {
        floorData.push(v1);
            };
        }
    };
        setFloorData(floorData);       
}

function togglePrev()
{
    let ind = floors.indexOf(selFloor);
    if (ind> 0)
    {
     setSelFloor(floors[ind-1]);    
     document.querySelector('.floorName').innerHTML = floors[ind-1];
     loadData(data,floors[ind-1]);
    }
    if(floors[ind - 1] == 'Floor 1')
    document.querySelector('.lft-arrow').classList.add('disabled');
    document.querySelector('.rgt-arrow').classList.remove('disabled');
}

function toggleNext()
{
    let ind = floors.indexOf(selFloor);
    if (ind < (floors.length - 1))
    {
        setSelFloor(floors[ind+1]);        
        document.querySelector('.floorName').innerHTML = floors[ind+1];
        loadData(data,floors[ind+1]);
    }
    document.querySelector('.lft-arrow').classList.remove('disabled');
    if(floors[floors.length - 1] == floors[ind+1])    
    document.querySelector('.rgt-arrow').classList.add('disabled');
}

async function getFloorsForSelectedWing(selected_wing :any){
    setIsLoading(true);
    let params = {
            WingLocName: selected_wing
        }
 // let ldata = await props.uxpContext.executeAction('AdaniDashboard','EnvironmentalMatrixLoadData',params,{json:true});
        /* similar to this.setState({data:data}) */


        let ldata =  environmentalMatrixLoadData;

        let me=ldata.EnvironmentMatricsDetails;    
       //LoadFloors..Start
       floors.length=0
        for (const [k, v] of Object.entries(me)) {
            floors.push(k);
       }
      
        //LoadFloors..End
    
        //loadData ..start
     floorData.length=0
        for (const [k, v] of Object.entries(me)) {      
            if (k === floors[0])
            {
                for (const [k1,v1] of Object.entries(v))  {
                floorData.push(v1);      
                };
            }
    };

        //loadData ..end
        // set all state variables 
        setSelWing(selected_wing);
        setData(me);        
        setFloors(floors);
        setSelFloor(floors[0]);
        setFloorData(floorData);
		setIsLoading(false);
}

function handlefilterchange(value:any){
    getFloorsForSelectedWing(value);
    }

async function getEnvironmentDetails() {
    setIsLoading(true);
   // let data = await props.uxpContext.executeAction('AdaniDashboard','EnvironmentalMatrixInitData',{json:true});
        /* similar to this.setState({data:data}) */

        let data = environmentalMatrixInitData;
     //  data=JSON.parse(data);       
        let me=data.EnvironmentMatricsDetails;		
        let wngs=data.Wings;
        //WingsFilter..start         
         var newArray:Array<any>=[]         
          wngs.forEach((i:any)=>{ 
             newArray.push(
             {
              "label":i.WingFullName,
              "value":i.WingLocName,
               "IsSelected":i.IsSelected
             });
          });
       
        let obj = newArray.find(o => o.IsSelected === '1');
        selWing=obj.value;
         //WingsFilter..End
        
        //LoadFloors..Start
        for (const [k, v] of Object.entries(me)) {
            floors.push(k);
        }
        
            //LoadFloors..End
    
            //loadData ..start

        for (const [k, v] of Object.entries(me)) {        
        if (k === floors[0])
        {
            for (const [k1,v1] of Object.entries(v))  {
            floorData.push(v1);             
                };
        }
        };
        //loadData ..end  
        // all set state variables at one place else it is causing rerenderings 
        setData(me);
        setWingsData(newArray);
        setSelWing(selWing);
        setFloors(floors);
        setSelFloor(floors[0]);
        setFloorData(floorData);
		setIsLoading(false);	  
}
   
   if(data.constructor === Object && Object.entries(data).length > 0)
   {
    return (	
	<WidgetWrapper className="environment-matrics-widget">
	    <TitleBar icon="https://static.iviva.com/images/Adani_UXP/emision-icon.svg" title="Environment Metrics">
				<div className="tool-bar">
                    <FormField inline>
                        <Select selected={selWing}
                            onChange={(value) => handlefilterchange(value)}
                            options={wingsData}
                            placeholder="select a Wing"
                        />
                    </FormField>
                </div>
		</TitleBar>
        <div className="floorInfo">
            <div className="floorName">Floor 1</div>
            <div className="footfall-arrows">
                <a className="lft-arrow disabled" id="environmentLeftSlide" onClick={() => togglePrev()}></a>
                <a className="rgt-arrow" id="environmentRightSlide" onClick={() => toggleNext()}></a>
            </div>
        </div>         

      {isLoading ? (
        <div className="loadingIcon">
        </div>
      ) : (
          <DataGrid
            data={floorData}
            columns={2}
            renderItem={
                (item: any, key: number) => {
                return (<div className="stat-tile" key={key}>
                    <div className="top">
                        <div className="title">{item.Name}</div>
                        <div className="count">{item.Value}{item.Unit}</div>
                    </div>
                    </div>)
                    }}
                />
			)}
    </WidgetWrapper> )
    }
    else
   {
    return (<WidgetWrapper className="employee-login-card">
        <TitleBar title="LoggedIn User" />
        </WidgetWrapper>)
    }    
}

export default EnvironmentMetrics;