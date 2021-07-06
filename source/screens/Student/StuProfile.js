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
    Modal,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../../commonComponents/loader';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native';
import color from '../../utilities/AppColor';
import Storage from '../../utilities/Storage';
import Topbar from '../../commonComponents/Topbar';
import HeaderComponent from '../../commonComponents/headerComponent'
import normalize  from '../../utilities/UtilityMethods';
export default class StuProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            keyboardAvoidingViewKey: 'keyboardAvoidingViewKey',
            loading: false,
            data: Storage.userData,
            AllStateData: Storage.stateData,
            AllCityData: Storage.cityData
        }
    }

    render() {
        let { keyboardAvoidingViewKey } = this.state
        const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0

        return (
            <SafeAreaView>
                <HeaderComponent />
                <ScrollView style={{ backgroundColor: color.colorWhite, width: wp('100%') ,height:hp('88%')}}>
                    <Loader loading={this.state.loading} />
                    <View style={{ paddingBottom: 40, }}>
                        <View style={{ width: wp('90%'), flexDirection: 'row', marginHorizontal: wp('5%'), height: hp('20%'), justifyContent: 'flex-start', alignItems: 'center', }}>
                            <View style={{ width: normalize(99), height: normalize(99), borderRadius: normalize(99)/2, marginLeft: 10, borderColor: color.colorPrimary, borderWidth: normalize(2) }}>
                                <Image
                                    style={{ resizeMode: 'contain', width: '100%', height: '100%' }}
                                    source={require('../../assets/Image/ic_avatar_default.png')} />
                            </View>

                            <View style={{ marginLeft: 15, }}>
                                <Text style={{ fontWeight: 'bold', color: "#777", fontSize: 20 }}>{this.state.data.user_firstname} {this.state.data.user_lastname}</Text>
                                <Text style={styles.text}>Class : {this.state.data.user_courses_id}</Text>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("StuProfileEdit")} style={{ justifyContent: 'center', alignItems: 'center', height:normalize(35),width:normalize(57), marginTop: 10, borderWidth: 2, borderColor: color.colorPrimary, borderRadius: 10 }}>
                                    <Text style={{
                                        fontSize:normalize(16),
                                        color:color.colorBlueDark,
                                        fontWeight:'600'
                                    }}>Edit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ width: '100%', flexDirection: 'row',marginHorizontal:normalize(28) }}>
                            <TouchableOpacity style={{ borderRadius:normalize(10), width: normalize(175), height:normalize(50) , backgroundColor: color.colorPrimary, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.text}>User Details</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate("ParentDetail")} style={{ width: normalize(175), height:normalize(50) , borderColor: color.colorPrimary,borderRadius:normalize(10), borderWidth: 2,  justifyContent: 'center', alignItems: 'center' ,marginLeft:normalize(8)}}>
                                <Text style={styles.text}>Parent Details</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.MaininputView}>
                            <Text style={styles.Label}>First Name</Text>
                            <View style={styles.inputView}>
                                <Text style={styles.textInput} >
                                    {this.state.data.user_firstname}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.MaininputView}>
                            <Text style={styles.Label}>Last Name</Text>
                            <View style={styles.inputView}>
                                <Text style={styles.textInput} >
                                    {this.state.data.user_lastname}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.MaininputView}>
                            <Text style={styles.Label}>Institute Name</Text>
                            <View style={styles.inputView}>
                                <Text style={styles.textInput} >
                                    {this.state.data.institute}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.MaininputView}>
                            <Text style={styles.Label}>Grades</Text>
                            <View style={styles.inputView}>
                                <Text style={styles.textInput} >
                                    {this.state.data.user_courses_id}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.MaininputView}>
                            <Text style={styles.Label}>Gender</Text>
                            <View style={styles.inputView}>
                                <Text style={styles.textInput} >
                                    {this.state.data.gender}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.MaininputView}>
                            <Text style={styles.Label}>DOB</Text>
                            <View style={styles.inputView}>
                                <Text style={styles.textInput} >
                                    {this.state.data.dob}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.MaininputView}>
                            <Text style={styles.Label}>Contact No</Text>
                            <View style={styles.inputView}>
                                <Text style={styles.textInput} >
                                    {this.state.data.user_mobile}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.MaininputView}>
                            <Text style={styles.Label}>Email ID</Text>
                            <View style={styles.inputView}>
                                <Text style={styles.textInput} >
                                    {this.state.data.user_email}
                                </Text>
                            </View>
                        </View>

                        {/* <View style={styles.MaininputView}>
                            <Text style={styles.Label}>Password</Text>
                            <View style={styles.inputView}>
                                <Text style={styles.textInput} >
                                    {this.state.data.user_email}
                                </Text>
                            </View>
                        </View> */}

                        <View style={styles.MaininputView}>
                            <Text style={styles.Label}>State</Text>
                            <View style={styles.inputView}>
                                {/* AllStateData */}
                                <Text style={styles.textInput} >
                                    {/* {this.state.AllStateData.length > 0 &&
                                        this.state.AllStateData.filter(a => a.id == this.state.data.user_state_id)[0].name
                                    } */}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.MaininputView}>
                            <Text style={styles.Label}>City</Text>
                            <View style={styles.inputView}>
                                <Text style={styles.textInput} >
                                    {/* {this.state.AllCityData.length > 0 &&
                                        this.state.AllCityData.filter(a => a.id == this.state.data.user_city_id)[0].name
                                    } */}
                                </Text>
                            </View>
                        </View>
                        {/* <View style={[styles.MaininputView, { justifyContent: 'center', alignItems: 'center' }]}>
                            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', width: '90%', height: 50, marginTop: 10, backgroundColor: color.colorPrimary, borderRadius: 10 }}>
                                <Text style={styles.text}>Save</Text>
                            </TouchableOpacity>
                        </View> */}






                    </View>
                </ScrollView>
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
        marginTop: 20,
    },
    inputView: {
        width: '100%',
        borderRadius: 10,
        marginTop: 10,
        justifyContent: 'center',
        backgroundColor: color.colorSilverGrey,
        height: 45
    },
    textInput: {
        paddingHorizontal: 10,
        fontSize: 16,

        color: color.textcolor
    }

});