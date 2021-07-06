import React from 'react';
import { StyleSheet,View, Text, StatusBar, Image, TouchableOpacity ,SafeAreaView} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CardView from 'react-native-cardview';
import color from '../../../utilities/AppColor';
import appImages from '../../../assets/Image';
import HeaderComponent from "../../../commonComponents/headerComponent"
const Subscription =({navigation}) => {
   
   
    /* eslint-disable */
    return (
      <>
      <SafeAreaView style={{ flex: 1,backgroundColor:"white"}} >        
      <HeaderComponent />
        <View style={{ marginTop: hp('3%'), marginLeft: wp('7%') }}>
          <Text style={{ fontSize: hp('2.5%'), fontWeight: 'bold', color:color.colorBlueDark }}>Link with a child or purchase subscription</Text>
          <View
            style={{borderWidth:2,marginVertical:10,marginRight:wp("10%"),borderColor:color.colorRed}}
          />
        </View>
        <View style={{ marginHorizontal:wp("6.5%"),marginVertical:hp("2%"), flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <CardView
            cardElevation={10}
            cardMaxElevation={5}
            cornerRadius={10}
            shadowColor={'red'}
            style={{ flex: 1, backgroundColor: '#ffffff'}}>
            <View style={{ marginTop: hp('2%'), justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.textblackStyle}>
                If there is an active student account and if you wish to link your account with it,you can</Text>
              {/* <Text style={styles.textblackStyle}>
                account and if you wish to link </Text>
              <Text style={styles.textblackStyle}>
               your account with it,you can</Text> */}
              <TouchableOpacity
                onPress={()=>navigation.navigate("AddChildren")}
              >
              <Text style={{
                color: color.colorDarkBlue,
                marginTop:hp("0.5%"),
                fontSize: hp('2.5%'), fontWeight: 'bold',
                justifyContent: 'center', textAlign: 'center'
              }}>click here</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Image style={{ justifyContent: 'center', alignItems: 'center' }}
                source={appImages.subscription_image}
              />
            </View>
            <View style={{ marginBottom: hp('5%') }}>
              <Text style={[styles.textblackStyle,{fontWeight:"bold"}]}>If there are no active student accounts or subscriptions linked with your account,then select the option below</Text>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                  onPress={()=>{
                    navigation.navigate("StudentDashBoard")
                  }}
                  style={styles.buttonStyle}
                  activeOpacity={0.5}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                    <Text style={styles.buttonTextStyle}>Subscribe Now</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </CardView>
        </View>
      </SafeAreaView>
    </>
    )
  }


  const styles = StyleSheet.create({
    header:{
        height:hp('9%'),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: color.colorPrimary,
        paddingHorizontal: 2,
     },
    styleLogoToolbar: {
      height: hp('14%'),
      width: wp('14%'),
      justifyContent: 'center',
      alignSelf: 'center',
    },
    styleIcHamburger: {
      height: hp('8%'),
      width: wp('8%'),
      justifyContent: 'center',
      alignSelf: 'center',
      //margin:normalize(8)
    },
    textblackStyle:{
      color: color.colorBlueDark,
      textAlign: 'center',
      fontSize: hp('2.5%'),
      marginLeft:wp('10%'),
      marginRight:wp('10%'),
      //lineHeight:hp("3.5%")
    },
    buttonStyle: {
      backgroundColor: '#FF6369',
      borderWidth: 0,
      borderColor: '#FF6369',
      height: hp('7%'),
      borderRadius: 10,
      marginTop: hp('5%'),
      justifyContent: 'center',
      width:hp('25%'),
      alignItems:'center'
  
    },
    buttonTextStyle: {
      color: '#fff',
      textAlignVertical: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      fontWeight: 'bold',
      fontSize: hp('2.5%'),
      
  
    },
});

export default Subscription