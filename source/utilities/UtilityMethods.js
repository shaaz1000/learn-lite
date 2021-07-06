import {Dimensions, Platform, PixelRatio} from 'react-native';
const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

export var deviceWidth =
  Dimensions.get('window').width < Dimensions.get('window').height
    ? Dimensions.get('window').width
    : Dimensions.get('window').height;

// based on iphone 6s's scale
const scale = SCREEN_WIDTH / 414;

const logout_login_token = '';

export default function normalize(size) {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

export function normalizeText(size) {
  let mapsize = size
  let newSize = normalize(mapsize);
  while (newSize > 10.5) {
    mapsize = mapsize - 1
    newSize = normalize(mapsize);
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

export function size(value) {
  var screenRation = deviceWidth / 375;
  if (isTabletiPad() == true) {
    screenRation = deviceWidth / 768;
  }
  return value * screenRation;
}

export function renderIf(condition, content) {
  if (condition) {
    return content;
  } else {
    return null;
  }
}

export function getUnique(arr, index) {
  const unique = arr
    .map(e => e[index])

    // store the keys of the unique objects
    .map((e, i, final) => final.indexOf(e) === i && i)

    // eliminate the dead keys & store unique objects
    .filter(e => arr[e])
    .map(e => arr[e]);

  return unique;
}

export function validateInputs(text, type) {
  let numreg = /^[0-9]+$/;
  let typeNumber = true;
  if (type == 'char') {
    if (numreg.test(text)) {
      //test ok
      return (typeNumber = false);
      // return 0
    }
  } else {
    return typeNumber;
  }
}

/**
 * These commented lines are for later use to refer to
 */

//     if (this.state.news_feed[position].bookmark_is_selected == 0) {
//   // stateCopy.news_feed[position].bookmark_is_selected = 1;
//   this.state.news_feed[position].bookmark_is_selected = 1;
//   this.setState(this.state.news_feed);
// } else {
//   this.state.news_feed[position].bookmark_is_selected = 0;
//   this.setState(this.state.news_feed);
// }

export function getUniqueListBy(arr, key) {
  return [...new Map(arr.map(item => [item[key], item])).values()]
}