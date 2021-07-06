import React, { useState } from 'react';
import {View,Text,StyleSheet,SafeAreaView,TextInput} from 'react-native';
import HeaderComponent from '../../commonComponents/headerComponent';
import normalize, { normalizeText } from '../../utilities/UtilityMethods';
import color from '../../utilities/AppColor';
import commonStyling from '../../commonStyles/CssStyle'
import { Touchable } from 'react-native';
import { TouchableOpacity } from 'react-native';
import APICaller from '../../utilities/apiCaller';
import AsyncStorage from '@react-native-community/async-storage'
import Loader from '../../commonComponents/loader'
const FeedBackScreen = ()=>{

    const [feedbackText,setFeedbackText] = useState('');
    const [loading,setLoading] = useState(false)

    const hanldeSubmit = ()=>{

        if(feedbackText == ''){
            alert('Please enter your feedback')
        }else {
            postFeedBack()
        }
    }
    const postFeedBack = async()=>{
        setLoading(true)
        let body = {
            comments:feedbackText
        }
        const token = await AsyncStorage.getItem('userToken');
        
        APICaller('feedback_store',body,'POST',token).then(response=>{
            console.log('response from feednback',response)
            if(response.status == 200){
                const {data} = response;
                if(data.response == "success"){
                    setFeedbackText('')
                    alert(data.message)
                    setLoading(false)
                }else {
                alert('Something went wrong, Please try again')
                setLoading(false)

                }
            }else {
                alert('Something went wrong, Please try again')
                setLoading(false)

            }
        })
    }

    return <View style={styles.mainContainer}>
        <SafeAreaView style={{backgroundColor: color.colorPrimary}}></SafeAreaView>
        <HeaderComponent />
        <View style={styles.topBannerConatiner}>
                {/* <Image source={AppImages.topBackground} style={styles.topBannerImageStyle}/> */}
                <View style={{ flexDirection: 'row' }}>
                    <View style={commonStyling.screenTitleContainer}>
                        <Text style={commonStyling.screenTitleStyle}>Feedback</Text>
                    </View>
                </View>
        </View>
        <View style={styles.feedbackContainer}>
            <View style={styles.feedBackCard}>
                <TextInput 
                    style={styles.feedBackInput}
                    multiline={true}
                    value={feedbackText}
                    placeholder="Your Feedback..."
                    placeholderTextColor='#2B4D7670'
                    onChangeText={(text)=>{
                        setFeedbackText(text)
                    }}

                />
                            <TouchableOpacity onPress={()=>{
                                hanldeSubmit()
                            }} style={styles.button}>
    <Text style={styles.buttonTextStyle}>Submit</Text>
</TouchableOpacity>
            </View>
            <Loader loading={loading}/>
        </View>
    </View>
}

export default FeedBackScreen

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor: color.colorLightGrey 
    },
    topBannerConatiner: {
        height: normalize(92.5),
        backgroundColor: color.colorPrimary,
        borderBottomLeftRadius: normalize(40),
        borderBottomRightRadius: normalize(40),
    },
    topBannerImageStyle: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
        position: 'absolute',
        top: -(normalize(4))
    },
    feedbackContainer:{
        marginTop:normalize(16),
        justifyContent:'center',
        alignItems:'center'
    },
    feedBackCard:{
        height:normalize(361),
        width:normalize(354),
        backgroundColor:'#fff',
        borderRadius:normalize(14.2),
        // justifyContent:'center',
        alignItems:'center',
    },
    feedBackInput:{
        height:normalize(240),
        width:normalize(313),
        borderColor:'#FFB300',
        borderWidth:normalize(2),
        marginTop:normalize(24),
        borderRadius:normalize(10),
        textAlignVertical:'top' ,
        padding:normalize(20),
        paddingTop:normalize(20),
        color:'#2B4D76',       
    },
    button:{
        height:normalize(49),
        width:normalize(313),
        backgroundColor:color.colorPrimary,
        borderRadius:normalize(15.2),
        marginTop:normalize(16),
        justifyContent:'center',
        alignItems:'center'
    },
    buttonTextStyle:{
        fontFamily:'Sora-Bold',
        fontSize:normalize(16),
        color:color.colorBlueDark
    }
})