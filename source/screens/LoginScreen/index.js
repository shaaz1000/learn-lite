import React, { useState } from 'react';
import CardView from 'react-native-cardview';
import {
  Alert,
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  ImageBackground,
  Platform,
  Modal,
  SafeAreaView
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../../commonComponents/loader';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Axios from 'axios';
import { unsubscribe, getNetwork } from '../../utilities/CheckNetwork';
import * as AuthApi from '../../services/Auth';
import Storage from '../../utilities/Storage';
import APICaller from '../../utilities/apiCaller';
import * as userAction from '../../redux/actions/user'
import {connect} from 'react-redux'
import AppColors from "../../utilities/AppColor"
class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      TextInputEmail: '',
      TextInputPassword: '',
      loading: false,
      setLoading: false,
      platform: '',
      checkNetwork: false,
      isvalidemail: false,
      isvisible: false,
      keyboardAvoidingViewKey: 'keyboardAvoidingViewKey',
    };
  }

  componentDidMount() {
    this.checkNetWork();
    this.updateState();
    this.keyboardHideListener = Keyboard.addListener(Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide', this.keyboardHideListener.bind(this));
  }
  async checkNetWork() {
    let checknet = await (getNetwork());
    this.setState({ checkNetwork: checknet });
  }
  async updateState() {
    let checknet = await (unsubscribe());
    /* eslint-disable */
    this.setState({ checkNetwork: checknet });
  }
  componentWillUnmount() {
    this.keyboardHideListener.remove()
  }
  keyboardHideListener() {
    this.setState({
      keyboardAvoidingViewKey: 'keyboardAvoidingViewKey' + new Date().getTime()
    });
  }
  validateEmail = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      return false;
    }
    else {
      console.log('fun2 ');
      return true;
    }
  }
  

  handleSubmitPress = async () => {
    if (this.state.checkNetwork == true) {
      if (this.state.TextInputEmail !== '') {
        if (1==1) {
          if (this.state.TextInputPassword !== '') {
            this.setState({ loading: true });
            let obj = {
              email: this.state.TextInputEmail,
              password: this.state.TextInputPassword
            }
            //   console.log('login data',response)
            // let response = await AuthApi.login(obj);
            APICaller('log_in',obj,"POST").then(response=>{
              // console.log('login response',response)
              if(response.status == 201 || response.status == 200){
              this.setState({ loading: false });
                const {data} = response;
                // console.log(data,"from login 97")
                const id = data.user.id
                const token = data.token
                if(data.response == "success"){
                  //console.log(data.user.user_mobile,"from login")
                  if (data.user.user_otp_verified === 'y') {
                    AsyncStorage.setItem('UserData', JSON.stringify(data.user));
                    AsyncStorage.setItem('user_id', JSON.stringify(data.user.id));
                    AsyncStorage.setItem('userToken', JSON.stringify(data.token));
                    AsyncStorage.setItem('IntroductionStatus','true')

                    // AsyncStorage.setItem('courseTitle', JSON.stringify(data.course_title));
    
                    this.props.dispatch(userAction.setUserData(data.user))
                    Storage.jwt_Token = data.token
                    Storage.userData = data.user
                    if(data.course_title!=null){
                    this.props.dispatch(userAction.setSubscriptionStatus(true))
                    this.props.navigation.navigate('WhiteScreen');
                    }else {
                    this.props.dispatch(userAction.setSubscriptionStatus(false))
                    this.props.navigation.navigate('WhiteScreen');
                    }
                  } else {
                    const body = {
                      id
                    }
                    AsyncStorage.setItem('user_id', data.user.id.toString());
                    AsyncStorage.setItem('userToken', JSON.stringify(data.token));
                    APICaller(`resendOtp`,body,'POST')
                    .then((response) =>{
                      console.log(response.data,"from login line 124")
                      if(response.data.response == 'success'){
                        this.props.navigation.navigate('OtpScreen',{tokenAvailable:true})
                      }
                    })
                    .catch(err =>{
                      console.log(err,"err")
                    })
                    
                  }

                }else {
                  alert('These credentials do not match our records.')
                }
              }

              this.setState({ loading: false });

            }).catch(err=>{
              this.setState({ loading: false });
              console.log(err,"line 143");
              const ErrorMessage = err.data.message.toString()
              alert(ErrorMessage)
            })
      
          } else {
            alert('Please enter password');
          }
        } else {
          alert('Please enter valid email id');
        }
      } else {
        alert('Please enter email id');
      }
    } else {
      alert('Please check your internet connection.');
    }
  };

  render() {
    let { keyboardAvoidingViewKey } = this.state
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0
    return (
      <>
      {/* <KeyboardAvoidingView
        behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}
        style={{ flex: 1, backgroundColor: '#ffffff' }} > */}
      
        <SafeAreaView style={{backgroundColor:"white",flex:1}}>
        <Loader loading={this.state.loading} />
        <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          style={{ position: 'absolute', resizeMode: 'stretch', width: wp('100%'), height: hp('30%') }}
          source={require('../../assets/Image/bg3.png')}>
        </Image>
        <View style={{ top: 0, left: 0, right: 0, flexDirection: 'row', alignItems: 'flex-start', height: hp('30%') }}>
          <View style={{ marginTop: hp('5%'), marginLeft: wp('8%') }}>
            <Text style={{ fontSize: hp('3%'), fontWeight: 'bold' , color:"white" }}>Login</Text>
            <Text style={{ marginTop: hp('1%'), fontSize: hp('3%'), fontWeight: 'bold' , color : 'white' }}>Get Started</Text>
          </View>
          <Image
            style={{ position: 'absolute', alignSelf: 'flex-end', marginLeft: wp('35%'), resizeMode: 'contain', bottom: 0, width: wp('70%'), height: hp('30%') }}
            source={require('../../assets/Image/newSignupFace.png')}>
          </Image>
        </View>
        <View style={{ marginTop: hp('4%'), marginLeft: wp('6%'), marginRight: wp('6%'), height: hp('50%') }}>
        <Text style={{color:AppColors.colorBlueDark,marginHorizontal:10,marginVertical:10,fontWeight: 'bold'}}>Email Id</Text>
          <CardView cardElevation={2}
            cardMaxElevation={5}
            cornerRadius={10} style={{ height: hp('6%'),  marginHorizontal:10,backgroundColor: AppColors.colorGrayBackground,marginBottom:10 }} >
              
            <TextInput
              //placeholder="Email Address"
              placeholderTextColor="#3D3D3D"
              underlineColorAndroid='transparent'
              autoCapitalize="none"
              keyboardType="email-address"
              value={this.state.TextInputEmail}
              onChangeText={text => this.setState({ TextInputEmail: text })}
              style={styles.inputStyle} />
          </CardView>
          <Text style={{color:AppColors.colorBlueDark,marginHorizontal:10,marginVertical:10,fontWeight: 'bold'}}>Password</Text>
          <CardView cardElevation={2}
            cardMaxElevation={5}
            cornerRadius={10} style={{  height: hp('6%'), marginHorizontal:10,backgroundColor: AppColors.colorGrayBackground }} >
            <TextInput
              //placeholder="Password"
              placeholderTextColor="#3D3D3D"
              underlineColorAndroid='transparent'
              autoCapitalize="none"
              secureTextEntry={true}
              maxLength={12}
              keyboardType="default"
              value={this.state.TextInputPassword}
              onChangeText={text => this.setState({ TextInputPassword: text })}
              style={styles.inputStyle} />
          </CardView>

          <Text style={{ alignSelf: 'flex-end', marginTop: hp('2%'), color: '#656565' }} onPress={() => this.props.navigation.navigate('ForgotPassword')}>Forgot Password?</Text>
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={this.handleSubmitPress}
          >
            {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: wp('100%') }}> */}
              <Text style={styles.buttonTextStyle}>Sign In</Text>
              {/* <Image source={require('../../assets/Image/Next.png')} resizeMode='contain' style={{ height: hp('2%'), marginTop: hp('1%') }} /> */}
            {/* </View> */}
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', flex: 1, paddingVertical: 10, paddingHorizontal: 4 }}>
            <Text >Don't have an account?</Text>
            <Text style={{ fontWeight: 'bold', color: AppColors.colorRed, paddingHorizontal: 5 }} onPress={() => this.props.navigation.navigate('RegisterScreen')}>Sign Up</Text>
            {/* <Text style={{ fontWeight:'bold',color: '#FFAD36', paddingHorizontal: 5 }}onPress={() => this.props.navigation.navigate('OtpScreen')}>Sign Up</Text> */}
          </View>
        </View>
        </ScrollView>
        </SafeAreaView>
      {/* </KeyboardAvoidingView> */}
      </>
    );
  }
}

export default connect()(LoginScreen)

const styles = StyleSheet.create({

  buttonStyle: {
    backgroundColor: AppColors.colorPrimary,
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#FFAD36',
    height: hp('6%'),
    borderRadius: 15,
    marginTop: hp('3%'),
    textAlignVertical: 'center',
    justifyContent: 'center',

  },
  buttonTextStyle: {
    color: "white",
    textAlignVertical: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: hp('2%'),

  },
  inputStyle: {
    height: hp('7%'),
    flex: 1,
    color: '#000',
    paddingHorizontal: 15,
    fontSize: hp('2%'),
  },

  modal: {
    alignItems: 'center',
    backgroundColor: '#rgba(255, 255, 255, 0.8)',
    width: wp('80%'),
    height: hp('70%'),
    marginTop: 5,
    alignSelf: 'center',
  },

});
