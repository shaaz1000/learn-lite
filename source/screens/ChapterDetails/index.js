import React, { useEffect, useRef, useState } from 'react';
import { View, Text, SafeAreaView, ImageBackground, Image, StyleSheet, ScrollView, ImagePropTypes ,TouchableOpacity, Alert} from 'react-native';
import commonStyling from '../../commonStyles/CssStyle'
import HeaderComponent from '../../commonComponents/headerComponent';
import AppImages from '../../assets/Image'
import normalize from '../../utilities/UtilityMethods';
import color, { colorBlueDark } from '../../utilities/AppColor';
import backArrow from '../../assets/Image/backArrow.png'
import upDownArrow from '../../assets/Image/upDownArrow.png';
import pinkBackground from '../../assets/Image/pinkBackground.png';
import videoIcon from '../../assets/Image/videoIcon.png'
import testPaperIcon from '../../assets/Image/testPaperIcon.png';
import tipsTrickIcon from '../../assets/Image/tipsTricksIcon.png';
import refernceIcon from '../../assets/Image/refernceIcon.png';
import {connect} from 'react-redux'
import APICaller from '../../utilities/apiCaller';
import Loader from '../../commonComponents/loader'
import ModalSelector from 'react-native-modal-selector'
import * as PlanningAction from '../../redux/actions/Planning'
import AsyncStorage from '@react-native-community/async-storage'
import LinearGradient from 'react-native-linear-gradient';
import SearchBoxComponent from '../../commonComponents/SearchBoxComponent';
import QuoteComponent from '../../commonComponents/quoteComponent';
import NavigationBarComponent from '../../commonComponents/navigationBarComponent'
import PickerComponent from '../../commonComponents/pickerComponent'
import ChapterDetailsComponent from '../../commonComponents/ChapterDetailsComponent'
// const token = "170|ZaO3DUddvvmxPYmdo1PirtoP4gS7KVaRyepQwiH8";
// const selectedColor=[ '#FF5555','#FA94A2','#FFD4DF']
// const unSelectedColor=['#fff','#fff','#fff']
const ChapterDetails = (props) => {
    
    const [chaptersData,setChaptersData] = useState([])
    const [isLoading,setIsLoading] = useState(true);
    const chapterPicker = useRef()
    const [suggestionData,setSuggestionData] = useState([]);
    const [selectedOption,setSelectedOption] = useState("VideoDetail");
    const [status,setStatus] = useState("Pending");
    const [showSearchLoading,setSearchLoading] = useState(false)
    const [selectChaper,setSelectChapter] = useState({})
    const [quote,setQuote] = useState("")
    useEffect(()=>{

        const {params} = props.navigation.state;
        if(params.searchResult){
            setChaptersData([props.selectedChapter])
            setIsLoading(false)
        }else {
            props.dispatch(PlanningAction.setSelectedChapter({}))
            setChaptersData([]);
            props.navigation.addListener('didFocus',()=>{
                fetchChapters();
            // checkStatus()

            })
      
        }
        getQoute()
        

    },[])

    //Effect to check video complete status initially
    useEffect(()=>{
        checkStatus(props.selectedChapter)
    },[props.selectedChapter])



    useEffect(()=>{
        if(props.selectedChapter)
        updateSelectedChapter()

    },[chaptersData])

    const updateSelectedChapter = ()=>{
        const filteredChapter = chaptersData.filter((item,index)=>{
            if(item.chapter_id == props.selectedChapter.chapter_id){
                return item
            }
        })
        if(filteredChapter.length){
            props.dispatch(PlanningAction.setSelectedChapter(filteredChapter[0]))
            checkStatus(filteredChapter[0])
        }
    }

    const fetchChapters = async()=>{

        const {id:subjectId} = props.selecetedSubject;
        const {id:monthId,year} = props.selectedMonth;
        
        const endPoint = `student_chapters/${subjectId}/${monthId}/${year}`
        const token = await AsyncStorage.getItem('userToken');
        //console.log(subjectId,monthId,year,token,"line 94")
        await APICaller(endPoint,undefined,'GET',token).then(response=>{
            console.log('response=>>',response)
            const {data} = response.data;
            setChaptersData(data);
            setIsLoading(false)
    
        }).catch(erro=>{
            console.log('error form feth',erro)
        })
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
            console.log(err,"from line 112 chapter details")
        })
    }

    const checkStatus = (chapters)=>{
        const {videos,
            test_pappers,
            tips_and_tricks,
            completed_test_pappers,
            completed_videos,
            books_and_references,
        } = chapters

        if(videos == completed_videos && test_pappers == completed_test_pappers){
            setStatus("Completed")
        }else {
            setStatus("Pending")
        }
    }

    const navigateToNext =(path) =>{

            props.navigation.navigate(path)
            // setSelectedOption("VideoDetail")
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
        // console.log('item selected =>>',item)
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

    const {videoIconSvg} = AppImages;
    return <View style={[commonStyling.flexOne, { backgroundColor: color.colorLightGrey }]}>
        <SafeAreaView style={commonStyling.safeAreaContainer} />
        <HeaderComponent />
        {/* Top banner  */}
        <ScrollView style={{ flex: 1, backgroundColor: '#fff', paddingBottom: normalize(17) }}>
            <View style={styles.topBannerConatiner}>
                {/* <Image source={AppImages.topBackground} style={styles.topBannerImageStyle}/> */}
                <View style={{ flexDirection: 'row' }}>
                    <View style={commonStyling.screenTitleContainer}>
                        <Text style={commonStyling.screenTitleStyle}>Chapter Details</Text>
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
            {
                suggestionData.length === 0 ?
                <View style={styles.navigationCardContainer}>
                <ChapterDetailsComponent screemName={"Chapter Details"} {...props}/>
            </View>
            :
            <View style={{marginHorizontal:normalize(30),marginTop:normalize(260)}}>
                <ChapterDetailsComponent screemName={"Chapter Details"} {...props}/>
            </View>
            }
            

            <View style={styles.optionBoxContainer}>
                <View style={commonStyling.flexOne}>
                    <Text style={styles.optionTitleStyle}>Select Chapter</Text>
                </View>
                <View style={commonStyling.flexOne}>
                    <TouchableOpacity style={styles.optionBoxStyle} onPress={()=>{

                        if(chaptersData.length){
                            chapterPicker.current.open();
                        }else {
                            alert("No Chapters Found")
                        }
                    }}>
                        <View>
                            <Text>{props.selectedChapter && props.selectedChapter.chapter_name ?props.selectedChapter.chapter_name :"Select" }</Text>
                        </View>
                        <Image source={AppImages.arrowDown} style={styles.arrowDownStyle} />
                    </TouchableOpacity>
                </View>
            </View>

                {props.selectedChapter && props.selectedChapter.chapter_name?            
                 <View style={styles.chapterDetailContainer}>
                <View style={styles.chapterDetailsCard}>
                    <View style={{ marginTop: normalize(15), marginLeft: normalize(27) }}>
                        <Text style={styles.optionTitleStyle}>{props.selecetedSubject.subject_name}</Text>
                    </View>
                    <View style={{ marginTop: normalize(10), marginLeft: normalize(27) }}>
                        <Text style={{
                            fontSize: normalize(13),
                            fontFamily:'Sora-Regular',
                            color: '#FF0000'
                        }}>Chapter Name : <Text style={{ color: colorBlueDark }}></Text>{props.selectedChapter.chapter_name}</Text>
                    </View>
                    <View style={{ marginTop: normalize(10), marginLeft: normalize(27) }}>
                        <Text style={{
                            fontSize: normalize(13),
                            fontFamily:'Sora-Regular',
                            color: '#FF0000'
                        }}>Status : <Text style={{ color: status == "Completed" ? "green" : "red" }}>{status}</Text></Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: normalize(26),justifyContent:'center',marginBottom:normalize(20) }}>
                        <TouchableOpacity onPress={()=>{
                            // props.navigation.navigate('VideoDetail')
                            // setSelectedOption("VideoDetail")
                            navigateToNext("VideoDetail")


                        }}>
                        <LinearGradient colors={["#FF0095","#FF0095","#FF0095"]}  style={styles.actionButtonStyle}>
                          
                            <Image source={AppImages.videoSelectedIcon} style={{
                                height:normalize(26),
                                width:normalize(31)  }}/>
                            <Text style={styles.actionTitleStyle}>Videos</Text>
                        </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{
                            // props.navigation.navigate('TestPapers')
                            // setSelectedOption("TestPapers")
                            navigateToNext("TestPapers")

                        }}>
                        <LinearGradient colors={["#6545FC","#6545FC","#6545FC"]}  style={styles.actionButtonStyle}>
                          
                            <Image source={AppImages.testPaperSelectedIcon} style={{
                                height:normalize(35),
                                width:normalize(30)  }}/>
                          
                            <Text style={styles.actionTitleStyle}>Test Papers</Text>
                        </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{
                            // props.navigation.navigate('TipsAndTricks')
                            // setSelectedOption("TipsAndTricks")
                            navigateToNext("TipsAndTricks")
                        }}>
                        <LinearGradient colors={["#00905D","#00905D","#00905D"]}  style={styles.actionButtonStyle}>
                         
                            <Image source={AppImages.tipsTrickSelectedIcon} style={{
                                height:normalize(33),
                                width:normalize(28) ,
                                marginBottom:normalize(1.5) }}/>
                            <Text style={styles.actionTitleStyle}>Tips & Tricks</Text>
                        </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{
                            // props.navigation.navigate('RefernceBook')
                            // setSelectedOption("RefernceBook")
                            navigateToNext("RefernceBook")
                        }}>
                        <LinearGradient colors={["#01A8E8","#01A8E8","#01A8E8"]}style={styles.actionButtonStyle}>
                           
                            <Image source={AppImages.refernceSelectedIcon} style={{
                                height:normalize(35),
                                width:normalize(32),
                                marginBottom:-normalize(5)  }}/>
                            <Text style={styles.actionTitleStyle}>Formulae Sheet</Text>
                        </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </View> : null}

            {/* <View style={styles.bottomButtonContainer}>
                <TouchableOpacity style={styles.bottomButtonStyle} onPress={()=>{
                    props.navigation.navigate(selectedOption)
                }}>
                    <Text style={styles.bottomButtonTextStyle}>Next</Text>
                </TouchableOpacity>
            </View> */}
        </ScrollView>
                <Loader loading={isLoading}/>
                {/* <ModalSelector
                    data={chaptersData}
                    ref={chapterPicker}
                    optionContainerStyle={{
                        backgroundColor:'white',

                    }}
                    cancelContainerStyle={{
                        borderRadius:10,
                        opacity:1
                    }}
                    labelExtractor={(label)=>{
                        return label.chapter_name
                    }}
                    selectedItemTextStyle={{
                        color:'red'
                    }}
                    onChange={(item)=>{
                        props.dispatch(PlanningAction.setSelectedChapter(item));
                    }}
                    customSelector={<View></View>}
                /> */}
                <PickerComponent 
                    data={chaptersData}
                    ref={chapterPicker}
                    title={"Chapter"}
                    labelExtractor={(item)=>{
                        return item.chapter_name
                    }}
                    selectedValue={props.selectedChapter}
                    onChangeItem={(item)=>{
                        props.dispatch(PlanningAction.setSelectedChapter(item));
                    }}
                    />

    </View>
}

