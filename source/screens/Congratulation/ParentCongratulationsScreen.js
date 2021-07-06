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

const ParentCongratulationsScreen = () => {
    return(
        <>
        <SafeAreaView style={{flex:1,backgroundColor:"white"}}>
            <View style={{flex:1,justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color:color.colorBlueDark,fontSize:22,fontWeight: 'bold'}}>Congratulations!</Text>
                <Text style={{
                color:color.colorBlueDark,
                fontSize:18,
                textAlign:"center",
                marginTop:20,
                marginHorizontal:10
            }}>You have successfully purchased a subscription! To add a student account, assign this subscription and link with the student account</Text>
            <TouchableOpacity
                onPress={()=>navigation.navigate("AddChildren")}
            >
            <Text style={{fontSize:18,fontWeight: 'bold',textAlign:"center",color:color.colorDarkBlue}}>Click here</Text>
            </TouchableOpacity>
            </View>
            
        </SafeAreaView>
        </>
    )
}

export default ParentCongratulationsScreen;