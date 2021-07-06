import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AppImages from '../assets/Image';
import normalize from '../utilities/UtilityMethods';
import { connect } from 'react-redux';
import * as commonAction from '../redux/actions/commonActions'
import commonStyling from '../commonStyles/CssStyle';
import color from '../utilities/AppColor'
import LinearGradient from 'react-native-linear-gradient';

const QuoteComponent = ({quoteText}) => {


    return <LinearGradient 
            colors={["#FFCB43","#FF8341","#FF3F3F"]} 
            start={{x:0,y:1}}
            end={{x:1,y:1}}
            
            style={styles.quotesContainer}>
        <View style={commonStyling.flexOne}>
            <Image source={AppImages.leftQuoteIcon} style={styles.leftQuoteIconStyle} />
        </View>
        <View style={styles.quoteTextContainer}>
            <Text style={styles.quoteTextStyle}>
            {quoteText}
        </Text>
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <Image source={AppImages.rightQuoteIcon} style={styles.rightQuoteIconStyle} />
        </View>

    </LinearGradient>
}

export default connect()(QuoteComponent);

const styles = StyleSheet.create({

    quotesContainer: {
        flex: 1,
        backgroundColor: '#D7E7FF',
        paddingHorizontal: normalize(20),
        borderRadius: normalize(14.5),
        paddingVertical: normalize(9),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.13,
        shadowRadius: 8.62,

        elevation: 5,
    },
    leftQuoteIconStyle: {
        height: normalize(22),
        width: normalize(14),
        resizeMode: 'contain'
    },
    quoteTextContainer: {
        flex: 1,
        //paddingVertical: normalize(4)
    },
    quoteTextStyle: {
        fontFamily:'Sora-Regular',
        fontSize: normalize(14),
        color: color.colorBlueDark,
        lineHeight: normalize(21)
    },
    rightQuoteIconStyle: {
        height: normalize(22),
        width: normalize(14),
        resizeMode: 'contain'
    },
})