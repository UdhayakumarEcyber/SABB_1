import * as React from "react"; 
import { IContextProvider } from '../uxp';
import '../styles.scss';

import '../widget_trans.scss';

interface ITopIconsProps {
    uxpContext?: IContextProvider
}

// var styleWiget ={{width:"100%", height:"300px" }}   


const TopIcons: React.FunctionComponent<ITopIconsProps> = (props) => {  

    return (  
            <div className='topicons_widget'>
                <div data-row='1' data-col='1' data-sizex='1' data-sizey='1' className='uxp-widget actionicon'>
                        <div className='icon' style={{backgroundImage: `url("https://static.iviva.com/images/SABB/ABB.jpg")`}} ></div>
                        {/* <div className='title'>Start Meeting Rooms</div> */}
                    </div>

                   <div data-row='1' data-col='2' data-sizex='1' data-sizey='1' className='uxp-widget actionicon'>
                        <div className='icon condeco-icon' style={{backgroundImage: 'url("https://static.iviva.com/images/SABB/Bosch.png")'}}></div>
                        {/* <div className='title'>Integrated Facility Management</div> */}
                    </div>

                    {/* <div data-row='1' data-col='3' data-sizex='1' data-sizey='1' className='uxp-widget actionicon'>
                        <div className='icon' style={{backgroundImage: `url("https://static.iviva.com/images/SABB/Comfy.png")`}}></div> 
                        <div className='title'>LMS</div>
                    </div>  */}

                    <div data-row='1' data-col='4' data-sizex='1' data-sizey='1' className='uxp-widget actionicon'>
                    <div className='icon' style={{backgroundSize:'100%', backgroundImage: `url("https://static.iviva.com/images/SABB/Parking_Eye.jpg")`}} ></div>
                            {/* <div className='title'>Smart Visitor Management</div> */}
                    </div>

                    <div data-row='1' data-col='5' data-sizex='1' data-sizey='1' className='uxp-widget actionicon'>
                        <div className='icon condeco-icon' style={{backgroundSize:'70%', backgroundImage: 'url("https://static.iviva.com/images/SABB/Siemens.jpg")'}}></div>
                        {/* <div className='title'>CCTV</div> */}
                    </div>

                    <div data-row='1' data-col='6' data-sizex='1' data-sizey='1' className='uxp-widget actionicon'>
                        <div className='icon' style={{backgroundImage: `url("https://static.iviva.com/images/SABB/Tririga.jpg")`}}></div>
                        {/* <div className='title'>Parking</div> */}
                    </div>  
            </div>
       )

}

export default TopIcons;
