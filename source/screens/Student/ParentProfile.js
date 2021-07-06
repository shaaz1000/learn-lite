import React,{useState,useEffect,useRef} from "react"
import {Text,View,StyleSheet,SafeAreaView,TextInput,ScrollView,TouchableOpacity,Image} from "react-native"
import HeaderComponent from '../../commonComponents/headerComponent'
import AppColor from '../../utilities/AppColor';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen"
import RNPicker from 'rn-modal-picker';
import Loader from '../../commonComponents/loader'
import APICaller from '../../utilities/apiCaller'
import AppImages from "../../assets/Image"
import AppColors from "../../utilities/AppColor"
import ParentDetailsForm from '../../commonComponents/ParentDetailsForm'
import * as userActions from '../../redux/actions/user'
import {unsubscribe, getNetwork} from "../../utilities/CheckNetwork"
import {connect} from "react-redux"
import AsyncStorage from '@react-native-community/async-storage'
import PickerComponent from '../../commonComponents/pickerComponent'
const ParentProfile = ({userData,navigation,dispatch,parentDetails}) => {
    console.log(parentDetails,"user",userData,">>>")
    const [IsToggle,setIsToggle] = useState(false)
    let statesList = []
    let citiesList = []
    const stateRef = useRef()
    const cityRef = useRef()
    const [FirstName,setFirstName] = useState(
        userData.user_type === 2 ? 
            userData.user_firstname === undefined ? 
            userData.firstname : userData.user_firstname : 
            userData.user_type === 1 ? 
            parentDetails.user_firstname === undefined ?
            parentDetails.firstname :
            parentDetails.user_firstname
            :
            "Emma"
        )
    const [LastName,setLastName] = useState(
        userData.user_type === 2 ? 
            userData.user_lastname === undefined ? 
                userData.lastname : 
                userData.user_lastname : 
                userData.user_type === 1 ? 
                parentDetails.user_lastname === undefined ?
                parentDetails.lastname :
                parentDetails.user_lastname
                :
                "Dummy"
            )
    const [EmailId,setEmailId] = useState(
        userData.user_type === 2 ? 
            userData.user_email === undefined ? 
                userData.email : 
                    userData.user_email : 
                    userData.user_type === 1 ?
                    parentDetails.user_email === undefined ?
                    parentDetails.email
                    :
                    parentDetails.user_email
                    :
                    null
                )
    
    const [ContactNo,setContactNo] = useState(
        userData.user_type === 2 ? 
            userData.user_mobile === undefined ? 
                userData.mobile : 
                    userData.user_mobile : 
                    userData.user_type === 1 ?
                    parentDetails.user_mobile === undefined ?
                    parentDetails.mobile
                    :
                    parentDetails.user_mobile
                    :
                    null
    )
    const [States,setStates] = useState([])
    const [Cities,setCities] = useState([])
    const [SelectState,setSelectState] = useState(
        userData.user_type === 2 ? 
            userData.state_name === undefined ? 
                userData.state : 
                    userData.state_name : 
                    userData.user_type === 1 ?
                    parentDetails.state_name === undefined ?
                    parentDetails.state
                    :
                    parentDetails.state_name
                    :
                    "Select State"
    )

    const [SelectCity,setSelectCity] = useState(userData.user_type === 2 ? 
        userData.city_name === undefined ? 
            userData.city : 
                userData.city_name : 
                userData.user_type === 1 ?
                parentDetails.city_name === undefined ?
                parentDetails.city
                :
                parentDetails.city_name
                :
                "Select City")
    const [choosenIndexState,setChooseIndexState] = useState(0)
    const [choosenIndexCity,setChooseIndexCity] = useState(0)
    const [CheckNetwork,setCheckNetwork] = useState(false)
    const [Loading,setLoading] = useState(false)
    const [Checked,setChecked] = useState(0)
    const [Disabled,setDisabled] = useState(false)
    const checkForNetwork = async () => {
        let checkNet = await getNetwork()
        setCheckNetwork(checkNet)
        
    } // check network connection 
    const updateState = async () => {
        let checkNet = await unsubscribe()
        setCheckNetwork(checkNet)
        
    } // unsubscribe the listener

    // get data of all the states
    const getState = async () => {
        return new Promise(async(resolve)=>{
            if(global.checkInternet === true){
                setLoading(true)
            APICaller('getstates').then((response) => {
            if (response.data.response == 'success') {
                setLoading(false)
                statesList = response.data.data;
              
                if (statesList !== null) {
                    if (statesList.length > 0) {
                        
                        setStates(statesList);
                        
                        resolve(true)
                
                    }else{
                        setStates(null);
                        resolve(null)
                    }
                }else{
                    setStates(null);
                    resolve(null)
                }
            }
          })
          .catch( (error) => {
            console.log(error);
            setLoading(false)
            resolve(null)

            alert(error);
          });
            } // end of if 
        }) // end of promise
    } // function closed
    

    const stateCheck = (itemValue) => {
        
        if (itemValue.id === 0) {
            setSelectState("")
            setChooseIndexState(itemValue.id)
          
        } else {
            setSelectState(itemValue.name)
            setChooseIndexState(itemValue.id)
            setCities(null)
            setSelectCity("City")
            setChooseIndexCity(0)

         
          if (Checked === 0) {
            
            getCity(itemValue.id);
          }
        }
      }
    const getCity = async (state_id) => {
        if(state_id!== 0){
            if (global.checkInternet === true) {
                setLoading(true)
                let body = {
                  state_id: state_id,
                }
            APICaller('getcity',body,'POST').then(response =>{
                if (response.data.response == 'success') {
                    setLoading(false)
                    citiesList = response.data.data
                   
                    
                    if (citiesList !== null) {
                      if (citiesList.length > 0) {
                        let citys = citiesList;
                        setCities(citys)
                       
                      } else {
                          setCities(null)
                        
                      }
                    } else {
                        setCities(null)
                      
                    }
                  }
            }).catch(error =>{
                alert(error)
                console.log(error)
                setLoading(false)
            })
            }
            else {
                alert('Please check your internet connection.');
              }
        }
        
    } 
    const cityCheck = (itemValue) => {
       
        if (itemValue.id === 0) {
            setSelectCity("")
            setChooseIndexCity(itemValue.id)
        } else {
            setSelectCity(itemValue.name)
            setChooseIndexCity(itemValue.id)
          
        }
      };
        
      const updateProfile = async () => {
        setLoading(true)
        const token = await AsyncStorage.getItem('userToken');
        // const user_id = await AsyncStorage.getItem('user_id')
        
        const body = {
            user_id : userData.user_type == 2 ? userData.user_id : parentDetails.user_id,
            user_type: 2,
            firstname: FirstName,
            lastname: LastName,
            email: EmailId,
            contact_no: ContactNo,
            //grade: userProfile.user_courses_id,
            //institute: userProfile.institute,
            //gender: selectedGender,
            //dob: userProfile.dob,
            //password:Password,
            state_id: choosenIndexState,
            city_id: choosenIndexCity
        }
        
        APICaller("update_profile",body,'POST',token)
        .then(response =>{
            console.log(response.data,"response data from parent profile update api")
            getParentProfileDetail()
            setLoading(false)   
            setIsToggle(false)
            // if(response.data)
            // navigation.navigate("ParentProfile")
        })
        .catch(err=>{
            console.log(err,"error")
        })
    }
    

    const getParentProfileDetail = async () => {
        if(userData.user_type === 2){
        setLoading(true)
        const token = await AsyncStorage.getItem('userToken')
        console.log(token,"token")
        APICaller("profile",undefined, 'GET',token).
        then(response=>{
            const {data} = response
            
            setLoading(false)
            if(data.response == "success"){
                //console.log(data.user,"idr")
                dispatch(userActions.setUserData(data.user))
                
            }
            else{
                alert("something went wrong")
            }
            
        })
        .catch(err => {
            alert("Something went wrong")
        })
    }
}

      useEffect(()=>{
        checkForNetwork()
        getParentProfileDetail()
        updateState()
        getState()
    },[])
    
    return (
        <>
    <SafeAreaView style={{flex: 1,backgroundColor:"white"}}>
<HeaderComponent />
    
    <>
    <View style={{width:wp('90%'),marginTop:20,marginHorizontal:20}}>
    <ScrollView showsVerticalScrollIndicator={false}>
    <Loader loading={Loading}/>
    <View style={{flexDirection:"row",marginTop:20}}>
        <Image
            source={AppImages.group1385_1}
            style={{height:100,width:100,resizeMode: 'contain',marginHorizontal:10}}
        />
        <View style={{width:wp("80%")}}>
            {
                userData.user_type === 2 ?
                userData.firstname === undefined ?
                <>
                <Text style={{
                    marginTop:10,fontSize:20,fontWeight: 'bold',color:AppColor.colorBlueDark,marginHorizontal:10
                }}>{userData.user_firstname}</Text>
                <Text style={{
                    marginTop:2,fontSize:17,color:AppColor.colorBlueDark,marginHorizontal:10
                }}>{userData.user_lastname}</Text>
                </>
                :
                <>
                <Text style={{
                    marginTop:10,fontSize:20,fontWeight: 'bold',color:AppColor.colorBlueDark,marginHorizontal:10
                }}>{userData.firstname}</Text>
                <Text style={{
                    marginTop:2,fontSize:17,color:AppColor.colorBlueDark,marginHorizontal:10
                }}>{userData.lastname}</Text>
                </>
                :
                <>
                <Text style={{
                marginTop:10,fontSize:20,fontWeight: 'bold',color:AppColor.colorBlueDark,marginHorizontal:10
                }}>{FirstName}</Text>
                <Text style={{
                    marginTop:2,fontSize:17,color:AppColor.colorBlueDark,marginHorizontal:10
                }}>{LastName}</Text>
                </>
            }
            
            {
                ! IsToggle?
                <TouchableOpacity style={{
                    borderWidth:2,
                    borderColor:AppColor.colorPrimary,
                    width:wp("20%"),
                    marginVertical:10,
                    marginHorizontal:10,
                    borderRadius: 10,
                    padding:5}}
                    onPress={()=>{
                        setIsToggle(true)
                        // console.log(IsToggle,"is hai toggled")
                    }}
                    >
                    <Text style={{color:AppColor.colorBlueDark,padding:2,textAlign:"center"}}>Edit</Text>
                </TouchableOpacity>
                :
                null
            }
            
        </View>
    </View>
    
        {
            userData.user_type === 2 ?
            <TouchableOpacity 
            style={{
                
                backgroundColor:AppColor.colorPrimary,
                borderRadius:10,
                marginHorizontal:1,
                marginVertical:10,
                width:wp("35%"),
                height:hp("5%")
            }}>
            <Text style={{padding:8,
                color:AppColor.textcolor,
                
                textAlign:"center",
                fontSize:15
            }}>My Profile</Text>
        </TouchableOpacity>
        :
        <>
        <View style={{flexDirection: 'row',marginTop:15,justifyContent: 'center'}}>
        <TouchableOpacity 
            onPress={()=>navigation.navigate("MyProfile")}
            style={{
                borderWidth:2,
                borderColor:AppColor.colorPrimary,
                borderRadius:10,
                marginHorizontal:10,
                width:wp("40%")
            }}>
            <Text style={{padding:8,
                color:AppColor.colorBlueDark,
                fontWeight:"bold",
                textAlign:"center",
                fontSize:15
            }}> User Details</Text>
        </TouchableOpacity>
        <TouchableOpacity 
            style={{
                
                backgroundColor:AppColor.colorPrimary,
                borderRadius:10,
                marginHorizontal:1,
                width:wp("40%")
            }}>
            <Text style={{padding:8,
                color:AppColor.textcolor,
                
                textAlign:"center",
                fontSize:15
            }}> Parent Details</Text>
        </TouchableOpacity>
        </View>
        </>
        }
        
        
    
    <View style={styles.containerStyle}>
    <Text style={[styles.formTextStyle,{marginTop:20}]}>First Name</Text>
                <TextInput
                    defaultValue={FirstName}
                    editable={IsToggle}
                    style={styles.textInputStyle}
                    onChangeText={(FName)=>setFirstName(FName.replace(/[^A-Za-z,\s]/g, '')
                    .replace(/[,.]/g, ''))}
                />
            <Text style={styles.formTextStyle}>Last Name</Text>
                <TextInput
                    defaultValue={LastName}
                    editable={IsToggle}
                    onChangeText={(LName)=>{
                        setLastName(LName.replace(/[^A-Za-z,\s]/g, '')
                        .replace(/[,.]/g, ''))
                    }}
                    style={styles.textInputStyle}
                />
            <Text style={styles.formTextStyle}>Email Id</Text>
                <TextInput
                    defaultValue={EmailId}
                    editable={IsToggle}
                    onChangeText={(EmailId)=>setEmailId(EmailId)}
                    style={styles.textInputStyle}
                />
           
            <Text style={styles.formTextStyle}>Contact No.</Text>
                <TextInput
                    defaultValue={ContactNo}
                    editable={IsToggle}
                    keyboardType="number-pad"
                    maxLength={10}
                    onChangeText={(MobileNumber)=>setContactNo(MobileNumber)}
                    style={styles.textInputStyle}
                />
            <Text style={styles.formTextStyle}>State</Text>
            <TouchableOpacity
                style={styles.textInputStyle}
                onPress={()=>stateRef.current.open()}
                disabled={!IsToggle}
            >
                {/* <View style={{flexDirection: 'row'}}> */}
                <Text style={{top:hp("1.5%"),marginLeft:wp("1%")}}>{SelectState}</Text>
                
                {/* <Image source={AppImages.arrowDown} style={styles.dropDownImageStyle}/> */}
               
                {/* </View> */}
            </TouchableOpacity>
            <Text style={styles.formTextStyle}>City</Text>
            <TouchableOpacity
                style={styles.textInputStyle}
                onPress={()=>cityRef.current.open()}
                disabled={!IsToggle}
            >
                <Text style={{top:hp("1.5%"),marginLeft:wp("1%")}}>{SelectCity}</Text>
            </TouchableOpacity>
            {
                IsToggle ?
                <View style={{flexDirection:"row",marginTop:hp("5%"),marginHorizontal:10,justifyContent: 'center'}}>
            <TouchableOpacity style={styles.buttonStyle} onPress={() =>updateProfile()}>
                <Text style={styles.btnTextStyle}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={{
                    borderColor:AppColor.colorPrimary,
                    borderWidth:2,
                    marginLeft:5,
                    paddingHorizontal:20,
                    width:wp("40%"),
                    borderRadius:10
                    
            }}
            onPress={()=>setIsToggle(false)}
            >
                <Text style={styles.btnTextStyle}>Cancel</Text>
            </TouchableOpacity>
            
            </View>
        
        :
        null
            }
        
    </View>
    </ScrollView>
    <PickerComponent 
                data={States}
                ref={stateRef}
                title={"Select State"}
                labelExtractor={(item)=>{
                    return item.name
                }}
                selectedValue={SelectState}
                onChangeItem={(item)=>{
                    stateCheck(item)
                    
            }}/>
    <PickerComponent 
                data={Cities}
                ref={cityRef}
                title={"Select City"}
                labelExtractor={(item)=>{
                    console.log(item,"i")
                    return item.name
                }}
                selectedValue={SelectCity}
                onChangeItem={(item)=>{
                    cityCheck(item)
                    
            }}/>
    </View>
    </>
        
    
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
        color:AppColor.colorBlueDark
    },
    containerStyle:{
        margin:10,
        marginBottom:hp("30%")
    },
    formTextStyle:{
        fontSize:15,
        marginVertical:10,
        fontWeight: 'bold',
        marginHorizontal:10,
        color:AppColor.colorBlueDark
    },
    textInputStyle:{
        borderRadius:10,
        backgroundColor:AppColor.colorGrayBackground,
        margin:5,
        height : hp('6.2%')
    },
    buttonStyle:{
        backgroundColor:AppColor.colorPrimary,
        paddingHorizontal:20,
        width:wp("40%"),
        borderRadius:10
    },
    btnTextStyle:{
        fontSize:16,
        padding:10,
        color:AppColor.colorBlueDark,
        fontWeight:"bold",
        textAlign:"center"
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
        top : 10,
        
    },
      placeHolderTextStyle: {
        color: '#3D3D3D',
        paddingHorizontal: 8,
        top:10,
        width: wp('35%'),
        fontSize: hp('2%'),
      },
      dropDownImageStyle: {
        //alignSelf: "flex-end",
        //left:wp("12%"),
        width: wp('4%'),
        height: hp('2.5%'),
        marginLeft:wp("45%"),
        //bottom : 10, 
        //right : 5,
        marginTop: hp("1.7%"),
        //marginHorizontal : wp("2%"),
        marginVertical:hp("1%")
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
        // flexDirection: 'row',
        height: hp('6.5%'),
        width: wp('83%'),
       
        borderRadius:10,
        backgroundColor: AppColor.colorGrayBackground,
        
        // justifyContent: 'center',
        // alignItems: 'center',
      },
})

const mapStateToProps = (state) => ({
    userData: state.UserReducer.userData,
    parentDetails : state.UserReducer.parentDetails
})
export default connect(mapStateToProps)(ParentProfile)

