import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ImageBackground, Image, StyleSheet,Linking, ScrollView ,TouchableOpacity} from 'react-native';
import commonStyling from '../../commonStyles/CssStyle'
import HeaderComponent from '../../commonComponents/headerComponent';
import AppImages, { searchIcon } from '../../assets/Image'
import normalize from '../../utilities/UtilityMethods';
import color, { colorBlueDark } from '../../utilities/AppColor';
import backArrow from '../../assets/Image/backArrow.png'
import upDownArrow from '../../assets/Image/upDownArrow.png';
import checkCircleIcon from '../../assets/Image/checkCircleIcon.png';
import uncheckCircleIcon from '../../assets/Image/unCheckCircleIcon.png';
import Loader from '../../commonComponents/loader'
import ModalSelector from 'react-native-modal-selector'
import * as PlanningAction from '../../redux/actions/Planning';
import { connect } from 'react-redux';
import APICaller from '../../utilities/apiCaller';
import NavigationBarComponent from '../../commonComponents/navigationBarComponent';
import AsyncStorage from '@react-native-community/async-storage'
import config from '../../../react-native.config'
import PDFViewerComponent from '../../commonComponents/pdfViewerComponent'
import QuoteComponent from '../../commonComponents/quoteComponent';
import SearchBoxComponent from '../../commonComponents/SearchBoxComponent';
const TipsAndTricksScreen = (props) => {
    const [filteredData,setFilteredData] = useState([])
    const [isLaoding,setIsLoading] = useState(true);
    const [tipsData,setTipsData] = useState([]);
    const [path,setPath] = useState('')
    const [isViewPdf,setIsViewPdf] = useState(false)
    const [pdfSource,setPdfSource] = useState({uri:''})
    const [quote,setQuote] = useState("")
    const [paymentStatus,setPaymentStatus] = useState("")
    const [paymentId,setPaymentId] = useState("")
    useEffect(()=>{
        fetchTips()
        getQoute()
    },[])

    const filterTestData = (keyWord)=>{

        const tempFilteredData = tipsData.filter((item=>{
            return item.description
           .toUpperCase()
           .startsWith(keyWord.toUpperCase());
         }))
         setFilteredData(tempFilteredData)
    }

    const sortPapers = () =>{
        
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

    const fetchTips = async()=>{

        const {chapter_id} = props.selectedChapter;
        const token = await AsyncStorage.getItem('userToken');
        APICaller(`student_tips_tricks/${chapter_id}`,undefined,"GET",token).then(response=>{
            console.log('response from tips ',response)
            if(response.status == 200){
                const {data,path} = response.data;
                
                setPath(path)
                const {tips,subscription} = data;
                setPaymentStatus(subscription.payment_status)
                setPaymentId(subscription.payment_id)
                setTipsData(tips);
                setIsLoading(false)
            }else {
                setIsLoading(false)
                alert("Something went wrong, Please try again")
            }
  
        }).catch(err=>{
            setIsLoading(false)
            alert("Something went wrong, Please try again")
        })
    }

    const closePdfViewer =()=>{
        setIsViewPdf(!isViewPdf)
    }
    return <View style={[commonStyling.flexOne, { backgroundColor: color.colorLightGrey }]}>
        <SafeAreaView style={commonStyling.safeAreaContainer} />
        <HeaderComponent />
        {/* Top banner  */}
        <ScrollView style={{ flex: 1, backgroundColor: '#fff', paddingBottom: normalize(17) }}>
            <View style={styles.topBannerConatiner}>
                {/* <Image source={AppImages.topBackground} style={styles.topBannerImageStyle}/> */}
                <View style={{ flexDirection: 'row' }}>
                    <View style={commonStyling.screenTitleContainer}>
                        <Text style={commonStyling.screenTitleStyle}>Tips & Tricks</Text>
                    </View>
                </View>
                {/* Search bar */}
                <View style={styles.searchBarContainer}>
                    <SearchBoxComponent onChangeText={filterTestData}/>
                </View>
            </View>
            {/* Qoute Container */}
            <View style={styles.quotesContainer}>
                        <QuoteComponent quoteText={quote}/>
                    </View>
            <View style={styles.navigationCardContainer}>
                <View style={styles.navigationCard}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingHorizontal: normalize(26)
                    }}>
                        <TouchableOpacity onPress={()=>{
                            props.navigation.goBack();
                        }} style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={backArrow} style={{
                                height: normalize(14.8),
                                width: normalize(19),
                                resizeMode: 'contain',
                                marginRight:normalize(6)
                            }} />
                        </TouchableOpacity>
                        <Text style={{
                            fontSize: normalize(14.3),
                            fontWeight: '400',
                            color: color.colorBlueDark
                        }}>{props.selectedMonth &&  props.selectedMonth.month_name} | {props.selecetedSubject && props.selecetedSubject.subject_name} | {props.selectedChapter && props.selectedChapter.chapter_name}</Text>


                        
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity 
                            onPress={()=>sortPapers()}
                        >
                            <Image source={upDownArrow} style={{
                                height: normalize(16.5),
                                width: normalize(26),
                                resizeMode: 'contain',
                                right:normalize(8)
                            }} />
                        </TouchableOpacity>
                        </View>
                </View>
            </View>


            <View style={styles.videoCardContainer}>
                {tipsData.length ? tipsData.map((item,index)=>{
                    
                    return <View style={styles.videoCard}>
                    <View style={{flex:2,marginLeft:normalize(35)}}>
                        <Text style={[styles.cardTitle,{color:item.free_trial_version == 0 && paymentStatus === null && paymentId === null?"grey":'#86B1F2'}]}>Chapter</Text>
                        <Text style={styles.tipsTitle}>{item.description}</Text>
                    </View>
                    <View style={{flex:1 , justifyContent:'center',alignItems:'center',marginLeft:normalize(15)}}>
                    {
                        item.free_trial_version == 0 && paymentStatus === null && paymentId === null?
                        <>
                        <TouchableOpacity onPress={()=>{
                                
                                //Linking.openURL(`https://www.learnlite.in/uploads/chapters/tips_and_tricks/${item.url}`)
                                alert("Please buy full subscription to access this content")
                            }}
                                
                            >
                        <Text style={{
                                fontWeight: '400',
                                fontSize: normalize(14),
                                alignSelf:"center",
                                color:'grey',
                                marginTop: normalize(10)
                            }}>View
                            </Text>
                    </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{
                                
                                //Linking.openURL(`https://www.learnlite.in/uploads/chapters/tips_and_tricks/${item.url}`)
                                alert("Please buy full subscription to access this content")
                            }}
                                style={{marginTop:normalize(5)}}
                            >
                            <Image source={AppImages.searchIcon} style={{
                                height:normalize(18),
                                width:normalize(18)
                            }}/>
                            </TouchableOpacity>
                        </>
                        :
                        <>
                        <TouchableOpacity onPress={()=>{
                                
                                //Linking.openURL(`https://www.learnlite.in/uploads/chapters/tips_and_tricks/${item.url}`)
                                setPdfSource({uri:`https://www.learnlite.in/uploads/chapters/tips_and_tricks/${item.url}`})
                                closePdfViewer()
                            }}
                                
                            >
                        <Text style={{
                                fontWeight: '400',
                                fontSize: normalize(14),
                                alignSelf:"center",
                                color:'#86B1F2',
                                marginTop: normalize(10)
                            }}>View
                            </Text>
                    </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{
                                
                                //Linking.openURL(`https://www.learnlite.in/uploads/chapters/tips_and_tricks/${item.url}`)
                                setPdfSource({uri:`https://www.learnlite.in/uploads/chapters/tips_and_tricks/${item.url}`})
                                closePdfViewer()
                            }}
                                style={{marginTop:normalize(5)}}
                            >
                            <Image source={AppImages.searchIcon} style={{
                                height:normalize(18),
                                width:normalize(18)
                            }}/>
                            </TouchableOpacity>
                        </>
                    }
                    
                    </View>
            </View>
                }):<View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                {!isLaoding ? <Text style={{marginTop:normalize(30)}}>{props.isFreeTrialEnabled &&  props.selectedChapter.test_pappers > 0 ?  <Text style={{textAlign:'center', fontWeight:'bold', fontSize:heightPercentageToDP('1.8%')}}>Please subscribe to paid version,to access the content</Text>: '-No Result Found-'}</Text> : null} 
              </View>}
            <View style={{height:normalize(20)}}></View>

            </View>

