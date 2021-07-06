import React, { useEffect, useState,useRef } from 'react';
import CardView from 'react-native-cardview';
import {
    Alert,
    StyleSheet,
    TextInput,
    View,
    Text,
    ScrollView,
    Image,
    FlatList,
    Keyboard,
    TouchableOpacity,
    KeyboardAvoidingView,
    ImageBackground,
    Platform,
    Modal,
    Linking
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import IosPaymentStaticScreen from "../../commonComponents/IosPaymentStaticScreen"
import {Picker} from '@react-native-picker/picker';
//import DropDownPicker from 'react-native-dropdown-picker';
//import { Dropdown } from 'react-native-material-dropdown-v2'
import Loader from '../../commonComponents/loader';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native';
import color from '../../utilities/AppColor';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HeaderComponent from '../../commonComponents/headerComponent';
import normalize from '../../utilities/UtilityMethods'
import AppImages from '../../assets/Image/index';
import RazorpayCheckout from 'react-native-razorpay';
import APICaller from '../../utilities/apiCaller';
import PickerComponent from "../../commonComponents/pickerComponent"
import moment from 'moment';
import * as userActions from '../../redux/actions/user'
import { connect } from 'react-redux';



const Subscription = (props) => {
    const courseIdRecovered = props.navigation.getParam("courseId")
    const courseNameRecovered = props.navigation.getParam("courseName")
    const categoryIdRecovered = props.navigation.getParam("category_id")
    const catergoryNameRecovered = props.navigation.getParam("category_name")
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0
    //DashBoardScreen
    
    const {isFreeTrialEnabled} = props
    
    const [Controller,setController] = useState(false)
    const [loading, setLoading] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState([])
    const [Courses,setCourses] = useState([])
    const [coupon_code,Setcoupon_code] = useState("")
    const [IsCouponApplied,setIsCouponApplied] = useState(false)
    const [CouponInformation,setCouponInformation] = useState({})
    const [categoryData,setCategoryData] = useState([])
    const [CategoryId,setCategoryId] = useState("")
    const [IsFlatListEnabled,setIsFlatListEnabled] = useState(false)
    const [ButtonPress,setButtonPress] = useState("")
    const [courseName,setCourseName] = useState("")
    const [defaultvalue,setDefaultValue] = useState({value:null})
    const [selectedLanguage, setSelectedLanguage] = useState();
    const [courseId,setCourseId] = useState(0)
    const coursePicker = useRef()
  const [messageShown,setmessageShown] = useState(false)
    const getCourseDetailsByCategory = async () => {

        setLoading(true)
        const token = await AsyncStorage.getItem('userToken');
        APICaller("course_categories",undefined, 'GET', token)
        .then((res) => {
            // //console.log(res.data,"line 60 student dashboard")
            const {data,response} = res.data
        //    //console.log('categoru responsee',data)
            
            if(response=="success"){
                    if(categoryIdRecovered != null || categoryIdRecovered != undefined){
                        setDefaultValue(categoryIdRecovered);
                        setCategoryId(categoryIdRecovered)
                        getCourseInformation(categoryIdRecovered)     
                        setCourseName(catergoryNameRecovered)
                    }
                    else{
                        setDefaultValue(data[0].id);
                        setCategoryId(data[0].id)
                        getCourseInformation(data[0].id)     
                        setCourseName(data[0].category_name)
                    }
                    // setDefaultValue(data[0].id);
                    // setCategoryId(data[0].id)
                    // getCourseInformation(data[0].id)     
                    // setCourseName(data[0].category_name)
                    setCategoryData(data)
            }
            setLoading(false)
            // //console.log(data,response,"data received line 54")
            ////console.log(data,"line 54 student dashboard")
        })
        .catch(err => {
            //console.log(err,"line 69 from student dashboard")
            alert("Something went wrong")
        })
    }

    const fetchCourseList = async () => {
        setLoading(true)
        const token = await AsyncStorage.getItem('userToken');

        APICaller('price_list', undefined, 'GET', token).then(response => {

           
            setLoading(false)
            if (response.status == 200) {
                const { data } = response;
                //console.log(data,"data")
                if (data.response == "success") {
                    const { courses, selected_course } = data;
                    // //console.log(selected_course,courses,"from price_list api page no 59")
                    setSelectedCourse(selected_course);
                    setCourses(courses);
                    setLoading(false)
                }
            } else {
                alert('Something went wrong, Please try again')
            }

        }).catch(err=>{
            //console.log('error from pricelist',err)
        })


    }
    // const checkCurrentUser = async () => {
    //     const token = await AsyncStorage.getItem('userToken');
    //     //console.log(token,"token")
    //     if(props.userData.user_type === 2 && props.subscribeStatus == false){
    //         props.navigation.navigate("Subscription")
    //         //console.log(props.userData,"user")
            
    //     }
        
    // }

    
    const getSubscriptionData = async () => {
        
        if(props.userData.user_type === 1){
            const token = await AsyncStorage.getItem('userToken');
            APICaller('subscription',undefined,'GET',token).then((response) =>{
              const {data} = response.data
              //console.log(data,"from getSubscriptiondatadata function in student dashboard")
            
              setLoading(false);
              if(data.length >0){
                props.dispatch(userActions.setSubscriptionStatus(true))
                
                    props.navigation.navigate("DashBoardScreen")
                
            
              }
              else{
                props.dispatch(userActions.setSubscriptionStatus(false))
            }
              
            })
        }
        else if(props.userData.user_type === 2){
            const token = await AsyncStorage.getItem('userToken');
           
            APICaller('subscription',undefined,'GET',token).then((response) =>{
              const {data} = response.data
              console.log(data,"from getSubscription data function in student dashboard")
              setLoading(false);
              if(data.length >0){
                  // subscription exist
                props.dispatch(userActions.setSubscriptionStatus(true))
                
                APICaller("students",undefined, 'GET', token)
                .then(({data})=>{
                    
                    if(data.data.length > 0){
                        props.navigation.navigate("DashBoardScreen")
                    }
                    else{
                        props.dispatch(userActions.getSubscriptionData(data))
                        props.navigation.navigate("AddChildren")
                    }
                })
                .catch(err=>{
                  console.log(err)
                })
                    
                
            
              }
              else{

                // subscription does not exist
                props.dispatch(userActions.setSubscriptionStatus(false))
                
                // if subscription does not exist check whether student has subscription
                APICaller("students",undefined, 'GET', token)
                .then(({data})=>{
                    
                    if(data.data.length > 0){
                        props.dispatch(userActions.setSubscriptionStatus(true))
                        props.navigation.navigate("DashBoardScreen")
                    }
                    else{
                        props.dispatch(userActions.getSubscriptionData(data))
                        props.navigation.navigate("Subscription")
                    }
                })
                .catch(err=>{
                  console.log(err)
                })
            }
              
            })
        }
    }
        
    
    
    useEffect(() => {
        //fetchCourseList()
        //getSubscriptionData()
        //checkCurrentUser()
        getCourseDetailsByCategory()
    }, [])


    
    // useEffect(()=>{
    //     fetchCoursePrice()
    // },[selectedCourse])
   
    const getOrderId = async (id) => {
        // //console.log('id>>', id)
        return new Promise(async (resolve, reject) => {
            setLoading(true)
            const token = await AsyncStorage.getItem('userToken');

            APICaller(`order/${id}`, undefined, 'GET', token).then(response => {

                // //console.log('response from course order id', response);
                setLoading(false)

                if (response.status == 200) {
                    const { data } = response;
                    if (data.response == "success") {
                        const { order_id } = data
                        resolve(order_id)

                    }
                } else {
                    resolve(null)
                }

            }).catch(err=>{
                setLoading(false)
                alert('Something went wrong, Please try again')
    
            })
        })
    }
    const callPaymentAPI = async (razorpay_payment_id, razorpay_order_id, amount) => {
        
        new Promise(async (resolve, reject) => {
            // setLoading(true)
            const token = await AsyncStorage.getItem('userToken');
           
            const body = {
                user_id: props.userData.id,
                course_id: selectedCourse.course_id,
                razorpay_payment_id,
                razorpay_order_id,
                amount,
                full_discount : amount == 0  ? 1 : ""
            }
            
            // //console.log("payment body", body)
            // //console.log('token',token)
            APICaller("payment", body, 'POST', token).then(response => {

                // //console.log('response from course payment', response);
                setLoading(false)
                if (response.status == 200) {
                    const { data } = response;
                    if (data.response == "success") {
                        if(amount === 0 || razorpay_payment_id === 0 ){
                            alert("Congratulation coupon applied successfully , you have enrolled to a full version of the course")
                        }
                        else {
                            alert(data.message);
                        }
                        
                        props.dispatch(userActions.setSubscriptionStatus(true))
                        if(props.userData.user_type === 2){
                            navigation.navigate("AddChildren")
                        }
                        else if(props.userData.user_type === 1){
                            props.navigation.navigate('Congratulation');
                        }
                        
                    }
                } else {
                    resolve(null)
                }

            }).catch(err=>{
                setLoading(false)
                //console.log('erro=>>',err.data)
                alert(err.data.message)
    
            })
        })
    }

    const razorpayCheckout = async (order_id, price) => {
      
        return new Promise(async (resolve, reject) => {
            var options = {
                description: 'Payment',
                image: AppImages.app_logo,
                currency: 'INR',
                key: 'rzp_live_XGoIv0lhIjqnvt', // Your api key
                amount: price, //price * 100
                name: 'Learn Lite',
                order_id: order_id,
                prefill: {
                    email: props.userData.user_email,
                    contact: props.userData.user_mobile,
                    name: props.userData.user_firstname + props.userData.user_lastname
                },
                theme: { color: '#FFD245' }
            }
            RazorpayCheckout.open(options).then((data) => {
                //console.log('data=>>', data)
                resolve(data)
                // props.dispatch(userActions.setSubscriptionStatus(true))
                // props.navigation.navigate('Congratulation');
            })
                .catch((error) => {
                    // handle failure
                    //console.log("Err",error)
                    //alert(`Error: ${error.code} | ${error.description}`);
                    reject(error)
                });
        })
    }

    const ApplyCoupon = async () => {
        setLoading(true)
        const token = await AsyncStorage.getItem('userToken');
        
        const body = {
            coupon_code,
            courseId : selectedCourse.course_id
        }
        
       
        APICaller("subscribe",body,'POST',token)
           
            .then(response => {
                const {data} = response
                console.log(data,"s")
                if(data.response == "success" ){
                    // //console.log(">>>> apply coupon at line 254 dashboard screen",data)
                    alert(`Congratulation you have successfully applied coupon ${data.data.coupon_code}`)
                    setCouponInformation(data.data)
                    setIsCouponApplied(true)
                    
                    // //console.log(IsCouponApplied,CouponInformation,"info")
                    setLoading(false)
                }
                else{
                    
                    alert(data.message)
                    setLoading(false)
                    setIsCouponApplied(false)
                    setCouponInformation("")
                }
            })
            .catch(err => {
                console.log(err)
                alert("Error in Applying Coupon , Please Try Again")
            })
    }
    const handlePayment = async () => {
        //console.log(selectedCourse.total_price,"s")
        if(Platform.OS == "ios"){
           props.navigation.navigate("IosPayment")          
        }
        else{
            const orderId = await getOrderId(selectedCourse.course_id);
        
        if (orderId != null) {
            if(IsCouponApplied){
                setTimeout(async()=>{
                    const razorpayData = await razorpayCheckout(orderId,CouponInformation.final_order_value);
                    
                    if (razorpayData) {
                        const { razorpay_payment_id, razorpay_order_id } = razorpayData
                        await callPaymentAPI(razorpay_payment_id, razorpay_order_id, CouponInformation.final_order_value)
                    } else {
                        alert('Something went wrong, Please try again')
                    }
                },300)
            }
            else{
                setTimeout(async()=>{
                    const razorpayData = await razorpayCheckout(orderId, selectedCourse.total_price);
                    
                    if (razorpayData) {
                        const { razorpay_payment_id, razorpay_order_id } = razorpayData
                        await callPaymentAPI(razorpay_payment_id, razorpay_order_id, selectedCourse.total_price)
                    } else {
                        alert('Something went wrong, Please try again')
                    }
                },300)
            }
            
        } else {
            alert('Something went wrong, Please try again')
        }
        }

        
    }

    const subscribeFreeTrial = async (course_id) => {

        setLoading(true)
        const token = await AsyncStorage.getItem('userToken');

        APICaller(`subscribe/proceed_trail/${course_id}`, undefined, 'GET', token).then(response => {

            ////console.log('response from trial api', response)
            setLoading(false)
            if(response.status == 200){
                const {data} = response;
                ////console.log(data,"data of from student dashboard",">>>>>>>>",props.userData)
                if(data.response == "success" && props.userData.user_type === 2){
                    alert(data.message)
                    
                    props.dispatch(userActions.setSubscriptionStatus(true))
                    //props.dispatch(userActions.isFreeTrialSubscribed(true))
                    AsyncStorage.setItem('courseTitle', JSON.stringify(selectedCourse.course_title));
                    props.navigation.navigate('ParentCongratulations');
                }
                else if(data.response == "success" && props.userData.user_type === 1){
                    alert(data.message)
                    
                    props.dispatch(userActions.setSubscriptionStatus(true))
                    props.dispatch(userActions.isFreeTrialSubscribed(true))
                    //AsyncStorage.setItem('courseTitle', JSON.stringify(selectedCourse.course_title));
                    setCouponInformation({})
                    setIsCouponApplied(false)
                    props.navigation.navigate('Congratulation');
                }
                else {
                    alert(data.message)
                    setLoading(false)
                }
            }else {
                alert('Something went wrong, Please try again')
            }
        }).catch(err=>{
            //console.log(err,"err hai yaha")
            alert('Something went wrong, Please try again')
        })
    }

    const getCourseInformation = async (value) => {
        setLoading(true)
        const token = await AsyncStorage.getItem('userToken')
        APICaller(`courses_by_category/${value}`,undefined, 'GET', token)
        .then((res) =>{
            const {data, response} = res.data
            //console.log('course info',data)
            if(response=="success"){
                setCourses(data)
                setIsFlatListEnabled(true)
                if(courseIdRecovered != undefined || courseIdRecovered != null) {
                    setButtonPress(courseIdRecovered)
                    fetchCoursePrice(courseIdRecovered)
                }
                else{
                    setButtonPress(data[0].id)
                    fetchCoursePrice(data[0].id)
                }
                
            }
            setLoading(false)
        })
        .catch((err) =>{
            //console.log(err,"line 393")
        })

    }

           
    const fetchCoursePrice = async (id) => {
        setCouponInformation({})
        setIsCouponApplied(false)
            setLoading(true)
        const token = await AsyncStorage.getItem('userToken');
            APICaller(`price_list/${id}`, undefined, 'GET', token).then(response => {
            setLoading(false)
        if (response.status == 200) {
            const { data } = response;
                    //console.log(data,"line 417 student dashboard")
            if (data.response == "success") {
                const {selected_course } = data;
                setSelectedCourse(selected_course);
                setLoading(false)
                
            }
            } else {
                alert('Something went wrong, Please try again')

            }

        }).catch(err=>{
            //console.log(err)
            setLoading(false)
            alert('Something went wrong, Please try again')

        })
    }
   const renderCourseItem = (item) => {
        

       return(
        <>
               <View>
                   
                    <TouchableOpacity
                        onPress={(id) => {
                            setButtonPress(item.id)
                            fetchCoursePrice(item.id) 
                        }
                        }
                        style={{
                            alignSelf: 'center',
                            left : wp("2%"),
                            marginTop:hp("5%"),
                            borderRadius: 10,
                            borderWidth:1,
                            borderColor:"white",
                            marginLeft:wp("5%"),
                            width:wp("40%"),
                            backgroundColor : item.id === ButtonPress ?  "white" : null
                        }}
                    >
                    
                        <Text style={{
                            fontSize:hp("2%"),
                            color:color.colorBlueDark,
                            fontWeight:"bold",
                            textAlign:"center",
                            padding:10
                        }}
                        >{item.course_title}</Text>
                    
                        </TouchableOpacity>
                        
                        </View>
        </>
       )
   }

    return (
        <>
        {/* {
            loading ? 
            <Loader loading={loading}/>
            : */}
        
        <SafeAreaView style={{ flex: 1 ,backgroundColor: color.colorPrimary}}>
        
        <HeaderComponent />
        
            <ScrollView>
                <View style={{ paddingBottom: 10 }}>
                    <View style={{ justifyContent: 'center', marginTop: normalize(25), width: wp('100%'), height: hp('5%') }}>
                        <Text style={{ textAlign: 'center', fontSize: normalize(24), fontWeight: '700', color: color.colorBlueDark }}>
                            LearnLite Subscription
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row',width:wp("90%"), alignSelf: 'center',zIndex:999}}> 
                        <Text style={{
                            color:color.colorBlueDark,
                            marginTop:hp("2%"),
                            fontSize: hp("2.5%"),
                            fontWeight:"bold",
                            marginLeft:normalize(15),
                            marginRight:normalize(5)

                        }}>Select Course Category</Text>
                        {/* <View > */}
                            <TouchableOpacity 
                                style={{width:wp("28%"),backgroundColor:"white",borderRadius:10,marginRight:wp("2%"),top:hp("1%")}}
                                onPress={() =>coursePicker.current.open()}    
                            >
                                
                                <Text style={{textAlignVertical:"center",alignSelf: "center",top:hp("1.5%")}}>{courseName}</Text>
                            </TouchableOpacity>
                        
                        {/* </View> */}
                        
                        
                        
                    </View>
                    {
                        IsFlatListEnabled ? 
                        <FlatList
                        data={Courses}
                        //horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={({id})=>id}
                        renderItem={({item})=>{
                            return renderCourseItem(item)
                        }}
                        numColumns={2}
                    />
                    :
                    null
                    }
                    
                    


                    <View style={{ marginTop: Controller ? normalize(140) : normalize(40), marginLeft: wp('6%'), marginRight: wp('6%'), }}>
                        <CardView cardElevation={2}
                            cardMaxElevation={5}
                            cornerRadius={5} style={{ paddingVertical: normalize(36), backgroundColor: '#ffffff' }} >
                            <View style={styles.CardDiv}>
                                <View style={{ flex: .1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                    <View style={styles.BulletsView}>
                                        <Image
                                            source={AppImages.check}
                                            resizeMode="cover"
                                            style={{height:normalize(22),width:normalize(22),alignSelf: 'center',marginVertical:hp("0.5%")}}
                                        />
                                    </View>
                                </View>
                                <View style={{ flex: .9, marginLeft: normalize(21), flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                    <Text style={styles.TextCard}>Course is valid till {selectedCourse.end_date}</Text>
                                </View>
                            </View>

                            <View style={styles.CardDiv}>
                                <View style={{ flex: .1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                    <View style={styles.BulletsView}>
                                    <Image
                                            source={AppImages.check}
                                            resizeMode="cover"
                                            style={{height:normalize(22),width:normalize(22),alignSelf: 'center',marginVertical:hp("0.5%")}}
                                        />
                                    </View>
                                </View>
                                <View style={{ flex: .9, marginLeft: normalize(21), flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                    <Text>
                                    <Text style={[styles.TextCard,{color:color.colorBlue}]}>Early bird </Text>
                                    <Text style={styles.TextCard}>offer valid till {selectedCourse.end_date}</Text>
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.CardDiv}>
                                <View style={{ flex: .1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                    <View style={styles.BulletsView}>
                                    <Image
                                            source={AppImages.check}
                                            resizeMode="cover"
                                            style={{height:normalize(22),width:normalize(22),alignSelf: 'center',marginVertical:hp("0.5%")}}
                                        />
                                    </View>
                                </View>
                                <View style={{ flex: .9, marginLeft: normalize(21), flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                    <Text style={styles.TextCard}>Refer any two of your friends to avail extra Rs.100/-
flat discount</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={{ width: normalize(85), height: normalize(30), borderRadius: normalize(10), marginLeft: normalize(81), marginTop: 20, backgroundColor: color.colorPrimary, borderColor: "#fff", borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>

                                <Text style={{ fontWeight: 'bold', fontSize: normalize(12.92), color: "#777" }}>Refer now</Text>
                            </TouchableOpacity>
                        </CardView>
                    </View>

                    {
                        IsCouponApplied
                        ?
                        <View style={{ marginTop: normalize(30), marginLeft: wp('6%'), marginRight: wp('6%'), }}>
                            <CardView cardElevation={2}
                            cardMaxElevation={5}
                            cornerRadius={5} style={{ padding: 15, paddingVertical: 30, backgroundColor: '#ffffff' }} >
                                <Text style={{padding:10,fontSize:16}}>{`Coupon code ${CouponInformation.coupon_code}  applied successfully`}</Text>
                                
                            </CardView>
                        </View>
                        :
                        <View style={{ marginTop: normalize(30), marginLeft: wp('6%'), marginRight: wp('6%'), }}>
                        <CardView cardElevation={2}
                            cardMaxElevation={5}
                            cornerRadius={5} style={{ padding: 15, paddingVertical: 30, backgroundColor: '#ffffff' }} >
                            <View style={{ width: '94%', borderColor: "#A5AEDC60", borderRadius: normalize(15.23), borderWidth: normalize(2), marginHorizontal: '3%', flexDirection: 'row', height: 50 }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    {/* <FontAwesome name="gift" color="#777" style={{ paddingHorizontal: 10 }} size={24} /> */}
                                    <Image source={AppImages.giftIcon} style={{
                                        height: normalize(24),
                                        width: normalize(24),
                                        resizeMode: 'contain',
                                        marginLeft: normalize(24)
                                    }} />
                                </View>
                                <View style={{ justifyContent: 'center', alignItems: 'center', width: '85%' }}>
                                    <TextInput
                                        autoCapitalize="characters"
                                        onChangeText={(text)=>Setcoupon_code(text.toUpperCase())}
                                        placeholder="Enter your code here"
                                        style={{ fontWeight: 'bold', fontSize: normalize(16), width: '100%', marginLeft: normalize(40) }}
                                    />
                                </View>
                            </View>
                            <View style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity 
                                onPress={()=>ApplyCoupon()}
                                style={{ width: normalize(179.77), height: normalize(49), borderRadius: normalize(15), marginTop: normalize(13), backgroundColor: color.colorPrimary, borderColor: "#fff", borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontWeight: '700', fontSize: normalize(16), color: color.colorBlueDark }}>Apply </Text>
                                </TouchableOpacity>
                            </View>
                        </CardView>
                    </View>
                    }

                    

                    {
                        IsCouponApplied?
                        <View style={{ marginTop: normalize(32), marginLeft: wp('6%'), marginRight: wp('6%'), }}>
                            <CardView cardElevation={2}
                            cardMaxElevation={5}
                            cornerRadius={5} style={{ paddingHorizontal: normalize(29), paddingVertical: normalize(30), backgroundColor: '#ffffff' }} >
                                <View style={styles.CardView2}>
                                <View style={styles.CardHeading}>
                                    <Text style={styles.CardHeadingText}>Subtotal</Text>
                                </View>
                                <View style={styles.CardTextView}>
                                    <Text style={styles.CardHeadingText}>Rs.{CouponInformation.order_value}/-</Text>
                                </View>
                                </View>
                                <View style={styles.CardView2}>
                                <View style={styles.CardHeading}>
                                    <Text style={styles.CardHeadingText}>Early Bird Discount</Text>
                                </View>
                                <View style={styles.CardTextView}>
                                    <Text style={styles.CardHeadingText}>Rs.{selectedCourse && selectedCourse.early_bird_disc}/-</Text>
                                </View>
                                </View>
                                <View style={styles.CardView2}>
                                <View style={styles.CardHeading}>
                                    <Text style={styles.CardHeadingText}>Extra Discount</Text>
                                </View>
                                <View style={styles.CardTextView}>
                                    <Text style={styles.CardHeadingText}>Rs.{CouponInformation.discount_value}/-</Text>
                                </View>
                                </View>
                                <View style={styles.CardView2}>
                                <View style={styles.CardHeading}>
                                    <Text style={[styles.CardHeadingText, { color: '#3C8AFF' }]}>Total</Text>
                                </View>
                                <View style={[styles.CardTextView]}>
                                    <Text style={[styles.CardHeadingText, { color: '#3C8AFF' }]}>Rs.{CouponInformation.final_order_value}/-</Text>
                                </View>
                            </View>
                            <View style={{ marginTop: normalize(26), width: '100%', justifyContent: 'center', alignItems: 'center' }}>


                                <View style={{ width: '100%', borderRadius: 10,  marginHorizontal: '1%', justifyContent: 'center', alignItems: 'center' }}>
                                    
                                       {
                                           IsCouponApplied && CouponInformation.final_order_value === 0 ?
                                           <>
                                            <TouchableOpacity onPress={() => {
                                        subscribeFreeTrial(selectedCourse.course_id)
                                    }}><Text style={{ fontSize: normalize(17), fontWeight: '700', color: '#F47458' }}>
                                            Start your 30 days free trial period
                                        </Text>
                                    </TouchableOpacity>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: "#777", paddingTop: 10 }}>
                                        Or
                                        </Text>
                                        <TouchableOpacity style={{ width: wp("70%"), height: 50, borderRadius: 10, marginTop:hp("2%"), backgroundColor: color.colorPrimary, borderColor: "#fff", borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}
                                        onPress={() => {
                                            callPaymentAPI(0,0,0)
                                        }}
                                    >

                                        <Text style={{ fontWeight: 'bold', fontSize: 18, color: "#777" }}>Submit </Text>
                                    </TouchableOpacity>
                                           </>
                                           :
                                           isFreeTrialEnabled ?
                                           <TouchableOpacity style={{ width: '70%', height: 50, borderRadius: 10, marginTop:hp("2%"),  backgroundColor: color.colorPrimary, borderColor: "#fff", borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}
                                        onPress={() => {
                                            handlePayment()
                                        }}
                                    >

                                        <Text style={{ fontWeight: 'bold', fontSize: 18, color: "#777" }}>Proceed to pay </Text>
                                    </TouchableOpacity>
                                           :
                                           
                                         
                                           <>
                                    <TouchableOpacity onPress={() => {
                                        subscribeFreeTrial(selectedCourse.course_id)
                                    }}><Text style={{ fontSize: normalize(17), fontWeight: '700', color: '#F47458' }}>
                                            Start your 30 days free trial period
                                        </Text>
                                    </TouchableOpacity>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: "#777", paddingTop: 10 }}>
                                        Or
                                        </Text>
                                        <TouchableOpacity style={{ width: '70%', height: 50, borderRadius: 10, marginTop:hp("2%"), backgroundColor: color.colorPrimary, borderColor: "#fff", borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}
                                        onPress={() => {
                                            handlePayment()
                                        }}
                                    >

                                        <Text style={{ fontWeight: 'bold', fontSize: 18, color: "#777" }}>Proceed to pay </Text>
                                    </TouchableOpacity>
                                    </>
                                           
                                       }
                                       
                                    
                                    
                                    
                                    
                                    
                                </View>
                            </View>
                            </CardView>
                        </View>
                        :
                        <View style={{ marginTop: normalize(32), marginLeft: wp('6%'), marginRight: wp('6%'), }}>
                        <CardView cardElevation={2}
                            cardMaxElevation={5}
                            cornerRadius={5} style={{ paddingHorizontal: normalize(29), paddingVertical: normalize(30), backgroundColor: '#ffffff' }} >
                            <View style={styles.CardView2}>
                                <View style={styles.CardHeading}>
                                    <Text style={styles.CardHeadingText}>Subtotal</Text>
                                </View>
                                <View style={styles.CardTextView}>
                                    <Text style={styles.CardHeadingText}>Rs.{selectedCourse && selectedCourse.price}/-</Text>
                                </View>
                            </View>

                            <View style={styles.CardView2}>
                                <View style={styles.CardHeading}>
                                    <Text style={styles.CardHeadingText}>Early Bird Discount</Text>
                                </View>
                                <View style={styles.CardTextView}>
                                    <Text style={styles.CardHeadingText}>Rs.{selectedCourse && selectedCourse.early_bird_disc}/-</Text>
                                </View>
                            </View>


                            <View style={styles.CardView2}>
                                <View style={styles.CardHeading}>
                                    <Text style={[styles.CardHeadingText, { color: '#3C8AFF' }]}>Total</Text>
                                </View>
                                <View style={[styles.CardTextView]}>
                                    <Text style={[styles.CardHeadingText, { color: '#3C8AFF' }]}>Rs.{selectedCourse && selectedCourse.total_price}/-</Text>
                                </View>
                            </View>


                            <View style={{ marginTop: normalize(26), width: '100%', justifyContent: 'center', alignItems: 'center' }}>


                                <View style={{ width: '100%', borderRadius: 10,  marginHorizontal: '1%', justifyContent: 'center', alignItems: 'center' }}>
                                    
                                       {
                                           isFreeTrialEnabled ?
                                           <TouchableOpacity style={{ width: '70%', height: 50, borderRadius: 10, marginTop:hp("2%"), backgroundColor: color.colorPrimary, borderColor: "#fff", borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}
                                        onPress={() => {
                                            handlePayment()
                                        }}
                                    >

                                        <Text style={{ fontWeight: 'bold', fontSize: 18, color: "#777" }}>Proceed to pay </Text>
                                    </TouchableOpacity>
                                           :
                                           <>
                                    <TouchableOpacity onPress={() => {
                                        subscribeFreeTrial(selectedCourse.course_id)
                                    }}><Text style={{ fontSize: normalize(17), fontWeight: '700', color: '#F47458' }}>
                                            Start your 30 days free trial period
                                        </Text>
                                    </TouchableOpacity>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: "#777", paddingTop: 10 }}>
                                        Or
                                        </Text>
                                        <TouchableOpacity style={{ width: '70%', height: 50, borderRadius: 10, marginTop:hp("2%"), backgroundColor: color.colorPrimary, borderColor: "#fff", borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}
                                        onPress={() => {
                                            handlePayment()
                                            //Linking.openURL("https://www.learnlite.in/subscribe/checkout/10")
                                        }}
                                    >

                                        <Text style={{ fontWeight: 'bold', fontSize: 18, color: "#777" }}>Proceed to pay </Text>
                                    </TouchableOpacity>
                                    </>
                                           
                                       }
                                       
                                </View>
                            </View>
                        </CardView>
                    </View>
                    }
                </View>
            </ScrollView>
            <PickerComponent 
                data={categoryData}
                ref={coursePicker}
                title={"Select Course"}
                labelExtractor={(item)=>{
                //console.log(item,"wine")
                return item.category_name
                }}
                selectedValue={courseName}
                onChangeItem={(item)=>{
                    setCategoryId(item.id)
                    setCourseName(item.category_name)
                    getCourseInformation(item.id)
                    // if(itemValue == 0){
                    //     getCourseInformation(1)
                    //     console.log("hi")
                    // }
                    
                    setIsFlatListEnabled(true)
            }}/>
        </SafeAreaView>

        </>
    );
}

const mapStateToProps = (state) => ({
    userData: state.UserReducer.userData,
    subscribeStatus:state.UserReducer.subscribeStatus,
    isFreeTrialEnabled:state.UserReducer.isFreeTrialEnabled
})

export default connect(mapStateToProps)(Subscription)

const styles = StyleSheet.create({

    buttonStyle: {
        backgroundColor: '#FFAD36',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#FFAD36',
        height: hp('7%'),
        borderRadius: 10,
        marginTop: hp('5%'),
        textAlignVertical: 'center',
        justifyContent: 'center',

    },
    buttonTextStyle: {
        color: '#FF001A',
        textAlignVertical: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: hp('2.5%'),

    },
    inputStyle: {
        height: hp('7%'),
        flex: 1,
        color: '#000',
        paddingHorizontal: 15,
        fontSize: hp('2%'),
    },
    courseSelectedButton: {
    },
    modal: {
        alignItems: 'center',
        backgroundColor: '#rgba(255, 255, 255, 0.8)',
        width: wp('80%'),
        height: hp('70%'),
        marginTop: 5,
        alignSelf: 'center',
    },
    CardDiv: {
        flex: 1,
        marginVertical: normalize(10),
        flexDirection: 'row',
        paddingHorizontal: normalize(23)
    },
    BulletsView: {
        width: normalize(32),
        height: normalize(32),
        backgroundColor: color.colorPrimary,
        borderRadius: normalize(32) / 2
    },
    TextCard: {
        color: color.textcolor,
        fontSize: normalize(18),
        lineHeight: normalize(31.2),
        fontWeight: '600'

    },
    CardView2: {
        width: '98%',
        justifyContent: 'space-between',
        marginHorizontal: '1%',
        flexDirection: 'row',
        height: 35
    },
    CardHeading: {
        width: '70%',
        paddingHorizontal: 0,
    },
    CardHeadingText: {
        color: "#aaa",
        fontWeight: 'bold',
        fontSize: normalize(18)
    },
    CardTextView: {
        width: '30%',
        paddingHorizontal: 0,
        alignItems: 'flex-end',

    }

});

