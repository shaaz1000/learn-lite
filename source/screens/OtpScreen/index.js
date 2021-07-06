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
  SafeAreaView
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../../commonComponents/loader';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import APICaller from '../../utilities/apiCaller'
import {connect} from "react-redux"
import * as userActions from "../../redux/actions/user"
import { unsubscribe, getNetwork } from '../../utilities/CheckNetwork';
import AppColor from "../../utilities/AppColor"
import AppImages from "../../assets/Image"
 class OtpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.refpin1 = React.createRef();
    this.state = {
      pin1:'',
      pin2:'',
      pin3:'',
      pin4:'',
      pin5:'',
      pin6:'',
      resendButtonDisabledTime:20,
      resendOtpTimerInterval:null,
      resendOtpTimerMinInterval:null,
      minutes:5,
      seconds:0,
      loading: false,
      keyboardAvoidingViewKey: 'keyboardAvoidingViewKey',
      enableTimer:true,
      disabled : false
    };
}


componentDidMount() {
  //this.startResendOtpTimer();
  
  this.startResendMinutesOtpTimer();
  //this.refs.refpin1.focus();
  this.checkNetWork();
  this.updateState();
  this.keyboardHideListener = Keyboard.addListener(Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide', this.keyboardHideListener.bind(this));
}

async checkNetWork()  {
  let checknet = await (getNetwork());
  this.setState({checkNetwork:checknet});
}

async updateState() {
  let checknet = await (unsubscribe());
  /* eslint-disable */
  this.setState({checkNetwork:checknet});
}
componentWillUnmount() {
  this.keyboardHideListener.remove()
}
keyboardHideListener() {
  this.setState({
      keyboardAvoidingViewKey:'keyboardAvoidingViewKey' + new Date().getTime()
  });
}

  startResendMinutesOtpTimer = () => {
    let timer = setInterval(() => {
      if (this.state.seconds > 0) {
        this.setState({ seconds: (this.state.seconds) - 1 });
      }
      if (this.state.seconds === 0) {
        if (this.state.minutes === 0) {
          clearInterval(this.state.resendOtpTimerMinInterval)
          this.setState({ enableTimer: false });
          this.setState({disabled:true})
          alert("Otp time has been expired, If you haven't received an otp please click on the resend otp button'")
        } else {
          this.setState({ minutes: (this.state.minutes) - 1 });
          this.setState({ seconds: 59 });
        }
      }
    }, 1000);
    this.setState({ resendOtpTimerMinInterval: timer });
  }

submitotp = async () => {
  if (this.state.checkNetwork === true) {
    if (this.state.pin1 !== '' && this.state.pin2 !== '' && this.state.pin3 !== '' && this.state.pin4 !== '' && this.state.pin5 !== '') {
      this.setState({ loading: true });
      const body = {
        codeBox1: this.state.pin1,
        codeBox2: this.state.pin2,
        codeBox3: this.state.pin3,
        codeBox4: this.state.pin4,
        codeBox5: this.state.pin5,
        codeBox6: this.state.pin6
      }
      if(this.props.navigation.state.params.tokenAvailable){
        console.log("if wali api")
        const token = await AsyncStorage.getItem('userToken')
       
        APICaller("verifyOtp",body,'POST',token)
        .then(async ({data})=>{
          console.log(data,"from otp screen")
          if (data.status == 'OK' && data.code === 200) {
            this.setState({ loading: false });
            //console.log('data2 from otp', data);
            // console.log('data2 ', data.metadata);
            await AsyncStorage.setItem('UserData', JSON.stringify(data.metadata))
            await AsyncStorage.setItem('user_id', data.metadata.id.toString())
            //await AsyncStorage.setItem('userToken', JSON.stringify(data.token))
            await AsyncStorage.setItem('userToken', JSON.stringify(data.token))
            await AsyncStorage.setItem('IntroductionStatus','true')
            this.props.dispatch(userActions.setUserData(data.metadata))

            this.props.navigation.navigate('WhiteScreen');
          }

          else{
            this.setState({loading: false})
            alert("Please enter valid otp")
          }
        })
      }
      else{
        console.log("else wali api")
        APICaller("verifyOtp",body,'POST').then(async (response) => {
          console.log(response.data,"from verify otp 108");
  
          if (response.data.status == 'OK' && response.data.code === 200) {
            this.setState({ loading: false });
            //console.log('data2 from otp', response.data);
            // console.log('data2 ', response.data.metadata);
            await AsyncStorage.setItem('UserData', JSON.stringify(response.data.metadata))
            await AsyncStorage.setItem('user_id', response.data.metadata.id.toString())
            await AsyncStorage.setItem('userToken', JSON.stringify(response.data.token))
            this.props.dispatch(userActions.setUserData(response.data.metadata))
            this.props.navigation.navigate('WhiteScreen');
            
          
      } else {
        this.setState({ loading: false });
  
        Alert.alert(
          'Alert',
          'Please enter valid otp.',
          [
            {
              text: 'OK',
              onPress: () => {
                this.setState({pin1:''});
        this.setState({pin2:''});
        this.setState({pin3:''});
        this.setState({pin4:''});
        this.setState({pin5:''});
        this.setState({pin6:''});
              },
            },
          ],
          { cancelable: false }
        );
      }
    }, (error) => {
      console.log(error);
      alert(error);
      this.setState({ loading: false });
    });
      }
      }
       else {
      alert('Please enter otp.');
    }
  }
  else {
    alert('Please check your internet connection.');
  }
}

 resendOtpApi = async () => {
  const data = await AsyncStorage.getItem('user_id')
  
  const body = {
    id:data
  }
  APICaller(`resendOtp`, body, 'POST')
  .then((response) =>{
    this.setState({disabled:false})
    if(response.data.response == 'success'){
      alert(response.data.message)
    }
    
  })
  .catch(err =>{
    console.log(err,"err")
  })
}
resendotp=() => {
  //alert('hello');
  //clearInterval(this.state.resendOtpTimerMinInterval)
  this.setState({minutes:5});
  this.setState({seconds:0});
  this.startResendMinutesOtpTimer();
  this.setState({enableTimer:true});
  this.setState({pin1:''});
  this.setState({pin2:''});
  this.setState({pin3:''});
  this.setState({pin4:''});
  this.setState({pin5:''});
  this.setState({pin6:''});
}
  render() {
    let { keyboardAvoidingViewKey } = this.state
    const { pin1, pin2, pin3, pin4, pin5, pin6 } = this.state
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0
    
    return (
      <KeyboardAvoidingView
        behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}
        style={{ flex: 1, backgroundColor: '#ffffff' }} >
        <Loader loading={this.state.loading} />
        <SafeAreaView style={{backgroundColor:'transparent'}}/>
        <Image
          style={{ position: 'absolute', resizeMode: 'stretch', width: wp('100%'), height: hp('30%') }}
          source={require('../../assets/Image/bg3.png')}>
        </Image>
        <View style={{ top: 0, left: 0, right: 0, flexDirection: 'row', alignItems: 'flex-start', height: hp('30%') }}>
          <View style={{ marginTop: hp('5%'), marginLeft: wp('8%') }}>
            <Text style={{ fontSize: hp('3%'), fontWeight: 'bold' , color:"white"}}>Please</Text>
            <Text style={{ marginTop: hp('1%'), fontSize: hp('3%'), fontWeight: 'bold' , color:"white" }}>enter Otp</Text>
          </View>
          <Image
            style={{ position: 'absolute', alignSelf: 'flex-end', marginLeft: wp('45%'), resizeMode: 'contain', bottom: hp("1%"), width: wp('60%'), height: hp('30%') }}
            source={AppImages.newSignupFace2}>
          </Image>
        </View>
        
        <View style={{ marginTop: hp('2%'), marginLeft: wp('4%'), marginRight: wp('4%') }}>
        <View style={{marginTop:hp("2%")}}>
          <Text style={{marginLeft:wp("4%")}}>We have sent you one time password to your <Text style={{fontWeight: 'bold'}}>Contact No</Text></Text>
          
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{ marginLeft: wp('4%'), marginTop: hp('2%'), color: "black",fontWeight:"700" }}>OTP</Text>
          {/* <Text style={{ fontWeight: 'bold', marginLeft: wp('1%'), color: '#FF001A' }}>Resend</Text> */}
          {this.state.enableTimer ?
              <View style={{ flexDirection: 'row',marginTop:hp("2%"),marginHorizontal:wp("1%") }}>
              <Text style={{ fontWeight: 'bold', marginLeft: wp('1%'), color: '#FF001A' }}>{this.state.minutes}:</Text>
              {this.state.seconds < 10 ?
                <Text style={{ fontWeight: 'bold', color: '#FF001A' }}>0{this.state.seconds}</Text> :
                <Text style={{ fontWeight: 'bold', color: '#FF001A' }}>{this.state.seconds}</Text>
              }
            </View> :
               null
             }
          </View>
          <View style={{ marginTop: hp('2%'), justifyContent: 'space-evenly', flexDirection: 'row' }}>
            <TextInput
              keyboardType="number-pad"
              ref={"refpin1"}
              onChangeText={(pin1) => {
                this.setState({ pin1: pin1 })
                if (pin1 !== '') {
                  this.refs.refpin2.focus()
                }
              }}
              value={pin1}
              maxLength={1}
              style={styles.textStyle}
            >
            </TextInput>

            <TextInput
            keyboardType="number-pad"
              ref={"refpin2"}
              onChangeText={(pin2) => {
                this.setState({ pin2: pin2 })
                if (pin2 !== '') {
                  this.refs.refpin3.focus()
                }
              }}
              value={pin2}
              maxLength={1}
              style={styles.textStyle}
            >
            </TextInput>

            <TextInput
            keyboardType="number-pad"
              ref={"refpin3"}
              onChangeText={(pin3) => {
                this.setState({ pin3: pin3 })
                if (pin3 !== '') {
                  this.refs.refpin4.focus()
                }
              }}
              value={pin3}
              maxLength={1}
              style={styles.textStyle}
            >
            </TextInput>

            <TextInput
            keyboardType="number-pad"
              ref={"refpin4"}
              onChangeText={(pin4) => {
                this.setState({ pin4: pin4 })
                if (pin4 !== '') {
                  this.refs.refpin5.focus()
                }
              }}
              value={pin4}
              maxLength={1}
              style={styles.textStyle}
            >
            </TextInput>
            <TextInput
              ref={"refpin5"}
              keyboardType="number-pad"
              onChangeText={(pin5) => {
                this.setState({ pin5: pin5 })
                if (pin5 !== '') {
                  this.refs.refpin6.focus()
                }
              }}
              value={pin5}
              maxLength={1}
              style={styles.textStyle}
            >
            </TextInput>

            <TextInput
              ref={"refpin6"}
              onChangeText={(pin6) => {
                this.setState({ pin6: pin6 })
             
              }}
              value={pin6}
              maxLength={1}
              style={styles.textStyle}
              keyboardType="number-pad"
            >
            </TextInput>

            {/* <TextInput
              ref={"refpin6"}
              keyboardType=''
              onChangeText={(pin6) => {
                this.setState({ pin6: pin6 })
                if (pin6 !== '') {
                  Keyboard.dismiss();
                }
              }}
              value={pin6}
              maxLength={1}
              style={styles.textStyle}
            >
            </TextInput> */}
          </View>
          <View style={{ flexDirection: 'row', marginTop: hp('3%') }}>
            <Text style={{ marginLeft: wp('4%'), color: '#656565' }}>Did'nt receive the OTP,</Text>
            <TouchableOpacity onPress={()=>this.resendOtpApi()}>
              <Text style={{ marginLeft: wp('1%'), color: AppColor.colorRed }}>Resend</Text>
            </TouchableOpacity>
          </View>
          {/* <Text>Resend {this.state.minutes}</Text>
         { this.state.seconds < 10 ?

          <Text>0{this.state.seconds}</Text>:
          <Text>{this.state.seconds}</Text>
         } */}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            disabled={this.state.disabled}
            onPress={this.submitotp}>
            {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: wp('100%') }}> */}
              <Text style={styles.buttonTextStyle}>Verify</Text>
              {/* <Image source={require('../../assets/Image/Next.png')} resizeMode='contain' style={{ height: hp('2%'), marginTop: hp('1%') }} /> */}
            {/* </View> */}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  textStyle:{
    backgroundColor:'#F7F7F7',
    alignSelf:'center',
    fontSize:20,
    height:hp('8%'),
    width:wp('14%'),
    borderRadius:15,
    borderWidth:0.5,
    borderColor:'#FFAD36',
    alignItems:'center',
    textAlign:'center'
  },
  buttonStyle: {
    backgroundColor: AppColor.colorPrimary,
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#FFAD36',
    height: hp('6%'),
    borderRadius: 10,
    marginTop:hp('7%'),
    marginHorizontal: wp('1%'),
    textAlignVertical: 'center',
    justifyContent:'center',
  },
  buttonTextStyle: {
    color: AppColor.colorWhite,
    textAlignVertical: 'center',
    alignItems:'center',
    alignSelf:'center',
    fontWeight:'bold',
    fontSize: hp('2.5%'),
  },
  inputStyle: {
    height:hp('7%'),
    flex:1,
    color:'#000',
    paddingHorizontal:20,
    fontSize: hp('2%'),
  },
 
});
export default connect()(OtpScreen)