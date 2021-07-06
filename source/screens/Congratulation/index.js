import React, { useEffect, useRef, useState } from 'react';
import { View, Text, SafeAreaView, ImageBackground, Image, StyleSheet, ScrollView, ImagePropTypes ,TouchableOpacity} from 'react-native';
import commonStyling from '../../commonStyles/CssStyle'
import HeaderComponent from '../../commonComponents/headerComponent';
import AppImages from '../../assets/Image'
import normalize, { normalizeText } from '../../utilities/UtilityMethods';
import color, { colorBlueDark } from '../../utilities/AppColor';
import backArrow from '../../assets/Image/backArrow.png'
import upDownArrow from '../../assets/Image/upDownArrow.png';
import pinkBackground from '../../assets/Image/pinkBackground.png';
import videoIcon from '../../assets/Image/videoIcon.png'
import testPaperIcon from '../../assets/Image/testPaperIcon.png';
import tipsTrickIcon from '../../assets/Image/tipsTricksIcon.png';
import refernceIcon from '../../assets/Image/refernceIcon.png';
import {connect} from 'react-redux'
import APICaller from '../../utilities/apiCaller';
import * as PlanningAction from '../../redux/actions/Planning'
import AsyncStorage from '@react-native-community/async-storage'


const CongratulationsScreen = (props) => {
    
  


    return <View style={[commonStyling.flexOne, { backgroundColor: color.colorLightGrey }]}>
        <SafeAreaView style={commonStyling.safeAreaContainer} />
        {/* <HeaderComponent /> */}
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text style={{
                fontSize:normalize(30),
                fontWeight:'700',
                color:color.colorBlueDark
            }}>Congratulation!</Text>
            <TouchableOpacity style={{borderRadius:10,marginTop:normalize(5)}} onPress={()=>{
                props.navigation.navigate('PlanYourLearning')
            }}>
                <Text style={{
                    fontSize:normalize(16),
                    backgroundColor:'#FFD245',
                    paddingHorizontal:normalize(20),
                    paddingVertical:normalize(8),
                    borderRadius:normalize(15)
                }}>Next</Text>
            </TouchableOpacity>
        </View>
    </View>
}

const mapStateToProps = state=>({
    selectedMonth:state.PlanningReducer.selectedMonth,
    selecetedSubject:state.PlanningReducer.selectedSubject,
    selectedChapter:state.PlanningReducer.selectedChapter,
})

export default connect(mapStateToProps)(CongratulationsScreen);

const styles = StyleSheet.create({
    topBannerConatiner: {
        height: normalize(142.5),
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
    searchBarContainer: {
   
        marginTop: normalize(16),
        marginHorizontal: normalize(30),

    },
    quotesContainer: {

        marginHorizontal: normalize(30),
        marginTop: normalize(8),

    },
    leftQuoteIconStyle: {
        height: normalize(33),
        width: normalize(22),
        resizeMode: 'contain'
    },
    quoteTextContainer: {
        flex: 1,
        paddingVertical: normalize(7)
    },
    quoteTextStyle: {
        fontSize: normalize(14),
        color: color.colorBlueDark,
        lineHeight: normalize(21)
    },
    rightQuoteIconStyle: {
        height: normalize(33),
        width: normalize(22),
        resizeMode: 'contain'
    },
    optionBoxContainer: {
        flex: 1,
        marginTop: normalize(34),
        marginHorizontal: normalize(30)
    },
    optionTitleStyle: {
        fontSize: normalize(14.5),
        color: color.colorBlueDark,
        fontWeight: 'bold'
    },
    optionBoxStyle: {
        flexDirection:'row',
        height: normalize(48),
        backgroundColor: '#F2F3F8',
        width: '100%',
        borderRadius: normalize(14),
        marginTop: normalize(15),
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: normalize(13)
    },
    arrowDownStyle: {
        height: normalize(15),
        width: normalize(15)
    },
    bottomButtonContainer: {
        flex: 1,
        marginHorizontal: normalize(30),
        marginTop: normalize(38),
        marginBottom: normalize(17)
    },
    bottomButtonStyle: {
        height: normalize(49),
        width: '100%',
        backgroundColor: color.colorPrimary,
        borderRadius: normalize(15.2),
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomButtonTextStyle: {
        fontSize: normalize(16),
        color: color.colorBlueDark,
        fontWeight: 'bold'
    },
    chapterDetailContainer: {
        marginHorizontal: normalize(30),
        marginTop: normalize(31)
    },
    chapterDetailsCard: {
        height: normalize(212),
        backgroundColor: '#F2F3F8',
        borderRadius: normalize(14.5)
    },
    navigationCardContainer: {
        marginHorizontal: normalize(30),
        marginTop: normalize(18)
    },
})