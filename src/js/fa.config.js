import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
    faAngleDown,
    faArrowsAltV,
    faAt,
    faAtlas,
    faBomb,
    faCamera,
    faCheckCircle,
    faChevronLeft,
    faChevronRight,
    faCircle,
    faCogs,
    faColumns,
    faComment,
    faComments,
    faCompass,
    faEdit,
    faFlag,
    faFlagCheckered,
    faGlobeAmericas,
    faHeart,
    faHistory,
    faHome,
    faImage,
    faInfo,
    faKey,
    faList,
    faMap,
    faMapMarkedAlt,
    faMapPin,
    faNewspaper,
    faPen,
    faPlus,
    faRoute,
    faSearch,
    faSignOutAlt,
    faSortAmountUp,
    faTachometerAlt,
    faUser,
    faUserCheck,
    faUsers,
    faWrench,
} from '@fortawesome/free-solid-svg-icons'

import {
    faSun as faSunRegular,
} from '@fortawesome/free-regular-svg-icons'


import {
    faCreativeCommons,
    faFacebook,
    faGoogle,
    faTwitter,
} from '@fortawesome/free-brands-svg-icons'


library.add(
    //solid icons
    faAngleDown,
    faArrowsAltV,
    faAt,
    faAtlas,
    faBomb,
    faCamera,
    faCheckCircle,
    faChevronLeft,
    faChevronRight,
    faCircle,
    faCogs,
    faColumns,
    faComment,
    faComments,
    faCompass,
    faEdit,
    faFlag,
    faFlagCheckered,
    faGlobeAmericas,
    faHeart,
    faHistory,
    faHome,
    faImage,
    faInfo,
    faKey,
    faList,
    faMap,
    faMapMarkedAlt,
    faMapPin,
    faNewspaper,
    faPen,
    faPlus,
    faRoute,
    faSearch,
    faSignOutAlt,
    faSortAmountUp,
    faTachometerAlt,
    faUser,
    faUserCheck,
    faUsers,
    faWrench,

    //regular icons
    faSunRegular,

    //brands icons
    faCreativeCommons,
    faFacebook,
    faGoogle,
    faTwitter,
);

Vue.component('fa-icon', FontAwesomeIcon); // registered globally