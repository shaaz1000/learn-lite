import React, { useRef, useState } from 'react';
import {View,Text,StyleSheet,Image,TextInput,TouchableOpacity,SafeAreaView} from 'react-native';
import Modal from 'react-native-modal'
import normalize, { normalizeText } from '../../../utilities/UtilityMethods';
import VideoPlayer from 'react-native-video-player';
import YoutubePlayer from "react-native-youtube-iframe";
import  AppImages from '../../../assets/Image/index'
const VideoPlayerComponent =(props)=>{
  
    const videoRef = useRef()
    console.log('props =>>>',props);
    const splittedUrl = props &&  props.selectedVideo &&  props.selectedVideo.url && props.selectedVideo.url.split('/')
    const videoId =splittedUrl !=undefined ?  splittedUrl[splittedUrl.length-1]  :''
    return <Modal onBackdropPress={()=>{
        // props.togglePlayer()
    }} isVisible={props.isVisible} 
        style={{
        justifyContent:'center',
        alignItems:'center',
    }}>
        <SafeAreaView></SafeAreaView>
        <View style={styles.mainConatiner}>
        <View style={{
            height:normalize(50),
            justifyContent:'center',
            alignItems:'flex-end'
        }}>
            <TouchableOpacity style={{
                height:normalize(50),
                width:normalize(60),
                justifyContent:'center',
                alignItems:'flex-end'
            }}
            onPress={()=>{
                props.toggleVideoComponent()
            }}
            
            >
                <Image source={AppImages.ic_close} style={{
                    height:normalize(40),
                    width:normalize(40)
                }}/>
            </TouchableOpacity>
        </View>
        <YoutubePlayer
        height={normalize(300)}
        play={true}
        videoId={videoId}
      />
        </View>
    </Modal>
}

export default VideoPlayerComponent


const styles = StyleSheet.create({
    mainConatiner:{
        height:normalize(300),
        width:'100%',
        borderRadius:normalize(14.5),
        // alignItems:'center'
    },
    imageStyle:{
        height:normalize(144),
        width:normalize(179),
        marginTop:normalize(38),
        alignSelf:'center'
    },
    updateTextStyle:{
        fontSize:normalize(18),
        fontWeight:'700',
        color:'#2B4D76',
        marginLeft:normalize(45),
        marginTop:normalize(25)
    },
    ttlMarkStyle:{
        fontWeight:'400',
        fontSize:normalize(18),
        color:'#2B4D76'
    },
    textInputStyle:{
        height:normalize(42),
        width:normalize(275),
        borderWidth:normalize(2),
        borderColor:'#FFD245',
        borderRadius:normalize(7),
        marginTop:normalize(7),
        paddingHorizontal:normalize(5)
    },
    updateButton:{
        height:normalize(42),
        width:normalize(177),
        borderRadius:normalize(15.23),
        backgroundColor:'#FB1E92',
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        marginTop:normalize(17)
    },
    updateButtonTextStyle:{
        fontSize:normalize(16),
        fontWeight:'700',
        color:'#fff'
    }
})