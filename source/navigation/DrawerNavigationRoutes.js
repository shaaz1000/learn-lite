/* This is an Login Registration example from https://aboutreact.com/ */
/* https://aboutreact.com/react-native-login-and-signup/ */

//Import React
import React from 'react';

//Import Navigators
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator, DrawerActions} from 'react-navigation-drawer';

//Import External Screens
import MenuInFunctionalComponent from '../commonComponents/MenuInFunctionalComponent';
import DashBoardScreen from '../screens/dashboard/DashBoardScreen';
import Subscription from '../screens/dashboard/Subscription';
import HomeScreen from '../screens/dashboard/HomeScreen';
import CustomSidebarMenu from '../commonComponents/CustomSidebarMenu';
// import CustomSidebarMenu from './Components/CustomSidebarMenu';
// import NavigationDrawerHeader from './Components/NavigationDrawerHeader';
import color from '../utilities/AppColor';
import appImages from '../assets/Image/index';
import style from '../../source/commonStyles/CssStyle';
import { View, Text, StatusBar, Image, TouchableOpacity } from 'react-native';
const FirstActivity_StackNavigator = createStackNavigator({
  First: {
    screen: DashBoardScreen,
    navigationOptions: ({navigation}) => ({
      headerStyle: {
        backgroundColor: color.colorPrimary,
        elevation: 0,
      },
      headerTintColor: color.colorPrimary,
      headerTitle: () => (
        <Image
          source={appImages.app_logo}
          style={style.styleLogoToolbar}
          resizeMode="contain"
        />
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={() => { navigation.dispatch(DrawerActions.openDrawer()); }}>
          <Image
            source={appImages.ic_hamburger}
            style={style.styleIcHamburger}
            resizeMode="contain"
          />
        </TouchableOpacity>
      ),
      headerRight: <View />,
    }),
    // navigationOptions: {
    //   headerStyle: {
    //     backgroundColor: color.colorPrimary,
    //     elevation: 0,
    //   },
    //   headerTintColor: color.colorPrimary,
    //   headerTitle: () => (
    //     <Image
    //       source={appImages.app_logo}
    //       style={style.styleLogoToolbar}
    //       resizeMode="contain"
    //     />
    //   ),
    //   headerLeft: () => (
    //     <TouchableOpacity >
    //       <Image
    //         source={appImages.ic_hamburger}
    //         style={style.styleIcHamburger}
    //         resizeMode="contain"
    //       />
    //     </TouchableOpacity>
    //   ),
    //   headerRight: <View />,
    // },
  },
});

const SecondActivity_StackNavigator = createStackNavigator({
  First: {
    screen: Subscription,
    navigationOptions: ({navigation}) => ({
      headerStyle: {
        backgroundColor: color.colorPrimary,
        elevation: 0,
      },
      headerTintColor: color.colorPrimary,
      headerTitle: () => (
        <Image
          source={appImages.app_logo}
          style={style.styleLogoToolbar}
          resizeMode="contain"
        />
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={() => { navigation.dispatch(DrawerActions.openDrawer()); }}>
          <Image
            source={appImages.ic_hamburger}
            style={style.styleIcHamburger}
            resizeMode="contain"
          />
        </TouchableOpacity>
      ),
      headerRight: <View />,
    }),
    // navigationOptions: {
    //   headerStyle: {
    //     backgroundColor: color.colorPrimary,
    //     elevation: 0,
    //   },
    //   headerTintColor: color.colorPrimary,
    //   headerTitle: () => (
    //     <Image
    //       source={appImages.app_logo}
    //       style={style.styleLogoToolbar}
    //       resizeMode="contain"
    //     />
    //   ),
    //   headerLeft: () => (
    //     <TouchableOpacity >
    //       <Image
    //         source={appImages.ic_hamburger}
    //         style={style.styleIcHamburger}
    //         resizeMode="contain"
    //       />
    //     </TouchableOpacity>
    //   ),
    //   headerRight: <View />,
    // },    
  },
  // ScreenInternal: {
  //   screen: PlayVideo,
  //   navigationOptions: ({navigation}) => ({
  //     title: 'Play Video Screen',
  //     headerLeft: () => <NavigationDrawerHeader navigationProps={navigation} />,
  //     headerStyle: {
  //       backgroundColor: '#307ecc',
  //     },
  //     headerTintColor: '#fff',
  //   }),
  // },
});

const DrawerNavigatorRoutes = createDrawerNavigator(
  {
    DashBoardScreen: {
      screen: FirstActivity_StackNavigator,
      navigationOptions: {
        drawerLabel: 'DashBoard',
      },
    },
    Subscription: {
      screen: SecondActivity_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Subscription',
      },
    },
  },
  {
    contentComponent: CustomSidebarMenu,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
  },
);
export default DrawerNavigatorRoutes;
