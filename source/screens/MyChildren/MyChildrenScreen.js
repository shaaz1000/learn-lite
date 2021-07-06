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

const MyChildrenScreen = ({navigation}) => {
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

    const getStudent = async () => {
        setIsLoading(true)
        const token = await AsyncStorage.getItem('userToken');
        APICaller('students', undefined, 'GET', token).then(response => {
          
            console.log(response.data)
            if (response.status == 201 || response.status == 200) {
                //console.log(response.data,"line 42 my children screen ")
                setIsLoading(false)
                const {data} = response.data
                if(data.length===0){
                    
                    navigation.navigate("AddChildren")
                }
                setData(data)
                
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
        getStudent()
    },[])

    const renderItem = (item,index) => {
        
        return(
            <View style={{width:wp("100%")}}>
                <Text style={[styles.TopTextStyle,{marginHorizontal:25}]}>{`Student-${index+1}`}</Text>
                <View style={{
                    
                    borderColor:AppColors.colorPrimary,
                    borderWidth:2,
                    borderRadius: 10,
                    backgroundColor:AppColors.colorGrayBackground,
                    margin:25
                    }}>
                        <Text style={styles.listTextStyle}>{item.user_firstname}</Text>
                        <Text style={styles.secondListTextStyle}>{item.course_title}</Text>
                        <Text style={[styles.secondListTextStyle,{
                            fontWeight: "300",
                            fontSize:14,
                            marginTop:3,
                            marginBottom:40
                        }]}>Course Validity: {item.subscription_end_date}</Text>
                </View>
            </View>
        )
    }
    return (
        <>
        
        <Loader loading={isLoading} />
        <SafeAreaView style={{flex:1,backgroundColor:"white"}}>
        <HeaderComponent/>
                <View style={{flexDirection:"row",width:wp('100%'),margin:15}}>
                <View style={{width:wp("46%")}}>
                    <Text style={styles.TopTextStyle}>My children</Text>
                    <View style={{ borderBottomWidth: 4, borderBottomColor: AppColors.colorAccent ,marginTop:5,marginLeft:10,width:wp("27%")}}/>
                </View>
                <View style={{
                    width:wp("50%"),
                    marginTop:10,
                    marginLeft:25,
                }}>
                    <TouchableOpacity 
                        //onPress={()=>navigation.navigate("AddChildren")}
                        onPress={()=>navigation.navigate("Subscription")}
                        style={{
                        backgroundColor:AppColors.colorPrimary,
                        borderRadius:10,
                        width:wp("37%"),
                        margin:5,
                        padding:5
                    }}>
                        <Text style={{
                            color:AppColors.colorBlueDark,
                            fontSize:16,
                            padding:5,
                            fontWeight:"bold",
                            textAlign:"center"
                        }}> Add Student</Text>
                    </TouchableOpacity>
                </View>
                </View>
                <FlatList
                    data={Data}
                    keyExtractor={({id})=>id}
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
        marginTop:30,
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

export default MyChildrenScreen;