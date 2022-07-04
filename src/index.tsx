import * as React from "react";
import { registerWidget,registerLink } from './uxp';

import './styles.scss';


import TopIcons from "./components/TopIcons";
import DigitalTwin from "./components/DigtalTwin";
import Alarm_Map from "./components/Alarm_map";

import EnvironmentMetrics from "./components/EnvironmentMetrics";
import Meeting from "./components/Meeting";
import parkingUtilization from "./components/Parking";
import AfterHours from "./components/AfterHours";
import ServiceNow from "./components/ServiceNow";
import MaintenanceSchedule from "./components/Maintainence";
import RecentIncident from "./components/RecentIncident";
import Caughtup from "./components/Caughtup";
import LinkButtonWidget from "./components/LinkButtonWidget";
import Cafeteria from "./components/Cafeteria";
import Parking from "./components/ParkingEnergy";
import EnergyConPerPerson from "./components/EnergyConsumptionPerPerson";
import RawBackup from "./components/rawBackup";
import ActualBaseline from "./components/ActualBaseline";
import Carbon from "./components/Carbon";
import EnergyConsumption from "./components/EnergyConsumption";
import FootfallType from "./components/FootfallType";
import HotDesking from "./components/HotDesking";
import VisitorCount from "./components/VisitorCount";
import DailyCampusFootfall from "./components/DailyCampusFootfall";




registerWidget({
    id: "TopIcons",
    name: "TopIcons",
    widget: TopIcons,
    configs: {
        layout: {
            w: 9,
            h: 9,
            minW: 2,
            minH: 2
        }
    }
});


registerWidget({
    id: "EnvironmentMetrics",
    name: "EnvironmentMetrics",
    widget: EnvironmentMetrics,
    configs: {
        layout: {
            w: 9,
            h: 9,
            minW: 9,
            minH: 9
        }
    }
});

registerWidget({
    id: "Meeting",
    name: "Meeting",
    widget: Meeting,
    configs: {
        layout: {
            w: 8,
            h: 8,
            minW: 8,
            minH: 8
        }
    }
});

registerWidget({
    id: "parkingUtilization",
    name: "parkingUtilization",
    widget: parkingUtilization,
    configs: {
        layout: {
            w: 21,
            h: 9,
            minW: 21,
            minH: 9
        }
    }
});

registerWidget({
    id: "AfterHours",
    name: "AfterHours",
    widget: AfterHours,
    configs: {
        layout: {
            w: 8,
            h: 8,
            minW: 8,
            minH: 8
        }
    }
});

registerWidget({
    id: "MaintenanceSchedule",
    name: "MaintenanceSchedule",
    widget: MaintenanceSchedule,
    configs: {
        layout: {
            w: 22,
            h: 8,
            minW: 22,
            minH: 8
        }
    }
});

registerWidget({
    id: "RecentIncident",
    name: "RecentIncident",
    widget: RecentIncident,
    configs: {
        layout: {
            w: 15,
            h: 8,
            minW: 15,
            minH: 8
        }
    }
});
registerWidget({
    id: "Caughtup",
    name: "Caughtup",
    widget: Caughtup,
    configs: {
        layout: {
            w: 7,
            h: 8,
            minW: 2,
            minH: 8
        }
    }
});
registerWidget({
    id: "Cafeteria",
    name: "Cafeteria",
    widget: Cafeteria,
    configs: {
        layout: {
            w: 21,
            h: 9,
            minW: 21,
            minH: 9
        }
    }
});
registerWidget({
    id: "ServiceNow",
    name: "ServiceNow",
    widget: ServiceNow,
    configs: {
        layout: {
            w: 9,
            h: 9,
            minW: 9,
            minH: 9
        }
    }
});

registerWidget({
    id: "LinkButton",
    name: "LinkButton",
    widget: LinkButtonWidget,
    configs: {
        layout: {
            w: 3.5,
            h: 3.5,
            minH: 4,
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

registerWidget({
    id: "Parking",
    name: "Parking",
    widget: Parking,
    configs: {
        layout: {
            w: 8,
            h: 8,
            minW: 8,
            minH: 8
        }
    }
}); 

registerWidget({
    id: "EnergyConPerPerson",
    name: "EnergyConPerPerson",
    widget: EnergyConPerPerson,
    configs: {
        layout: {
            w: 10,
            h: 9,
            minW: 10,
            minH: 9
        }
    }
}); 

registerWidget({
    id: "RawBackup",
    name: "RawBackup",
    widget: RawBackup,
    configs: {
        layout: {
            w: 22,
            h: 8,
            minW: 22,
            minH: 8
        }
    }
}); 

registerWidget({
    id: "ActualBaseline",
    name: "ActualBaseline",
    widget: ActualBaseline,
    configs: {
        layout: {
            w: 20,
            h: 12,
            minW: 20,
            minH: 12
        }
    }
}); 

registerWidget({
    id: "Carbon",
    name: "Carbon",
    widget: Carbon,
    configs: {
        layout: {
            w: 20,
            h: 9,
            minW: 20,
            minH: 9
        }
    }
}); 

registerWidget({
    id: "EnergyConsumption",
    name: "EnergyConsumption",
    widget: EnergyConsumption,
    configs: {
        layout: {
            w: 22,
            h: 8,
            minW: 22,
            minH: 8
        }
    }
});

registerWidget({
    id: "Caughtup1",
    name: "Caughtup",
    widget: Caughtup,
    configs: {
        layout: {
            w: 10,
            h: 12,
            minW: 10,
            minH: 12
        }
    }
});

registerWidget({
    id: "FootfallType",
    name: "FootfallType",
    widget: FootfallType,
    configs: {
        layout: {
            w: 15,
            h: 8,
            minW: 15,
            minH: 8
        }
    }
}); 

registerWidget({
    id: "HotDesking",
    name: "HotDesking",
    widget: HotDesking,
    configs: {
        layout: {
            w: 15,
            h: 8,
            minW: 15,
            minH: 8
        }
    }
});

registerWidget({
    id: "VisitorCount",
    name: "VisitorCount",
    widget: VisitorCount,
    configs: {
        layout: {
            w: 22,
            h: 8,
            minW: 22,
            minH: 8
        }
    }
}); 

registerWidget({
    id: "DailyCampusFootfall",
    name: "DailyCampusFootfall",
    widget: DailyCampusFootfall,
    configs: {
        layout: {
            w: 30,
            h: 8,
            minW: 30,
            minH: 8
        }
    }
});

registerWidget({
    id: "Caughtup2",
    name: "Caughtup",
    widget: Caughtup,
    configs: {
        layout: {
            w: 30,
            h: 8,
            minW: 30,
            minH: 8
        }
    }
}); 

registerWidget({
    id: "DigitalTwin",
    name: "Digital Twin",
    widget: DigitalTwin,
    configs: {
        layout: {
            w: 30,
            h: 8,
            minW: 3,
            minH: 5
        }
    }
}); 

registerWidget({
    id: "Alarm_Map",
    name: "Alarm Map",
    widget: Alarm_Map,
    configs: {
        layout: {
            w: 30,
            h: 8,
            minW: 3,
            minH: 5
        }
    }
}); 