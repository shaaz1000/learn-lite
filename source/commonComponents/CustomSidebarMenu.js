/* eslint-disable react-native/no-inline-styles */
/* This is an Login Registration example from https://aboutreact.com/ */
/* https://aboutreact.com/react-native-login-and-signup/ */

//Import React
import React, {PureComponent, useState} from 'react';
//Import all required component
import {
  View,
  StyleSheet,
  Text,
  Alert,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class CustomSidebarMenu extends PureComponent {
  // const CustomSidebarMenu = (props) => {
  constructor(props) {
    super(props);
    this.state = {};
  }

   handleClick = async (index, screenToNavigate) => {
    // eslint-disable-next-line eqeqeq
    if (screenToNavigate == 'logout') {
      this.props.navigation.toggleDrawer();
      Alert.alert(
        'Logout',
        'Are you sure? You want to logout?',
        [
          {
            text: 'Cancel',
            onPress: () => {
              return null;
            },
          },
          {
            text: 'Confirm',
            onPress: () => {
              AsyncStorage.clear();
              global.student_id = '';
              this.props.navigation.navigate('Auth');
              console.log('logout');
            },
          },
        ],
        {cancelable: false},
      );
    } else if(screenToNavigate == 'DashBoardScreen') {
      let courseTitle = await AsyncStorage.getItem('course_title');
      if(courseTitle!=null) {   
        this.props.navigation.toggleDrawer();
        global.currentScreenIndex = screenToNavigate;
        this.props.navigation.navigate(screenToNavigate);
      }
      else {
        alert('Please subscribe to show dashboard!');
      }
    }else if(screenToNavigate == 'Subscription') {
      let courseTitle = await AsyncStorage.getItem('course_title');
      if(courseTitle==null) {   
        this.props.navigation.toggleDrawer();
        global.currentScreenIndex = screenToNavigate;
        this.props.navigation.navigate(screenToNavigate);
      }
      else {
        alert('You have already subscribed!');
      }
    }
    else {
      this.props.navigation.toggleDrawer();
      global.currentScreenIndex = screenToNavigate;
      this.props.navigation.navigate(screenToNavigate);
    }
  };
  render() {
    let items = [
      {
        navOptionName: 'DashBoard',
        screenToNavigate: 'DashBoardScreen',
      },
      // {
      //   navOptionName: 'Video Screen',
      //   screenToNavigate: 'SettingsScreen',
      // },
      {
        navOptionName: 'Subscription',
        screenToNavigate: 'Subscription',
      },
      {
        navOptionName: 'Logout',
        screenToNavigate: 'logout',
      },
    ];

    return (
      <View style={stylesSidebar.sideMenuContainer}>
        <View style={{width: '100%', flex: 1}}>
          {items.map((item, key) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 20,
                color: 'black',
                backgroundColor:
                  global.currentScreenIndex === item.screenToNavigate
                    ? '#ffffff'
                    : '#ffffff',
              }}
              key={key}
              onStartShouldSetResponder={() =>
                this.handleClick(key, item.screenToNavigate)
              }>
              <Text style={{fontSize: 15, color: 'black'}}>
                {item.navOptionName}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  }
}
// const ShowLoader = (loadingShow) => {
//   let [loading, setLoading] = useState(loadingShow);
//   return (
//     <View style={stylesSidebar.containerLoader}>
//       <Loader loading={loading} />
//     </View>
//   );
// };

const stylesSidebar = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
    paddingTop: 40,
    color: 'black',
  },
  profileHeader: {
    flexDirection: 'row',
    backgroundColor: '#307ecc',
    padding: 15,
    textAlign: 'center',
  },
  profileHeaderPicCircle: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    color: 'white',
    backgroundColor: '#ffffff',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHeaderText: {
    color: 'white',
    alignSelf: 'center',
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
  profileHeaderLine: {
    height: 1,
    marginHorizontal: 20,
    backgroundColor: '#e2e2e2',
    marginTop: 15,
    marginBottom: 10,
  },
  profileImg: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginTop: 20,
  },
  container: {
    flex: 3,
    flexDirection: 'column',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#00BFFF',
  },
  text: {
    color: 'white',
    fontSize: 14,
    padding: 10,
    textAlign: 'center',
  },
  containerLoader: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#307ecc',
  },
});
// export default CustomSidebarMenu;
