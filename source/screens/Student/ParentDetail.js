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
import Axios from 'axios';
import { unsubscribe, getNetwork } from '../../utilities/CheckNetwork';
import { SafeAreaView } from 'react-native';
import color from '../../utilities/AppColor';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { colors } from 'react-native-elements';
import Topbar from '../../commonComponents/Topbar';
import AppColor from '../../utilities/AppColor';
import AppImages from '../../assets/Image';
import APICaller from '../../utilities/apiCaller';
import HeaderComponent from '../../commonComponents/headerComponent'
export default class ParentDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            keyboardAvoidingViewKey: 'keyboardAvoidingViewKey',
            loading: false,
            mobile_no:"",
            data:{},
            isParentDetailsFetched:true,
        }
    }

    fetchParent = async () =>{
        this.setState({loading:true})
        console.log(this.state.mobile_no,"mobile_no")
       const token = await AsyncStorage.getItem('userToken')
       const body = {
           mobile_no : this.state.mobile_no
       }
       APICaller("search_parent",body,'POST',token)
       .then(response=>{
           const {profile} = response.data
           this.setState({data:profile})
           this.setState({loading: false})
           profile != undefined ? 
           this.props.navigation.navigate("ParentDetailsForm",{data:this.state.data,isParentDetailsFetched:true})
           :
           alert(`No Parent Details found with phone number ${this.state.mobile_no}`)
          //this.props.navigation.navigate("ParentDetailsForm",{data:this.state.data,isParentDetailsFetched:true})
       })
       .catch(err =>{
           console.log(err)
       })
    }
    render() {
        let { keyboardAvoidingViewKey } = this.state
        const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0
        
        return (
            <SafeAreaView>
              {/* <Topbar  navigation={this.props.navigation}/> */}
              <HeaderComponent/>
                <ScrollView style={{ backgroundColor: 'white', width: wp('100%'), height: hp('90%') }} showsVerticalScrollIndicator={false}>
                    <Loader loading={this.state.loading} />
                    <View style={{ paddingVertical: 15}}>
                        <View style={{ width: wp('90%'), flexDirection: 'row', marginHorizontal: wp('5%'), height: hp('10%'), justifyContent: 'flex-start', alignItems: 'center', }}>


                            <View style={{ borderBottomWidth: 4, borderBottomColor: color.colorAccent }}>
                                <Text style={{ fontSize: 20, color: AppColor.colorDarkBlue, fontWeight: 'bold', paddingBottom: 5 }}>
                                    Parent details
                                  </Text>


                            </View>
                        </View>

                        <View style={{ marginTop:hp("1%"),width: '87%',alignSelf: 'center', marginHorizontal: '5%', backgroundColor: "#fff", borderRadius: 10, paddingVertical: 20,elevation:5 ,marginBottom:hp("3%")}}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                            <Text style={{fontSize:hp("2.2%"),padding:10,color:AppColor.colorBlueDark,fontWeight: 'bold',textAlign:"center"}}>If there is an active parent account already available on LearnLite, enter the mobile number below and search the account</Text>
                            <View style={{ width: '96%', marginHorizontal: '2%', justifyContent: "center",flexDirection: 'row', marginTop: 5 }}>
                                <View 
                                    style={{ 
                                        width: wp("50%"), 
                                        borderRadius: 10, 
                                        borderWidth: 2, 
                                        height: hp("6%"),
                                        borderColor: color.colorPrimary, 
                                        alignSelf:"center"
                                        }}>
                                    <TextInput
                                        placeholderTextColor={AppColor.colorBlueDark}
                                        style={{fontSize:16,fontWeight:"bold",textAlign:"center",alignSelf:"center"}}
                                        placeholder="Enter Mobile No "
                                        keyboardType="number-pad"
                                        maxLength={10}
                                        keyboardType="number-pad"
                                        onChangeText={(e)=>this.setState({mobile_no:e})}
                                    />
                                </View>
                                
                                <View style={{ width: '31.5%', height: hp("6%"), justifyContent: 'center', alignItems: 'center', marginLeft: '2%', borderRadius: 10,  backgroundColor: color.colorPrimary }}>
                                <TouchableOpacity
                                   disabled={this.state.mobile_no.length===10?false:true}
                                    onPress={()=>this.fetchParent()}
                                >
                                    <Text style={{
                                        fontSize:16,fontWeight:"bold",textAlign:"center",color:AppColor.colorBlueDark
                                    }}>Search</Text>
                                
                                </TouchableOpacity>
                                </View>
                                
                            </View>

                            <View style={{ width: '80%', marginHorizontal: '10%', marginTop: 20, backgroundColor: '#fff', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <Image
                                    style={{ resizeMode: 'contain', height: 150, marginBottom: 10 }}
                                    source={AppImages.union}
                                />
                            </View>
                                <Text style={{color: AppColor.colorDarkBlue,fontWeight: 'bold',fontSize:hp("2.3%"),marginTop:10,marginHorizontal:10,textAlign:"center"}}>
                                    No active Parent accounts
                                
                                    are linked with this
                                
                                   account currently
                                </Text>
                            
                            <View style={[styles.MaininputView, { marginTop:hp("2%"),justifyContent: 'center', alignItems: 'center' }]}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("ParentDetailsForm",{data:this.state.data,isParentDetailsFetched:false})} activeOpacity={1} style={{ justifyContent: 'center', alignItems: 'center', width: wp("45%"), height: hp("6%"), marginTop: 10, backgroundColor: color.colorPrimary, borderRadius: 10 }}>
                                    <Text style={{color: AppColor.colorBlueDark,fontWeight: 'bold',fontSize:16,padding:10}}>Add Parent</Text>
                                </TouchableOpacity>
                            </View>
                            </ScrollView>
                        </View>
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