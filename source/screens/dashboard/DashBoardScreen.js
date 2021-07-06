import React,{ useState,useEffect, useRef} from 'react';
//Import all required component
import {
  View,
  Text,
  StatusBar,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
  ImageBackground,
  Dimensions
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ProgressReport from './ProgressReport';
import DetailedReport from './DetailedReport';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import color from '../../../source/utilities/AppColor';
import AppImages from "../../assets/Image"
import style from '../../../source/commonStyles/CssStyle';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Label, {Orientation} from 'react-native-label';
import CardView from 'react-native-cardview';
import CustomePicker from '../dashboard/Component/CustomePicker';
import {connect} from "react-redux"
import AsyncStorage from '@react-native-community/async-storage';
import HeaderComponent from '../../commonComponents/headerComponent'
import { SafeAreaView } from 'react-native';
import Loader from '../../commonComponents/loader';
import normalize  from '../../utilities/UtilityMethods';
import APICaller from '../../utilities/apiCaller';
import * as userActions from '../../redux/actions/user'
import PickerComponent from "../../commonComponents/pickerComponent"
// import color from '../../../utilities/AppColor';


const DashBoardScreen = ({dispatch,userSubscriptionDetails,userData,navigation,ListOfStudent}) => {
  // console.log(userData,"line 41 user user")

//  console.log(userSubscriptionDetails,"Sss",">>>>>>",subscribedSubjects)
  const [selectStudent,setSelectedStudent] = useState("Select Student")
  const [isLoading,setIsLoading] = useState(true);
  const [isUserParent,setIsUserParent] = useState(false)
  const studentPicker = useRef()

  // const DownloadInvoice = async() => {
  //   const token = await AsyncStorage.getItem('userToken')
  //   APICaller("dwnPdInv",undefined, 'GET', token)
  //   .then(response =>{
  //     console.log(response,"3")
  //   })
  //   .catch(err=>{
  //     console.log(err)
  //   })
  // }
  const Percentage = async () => {
    if(userData.user_type === 1){
      setIsLoading(true);
    const token = await AsyncStorage.getItem('userToken');
    console.log(token,"t")
    APICaller('dashboard', undefined, 'GET', token)
    .then(response=>{
      const {data} = response
      console.log(data,"From db")
      const Data = data.data.subjects
      Data.unshift({id:0,name:"All Subjects"})
      // console.log(Data,"data o data")
      if(data.code === 200 && data.status === "OK"){
        dispatch(userActions.getSubscriptionData(data))
        dispatch(userActions.setSubscribedSubject(Data))
        // console.log("fir idhr aaya")
      }
      
      setIsLoading(false);
      getCourseMonthDetails()
    })
    .catch(err=>console.log(err))
    }
  }
  // console.log("selectStudent",selectStudent.length)
  const studentProgress = async (studentId) => {
    setIsLoading(true);
    const token = await AsyncStorage.getItem('userToken')
    console.log(token,"t")
    APICaller(`student_graph/${studentId}`, undefined, 'GET', token)
    .then(({data})=>{
      console.log(data.data,"dddd")
      const Data = data.data.subjects
      Data.unshift({id:0,name:"All Subjects"})
      // console.log(Data,"data o data")
      if(data.code === 200 && data.status === "OK"){
        dispatch(userActions.getSubscriptionData(data))
        dispatch(userActions.setSubscribedSubject(Data))
        // console.log("fir idhr aaya")
      }
      
      setIsLoading(false);
      getCourseMonthDetails()
    })
    .catch(err => {
      console.log(err)
    })
  }

  const getCourseMonthDetails = async () => {
    setIsLoading(true);
    const token = await AsyncStorage.getItem('userToken');
    // console.log(token,"token")
    APICaller("student_schedule",undefined, 'GET',token)
    .then(response =>{
      // console.log(response.data,"response from dashboard screen line 104")
      setIsLoading(false)
      const {months} = response.data.data
      const Months = months
      if(response.data.response === 'success'){
        Months.unshift({id:0,month_name:"All Months"})
        // console.log(Months,"m")
        months.forEach(month =>{
          const data = delete month.year
          // console.log(data,"data 85")
        })
        // console.log(months,"after removing")
        dispatch(userActions.setSubscribedMonth(Months))
      }
      
     
    })
    .catch(err =>{
      alert("Something went wrong")
      // console.log(err,"line 122 dbs")
    })
  }

  
 
  const checkCurrentUser = async () => {
       const token = await AsyncStorage.getItem('userToken')
        if(userData.user_type === 2){
          setIsUserParent(true)
            APICaller("students",undefined, 'GET', token)
            .then(({data})=>{
              if(data.data.length == 0) {
                navigation.navigate("AddChildren")
              }
              else{
                dispatch(userActions.setStudentList(data.data))
                dispatch(userActions.setSelectedStudentId(data.data[0].id))
                studentProgress(data.data[0].id)
                setSelectedStudent(data.data[0].user_firstname)
                // console.log(data.data,"dude")
              }
            })
            .catch(err=>{
              console.log(err,"line 148 dashboard")
            })
        }
        else{
          setIsUserParent(false)
          // add percentage function
        }

        
    }

  

  useEffect(()=>{
    checkCurrentUser()
    Percentage()
    //SDownloadInvoice()
  },[])
  return(
    <>
    <Loader loading={isLoading}/>
    <SafeAreaView>
    <HeaderComponent />
    <View
      style={{
        
        marginTop: hp('2%'),
        flexDirection: 'row',
            // justifyContent: 'space-around',
        marginLeft: wp('2%'),
        //marginRight: wp('2%') 
      }}>
    <View>
      <ImageBackground
        source={require('../../assets/Image/surge_bg.png')} 
        style={{
          marginHorizontal:wp("5%"),
          width: wp("50%"), 
          height: hp("7%"),
        }}
        resizeMode="contain"
      >
        {
          userSubscriptionDetails != "" ?
          <Text style={{
            color:"white",
            fontWeight:"bold",
            fontSize: hp("2.5%"),
            letterSpacing:0.3,
            position:"absolute",
            //bottom:hp("1%"),
            // textAlign:"center",
            //bottom:hp("82%"),
            //alignItems:"center",
            //flexDirection:"row",
            marginVertical:hp("1%"),
            //marginLeft:wp("10%"),
            alignSelf:"center"
            }}>{userSubscriptionDetails.data.course_name}</Text>
          :
            null
        } 
      </ImageBackground>
    </View>
      <View>
        {
          isUserParent ?
          <TouchableOpacity style={{width:selectStudent.length>8?wp("38%"):wp("30%"),borderWidth:1,borderRadius:10,borderColor:"black",right:selectStudent.length>8?wp("3%"):wp("1%")}} onPress={()=> studentPicker.current.open()}>
                  <View style={{flexDirection: 'row',justifyContent: "space-between"}}>
                  <Text style={{padding:10,fontSize:hp("2.3%")}}>{selectStudent}</Text>
                  <Image source={AppImages.arrowDown} style={{width:20,height:20,top:hp("1.8%"),right:wp("2%")}}/>
                  </View>
                </TouchableOpacity>
          :
          null
        }
      </View>
    </View>
      <PickerComponent 
        data={ListOfStudent}
        ref={studentPicker}
        title={"Select Student"}
        labelExtractor={(item)=>{
          // console.log(item,"wine")
          return item.user_firstname
        }}
        selectedValue={selectStudent}
        onChangeItem={(item)=>{
        dispatch(userActions.setSelectedStudentId(item.id))
        setSelectedStudent(item.user_firstname)
        studentProgress(item.id)
       
      }}/>
    </SafeAreaView>
    <AppContainer/>
    
    </>
  )
}

const TabScreen = createMaterialTopTabNavigator(
  {
    ProgressReport: {
      screen: ProgressReport,
      navigationOptions: {
        tabBarLabel: 'Progress Report',
      },
    },
    DetailedReport: {
      screen: DetailedReport,
      navigationOptions: {
        tabBarLabel: 'Detailed Overview',
      },
    },
  },
  {
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: false,
    tabBarOptions: {
      upperCaseLabel: false,
      activeTintColor:  color.colorBlueDark,
      inactiveTintColor: '#D5DDE5',
      style: {
        backgroundColor: 'transparent',
        textTransform: 'none',   
        width: wp('100%'),
        marginLeft: wp('2%'),
        //marginBottom:"10%"
        // alignSelf:'flex-start'
        // alignItems: 'center',
        // alignItems: 'flex-start'
        // flex: 1, 
        // justifyContent: 'center', 
        // alignItems: 'left'
        // paddingLeft: '5%',
        // paddingRight: '5%'
        // marginLeft: '5%',
        // marginRight: '5%',
        // marginLeft: 10,
        // marginRight: 10,      
      },
      // tabStyle: {
      //   // here you can set the tab width , in this case , 3 tabs , width / 3
      //   width: (Dimensions.get('window').width)  / 2,
      //   bottom: hp("3%"),
      //   //position: 'absolute',
      //   // justifyContent: 'center',
      //   // alignItems: 'center',
      //   // alignSelf: 'center',
      // },
      labelStyle: {
        textAlign: 'center',
        fontSize: 17,
        // width: (Dimensions.get('window').width)  / 2,
        // width: wp('100%'),
        fontWeight: 'bold',
        textTransform: 'none',
        // right: '5%',
        // left: '5%',        
        // justifyContent: 'center',
        // alignItems: 'flex-start'
        // marginLeft: '5%',
        // marginRight: '5%',
        // paddingLeft: '1%',
        // paddingRight: '5%'
      },
      
      indicatorStyle: {      
        borderBottomColor: 'red',
        borderBottomWidth: 4,        
        // width: wp('50%'),
        width: 150,
        // justifyContent:'center',
        // paddingLeft: '5%',
        // paddingRight: '5%'
        left: '5%'
        // left: (Dimensions.get('window').width / 2 - wp('50%')) / 2 ,   
        // right: (Dimensions.get('window').width / 2 - wp('50%')) / 2 ,   
        // right: '5%'   
        // marginLeft: '5%',
        // marginRight: '5%',
        // right: -10,
        
      },
    },
  },
);

//making a StackNavigator to export as default
const DashBoard = createStackNavigator({
  TabScreen: {
    screen: TabScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
});
const styles = StyleSheet.create({
  pickerBackgroundStyle: {
    backgroundColor: color.colorPrimary,
    borderWidth: 2,
    color: color.colorWhite,
    borderColor: color.colorPrimary,
    height: hp('7%'),
    // width:  hp('25%'),
    borderRadius: 14,
    flex: 1,
    textAlignVertical: 'center',
    justifyContent: 'center',
    marginLeft: wp('2%'),
    marginRight: wp('2%'),
    paddingLeft: wp('.5%'),
    paddingRight: wp('.5%'),
  },
  imageBackgroundStyle: {
    // backgroundColor: color.colorPrimary,
    borderWidth: 2,
    color: color.colorWhite,
    // borderColor: color.colorPrimary,
    height: hp('7%'),
    width: hp('25%'),
    // borderRadius: 14,
    // textAlignVertical: 'center',
    // justifyContent: 'center',
    marginLeft: wp('2%'),
    marginRight: wp('2%'),
    paddingLeft: wp('.5%'),
    paddingRight: wp('.5%'),
  },
});

const mapStateToProps = (state) => ({
    
    userData: state.UserReducer.userData,
    subscribeStatus:state.UserReducer.subscribeStatus,
    isFreeTrialEnabled:state.UserReducer.isFreeTrialEnabled,
    userSubscriptionDetails:state.UserReducer.userSubscriptionDetails,
    subscribedSubjects : state.UserReducer.subscribedSubjects,
    ListOfStudent : state.UserReducer.ListOfStudent
})
export default connect(mapStateToProps)(DashBoardScreen)
const AppContainer = createAppContainer(DashBoard);
