import React, { useEffect, useRef, useState } from 'react';
import {
    Alert,
    StyleSheet,
    TextInput,
    View,
    Text,
    ScrollView,
    Image,
    Keyboard,
    TouchableOpacity,
    KeyboardAvoidingView,
    ImageBackground,
    Platform,
    Picker,
    Modal,
    UIManager,
    SafeAreaView
} from 'react-native';
import { connect } from 'react-redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Loader from '../../commonComponents/loader';
import Storage from '../../utilities/Storage';
import * as UpdateProfileApi from '../../services/Auth';
import * as StatesApi from '../../services/State';
import DatePicker from 'react-native-datepicker';
import HeaderComponent from '../../commonComponents/headerComponent'
import normalize from '../../utilities/UtilityMethods';
import PickerComponent from '../../commonComponents/pickerComponent'
import APICaller from '../../utilities/apiCaller';
import color, { colorBlueDark } from '../../utilities/AppColor';
import AsyncStorage from '@react-native-community/async-storage'
import * as userActions from "../../redux/actions/user"
import { withNavigationFocus } from 'react-navigation';
const StudentProfile = (props) => {

    //console.log(props.userData,"user")
    const [userProfile, setUserProfile] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [isEdit, setIsEdit] = useState(false)
    const [cityData,setCityData] = useState([])
    const [stateData,setStateData] = useState([])
    const [selectedGender,setSelectedGender] = useState('');
    const [selectedState,setSelectedState] = useState({name:""})
    const [selectedCity,setSelectedCity] = useState({name:""})
    const [parentId,setParentId] = useState("")
    const stateRef = useRef();
    const cityRef = useRef();
    const genderRef = useRef()
    
    useEffect(() => {
        //console.log('use effect wrking');
       
        //setIsLoading(true)
        fetchProfile();
    }, [props.isFocused])

    
    //console.log(userProfile,"user profile screen 56 from student profile")
    const fetchProfile = async () => {
        
        
        
        //setIsLoading(true)
        const token = await AsyncStorage.getItem('userToken');
        APICaller('profile', undefined, 'GET', token).then(response => {
            setIsLoading(false)
            if (response.status == 201 || response.status == 200) {
                const { data } = response;
                const { user } = data
                //console.log(user,"useer")
                if(user.parent_id != null){
                    setParentId(user.parent_id)
                    getParentDetails(user.parent_id)
                }
               
                setUserProfile(user)
                props.dispatch(userActions.setUserData(user))
                setSelectedGender(user.gender)
                setSelectedState({id:user.state_id,name:user.state_name})
                setSelectedCity({id:user.city_id,name:user.city_name})
                getState();
                
            } else {
                alert('Something went wrong, Please try again')
                //setIsLoading(false)
            }

        }).catch(err => {
            console.log('error>>', err)
            //setIsLoading(false)

        })
    }

    const getParentDetails = async (parentId) => {
        const token = await AsyncStorage.getItem('userToken')
        // console.log("token")
        // console.log(parentId)
            //setIsLoading(true)
            const body = {
                id : parentId
            }
            APICaller("parent_profile_by_id",body,'POST',token)
            .then(response1=>{
                const {user,response} = response1.data
                //setIsLoading(false)
                if(response == "success"){
                    props.dispatch(userActions.setParentDetails(user))
                   
                }
                else{
                    alert("Failed to get parent details")
                }
            })
            .catch(err=>{
                console.log(err,"err")
            })
        
    }

    const _toggleEdit = () => {
        setIsLoading(true)
        setIsEdit(!isEdit)
        setIsLoading(false)

    }
    

    const updateProfile = async () => {
        //setIsLoading(true)
        setIsEdit(false)
        const token = await AsyncStorage.getItem('userToken');
        const body = {
            user_id: userProfile.user_id,
            user_type: userProfile.user_type,
            firstname: userProfile.user_firstname,
            lastname: userProfile.user_lastname,
            email: userProfile.user_email,
            contact_no: userProfile.user_mobile,
            grade: userProfile.user_courses_id,
            institute: userProfile.institute,
            gender: selectedGender,
            dob: userProfile.dob,
            state_id: selectedState && selectedState.id ? selectedState.id :null,
            city_id: selectedCity && selectedCity.id ? selectedCity.id : null

        }
        APICaller('update_profile', body, 'POST',token).then(response=>{
            //console.log('resposne=>>>',response)
            if(response.status == 201 || response.status == 200){
                const {data} = response;
                if(data.response == "success"){
                    
                    
                    //setIsEdit(false)
                    fetchProfile()
                    //alert('Profile updated')
                }else{
                    alert("Something went wrong, Please try agin")

                }
                //setIsLoading(false)

            }else {
                alert("Something went wrong, Please try agin")
                //setIsLoading(false)

            }
        }).catch(err=>{
            setIsLoading(false)
            console.log(err,"line 171 student profile")
        })
    }

    const getState = async () => {
        //setIsLoading(true)
        APICaller('getstates',undefined,'GET').then(response => {
            //console.log('state data>>>>',response.data)
            const {data} = response
            if(data.response == 'success'){
                // this.setState({stateData:data.data});
                setStateData(data.data)
        //setIsLoading(false)

            }else {
                Alert.alert('Something went wrong, Please try again')
        //setIsLoading(false)

            }
        })
    };

    const getAllCity = async (stateId) => {
       // setIsLoading(true)
        try {
            let obj = {
                state_id: stateId
            }
            let response = await StatesApi.getCity(obj);
            // console.log("city data",response)
            if (response.response == "success") {
                Storage.cityData = response.data
                setCityData(response.data)
                setSelectedCity(response.data[0])
                // this.setState({ ddlCity: response.data, City: response.data[0].id })
            }
            //setIsLoading(false)

        }
        catch (e) {
            console.log("Exception Home Screen getAllState", e)
            setIsLoading(false)

        }
    }
    return (
        <SafeAreaView>
            <HeaderComponent />
            <ScrollView style={{ backgroundColor: color.colorWhite, width: wp('100%'), height: hp('88%') }}>
                <View style={{ paddingBottom: 40, }}>
                    <View style={{ width: wp('90%'), flexDirection: 'row', marginHorizontal: wp('5%'), height: hp('20%'), justifyContent: 'flex-start', alignItems: 'center', }}>
                        <View style={{ width: normalize(99), height: normalize(99), borderRadius: normalize(99) / 2, marginLeft: 10, borderColor: color.colorPrimary, borderWidth: normalize(2) }}>
                            <Image
                                style={{ resizeMode: 'contain', width: '100%', height: '100%' }}
                                source={require('../../assets/Image/ic_avatar_default.png')} />
                        </View>

                        <View style={{ marginLeft: 15, }}>
                            {
                                props.userData.firstname === undefined ?
                                <>
                                <Text style={{ fontWeight: 'bold', color: "#777", fontSize: 20 }}>{props.userData.user_firstname + ' ' + props.userData.user_lastname}</Text>
                                <Text style={styles.text}>Class : {props.userData.user_courses_id}</Text>
                                </>
                                :
                                <>
                                <Text style={{ fontWeight: 'bold', color: "#777", fontSize: 20 }}>{props.userData.firstname + ' ' + props.userData.lastname}</Text>
                            <Text style={styles.text}>Class : {props.userData.grade}</Text>
                            </>
                            }
                            
                            {!isEdit ? <TouchableOpacity onPress={() => {
                                _toggleEdit()
                            }} style={{
                                height: normalize(35),
                                width: normalize(57),
                                borderColor: color.colorPrimary,
                                borderWidth: normalize(2),
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: normalize(13),
                                marginTop: normalize(11)
                            }}>
                                <Text style={{
                                    fontSize: normalize(16),
                                    fontWeight: '400',
                                    color: colorBlueDark
                                }}>Edit</Text>
                            </TouchableOpacity> : <View style={{
                                height: normalize(35),
                                width: normalize(57),
                                marginTop: normalize(11)

                            }}></View>}
                        </View>

                    </View>

                    <View style={{ width: '90%', marginHorizontal: normalize(28), flexDirection: 'row', }}>
                        <TouchableOpacity style={{ borderRadius: normalize(10), width: normalize(175), height: normalize(50), backgroundColor: color.colorPrimary, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={styles.text}>User Details</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{
                            userProfile.parent_id === null ? props.navigation.navigate("ParentDetail") : props.navigation.navigate("ParentProfile")
                        }} style={{ width: normalize(175), height: normalize(50), borderColor: color.colorPrimary, borderRadius: normalize(10), borderWidth: 2, justifyContent: 'center', alignItems: 'center', marginLeft: normalize(8) }}>
                            <Text style={styles.text}>Parent Details</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.MaininputView}>
                        <Text style={styles.Label}>First Name</Text>
                        <View style={styles.inputView}>
                            <TextInput
                                editable={isEdit}
                                value={userProfile && userProfile.user_firstname}
                                onChangeText={val => {
                                    let temp = { ...userProfile };
                                    temp.user_firstname = val;
                                    setUserProfile(temp)
                                }}
                                style={styles.textInput} />
                        </View>
                    </View>

                    <View style={styles.MaininputView}>
                        <Text style={styles.Label}>Last Name</Text>
                        <View style={styles.inputView}>
                            <TextInput
                                value={userProfile && userProfile.user_lastname}
                                editable={isEdit}
                                onChangeText={val => {
                                    let temp = { ...userProfile };
                                    temp.user_lastname = val;
                                    setUserProfile(temp)
                                }}
                                style={styles.textInput} />
                        </View>
                    </View>

                    <View style={styles.MaininputView}>
                        <Text style={styles.Label}>Institute Name</Text>
                        <View style={styles.inputView}>
                            <TextInput
                                value={userProfile && userProfile.institute}
                                editable={isEdit}

                                onChangeText={val => {
                                    let temp = { ...userProfile };
                                    temp.institute = val;
                                    setUserProfile(temp)
                                }}
                                style={styles.textInput} />
                        </View>
                    </View>

                    <View style={styles.MaininputView}>
                        <Text style={styles.Label}>Grades</Text>
                        <View style={styles.inputView}>
                            <TextInput
                                value={userProfile && userProfile.user_courses_id}
                                editable={isEdit}

                                onChangeText={val => {
                                    let temp = { ...userProfile };
                                    temp.user_courses_id = val;
                                    setUserProfile(temp)
                                }}
                                style={styles.textInput} />
                        </View>
                    </View>

                    <View style={styles.MaininputView}>
                        <Text style={styles.Label}>Gender</Text>
                        <TouchableOpacity disabled={!isEdit} style={styles.inputView} onPress={() => {
                            genderRef.current.open()
                        }}>
                            <Text style={styles.textInput} >
                                {selectedGender}

                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.MaininputView}>
                        <Text style={styles.Label}>DOB</Text>
                        <View style={styles.inputView}>
                            <DatePicker
                                disabled={!isEdit}
                                style={styles.textInput}
                                style={{ borderWidth: 0, width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start' }}
                                date={userProfile && userProfile.dob}
                                mode="date"
                                placeholder="Select date"
                                format="YYYY-MM-DD"
                                minDate="1960-05-01"
                                maxDate={new Date()}
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        right: 20,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        marginLeft: 0,
                                        alignItems: 'flex-start',
                                        paddingLeft: 10,
                                        borderWidth: 0,
                                        color: "#000"
                                    }
                                    // ... You can check the source to find the other keys.
                                }}
                                onDateChange={(date) => { 
                                    console.log("date", date) 
                                    let temp = { ...userProfile };
                                    temp.dob = date;
                                    setUserProfile(temp)
                                }}
                            />
                        </View>
                    </View>

                    <View style={styles.MaininputView}>
                        <Text style={styles.Label}>Contact No</Text>
                        <View style={styles.inputView}>
                            <TextInput
                                value={userProfile && userProfile.user_mobile}
                                editable={false}
                                onChangeText={val => {
                                    this.onChangeText('ContactNo', val)
                                }}
                                style={styles.textInput} />
                        </View>
                    </View>

                    <View style={styles.MaininputView}>
                        <Text style={styles.Label}>Email ID</Text>
                        <View style={styles.inputView}>
                            <TextInput
                                value={userProfile && userProfile.user_email}
                                editable={false}
                                style={styles.textInput} />
                        </View>
                    </View>

                    {/* <View style={styles.MaininputView}>
                            <Text style={styles.Label}>Password</Text>
                            <View style={styles.inputView}>
                                <TextInput
                                    value={this.state.ContactNo}
                                    onChangeText={val => {
                                        this.onChangeText('ContactNo', val)
                                    }}
                                    style={styles.textInput} />
                            </View>
                        </View> */}



                    <View style={styles.MaininputView}>
                        <Text style={styles.Label}>State</Text>
                        <TouchableOpacity disabled={!isEdit} style={styles.inputView} onPress={() => {
                            // this.stateRef.open()
                            stateRef.current.open()
                        }}>
                            <Text style={styles.textInput} >
                                {selectedState.name}

                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.MaininputView}>
                        <Text style={styles.Label}>City</Text>
                        <TouchableOpacity disabled={!isEdit} style={styles.inputView} onPress={() => {
                            cityRef.current.open()
                        }}>
                            <Text style={styles.textInput} >
                                {selectedCity.name}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {isEdit ? <View style={[styles.MaininputView, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                        <TouchableOpacity onPress={()=>{
                            updateProfile()
                        }}style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: normalize(179),
                            height: normalize(49),
                            marginTop: 10,
                            backgroundColor: color.colorPrimary,
                            borderRadius: 10
                        }}>
                            <Text style={styles.text}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            _toggleEdit()
                        }} style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: normalize(165),
                            height: normalize(49),
                            marginTop: 10,
                            borderColor: color.colorPrimary,
                            borderWidth: normalize(2),
                            // backgroundColor: color.colorPrimary,
                            borderRadius: 10
                        }}>
                            <Text style={styles.text}>Cancel</Text>
                        </TouchableOpacity>
                    </View> : null}

                </View>
            </ScrollView>


            <PickerComponent
                data={stateData}
                ref={stateRef}
                selectedValue={selectedState}
                title={"State"}
                labelExtractor={(item) => {
                    return item && item.name
                }}
                onChangeItem={(item) => {
                    setSelectedState(item)
                    setTimeout(()=>{
                     getAllCity(item.id)
                    },300)
                }}
            />
            <PickerComponent
                data={cityData}
                ref={cityRef}
                selectedValue={selectedCity}
                title={"City"}
                labelExtractor={(item) => {
                    return item.name
                }}
                onChangeItem={(item) => {
                    // this.setState({City:item})
                    setSelectedCity(item)
                }}
            />

            <PickerComponent
                data={["Male","Female"]}
                ref={genderRef}
                selectedValue={selectedGender}
                title={"Gender"}
                labelExtractor={(item) => {
                    return item
                }}
                onChangeItem={(item) => {
                    setSelectedGender(item)
                }}
            />

        <Loader loading={isLoading} />

        </SafeAreaView>
    );

}

