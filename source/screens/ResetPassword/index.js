import React, { useState } from 'react';
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

import APICaller from '../../utilities/apiCaller';
import AppColor from '../../utilities/AppColor'

const ResetPassword = ({navigation}) => {
   
    const token = navigation.getParam("token")
    const email = navigation.getParam("email")
    
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0
    const [password,setPassword] = useState({
        Password:"",
        ConfirmPassword:""
    })
    

    const submitPassword = () => {
        if(password.Password != password.ConfirmPassword){
            alert("Password and Confirm Password should be same")
        }
        else if(password.Password == "" && password.ConfirmPassword == ""){
            alert("Please enter Password and Confirm Password")
        }
        else{
            const body = {
                password:password.Password,
                token,
                email,
                password_confirmation:password.ConfirmPassword
            }
            APICaller(`password/reset/${token}/${email}`,body,'POST')
            .then(({data})=>{
                console.log(data,"lne 50")
                if(data.code == 200 && data.status == 'OK'){
                    alert("Password changed successfully")
                    navigation.navigate("LoginScreen")
                }
                else{
                    alert("Failed to reset password , please try again")
                }
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }
    return(
        
        <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}
        style={{ flex: 1, backgroundColor: '#ffffff' }} >
        {/* <Loader loading={this.state.loading} /> */}
        <Image
          style={{ position: 'absolute', resizeMode: 'stretch', width: wp('100%'), height: hp('30%') }}
          source={require('../../assets/Image/bg3.png')}>
        </Image>
        {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('LoginScreen')}>
          <View style={{ marginTop: hp('2%'), marginLeft: wp('2%') }}>
            <Image source={require('../../assets/Image/back_arrow.png')}></Image></View></TouchableOpacity> */}
        <View style={{ top: 0, left: 0, right: 0, flexDirection: 'row', alignItems: 'flex-start', height: hp('30%') }}>
          <View style={{ marginTop: hp('10%'), marginLeft: wp('8%') }}>
            <Text style={{ fontSize: hp('3%'), fontWeight: 'bold' ,color:"white"}}>Set your</Text>
            <Text style={{ marginTop: hp('1%'), fontSize: hp('3%'), fontWeight: 'bold',color:"white" }}>Password</Text>
          </View>
          <Image
            style={{ position: 'absolute', alignSelf: 'flex-end', marginLeft: wp('35%'), resizeMode: 'contain', width: wp('50%'), height: hp('22%'),left:wp("10%") }}
            source={require('../../assets/Image/img_forgotpasssword.png')}>
          </Image>
        </View>
        <View>
            <Text style={styles.labelTextStyle}>Enter new password</Text> 
            <TextInput
                style={styles.inputTextStyle}
                secureTextEntry={true}
                onChangeText={(name)=>{
                    setPassword({
                        ...password,
                        Password:name
                    })
                }}
            />
            <Text style={[styles.labelTextStyle,{marginTop:hp("2%")}]}>Confirm password</Text> 
            <TextInput
                style={styles.inputTextStyle}
                secureTextEntry={true}
                onChangeText={(name)=>{
                    setPassword({
                        ...password,
                        ConfirmPassword:name
                    })
                }}
            />
            <TouchableOpacity 
                onPress={submitPassword}
                disabled={password.Password != "" && password.ConfirmPassword != "" ? false : true}
                style={styles.buttonStyle}>
                <Text style={styles.buttonTextStyle}>Submit</Text>
            </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    labelTextStyle:{
        fontWeight:"bold",
        marginLeft:wp("7%"),
        marginTop:hp("5%"),
        color:AppColor.colorBlueDark
    },
    inputTextStyle:{
        width:wp("88%"),
        height: hp("6.2%"),
        borderRadius:15,
        marginTop:hp("2%"),
        marginHorizontal:wp("5%"),
        alignSelf:"center",
        backgroundColor:AppColor.colorGrayBackground
    },
    buttonStyle: {
        backgroundColor: AppColor.colorPrimary,
        borderWidth: 0,
        // color: '#FFFFFF',
        //borderColor: '#FFAD36',
        height: hp('6.2%'),
        width: wp("88%"),
        alignSelf:"center",
        borderRadius: 15,
        marginTop:hp('5%'),
        marginHorizontal:wp("5%"),
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
})

export default ResetPassword;