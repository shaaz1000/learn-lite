import React,{useState,useEffect} from "react"
import {Text,View,StyleSheet,SafeAreaView,TextInput,TouchableOpacity,ScrollView} from "react-native"
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
import { Image } from "react-native";
import * as UserActions from "../../redux/actions/user"
const AddChildrenScreen = ({navigation,dispatch}) => {
    const [isLoading,setIsLoading] = useState(false)
    const [MobileNumber,setMobileNumber] = useState("")

    // const searchWithMobileNumber = ()=> {
    //     APICaller
    // }
    const fetchStudent = async () =>{
        setIsLoading(true)
   
       const token = await AsyncStorage.getItem('userToken')
       const body = {
           mobile_no : MobileNumber
       }
       APICaller("search_parent",body,'POST',token)
       .then(response=>{
           const {profile,subscriptions} = response.data

           
           dispatch(UserActions.setStudentDetails(profile))
           setIsLoading(false)
        //    this.setState({data:profile})
        //    this.setState({loading: false})
           profile != undefined ? 
           navigation.navigate("AddChildrenForm",{
               studentDetailsFetched:true,
               subscriptions
           })
           :
           alert(response.data.message)
          
       })
       .catch(err =>{
           console.log(err)
           alert("Something went wrong while searching student")
       })
    }
    return(
        <>
        <HeaderComponent/>
        <SafeAreaView style={{flex:1,backgroundColor:"white"}}>
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{margin:20}}>
            <Text style={styles.TopTextStyle}>Search Your Child</Text>
            <View style={{ borderBottomWidth: 4, borderBottomColor: AppColors.colorAccent ,marginTop:5,marginLeft:10,width:wp("30%")}}/>
        </View>
        <View style={{ width: '90%', marginHorizontal: '5%', backgroundColor: "#fff", borderRadius: 10, paddingVertical: 20,elevation:5,alignItems: 'center',marginBottom: 10 }}>
            <Text style={{fontSize:hp('2.3%'),textAlign:"center",marginHorizontal:wp("2%"),color:AppColors.colorDarkBlue,fontWeight: 'bold'}}>If there is a active student account already available on  LearnLite ,enter the mobile number below and search the account</Text>
            <View style={{ width: '96%', marginHorizontal: '2%', flexDirection: 'row', marginTop: 5 ,justifyContent: 'center'}}>
                <View style={{ width: '65%', borderRadius: 10, borderWidth: 2, borderColor: AppColors.colorPrimary, height: 50,marginTop:10}}>
                    <TextInput
                        keyboardType="number-pad"
                        onChangeText={(mobile)=>setMobileNumber(mobile)}
                        placeholderTextColor={AppColors.colorBlueDark}
                        style={{fontSize:16,fontWeight:"bold",textAlign:"center"}}
                        placeholder="Enter Mobile No"
                    />
                </View>
                {/* <View style={{ 
                       
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        marginLeft: '2%', 
                        borderRadius: 10, 
                        borderWidth: 2, 
                        borderColor: AppColors.colorPrimary, 
                        
                    }}> */}
                    <TouchableOpacity
                        onPress={()=>fetchStudent()}
                        disabled={MobileNumber.length == 10 ? false : true}
                        style={{
                            justifyContent: 'center', 
                            alignItems: 'center', 
                            backgroundColor:AppColors.colorPrimary,
                            borderRadius:10,
                            padding:5,
                            marginHorizontal:5,
                            width: '30%', 
                            height: 50, 
                            marginTop:10
                        }}
                    >
                        <Text style={{
                                fontSize:16,fontWeight:"bold",textAlign:"center",color:AppColors.colorBlueDark
                            }}>Search</Text>
                        </TouchableOpacity>
                {/* </View> */}
            </View>
            <View style={{ width: '80%', marginHorizontal: '10%', marginTop: 20, backgroundColor: '#fff', justifyContent: 'flex-start', alignItems: 'center'}}>
                <Image
                    style={{ resizeMode: 'contain', height: 150, marginBottom: 10 }}
                    source={AppImages.union}
                />
            </View>
            <Text style={{color: AppColors.colorDarkBlue,fontWeight: 'bold',fontSize:hp("2.5%"),marginTop:10,marginHorizontal:25,textAlign:"center"}}>
                If there is No active student accounts linked with please click on the button below
            </Text>
                <View style={[styles.MaininputView, { justifyContent: 'center', alignItems: 'center' }]}>
                    <TouchableOpacity onPress={() => navigation.navigate("AddChildrenForm",{studentDetailsFetched:false,subscriptions:[]})} activeOpacity={1} 
                        style={{justifyContent: 'center', 
                            alignItems: 'center', 
                            width: '50%', 
                            height: 50, 
                            marginTop: 10, 
                            backgroundColor: AppColors.colorPrimary,
                            borderRadius: 10,
                            marginBottom:10 }}>
                        <Text style={{
                            color: AppColors.colorBlueDark,
                            fontWeight: 'bold',
                            fontSize:16,margin:10}}>Add Student</Text>
                    </TouchableOpacity>
                            </View>
           
        </View>
        </ScrollView>
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
    MaininputView: {
        width: '86%',
        marginHorizontal: '7%',
        marginTop: 20
    },
})

export default connect()(AddChildrenScreen);