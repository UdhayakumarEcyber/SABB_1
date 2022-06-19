import * as React from "react";
import { TitleBar, FilterPanel, WidgetWrapper } from "uxp/components";
import { registerWidget, registerLink, IContextProvider, } from '../uxp';
//import './styles.scss';

interface IWidgetProps {
    uxpContext?: IContextProvider,
    link: string,
    target?: "_self" | "_blank" | "_parent"
    icon: string,
    label: string
}

const LinkButtonWidget: React.FunctionComponent<IWidgetProps> = (props) => {

    let { link, icon, target, label } = props
	 const style = {
      
    };

    return (
        <WidgetWrapper className="link-btn-widget-cont uxp-drag-handler">
            <a href={link} target={target} className="link">
                <div className="icon-container">
                    <img src={icon} alt="link-btn-icon" />
                    <div className="text" style={{fontSize:10}}>{label}</div>
                </div>
            </a>
        </WidgetWrapper>
    )
};

LinkButtonWidget.defaultProps = {
    target: "_self"
}

export default LinkButtonWidget
/**
 * Register as a Widget
 */
/*
registerWidget({
    id: "LinkButton",
    name: "LinkButton",
    widget: LinkButtonWidget,
    configs: {
        layout: {
            w: 5,
            h: 6,
            minH: 5,
            minW: 4
        },
        props: [
            {
                name: "link",
                label: "Link Url",
                type: "string"
            },
            {
                name: "label",
                label: "Link Label",
                type: "string"
            },
            {
                name: "icon",
                label: "Link Icon",
                type: "string"
            },
            
            {
                name: "target",
                label: "Target",
                type: "string"
            }
        ]
    }
});
*/