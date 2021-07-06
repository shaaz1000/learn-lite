import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from '../screens/LoginScreen';
import ForgotPassword from '../screens/ForgotPassword';
import OtpScreen from '../screens/OtpScreen';
import RegisterScreen from '../screens/RegisterScreen';
import IntroductionScreen from '../screens/Introduction'
import ResetPassword from "../screens/ResetPassword"
const Auth = createStackNavigator({
    //Stack Navigator for Login and Sign up Screen
    OtpScreen: {
      screen: OtpScreen,
      navigationOptions: {
        headerShown: false,
      },
    },LoginScreen: {
      screen: LoginScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    ForgotPassword: {
      screen: ForgotPassword,
      navigationOptions: {
        headerShown: false,
      },
    },
    RegisterScreen: {
      screen: RegisterScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    ResetPassword:{
      screen: ResetPassword,
      navigationOptions:{
        headerShown: false,
      }
    }
    // Introduction: {
    //   screen: IntroductionScreen,
    //   navigationOptions: ({navigation}) => ({
    //     headerShown: false,
    //   }),
    // },
  },{
    initialRouteName:'LoginScreen'
  });
  
  export default Auth