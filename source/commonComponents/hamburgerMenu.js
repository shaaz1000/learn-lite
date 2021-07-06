import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Alert,SafeAreaView } from 'react-native';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-community/async-storage';
import { withNavigation } from 'react-navigation'
import AppImages from '../assets/Image';
import normalize from '../utilities/UtilityMethods';
import commonStyling from '../commonStyles/CssStyle';
import AppColor from '../utilities/AppColor';
import { connect } from 'react-redux';
import * as commonAction from '../redux/actions/commonActions';
import * as Storage from '../utilities/Storage';
import * as AuthApi from '../services/Auth'
const HambugerMenuComponent = (props) => {
    
    console.log(props.subscribeStatus,"subscribe status from hamburger menu")
    const logout = () => {
        Alert.alert(
            'Logout',
            'Are you sure? You want to logout?',
            [
                {
                    text: 'Cancel',
                    onPress: () => {
                        return null;
                    },
                },
                {
                    text: 'Confirm',
                    onPress: () => {
                        userlogout()
                        closeMenu()
                    },
                },
            ],
            { cancelable: false },
        );
    };


    const userlogout = async () => {
        try {
            // let response = await AuthApi.Logout();
            // if (response.code == 200) {
            Storage.userData = {};
            Storage.jwt_Token = ""
            AsyncStorage.clear();
            props.navigationProps.navigate('Auth');
            // }
        }
        catch (e) {
            console.log("userLogout Exception", e)
        }
    }

    const closeMenu = () => {
        props.dispatch(commonAction.toggleHamburgerMenu())
    }

    return <Modal isVisible={props.isVisible} style={{
        marginBottom: 40
    }}>
        <SafeAreaView></SafeAreaView>
        <View style={commonStyling.flexOne}>
            <View style={styles.closeButtonContainer}>
                <TouchableOpacity onPress={() => {
                    closeMenu()
                }}>
                    <Image source={AppImages.ic_close} style={styles.closeIconStyle} />
                </TouchableOpacity>
            </View>
            <View style={styles.modalBody}>
                <View style={commonStyling.columnCenter}>
                    {
                        props.userData.user_type === 2
                        ?
                        <View style={styles.avatarContinerStyle}>
                        <Image source={AppImages.group1385_1} style={styles.avatarImageStyle} />
                        </View>
                        :
                        <View style={styles.avatarContinerStyle}>
                        <Image source={AppImages.ic_avatar_default} style={styles.avatarImageStyle} />
                        </View>
                    }
                    {props.userData.firstname === undefined ?
                    <View style={styles.avatarNameContainer}>
                        <Text style={{
                            alignSelf: 'center',
                            fontSize: normalize(20)
                        }}>
                            Hello,{props.userData.user_firstname +' '+ props.userData.user_lastname}
                        </Text>
                    </View>
                    :
                    <View style={styles.avatarNameContainer}>
                        <Text style={{
                            alignSelf: 'center',
                            fontSize: normalize(20)
                        }}>
                            Hello,{props.userData.firstname +' '+ props.userData.lastname}
                        </Text>
                    </View>
                    }
                </View>
                <ScrollView style={styles.scrollViewStyle}>
                    {props.userData.user_type === 1 ?
                        <>
                            <MenuItemComponent action={() => {
                                closeMenu()
                                setTimeout(()=>{
                                    props.subscribeStatus === false ? 
                                    null : 
                                    props.navigationProps.navigate("DashBoardScreen")
                                    

                                },500)
                            }}  selected={true} title="Dashboard" icon={AppImages.ic_navigate_dashboard} height={normalize(24)} width={normalize(24)} />
                             <MenuItemComponent action={() => {
           
                                    closeMenu()
                                    setTimeout(()=>{
                                        props.subscribeStatus === false ? 
                                        null :
                                        props.navigationProps.navigate("PlanYourLearning")

                                    },500)
                                }} selected={false} title="Planning & Scheduling" icon={AppImages.ic_navigate_planning_scheduling} height={normalize(24)} width={normalize(24)} />
                            <MenuItemComponent action={() => {
                                closeMenu()
                                setTimeout(()=>{
                                    props.subscribeStatus === false ? 
                                    null :
                                    props.navigationProps.navigate("StuSubscription")

                                },500)
                            }} selected={false} title="My Subscription" icon={AppImages.ic_navigate_my_subscription} height={normalize(20)} width={normalize(16)} />
                           
                            <MenuItemComponent 
                                action={() => {
                                closeMenu()
                                setTimeout(()=>{
                                    props.navigationProps.navigate("Feedback");
    
                                },500)
                                }}
                                selected={false} 
                                title="Feedbacks" icon={AppImages.ic_navigate_feedbacks} 
                                height={normalize(18)} width={normalize(18)} />
                            <MenuItemComponent action={() => {
                                closeMenu()
                                setTimeout(()=>{
                                    
                                    props.userData.user_type == 2 ?
                                        props.navigationProps.navigate("ParentProfile")
                                    : 
                                        props.navigationProps.navigate("MyProfile")

                                },500)
                            }} selected={false} title="My Profile" icon={AppImages.profileIcon} height={normalize(18)} width={normalize(15)} />
                            
                            {/* <MenuItemComponent 
                                selected={false} 
                                title="About Us" 
                                icon={AppImages.about_us_1}
                                height={normalize(24)} width={normalize(24)}
                            /> */}
                            {/* <MenuItemComponent 
                                selected={false} 
                                title="Privacy Policy" 
                                icon={AppImages.close_octagon_1}
                                height={normalize(24)} width={normalize(24)}
                            /> */}
                            {/* <MenuItemComponent 
                                selected={false} 
                                title="5 Pillars of LearnLite" 
                                icon={AppImages.note_text_1}
                                height={normalize(24)} width={normalize(24)}
                            /> */}
                            <MenuItemComponent selected={false} title="Logout" icon={AppImages.ic_navigate_logout} height={normalize(18)} width={normalize(18)} action={logout} />
                        </>

                        :
                        <>
                            <MenuItemComponent selected={true} action={() => {
                                closeMenu()
                                setTimeout(()=>{
                                    props.subscribeStatus === false ? 
                                    null : 
                                    props.navigationProps.navigate("DashBoardScreen")
                                    
                                },500)
                            }} selected={false} title="Dashboard" icon={AppImages.ic_navigate_dashboard} height={24} width={24} />
                            <MenuItemComponent selected={true} action={() => {
                                closeMenu()
                                setTimeout(()=>{
                                    // props.userData.user_type == 2 ?
                                        props.navigationProps.navigate("ParentProfile")
                                    // : 
                                    //     props.navigationProps.navigate("MyProfile")

                                },500)
                            }} selected={false} title="My Profile" icon={AppImages.profileIcon} height={24} width={24} />
                            <MenuItemComponent action={() => {
                            closeMenu()
                            setTimeout(()=>{
                                props.navigationProps.navigate("MySubscriptionScreen");

                            },500)
                            }} selected={false} title="Subscription" icon={AppImages.ic_navigate_my_subscription} height={normalize(20)} width={normalize(16)} />
                            <MenuItemComponent selected={true} action={() => {
                                closeMenu()
                                setTimeout(()=>{
                                    
                                    
                                        props.navigationProps.navigate("MyChildren")

                                },500)
                            }} selected={false} title="My Children" icon={AppImages.profileIcon} height={24} width={24} />

                            
                            <MenuItemComponent action={() => {
                            closeMenu()
                            setTimeout(()=>{
                                props.navigationProps.navigate("Feedback");

                            },500)
                            }} selected={false} title="Feedbacks" icon={AppImages.ic_navigate_feedbacks} height={normalize(20)} width={normalize(16)} />
                            {/* <MenuItemComponent action={() => {
                            closeMenu()
                            setTimeout(()=>{
                                props.navigationProps.navigate("StuSubscription");

                            },500)
                            }} selected={false} title="My Subscription" icon={AppImages.ic_navigate_my_subscription} height={normalize(20)} width={normalize(16)} /> */}

                            <MenuItemComponent selected={false} title="Logout" icon={AppImages.ic_navigate_logout} height={18} width={18} action={logout} />

                        </>
                    }
                </ScrollView>
                <Image source={AppImages.ic_menu_bottom_overlay} style={styles.bottomAbsoluteImageStyle} />
            </View>
        </View>
    </Modal>
}

