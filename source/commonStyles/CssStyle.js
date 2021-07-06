var React = require('react-native');
import {Platform, Dimensions, PixelRatio} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import normalize from '../utilities/UtilityMethods';
import color from '../utilities/AppColor';

const EStyle = React.StyleSheet.create({

  screenTitleContainer:{
    borderBottomWidth:normalize(4),
    borderBottomColor:color.colorRed,
    marginTop:normalize(30),
    marginLeft:normalize(34)
  },
  screenTitleStyle:{
    fontFamily:'Sora-Bold',
    fontSize:normalize(18),
    color:color.colorBlueDark,
    marginBottom:normalize(6),
    zIndex:1
  },
  safeAreaContainer:{
    backgroundColor:color.colorPrimary
  },
  flexOne:{
    flex:1
  },
  flexOneFullCenter:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  flexOneRowFullCenter:{
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  rowCenter:{
    flexDirection:'row',justifyContent:'center',alignItems:'center'
  },
  columnCenter:{
    justifyContent:'center',
    alignItems:"center"
  },
  styleLogoToolbar: {
    height: normalize(35),
    width: normalize(35),
    justifyContent: 'center', 
    flex:1, 
    alignSelf: 'center'
  },
  styleIcHamburger: {
    height: normalize(25),
    width: normalize(25),
    justifyContent: 'center', 
    alignSelf: 'center',
    margin:normalize(8)
  },
  styleIcClose: {
    height: normalize(25),
    width: normalize(25),
    padding:normalize(5)
  },
  styleMenuBottomOverlay: {
    position: 'absolute',
    alignSelf: 'flex-end',
    resizeMode: 'stretch',
    bottom: 0,
    width: '100%',
    height: '50%'
  },
  menuUserName: {
    marginTop:normalize(10),
    alignSelf:'center',
    fontSize: normalize(12)
    // fontFamily:Fonts.OpenSansRegular,
    // fontSize: (12/375)*Dimensions.get('window').width
  },
  styleScrollMenu: {
    flex:1,
  },
  styleIcNavigate: {
    height: normalize(12),
    width: normalize(12),
    margin:normalize(5)
  },
  styleIcNavigatePlanning: {
    height: normalize(11),
    width: normalize(12),
    margin:normalize(5)
  },
  styleIcNavigateSubscription: {
    height: normalize(11),
    width: normalize(12),
    margin:normalize(5)
  },
  styleIcFeedbacks: {
    height: normalize(12),
    width: normalize(12),
    margin:normalize(5),
    tintColor: 'transparent'
  },
});
module.exports = EStyle;
