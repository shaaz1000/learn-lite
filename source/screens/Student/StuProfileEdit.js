import React, { useState } from 'react';
import CardView from 'react-native-cardview';
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
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../../commonComponents/loader';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Axios from 'axios';
import { SafeAreaView } from 'react-native';
import color from '../../utilities/AppColor';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { colors } from 'react-native-elements';
import Storage from '../../utilities/Storage';
import * as UpdateProfileApi from '../../services/Auth';
import * as StatesApi from '../../services/State';
import DatePicker from 'react-native-datepicker';
import Topbar from '../../commonComponents/Topbar';
import HeaderComponent from '../../commonComponents/headerComponent'
import normalize from '../../utilities/UtilityMethods';
import PickerComponent from '../../commonComponents/pickerComponent'
import APICaller from '../../utilities/apiCaller';
export default class StuProfileEdit extends React.Component {
    constructor(props) {
        super(props)
        this.cityRef = null
        this.state = {
            keyboardAvoidingViewKey: 'keyboardAvoidingViewKey',
            loading: false,
            data: Storage.userData,
            firstname: Storage.userData.user_firstname,
            lastname: Storage.userData.user_lastname,
            institute: Storage.userData.institute,
            grades: Storage.userData.user_courses_id,
            gender: Storage.userData.gender,
            DOB: Storage.userData.dob,
            ContactNo: Storage.userData.user_mobile,
            EmialId: Storage.userData.user_email,
            State: Storage.userData.user_state_id,
            City: Storage.userData.user_city_id,
            ddlState: Storage.stateData,
            ddlCity: Storage.cityData
        }
    }
    getAllCity = async (stateId) => {
        try {
            let obj = {
                state_id: stateId
            }
            let response = await StatesApi.getCity(obj);
            console.log('city=>>',response)
            if (response.response == "success") {
                Storage.cityData = response.data
                this.setState({ ddlCity: response.data, City: response.data[0].id })
            }
        }
        catch (e) {
            console.log("Exception Home Screen getAllState", e)
        }
    }
    onChangeText = (key, value) => {
        this.setState({ [key]: value, })

    }
    updateState = (itemValue, itemIndex) => {
        this.setState({
            State: itemValue
        })
        this.getAllCity(itemValue)
    }
    updateCity = (itemValue, itemIndex) => {
        this.setState({
            City: itemValue
        })
    }

