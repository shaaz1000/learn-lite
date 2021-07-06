import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import AppImages from '../../assets/Image/index';
import normalize from '../../utilities/UtilityMethods';
import { connect } from 'react-redux'
import * as userAction from '../../redux/actions/user'
const slides = [
    {
        key: 1,
        title: 'Student Dashboard',
        text: `Track your study and revision progress with an attractive and easy to use dashboard`,
        image: AppImages.introImage_1,
    },
    {
        key: 2,
        title: 'Detailed Overview',
        text: `Witness the statistical information of your entire course completion progress right on the dashboard.`,
        image: AppImages.introImage_2,
    },
    {
        key: 3,
        title: 'Handpicked Videos and Test Papers',
        text: `Study with the best handpicked videos and assess your study with regular quizzes.`,
        image: AppImages.introImage_3,
    },
    {
        key: 4,
        title: 'Planning & Scheduling',
        text: `Feel accomplished with highly researched and personalized plan put in place to study and revise with ease`,
        image: AppImages.introImage_4,
    }
];
const IntroductionScreen = (props) => {

    const [currentSlide,setCurrentSlide] = useState(0)
    const sliderRef = useRef()
    useEffect(() => {
        (async () => {
        //   await AsyncStorage.setItem('IntroductionStatus','true')
        })()

    }, [])

    const _renderItem = ({ item }) => {
        return (
            <View style={styles.slide}>
                <View style={styles.topView}>
                    <Image source={item.image} />
                </View>

                <View style={styles.bottomView}>
                    <Text style={styles.titleStyle}>{item.title}</Text>
                    <Text style={styles.descriptionStyle}>{item.text}</Text>
                </View>

            </View>
        );
    }

    const _onDone = async () => {
        props.navigation.navigate('Auth')
    }

    const hanldeBack = ()=>{

        if(currentSlide > 0 ){
            let tempSlideNumber = currentSlide-1
            setCurrentSlide(tempSlideNumber)
            sliderRef.current.goToSlide(tempSlideNumber)
        }
    }
    const hanldeNext =()=>{
        console.log('curent slode',currentSlide)
        if(currentSlide <3) {
            let tempSlideNumber = currentSlide+1
            setCurrentSlide(tempSlideNumber)
            sliderRef.current.goToSlide(tempSlideNumber)
            // if(tempSlideNumber + 1 == 4){
            //     setTimeout(()=>{
            //         _onDone();
            //     },300)
            // }

        }
    }
    return <View style={styles.mainContainer}>
        <AppIntroSlider
        ref={sliderRef}
            renderItem={_renderItem}
            showDoneButton={true}
            data={slides}
            bottomButton={true}
            onSlideChange={(item) => {
                console.log('slide change', item)
                setCurrentSlide(item)
                // if (item == 3) {
                //     setTimeout(() => {
                //         _onDone()
                //     }, 100)
                // }
            }}
            onDone={_onDone}
            renderPagination={item => {
                return <View style={styles.paginationContainer}>
                    {slides.length && slides.map((data, index) => {
                        return <View style={[
                            styles.dotStyle,
                            {
                                backgroundColor: item == index ? '#fff' : 'rgba(255, 255, 255, 0.5)'
                            }
                        ]}>
                        </View>
                    })}
                </View>
            }}
        />
        <View style={styles.slideActionButtonContainer}>
            {currentSlide > 0 ?   <TouchableOpacity style={styles.actionButton} onPress={()=>{
                hanldeBack()
            }}>
                <Text style={styles.actionButtonText}>Back</Text>
            </TouchableOpacity> : <View />}

            {currentSlide < 3 ?   <TouchableOpacity style={styles.actionButton} onPress={()=>{
                hanldeNext()
            }}>
                <Text style={styles.actionButtonText}>Next</Text>
            </TouchableOpacity> : <TouchableOpacity style={styles.actionButton} onPress={()=>{
                _onDone()
            }}>
                <Text style={styles.actionButtonText}>Done</Text>
            </TouchableOpacity>}
        </View>
    </View>

}

export default connect()(IntroductionScreen)

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    slide: {
        flex: 1,
    },
    topView: {
        height: heightPercentageToDP('70%'),
        backgroundColor: '#FFD245',
        borderBottomEndRadius: normalize(50),
        borderBottomStartRadius: normalize(50),
        justifyContent: 'center',
        alignItems: 'center'
    },
    paginationContainer: {
        height: normalize(30),
        width: normalize(110),
        alignSelf: 'center',
        // backgroundColor:'green',
        position: 'absolute',
        bottom: heightPercentageToDP('34%'),
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    dotStyle: {
        height: normalize(12),
        width: normalize(12),
        borderRadius: normalize(12) / 2,
        backgroundColor: 'rgba(255, 255, 255, 0.5)'
    },
    bottomView: {
        height: heightPercentageToDP('30%'),
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    titleStyle: {
        fontFamily: 'Sora-Bold',
        fontSize: normalize(26),
        color: '#2B4D76',
        textAlign:'center'
    },
    descriptionStyle: {
        fontSize: normalize(14),
        color: '#2B4D76',
        textAlign: 'center',
        paddingHorizontal: normalize(30),
        marginTop: normalize(8)
    },
    slideActionButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        paddingTop:heightPercentageToDP("1%"),
        bottom: heightPercentageToDP('1%'),
        height: heightPercentageToDP('5%'),
        width: '100%',
        paddingHorizontal: heightPercentageToDP('3%')
    },
    actionButtonText: {
        fontSize: heightPercentageToDP('1.8%'),
        color: '#fff',
        fontWeight: 'bold'
    },
    actionButton:{
        backgroundColor:'#FFD245',
        height:heightPercentageToDP('4.5%'),
        width:heightPercentageToDP('8%'),
        justifyContent:'center',
        alignItems:'center',
        borderRadius:heightPercentageToDP('1%')
    }
})