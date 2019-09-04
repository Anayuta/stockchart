/**
 * @format
 */

import {AppRegistry} from 'react-native';
//import App from './app/App';
import {name as appName} from './app.json';
import TimeLine from './kchart/timeline/timeline'


AppRegistry.registerComponent(appName, () => TimeLine);
