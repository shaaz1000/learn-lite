import React, {useState} from 'react';
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
  TouchableWithoutFeedback,
  CheckBox,
  SafeAreaView
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../../commonComponents/loader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
import {unsubscribe, getNetwork} from '../../utilities/CheckNetwork';
import RNPicker from 'rn-modal-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import APICaller from '../../utilities/apiCaller';
import {parentIcon,studentIcon,radioButtonChecked,radioButtonUnchecked} from '../../assets/Image/index'
import AppColors from "../../utilities/AppColor"
import AppImages from "../../assets/Image";
import TermPopup from '../../commonComponents/termsPopup';
import PrivacyPopup from '../../commonComponents/PrivacyPopup'
export default class RegisterScreen extends React.Component {
  stateList = [];
  cityList = [];
  constructor(props) {
    super(props);
    this.reffirstname = React.createRef();
    this.refemail = React.createRef();
    this.state = {
      TextInputFirstName: '',
      TextInputLastName: '',
      TextInputEmail: '',
      TextInputPassword: '',
      TextInputContact: '',
      TextInputStudentContact: '',
      loading: false,
      //setLoading:false,
      platform: '',
      checkNetwork: false,
      radioBtnsData: [
        {name: 'Parent', imagename: parentIcon},
        {name: 'Student', imagename: studentIcon},
      ],
      checked: 1,
      radioBtnsClass: ['Class XI', 'Class XII'],
      checkedClass: 0,
      checkedTerms: 1,
      stateval: '',
      selectState: 'State',
      selectCity: 'City',
      choosenIndexState: 0,
      choosenIndexCity: 0,
      grade:"",
      radionbtnTerms: [
        "I've read and agree with terms of service & privacy policy",
      ],
      btnstatus: true,
      chkText: "I've read and agree with terms of service & privacy policy",
      chkIsSelected: false,
      states: [],
      citys: [],
      selectClassValue: 5,
      keyboardAvoidingViewKey: 'keyboardAvoidingViewKey',
      isPrivacyPopupVisible:false,
      isTermsPopupVisible:false
    };
  }

  
  componentDidMount() {
    this.checkNetWork();
    this.updateState();
    this.getState();
    this.keyboardHideListener = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide',
      this.keyboardHideListener.bind(this),
    );
  }
  async checkNetWork() {
    let checknet = await getNetwork();
    this.setState({checkNetwork: checknet});
  }

  async updateState() {
    let checknet = await unsubscribe();
    /* eslint-disable */
    this.setState({checkNetwork: checknet});
  }
  componentWillUnmount() {
    this.keyboardHideListener.remove();
  }
  keyboardHideListener() {
    this.setState({
      keyboardAvoidingViewKey: 'keyboardAvoidingViewKey' + new Date().getTime(),
    });
  }
  validateEmail = (text) => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      return false;
    } else {
      return true;
    }
  };

  validatePassword = (text) => {
    console.log(text);
    if (
      /^([a-zA-Z0-9]+)$/.test(text) &&
      /\d/.test(text) &&
      /[A-Z]/i.test(text)
    ) {
      return true;
    } else {
      return false;
    }
  };

  validateMobile(text) {
    const reg = /^[0]?[789]\d{9}$/;
    if (reg.test(text) === false) {
      return false;
    } else {
      return true;
    }
  }

  radiobtncheck = (key, data) => {
    this.setState({checked: key});
    this.setState({selectCity: 'City'});
    this.setState({selectState: 'State'});
    this.setState({choosenIndexState: 0});
    this.setState({choosenIndexCity: 0});
    this.state.citys = null;

    this.setState({TextInputFirstName: ''});
    this.setState({TextInputLastName: ''});
    this.setState({TextInputEmail: ''});
    this.setState({TextInputPassword: ''});
    this.setState({TextInputContact: ''});
    this.setState({TextInputStudentContact: ''});
  };
  radiobtncheckClass = (key, data) => {
    this.setState({checkedClass: key});
  };
  radiochkTerms = (key, data) => {
    this.setState({checkedTerms: key});
    this.setState({btnstatus: false});
  };

  chkboxTerms = (data) => {
    this.setState({chkIsSelected: data});
    this.setState({btnstatus: !data});
  };

  getState = async () => {
     return new Promise( async(resolve)=>{
      if (global.checkInternet === true) {
        console.log("line 179 register screen")
        this.setState({loading: true});
        APICaller('getstates')
          .then((response) => {
            //console.log('data ', response.data);
            if (response.data.response == 'success') {
              this.setState({loading: false});
              console.log("line 186 register screen",response.data)
              this.stateList = response.data.data;
              //console.log("state",this.stateList);
              this.setState({states: []});
              if (this.stateList !== null) {
                if (this.stateList.length > 0) {
                  let states = this.stateList;
                  this.setState({states: states});
                  resolve(true)
                } else {
                  this.setState({states: null});
                  resolve(null)

                }
              } else {
                this.setState({states: null});
                resolve(null)

              }
            }
          })
          .catch(function (error) {
            console.log(error);
            this.setState({loading: false});
            resolve(null)

            alert(error);
          });
      } else {
        alert('Please check your internet connection.');
        resolve(null)

      }
    })
  };

  async getCity(state_id) {
    if (state_id !== 0) {
      if (global.checkInternet === true) {
        this.setState({loading: true});
        let body = {
          state_id: state_id,
        }
        APICaller('getcity',body,'POST').then(
          (response) => {
            console.log('response ', response);
            if (response.data.response == 'success') {
              this.setState({loading: false});
              console.log('data ', response.data);
              this.cityList = response.data.data;
              this.setState({citys: []});
              if (this.cityList !== null) {
                if (this.cityList.length > 0) {
                  let citys = this.cityList;
                  this.setState({citys: citys});
                } else {
                  this.setState({citys: null});
                }
              } else {
                this.setState({citys: null});
              }
            }
          },
          (error) => {
            console.log(error);
            alert(error);
            this.setState({loading: false});
          },
        );
      } else {
        alert('Please check your internet connection.');
      }
    }
  }

  handleRegisterPress = async () => {
    if (this.state.checked === 0) {
      // for parent
      if (this.state.checkNetwork === true) {
        if (this.state.TextInputFirstName !== '') {
          if (this.state.TextInputEmail !== '') {
            if (this.validateEmail(this.state.TextInputEmail)) {
              if (this.state.TextInputPassword !== '') {
                // if (this.validatePassword(this.state.TextInputPassword)) {
                  if (this.state.TextInputContact.length === 10) {
                    if (this.validateMobile(this.state.TextInputContact)) {
                      if (this.state.choosenIndexState !== 0) {
                        if (this.state.choosenIndexCity !== 0) {
                          if (!this.state.btnstatus) {
                            this.setState({loading: true});
                            const body = {
                              firstname: this.state.TextInputFirstName,
                              lastname: this.state.TextInputLastName,
                              email: this.state.TextInputEmail,
                              password: this.state.TextInputPassword,
                              phone: this.state.TextInputContact,
                              state: this.state.choosenIndexState,
                              city: this.state.choosenIndexCity,
                              terms: 1,
                            }
                            APICaller('parent/signup',body,'POST').then(
                              (response) => {
                                console.log('response from parent >>>>> ', response.data);
                                if (
                                  response.data.status == 'OK' &&
                                  response.data.code === 200
                                ) {
                                  this.setState({loading: false});
                                  console.log('data ', response.data);
                                  console.log('data ', response.data.metadata);
                                  AsyncStorage.setItem(
                                    'UserData',
                                    JSON.stringify(response.data.metadata),
                                  );
                                  AsyncStorage.setItem('user_id', response.data.metadata.id.toString());
                                  this.props.navigation.navigate('OtpScreen',{tokenAvailable:false});
                                } else {
                                  console.log()
                                  alert('The email has already been taken.');
                                  this.setState({loading: false});
                                }
                              },
                              (error) => {
                                console.log(error,"error from register screen parent section");
                                alert(error);
                                this.setState({loading: false});
                              },
                            );
                          } else {
                            alert(
                              'Please agree with terms of service and privacy policy.',
                            );
                          }
                        } else {
                          alert('Please select city');
                        }
                      } else {
                        alert('Please select state');
                      }
                    } else {
                      alert('Please enter valid contact number');
                      this.refs.refcontactnumber.focus();
                    }
                  } else {
                    alert('contact number must be 10 digit.');
                    this.refs.refcontactnumber.focus();
                  }
                // } else {
                //   alert('Invalid Password\npassword must be alphanumerical');
                //   this.refs.refpassword.focus();
                // }
              } else {
                alert('Please enter password');
                this.refs.refpassword.focus();
              }
            } else {
              alert('Please enter valid email id');
              this.refs.refemail.focus();
            }
          } else {
            alert('Please enter email id');
            this.refs.refemail.focus();
          }
        } else {
          alert('Please enter first name');
          this.refs.reffirstname.focus();
        }
      } else {
        alert('Please check your internet connection.');
      }
    }
    if (this.state.checked === 1) {
      // for student
      if (this.state.checkedClass == 0) {
        this.setState({selectClassValue: 5});
      } else {
        this.setState({selectClassValue: 6});
      }
      if (this.state.checkNetwork === true) {
        if (this.state.TextInputFirstName !== '') {
          if (this.state.TextInputEmail !== '') {
            if (this.validateEmail(this.state.TextInputEmail)) {
              if (this.state.TextInputPassword !== '') {
                // if (this.validatePassword(this.state.TextInputPassword)) {
                  if (this.state.TextInputStudentContact.length === 10) {
                    if (
                      this.validateMobile(this.state.TextInputStudentContact)
                    ) {
                      if (this.state.choosenIndexState !== 0) {
                        if(this.state.choosenIndexCity !== 0){

                        
                        if (!this.state.btnstatus) {
                          this.setState({loading: true});
                          const body = {
                              firstname: this.state.TextInputFirstName,
                              lastname: this.state.TextInputLastName,
                              email: this.state.TextInputEmail,
                              password: this.state.TextInputPassword,
                              course: this.state.grade,
                              phone: this.state.TextInputStudentContact,
                              state: this.state.choosenIndexState,
                              city : this.state.choosenIndexCity,
                              terms: 1,
                          }
                          // const body = new FormData()
                          // body.append("firstname",this.state.TextInputFirstName)
                          // body.append("lastname",this.state.TextInputLastName)
                          // body.append("email",this.state.TextInputEmail)
                          // body.append("password",this.state.TextInputPassword)
                          // body.append("course",this.state.grade)
                          // body.append("phone",this.state.TextInputStudentContact)
                          // body.append("state",this.state.choosenIndexState)
                          // body.append("city",this.state.choosenIndexCity)
                          // body.append("terms",1)
                          APICaller('student/signup',body,'POST').then(
                            (response) => {
                              console.log('response >>>>> ', response.data);
                              if (
                                response.data.status == 'OK' &&
                                response.data.code === 200
                              ) {
                                this.setState({loading: false});
                                console.log('data1 ', response.data);
                                AsyncStorage.setItem(
                                  'UserData',
                                  JSON.stringify(response.data.metadata),
                                );                               
                                AsyncStorage.setItem('user_id', response.data.metadata.id.toString());
                                AsyncStorage.setItem('IntroductionStatus','true')

                                this.props.navigation.navigate('OtpScreen',{tokenAvailable:false});
                                //this.props.navigation.goBack();
                              } else {
                                alert('The email has already been taken.');
                                this.setState({loading: false});
                              }
                            },
                            (error) => {
                              console.log(error,"error");
                              alert("error");
                              this.setState({loading: false});
                            },
                          );
                        } else {
                          alert(
                            'Please agree with terms of service and privacy policy.',
                          );
                        }
                      } else {
                        alert('Please select state and city');
                      }
                      }
                      else {
                        alert('Please select state and city')
                      }
                    } else {
                      alert('Please enter valid contact number');
                      this.refs.refstudentcontactnumber.focus();
                    }
                  } else {
                    alert('contact number must be 10 digit.');
                    this.refs.refstudentcontactnumber.focus();
                  }
                // } else {
                //   alert('Invalid Password!\npassword must be alpha numerical');
                //   this.refs.refpassword.focus();
                // }
              } else {
                alert('Please enter password');
                this.refs.refpassword.focus();
              }
            } else {
              alert('Please enter valid email id');
              this.refs.refemail.focus();
            }
          } else {
            alert('Please enter email id');
            this.refs.refemail.focus();
          }
        } else {
          alert('Please enter first name');
          this.refs.reffirstname.focus();
        }
      } else {
        alert('Please check your internet connection.');
      }
    }
    
  };
  stateCheck = (itemPosition, itemValue) => {
    console.log('State Check ' + itemValue.id);
    if (itemValue.id === 0) {
      this.setState({selectState: '', choosenIndexState: itemValue.id});
    } else {
      this.setState({
        selectState: itemValue.name,
        choosenIndexState: itemValue.id,
      });
      this.state.citys = null;
      this.setState({citys: null});
      this.setState({selectCity: 'City', choosenIndexCity: 0});
      
        this.getCity(itemValue.id);
      
    }
  };

  CityCheck = (itemPosition, itemValue) => {
    console.log('City Check ' + itemValue.id);
    if (itemValue.id === 0) {
      this.setState({selectCity: '', choosenIndexCity: itemValue.id});
    } else {
      this.setState({
        selectCity: itemValue.name,
        choosenIndexCity: itemValue.id,
      });
    }
  };

  _toggleTermsPopup =()=>{
    this.setState({isTermsPopupVisible:!this.state.isTermsPopupVisible})
  }

  _togglePrivacyPopup =()=>{
    this.setState({isPrivacyPopupVisible:!this.state.isPrivacyPopupVisible})
  }

  render() {
    
    let {keyboardAvoidingViewKey} = this.state;
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;
    const pattern = /^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/;
    console.log(this.state.TextInputStudentContact,this.state.TextInputEmail,this.state.TextInputFirstName,this.state.TextInputLastName,this.state.TextInputPassword,this.state.grade)
    return (
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'always'}
        style={{flex: 1, backgroundColor: '#ffffff'}}
        showsVerticalScrollIndicator={false}
       >
        <Loader loading={this.state.loading} />
         <Image
          style={{ position: 'absolute', resizeMode: 'stretch', width: wp('100%'), height: hp('30%') }}
          source={require('../../assets/Image/bg3.png')}>
        </Image>
        <View style={{ top: 0, left: 0, right: 0, flexDirection: 'row', alignItems: 'flex-start', height: hp('30%') }}>
          <View style={{ marginTop: hp('5%'), marginLeft: wp('8%') }}>
            <Text style={{ marginTop: hp('1%'), fontSize: hp('3%'), fontWeight: 'bold' , color:AppColors.colorWhite}}>Hello again</Text>
            <Text style={{ marginTop: hp('1%'), fontSize: hp('3%'), fontWeight: 'bold', color:AppColors.colorWhite }}>Signup</Text>
            <Text style={{ marginTop: hp('1%'), fontSize: hp('3%'), fontWeight: 'bold', color:AppColors.colorWhite }}>Get Started</Text>
          </View>
          {this.state.checked === 0 ?
          <Image
          style={{ position: 'absolute', alignSelf: 'flex-end', marginLeft: wp('35%'), resizeMode: 'contain', bottom: 5, width: wp('70%'), height: hp('30%') }}
          source={AppImages.parentImage}>
        </Image>
        :
(
            <Image
              style={{
                position: 'absolute',
                alignSelf: 'flex-end',
                marginLeft: wp('35%'),
                resizeMode: 'contain',
                bottom: 5,
                width: wp('60%'),
                height: hp('30%'),
              }}
              source={require('../../assets/Image/newSignupFace2.png')}></Image>
          )}
        </View>
        <View
          style={{
            marginBottom: hp('2%'),
            marginTop: hp('2%'),
            marginLeft: wp('0%'),
            marginRight: wp('0%'),
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              marginLeft: wp('8%'),
              color: '#FF001A',
            }}>
            Register as
          </Text>
          <View style={{width: wp('100%')}}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: hp('1%'),
                marginLeft: wp('4%'),
              }}>
              {this.state.radioBtnsData.map((data, key) => {
                return (
                  <View key={key}>
                    {this.state.checked == key ? (
                      <TouchableOpacity activeOpacity={1} style={styles.btn1}>
                        <Image style={styles.imgiocn} source={data.imagename} />
                        <Text style={{marginLeft: wp('1%')}}>{data.name}</Text>
                        <Image
                          style={styles.img}
                          source={radioButtonChecked}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => {
                          this.radiobtncheck(key, data);
                        }}
                        style={styles.btn1}>
                        <Image style={styles.imgiocn} source={data.imagename} />
                        <Text style={{marginLeft: wp('1%')}}>{data.name}</Text>
                        <Image
                          style={styles.img}
                          source={radioButtonUnchecked}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                );
              })}
            </View>
          </View>
          <View style={{marginHorizontal:15}}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: hp('2%'),
            }}>
              <Text style={styles.formTextStyle}>First Name</Text>
              <Text style={[styles.formTextStyle,
                {marginHorizontal:wp("1%")}
                ]}
              >Last Name</Text>
            </View>
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: 'row',
              marginTop: hp('2%'),
              
            }}>
            
            <CardView
              cardElevation={2}
              cardMaxElevation={5}
              cornerRadius={10}
              style={{height: hp('7%'), backgroundColor: '#ffffff'}}>
                
              <TextInput
                ref={'reffirstname'}
                placeholder="First Name"
                placeholderTextColor="#3D3D3D"
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                keyboardType="default"
                maxLength={16}
                value={this.state.TextInputFirstName}
                onChangeText={(text) =>
                  this.setState({
                    TextInputFirstName: text
                      .replace(/[^A-Za-z,\s]/g, '')
                      .replace(/[,.]/g, ''),
                  })
                }
                style={styles.inputStyle}
              />
            </CardView>

            <CardView
              cardElevation={2}
              cardMaxElevation={5}
              cornerRadius={10}
              style={{height: hp('7%'), backgroundColor: '#ffffff'}}>
              <TextInput
                placeholder="Last Name"
                placeholderTextColor="#3D3D3D"
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                keyboardType="default"
                maxLength={16}
                value={this.state.TextInputLastName}
                onChangeText={(text) =>
                  this.setState({
                    TextInputLastName: text
                      .replace(/[^A-Za-z,\s]/g, '')
                      .replace(/[,.]/g, ''),
                  })
                }
                style={styles.inputStyle}
              />
            </CardView>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: hp('2%'),
            }}>
              <Text style={styles.formTextStyle}>Email Id</Text>
              <Text style={[styles.formTextStyle,
                {marginHorizontal:wp("1%")}
                ]}
              >Password</Text>
            </View>
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: 'row',
              marginTop: hp('2%'),
            }}>
            <CardView
              cardElevation={2}
              cardMaxElevation={5}
              cornerRadius={10}
              style={{height: hp('7%'), backgroundColor: '#ffffff'}}>
              <TextInput
                ref={'refemail'}
                placeholder="Email ID"
                placeholderTextColor="#3D3D3D"
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                keyboardType="email-address"
                value={this.state.TextInputEmail}
                onChangeText={(text) => this.setState({TextInputEmail: text})}
                style={styles.inputStyle}
              />
            </CardView>

            <CardView
              cardElevation={2}
              cardMaxElevation={5}
              cornerRadius={10}
              style={{height: hp('7%'), backgroundColor: '#ffffff'}}>
              <TextInput
                ref={'refpassword'}
                placeholder="Password"
                placeholderTextColor="#3D3D3D"
                underlineColorAndroid="transparent"
                secureTextEntry={true}
                keyboardType="default"
                maxLength={12}
                value={this.state.TextInputPassword}
                onChangeText={(text) =>
                  this.setState({TextInputPassword: text})
                }
                style={styles.inputStyle}
              />
            </CardView>
          </View>
          {this.state.checked === 0 ? (
            <View>
              <View
                style={{
                  marginLeft: wp('0.5%'),
                  marginRight: wp('0.5%'),
                  flexDirection: 'column',
                  marginTop: hp('2%'),
                }}>
                <Text style={styles.formTextStyle}>Contact No</Text>
                <CardView
                  cardElevation={2}
                  cardMaxElevation={5}
                  cornerRadius={10}
                  style={{height: hp('7%'), backgroundColor: '#ffffff',marginTop:10}}>
                  <TextInput
                    ref={'refcontactnumber'}
                    placeholder="Contact Number"
                    placeholderTextColor="#3D3D3D"
                    underlineColorAndroid="transparent"
                    keyboardType="numeric"
                    maxLength={10}
                    returnKeyType="done"
                    value={this.state.TextInputContact}
                    onChangeText={(text) =>
                      this.setState({
                        TextInputContact: text
                          .replace(/[,.-]/g, '')
                          .replace(/ /g, ''),
                      })
                    }
                    style={{
                      fontSize: hp('2%'),
                      height: hp('7%'),
                      width: wp('100%'),
                      color: '#000',
                      paddingHorizontal: 13,
                    }}
                  />
                </CardView>
              </View>
              <View
            style={{
              flexDirection: 'row',
              marginTop: hp('2%'),
            }}>
              <Text style={styles.formTextStyle}>State</Text>
              <Text style={[styles.formTextStyle,
                {marginHorizontal:wp("1%")}
                ]}
              >City</Text>
            </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: "space-between",
                  flexDirection: 'row',
                  marginTop: hp('2%'),
                }}>
                <CardView
                  cardElevation={2}
                  cardMaxElevation={5}
                  cornerRadius={10}
                  style={{height: hp('7%'), backgroundColor: '#ffffff'}}>
                  <RNPicker
                    dataSource={this.state.states}
                    defaultValue={false}
                    pickerTitle={'State'}
                    showSearchBar={false}
                    disablePicker={false}
                    changeAnimation={'none'}
                    searchBarPlaceHolder={'Search.....'}
                    showPickerTitle={true}
                    searchBarContainerStyle={this.props.searchBarContainerStyle}
                    pickerStyle={styles.pickerStyle}
                    itemSeparatorStyle={styles.itemSeparatorStyle}
                    pickerItemTextStyle={styles.listTextViewStyle}
                    selectedLabel={this.state.selectState}
                    placeHolderLabel={this.state.selectState}
                    scrollEnabled={false}
                    selectLabelTextStyle={styles.selectLabelTextStyle}
                    placeHolderTextStyle={styles.placeHolderTextStyle}
                    dropDownImageStyle={styles.dropDownImageStyle}
                    dropDownImage={require('../../assets/Image/icon_arrow.png')}
                    selectedValue={(index, item) =>
                      this.stateCheck(index, item)
                    }
                  />
                </CardView>

                <CardView
                  cardElevation={2}
                  cardMaxElevation={5}
                  cornerRadius={10}
                  style={{height: hp('7%'), backgroundColor: '#ffffff'}}>
                  <RNPicker
                    dataSource={this.state.citys}
                    defaultValue={false}
                    pickerTitle={'City'}
                    showSearchBar={false}
                    disablePicker={false}
                    changeAnimation={'none'}
                    searchBarPlaceHolder={'Search.....'}
                    showPickerTitle={true}
                    searchBarContainerStyle={this.props.searchBarContainerStyle}
                    pickerStyle={styles.pickerStyle}
                    itemSeparatorStyle={styles.itemSeparatorStyle}
                    pickerItemTextStyle={styles.listTextViewStyle}
                    selectedLabel={this.state.selectCity}
                    placeHolderLabel={this.state.selectCity}
                    scrollEnabled={false}
                    selectLabelTextStyle={styles.selectLabelTextStyle}
                    placeHolderTextStyle={styles.placeHolderTextStyle}
                    dropDownImageStyle={styles.dropDownImageStyle}
                    dropDownImage={require('../../assets/Image/icon_arrow.png')}
                    selectedValue={(index, item) => this.CityCheck(index, item)}
                  />
                </CardView>
              </View>
            </View>
          ) : (
            <View>
              <View
                style={{
                  marginBottom: wp('1%'),
                  //marginRight: wp('2%'),
                  flexDirection: 'column',
                  marginTop: hp('2%'),
                }}>
                <Text style={styles.formTextStyle}>Select Grade</Text>
                <View
                  style={{
                    flexWrap: 'wrap',
                    //alignItems: 'flex-start',
                    //flex: 1,
                    flexDirection: 'row',
                    marginTop: hp('2%'),
                  }}>
                
                <TouchableOpacity 
                  onPress={()=>this.setState({ grade : "Class Xl" })}
                  style={{
                    backgroundColor:AppColors.colorGrayBackground,
                    borderColor:this.state.grade === "Class Xl" ?AppColors.colorDarkBlue:null,
                    borderWidth:this.state.grade === "Class Xl"?1:null,
                    marginLeft:5,
                    borderRadius: 10,
                    height:hp("6%"),
                    padding:5
                  }}
                >
                  <Text
                    style={{
                      fontWeight:  this.state.grade === "Class Xl" ? "bold" : null,
                      fontSize:15,
                      padding:5,
                      textAlign: "center",
                      color : this.state.grade === "Class Xl" ? AppColors.colorDarkBlue : "grey"
                    }}
                  >Class Xl</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                   onPress={()=>{
                     
                      this.setState({ grade : "Class Xll"})
                    }}
                  style={{
                    backgroundColor:AppColors.colorGrayBackground,
                    borderColor:this.state.grade ==="Class Xll"?AppColors.colorDarkBlue:null,
                    borderWidth:this.state.grade === "Class Xll"?1:null,
                    marginLeft:10,
                    borderRadius: 10,
                    height:hp("6%"),
                    padding:5
                  }}
                >
                  <Text
                    style={{
                      fontWeight:  this.state.grade === "Class Xll" ? "bold" : null,
                      padding:5,
                      textAlign: "center",
                      color : this.state.grade === "Class Xll" ? AppColors.colorDarkBlue : "grey"
                    }}
                  >Class Xll</Text>
                </TouchableOpacity>
                
                </View>
              </View>
              <Text style={styles.formTextStyle}>Contact No</Text>
                <CardView
                  cardElevation={2}
                  cardMaxElevation={5}
                  cornerRadius={10}
                  style={{height: hp('7%'), backgroundColor: '#ffffff',marginHorizontal:5,marginTop:hp('2%')}}>
                  <TextInput
                    ref={'refstudentcontactnumber'}
                    placeholder="Contact Number"
                    placeholderTextColor="#3D3D3D"
                    underlineColorAndroid="transparent"
                    keyboardType="numeric"
                    maxLength={10}
                    returnKeyType="done"
                    value={this.state.TextInputStudentContact}
                    onChangeText={(text) =>
                      this.setState({
                        TextInputStudentContact: text
                          .replace(/[,.-]/g, '')
                          .replace(/ /g, ''),
                      })
                    }
                    style={styles.inputStyle}
                  />
                </CardView>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: hp('2%'),
                }}>
              <Text style={styles.formTextStyle}>State</Text>
              <Text style={[styles.formTextStyle,
                {marginHorizontal:wp("1%")}
                ]}
              >City</Text>
            </View>
                <View
                style={{
                  flex: 1,
                  justifyContent: 'space-around',
                  flexDirection: 'row',
                  marginTop: hp('2%'),
                }}>
                <CardView
                  cardElevation={2}
                  cardMaxElevation={5}
                  cornerRadius={10}
                  style={{height: hp('7%'), backgroundColor: '#ffffff'}}>
                  <RNPicker
                    dataSource={this.state.states}
                    defaultValue={false}
                    pickerTitle={'State'}
                    showSearchBar={false}
                    disablePicker={false}
                    changeAnimation={'none'}
                    searchBarPlaceHolder={'Search.....'}
                    showPickerTitle={true}
                    searchBarContainerStyle={this.props.searchBarContainerStyle}
                    pickerStyle={styles.pickerStyle}
                    itemSeparatorStyle={styles.itemSeparatorStyle}
                    pickerItemTextStyle={styles.listTextViewStyle}
                    selectedLabel={this.state.selectState}
                    placeHolderLabel={this.state.selectState}
                    scrollEnabled={false}
                    selectLabelTextStyle={styles.selectLabelTextStyle}
                    placeHolderTextStyle={styles.placeHolderTextStyle}
                    dropDownImageStyle={styles.dropDownImageStyle}
                    dropDownImage={require('../../assets/Image/icon_arrow.png')}
                    selectedValue={(index, item) =>
                      this.stateCheck(index, item)
                    }
                  />
                </CardView>

                <CardView
                  cardElevation={2}
                  cardMaxElevation={5}
                  cornerRadius={10}
                  style={{height: hp('7%'), backgroundColor: '#ffffff'}}>
                  <RNPicker
                    dataSource={this.state.citys}
                    defaultValue={false}
                    pickerTitle={'City'}
                    showSearchBar={false}
                    disablePicker={false}
                    changeAnimation={'none'}
                    searchBarPlaceHolder={'Search.....'}
                    showPickerTitle={true}
                    searchBarContainerStyle={this.props.searchBarContainerStyle}
                    pickerStyle={styles.pickerStyle}
                    itemSeparatorStyle={styles.itemSeparatorStyle}
                    pickerItemTextStyle={styles.listTextViewStyle}
                    selectedLabel={this.state.selectCity}
                    placeHolderLabel={this.state.selectCity}
                    scrollEnabled={false}
                    selectLabelTextStyle={styles.selectLabelTextStyle}
                    placeHolderTextStyle={styles.placeHolderTextStyle}
                    dropDownImageStyle={styles.dropDownImageStyle}
                    dropDownImage={require('../../assets/Image/icon_arrow.png')}
                    selectedValue={(index, item) => this.CityCheck(index, item)}
                  />
                </CardView>
              </View>
            </View>
          )}
          <View
            style={{
              flexDirection: 'row',
              marginTop: hp('2%'),
              marginRight: wp('12%'),
              marginLeft: wp('1%'),
            }}>
            {this.state.radionbtnTerms.map((data, key) => {
              return (
                <View key={key}>
                  {this.state.checkedTerms == key ? (
                    <TouchableOpacity activeOpacity={1} style={styles.btn}>
                      <Image
                        style={styles.imgTerms}
                        source={require('../../assets/Image/checked.png')}
                      />
                      <Text
                        style={{
                          marginLeft: wp('1.5%'),
                          fontSize: responsiveScreenFontSize(1.7),
                        }}>
 I've read and agree with <Text onPress={()=>this._toggleTermsPopup()}  style={{color:'#2B4D76',textDecorationLine:'underline'}}>Terms of Service</Text> & <Text onPress={()=>this._togglePrivacyPopup()} style={{color:'#2B4D76',textDecorationLine:'underline'}}>Privacy Policy</Text> 
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() => {
                        this.radiochkTerms(key, data);
                      }}
                      style={styles.btn}>
                      <Image
                        style={styles.imgTerms}
                        source={require('../../assets/Image/uncheck.png')}
                      />
                      <Text
                        style={{
                          marginLeft: wp('1.5%'),
                          fontSize: responsiveScreenFontSize(1.7),
                        }}>
                        I've read and agree with <Text onPress={()=>this._toggleTermsPopup()}  style={{color:'#2B4D76',textDecorationLine:'underline'}}>Terms of Service</Text> & <Text onPress={()=>this._togglePrivacyPopup()} style={{color:'#2B4D76',textDecorationLine:'underline'}}>Privacy Policy</Text> 
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              );
            })}
          </View>
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={this.handleRegisterPress}>
            {/* <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: wp('100%'),
              }}> */}
              <Text style={styles.buttonTextStyle}>SignUp</Text>
              {/* <Image
                source={require('../../assets/Image/Next.png')}
                resizeMode="contain"
                style={{height: hp('2%'), marginTop: hp('1%')}}
              /> */}
            {/* </View> */}
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 10,
              paddingHorizontal: 20,
            }}>
            <Text>Already have an account?</Text>
            <Text
              style={{
                fontWeight: 'bold',
                color: AppColors.colorRed,
                paddingHorizontal: 5,
              }}
              onPress={() => this.props.navigation.navigate('LoginScreen')}>
              Sign in
            </Text>
          </View>
        </View>
        </View>
        <TermPopup isVisible={this.state.isTermsPopupVisible} close={this._toggleTermsPopup} />
        <PrivacyPopup isVisible={this.state.isPrivacyPopupVisible} close={this._togglePrivacyPopup}/>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  checkbox: {
    alignSelf: 'center',
  },
  formTextStyle: {
    width:wp("45%"),
    marginTop:20,
    marginHorizontal:wp("1%"),
    color:AppColors.colorBlueDark,
    fontWeight:"bold"
  },
  buttonStyle: {
    backgroundColor: AppColors.colorPrimary,
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#FFAD36',
    height: hp('6%'),
    borderRadius: 10,
    marginTop: hp('4%'),
    textAlignVertical: 'center',
    justifyContent: 'center',
    marginLeft: wp('2%'),
    marginRight: wp('2%'),
  },
  buttonStyledisable: {
    backgroundColor: '#CEA873',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#CEA873',
    height: hp('7%'),
    borderRadius: 10,
    marginTop: hp('4%'),
    textAlignVertical: 'center',
    justifyContent: 'center',
    marginLeft: wp('2%'),
    marginRight: wp('2%'),
  },
  buttonTextStyle: {
    color: 'white',
    textAlignVertical: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: hp('2.1%'),
  },
  inputStyle: {
    height: hp('7%'),
    width: wp('45%'),
    color: '#000',
    paddingHorizontal: 12,
    fontSize: hp('2%'),
  },
  img: {
    height: 20,
    width: 20,
    alignSelf: 'center',
    marginLeft: wp('1%'),
  },
  imgiocn: {
    height: 20,
    width: 20,
    alignSelf: 'center',
  },
  imgTerms: {
    height: 20,
    width: 20,
    alignSelf: 'center',
  },
  btn: {
    flexDirection: 'row',
    marginLeft: wp('4%'),
    //marginBottom:wp('4%')
  },
  btn1: {
    flexDirection: 'row',
    marginLeft: wp('3%'),
  },

  itemSeparatorStyle: {
    height: 1,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#D3D3D3',
  },
  searchBarContainerStyle: {
    marginBottom: 10,
    flexDirection: 'row',
    height: 40,
    shadowOpacity: 1.0,
    shadowRadius: 5,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    backgroundColor: 'rgba(255,255,255,1)',
    shadowColor: '#d3d3d3',
    borderRadius: 10,
    elevation: 3,
    marginLeft: 10,
    marginRight: 10,
  },

  selectLabelTextStyle: {
    color: '#000',
    textAlign: 'left',
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
    paddingHorizontal: 8,
    width: wp('35%'),
    fontSize: hp('2%'),
  },
  placeHolderTextStyle: {
    color: '#3D3D3D',
    paddingHorizontal: 8,
    width: wp('35%'),
    fontSize: hp('2%'),
  },
  dropDownImageStyle: {
    alignSelf: 'center',
    width: wp('4%'),
    height: hp('4%'),
  },
  listTextViewStyle: {
    color: '#000',
    marginTop: 10,
    marginBottom: 10,
    flex: 0.9,
    marginLeft: 20,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'left',
    fontSize: hp('2%'),
  },
  pickerStyle: {
    flexDirection: 'row',
    height: hp('7%'),
    width: wp('45%'),
    color: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

