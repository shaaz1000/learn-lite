import React from 'react';
import {View,Text,SafeAreaView} from 'react-native';
import AppNavigator from './navigation/index'
import HamburgerMenu from './commonComponents/hamburgerMenu';
import MenuConatiner from './commonComponents/HamburgerMenuContainer'
const AppComponent =(props)=>{

    return <View style={{flex:1}}>
        <AppNavigator />
        <MenuConatiner />
    </View>
}

export default (AppComponent)