// This is going to export (named) the height and width of the current screen size
import {Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export {screenWidth, screenHeight};
