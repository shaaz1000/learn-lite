import React, { useEffect, useState } from 'react';
import { View, Text,Linking, SafeAreaView, ImageBackground, Image, StyleSheet, ScrollView, TextPropTypes } from 'react-native';
import commonStyling from '../../commonStyles/CssStyle'
import HeaderComponent from '../../commonComponents/headerComponent';
import AppImages from '../../assets/Image'
import normalize from '../../utilities/UtilityMethods';
import color, { colorBlueDark } from '../../utilities/AppColor';
import backArrow from '../../assets/Image/backArrow.png'
import upDownArrow from '../../assets/Image/upDownArrow.png';
import checkCircleIcon from '../../assets/Image/checkCircleIcon.png';
import uncheckCircleIcon from '../../assets/Image/unCheckCircleIcon.png'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Loader from '../../commonComponents/loader'
import ModalSelector from 'react-native-modal-selector'
import * as PlanningAction from '../../redux/actions/Planning';
import { connect } from 'react-redux';
import APICaller from '../../utilities/apiCaller';
const token = "170|ZaO3DUddvvmxPYmdo1PirtoP4gS7KVaRyepQwiH8";
import AsyncStorage from '@react-native-community/async-storage'
import NavigationBarComponent from '../../commonComponents/navigationBarComponent'
import SearchBoxComponent from '../../commonComponents/SearchBoxComponent';
import VideoPlayer from './components/videoPlayer'
import QuoteComponent from "../../commonComponents/quoteComponent"
import { heightPercentageToDP } from 'react-native-responsive-screen';
const VideoDetailScreen = (props) => {
    console.log(props.selectedChapter,"select")
    const [isLoading, setIsLoading] = useState(false);
    const [videoData, setVideoData] = useState([]);
    const [selectedVideo,setSelectedVideo] = useState({})
    const [filteredData,setFilteredData] = useState([])
    const [IsSortAscending ,setIsSortAscending ] = useState(true)
    const [quote,setQuote] = useState("")
    const [showVideo,setShowVideo] = useState(false)
    const [paymentStatus,setPaymentStatus] = useState("")
    const [paymentId,setPaymentId] = useState("")
    // console.log(selectedVideo,"selectedVideo")
    useEffect(() => {
        fetchVideoDetails()
        getQoute()
    }, [])
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
    const fetchVideoDetails = async() => {

        setIsLoading(true)
        const { chapter_id } = props.selectedChapter;
        const token = await AsyncStorage.getItem('userToken');
        console.log(chapter_id,"chapter")
        APICaller(`student_videos/${chapter_id}`, undefined, 'GET', token).then(response => {
            // console.log("response from video=>>>", response.data);
            const { data } = response.data;
            const { videos ,subscription} = data;
            //console.log(subscription,"s")
            setVideoData(videos);
            setFilteredData(videos)
            setPaymentStatus(subscription.payment_status)
            setPaymentId(subscription.payment_id)
            setIsLoading(false)
        })
    }

    //Effect to mark video 
    useEffect(()=>{
        // markVideo()
    },[selectedVideo])

    const markVideo= async(id)=>{
        //console.log(id,"id")
        setIsLoading(true);
        const token = await AsyncStorage.getItem('userToken');
        const body = {
            id
        }
        APICaller('mark_video',body,"POST",token).then(response=>{
           // console.log('response form mark video=>>>',response);
            const {data} = response;    
            if(data.response =="success"){
                fetchVideoDetails()
            }else{
                setIsLoading(false);
                alert('Something went wrong,Please try again')
            }
        })
    }

    const filterVideos = (keyWord)=>{

        const tempFilteredData = videoData.filter((item=>{
           return item.description
          .toUpperCase()
          .startsWith(keyWord.toUpperCase());
        }))
        setFilteredData(tempFilteredData)
    }

    const sortVideos = () =>{
        console.log('sort is called')
        const tempData = [...filteredData];
        const temp = tempData.sort(function(a, b){
            if(a.description < b.description) { 
               if(IsSortAscending){
                   setIsSortAscending(false)
                   return 1;
               }else {
                   setIsSortAscending(true)
                   return -1

               }
             }
            if(a.description > b.description) {
                if(IsSortAscending){
                    setIsSortAscending(false)
                    return -1;

                }else {
                   setIsSortAscending(true)

                    return 1

                }
                 }
            return 0;
        })
        setFilteredData(temp)
    }
    const toggleVideoComponent = ()=>{
        
        setShowVideo(!showVideo)
    }
 
    return <View style={[commonStyling.flexOne, { backgroundColor: color.colorLightGrey }]}>
        <SafeAreaView style={commonStyling.safeAreaContainer} />
        <HeaderComponent />
        {/* Top banner  */}
        <ScrollView style={{ flex: 1, backgroundColor: '#fff', paddingBottom: normalize(20) }}>
            <View style={styles.topBannerConatiner}>
                {/* <Image source={AppImages.topBackground} style={styles.topBannerImageStyle}/> */}
                <View style={{ flexDirection: 'row' }}>
                    <View style={commonStyling.screenTitleContainer}>
                        <Text style={commonStyling.screenTitleStyle}>Videos</Text>
                    </View>
                </View>
                {/* Search bar */}
                <View style={styles.searchBarContainer}>
                    <SearchBoxComponent onChangeText={filterVideos}/>
                </View>
            </View>
            {/* Qoute Container */}
            <View style={styles.quotesContainer}>
            <QuoteComponent quoteText={quote}/>
                {/* <View style={commonStyling.flexOne}>
                    <Image source={AppImages.leftQuoteIcon} style={styles.leftQuoteIconStyle} />
                </View>
                <View style={styles.quoteTextContainer}>
                    <Text style={styles.quoteTextStyle}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's,
                        </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Image source={AppImages.rightQuoteIcon} style={styles.rightQuoteIconStyle} />
                </View> */}

            </View>
            <View style={styles.navigationCardContainer}>
                <NavigationBarComponent {...props} sortAction={sortVideos}/>
            </View>

            <View style={styles.videoCardContainer}>
                {filteredData.length ? filteredData.map((item, index) => {
                    console.log(item,"i")
                    return <View style={[styles.videoCard,{backgroundColor : item.free_trial_version == 0 && paymentStatus === null && paymentId === null ? "#e6ede8" : "white"}]}>
                        <View style={{ flex: 1, marginLeft: normalize(35) }}>
                            {
                                item.free_trial_version == 0 && paymentStatus === null && paymentId === null ?
                                <TouchableOpacity onPress={()=>{
                                    alert("Please buy full subscription to access this content")
                                }}>
                                <Text style={{
                                    marginTop: normalize(15),
                                    fontWeight: '600',
                                    fontSize: normalize(15),
                                    color: 'grey'
                                }}>Video {index + 1}</Text></TouchableOpacity>
                                :
                                <TouchableOpacity onPress={()=>{
                                    setSelectedVideo(item)
                                    toggleVideoComponent()
                                }}>
                                <Text style={{
                                    marginTop: normalize(15),
                                    fontWeight: '600',
                                    fontSize: normalize(15),
                                    color: '#86B1F2'
                                }}>Video {index + 1}</Text></TouchableOpacity>
                            }
                            
                            <Text style={{
                                fontWeight: '400',
                                fontSize: normalize(15),
                                color: '#818181',
                                marginTop: 2
                            }}>Title : {item.description}</Text>
                            <Text style={{
                                fontWeight: '400',
                                fontSize: normalize(15),
                                color: '#818181',
                                marginTop: 2
                            }}>Status : <Text style={{ color: item.completed_status == "A"  ? "green" :"red"}}>{item.completed_status == "A" ? "Completed" : "Pending"}</Text></Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', marginTop: normalize(20), marginLeft: normalize(15) }}>
                            <Text style={{
                                fontWeight: '400',
                                fontSize: normalize(12),
                                color: '#818181',
                            }}>Mark as {item.completed_status == "A" ? "Incompleted" : "Completed"}</Text>

                            {item.completed_status == "A" ? 
                            <TouchableOpacity 
                            disabled={ item.free_trial_version == 0 && paymentStatus === null && paymentId === null ? true : false}
                            onPress={()=>{
                                markVideo(item.id)
                            }}>
                                <Image source={AppImages.checkIcon} style={{
                                    height: normalize(28),
                                    width: normalize(28),
                                    marginTop: normalize(9)
                                }} /></TouchableOpacity>   
                                :
                                <TouchableOpacity 
                                disabled={ item.free_trial_version == 0 && paymentStatus === null && paymentId === null ? true : false}
                                onPress={()=>{
                                    // setSelectedVideo(item)
                                    markVideo(item.id)
                                }}>
                                <Image source={AppImages.unCheckIcon} style={{
                                    height: normalize(28),
                                    width: normalize(28),
                                    marginTop: normalize(9)
                                }} /></TouchableOpacity>
                        }

                        </View>
                    </View>
                }) : <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                      {!isLoading ? <Text style={{marginTop:normalize(30)}}>{props.isFreeTrialEnabled &&  props.selectedChapter.videos > 0 ?  <Text style={{textAlign:'center', fontWeight:'bold', fontSize:heightPercentageToDP('1.8%')}}>Please subscribe to paid version,to access the content</Text>: null}</Text> : null} 
                    </View>}

            </View>
        <View style={{height:normalize(20)}}></View>
        </ScrollView>
        <Loader loading={isLoading} />
         <VideoPlayer 
            isVisible={showVideo} 
            selectedVideo={selectedVideo} 
            toggleVideoComponent={toggleVideoComponent}/>
    </View>
}