const mapStateToProps = (state) => ({
    userData: state.UserReducer.userData
})

export default connect(mapStateToProps)(withNavigationFocus(StudentProfile))

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

    modal: {
        alignItems: 'center',
        backgroundColor: '#rgba(255, 255, 255, 0.8)',
        width: wp('80%'),
        height: hp('70%'),
        marginTop: 5,
        alignSelf: 'center',
    },
    CardDiv: {
        width: '100%',
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginLeft: 10,
        alignItems: 'flex-start'
    },
    BulletsView: {
        width: 25,
        height: 25,
        backgroundColor: color.colorPrimary,
        borderRadius: 90
    },
    TextCard: {
        color: "#777",
        fontSize: 16,
        paddingLeft: 10,
        paddingRight: 20
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
        fontSize: 16
    },
    CardTextView: {
        width: '30%',
        paddingHorizontal: 0,
        alignItems: 'flex-end'
    },
    text: {
        fontWeight: '400',
        color: "#777",
        fontSize: normalize(16)
    },
    Label: {
        fontWeight: '700',
        paddingLeft: 5,
        color: color.colorBlueDark,
        fontSize: normalize(14.5)
    },
    MaininputView: {
        width: normalize(364),
        height : normalize(70),
        marginHorizontal: normalize(21),
        marginTop: normalize(20)
    },
    inputView: {
        width: '100%',
        borderRadius: 10,
        marginTop: 10,
        backgroundColor: color.colorSilverGrey,
        height: normalize(50),
        justifyContent: 'center'
    },
    textInput: {
        paddingHorizontal: 10,
        fontSize: 16,
        color: color.colorBlack
    }

});