import * as React from "react";
import { TitleBar,  WidgetWrapper } from "uxp/components";
import { IContextProvider } from '../uxp';
import '../styles.scss';



import footFallInitLoad from  '../json/footFallInitLoad.json' 
import footFallMatrix from  '../json/footFallMatrix.json'


interface IDailyCampusFootfallProps {
    uxpContext?: IContextProvider
}

const DailyCampusFootfall:React.FunctionComponent<IDailyCampusFootfallProps> = (props) => {

    var footfallDetailsInitDataOutput = null;  // This has Wing config details from init Data
    var footfallDetailsData:any = null; // This has init or load data used for display purpose
    
    let [footfallDetailsDataOutput, setfootfallDetailsDataOutput] = React.useState<any>([]);
    let [footfallDifferentialArray, setfootfallDifferentialArray] = React.useState<any>([]);
    let [details, setdetails] = React.useState<any>([]);
    React.useEffect(()=>{
        getDailyCampusFootfall();
    },[]);
	
async function getDailyCampusFootfall() {
    
        // let ddata = await props.uxpContext.executeAction('AdaniDashboard','FootFallInitLoad',{json:true});
        // var cdata = JSON.parse(ddata);
        // getFootfall(cdata);

        
        getFootfall(footFallInitLoad);
    }
    
    function getFootfall(value:any){

        footfallDetailsInitDataOutput=value; 
        footfallDetailsData = value;
        setfootfallDetailsDataOutput(value);
        
        for (const [key, val] of Object.entries(value.FloorWiseHourlyData)) {
            var v:any = val, list:any;  
            let series_={
                name:key,
                "DifferentialView":v.DifferentialView				
              };
              footfallDifferentialArray.push(Object.assign({}, series_));
            }
        if(document.querySelector('.dropdown_footfall') != null)
        document.querySelector('.dropdown_footfall').innerHTML = '';
        var selVal = 0;
        value.Wings.forEach((v:any) => {
            if (v.IsSelected == 1)
            selVal = value.WingLocName; 
            if (list != undefined)
            list += `<option class="` + v.WingLocName + `" data-value="` + v.WingLocName + `">` + v.WingFullName + `<span class='strip'></span></option>`;
            else
            list = `<option class="` + v.WingLocName + `" data-value="` + v.WingLocName + `">` + v.WingFullName + `<span class='strip'></span></option>`;
        });
        document.querySelector('.dropdown_footfall').innerHTML = list;
        footfallSection('CompareFootFall');  
    }

    function changeInList(v:any){
        var txt = v.target.value;
        document.querySelector('.EW').classList.remove('current');
        document.querySelector('.WW').classList.remove('current');
        document.querySelector('.NW').classList.remove('current');
        document.querySelector('.SW').classList.remove('current');
        if(txt == 'East Wing'){
            document.querySelector('.EW').classList.add('current');
            var selVal = 'EW';
        }
        else if(txt == 'West Wing'){
            document.querySelector('.WW').classList.add('current');
            var selVal = 'WW';
        }
        else if(txt == 'North Wing'){
            document.querySelector('.NW').classList.add('current');
            var selVal = 'NW';
        }
        else if(txt == 'South Wing'){
            document.querySelector('.SW').classList.add('current');
            var selVal = 'SW';
        }

        footfallDetailsAreaChart(selVal);
    }

    async function footfallDetailsAreaChart(selValue:any){
       // debugger
        let params = {                    
            WingLocName: selValue
        }
       //  let mdata = await props.uxpContext.executeAction('AdaniDashboard','FootFallMatrix',params,{json:true});
       // getFootfallMatrix(mdata); 

         let mdata = (footFallMatrix as any)[selValue];
        console.log("footfall", mdata);

        getFootfallMatrix(mdata);
       
    }

    function getFootfallMatrix(value:any){
        footfallDetailsData=value;      
        setfootfallDetailsDataOutput(value);  
        footfallDifferentialArray = [];

        for (const [key, val] of Object.entries(value.FloorWiseHourlyData)) {
            var v:any = val
            let series_={
              name:key,
              "DifferentialView":v.DifferentialView				
            };
            footfallDifferentialArray.push(Object.assign({}, series_));
          }

        footfallSection('CompareFootFall'); 

    }

    function footfallSection(selValue:any){
        if(footfallDetailsData == null)
        var data = footfallDetailsDataOutput;
        else var data = footfallDetailsData;
        var colorFill = [],
        viewTableData = [],
        floorarrow = [],
        DateList = [],
        iconChange = [],
        iconBgChange = [], 
        floorRange =[],
        footfallStatus =[];

        document.querySelector('.footfalldailydata').innerHTML = '';
        document.querySelector('.footfall_data').innerHTML = '';
        document.querySelector('.footfall_data-header').innerHTML = '';

        let datehour = new Date(data.FootFallLiveData.LastUpdatedISODateTime); 
        var update_date = new Date(data.FootFallLiveData.LastUpdatedISODateTime);
        var update_hours:any = update_date.getHours() > 12 ? update_date.getHours() - 12 : update_date.getHours();
        var update_am_pm = update_date.getHours() >= 12 ? "PM" : "AM";
        update_hours = update_hours < 10 ? "0" + update_hours : update_hours;
        var update_minutes = update_date.getMinutes() < 10 ? "0" + update_date.getMinutes() : update_date.getMinutes(); 
        var upDatedTime = update_hours + ":" + update_minutes + " " + update_am_pm;

        var footFallData = ` <div class="visitors_count-sec">
                                <div class="visitors_count-top" style="color:#424242;">  
                                    <div class="visitors_count-no"> ` + data.FootFallLiveData.TotalCampusFootFall + ` <span class="visitors_icon"></span></div>
                                    <p>Daily CAMPUS FOOTFALL</p>
                                    <em>Last updated ` + upDatedTime + `</em>
                                </div>    
                                <div class="visitors_count-bot visitors_count-bot-grey">                            
                                    <p>` + data.FootFallLiveData.WingFullName + `, ` + data.FootFallLiveData.FloorName + `</p>
                                    <em>Floor with high activity</em>                            
                                </div> `

        document.querySelector('.footfalldailydata').innerHTML = footFallData;
        var footfallData:any;
        Object.keys(data.FloorWiseHourlyData).forEach(function(key,val) { 
          floorarrow = [];
          floorRange =[];

          if (selValue == 'CompareFootFall') {
            floorarrow.push(data.FloorWiseHourlyData[key].CompareFootFall.FloorIcon);
            floorRange.push(data.FloorWiseHourlyData[key].CompareFootFall.FloorColor);
          }
          else if (selValue == 'MeasureUtilisation') {
            floorarrow.push(data.FloorWiseHourlyData[key].MeasureUtilisation.FloorIcon);
            floorRange.push(data.FloorWiseHourlyData[key].MeasureUtilisation.FloorColor);
          }        
        if(footfallData != undefined)
        footfallData += ` <ul>       
                            <li>
                                <div class="floor-no"><span class="floor_arrow ` + floorarrow + `" style="background-color: `+ floorRange +`"></span><h3> ` + key + ` </h3></div>
                            </li> `
        else footfallData = ` <ul>       
        <li>
            <div class="floor-no"><span class="floor_arrow ` + floorarrow + `" style="background-color: `+ floorRange +`"></span><h3> ` + key + ` </h3></div>
        </li> `

        var keyName = key;
        Object.keys(data.FloorWiseHourlyData[key].HourlyData).forEach(function(key,val) {
            var d =  data.FloorWiseHourlyData[keyName].HourlyData[key];
            viewTableData = [];
            colorFill = []; 

            var footfallStatus;
            var toolTipLabel; 

            if (selValue == 'CompareFootFall') {
                colorFill.push(d.CompareFootFall.ColorFill);
                footfallStatus = d.CompareFootFall.Status;
                viewTableData.push(d.CompareFootFall.Value);
                document.getElementById('footfall_data-diff').style.display = 'none';
                document.getElementById('footfall_data').style.display = 'block';
                document.getElementById('footfall_data-header').style.display = 'block';
                document.getElementById('floorData').style.overflow = 'auto';
                document.getElementById('RTLS_slide_lft').style.display = 'block';
                document.getElementById('RTLS_slide_rgt').style.display = 'block';
               
                toolTipLabel = footfallStatus;
                if( footfallStatus == "Acceptable"){  
                 toolTipLabel = "Minor Increase";
                }
                else if( footfallStatus == "optimal"){  
                   toolTipLabel = "Normal";
                  } 
                else if( footfallStatus == "unacceptable"){  
                    toolTipLabel = "Major Increase";
                } 
                
            }

            else if (selValue == 'MeasureUtilisation') {
                colorFill.push(d.MeasureUtilisation.ColorFill);
                footfallStatus= d.MeasureUtilisation.Status;
                toolTipLabel = footfallStatus; // For tooltip
                viewTableData.push(d.MeasureUtilisation.Value);
                document.getElementById('footfall_data-diff').style.display = 'none';
                document.getElementById('footfall_data').style.display = 'block';
                document.getElementById('footfall_data-header').style.display = 'block';
                document.getElementById('floorData').style.overflow = 'auto';
                document.getElementById('RTLS_slide_lft').style.display = 'block';
                document.getElementById('RTLS_slide_rgt').style.display = 'block';
            }  

            if( footfallStatus == ""){
              footfallData += `<li><div class="table_data black-box_data ` + footfallStatus + `" ><span class="steps_mark steps_mark_white"></span> ` + viewTableData + ` </div></li> `
            }
            else{
              footfallData += `<li><div class="table_data black-box_data ` + footfallStatus + `" > <div class="tooltip">` + toolTipLabel + `</div> <span class="steps_mark steps_mark_white"></span> ` + viewTableData + ` </div></li> `
            }                   
            });           

            footfallData += ` </ul>`
          }); 

          document.querySelector('.footfall_data').innerHTML = footfallData;

          var footfallDataHeader = ` <ul>   
              <li> <div class="floor-thead-time time-txt"> Time </div> </li> ` 
              var floorHour = data.FootFallLiveData.LastUpdatedISODateTime;  

                var tableDate_date = new Date(floorHour);
                var tableDate_hours = tableDate_date.getHours();
                for( var tableDate= 0; tableDate <= tableDate_hours; tableDate++ ){
                    footfallDataHeader += `<li><div class="floor-thead-time">` + tableDate + `:00</div></li> `
                }
                
              footfallDataHeader += ` </li>`
            document.querySelector('.footfall_data-header').innerHTML = footfallDataHeader;
    }

    function fnRenderDiffrentialView(currentIndex:any){
        let data = footfallDetailsDataOutput; 
        var val = footfallDifferentialArray[currentIndex];
        var maxIndex=(Object.keys(data.FloorWiseHourlyData).length);
        var d = [currentIndex, val.name, maxIndex];
        setdetails(d);
        document.getElementById('footfall_data').style.display = 'none';
        document.getElementById('footfall_data-header').style.display = 'none';
        document.getElementById('footfall_data-diff').style.display = 'block';
        document.getElementById('floorData').style.overflow = 'hidden';
        document.getElementById('RTLS_slide_lft').style.display = 'none';
        document.getElementById('RTLS_slide_rgt').style.display = 'none';

        var footfallDataDiff = `<div class="floor-section-cont floor-section-lft"> 
                                        <p>` + val.DifferentialView.TimeRangeMorning + `</p> 
                                        <h3> ` + val.DifferentialView.MorningAvgCount + `
                                            <em></em>
                                        </h3>
                                </div>
                                <div class="floor-section-cont floor-section-rgt">               
                                        <h3>` + val.DifferentialView.EveningAvgCount + `
                                            <em></em>
                                        </h3>
                                        <p>` + val.DifferentialView.TimeRangeEvening + `</p> 
                                </div>`

        document.querySelector('.floor-section').innerHTML = footfallDataDiff;
    }

    function showFilter(){
        var addfilter = document.getElementById("filterMenu");
        addfilter.classList.add("filter-menu-nav");                                               
        document.getElementById("filter_menu_close").style.display = "block"; 
        document.getElementById("filterMenu").style.display = "block";
    }
    function removeFilter(){
        var removefilter = document.getElementById("filterMenu");
        removefilter.classList.remove("filter-menu-nav"); 
        document.getElementById("filter_menu_close").style.display = "none"; 
        document.getElementById("filterMenu").style.display = "none";
    }

    function fnFloorUpArrow(currentIndex:any){
        var index = parseInt(currentIndex)-1;  
        if (index >= 0)
        fnRenderDiffrentialView(index);
    }

    function fnFloorDownArrow(currentIndex:any,maxIndex:any){
        var index = parseInt(currentIndex)+1; 
        if (index < maxIndex)
        fnRenderDiffrentialView(index);
    }

    return <WidgetWrapper className="Daily-Campus-Footfall-widget">

    <div className="visitors_count">     
        <div className="filteroverall">           
            <div className="filter_sec" onClick={()=>{showFilter()}}></div>
                <div className="filter-menu filter-menu-nav" id="filterMenu">
                <ul className="footfall_section_list">
                    <li><a onClick={()=>{footfallSection('CompareFootFall')}}>Compare FootFall</a></li>
                    <li><a onClick={()=>{footfallSection('MeasureUtilisation')}}>Measure Utilisation</a></li>
                    <li><a onClick={()=>{fnRenderDiffrentialView(0)}} className="meeting_active">Differential View</a></li>
                </ul>
                <span className="filter_menu_close" id="filter_menu_close" onClick={()=>{removeFilter()}}></span>
            </div>  
       </div> 
       <div className="wing_angle">
            <div id="dd" className="footfall_wrapper">
            <span className="wing_map"></span>
            <select className="dropdown_footfall" id="footFallWIngs" onChange={(v)=>{changeInList(v)}}>
                <option className="EW" value="EW">East Wing</option>
                <option className="WW" value="WW">West Wing</option>
                <option className="NW" value="NW">North Wing</option>
                <option className="SW" value="SW">South Wing</option>
            </select>
            </div>  
        </div>
        <div className="footfalldailydata"></div>
        <div className="footfall-scroll-arrow" id="RTLS_slide_lft">
                <span className="footfall_arrow"></span>
        </div>
    </div>
    <div className="floor_details tabcontent" id="floorData">
        <div className="floor_details-cont">
            <div className="table_footfall">
                <div className="footfall_data-header" id='footfall_data-header'></div>
                <div className="footfall_data" id='footfall_data'></div>
            </div>
            <div className="footfall_data-diff" id='footfall_data-diff'>
                <div className="diffetent_view graph_by_floor">
                    <div className="floor"> 
                        <p>
                            <a id="floorUpArrow" onClick={()=>{fnFloorUpArrow(details[0])}} className="floor_up-arrow"></a> 
                            {details[1]}
                            <a id="floorDownArrow" onClick={()=>{fnFloorDownArrow(details[0],details[2])}} className="floor_down-arrow"></a>
                        </p> 
                    </div>
                    <div className="floor-section"></div>
                </div>
            </div>
        </div>
        <div className="footfall-scroll-arrow" id="RTLS_slide_rgt">
            <span className="footfall_arrow"></span>
        </div>
    </div>
    </WidgetWrapper>;
}

export default DailyCampusFootfall;