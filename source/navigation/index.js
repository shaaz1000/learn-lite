import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import SplashScreen from '../screens/SplashScreen';
import DrawerNavigatorRoutes from '../navigation/DrawerNavigationRoutes'
import {createStackNavigator} from 'react-navigation-stack';
import IntroductionScreen from '../screens/Introduction'

/* Switch Navigator for those screens which needs to be switched only once
  and we don't want to switch back once we switch from them to the next one */
  const Approute = createSwitchNavigator({ 
    SplashScreen: {
      /* SplashScreen which will come once for 5 Seconds */
      screen: SplashScreen,
      // navigationOptions: {
      //   /* Hiding header for Splash Screen */
      //   headerShown: false,
      // },
    },
    Introduction:{
      screen:IntroductionScreen
    },
    Auth: {
      /* Auth Navigator which includer Login Signup will come once */
      screen: AuthNavigator,
    },
    App: {
      /* SplashScreen which will come once for 5 Seconds */
      screen: AppNavigator
    },
  });

  const AppContainer = createAppContainer(Approute);
export default AppContainer
