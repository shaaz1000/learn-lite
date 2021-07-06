import React from 'react';
import {View,Text,SafeAreaView,StyleSheet,Image,TouchableOpacity,StatusBar} from 'react-native';
import AppImages from '../assets/Image';
import normalize from '../utilities/UtilityMethods';
import {connect} from 'react-redux';
import * as commonAction from '../redux/actions/commonActions';
import {withNavigation} from 'react-navigation'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen"
const HeaderComponent = (props) =>{
    console.log(props.subscribeStatus,"props props props props")

    return  <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.leftButton} onPress={()=>{
                props.dispatch(commonAction.toggleHamburgerMenu())
            }}>
                <Image source={AppImages.ic_hamburger} style={styles.hamburgerIconStyle} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{
                props.subscribeStatus === true ?
                props.navigation.navigate("DashBoardScreen")
                :
                alert("Please Enroll to a subject")
            }}>
                <Image source={AppImages.splashLogo} style={styles.logoStyle}/>
            </TouchableOpacity>
            {/* <TouchableOpacity>
                <Image source={AppImages.notificationIcon} style={styles.notificationIconStyle}/>
            </TouchableOpacity> */}
        </View>
    
}

const mapStateToProps = state => ({
    userData: state.UserReducer.userData,
    subscribeStatus:state.UserReducer.subscribeStatus,
    isFreeTrialEnabled:state.UserReducer.isFreeTrialEnabled,
    userSubscriptionDetails : state.UserReducer.userSubscriptionDetails
})

export default connect(mapStateToProps)(withNavigation(HeaderComponent));

const styles = StyleSheet.create({

    headerContainer:{
        paddingHorizontal:normalize(20) , 
        flexDirection:'row',
        justifyContent:"center", 
        //alignItems:'center',
        height:normalize(70),
        backgroundColor:'#FFD245',
        borderBottomColor:'#FFD245',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        
        elevation: 5,
        zIndex:1

    },
    leftButton:{
        height:normalize(50),
        width:normalize(40),
        justifyContent:'center',
        right:wp("35%"),
        marginTop:hp("1%")
    },
    hamburgerIconStyle:{
        height:normalize(19),
        width:normalize(21.5)
    },
    logoStyle:{
        width:normalize(57.12),
        height:normalize(43.17),
        resizeMode:'contain', 
        justifyContent: 'center',
        marginTop:10,
        
    },
    notificationIconStyle:{
        height:normalize(23),
        width:normalize(21.5)
    }

})