const mapStateToProps = state => ({
    selectedMonth:state.PlanningReducer.selectedMonth,
    selecetedSubject:state.PlanningReducer.selectedSubject,
    selectedChapter: state.PlanningReducer.selectedChapter,
    isFreeTrialEnabled:state.UserReducer.isFreeTrialEnabled,

})
export default connect(mapStateToProps)(VideoDetailScreen);

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
    // quotesContainer: {
    //     flex: 1,
    //     backgroundColor: '#D7E7FF',
    //     paddingHorizontal: normalize(20),
    //     borderRadius: normalize(14.5),
    //     marginHorizontal: normalize(30),
    //     marginTop: normalize(8),
    //     paddingVertical: normalize(9),
    //     shadowColor: "#000",
    //     shadowOffset: {
    //         width: 0,
    //         height: 5,
    //     },
    //     shadowOpacity: 0.13,
    //     shadowRadius: 8.62,

    //     elevation: 5,
    // },
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
        fontSize: normalize(14.5),
        color: color.colorBlueDark,
        fontWeight: 'bold'
    },
    optionBoxStyle: {
        height: normalize(48),
        backgroundColor: '#F2F3F8',
        width: '100%',
        borderRadius: normalize(14),
        marginTop: normalize(15),
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingHorizontal: normalize(13)
    },
    arrowDownStyle: {
        height: normalize(15),
        width: normalize(15)
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
    navigationCardContainer: {
        marginHorizontal: normalize(30),
        marginTop: normalize(18)
    },
    navigationCard: {
        height: normalize(72),
        backgroundColor: '#fff',
        flexDirection: 'row',
        borderRadius: normalize(14.5),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.13,
        shadowRadius: 8.62,

        elevation: 5,
    },
    videoCardContainer: {
        marginHorizontal: normalize(30),
        marginTop: normalize(5)
    },
    videoCard: {
        marginTop: normalize(19),
        paddingBottom:normalize(19),
        // height: normalize(91),
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: normalize(14.5),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.13,
        shadowRadius: 8.62,

        elevation: 5,
    }

})