const MenuItemComponent = (props) => {

    return <View>
        <TouchableOpacity style={[
            { height: props.selected ? normalize(62) : normalize(55) },
            styles.menuItemContainer,
            props.selected ? { backgroundColor: AppColor.colorPrimary } : null
        ]} onPress={props.action}>
            <View style={commonStyling.flexOne}>
                {props.icon ? <Image source={props.icon} style={{ height: normalize(props.height), width: normalize(props.width),resizeMode:'contain' }} /> : null}
            </View>
            <View style={styles.itemNameContainer}>
                <Text style={[{
                    fontSize: normalize(18),
                    color: '#2B4D76',
                }, props.selected ? { fontWeight: 'bold' } : null]}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    </View>
}


const styles = StyleSheet.create({

    closeButtonContainer: {
        height: normalize(30),
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    closeIconStyle: {
        height: normalize(25),
        width: normalize(25)
    },
    modalBody: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: normalize(10)
    },
    avatarContinerStyle: {
        height: normalize(90),
        width: normalize(90),
        borderRadius: normalize(90) / 2,
        marginTop: normalize(35)
    },
    avatarImageStyle: {
        height: '100%',
        width: '100%'
    },
    avatarNameContainer: {
        marginTop: normalize(18),
        marginBottom: normalize(7)
    },
    scrollViewStyle: {
        flex: 1,
        zIndex: 10,
        paddingBottom: normalize(10)
    },
    bottomAbsoluteImageStyle: {
        position: 'absolute',
        alignSelf: 'flex-end',
        resizeMode: 'stretch',
        bottom: 0,
        width: '100%',
        height: normalize(243)
    },
    menuItemContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: normalize(29)
    },
    itemNameContainer: {
        flex: 9,
        marginLeft: normalize(14)
    }
})

const mapStateToProps = state => ({
    isVisible: state.CommonReducers.isHamburgerMenuVisible,
    navigationProps: state.CommonReducers.navigationProps,
    subscribeStatus: state.UserReducer.subscribeStatus,
    userData:state.UserReducer.userData
})
export default connect(mapStateToProps)((HambugerMenuComponent))