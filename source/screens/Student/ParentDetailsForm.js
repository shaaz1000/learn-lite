import React,{useState,useEffect} from "react"
import {Text,View,StyleSheet,SafeAreaView,TextInput,ScrollView,TouchableOpacity} from "react-native"
import HeaderComponent from '../../commonComponents/headerComponent'
import AppColor from '../../utilities/AppColor';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen"
import RNPicker from 'rn-modal-picker';
import Loader from '../../commonComponents/loader'
import APICaller from '../../utilities/apiCaller'
import Images from "../../assets/Image"
import {unsubscribe, getNetwork} from "../../utilities/CheckNetwork"
import {connect} from "react-redux"
import AsyncStorage from '@react-native-community/async-storage'

const ParentDetailsForm = ({navigation,userData}) => {
    const {isParentDetailsFetched,data} = navigation.state.params
    // console.log(userData,"data")
    // console.log('nav params',navigation.state.params)
    let statesList = []
    let citiesList = []
    
    const [FirstName,setFirstName] = useState(isParentDetailsFetched===true?data.user_firstname: null)
    const [LastName,setLastName] = useState(isParentDetailsFetched===true?data.user_lastname: null)
    const [EmailId,setEmailId] = useState(isParentDetailsFetched===true?data.user_email: null)
    const [Password,setPassword] = useState("")
    const [ContactNo,setContactNo] = useState(isParentDetailsFetched===true?data.user_mobile: null)
    const [States,setStates] = useState([])
    const [Cities,setCities] = useState([])
    const [SelectState,setSelectState] = useState(isParentDetailsFetched===true?data.state_name:null)
    const [SelectCity,setSelectCity] = useState(isParentDetailsFetched===true?data.city_name: null)
    const [choosenIndexState,setChooseIndexState] = useState(isParentDetailsFetched===true?data.user_state_id: null)
    const [choosenIndexCity,setChooseIndexCity] = useState(isParentDetailsFetched===true?data.user_city_id: null)
    const [CheckNetwork,setCheckNetwork] = useState(false)
    const [Loading,setLoading] = useState(false)
    const [Checked,setChecked] = useState(0)
   
    const checkForNetwork = async () => {
        let checkNet = await getNetwork()
        setCheckNetwork(checkNet)
        
    } // check network connection 
    const updateState = async () => {
        let checkNet = await unsubscribe()
        setCheckNetwork(checkNet)
        
    } // unsubscribe the listener

    const updateProfile = async () => {
        setLoading(true)
        const token = await AsyncStorage.getItem('userToken');
        console.log(token,"token")
        
        if(
            FirstName==="" || 
            LastName === "" || 
            EmailId==="" || 
            ContactNo === "" || 
            
            SelectState === "" ||
            SelectCity === ""
        )
        {
            alert("Please fill all the details")
            setLoading(false)
        }
        else{
            
            if(isParentDetailsFetched === true) {
                console.log('if wali api',isParentDetailsFetched)
                 const body = {
                    // type: 2,
                    // firstname: FirstName,
                    // lastname: LastName,
                    // email: EmailId,
                    mobile: ContactNo,
                    //grade: userProfile.user_courses_id,
                    //institute: userProfile.institute,
                    //gender: selectedGender,
                    //dob: userProfile.dob,
                    //Password:Password,
                    // state: SelectState,
                    // city: SelectCity
                }
                
                APICaller("link_user_otp",body,'POST',token)
        .then(response =>{
                console.log(response.data,"it is called upar",data.user_id)
            setLoading(false)
            if(response.data.response == 'success'){
                navigation.navigate("ParentOtp",{userId:data.user_id})
            }
            else{
                alert("Something went wrong, Please try again")
            }
        })
        .catch(err=>{
            console.log(err,"error")
        })
            }
            else{
                console.log('esle wali api')
                   
                 const body = {
                    type: 2,
                    firstname: FirstName,
                    lastname: LastName,
                    email: EmailId,
                    mobile: ContactNo,
                    //grade: userProfile.user_courses_id,
                    //institute: userProfile.institute,
                    //gender: selectedGender,
                    //dob: userProfile.dob,
                    password:Password,
                    state: choosenIndexState,
                    city: choosenIndexCity
                }
                APICaller("addParentStudent",body,'POST',token)
        .then(response =>{
            console.log(response.data,"reponse aajana")
            //    console.log(response.data,"reponse aaja")
            //    console.log(response.data,"reponse aaja")
               console.log(response.data,"reponse aajana")
            setLoading(false)
            if(response.data.code == 400){
                alert(`${response.data.message.mobile.toString()}`)
                
            }
            else if(response.data.response == "success"){
                navigation.navigate("ParentOtp",{userId:data.user_id})
            }
            // if(response.data.response == 'success'){
            //   navigation.navigate("ParentOtp")
            //    alert("Something went wrong, Please try again")
            // }
            // if(reponse.response == 'success'){
            //   navigation.navigate("ParentOtp")
            //    alert("Something went wrong, Please try again")
            // }
            
        })
        .catch(err=>{
            console.log(err,"error")
        })
            }
            
        }
        
    } // update parent profile

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
    

    const stateCheck = (itemPosition, itemValue) => {
        console.log('State Check ' + itemValue.id);
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

        updateState()
        getState()
    },[])
    return (
        <>
<HeaderComponent />
<SafeAreaView style={{flex: 1,backgroundColor:"white"}}>
    <ScrollView showsVerticalScrollIndicator={false}>
    <Loader loading={Loading}/>
    <View style={styles.containerStyle}>
        <Text style={styles.TopTextStyle}>Parent details</Text>
        <View style={{ borderBottomWidth: 4, borderBottomColor: AppColor.colorAccent ,marginTop:5,marginLeft:10,width:wp("27%")}}/>
            <Text style={[styles.formTextStyle,{marginTop:20}]}>First Name</Text>
                <TextInput
                    defaultValue={
                        userData.user_type === 2 ? 
                            userData.user_firstname 
                            : 
                            isParentDetailsFetched===true?
                            data.user_firstname
                            : 
                            null
                        }
                    
                    style={styles.textInputStyle}
                    onChangeText={(FName)=>setFirstName(FName.replace(/[^A-Za-z,\s]/g, '')
                    .replace(/[,.]/g, ''))}
                />
            <Text style={styles.formTextStyle}>Last Name</Text>
                <TextInput
                    defaultValue={userData.user_type === 2 ? 
                        userData.user_lastname 
                         
                        : 
                            isParentDetailsFetched===true?
                            data.user_lastname
                            : 
                            null
                    }
                    onChangeText={(LName)=>{
                        setLastName(LName.replace(/[^A-Za-z,\s]/g, '')
                        .replace(/[,.]/g, ''))
                    }}
                    style={styles.textInputStyle}
                />
            <Text style={styles.formTextStyle}>Email Id</Text>
                <TextInput
                    defaultValue={
                        userData.user_type === 2 
                        ? 
                        userData.user_email 
                        : 
                            isParentDetailsFetched===true?
                            data.user_email
                            : 
                            null
                    }
                    onChangeText={(EmailId)=>setEmailId(EmailId)}
                    style={styles.textInputStyle}
                />
            {
                isParentDetailsFetched===false?
                <>
                <Text style={styles.formTextStyle}>Password</Text>
                <TextInput
                    secureTextEntry={true}
                    onChangeText={(Password)=>setPassword(Password)}
                    style={styles.textInputStyle}
                />
                </>
                :
                null
            }
            
            <Text style={styles.formTextStyle}>Contact No.</Text>
                <TextInput
                    defaultValue={userData.user_type === 2 ? 
                        userData.user_mobile 
                        : 
                        isParentDetailsFetched===true?
                        data.user_mobile
                        : 
                        null}
                    keyboardType="number-pad"
                    maxLength={10}
                    onChangeText={(MobileNumber)=>setContactNo(MobileNumber)}
                    style={styles.textInputStyle}
                />
            <Text style={styles.formTextStyle}>State</Text>
            <RNPicker
                dataSource={States}
                defaultValue={false}
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
                placeHolderLabel={SelectState}
                scrollEnabled={false}
                selectLabelTextStyle={styles.selectLabelTextStyle}
                placeHolderTextStyle={styles.placeHolderTextStyle}
                dropDownImageStyle={styles.dropDownImageStyle}
                dropDownImage={Images.arrowDown}
                
                selectedValue={(index, item) =>
                    
                    stateCheck(index, item)
                    
                }
            />
            <Text style={styles.formTextStyle}>City</Text>
            <RNPicker
                dataSource={Cities}
                defaultValue={false}
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
                placeHolderLabel={SelectCity}
                scrollEnabled={false}
                selectLabelTextStyle={styles.selectLabelTextStyle}
                placeHolderTextStyle={styles.placeHolderTextStyle}
                dropDownImageStyle={styles.dropDownImageStyle}
                dropDownImage={Images.arrowDown}
                selectedValue={(index, item) =>
                  cityCheck(index, item)
                }
            />
        <View style={{marginTop:10,flexDirection:"row",marginTop:15,marginHorizontal:10,justifyContent: 'center',}}>
            <TouchableOpacity style={styles.buttonStyle} onPress={() =>{
                updateProfile()
                //navigation.navigate("ParentOtp")
            }}>
                <Text style={styles.btnTextStyle}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={()=>navigation.goBack()}
                style={{
                    borderColor:AppColor.colorPrimary,
                    borderWidth:2,
                    marginLeft:5,
                    paddingHorizontal:20,
                    width:wp("40%"),
                    borderRadius:10
            }}>
                <Text style={styles.btnTextStyle}>Cancel</Text>
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
        color:AppColor.colorBlueDark
    },
    containerStyle:{
        margin:20
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
        margin:10,
        height:hp('6.2%')
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
        backgroundColor:AppColor.colorGrayBackground,
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
      dropDownImageStyle: {
        justifyContent: "center",
        width: wp('4%'),
        height: hp('4%'),
        alignSelf: "flex-end",
        marginHorizontal: 10,
        bottom:5,
        right:5
      },
      selectLabelTextStyle: {
        color: '#000',
        textAlign: 'left',
        justifyContent:"center",
        top:hp("2%"),
        left : 5,
        // alignSelf: 'center',
         //alignItems: 'center',
        // alignContent: 'center',
        paddingHorizontal: 8,
        //width: wp('100%'),
        
        fontSize: hp('2%'),
      },
      placeHolderTextStyle: {
        color: 'black',
        paddingHorizontal: 8,
        width: wp('35%'),
        fontSize: hp('2%'),
        //paddingTop:10,
        top:hp("2%"),
        left : 5,
        textAlignVertical:"center"
      },
})
const mapStateToProps = (state) => ({
    userData: state.UserReducer.userData
})
export default connect(mapStateToProps)(ParentDetailsForm)