const mapStateToProps = state=>({
    selectedMonth:state.PlanningReducer.selectedMonth,
    selecetedSubject:state.PlanningReducer.selectedSubject,
    selectedChapter:state.PlanningReducer.selectedChapter,
    userData:state.UserReducer.userData,
    isFreeTrialEnabled:state.UserReducer.isFreeTrialEnabled,
    userReducer:state.UserReducer
})

export default connect(mapStateToProps)(ChapterDetails);

const styles = StyleSheet.create({
    topBannerConatiner: {
        height: normalize(142.5),
        backgroundColor: color.colorPrimary,
        borderBottomLeftRadius: normalize(40),
        borderBottomRightRadius: normalize(40),
    },
    topBannerImageStyle: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
        position: 'absolute',
        top: -(normalize(4))
    },
    searchBarContainer: {
   
        marginTop: normalize(16),
        marginHorizontal: normalize(30),

    },
    quotesContainer: {

        marginHorizontal: normalize(30),
        marginTop: normalize(8),

    },
    leftQuoteIconStyle: {
        height: normalize(33),
        width: normalize(22),
        resizeMode: 'contain'
    },
    quoteTextContainer: {
        flex: 1,
        paddingVertical: normalize(7)
    },
    quoteTextStyle: {
        fontSize: normalize(14),
        color: color.colorBlueDark,
        lineHeight: normalize(21)
    },
    rightQuoteIconStyle: {
        height: normalize(33),
        width: normalize(22),
        resizeMode: 'contain'
    },
    optionBoxContainer: {
        flex: 1,
        marginTop: normalize(34),
        marginHorizontal: normalize(30)
    },
    optionTitleStyle: {
        fontSize: normalize(15.5),
        color: color.colorBlueDark,
        fontWeight: 'bold'
    },
    optionBoxStyle: {
        flexDirection:'row',
        height: normalize(60),
        backgroundColor: '#F2F3F8',
        width: '100%',
        borderRadius: normalize(14),
        marginTop: normalize(15),
        justifyContent: 'space-between',
        alignItems: 'center',
        
        paddingHorizontal: normalize(13)
    },
    arrowDownStyle: {
        height: normalize(15),
        width: normalize(15),
        right:normalize(13)
    },
    bottomButtonContainer: {
        flex: 1,
        marginHorizontal: normalize(30),
        marginTop: normalize(38),
        marginBottom: normalize(17)
    },
    bottomButtonStyle: {
        height: normalize(49),
        width: '100%',
        backgroundColor: color.colorPrimary,
        borderRadius: normalize(15.2),
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomButtonTextStyle: {
        fontSize: normalize(16),
        color: color.colorBlueDark,
        fontWeight: 'bold'
    },
    chapterDetailContainer: {
        marginHorizontal: normalize(30),
        marginTop: normalize(31),
        marginBottom: normalize(40)
    },
    chapterDetailsCard: {
        height: normalize(212),
        backgroundColor: '#F2F3F8',
        borderRadius: normalize(14.5),
        marginBottom: normalize(20)
    },
    navigationCardContainer: {
        marginHorizontal: normalize(30),
        marginTop: normalize(18) 
    },
    actionButtonStyle:{
        height: normalize(75),
        width: normalize(75),
        borderRadius: normalize(12),
        marginLeft: normalize(8.8),
        justifyContent: 'center',
        alignItems: 'center'
    },
    actionTitleStyle:{
        fontSize: normalize(10.5),
        fontFamily:'Sora-Bold',
        color: "#fff",
        textAlign:'center'
    }
})