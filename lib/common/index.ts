/** @format */

// import {DEV_ENV} from '@/lib/Omni';

import _Color from "./Color";

import _AppConfig from "./AppConfig.json";
import _Config from "./Config";
import _Constants from "./Constants";
import _Device from "./Device";
import _Events from "./Events";
import _Icons from "./Icons";
import _Images from "./Images";
import _Languages from "./Languages";
import _Layout from "./Layout";
import _Styles from "./Styles";
import _Tools from "./Tools";
import _Validator from "./Validator";
// import _Theme from './Theme';
import { ThemeProvider, themes, withTheme } from "./Theme";

export const Color = _Color;
export const Constants = _Constants;
export const Config = _Config;
export const AppConfig = _AppConfig;
export const Icons = _Icons;
export const Images = _Images;
export const Languages = _Languages;
export const Styles = _Styles;
export const Tools = _Tools;
export const Layout = _Layout;
export const Events = _Events;
// export const Device = _Device;

export const HorizonLayouts = [
  {
    layout: "circleCategory",
  },
  {
    layout: "bannerHigh",
    tag: 273,
  },
  {
    imageBanner: "https://mstore.io/wp-content/uploads/2017/11/woman-large.png",
    layout: "bannerImage",
    height: 118,
    category: 22,
  },
  {
    imageBanner: "https://mstore.io/wp-content/uploads/2017/06/man-large.png",
    layout: "bannerImage",
    height: 118,
    category: 55,
  },
  {
    name: "featureProducts",
    image: "",
    layout: "threeColumn",
    category: 21,
  },
  {
    name: "bagsCollections",
    image: "",
    layout: "twoColumn",
    category: 23,
  },
];
export const Validator = _Validator;
// export const Events = _Events;
export const Device = _Device;

export { ThemeProvider, themes, withTheme };

// export const log = values => DEV_ENV && reactotron.log(values);
// export const warn = values => DEV_ENV && reactotron.warn(values);
// export const error = values => DEV_ENV && reactotron.error(values);