{/*     
            <View style={styles.bottomButtonContainer}>
                <View style={styles.bottomButtonStyle}>
                    <Text style={styles.bottomButtonTextStyle}>Next</Text>
                </View>
            </View> */}
        </ScrollView>
        <PDFViewerComponent source={pdfSource} isVisible={isViewPdf} closePdfViewer={closePdfViewer}/>

    <Loader loading={isLaoding} />
    </View>
}

const mapStateToProps = state => ({
    selectedMonth:state.PlanningReducer.selectedMonth,
    selecetedSubject:state.PlanningReducer.selectedSubject,
    selectedChapter:state.PlanningReducer.selectedChapter,
    isFreeTrialEnabled:state.UserReducer.isFreeTrialEnabled,

})

export default connect(mapStateToProps)(TipsAndTricksScreen);

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
    quotesContainer:{
        marginHorizontal:normalize(30),
        marginTop:normalize(8),
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
    videoCardContainer:{
        marginHorizontal:normalize(30),
        marginTop:normalize(5)
    },
    videoCard:{
        marginTop:normalize(19),
        // height:normalize(91),
        paddingTop:normalize(20),
        paddingBottom:normalize(19),
        flexDirection:'row',
        backgroundColor:'#fff',
        borderRadius:normalize(14.5),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.13,
        shadowRadius: 8.62,

        elevation: 5,
    },
    cardTitle:{
        // marginTop:normalize(20),
        fontWeight:'600',
        fontSize:normalize(15),
        color:'#86B1F2'
    },
    tipsTitle:{
        fontWeight:'600',
        fontSize:normalize(16),
        color:'#FF0000',
        marginTop:normalize(7)
    }

})