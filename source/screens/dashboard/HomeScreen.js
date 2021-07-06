                                                                                                                                                    /* This is an Login Registration example from https://aboutreact.com/ */
/* https://aboutreact.com/react-native-login-and-signup/ */

//Import React and Hook we needed
import React, {useState} from 'react';
import CardView from 'react-native-cardview';
//Import all required component
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
  TouchableHighlight,
  KeyboardAvoidingView,
  ImageBackground,
  Platform,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
// import Loader from '../../../../Screen/commonComponents/loader';
import {Avatar} from 'react-native-elements';
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
import color from '../../utilities/AppColor';
import appImages from '../../assets/Image/index';
import {
  unsubscribe,
  getNetwork,
} from '../../utilities/CheckNetwork';
import style from '../../commonStyles/CssStyle';
export default class HomeScreen extends React.Component {
  /**
   * navigation options and header
   */

  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;

    return {
      headerTitle: () => (
        <Image
          source={appImages.app_logo}
          style={style.styleLogoToolbar}
          resizeMode="contain"
        />
      ),
      headerTintColor: color.colorPrimary,
      headerStyle: {
        backgroundColor: color.colorPrimary,
      },
      headerLeft: () => (
        <TouchableOpacity onPress={() => params.handleNavigationMenu()}>
          <Image
            source={appImages.ic_hamburger}
            style={style.styleIcHamburger}
            resizeMode="contain"
          />
          {params.isNavigationMenuShown}
        </TouchableOpacity>
      ),
      headerRight: <View />,
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      userType: 'Parent',
      loading: false,
      setLoading: false,
      platform: '',
      checkNetwork: false,
      isvalidemail: false,
      data: [],
    };
  }

  componentDidMount() {
    /* eslint-disable */
    this.focusListener = navigation.addListener('didFocus', () => {
      this.props.navigation.setParams({
        handleNavigationMenu: this.showNavigationMenu,
      });
    });
    this.checkNetWork();
    this.updateState();
    this.readData();
  }

  showNavigationMenu() {
    alert('show menu');
  }
  async readData() {
    const userData = await AsyncStorage.getItem('UserData');
    console.log(userData,"user data");
    let userDetails = JSON.parse(userData);
    console.log(userDetails);
    if (userDetails !== null) {
      this.setState({data: userDetails});
    }
  }
  // async checkNetWork() {
  //   let checknet = await getNetwork();
  //   this.setState({checkNetwork: checknet});
  // }

  // async updateState() {
  //   let checknet = await unsubscribe();
  //   /* eslint-disable */
  //   this.setState({checkNetwork: checknet});
  // }

  logout = () => {
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
            this.props.navigation.navigate('Auth');
            console.log('logout');
          },
        },
      ],
      {cancelable: false},
    );
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: color.colorWhite}}>
        <View
          style={{
            flex: 1,
            backgroundColor: color.colorGrayTransparent,
            padding: 30,
          }}>
          <TouchableOpacity>
            <Image source={appImages.ic_close} style={style.styleIcClose} />
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              backgroundColor: color.colorWhite,
              borderRadius: 15,
            }}>
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                padding: 15,
              }}>
              <Avatar
                rounded
                size="large"
                source={appImages.ic_avatar_default}
                activeOpacity={0.7}
              />
              <Text style={style.menuUserName}>
                Hello, {this.state.data.firstname} {this.state.data.lastname}
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Image
                source={appImages.ic_menu_bottom_overlay}
                style={style.styleMenuBottomOverlay}
              />
              <ScrollView style={style.styleScrollMenu}>
                {/* Navigate Dashboard */}
                <View
                  style={{
                    paddingVertical: 8,
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                  }}>
                  <Image
                    source={appImages.ic_navigate_dashboard}
                    style={style.styleIcNavigate}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      color: 'black',
                      padding: 10,
                    }}>
                    Dashboard
                  </Text>
                </View>

                {/* Navigate My Profile */}
                <View
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: color.colorPrimary,
                  }}>
                  <Image
                    source={appImages.ic_navigate_dashboard}
                    style={style.styleIcNavigate}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      color: 'black',
                      padding: 10,
                    }}>
                    My Profile
                  </Text>
                </View>

                {/* My Subscription */}
                <View
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                  }}>
                  <Image
                    source={appImages.ic_navigate_my_subscription}
                    style={style.styleIcNavigateSubscription}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      color: 'black',
                      padding: 10,
                    }}>
                    My Subscription
                  </Text>
                </View>

                {/* Planning & Scheduling */}
                <View
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                  }}>
                  <Image
                    source={appImages.ic_navigate_planning_scheduling}
                    style={style.styleIcNavigatePlanning}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      color: 'black',
                      padding: 10,
                    }}>
                    Planning & Scheduling
                  </Text>
                </View>

                {/* Navigate Feedbacks */}
                <View
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                  }}>
                  <Image
                    source={appImages.ic_navigate_feedbacks}
                    style={style.styleIcNavigate}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      color: 'black',
                      padding: 10,
                    }}>
                    Feedbacks
                  </Text>
                </View>

                {/* About Us */}
                <View
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                  }}>
                  <Image
                    source={appImages.ic_navigate_dashboard}
                    style={style.styleIcFeedbacks}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      color: 'black',
                      padding: 10,
                    }}>
                   About Us
                  </Text>
                </View>

                {/* Privacy Policy */}
                <View
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                  }}>
                  <Image
                    source={appImages.ic_navigate_dashboard}
                    style={style.styleIcFeedbacks}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      color: 'black',
                      padding: 10,
                    }}>
                    Privacy Policy
                  </Text>
                </View>
                {/* 5 Pillars of LearnLite */}
                <View
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                  }}>
                  <Image
                    source={appImages.ic_navigate_dashboard}
                    style={style.styleIcFeedbacks}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      color: 'black',
                      padding: 10,
                    }}>
                    5 Pillars of LearnLite
                  </Text>
                </View>
                {/* Navigate Logout */}
                <View
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                  }}>
                  <Image
                    source={appImages.ic_navigate_logout}
                    style={style.styleIcNavigate}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      color: 'black',
                      padding: 10,
                    }}>
                   Logout
                  </Text>
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
      // <View style={{ flex: 1, backgroundColor:'white'}}>
      //   {this.state.data.user_type === 1 ?
      //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      //       <Text >Welcome Student</Text>
      //       <Text >{this.state.data.firstname} {this.state.data.lastname}</Text>
      //     </View>
      //     :
      //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      //       <Text >Welcome Parent</Text>
      //       <Text >{this.state.data.firstname} {this.state.data.lastname}</Text>
      //     </View>
      //   }
      //   <View style={{width:wp('100%'),marginBottom:hp('20%'),justifyContent:'center',alignItems:'center'}}>
      //    <TouchableOpacity
      //       style={styles.buttonStyle}
      //       activeOpacity={0.5}
      //       onPress={this.logout}>
      //       <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: wp('50%') }}>
      //         <Text style={styles.buttonTextStyle}>Logout</Text>
      //         {/* <Image source={require('../Image/Next.png')} resizeMode='contain' style={{ height: hp('2%'), marginTop: hp('1%') }} /> */}
      //       </View>
      //     </TouchableOpacity>
      //     </View>
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    //backgroundColor: '#307ecc',
  },
  SectionStyle: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#F3FAFC',
    // marginTop:hp('2%'),
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonStyle: {
    backgroundColor: '#FFAD36',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#FFAD36',
    height: hp('7%'),
    borderRadius: 10,
    marginTop: hp('7%'),
    textAlignVertical: 'center',
    justifyContent: 'center',
  },
  buttonTextStyle: {
    //backgroundColor:'#000',
    color: '#FF001A',
    textAlignVertical: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    fontWeight: 'bold',
    //fontSize: hp('2.5%'),
  },
  inputStyle: {
    height: hp('7%'),
    flex: 1,
    color: '#000',
    paddingHorizontal: 20,
    //fontSize: hp('2%'),
  },
});