    updateProfile = async () => {

        let obj = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            institute: this.state.institute,
            grade: this.state.grades,
            gender: this.state.gender,
            dob: this.state.DOB,
            contact_no: this.state.ContactNo,
            email: this.state.EmialId,
            state_id: this.state.State.id,
            City_id: this.state.City.id,
            user_id: Storage.userData.id,
            user_type: Storage.userData.user_type
        }
        console.log("obj", obj);
        this.setState({
            loading: true
        })
        let response = await UpdateProfileApi.updateProfile(obj);
        console.log('response', response)
        this.setState({
            loading: false
        })
    }

    getState = async () => {
 
        APICaller('getstates',undefined,'GET').then(response => {
            console.log('state data>>>>',response.data)
            const {data} = response
            if(data.response == 'success'){
                this.setState({ddlState:data.data});
            }else {
                Alert.alert('Something went wrong, Please try again')
            }
        })
      };

    componentDidMount(){
        this.getState()
    }
    render() {
        let { keyboardAvoidingViewKey } = this.state
        const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0

        console.log('city data ',this.state.ddlCity)
        return (
            <SafeAreaView>
                 <HeaderComponent />
                <ScrollView style={{ backgroundColor: color.colorWhite, width: wp('100%'), height: hp('88%') }}>
                    <Loader loading={this.state.loading} />
                    <View style={{ paddingBottom: 40, }}>
                        <View style={{ width: wp('90%'), flexDirection: 'row', marginHorizontal: wp('5%'), height: hp('20%'), justifyContent: 'flex-start', alignItems: 'center', }}>
                            <View style={{  width: normalize(99), height: normalize(99), borderRadius: normalize(99)/2, marginLeft: 10, borderColor: color.colorPrimary, borderWidth: normalize(2)}}>
                                <Image
                                    style={{ resizeMode: 'contain', width: '100%', height: '100%' }}
                                    source={require('../../assets/Image/ic_avatar_default.png')} />
                            </View>

                            <View style={{ marginLeft: 15, }}>
                                <Text style={{ fontWeight: 'bold', color: "#777", fontSize: 20 }}>{this.state.data.user_firstname} {this.state.data.user_lastname}</Text>
                                <Text style={styles.text}>Class : {this.state.data.user_courses_id}</Text>
                            </View>
                        </View>

                        <View style={{ width: '90%',marginHorizontal:normalize(28), flexDirection: 'row', }}>
                            <TouchableOpacity style={{ borderRadius:normalize(10), width: normalize(175), height:normalize(50) , backgroundColor: color.colorPrimary, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.text}>User Details</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{width: normalize(175), height:normalize(50) , borderColor: color.colorPrimary,borderRadius:normalize(10), borderWidth: 2,  justifyContent: 'center', alignItems: 'center' ,marginLeft:normalize(8) }}>
                                <Text style={styles.text}>Parent Details</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.MaininputView}>
                            <Text style={styles.Label}>First Name</Text>
                            <View style={styles.inputView}>
                                <TextInput
                                    value={this.state.firstname}
                                    onChangeText={val => {
                                        this.onChangeText('firstname', val)
                                    }}
                                    style={styles.textInput} />
                            </View>
                        </View>

                        <View style={styles.MaininputView}>
                            <Text style={styles.Label}>Last Name</Text>
                            <View style={styles.inputView}>
                                <TextInput
                                    value={this.state.lastname}
                                    onChangeText={val => {
                                        this.onChangeText('lastname', val)
                                    }}
                                    style={styles.textInput} />
                            </View>
                        </View>

                        <View style={styles.MaininputView}>
                            <Text style={styles.Label}>Institute Name</Text>
                            <View style={styles.inputView}>
                                <TextInput
                                    value={this.state.institute}
                                    onChangeText={val => {
                                        this.onChangeText('institute', val)
                                    }}
                                    style={styles.textInput} />
                            </View>
                        </View>

                        <View style={styles.MaininputView}>
                            <Text style={styles.Label}>Grades</Text>
                            <View style={styles.inputView}>
                                <TextInput
                                    value={this.state.grades}
                                    onChangeText={val => {
                                        this.onChangeText('grades', val)
                                    }}
                                    style={styles.textInput} />
                            </View>
                        </View>

                        <View style={styles.MaininputView}>
                            <Text style={styles.Label}>Gender</Text>
                            <View style={styles.inputView}>
                                <TextInput
                                    value={this.state.gender}
                                    onChangeText={val => {
                                        this.onChangeText('gender', val)
                                    }}
                                    style={styles.textInput} />
                            </View>
                        </View>

                        <View style={styles.MaininputView}>
                            <Text style={styles.Label}>DOB</Text>
                            <View style={styles.inputView}>
                                {/* <TextInput
                                    value={this.state.DOB}
                                    onChangeText={val => {
                                        this.onChangeText('DOB', val)
                                    }}
                                    style={styles.textInput} /> */}
                                <DatePicker
                                    style={styles.textInput}
                                    style={{ borderWidth: 0, width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start' }}
                                    date={this.state.DOB}
                                    mode="date"
                                    placeholder="select date"
                                    format="YYYY-MM-DD"
                                    minDate="1960-05-01"
                                    maxDate="2021-12-31"
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
                                    onDateChange={(date) => { this.setState({ DOB: date }) }}
                                />
                            </View>
                        </View>

                        <View style={styles.MaininputView}>
                            <Text style={styles.Label}>Contact No</Text>
                            <View style={styles.inputView}>
                                <TextInput
                                    value={this.state.ContactNo}
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
                                    value={this.state.EmialId}
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
                            <TouchableOpacity style={styles.inputView} onPress={()=>{
                                this.stateRef.open()
                            }}>
                                <Text style={styles.textInput} >
                                    {this.state.State && this.state.State.name}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.MaininputView}>
                            <Text style={styles.Label}>City</Text>
                            <TouchableOpacity style={styles.inputView} onPress={()=>{
                                this.cityRef.open()
                            }}>
                                <Text style={styles.textInput} >
                                    {this.state.City && this.state.City.name}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.MaininputView, { justifyContent: 'center', alignItems: 'center' }]}>
                            <TouchableOpacity onPress={() => this.updateProfile()} style={{ justifyContent: 'center', alignItems: 'center', width: '90%', height: 50, marginTop: 10, backgroundColor: color.colorPrimary, borderRadius: 10 }}>
                                <Text style={styles.text}>Save</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </ScrollView>


                <PickerComponent 
                    data={this.state.ddlState}
                    ref={(ref)=>this.stateRef = ref}
                    selectedValue={this.state.State}
                    title={"State"}
                    labelExtractor={(item)=>{
                        return item && item.name
                    }}
                    onChangeItem={(item)=>{
                        this.setState({State:item})
                        this.getAllCity(item.id)
                    }}
                />
                <PickerComponent 
                    data={this.state.ddlCity}
                    ref={(ref)=>this.cityRef = ref}
                    selectedValue={this.state.City}
                    title={"City"}
                    labelExtractor={(item)=>{
                        return item.name
                    }}
                    onChangeItem={(item)=>{
                        this.setState({City:item})
                    }}
                />


            </SafeAreaView>
        );
    }
}

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
        width: '86%',
        marginHorizontal: '7%',
        marginTop: 20
    },
    inputView: {
        width: '100%',
        borderRadius: 10,
        marginTop: 10,
        backgroundColor: color.colorSilverGrey,
        height: normalize(45),
        justifyContent:'center'
    },
    textInput: {
        paddingHorizontal: 10,
        fontSize: 16,
        color: color.colorBlack
    }

});