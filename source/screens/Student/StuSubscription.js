import React from 'react';
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
import Axios from 'axios';
import { SafeAreaView } from 'react-native';
import color from '../../utilities/AppColor';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { colors } from 'react-native-elements';
import * as SubscriptionApi from '../../services/Subscription';
import Topbar from '../../commonComponents/Topbar';
import HeaderComponent from '../../commonComponents/headerComponent'
import APICaller from '../../utilities/apiCaller'
import normalize, { normalizeText } from '../../utilities/UtilityMethods';
import AppImages from '../../assets/Image'
export default class StuSubscription extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            keyboardAvoidingViewKey: 'keyboardAvoidingViewKey',
            loading: true,
            subscriptionData: []
        }
        this._didFocusSubscription = props.navigation.addListener('didFocus', payload => {
            this.getSubscriptionData()
        })
    }
    componentDidMount() {
        this.getSubscriptionData()
    }
    DownloadInvoice = async () => {
        const token = await AsyncStorage.getItem('userToken')
        
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
        
    getSubscriptionData = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            let response = await APICaller('subscription',undefined,'GET',token)
            //console.log('resposne=>>>',response)
            if (response.status == 200) {
                const {data} = response;
               
                if(data.response == "success"){
                    this.setState({
                        subscriptionData: data.data,
                        loading: false
                    })
                }
             
            }
            else {
                this.setState({
                    loading: false
                })
            }
        }
        catch (e) {
            console.log("getSubscriptionData Exception", e)
            this.setState({
                loading: false
            })
        }
    }

    render() {
        let { keyboardAvoidingViewKey } = this.state
        const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0
       
        
        return (
            <SafeAreaView>
                <HeaderComponent />
                <ScrollView style={{ backgroundColor: color.colorWhite, width: wp('100%'), height: hp('90%') }}>
                    <Loader loading={this.state.loading} />
                    <View style={{ paddingVertical: 15, }}>
                        <View style={{ width: wp('90%'), flexDirection: 'row', marginHorizontal: wp('5%'), height: hp('10%'), justifyContent: 'flex-start', alignItems: 'center', }}>


                            <View style={{ borderBottomWidth: 4, borderBottomColor: color.colorAccent }}>
                                <Text style={{ fontSize: 20, color: "#2B4D76", fontWeight: 'bold', paddingBottom: 5 }}>
                                    My Subscription
                                  </Text>


                            </View>
                        </View>
                        {(this.state.subscriptionData.length > 0) ?

                            this.state.subscriptionData.map((item, index) => {
                           
                                return (
                                    <View style={{justifyContent:'center',alignItems:'center'}}>
                                    <View key={index} style={{ width: normalize(294), marginTop: 10 , paddingBottom:normalize(20) ,backgroundColor: '#F2F3F8', minHeight: normalize(402), borderColor: color.colorPrimary, borderWidth: 2, borderRadius: 20, justifyContent: 'flex-start', alignItems: 'center' }}>
                                        <Image
                                            style={{ resizeMode: 'contain', height: normalize(286), width:normalize(291),marginBottom: 10,marginRight:normalize(20) }}
                                            source={AppImages.courseCoverImage}
                                        />
                                        <Text style={[styles.text, { fontSize: normalize(20),color:'#2B4D76',fontWeight:'700' }]}>
                                            {item.course_title}
                                        </Text>

                                        <Text style={[styles.text, { fontSize: normalize(13.86), marginTop: normalize(20),color:'#2B4D76' }]}>
                                            Valid Till
                            </Text>
                                        <Text style={[styles.text, { fontSize: normalize(13), marginTop: 0, color: color.colorPrimary }]}>
                                            {item.subscription_end_date}
                            </Text>
                            {
                                item.payment_status != null?
                                <TouchableOpacity onPress={()=>this.DownloadInvoice()}>

                                <Text style={[styles.text, { fontSize: normalize(13.5), marginTop: normalize(10),color:'#2B4D76'}]}>
                                            Download Invoice
                                </Text>
                                </TouchableOpacity>
                                :
                                <>
                                <TouchableOpacity onPress={()=>this.props.navigation.navigate("StudentDashBoard",{
                                    isFreeTrialEnabled:true})
                                }>
                                <Text 
                                
                                style={[styles.text, { fontSize: normalize(13.5), marginTop: normalize(10),color:'#2B4D76'}]}>
                                            Purchase full course
                            </Text>
                            </TouchableOpacity>
                            </>
                            }
                                        

                                    </View>
                                    </View>
                                )
                            })
                            :
                            null
                            // <View style={{ paddingBottom: 35, paddingTop: 15 }}>
                            //     <View style={{ width: '80%', marginHorizontal: '10%', marginTop: 20, backgroundColor: '#f2ebeb', height: 400, borderColor: color.colorPrimary, borderWidth: 0, borderRadius: 20, justifyContent: 'flex-start', alignItems: 'center' }}>
                            //         <Text style={[styles.text, { fontWeight: 'normal', fontSize: 14, marginTop: 10, paddingHorizontal: 40, paddingTop: 20 }]}>
                            //             If there is an active student account and If you wish to link your account with it, you can
                            // </Text>

                            //         <Text style={[styles.text, { fontSize: 16 }]}>
                            //             Click here
                            // </Text>
                            //         <Image
                            //             style={{ resizeMode: 'contain', height: 100, marginBottom: 10, marginTop: 20 }}
                            //             source={require('../../assets/Image/img_login.png')}
                            //         />
                            //         <Text style={[styles.text, { fontWeight: 'normal', fontSize: 14, marginTop: 10, paddingHorizontal: 40, paddingTop: 20 }]}>
                            //             If there is an active student account or subscriptions linked with your account, then select the action below
                            // </Text>

                            //         <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate("StudentDashBoard")} style={{ width: '50%', justifyContent: 'center', alignItems: 'center', marginTop: 15, borderRadius: 10, backgroundColor: color.colorAccent, height: 40 }}>
                            //             <Text style={[styles.text, { fontSize: 16, color: color.colorWhite }]}>Subscribe now</Text>
                            //         </TouchableOpacity>
                            //     </View>
                            // </View>
                        }
                    </View>
                </ScrollView>
            </SafeAreaView >
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
        fontWeight: 'bold',
        color: "#777",
        fontSize: 16
    },
    Label: {
        fontWeight: 'bold',
        paddingLeft: 5,
        color: "#777",
        fontSize: 16
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
        backgroundColor: color.colorGrayTransparent,
        height: 45
    },
    textInput: {
        paddingHorizontal: 10,
        fontSize: 16,
        color: color.colorBlack
    }

});