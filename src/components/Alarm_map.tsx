import * as React from "react"; 
import { TitleBar,  WidgetWrapper,DataList, MapComponent } from "uxp/components";
import { IContextProvider } from '../uxp';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
 

import '../styles.scss';
  
interface ITopIconsProps {
    uxpContext?: IContextProvider
}  

const Alarm_Map: React.FunctionComponent<ITopIconsProps> = (props) => {   

    let [selected, setSelected] = React.useState<string | null>("op-1");

    let [regions, setRegions] = React.useState<any[]>([])
    let [isAddingRegion, setIsAddingRegion] = React.useState<boolean>(false)

    let regionCoords = React.useRef<any[]>([]) 

   const addRegion = () => {
       setIsAddingRegion(true);
   } 

    return ( <WidgetWrapper className="alarm_map">
    <TitleBar title='Alarm Map'> </TitleBar>  

    <div className="transport_map">

        <div className="transport_map-sec" style={{ width: "100%", height: "100%" }}>   

        <MapComponent
           // mapUrl="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"

           // mapUrl="https://s3.amazonaws.com/ecyber.public/sabb-mzzanine.png" 

            // mapUrl="https://osm.org/go/xqRY2M90?layers=H"

            mapUrl=""


        //   staticImage={{url:'https://static.iviva.com/images/SABB/sabb-mzzanine.png', width:1800,height:1500}}

        staticImage={{url:'https://s3.amazonaws.com/ecyber.public/sabb-mezzanine.png', width:2000,height:2000}}

            onMarkerClick={(el, data) => {  
                console.log(el)
                console.log(data)
            }}

            onClick ={(e)=> {
                console.log("Hi", e)
            }} 

            center={{ position: { latitude: 1000, longitude: 1000 }, renderMarker: false }}
 
            // zoom={15}
             zoom={0}
             maxZoom={10}
             minZoom ={-10}
             regions={regions}  
             zoomOnScroll ={true} 
          

            markers={[   
                {
                    latitude: 752.1023753777986,
                    longitude:  332.4224829678857,
                    data: {
                        name: "Medina"
                    },
                     customHTMLIcon : {
                        className : "map_spot chart",
                        html : "",
                        iconSize : [23, 23]
                    }, 
                    renderPopup :{
                        content : () => 
                        
                        <div className="spot_content green-energy_content">  
                            <div className="section-content">
                               <h5>Equipment : FAS-001</h5>
                                <p>Time : 2min ago</p>  
                                <a href="#">View More</a>
                            </div>  
                        </div> 
                    } 
                },  

                {
                    latitude: 927.5874392919324,
                    longitude: 379.38180754130906,
                    data: {
                        name: "Medina"
                    },
                     customHTMLIcon : {
                        className : "map_spot chart",
                        html : "",
                        iconSize : [23, 23]
                    }, 
                    renderPopup :{
                        content : () => 
                        
                        <div className="spot_content green-energy_content">  
                            <div className="section-content">
                            <h5>Equipment : FAS-002</h5>
                                <p>Time : 5min ago</p>  
                                <a href="#">View More</a>
                            </div>  
                        </div> 
                    } 
                }, 

                {
                    latitude: 661.3250475605643,
                    longitude: 950.4962197017782,
                    data: {
                        name: "Medina"
                    },
                     customHTMLIcon : {
                        className : "map_spot chart",
                        html : "",
                        iconSize : [23, 23]
                    }, 
                    renderPopup :{
                        content : () => 
                        
                        <div className="spot_content green-energy_content">   
                            <div className="section-content">
                            <h5>Equipment : FAS-003</h5>
                                <p>Time : 2min ago</p>  
                                <a href="#">View More</a>
                            </div>  
                        </div> 
                    } 
                }, 
                 {
                    latitude: 889.6070685884912,
                    longitude: 1098.5258746925829,
                    data: {
                        name: "Medina"
                    },
                    customHTMLIcon : {
                        className : "map_spot chart",
                        html : "",
                        iconSize : [23, 23]
                    }, 
                    renderPopup :{
                        content : () => 
                        
                        <div className="spot_content green-energy_content">   
                            <div className="section-content">
                            <h5>Equipment : FAS-004</h5>
                                <p>Time : 3min ago</p>  
                                <a href="#">View More</a>  
                            </div>  
                        </div> 
                    } 
                },
                
                {
                    latitude: 1038.5301010835633,
                    longitude: 1211.5485166788053,
                    data: {
                        name: "Medina"
                    },
                    customHTMLIcon : {
                        className : "map_spot chart",
                        html : "",
                        iconSize : [23, 23]
                    }, 
                    renderPopup :{
                        content : () => 
                        
                        <div className="spot_content green-energy_content">   
                            <div className="section-content">
                                <h5>Equipment : FAS-005</h5>
                                <p>Time : 5min ago</p>  
                                <a href="#">View More</a>
                            </div>  
                        </div> 
                    } 
                }, 

                {
                    latitude: 1330.9789577876963,
                    longitude: 977.5016297338844,
                    data: {
                        name: "Medina"
                    },
                    customHTMLIcon : {
                        className : "map_spot chart",
                        html : "",
                        iconSize : [23, 23]
                    }, 
                    renderPopup :{
                        content : () => 
                        
                        <div className="spot_content green-energy_content">   
                            <div className="section-content">
                                <h5>Equipment : FAS-006</h5>
                                <p>Time : 1min ago</p>  
                                <a href="#">View More</a>
                            </div>  
                        </div> 
                    } 
                }, 
                 
                
            ]}
        /> 
            
</div>   
 </div> 

    

</WidgetWrapper>
        
    ) 
      
   
}

export default Alarm_Map;
