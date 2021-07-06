import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ImageBackground, Image, StyleSheet, ScrollView,TouchableOpacity } from 'react-native';
import commonStyling from '../../commonStyles/CssStyle'
import HeaderComponent from '../../commonComponents/headerComponent';
import AppImages from '../../assets/Image'
import normalize from '../../utilities/UtilityMethods';
import color, { colorBlueDark } from '../../utilities/AppColor';
import Loader from '../../commonComponents/loader'
import { connect } from 'react-redux';
import APICaller from '../../utilities/apiCaller';
import UpdateMarks from './component/updateMark'
import AsyncStorage from '@react-native-community/async-storage';
import NavigationBarComponent from '../../commonComponents/navigationBarComponent';
import config from '../../../react-native.config'
import { Linking } from 'react-native';
import SearchBoxComponent from '../../commonComponents/SearchBoxComponent';
import PDFViewerComponent from '../../commonComponents/pdfViewerComponent'
import QuoteComponent from '../../commonComponents/quoteComponent'
const TestPapersScreen = (props) => {
    console.log(props.selectedChapter,"ha ")
    const [isLoading,setIsLoading] = useState(true);
    const [papersData,setPapersData] = useState([]);
    const [isUpdateMarkVisible,setUpdateMarkVisible] = useState(false);
    const [marksToUpdate,setMarksToUpdate] = useState({});
    const [filteredData,setFilteredData] = useState([])
    const [IsSortAscending ,setIsSortAscending ] = useState(true)
    const [isViewPdf,setIsViewPdf] = useState(false)
    const [pdfSource,setPdfSource] = useState({uri:''})
    const [path,setPath] = useState('')
    const [quote,setQuote] = useState("")
    const [paymentStatus,setPaymentStatus] = useState("")
    const [paymentId,setPaymentId] = useState("")

    useEffect(()=>{
        fetchPaperDetails();
        getQoute()
    },[])
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

    const MarkTestPaperAsComplete = async (id) => {
        setIsLoading(true)
        const body = {
            id
        }
        const token = await AsyncStorage.getItem('userToken');
        APICaller("mark_test_papper",body,'POST',token)
        .then((response) =>{
            console.log(response.data,"response")
            
            fetchPaperDetails()
        })
        .catch(err =>{
            console.log(err)
        })
    }

    const fetchPaperDetails = async ()=>{
        setIsLoading(true)
        const {chapter_id}  = props.selectedChapter;
       
        const token = await AsyncStorage.getItem('userToken');
        
        APICaller(`student_test_pappers/${chapter_id}`,undefined,"GET",token).then(response=>{
           
            const {data,path} = response.data;
            setPath(path)
            if(response.status == 200){
                const {test_pappers,subscription} = data;
                setPaymentStatus(subscription.payment_status)
                setPaymentId(subscription.payment_id)
                setPapersData(test_pappers);
                setFilteredData(test_pappers)
                setIsLoading(false)
            }else {
                alert("Something went wrong, Please try again")
                setIsLoading(false)
            }
        }).catch(err=>{
            alert("Something went wrong, Please try again")
            setIsLoading(false)
        })
    }

    const hanldeMarksUpdate=(item)=>{

        setMarksToUpdate(item)
        toggleUpdateModal()
    }
    
    const toggleUpdateModal= ()=>{
        setUpdateMarkVisible(!isUpdateMarkVisible)
    }

    const updateMarks = async(marks)=>{
        toggleUpdateModal();
        setTimeout(()=>{
        setIsLoading(true);
        },500)
        const body ={
            type:marksToUpdate.mark_id !=null ? "update" :"create",
            test_papper_mark_id:marksToUpdate.mark_id !=null? marksToUpdate.mark_id : marksToUpdate.id,
            mark:marks
        }
        const token = await AsyncStorage.getItem('userToken');

        APICaller('update_mark',body,'POST',token).then(response=>{
            console.log('response from udpate mark',response)
            const {data} = response;
            if(data.response =="success"){
                fetchPaperDetails()
                alert('Makrs Updated')
            }else {
                alert('Something went wrong')
                setIsLoading(false);

            }
        }).catch(err=>{
            console.log('error',err)
            setIsLoading(false);

        })


    }

    const filterTestData = (keyWord)=>{

        const tempFilteredData = papersData.filter((item=>{
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

    const closePdfViewer =()=>{
        setIsViewPdf(!isViewPdf)
    }
    return <View style={[commonStyling.flexOne, { backgroundColor: color.colorLightGrey }]}>
        <SafeAreaView style={commonStyling.safeAreaContainer} />
        <HeaderComponent />
        {/* Top banner  */}
        <ScrollView style={{ flex: 1, backgroundColor: '#fff', paddingBottom: normalize(17) }} showsVerticalScrollIndicator={false}>
            <View style={styles.topBannerConatiner}>
                {/* <Image source={AppImages.topBackground} style={styles.topBannerImageStyle}/> */}
                <View style={{ flexDirection: 'row' }}>
                    <View style={commonStyling.screenTitleContainer}>
                        <Text style={commonStyling.screenTitleStyle}>Test Papers</Text>
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
                <NavigationBarComponent {...props} sortAction={sortPapers}/>
            </View>

            <View style={styles.videoCardContainer}>
                            {filteredData.length ? filteredData.map((item,index)=>{
                                
                                return  <View style={styles.videoCard}>
                                <View style={{flex:1,marginLeft:normalize(35),alignSelf:"center"}}>
                                    <Text style={[styles.cardTitleStyle,{color:item.free_trial_version == 0 && paymentStatus === null && paymentId === null?"grey":'#86B1F2'}]}>Test Paper</Text>
                                        <Text style={styles.contentTextStyle}>Title : {item.description}</Text>
                                        <Text style={styles.contentTextStyle2}>Status : <Text style={{color:item.marks_obtained ? "green" :"red"}}>{item.marks_obtained ? "Completed" : "Pending"}</Text></Text>
                                </View>
                                <View style={{flex:1 ,alignItems:'center',marginTop:normalize(18),marginLeft:normalize(15),justifyContent: 'center',}}>
                                    {/* <Text style={styles.markAsTextStyle}>Mark as Completed</Text> */}
                                    {/* <View style={{ flex: 1, alignItems: 'center', marginTop: normalize(20), marginLeft: normalize(15) }}> */}
                                    <Text style={{
                                fontWeight: '400',
                                fontSize: normalize(13.5),
                                alignSelf:"center",
                                color: '#818181'
                            }}>Mark as {item.completed_status == "A" ? "Incompleted" : "Completed"}
                             </Text> 

                            {item.completed_status == "A" ? 
                            <TouchableOpacity 
                            disabled={ item.free_trial_version == 0 && paymentStatus === null && paymentId === null ? true : false}
                            onPress={()=>{
                                MarkTestPaperAsComplete(item.id)
                                // markVideo(item.id)
                            }}>
                                <Image source={AppImages.checkIcon} style={{
                                    height: normalize(20),
                                    width: normalize(20),
                                    marginTop: normalize(9)
                                }} /></TouchableOpacity>   
                                :
                                <TouchableOpacity 
                                disabled={ item.free_trial_version == 0 && paymentStatus === null && paymentId === null ? true : false}
                                onPress={()=>{
                                   MarkTestPaperAsComplete(item.id)
                                    // setSelectedVideo(item)
                                    // markVideo(item.id)
                                }}>
                                <Image source={AppImages.unCheckIcon} style={{
                                    height: normalize(20),
                                    width: normalize(20),
                                    marginTop: normalize(9)
                                }} /></TouchableOpacity>
                        }
                        {
                            item.free_trial_version == 0 && paymentStatus === null && paymentId === null ?
                            <>
                            <TouchableOpacity onPress={()=>{
                                         alert("Please buy full subscription to access this content")
                                    }}>
                            <Text style={{
                                fontWeight: '400',
                                fontSize: normalize(13.5),
                                alignSelf:"center",
                                color:'grey',
                                marginTop: normalize(10)
                            }}>View
                            
                            </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{
                                          alert("Please buy full subscription to access this content")
                                    }}>
                            <Image source={AppImages.searchIcon} style={{
                                height:normalize(20),
                                width:normalize(20),
                                marginTop:normalize(3)
                            }}/>
                            </TouchableOpacity>
                            </>
                            :
                            <>
                            <TouchableOpacity onPress={()=>{
                                         setPdfSource({uri:`https://www.learnlite.in/uploads/chapters/test_paper/${item.url}`})
                                         closePdfViewer()
                                    }}>
                            <Text style={{
                                fontWeight: '400',
                                fontSize: normalize(13.5),
                                alignSelf:"center",
                                color:'#86B1F2',
                                marginTop: normalize(10)
                            }}>View
                            
                            </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{
                                         setPdfSource({uri:`https://www.learnlite.in/uploads/chapters/test_paper/${item.url}`})
                                         closePdfViewer()
                                    }}>
                            <Image source={AppImages.searchIcon} style={{
                                height:normalize(20),
                                width:normalize(20),
                                marginTop:normalize(3)
                            }}/>
                            </TouchableOpacity>
                            </>
                        }
                            
                            

                        {/* </View> */}
                                    {/* {item.marks_obtained != null ? 
                                        <View style={{flexDirection:'row',marginTop:normalize(7)}}>
                                            <View style={styles.marksContainer}>
                                                <Text style={styles.marksTextStyle}>{item.marks_obtained}</Text>
                                            </View>
                                            <TouchableOpacity onPress={()=>{
                                                hanldeMarksUpdate(item)
                                            }} style={styles.editButton}>
                                                <Text style={styles.editButtonTextStyle}>Edit</Text>
                                            </TouchableOpacity>
                                        </View> :
                                         <View style={{flexDirection:'row',marginTop:normalize(7)}}>
                                        <TouchableOpacity style={styles.updateButton} onPress={()=>{
                                            hanldeMarksUpdate(item)
                                        }}>
                                            <Text style={styles.updateButtonText}>Update</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.searchIconContainer} onPress={()=>{
                                            // Linking.openURL(`${config.pdfUrl}/${path}${item.url}`)
                                            setPdfSource({uri:`${path}/${item.id}`})
                                            closePdfViewer()
                                        }}>
                                            <Image source={AppImages.searchIcon} style={{height:normalize(12.44),width:normalize(12.44)}}/>
                                        </TouchableOpacity>
                                    </View>
                                    } */}
                                </View>
                        </View>
                            }) :  <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                            {!isLoading ? <Text style={{marginTop:normalize(30)}}>{props.isFreeTrialEnabled &&  props.selectedChapter.test_pappers > 0 ?  <Text style={{textAlign:'center', fontWeight:'bold', fontSize:heightPercentageToDP('1.8%')}}>Please subscribe to paid version,to access the content</Text>: null}</Text> : null} 
                          </View>}
            </View>

            <View style={{height:normalize(20)}}></View>
    
            {/* <View style={styles.bottomButtonContainer}>
                <View style={styles.bottomButtonStyle}>
                    <Text style={styles.bottomButtonTextStyle}>Next</Text>
                </View>
            </View> */}
        </ScrollView>
        <Loader loading={isLoading} />
        <PDFViewerComponent source={pdfSource} isVisible={isViewPdf} closePdfViewer={closePdfViewer}/>
        {/* <UpdateMarks isVisible={isUpdateMarkVisible} marksData={marksToUpdate} toggleUpdateModal={toggleUpdateModal} updateMarks={updateMarks}/> */}
    </View>
}

const mapStateToProps = state => ({
    selectedMonth:state.PlanningReducer.selectedMonth,
    selecetedSubject:state.PlanningReducer.selectedSubject,
    selectedChapter:state.PlanningReducer.selectedChapter,
    isFreeTrialEnabled:state.UserReducer.isFreeTrialEnabled,

})

export default  connect(mapStateToProps)(TestPapersScreen);

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

    videoCardContainer:{
        marginHorizontal:normalize(30),
        marginTop:normalize(5)
    },
    videoCard:{
        marginTop:normalize(19),
        // height:normalize(91),
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
    updateButton:{
        height:normalize(28),
        width:normalize(67),
        borderRadius:normalize(5),
        backgroundColor:'#FFD245',
        justifyContent:'center',
        alignItems:'center'
    },
    updateButtonText:{
        fontWeight:'400',
        color:color.colorBlueDark,
        fontSize:normalize(14)
    },
    searchIconContainer:{
        marginLeft:normalize(11),
        justifyContent:'center',
        alignItems:'center'
    },
    marksContainer:{
        height:normalize(28),
        width:normalize(32),
        borderRadius:normalize(5),
        borderColor:'#000',
        borderWidth:1,
        justifyContent:'center',
        alignItems:'center'
    },
    marksTextStyle:{
        fontWeight:'400',
        color:'#000',
        fontSize:normalize(14)
    },
    editButton:{
        height:normalize(28),
        width:normalize(58),
        borderRadius:normalize(5),
        borderColor:'#FFD245',
        borderWidth:1,
        justifyContent:'center',
        alignItems:'center',
        marginLeft:normalize(4)
    },
    editButtonTextStyle:{
        fontWeight:'400',
        color:'#000',
        fontSize:normalize(14)
    },cardTitleStyle:{
        marginTop:normalize(15),
        fontWeight:'600',
        fontSize:normalize(15),
        color:'#86B1F2'
    },
    contentTextStyle:{
        fontWeight:'400',
        fontSize:normalize(14),
        color:'#818181',
        marginTop:normalize(2)
    },
    contentTextStyle2:{
        fontWeight:'400',
        fontSize:normalize(14),
        color:'#818181',
        marginTop:2
    },
    markAsTextStyle:{
        fontWeight:'400',
        fontSize:normalize(12),
        color:'#818181',
    }

})