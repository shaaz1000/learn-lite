import React, { useState ,useEffect} from 'react';
import {View,Text,StyleSheet,Image,TextInput,TouchableOpacity,Dimensions,SafeAreaView,Platform} from 'react-native';
import Modal from 'react-native-modal'
import normalize from '../utilities/UtilityMethods';
import { WebView } from 'react-native-webview';
import Pdf from 'react-native-pdf';
import AppImage from '../assets/Image/index'
const PDFViewerComponent =(props)=>{
    // console.log('props in modal',props)
    const [TotalPages,setTotalPages] = useState("")
    const source = {uri:'http://samples.leanpub.com/thereactnativebook-sample.pdf',cache:true};
    return <Modal onBackdropPress={()=>{
        props.closePdfViewer()
    }} isVisible={props.isVisible} style={{
        justifyContent:'center',
        alignItems:'center',
        margin:0,
    }}>
        <View style={styles.mainConatiner}>
            <SafeAreaView style={{ backgroundColor:'#FFD245'}}></SafeAreaView>
            <View style={{
                        paddingHorizontal:normalize(10) , 
                        flexDirection:'row',
                        justifyContent:'flex-end', 
                        alignItems:'center',
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
            }}>
                <TouchableOpacity onPress={()=>{
                    props.closePdfViewer()
                }} style={{height:normalize(50),
                    width:normalize(50),justifyContent:'center'}}>
                        <Image source={AppImage.ic_close} style={{
                            height:normalize(40),
                            width:normalize(40)
                        }}/> 
                </TouchableOpacity>
            </View>
            
            {/* <WebView source={props.source} /> */}
        
        <Pdf
                    source={props.source}
                    onPress={(s)=>console.log(s,"S")}
                    onLoadComplete={(numberOfPages,filePath)=>{
                        setTotalPages(numberOfPages)
                        
                    }}
                    onPageChanged={(page,numberOfPages)=>{
                        console.log(`current page: ${page}`);
                    }}
                    onError={(error)=>{
                        console.log(error,"error");
                    }}
                    onPressLink={(uri)=>{
                        console.log(`Link presse: ${uri}`)
                    }}
                    
                    style={styles.pdf}/>
       
        </View>
    </Modal>
}

export default PDFViewerComponent


const styles = StyleSheet.create({
    mainConatiner:{
        height:'100%',
        width:'100%',
        backgroundColor:'#fff',
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
    },
    pdf: {
        flex:1,
        
    }
})