import React,{useState,useEffect,useRef} from "react"
import {Text,View,StyleSheet,SafeAreaView,TextInput,TouchableOpacity,ScrollView,Image} from "react-native"
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
import PickerComponent from '../../commonComponents/pickerComponent'

const TextInputForms = ({changeText,Styles,keyBoardType,MaxLength,SecureTextEntry,defaultValue}) => {
    //"name-phone-pad"
    //"number-pad"
    return(
        <>
            <TextInput
                onChangeText={changeText}
                style={Styles}
                keyboardType={keyBoardType}
                maxLength={MaxLength}
                defaultValue={defaultValue}
                secureTextEntry={SecureTextEntry}
            />
        </>
    )
}
const AddChildrenFormScreen = ({navigation,studentDetails,userSubscriptionDetails}) => {
        const isStudentDetailsFetched = navigation.getParam("studentDetailsFetched")
        const subscriptions = navigation.getParam("subscriptions")
        
        const gradePicker = useRef()
        const genderPicker = useRef()
        const subscriptionPicker = useRef()
    const CheckGender = [
      {
      id:1,
      gender:"Male"
      },
      {
      id:2,
      gender:"Female"
      }
  ]
    const Grade = [
      {
      id:1,
      grade:"Class XI"
      },
      {
      id:2,
      grade:"Class XII"
      }
  ]
  const Subscription = [
    {
    id:0,
    subscriptionName : "Surge"
  },
    {
    id:1,
    subscriptionName : "Upswing"
  }
]

    let statesList = []
    let citiesList = []
    const [FirstName,setFirstName]= useState(isStudentDetailsFetched == true ? studentDetails.user_firstname : null)
    const [LastName,setLastName]= useState( isStudentDetailsFetched == true ? studentDetails.user_lastname : null)
    const [InstituteName,setInstituteName]= useState(isStudentDetailsFetched == true ? studentDetails.institute != null ? studentDetails.institute : "" : null)
    
    const [ContactNumber,setContactNumber]= useState( isStudentDetailsFetched == true ? studentDetails.user_mobile: null)
    const [EmailId,setEmailId]= useState(isStudentDetailsFetched == true ? studentDetails.user_email : null)
    const [Password,setPassword] = useState()
    const [States,setStates] = useState([])
    const [Cities,setCities] = useState([])
    const [SelectGender,setSelectGender] = useState(isStudentDetailsFetched == true ? studentDetails.gender!=null?studentDetails.gender:"Male":null)
    const [SelectGrade,setSelectGrade] = useState(isStudentDetailsFetched == true ? studentDetails.user_courses_id !=null? studentDetails.user_courses_id : "Class XII" : null)
    
   
    const [SelectState,setSelectState] = useState(isStudentDetailsFetched == true ? studentDetails.state_name : null)
    const [SelectCity,setSelectCity] = useState(isStudentDetailsFetched == true ? studentDetails.city_name : null)
    const [choosenIndexState,setChooseIndexState] = useState(isStudentDetailsFetched == true ? studentDetails.state_id : null)
    const [choosenIndexCity,setChooseIndexCity] = useState(isStudentDetailsFetched == true ? studentDetails.user_city_id : null)
    const [CheckNetwork,setCheckNetwork] = useState(false)
    const [Loading,setLoading] = useState(false)
    const [Checked,setChecked] = useState(0)
    const [subscriptionData,setSubscriptionData] = useState([])
    const [checkedClass,setcheckedClass]= useState(0)
    const [SelectSubscription,setSelectSubscription] = useState(subscriptions.length > 0 ? subscriptions[subscriptions.length -1].course_title : subscriptionData.length > 0 ? subscriptionData[0].course_title : "Surge")
    
    const checkParentSubscription = async () => {
        const token = await AsyncStorage.getItem('userToken')
        if(subscriptions.length === 0){
            APICaller("subscription",undefined, 'GET', token)
            .then(({data})=>{
                console.log(data,"from check parent function 'Add children form screen'",subscriptions)
                if(data.response == "success" && data.data.length>0){
                    setSubscriptionData(data.data)
                }
            })
            .catch(err => {
                console.log(err)
            })
        }
        else if(subscriptions.length>0){
            setSubscriptionData(subscriptions)
        }
    }
    
    const addChildren = async () => {
      setLoading(true)
      const token = await AsyncStorage.getItem('userToken');
      console.log(token,"token")
      if(isStudentDetailsFetched == true){
          
        const body = {
         mobile : ContactNumber
        }
        APICaller("link_user_otp",body,'POST',token)
            .then(response =>{
           
                setLoading(false)
                if(response.data.response == 'success'){
                    navigation.navigate("StudentOtp",{userId:studentDetails.user_id})
                }
                else{
                    alert(response.data.message)
                }
            })
            .catch(err=>{
                console.log(err,"error")
            })
      }
      else{
      
            const body = {
                type : 1,
               
            
                    firstname: FirstName,
                    lastname: LastName,
                    email: EmailId,
                    mobile: ContactNumber,
                    grade: SelectGrade,
                    institute: InstituteName,
                    gender: SelectGender,
                    //dob: userProfile.dob,
                    password: Password,
                    state: choosenIndexState,
                    city: choosenIndexCity
            }
          APICaller("addParentStudent",body,'POST',token)
          .then(({data})=>{
              setLoading(false)
              console.log(data,"from line 158")
            if(data.response == 'success'){
                navigation.navigate("StudentOtp",{userId:data.user_id})
            }
            else{
                alert("Something went wrong, Please try again")
            }
          })
          .catch(err=>{
              console.log(err,"line 147")
          })
      }
  }
    const radiobtncheckClass = (key, data) => {
        setcheckedClass(key)
    }
    const genderCheck = (index,item)=>{
      console.log(item,"gender")
      setSelectGender(item.gender)
      
    }
    const checkForNetwork = async () => {
        let checkNet = await getNetwork()
        setCheckNetwork(checkNet)
        
    } // check network connection 
    const updateState = async () => {
        let checkNet = await unsubscribe()
        setCheckNetwork(checkNet)
        
    } // unsubscribe the listener
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
    

    const stateCheck = (itemPosition, itemValue) => {
        
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
    const cityCheck = (itemPosition, itemValue) => {
        console.log('City Check ' + itemValue.id);
        if (itemValue.id === 0) {
            setSelectCity("")
            setChooseIndexCity(itemValue.id)
        } else {
            setSelectCity(itemValue.name)
            setChooseIndexCity(itemValue.id)
          
        }
      };
      useEffect(()=>{
        checkForNetwork()
        checkParentSubscription()
        updateState()
        getState()
    },[])
    return(
<>
<HeaderComponent/>
    <Loader loading={Loading}/>
    <SafeAreaView style={{flex:1,backgroundColor:"white"}}>
        <View style={{margin:20}}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.TopTextStyle}>Link with your child</Text>
            <View style={{ borderBottomWidth: 4, borderBottomColor: AppColors.colorAccent ,marginTop:5,marginLeft:10,width:wp("37%")}}/>
            {/* <Text style={[styles.TopTextStyle,{marginTop:30}]}>Student-3</Text> */}
                <Text style={[styles.TopTextStyle,{fontSize:15}]}>First Name</Text>
                    <TextInputForms
                        defaultValue={FirstName}
                        Styles={styles.textInputStyle}
                        changeText={(name)=>setFirstName(name.replace(/[^A-Za-z,\s]/g, '')
                        .replace(/[,.]/g, ''))}
                        keyBoardType="name-phone-pad"
                        MaxLength={20}
                        SecureTextEntry={false}
                    />
                <Text style={[styles.TopTextStyle,{fontSize:15}]}>Last Name</Text>
                <TextInputForms
                        defaultValue={LastName}
                        Styles={styles.textInputStyle}
                        changeText={(name)=>setLastName(name.replace(/[^A-Za-z,\s]/g, '')
                        .replace(/[,.]/g, ''))}
                        keyBoardType="name-phone-pad"
                        MaxLength={20}
                        SecureTextEntry={false}
                    />
                    <Text style={[styles.TopTextStyle,{fontSize:15}]}>Gender</Text>
                    <TouchableOpacity 
                    style={[styles.textInputStyle,{padding:14}]}
                    onPress={()=>genderPicker.current.open()}>
                        <Text>{SelectGender}</Text>
                    </TouchableOpacity>
                <Text style={[styles.TopTextStyle,{fontSize:15}]}>Grade</Text>
                <TouchableOpacity 
                    style={[styles.textInputStyle,{padding:14}]}
                    onPress={()=>gradePicker.current.open()}>
                        <Text>{SelectGrade}</Text>
                    </TouchableOpacity>
                <Text style={[styles.TopTextStyle,{fontSize:15}]}>Institute</Text>
                <TextInputForms
                        Styles={styles.textInputStyle}
                        defaultValue={InstituteName}
                        changeText={(name)=>setInstituteName(name.replace(/[^A-Za-z,\s]/g, '')
                        .replace(/[,.]/g, ''))}
                        keyBoardType="name-phone-pad"
                        MaxLength={50}
                        SecureTextEntry={false}
                    />
                 <Text style={[styles.TopTextStyle,{fontSize:15}]}>Email</Text> 
                <TextInputForms
                        Styles={styles.textInputStyle}
                        changeText={(name)=>setEmailId(name)}
                        keyBoardType="name-phone-pad"
                        MaxLength={40}
                        SecureTextEntry={false}
                        defaultValue={EmailId}
                    />
                
                {
                    ! isStudentDetailsFetched?
                    <>
                    <Text style={[styles.TopTextStyle,{fontSize:15}]}>Password</Text>
                    <TextInputForms
                        Styles={styles.textInputStyle}
                        changeText={(name)=>setPassword(name)}
                        //keyBoardType="name-phone-pad"
                        MaxLength={20}
                        SecureTextEntry={true}
                    /> 
                    </>
                    :
                    null
                }
                
                
                
                {/* <Text style={[styles.TopTextStyle,{fontSize:15}]}>DOB</Text>
                <TextInputForms
                        Styles={styles.textInputStyle}
                        changeText={(name)=>setDOB(name)}
                        keyBoardType="name-phone-pad"
                        MaxLength={20}
                        SecureTextEntry={false}
                    /> */}
                <Text style={[styles.TopTextStyle,{fontSize:15}]}>Mobile Number</Text> 
                <TextInputForms
                        Styles={styles.textInputStyle}
                        changeText={(name)=>setContactNumber(name)}
                        keyBoardType="number-pad"
                        MaxLength={10}
                        SecureTextEntry={false}
                        defaultValue={ContactNumber}
                    />
               
                {/* <Text style={[styles.TopTextStyle,{fontSize:15}]}>Password</Text> 
                <TextInputForms
                        Styles={styles.textInputStyle}
                        changeText={(name)=>setPassword(name)}
                        keyBoardType="name-phone-pad"
                        MaxLength={20}
                        SecureTextEntry={true}
                    /> */}
                <Text style={[styles.TopTextStyle,{fontSize:15}]}>State</Text> 
                <RNPicker
                dataSource={States}
                defaultValue={true}
                pickerTitle={'State'}
                showSearchBar={false}
                disablePicker={false}
                changeAnimation={'none'}
                searchBarPlaceHolder={'Search.....'}
                showPickerTitle={true}
                searchBarContainerStyle={styles.searchBarContainerStyle}
                pickerStyle={styles.pickerStyle}
                itemSeparatorStyle={styles.itemSeparatorStyle}
                pickerItemTextStyle={styles.listTextViewStyle}
                selectedLabel={SelectState}
                placeHolderLabel={"Select State"}
                scrollEnabled={false}
                selectLabelTextStyle={styles.selectLabelTextStyle}
                placeHolderTextStyle={styles.placeHolderTextStyle}
                dropDownImageStyle={styles.dropDownImageStyle}
                dropDownImage={AppImages.arrowDown}
                
                selectedValue={(index, item) =>
                  stateCheck(index, item)
                }
            />
            <Text style={[styles.TopTextStyle,{fontSize:15}]}>City</Text>
            <RNPicker
                dataSource={Cities}
                defaultValue={true}
                pickerTitle={'Cities'}
                
                showSearchBar={false}
                disablePicker={false}
                changeAnimation={'none'}
                searchBarPlaceHolder={'Search.....'}
                showPickerTitle={true}
                searchBarContainerStyle={styles.searchBarContainerStyle}
                pickerStyle={styles.pickerStyle}
                itemSeparatorStyle={styles.itemSeparatorStyle}
                pickerItemTextStyle={styles.listTextViewStyle}
                selectedLabel={SelectCity}
                placeHolderLabel={"Select City"}
                scrollEnabled={false}
                selectLabelTextStyle={styles.selectLabelTextStyle}
                placeHolderTextStyle={styles.placeHolderTextStyle}
                dropDownImageStyle={styles.dropDownImageStyle}
                dropDownImage={AppImages.arrowDown}
                selectedValue={(index, item) =>
                  cityCheck(index, item)
                }
            />
            {
                subscriptions.length > 0 ?  
                <Text style={[styles.TopTextStyle,{fontSize:15,color:"black"}]}>Student already have subscription for "{subscriptions[subscriptions.length -1].course_title}"</Text>
                :
                subscriptionData.length>0? //if parent has subscription show subscription data otherwise show 
                
                <>
            <Text style={[styles.TopTextStyle,{fontSize:15}]}>Subscription</Text>
            <TouchableOpacity 
                    style={[styles.textInputStyle,{padding:14}]}
                    onPress={()=>subscriptionPicker.current.open()}>
                        <Text>{SelectSubscription}</Text>
                    </TouchableOpacity>
            </>
                
                :
                <Text style={[styles.TopTextStyle,{fontSize:15,color:"black"}]}>Please buy a subscription before linking a course</Text>
            }
                <View style={{marginVertical:20,marginBottom:30,marginHorizontal:10,flexDirection: 'row'}}>
                    <View style={{width:wp("40%"),margin:5}}>
                        <TouchableOpacity
                          disabled={subscriptions.length>0 || subscriptionData.length>0 ? false : true}
                          onPress={() =>addChildren()}
                            style={{
                                backgroundColor:AppColors.colorPrimary,
                                borderRadius:10,
                                padding:6
                            }}
                        >
                            <Text
                                style={{
                                    color:AppColors.colorBlueDark,
                                    textAlign:"center",
                                    padding:5,
                                    fontWeight:"bold"
                                }}
                            >Confirm</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{width:wp("40%"),margin:5}}>
                        <TouchableOpacity
                            style={{borderColor:AppColors.colorPrimary,borderWidth:2,borderRadius:10,padding:5}}
                            onPress={() =>navigation.goBack()}
                        >
                            <Text
                                style={{
                                    color:AppColors.colorBlueDark,
                                    textAlign:"center",
                                    padding:5
                                }}
                            >Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View> 
            </ScrollView>
            <PickerComponent 
                    data={CheckGender}
                    ref={genderPicker}
                    title={"Select Gender"}
                    labelExtractor={(item)=>{
                        console.log(item,"wine")
                        return item.gender
                    }}
                    selectedValue={SelectGender}
                    onChangeItem={(item)=>{
                        console.log(item,"wines")
                      setSelectGender(item.gender)
                  }}
                  />
            <PickerComponent 
                    data={Grade}
                    ref={gradePicker}
                    title={"Select Grade"}
                    labelExtractor={(item)=>{
               
                        return item.grade
                    }}
                    selectedValue={SelectGrade}
                    onChangeItem={(item)=>{
                        
                      setSelectGrade(item.grade)
                  }}
                  />
            <PickerComponent 
                    data={subscriptionData}
                    ref={subscriptionPicker}
                    title={"Select Subscription"}
                    labelExtractor={(item)=>{
               
                        return item.course_title
                    }}
                    selectedValue={SelectSubscription}
                    onChangeItem={(item)=>{
                        
                      setSelectSubscription(item.course_title)
                  }}
                  />
        </View>
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
    textInputStyle:{
        backgroundColor:AppColors.colorGrayBackground,
        borderRadius: 10,
        marginVertical:5,
        marginHorizontal:8,
        height:hp('6.2%')
    },
    containerStyle:{
        margin:20
    },
    formTextStyle:{
        fontSize:15,
        marginVertical:10,
        fontWeight: 'bold',
        marginHorizontal:10,
        color:AppColors.colorBlueDark
    },
    buttonStyle:{
        backgroundColor:AppColors.colorPrimary,
        paddingHorizontal:20,
        width:wp("40%"),
        borderRadius:10
    },
    btnTextStyle:{
        fontSize:16,
        padding:10,
        color:AppColors.colorBlueDark,
        fontWeight:"bold",
        textAlign:"center"
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
      pickerStyle: {
        backgroundColor:AppColors.colorGrayBackground,
        margin:10,
        borderRadius:10,
        width:wp("85%")
        //color: '#000',
        // justifyContent: 'center',
        // alignItems: 'center',
      },
      itemSeparatorStyle: {
        height: 1,
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#D3D3D3',
      },
      listTextViewStyle: {
        color: 'black',
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
      dropDownImageStyle: {
        justifyContent: "space-around",
        width: wp('4%'),
        height: hp('4%'),
        alignSelf:"flex-end",
        marginHorizontal: 10,
        bottom:hp("1%"),
        right:wp("2%")
      },
      selectLabelTextStyle: {
        color: '#000',
        //justifyContent: "space-evenly",
        marginHorizontal: 10,
        top:10,
        // alignItems: 'center',
        // alignContent: 'center',
        
        paddingHorizontal: 8,

        
        fontSize: hp('2%'),
      },
      placeHolderTextStyle: {
        color: '#3D3D3D',
        top:10,
        paddingHorizontal: 8,
        width: wp('35%'),
        fontSize: hp('2%'),
      },
      btn: {
        flexDirection: 'row',
        marginLeft: wp('4%'),
        //marginBottom:wp('4%')
      },
      img: {
        height: 20,
        width: 20,
        alignSelf: 'center',
        marginLeft: wp('1%'),
      },
})
const mapStateToProps = (state) => ({
  userData: state.UserReducer.userData,
  studentDetails : state.UserReducer.studentDetails,
  userSubscriptionDetails : state.UserReducer.userSubscriptionDetails
})
export default connect(mapStateToProps)(AddChildrenFormScreen) ;