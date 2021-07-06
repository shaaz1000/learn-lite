import React,{useEffect,useState} from 'react';
import {
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
} from 'react-native';
import color from '../../../utilities/AppColor';
import appImages from '../../../assets/Image/index';
import {unsubscribe, getNetwork} from '../../../utilities/CheckNetwork';
import style from '../../../commonStyles/CssStyle';
import RNPicker from 'rn-modal-picker';
import CardView from 'react-native-cardview';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
import normalize from "../../../utilities/UtilityMethods"
// import Loader from '../../../../Screen/Components/loader';
import Loader from '../../../commonComponents/loader';
import Axios from 'axios';
import APICaller from '../../../utilities/apiCaller';
import ProgressCircle from 'react-native-progress-circle';
import AppImages from '../../../assets/Image'
import { ScrollView } from 'react-native';
import {connect} from "react-redux"
const ProgressReport = ({userSubscriptionDetails,navigation}) => {
  
 
  return(
    <>
    <SafeAreaView style={{flex: 1,backgroundColor:"white",margin:10,borderRadius:10}}>
      <ScrollView showsVerticalScrollIndicator={false}>
    <Text style={{
      fontSize:hp("2.5%"),
      marginTop:20,
      marginHorizontal:20,
      letterSpacing:1,
      fontWeight:"bold",
      color:"#2BBFA7"
      }}>
      For the Academic
    </Text>
    <Text style={{
      fontSize:hp("2.5%"),
      marginHorizontal:20,
      fontWeight:"bold",
      color:"#2BBFA7"
      }}>
      Year 2021 - 2022
    </Text>
    
      <ImageBackground
        source={AppImages.group1530}
        style={{
          height:hp("45%"),
          width:wp("85%"),
          marginTop:40,
          alignSelf: 'center',
        }}
        resizeMode="contain"
      >
      <View style={{alignSelf:"center",marginTop:hp("15%")}}>
      <Text style={{ fontSize: hp('4%'),fontWeight:'bold',color:'white' }}>{'Overall%'}</Text>
      </View>
      {
        userSubscriptionDetails  != ""
        ?
        <View style={{alignSelf:"center"}}>
        <Text style={{ fontSize: hp('6%'),fontWeight:'bold',color:'white' }}>{userSubscriptionDetails.data.overall} %</Text>
        </View>
        :
        <View style={{alignSelf:"center"}}>
        <Text style={{ fontSize: hp('6%'),fontWeight:'bold',color:'white' }}>0 %</Text>
        </View>
      }
      </ImageBackground>
      {/* <ProgressCircle
                    //containerStyle={{bottom:hp("40%"),alignSelf:"center"}}
                    percent={30}
                    radius={150}
                    borderWidth={6}
                    color="#2CBDA5"
                    outerCircleStyle={{bottom:hp("7.3%"),alignSelf:"center",position:"absolute"}}
                    shadowColor="#2CBDA5"
                    bgColor="#2CBDA5">
                    <Text style={{ fontSize: hp('4%'),fontWeight:'bold',color:'#fff' }}>{'Overall%'}</Text>
                    <Text style={{ fontSize: hp('6%'),fontWeight:'bold',color:'#fff' }}>{userSubscriptionDetails.data.overall}</Text>
                  </ProgressCircle> */}
                  </ScrollView>
    </SafeAreaView>
    </>
  )
}


const styles = StyleSheet.create({
  itemSeparatorStyle: {
    height: 1,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: color.colorGrayLight,
  },

  pickerBackgroundStyle: {
    backgroundColor: color.colorPrimary,
    borderWidth: 2,
    color: color.colorWhite,
    borderColor: color.colorPrimary,
    height: hp('7%'),
    borderRadius: 14,
    textAlignVertical: 'center',
    justifyContent: 'center',
    marginLeft: wp('2%'),
    marginRight: wp('2%'),
    paddingLeft: wp('.5%'),
    paddingRight: wp('.5%'),
  },
  textgreenStyle: {
    color: '#2BBFA7',
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
  },
  textgreenCourseStyle: {
    color: '#2BBFA7',
    fontSize: hp('3%'),
    fontWeight: 'bold',
  },
});

const mapStateToProps = (state) => ({
    
  userData: state.UserReducer.userData,
  subscribeStatus:state.UserReducer.subscribeStatus,
  isFreeTrialEnabled:state.UserReducer.isFreeTrialEnabled,
  userSubscriptionDetails:state.UserReducer.userSubscriptionDetails
})

export default connect(mapStateToProps)(ProgressReport)


