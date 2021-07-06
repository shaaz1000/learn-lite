import React,{useState,useEffect} from "react"
import {Text,View,StyleSheet,SafeAreaView,TextInput,ScrollView,TouchableOpacity} from "react-native"
import HeaderComponent from '../commonComponents/headerComponent'
import AppColor from '../utilities/AppColor';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen"
import RNPicker from 'rn-modal-picker';
import Loader from '../commonComponents/loader'
import APICaller from '../utilities/apiCaller'
import Images from "../assets/Image"
import {unsubscribe, getNetwork} from "../utilities/CheckNetwork"

const ParentDetailsForm = ({navigation}) => {
    let statesList = []
    let citiesList = []
    const [FirstName,setFirstName] = useState("")
    const [LastName,setLastName] = useState("")
    const [EmailId,setEmailId] = useState("")
    const [Password,setPassword] = useState("")
    const [ContactNo,setContactNo] = useState("")
    const [States,setStates] = useState([])
    const [Cities,setCities] = useState([])
    const [SelectState,setSelectState] = useState("")
    const [SelectCity,setSelectCity] = useState("")
    const [choosenIndexState,setChooseIndexState] = useState(0)
    const [choosenIndexCity,setChooseIndexCity] = useState(0)
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

        updateState()
        getState()
    },[])
    return (
        <>

    <View style={styles.containerStyle}>
        {/* <Text style={styles.TopTextStyle}>Parent details</Text>
        <View style={{ borderBottomWidth: 4, borderBottomColor: AppColor.colorAccent ,marginTop:5,marginLeft:10,width:wp("27%")}}/> */}
            <Text style={[styles.formTextStyle,{marginTop:20}]}>First Name</Text>
                <TextInput
                    style={styles.textInputStyle}
                    onPress={(FName)=>setFirstName(FName).replace(/[^A-Za-z,\s]/g, '')
                    .replace(/[,.]/g, '')}
                />
            <Text style={styles.formTextStyle}>Last Name</Text>
                <TextInput
                    onPress={(LName)=>{
                        setLastName(LName.replace(/[^A-Za-z,\s]/g, '')
                        .replace(/[,.]/g, ''))
                    }}
                    style={styles.textInputStyle}
                />
            <Text style={styles.formTextStyle}>Email Id</Text>
                <TextInput
                    onPress={(EmailId)=>setEmailId(EmailId)}
                    style={styles.textInputStyle}
                />
            <Text style={styles.formTextStyle}>Password</Text>
                <TextInput
                    secureTextEntry={true}
                    onPress={(Password)=>setPassword(Password)}
                    style={styles.textInputStyle}
                />
            <Text style={styles.formTextStyle}>Contact No.</Text>
                <TextInput
                    keyboardType="number-pad"
                    maxLength={10}
                    onPress={(MobileNumber)=>setContactNo(MobileNumber.replace(/[^A-Za-z,\s]/g, '')
                    .replace(/[,.]/g, ''))}
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
        {/* <View style={{marginTop:10,flexDirection:"row",marginTop:15,marginHorizontal:10,justifyContent: 'center',}}>
            <TouchableOpacity style={styles.buttonStyle} onPress={() =>navigation.navigate("ParentProfile")}>
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
            }}>
                <Text style={styles.btnTextStyle}>Cancel</Text>
            </TouchableOpacity>
            
        </View> */}
    </View>
   
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
        margin:10
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
        width:wp("80%")
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
        justifyContent: "space-around",
        width: wp('4%'),
        height: hp('4%'),
        alignSelf:"flex-end",
        marginHorizontal: 10
      },
      selectLabelTextStyle: {
        color: '#000',
        justifyContent: "space-evenly",
        alignSelf: "baseline",
      
        // alignItems: 'center',
        // alignContent: 'center',
        
        paddingHorizontal: 8,

        
        fontSize: hp('2%'),
      },
      placeHolderTextStyle: {
        color: '#3D3D3D',
        paddingHorizontal: 8,
        width: wp('35%'),
        fontSize: hp('2%'),
      },
})

export default ParentDetailsForm