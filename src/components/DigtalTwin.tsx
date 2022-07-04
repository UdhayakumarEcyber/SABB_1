import * as React from "react"; 
import { TitleBar,  WidgetWrapper,DataList } from "uxp/components";
import { IContextProvider } from '../uxp';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import '../styles.scss';
 

import { Player } from 'video-react';

import ReactPlayer from 'react-player'


interface ITopIconsProps {
    uxpContext?: IContextProvider
}

// var styleWiget ={{width:"100%", height:"300px" }}   


const DigitalTwin: React.FunctionComponent<ITopIconsProps> = (props) => {  

    return (
           <WidgetWrapper>
                {/* <TitleBar icon="https://static.iviva.com/images/Adani_UXP/cafeteria-icon.svg" title="Digital Twin"></TitleBar>	 */}

                    <div className='digitalTwin_widget'>

                    {/* <Player
                    playsInline
                    poster="/assets/poster.png"
                    src="https://static.iviva.com/images/SABB/MAF_Digital_Twin.mp4"
                    /> */}
                    {/* <div className="video-hide-top"></div>
                    <div className="video-hide-lft"></div> */}

                        <ReactPlayer controls loop playing width="100%" height="100%" url='https://static.iviva.com/images/SABB/MAF_Digital_Twin_crop.mp4' />
                        
                    </div>

            </WidgetWrapper>  
        
    ) 
      
   
}

export default DigitalTwin;
