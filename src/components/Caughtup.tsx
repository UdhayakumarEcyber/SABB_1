import * as React from "react";
import { TitleBar,  WidgetWrapper,DataList } from "uxp/components";
import { IContextProvider } from '../uxp';
import '../styles.scss';

interface ICaughtupProps {
    uxpContext?: IContextProvider
}

const Caughtup:React.FunctionComponent<ICaughtupProps> = (props) => {
let url=window.location.href;

function scrollToTop(){
    document.querySelector('.main-content-block').scrollTo(0,0);
}

   return <WidgetWrapper>                  
            <div className="all_caught_widget"> 
                <div className='item header'>                                   
                    <div className="footfall-arrowsUp" onClick={scrollToTop}>
                        {/* <a href={url} className="top-arrow"></a>  */}
                        <a className="top-arrow"></a>
                    </div>
                    <div>  
                        <h4>ALL CAUGHT UP!</h4> 
                    </div>  
                </div>                
            </div>	
        </WidgetWrapper>;
   
}

export default Caughtup;