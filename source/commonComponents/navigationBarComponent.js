import React from 'react';
import {View,Text,SafeAreaView,StyleSheet,Image,TouchableOpacity} from 'react-native';
import AppImages from '../assets/Image';
import normalize from '../utilities/UtilityMethods';
import {connect} from 'react-redux';
import * as commonAction from '../redux/actions/commonActions'
import commonStyling from '../commonStyles/CssStyle';
import color from '../utilities/AppColor'
const NavigationBarComponent = (props) =>{

    return   <View style={styles.navigationCard}>
        <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: normalize(26)
        }}>
            <TouchableOpacity onPress={()=>{
                props.navigation.goBack();
            }} style={{ flex:1,justifyContent: 'center', alignItems: 'center' }}>
                <Image source={AppImages.backIcon} style={{
                    height: normalize(14.8),
                    width: normalize(19),
                    resizeMode: 'contain'
                }} />
            </TouchableOpacity>
            <View style={[{flex:8},props.selectedChapter && props.selectedChapter.chapter_name ? {alignItems:'center'}:{marginLeft:normalize(20)}]}>
            <Text style={{
                fontSize: normalize(14),
                fontFamily:'Sora-Regular',
                color: color.colorBlueDark
            }}>{props.selectedMonth &&  props.selectedMonth.month_name ? props.selectedMonth.month_name + ' | ' :''} 
                {props.selecetedSubject && props.selecetedSubject.subject_name }    
                {props.selecetedSubject && props.selecetedSubject.subject_name && props.selectedChapter && props.selectedChapter.chapter_name ? ' | ':'' } 
                {props.selectedChapter && props.selectedChapter.chapter_name ?  props.selectedChapter.chapter_name :'' }</Text>
            </View>
            <TouchableOpacity onPress={props && props.sortAction} style={{ flex:1,justifyContent: 'center', alignItems: 'center' }}>
                <Image source={AppImages.sortIcon} style={{
                    height: normalize(16.5),
                    width: normalize(26),
                    resizeMode: 'contain'
                }} />
            </TouchableOpacity>
        </View>

    </View>
}

export default connect()(NavigationBarComponent);

const styles = StyleSheet.create({
    navigationCardContainer: {
        marginHorizontal: normalize(30),
        marginTop: normalize(18)
    },
    navigationCard: {
        height: normalize(72),
        backgroundColor: '#fff',
        flexDirection: 'row',
        borderRadius: normalize(14.5),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.13,
        shadowRadius: 8.62,

        elevation: 5,
    },
})