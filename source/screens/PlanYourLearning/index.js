import React, { useEffect, useRef, useState } from 'react';
import {View,Text,SafeAreaView,ImageBackground,TouchableOpacity,  Image, StyleSheet, ScrollView, LayoutAnimation, Alert} from 'react-native';
import commonStyling from '../../commonStyles/CssStyle'
import HeaderComponent from '../../commonComponents/headerComponent';
import AppImages from '../../assets/Image'
import normalize from '../../utilities/UtilityMethods';
import color from '../../utilities/AppColor';
import Loader from '../../commonComponents/loader';
import APICaller from '../../utilities/apiCaller';
import ModalSelector from 'react-native-modal-selector';
import {connect} from 'react-redux'
import * as PlanningAction from '../../redux/actions/Planning'
import AsyncStorage from '@react-native-community/async-storage'
import SearchBoxComponent from '../../commonComponents/SearchBoxComponent';
import QuoteComponent from '../../commonComponents/quoteComponent';
import RNPicker from 'rn-modal-picker';
import CardView from 'react-native-cardview';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import PickerComponent from '../../commonComponents/pickerComponent'
import {getSubscription} from '../../services/Subscription';
import * as userActions from '../../redux/actions/user'
const PlanYourLearningScreen =(props)=>{

    const [isLoading,setIsLoading]  = useState(true);
    const [showPicker,setShowPicker] = useState(true);
    const [subjects,setSubjects] = useState([])
    const [months,setMonths] = useState([]);
    const [showMonthsPicker,setShowMonthsPicker] = useState(false);
    const [showSubjectPicker,setShowSubjectPicker] = useState(false);
    const [selectedMonth,setSelectedMonth] = useState("");
    const [selectedSujbect,setSelectedSubject] = useState("")
    const subjectPicker =useRef();
    const monthPikcer = useRef()
    const [suggestionData,setSuggestionData] = useState([]);
    const [showSearchLoading,setSearchLoading] = useState(false)
    const [quote,setQuote] = useState("")
   
    useEffect(()=>{
        setIsLoading(true)
        console.log('use effect')
        props.dispatch(PlanningAction.setSelectedSubject({}))
        props.dispatch(PlanningAction.setSelectedMonth({}))
        callStudentSchedule()
        getQoute();
        (async()=>{
            console.log('caled')
           const res =  await getSubscription();
           console.log('res',res)
           if(res.response == 'success'){
            console.log('response from sub',res)
            const {data} = res
            if(data[0].payment_status == null){
                props.dispatch(userActions.isFreeTrialSubscribed(true))
            }else {
                props.dispatch(userActions.isFreeTrialSubscribed(false))
            }
           }
     
        })()
    },[])
    const callStudentSchedule= async ()=>{
        setIsLoading(true)
        const token = await AsyncStorage.getItem('userToken');
        APICaller('student_schedule',undefined,'GET',token).then(response=>{
            console.log('response fron api=>>',response.data)
            const {data} = response.data;
            const {months,subjects} = data;
            setMonths(months);
            setSubjects(subjects);
            setIsLoading(false)
        }).catch(err=>{
            console.log('error ',err)
            alert("Something went wrong, please try again")
            setIsLoading(false)

        })
    }
    
    const hanldeNextAction = ()=>{
        console.log('props=>>',props)
        if(!props.selectedMonth.hasOwnProperty('id')){
            alert("Please select month")
        }else if(!props.selecetedSubject.hasOwnProperty('id')){
            alert("Please select subject")
        }else {
            navigateToNext()
        }
    }

    const navigateToNext = ()=>{
        props.navigation.navigate('ChapterDetails',{
            month:selectedMonth,
            subject:selectedSujbect
        })
    }

    const SearchChapter = async (keyword)=>{
        setSearchLoading(true)
        console.log('keyword',keyword)
        const body = {
            search:keyword
        }
        const token = await AsyncStorage.getItem('userToken');
    
            APICaller('chapter_search',body,'POST',token).then(response =>{
                // console.log('response from server=>>>>',response)
                if(response.status == 200){
                    //console.log('response=>>',response.data)
                    const {response:responseMessage} = response.data
                     setSearchLoading(false)
                    if(responseMessage == "success"){
                        
                    const {data} = response.data;
                   
                        setSuggestionData(data)
                    }else {
                     setSearchLoading(false)

                    Alert.alert("Something went wrong, Please try again")

                    }
                }else {
                    setSearchLoading(false)

                    Alert.alert("Something went wrong, Please try again")
                }
            })
    }

    const onItemPress =(item)=>{
        console.log('item selected=>>',item)
        props.dispatch(PlanningAction.setSelectedChapter(item));

        props.navigation.navigate('ChapterDetails',{
            searchResult:true
        })

    }

    const handleSearch= (keyWord)=>{
        if(keyWord){
            setTimeout(()=>SearchChapter(keyWord),1000)
        }else {
            setSuggestionData([])
        }
    }

    const getQoute = async () => {
        setIsLoading(true)
        const token = await AsyncStorage.getItem('userToken');
        APICaller("getQuote",undefined,"GET",token).then((response) =>{
            setIsLoading(false)
            const {data} = response
            setQuote(data.data)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return  <View style={[commonStyling.flexOne,{backgroundColor:color.colorLightGrey}]}>
                <SafeAreaView style={commonStyling.safeAreaContainer}/>
                <HeaderComponent />
                {/* Top banner  */}
                <ScrollView nestedScrollEnabled={true} style={{flex:1,backgroundColor:'#fff',paddingBottom:normalize(17)}}>
                <View style={styles.topBannerConatiner}>
                        {/* <Image source={AppImages.topBackground} style={styles.topBannerImageStyle}/> */}
                        <View style={{flexDirection:'row'}}>
                            <View style={commonStyling.screenTitleContainer}>
                            <Text style={commonStyling.screenTitleStyle}>Plan your Learning</Text>
                            </View>
                        </View>
                        {/* Search bar */}
                        <View style={styles.searchBarContainer}>
                            
                            <SearchBoxComponent 
                                showSuggestion={true}   
                                suggestionData={suggestionData}
                                onChangeText={handleSearch} 
                                onItemPress={onItemPress}
                                showLoading={showSearchLoading}
                                />
                        </View>
                </View>
                {/* Qoute Container */}
                {
                    suggestionData.length === 0 ?
                    <View style={styles.quotesContainer}>
                        <QuoteComponent quoteText={quote}/>
                    </View>
                    :
                    null
                }
               
                <View style={styles.optionBoxContainer}>
                    <View style={commonStyling.flexOne}>
                        <Text style={styles.optionTitleStyle}>Select Month</Text>
                    </View>
                    <TouchableOpacity style={commonStyling.flexOne} onPress={()=>{
                        monthPikcer.current.open()
                    }}>
                        <View style={styles.optionBoxStyle}>
                        <View><Text>{props.selectedMonth && props.selectedMonth.month_name ? props.selectedMonth.month_name :"Select" }</Text></View>
                                <Image source={AppImages.arrowDown} style={styles.arrowDownStyle}/>
                            </View>
                    </TouchableOpacity>
                </View>
                
                <View style={styles.optionBoxContainer}>
                    <View style={commonStyling.flexOne}>
                        <Text style={styles.optionTitleStyle}>Select Subjects</Text>
                    </View>
                    <TouchableOpacity style={commonStyling.flexOne} onPress={()=>{
                        // console.log('ref of subject',subjectPicker)
                        subjectPicker.current.open()
                    }}>
                        <View style={styles.optionBoxStyle}>
                                <View><Text>{props.selecetedSubject && props.selecetedSubject.subject_name ? props.selecetedSubject.subject_name : "Select"}</Text></View>
                                <Image source={AppImages.arrowDown} style={styles.arrowDownStyle}/>
                            </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.bottomButtonContainer}>
                <TouchableOpacity style={styles.bottomButtonStyle} onPress={()=>{
                    // props.navigation.navigate('ChapterDetails')
                    hanldeNextAction()
                }}>
                    <Text style={styles.bottomButtonTextStyle}>Next</Text>
                </TouchableOpacity>
                </View>
                </ScrollView>
                <Loader loading={isLoading}/>
                {/* <ModalSelector
                    data={months}
                    ref={monthPikcer}
                    visible={showMonthsPicker}
                    optionContainerStyle={{
                        backgroundColor:'white',

                    }}
                    cancelContainerStyle={{
                        borderRadius:10,
                        opacity:1
                    }}
                    initValue="Select Month"
                    labelExtractor={(label)=>{
                        return label.month_name
                    }}
                    selectedItemTextStyle={{
                        color:'red'
                    }}
                    onChange={(item)=>{
                        setShowMonthsPicker(false);
                        setSelectedMonth(item)
                        props.dispatch(PlanningAction.setSelectedMonth(item))
                    }}
                    customSelector={<View></View>}
                /> */}

                {/* <ModalSelector
                    data={subjects}
                    ref={subjectPicker}
                    // visible={showSubjectPicker}
                    optionContainerStyle={{
                        backgroundColor:'white',

                    }}
                    cancelContainerStyle={{
                        borderRadius:10,
                        opacity:1
                    }}
                    initValue="Select Subjects"
                    labelExtractor={(label)=>{
                        return label.subject_name
                    }}
                    selectedItemTextStyle={{
                        color:'red'
                    }}
                    onChange={(item)=>{
                        setShowSubjectPicker(false);
                        props.dispatch(PlanningAction.setSelectedSubject(item))
                        setSelectedSubject(item)
                    }}
                    customSelector={<View></View>}
                /> */}




                <PickerComponent 
                    data={subjects}
                    ref={subjectPicker}
                    title={"Subject"}
                    labelExtractor={(item)=>{
                        return item.subject_name
                    }}
                    selectedValue={selectedSujbect}
                    onChangeItem={(item)=>{
                        setShowSubjectPicker(false);
                        props.dispatch(PlanningAction.setSelectedSubject(item))
                        setSelectedSubject(item)
                    }}
                    />

                  <PickerComponent 
                    data={months}
                    ref={monthPikcer}
                    title={"Month"}
                    labelExtractor={(item)=>{
                        return item.month_name
                    }}
                    selectedValue={selectedMonth}
                    onChangeItem={(item)=>{
                        setShowMonthsPicker(false);
                        setSelectedMonth(item)
                        props.dispatch(PlanningAction.setSelectedMonth(item))
                    }}
                    />
            </View>
}

const mapStateToProps = state=>({
    selectedMonth:state.PlanningReducer.selectedMonth,
    selecetedSubject:state.PlanningReducer.selectedSubject,
})

export default connect(mapStateToProps)(PlanYourLearningScreen);

const styles = StyleSheet.create({
    topBannerConatiner:{
        height:normalize(142.5),
        backgroundColor:color.colorPrimary,
        borderBottomLeftRadius:normalize(40),
        borderBottomRightRadius:normalize(40),
        zIndex:1
    },
    topBannerImageStyle:{
        height:'100%',
        width:'100%',
        resizeMode:'contain',
        position:'absolute',
        top:-(normalize(4))
    },
    searchBarContainer:{
        marginTop:normalize(16),
        marginHorizontal:normalize(30),    
    },
    quotesContainer:{
        marginHorizontal:normalize(30),
        marginTop:normalize(8),
    },

    optionBoxContainer:{
        flex:1,
        marginTop:normalize(34), 
        marginHorizontal:normalize(30)
    },
    optionTitleStyle:{
        fontFamily:'Sora-Bold',
        fontSize:normalize(14.5),
        color:color.colorBlueDark,
    },
    optionBoxStyle:{
        flexDirection:'row',
        height:normalize(48),
        backgroundColor: '#F2F3F8',
        width:'100%',
        borderRadius:normalize(14),
        marginTop:normalize(15),
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:normalize(13)
    },
    arrowDownStyle:{
        height:normalize(15),
        width:normalize(15)
    },
    bottomButtonContainer:{
        flex:1, 
        marginHorizontal:normalize(30),
        marginTop:normalize(38),
        marginBottom:normalize(17)
    },
    bottomButtonStyle:{
        height:normalize(49),
        width:'100%',
        backgroundColor:color.colorPrimary,
        borderRadius:normalize(15.2),
        justifyContent:'center',
        alignItems:'center'
    },
    bottomButtonTextStyle:{
        fontSize:normalize(16),
        color:color.colorBlueDark,
        fontWeight:'bold'
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
})