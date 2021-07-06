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
} from 'react-native';
import Loader from '../../commonComponents/loader';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { responsiveHeight, responsiveWidth, responsiveFontSize, responsiveScreenFontSize } from 'react-native-responsive-dimensions';
import Axios from 'axios';
import { unsubscribe, getNetwork } from '../../utilities/CheckNetwork';
import APICaller from '../../utilities/apiCaller';
import AppColor from '../../utilities/AppColor'
export default class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      TextInputEmail: '',
      loading: false,
      setLoading: false,
      platform: '',
      checkNetwork: false,
      keyboardAvoidingViewKey: 'keyboardAvoidingViewKey',
    };
  }

  componentDidMount() {
    this.setState({ platform: Platform.OS });
    this.checkNetWork();
    this.updateState();
    this.keyboardHideListener = Keyboard.addListener(Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide', this.keyboardHideListener.bind(this));
  }
  async checkNetWork() {
    let checknet = await (getNetwork());
    /* eslint-disable */
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
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      return false;
    }
    else {
      return true;
    }
  }
  handleSubmitPress = async () => {
    Keyboard.dismiss();
    if (this.state.checkNetwork == true) {
      if (this.state.TextInputEmail !== '') {
        if (this.validateEmail(this.state.TextInputEmail)) {
          this.setState({ loading: true });
          const body = {
            user_email: this.state.TextInputEmail,
          }
          APICaller('forgot', body,'POST').then(({data}) => {
            console.log('response line 82 forgot password', data);
            if (data.status == 'OK' && data.code === 200) {
              this.setState({ loading: false });
              //console.log('data1 ', response.data);
              console.log(data,"Ddd")
              this.props.navigation.navigate("ResetPassword",{
                token:data.metadata.token,
                email:data.metadata.email
              })
              //alert(response.data.message);
            }
            else {
              alert('The selected user email is invalid.');
              this.setState({ loading: false });
            }
          }, (error) => {
            console.log(error);
            alert(error);
            this.setState({ loading: false });
          });
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
      <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}
        style={{ flex: 1, backgroundColor: '#ffffff' }} >
        <Loader loading={this.state.loading} />
        <Image
          style={{ position: 'absolute', resizeMode: 'stretch', width: wp('100%'), height: hp('30%') }}
          source={require('../../assets/Image/bg3.png')}>
        </Image>
        {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('LoginScreen')}>
          <View style={{ marginTop: hp('2%'), marginLeft: wp('2%') }}>
            <Image source={require('../../assets/Image/back_arrow.png')}></Image></View></TouchableOpacity> */}
        <View style={{ top: 0, left: 0, right: 0, flexDirection: 'row', alignItems: 'flex-start', height: hp('30%') }}>
          <View style={{ marginTop: hp('10%'), marginLeft: wp('8%') }}>
            <Text style={{ fontSize: hp('3%'), fontWeight: 'bold' ,color:"white"}}>Forgot</Text>
            <Text style={{ marginTop: hp('1%'), fontSize: hp('3%'), fontWeight: 'bold',color:"white" }}>Password</Text>
          </View>
          <Image
            style={{ position: 'absolute', alignSelf: 'flex-end', marginLeft: wp('35%'), resizeMode: 'contain', width: wp('60%'), height: hp('25%'),left:wp("10%") }}
            source={require('../../assets/Image/img_forgotpasssword.png')}>
          </Image>
        </View>

        <View style={{ marginLeft: wp('6%'), marginRight: wp('6%'), flex: 1,marginTop:hp("5%") }}>
          <Text style={{marginBottom:hp("2%"),marginLeft:wp("2%"),color:AppColor.colorDarkBlue,fontWeight: 'bold'}}>Email Id</Text>
            <TextInput
              placeholder="Email ID"
              placeholderTextColor="#3D3D3D"
              underlineColorAndroid='transparent'
              autoCapitalize="none"
              keyboardType="email-address"
              value={this.state.TextInputEmail}
              onChangeText={text => this.setState({ TextInputEmail: text })}
              style={styles.inputStyle} />
          
          {/* <Text style={{ marginTop: hp('2%'), color: '#656565' }}>Reset Password Link sent to your Email Id</Text> */}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={this.handleSubmitPress}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={styles.buttonTextStyle}>Reset Password Link</Text>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  SectionStyle: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#F3FAFC',
    alignItems:'center',
    borderRadius: 10 ,
  },
  buttonStyle: {
    backgroundColor: AppColor.colorPrimary,
    borderWidth: 0,
    // color: '#FFFFFF',
    //borderColor: '#FFAD36',
    height: hp('6.2%'),
    borderRadius: 15,
    marginTop:hp('5%'),
    //textAlignVertical: 'center',
    justifyContent:'center',
    
  },
  buttonTextStyle: {
    color: 'white',
    textAlignVertical: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: hp('2.2%'),
  },
  inputStyle: {
    height: hp('7%'),
    borderRadius:15,
    //flex: 1,
    backgroundColor: AppColor.colorGrayBackground,
    
    
    paddingHorizontal: 15,
    fontSize: hp('2%')
  },

});