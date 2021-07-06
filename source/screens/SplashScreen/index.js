import React, { useState, useEffect } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
//Import all required component
import { Text,ImageBackground,View, StyleSheet, Image ,SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import SplashBackground from '../../assets/Image/splashbg.png';
import Logo from '../../assets/Image/splash_logo.png';
import {splashBackground,splashLogo} from '../../assets/Image/index';
import {connect} from 'react-redux';
import * as commonAction from '../../redux/actions/commonActions'
import * as userAction from '../../redux/actions/user'
const SplashScreen = props => {
  //State for ActivityIndicator animation
  let [animating, setAnimating] = useState(true);
/* eslint-disable */
  useEffect(() => {
    props.dispatch(commonAction.setNavigationProps(props.navigation))
    setTimeout(() => {
      setAnimating(false);
      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen
      //console.log('splash');
      AsyncStorage.getItem('UserData').then(data=>{
      
        if(data){
          props.dispatch(userAction.setUserData(JSON.parse(data)))
        }
      })

      AsyncStorage.getItem('user_id').then(async value =>{


        
        if(value === null){

          const IntroStatus = await AsyncStorage.getItem('IntroductionStatus');
          console.log('inddddd',IntroStatus)
          if(IntroStatus ==null)
          props.navigation.navigate('Introduction');
          else
          props.navigation.navigate(
            'Auth'
           )
      
        }else {

              props.navigation.navigate(
                'App'
               )
        }
  
        });
      // props.navigation.navigate(
      //             'Introduction'
      //            )
    }, 2000);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* <SafeAreaView style={{backgroundColor:'transparent'}}></SafeAreaView> */}
      <ImageBackground
        style={{ resizeMode: 'cover', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}
        source={splashBackground}>
        <Image style={{ justifyContent: 'center', alignItems: 'center' }}
          source={splashLogo}
        />
      </ImageBackground>
    </View>
  );
};
export default connect()(SplashScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

