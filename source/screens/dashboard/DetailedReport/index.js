import React, { useState, useEffect, useRef } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  View,
  Text,
  SafeAreaView,
  Image
} from 'react-native';
import RNPicker from 'rn-modal-picker';
import CardView from 'react-native-cardview';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import color from '../../../utilities/AppColor';
// import Loader from '../../../../Screen/Components/loader';
import Loader from '../../../commonComponents/loader';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import AppImages from "../../../assets/Image"
import HorizontalBarGraph from '@chartiful/react-native-horizontal-bar-graph';
import APICaller from '../../../utilities/apiCaller';
import normalize from '../../../utilities/UtilityMethods'
import { ProgressBar, Colors } from 'react-native-paper';
import CustomeChapterBox from '../Component/CustomeChapterBox';
import CustomeCompletedBox from '../Component/CustomeCompletedBox';
import CustomePicker from '../Component/CustomePicker';
import { connect } from "react-redux"
import PickerComponent from "../../../commonComponents/pickerComponent"
const DetailedReport = ({ userSubscriptionDetails, subscribedSubjects, subscribedMonths, userData,StudentId }) => {
//  console.log(StudentId,"StudentId")

  const [selectMonth, setSelectedMonth] = useState("All Months")
  const [selectSubject, setSelectedSubject] = useState("All Subject")

  const [MonthId, setMonthId] = useState(0)
  const [SubjectId, setSubjectId] = useState(0)



  const [ShowMonthPicker, setShowMonthPicker] = useState(false)
  const [Toggle, setToggle] = useState(false)
  const monthPikcer = useRef()
  const subjectPicker = useRef()
  const [Loading, setLoading] = useState(true)
  const [DataOverview, setDataOverview] = useState("")
  const [ChapterwiseData, setChapterwiseData] = useState([])
  const [ChapterwiseStatus, setChaperwiseStatus] = useState(false)

  
  // const subjectCheck = (index,item) => {
  //   setSelectedSubject(item.name)
  //   getSubjectWiseDetail(item.id)
  //   setSubjectId(item.id)
  //   getMonthWiseDetail()
  // }

  const getMonthWiseDetail = async (MonthId, SubjectId) => {
    const token = await AsyncStorage.getItem('userToken')
    if(userData.user_type === 1){

    //console.log(MonthId, SubjectId,"ss")
    // if (MonthId > 0 && SubjectId > 0) {
      
      setLoading(true)
      APICaller(`dashboard_chapters/${SubjectId}/${MonthId}`, undefined, 'GET', token)
        .then(response => {
          const { data } = response.data
          console.log(data, "response line 68")
          setDataOverview(data.overview)
          if (data.chapterwise.length > 0) {
            setChapterwiseData(data.chapterwise)
            setChaperwiseStatus(true)
          }

          setLoading(false)
        })
        .catch(err => {
          console.log(err)
          alert("Something went wrong")
        })
    // }
    } else if(userData.user_type === 2){
      setLoading(true)
      console.log(token,"t")
      APICaller(`dashboard_student_chapters/${StudentId}/${SubjectId}/${MonthId}`, undefined, 'GET', token)
        .then(response => {
          const { data } = response.data
          console.log(data, "response from line 88 detailed report")
          setDataOverview(data.overview)
          if (data.chapterwise.length > 0) {
            setChapterwiseData(data.chapterwise)
            setChaperwiseStatus(true)
          }

          setLoading(false)
        })
        .catch(err => {
          // console.log(err)
          alert("Something went wrong")
        })
    }

  }


  const getOverAllDetails = async () => {
    const token = await AsyncStorage.getItem('userToken')
    if (userData.user_type === 1) {
      setLoading(true)
      
      APICaller('dashboard_chapters', undefined, 'GET', token)
        .then(response => {
          //checkSubscriptionSubjectsDetails()
          setDataOverview(response.data.data.overview)
          setLoading(false)
        })
        .catch(err => {
          // console.log(err, "error")
        })
    }
    else if(userData.user_type === 2){
      console.log(StudentId,"sss")
      if(StudentId>0){
        setLoading(true)
      
      APICaller(`dashboard_student_chapters/${StudentId}`, undefined, 'GET', token)
      .then(response => {
        //checkSubscriptionSubjectsDetails()
        console.log(StudentId,"student id")
        console.log(response.data,"r")
        console.log(response.data.data.overview,"line 126 detailed report screen")
        setDataOverview(response.data.data.overview)
        setLoading(false)
      })
      .catch(err => {
        console.log(err, "error 107")
      })
      }
      
    }

  }


  const getSubjectWiseDetail = async (id) => {
    console.log(id,"i")
    const token = await AsyncStorage.getItem('userToken')
    if(userData.user_type === 1){
      setLoading(true)
    
    APICaller(`dashboard_chapters/${id}`, undefined, 'GET', token)
      .then(response => {
        setLoading(false)
        setDataOverview(response.data.data.overview)

        if (id === 0) {
          setChaperwiseStatus(false)
          setChapterwiseData([])
        }
        if (id > 0) {
          console.log(response.data,"response 1")
          if (response.data.data.chapterwise.length > 0) {

            setChapterwiseData(response.data.data.chapterwise)
            setChaperwiseStatus(true)
          }
          if (response.data.data.chapterwise.length === 0) {
            setChaperwiseStatus(false)
            setChapterwiseData([])
          }
        }

      })
      .catch(err => {
        alert("Something went wrong please try again")
        console.log(err,"error line 176")
      })
    }
  else if(userData.user_type === 2){
    setLoading(true)
    
    APICaller(`dashboard_student_chapters/${StudentId}/${id}`, undefined, 'GET', token)
      .then(response => {
        setLoading(false)
        // console.log(response.data,"line 153 Detailed report screen")
        setDataOverview(response.data.data.overview)

        if (id === 0) {
          setChaperwiseStatus(false)
          setChapterwiseData([])
        }
        if (id > 0) {

          if (response.data.data.chapterwise.length > 0) {

            setChapterwiseData(response.data.data.chapterwise)
            setChaperwiseStatus(true)
          }
          if (response.data.data.chapterwise.length === 0) {
            setChaperwiseStatus(false)
            setChapterwiseData([])
          }
        }

      })
      .catch(err => {
        alert("Something went wrong please try again")
        // console.log(err,"error line 141")
      })
  }
  }




  useEffect(() => {
    getOverAllDetails()
    //checkSubscriptionSubjectsDetails()
  }, [StudentId])
  return (
    <>
      <Loader loading={Loading} />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} >
          <View style={{ flexDirection: 'row', marginHorizontal: wp("2%"), marginTop: hp("2%"), justifyContent: "space-around" }}>
            <View style={styles.pickerBackgroundStyle}>
              <CardView
                cardElevation={2}
                cardMaxElevation={5}
                cornerRadius={10}
                style={{ height: hp('6%'), backgroundColor: color.colorGrayBackground }}>

                <TouchableOpacity style={{ width: wp("43%") }} onPress={() => monthPikcer.current.open()}>
                  <View style={{ flexDirection: 'row', justifyContent: "space-around" }}>
                    <Text style={{ padding: 10, fontSize: 16 }}>{selectMonth}</Text>
                    <Image source={AppImages.arrowDown} style={styles.arrowDownStyle} />
                  </View>
                </TouchableOpacity>
              </CardView>
            </View>
            <View style={styles.pickerBackgroundStyle}>
              <CardView
                cardElevation={2}
                cardMaxElevation={5}
                cornerRadius={10}
                style={{ height: hp('6%'), backgroundColor: color.colorGrayBackground }}>
                <TouchableOpacity style={{ width: wp("43%") }} onPress={() => subjectPicker.current.open()}>
                  <View style={{ flexDirection: 'row', justifyContent: "space-around" }}>
                    <Text style={{ padding: 10, fontSize: 16 }}>{selectSubject}</Text>
                    <Image source={AppImages.arrowDown} style={styles.arrowDownStyle} />
                  </View>
                </TouchableOpacity>
                {/* <CustomePicker title={'Subject'} 
                 data={selectSubject}
                  selectValue={(index, item) =>{
                   
                  subjectCheck(index, item)}} 
                  dataSource={userSubscriptionDetails != "" ? subscribedSubjects : []}
                    >
                      
                    </CustomePicker> */}
              </CardView>
            </View>
          </View>
          <View style={{ marginLeft: wp('3%'), marginRight: wp('3%'), marginTop: hp('2%'), marginBottom: hp('2%') }}>
            <View style={{ backgroundColor: 'white', borderRadius: 10, elevation: 5 }}>
              <View style={{ justifyContent: "space-between", flexDirection: 'row', marginLeft: wp('2%'), marginTop: hp('2%'), marginRight: wp('2%'), }}>
                <CustomeChapterBox total_chapters={userSubscriptionDetails != "" && DataOverview != "" ? DataOverview.total_chapters : 0} bgcolor={color.colorBlue} chapter_text={'Available'}></CustomeChapterBox>
                <CustomeChapterBox total_chapters={userSubscriptionDetails != "" && DataOverview != "" ? DataOverview.completed_chapters : 0} bgcolor={color.colorGreen} chapter_text={'Completed'}></CustomeChapterBox>
                <CustomeChapterBox total_chapters={userSubscriptionDetails != "" && DataOverview != "" ? DataOverview.remaining_chapters : 0} bgcolor={color.colorPrimary} chapter_text={'Remaining'}></CustomeChapterBox>
              </View>
              <View style={{ justifyContent: 'space-around', flexDirection: 'row', marginLeft: wp('2%'), marginVertical: hp('1.5%'), marginRight: wp('2%'), }}>
                <CustomeCompletedBox completed_counter={userSubscriptionDetails != "" && DataOverview != "" ? DataOverview.completed_videos : 0} bgcolor={color.colorPink} label={'Watching Videos'} countbgcolor={'#FFADD2'}></CustomeCompletedBox>
                <CustomeCompletedBox completed_counter={userSubscriptionDetails != "" && DataOverview != "" ? DataOverview.completed_test_papers : 0} bgcolor={color.colorGreenLight} label={'Test Papers'} countbgcolor={'#9EE1BE'}></CustomeCompletedBox>
              </View>
              {
                ChapterwiseStatus ?
                  <TouchableOpacity
                    onPress={() => setToggle(!Toggle)}
                    style={{ backgroundColor: color.colorPrimary, marginHorizontal: 10, borderRadius: 10, marginVertical: 20 }}>
                    <Text style={{ color: "white", fontWeight: 'bold', fontSize: 18, textAlign: "center", padding: 13 }}>Chapter wise status</Text>
                  </TouchableOpacity>
                  :
                  null
              }
            </View>
            {
              Toggle ?
                ChapterwiseData.map(item => {
                  console.log(item,"toggle")
                  return (

                    <View key={item.chapter_id} style={{ width: wp("95%"), backgroundColor: 'white', borderRadius: 10, elevation: 5, marginVertical: hp("3%"), flexDirection: "row", justifyContent: "space-between" }}>

                      <View style={{ width: "40%", alignSelf: "center" }}>
                        <Text style={{ padding: 10, fontSize: hp("2%"), alignSelf: "center" }}>{item.chapter_name}</Text>
                      </View>
                      <View style={{ width: "50%", marginRight: 5, alignSelf: "center" }}>
                        <ProgressBar style={{ backgroundColor: color.colorGrayBackground, height: 13, marginVertical: hp("1%"), marginRight: wp("2%") }} progress={item.completed_videos / item.videos} color={'#FFADD2'} />
                        <ProgressBar style={{ backgroundColor: color.colorGrayBackground, height: 13, marginBottom: hp('2%'), marginRight: wp("2%") }} progress={item.completed_test_papers / item.test_paper} color={'#9EE1BE'} />
                      </View>
                      <View style={{ width: "10%", marginRight: 5, alignSelf: "center",justifyContent:"center",bottom:hp("0.5%") }}>
                        <Text style={{fontSize: hp("2%") }}>{item.videos}</Text>
                        <Text style={{fontSize: hp("2%") }}>{item.test_paper}</Text>
                      </View>
                    </View>

                  )
                })



                :
                null
            }

          </View>
        </ScrollView>
        <PickerComponent
          data={subscribedMonths}
          ref={monthPikcer}
          title={"Select Month"}
          labelExtractor={(item) => {
            
            return item.month_name
          }}
          selectedValue={selectMonth}
          onChangeItem={(item) => {
            
            setShowMonthPicker(false);
            setSelectedMonth(item.month_name)
            setMonthId(item.id)
           
            if (item.id > 0 && SubjectId >= 0) {
              // console.log(item.id,SubjectId,"es")
              getMonthWiseDetail(item.id, SubjectId)
            }
            else{
              // console.log("be")
              getSubjectWiseDetail(SubjectId)
            }
            // getMonthWiseDetail()
          }}
        />
        <PickerComponent
          data={subscribedSubjects}
          ref={subjectPicker}
          title={"Select Month"}
          labelExtractor={(item) => {
            return item.name
          }}
          selectedValue={selectMonth}
          onChangeItem={(item) => {
            setSelectedSubject(item.name)
            
            if (MonthId != 0 && item.id >= 0) {
              getMonthWiseDetail(MonthId, item.id)
            }
            else {
              getSubjectWiseDetail(item.id)
            }

            setSubjectId(item.id)

          }}
        />
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  arrowDownStyle: {
    height: normalize(15),
    width: normalize(15),
    marginTop: normalize(15)
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#EBEDF4',
    padding: 10,
    width: 300,
    marginTop: 16,
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
    paddingRight: wp('.5%')
  },
  countvideoStylepink: {
    backgroundColor: '#FFADD2',
    borderWidth: 1,
    color: color.colorWhite,
    borderColor: '#FFADD2',
    height: hp('5%'),
    width: wp('9%'),
    borderRadius: 5,
    textAlignVertical: 'center',
    justifyContent: 'center',
    marginRight: wp('2%'),
    flex: .5
  },
  countvideoStylegreen: {
    backgroundColor: '#9EE1BE',
    borderWidth: 1,
    color: color.colorWhite,
    borderColor: '#9EE1BE',
    height: hp('5%'),
    width: wp('9%'),
    borderRadius: 5,
    textAlignVertical: 'center',
    justifyContent: 'center',
    marginRight: wp('2%'),
    flex: .5
  },
  buttonTextStyle: {
    color: '#ffffff',
    textAlignVertical: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: hp('2.5%'),
  },
  buttonStyle: {
    backgroundColor: color.colorPrimary,
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: color.colorPrimary,
    height: hp('7%'),
    borderRadius: 10,
    marginTop: hp('2%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp('2%'),
    marginRight: wp('2%'),
    marginBottom: hp('2%'),
  },
  pinktextStyle: {
    marginLeft: wp('3%'),
    color: '#ffffff',
    justifyContent: 'center',
    alignContent: 'center',
    fontSize: hp('1.8%')
  },
  chart: {
    marginBottom: 30,
    padding: 10,
    paddingTop: 20,
    borderRadius: 20,
    width: 375,
    backgroundColor: '#fff'
  }
});

const mapStateToProps = (state) => ({

  userData: state.UserReducer.userData,
  subscribeStatus: state.UserReducer.subscribeStatus,
  isFreeTrialEnabled: state.UserReducer.isFreeTrialEnabled,
  userSubscriptionDetails: state.UserReducer.userSubscriptionDetails,
  subscribedSubjects: state.UserReducer.subscribedSubjects,
  subscribedMonths: state.UserReducer.subscribedMonths,
  StudentId : state.UserReducer.StudentId
})


export default connect(mapStateToProps)(DetailedReport)