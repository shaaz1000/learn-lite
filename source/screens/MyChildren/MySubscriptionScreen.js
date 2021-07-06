import React,{useState,useEffect} from "react"
import {Text,View,StyleSheet,SafeAreaView,FlatList,TouchableOpacity} from "react-native"
import HeaderComponent from '../../commonComponents/headerComponent'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen"
import RNPicker from 'rn-modal-picker';
import Loader from '../../commonComponents/loader'
import APICaller from '../../utilities/apiCaller'
import AppImages from "../../assets/Image"
import AppColors from "../../utilities/AppColor"
import {unsubscribe, getNetwork} from "../../utilities/CheckNetwork"
import {connect} from "react-redux"
import AsyncStorage from '@react-native-community/async-storage'
import { Linking } from "react-native";

const MySubscriptionScreen = ({navigation}) => {
    const [isLoading,setIsLoading] = useState(false)
    const [Data,setData] = useState([])
    
    // const Data = [
    //     {
    //     _id:1,
    //     student:"Student-1",
    //     studentName : "Hareesh",
    //     courseName : "Surge",
    //     courseValidity : "12/09/2021"
    //     },
    //     {
    //     _id:2,
    //     student:"Student-2",
    //     studentName : "Raneesh",
    //     courseName : "Surge",
    //     courseValidity : "12/09/2021"
    //     }
    // ]

    const DownloadInvoice = async (id) => {
        const token = await AsyncStorage.getItem('userToken')
        if(id == 0){
            APICaller("dwnPdInv",undefined, 'GET', token)
            .then(({data})=>{
                if(data.response == "success"){
                    Linking.openURL(data.data)
                }
                
            })
            .catch(err=>{
                alert("failed to download invoice")
            })
        }
        else if(id>0){
            APICaller(`downloadStudentInvoice/${id}`,undefined, 'GET', token)
            .then(({data})=>{
                if(data.response == "success"){
                    Linking.openURL(data.data)
                }
            })
            .catch(err=>{
                alert("failed to download invoice")
            })
        }
    }
    const checkParentSubscription = async () => {
        const token = await AsyncStorage.getItem('userToken')
        console.log(token,"t")
        // if(subscriptions.length === 0){
            APICaller("subscription",undefined, 'GET', token)
            .then(({data})=>{
                
                const {students,response} = data
                //console.log(data.data,"d")
                if(response=="success"){
                    if(data.data.length>0){
                        //console.log("hello")
                        setData(data.data)
                        //console.log(data.data,"d")
                        getStudent(...data.data)
                        // if(students.length>0){
                        //     //console.log("students",...students)
                            
                        //     setData([...data.data,...students])
                            
                        // }
                    }
                    else if(data.data.length==0){
                        //setData(students)
                        getStudent([])
                    }
                    //console.log(students,"ss",Data,"d")
                }
                // if(data.response == "success" && data.data.length>0){
                //     setSubscriptionData(data.data)
                // }
            })
            .catch(err => {
                console.log(err)
            })
        // }
    }
    const getStudent = async (Data1) => {
        //console.log(Data1,"ha bau")
        setIsLoading(true)
        const token = await AsyncStorage.getItem('userToken');

        console.log(token,"t")
        APICaller('students', undefined, 'GET', token).then(response => {
          
            console.log(response.data,"students")
            if (response.status == 201 || response.status == 200) {
                //console.log(response.data,"line 42 my children screen ")
                setIsLoading(false)
                const {data} = response.data
                if(data.length===0){
                    
                    navigation.navigate("Subscription")
                }
                else if(data.length > 0){
                    setData([Data1,...data])
                //console.log([Data1,...data],"idr")
                }
                
            } else {
                alert('Something went wrong, Please try again')
                setIsLoading(false)
            }

        }).catch(err => {
            console.log('error>>', err)
            setIsLoading(false)

        })
    }
    useEffect(()=>{
        //getStudent()
        checkParentSubscription()
    },[])
    //console.log(Data,"bhai yeh data hai")

    
    const renderItem = (item,index) => {
        console.log(item,"bhaijaan")
        const showMessage = () => {
            //alert("No subscription details found please purchase subscription or link with student")
            navigation.navigate("Subscription")
        }
        return(
            
            <View style={{width:wp("100%")}}>
                {
                item.course_title != null && item.amount != null ?
                <>
                <Text style={[styles.TopTextStyle,{marginHorizontal:25}]}>{`Subscription-${index+1}`}</Text>
                <View style={{
                    
                    borderColor:AppColors.colorPrimary,
                    borderWidth:2,
                    borderRadius: 10,
                    backgroundColor:AppColors.colorGrayBackground,
                    margin:25
                    }}>
                        {
                            ! item.user_firstname 
                            ?
                            null
                            :
                            <Text style={styles.listTextStyle}>{item.user_firstname}</Text>
                        }
                        
                        <Text style={styles.secondListTextStyle}>{item.course_title}</Text>
                        <Text style={[styles.secondListTextStyle,{
                            fontWeight: "300",
                            fontSize:14,
                            marginTop:3,
                            //marginBottom:40
                        }]}>Course Validity: {item.subscription_end_date}</Text>
                        {
                            item.payment_status === null ?
                            <TouchableOpacity
                                onPress={()=>{
                                    navigation.navigate("StudentDashBoard",{
                                        courseId : ! item.couruseId ? item.course_id : item.couruseId,
                                        courseName : item.course_title,
                                        category_id : item.category_id,
                                        category_name : item.category_name
                                    })
                                }}
                            >
                                <Text style={[styles.secondListTextStyle,{fontWeight: "300",
                            fontSize:14,
                            marginTop:3,
                            color : AppColors.colorDarkBlue,fontWeight: 'bold'
                            }]}>Purchase Full course</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                onPress={()=>{DownloadInvoice(id= !item.id ? 0 : item.id)}}
                            >
                                <Text style={[styles.secondListTextStyle,{fontWeight: "300",
                            fontSize:14,
                            marginTop:3,
                            color : AppColors.colorDarkBlue,fontWeight: 'bold'}]}>Download Invoice</Text>
                            </TouchableOpacity>
                        }
                </View>
                </>
                :
                
                    showMessage()
                
                }
                
            </View>
        )
    }
    return (
        <>
        
        <Loader loading={isLoading} />
        <SafeAreaView style={{flex:1,backgroundColor:"white"}}>
        <HeaderComponent/>
                {/* <View style={{flexDirection:"row",width:wp('100%'),margin:15}}> */}
                <View 
                // style={{width:wp("46%")}}
                >
                    <Text style={styles.TopTextStyle}>Subscription Details of Student</Text>
                    <View style={{ borderBottomWidth: 4, borderBottomColor: AppColors.colorAccent ,marginTop:5,marginLeft:10,width:wp("70%")}}/>
                </View>
                <FlatList
                    data={Data}
                    keyExtractor={({index})=>index}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item,index})=>{
                        return renderItem(item,index)
                    }}
                />

            
        </SafeAreaView>
        </>
    )
} 

const styles = StyleSheet.create({
    TopTextStyle:{
        fontSize:17,
        marginTop:10,
        fontWeight: 'bold',
        marginHorizontal:10,
        color:AppColors.colorBlueDark
    },
    listTextStyle:{
        fontSize:20,
        marginTop:10,
        marginHorizontal:30,
        marginBottom:5,
        fontWeight: 'bold',
        color:AppColors.colorBlueDark
    },
    secondListTextStyle:{
        fontSize:17,
        marginTop:10,
        marginHorizontal:30,
        marginBottom:5,
        fontWeight: 'bold',
        color:AppColors.colorBlueDark
    }
})

export default MySubscriptionScreen;