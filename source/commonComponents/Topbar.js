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

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { SafeAreaView } from 'react-native';
import color from '../utilities/AppColor';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { colors } from 'react-native-elements';
export default class Topbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            keyboardAvoidingViewKey: 'keyboardAvoidingViewKey',
            loading: false,
        }
    }

    render() {
        let { keyboardAvoidingViewKey } = this.state
        const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0

        return (
            <SafeAreaView>
                <View style={{ width: wp('100%'), height: hp('8%'), backgroundColor: color.colorPrimary, flexDirection: 'row' }}>
                    <TouchableOpacity activeOpacity={1}
                        onPress={() => this.props.navigation.navigate("HomeScreen")}
                        style={{ justifyContent: 'center', width: wp('15%'), }}>
                        <Image
                            style={{ resizeMode: 'contain', width: wp('10%'), height: hp('3.5%') }}
                            source={require('../assets/Image/ic_hamburger.png')} />

                    </TouchableOpacity>

                    <View style={{ justifyContent: 'center', width: wp('70%'), alignItems: 'center', }}>
                        <Image
                            style={{ resizeMode: 'stretch', width: wp('10%'), height: hp('4%') }}
                            source={require('../assets/Image/splash_logo.png')} />

                    </View>
                    {/* <View style={{ justifyContent: 'center', width: wp('15%'), alignItems: 'center', }}>
                        <FontAwesome name="bell" color="#fff" size={16} />

                    </View> */}
                </View>
            </SafeAreaView >
        );
    }
}

