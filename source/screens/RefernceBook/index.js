import React, { useState ,useEffect} from 'react';
import { View, Text, SafeAreaView, ImageBackground, Image, StyleSheet,TouchableOpacity, ScrollView ,} from 'react-native';
import commonStyling from '../../commonStyles/CssStyle'
import HeaderComponent from '../../commonComponents/headerComponent';
import AppImages, { searchIcon } from '../../assets/Image'
import normalize from '../../utilities/UtilityMethods';
import color, { colorBlueDark } from '../../utilities/AppColor';
import backArrow from '../../assets/Image/backArrow.png'
import upDownArrow from '../../assets/Image/upDownArrow.png';
import bulletIcon from '../../assets/Image/bulletIcon.png'
import SearchBoxComponent from '../../commonComponents/SearchBoxComponent' ;
import PDFViewerComponent from '../../commonComponents/pdfViewerComponent'
import QuoteComponent from '../../commonComponents/quoteComponent';
import NavigationBarComponent from '../../commonComponents/navigationBarComponent';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage'
import config from '../../../react-native.config'
import APICaller from '../../utilities/apiCaller'
const RefernceBook = (props) => {

    const [isLoading,setIsLoading] = useState(false);
    const [path,setPath] = useState('');
    const [refernceData,setRefernceData] = useState([])
    const [isViewPdf,setIsViewPdf] = useState(false)
    const [pdfSource,setPdfSource] = useState({uri:''})
    const [quote,setQuote] = useState("")
    const [paymentStatus,setPaymentStatus] = useState("")
    const [paymentId,setPaymentId] = useState("")
    useEffect(()=>{
        fetchRefernces()
        getQoute()
    },[])

    const getQoute = async () => {
        setIsLoading(true)
        const token = await AsyncStorage.getItem('userToken');
        APICaller("getQuote",undefined,"GET",token).then((response) =>{
            setIsLoading(false)
            const {data} = response.data
            
            setQuote(data)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    const fetchRefernces = async()=>{

        const {chapter_id} = props.selectedChapter;
        console.log(chapter_id,"chapter_id")
        const token = await AsyncStorage.getItem('userToken');
        APICaller(`student_references/${chapter_id}`,undefined,"GET",token).then(response=>{
           
            if(response.status == 200){
                const {data,path} = response.data;
                // console.log(data,path,"data hai")
                setPath(path)
                const {references,subscription} = data;
                setPaymentStatus(subscription.payment_status)
                setPaymentId(subscription.payment_id)
                setRefernceData(references);
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
                        <Text style={commonStyling.screenTitleStyle}>Formulae Sheets</Text>
                    </View>
                </View>
                {/* Search bar */}
                <View style={styles.searchBarContainer}>
                    <SearchBoxComponent />
                </View>
            </View>
            {/* Qoute Container */}
            <View style={styles.quotesContainer}>
            <QuoteComponent quoteText={quote}/>
            </View>
            <View style={styles.navigationCardContainer}>
                <NavigationBarComponent {...props} />
            </View>

            <View style={styles.videoCardContainer}>
                {refernceData.length ? refernceData.map((item,index)=>{
                    
                    return  <View style={styles.videoCard}>
                    <View style={{flex:2,marginLeft:normalize(35)}}>
                        <Text style={{
                            marginTop:normalize(20),
                            fontWeight:'600',
                            fontSize:normalize(15),
                            color:item.free_trial_version == 0 && paymentStatus === null && paymentId === null? "grey":'#86B1F2'
                            }}>Chapter</Text>
                            <Text style={{
                                fontWeight:'600',
                                fontSize:normalize(16),
                                color:'#FF0000',
                                marginTop:normalize(7),
                               // marginRight:normalize(10)
                            }}>{item.description}</Text>
                            <View style={{justifyContent:'center',alignItems:"flex-end",bottom:normalize(45),marginRight:20,marginLeft:normalize(15)}}>
                                
                                <Text style={{fontWeight: '400',
                                fontSize: normalize(14),
                                //alignSelf:"center",
                                color:item.free_trial_version == 0 && paymentStatus === null && paymentId === null?"grey":'#86B1F2',
                                }}>View</Text>
                                {
                                    item.free_trial_version == 0 && paymentStatus === null && paymentId === null?
                                    <TouchableOpacity onPress={()=>{
                                        //Linking.openURL(`https://www.learnlite.in/uploads/chapters/tips_and_tricks/${item.url}`)
                                        alert("Please buy full subscription to access this content")
                                    }}
                                    style={{marginTop:5}}
                                    >
                                    <Image source={AppImages.searchIcon} style={{
                                        height:normalize(18),
                                        width:normalize(18)
                                    }}/>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity onPress={()=>{
                                        //Linking.openURL(`https://www.learnlite.in/uploads/chapters/tips_and_tricks/${item.url}`)
                                        setPdfSource({uri:`https://www.learnlite.in/uploads/chapters/formulae_sheet/${item.url}`})
                                        closePdfViewer()
                                    }}
                                    style={{marginTop:5}}
                                    >
                                    <Image source={AppImages.searchIcon} style={{
                                        height:normalize(18),
                                        width:normalize(18)
                                    }}/>
                                    </TouchableOpacity>
                                }
                                
                            </View>
                    </View>
                    
                    {/* <View style={{flex:8,marginLeft:normalize(35),marginTop:normalize(33)}}>
                        <Text style={{
                            fontSize:normalize(14.5),
                            color:'#263238',
                            fontWeight:'600',
                            marginBottom:normalize(8)
                            }}>Reference Books</Text>

                            <View style={{flexDirection:'row',marginTop:normalize(16)}}>
                                <View style={{
                                    marginTop:normalize(3)
                                }}>
                                    <Image source={bulletIcon} style={{
                                        height:normalize(9),
                                        width:normalize(9)
                                    }}/>
                                </View>
                                <View style={{ marginLeft:normalize(12), width:normalize(264)}}>
                                    <Text style={{
                                        fontSize:normalize(12),
                                        color:'#1B3350',
                                        fontWeight:'400',
                                        lineHeight:normalize(17)
                                    }}>Writer Aaron Mahnke launched his podcast "Lore" in 2015 and it has gained</Text>
                                </View>
                            </View>

                            <View style={{flexDirection:'row',marginTop:normalize(16)}}>
                                <View style={{
                                    marginTop:normalize(3)
                                }}>
                                    <Image source={bulletIcon} style={{
                                        height:normalize(9),
                                        width:normalize(9)
                                    }}/>
                                </View>
                                <View style={{ marginLeft:normalize(12), width:normalize(264)}}>
                                    <Text style={{
                                        fontSize:normalize(12),
                                        color:'#1B3350',
                                        fontWeight:'400',
                                        lineHeight:normalize(17)
                                    }}>Critical acclaim in the time since, including earning Best of 2015 honors.</Text>
                                </View>
                            </View>

                            <View style={{flexDirection:'row',marginTop:normalize(16)}}>
                                <View style={{
                                    marginTop:normalize(3)
                                }}>
                                    <Image source={bulletIcon} style={{
                                        height:normalize(9),
                                        width:normalize(9)
                                    }}/>
                                </View>
                                <View style={{ marginLeft:normalize(12), width:normalize(264)}}>
                                    <Text style={{
                                        fontSize:normalize(12),
                                        color:'#1B3350',
                                        fontWeight:'400',
                                        lineHeight:normalize(17)
                                    }}>From iTunes. The audio program is now becoming a TV series as.</Text>
                                </View>
                            </View>
                    </View> */}
            </View>
                }):<View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                {!isLoading ? <Text style={{marginTop:normalize(30)}}>{props.isFreeTrialEnabled &&  props.selectedChapter.test_pappers > 0 ?  <Text style={{textAlign:'center', fontWeight:'bold', fontSize:heightPercentageToDP('1.8%')}}>Please subscribe to paid version,to access the content</Text>: '-No Result Found-'}</Text> : null} 
              </View>}
            </View>

{/*     
            <View style={styles.bottomButtonContainer}>
                <View style={styles.bottomButtonStyle}>
                    <Text style={styles.bottomButtonTextStyle}>Next</Text>
                </View>
            </View> */}
            <View style={{height:normalize(20)}}></View>

        </ScrollView>
        <PDFViewerComponent source={pdfSource} isVisible={isViewPdf} closePdfViewer={closePdfViewer}/>
    </View>
}
const mapStateToProps = state => ({
    selectedMonth:state.PlanningReducer.selectedMonth,
    selecetedSubject:state.PlanningReducer.selectedSubject,
    selectedChapter:state.PlanningReducer.selectedChapter,
    isFreeTrialEnabled:state.UserReducer.isFreeTrialEnabled,

})
export default connect(mapStateToProps)(RefernceBook);

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
        // height:normalize(340),
        paddingBottom:normalize(19),
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
    }

})