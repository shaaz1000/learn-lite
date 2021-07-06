import React, { useState,forwardRef, useRef, useImperativeHandle } from 'react';
import {View,Text,StyleSheet,Image,TextInput,TouchableOpacity,ScrollView} from 'react-native';
import Modal from 'react-native-modal'
import { color } from 'react-native-reanimated';
import normalize from '../utilities/UtilityMethods';
import { Icon } from 'react-native-elements'
import AppImages from '../assets/Image'
const pickerComponent = forwardRef ((props,ref)=>{
    
        const [isVisible,setIsVisible] = useState(false)
    
        useImperativeHandle(ref, () => ({

            open(){
                setIsVisible(true)
            },

            close(){
                setIsVisible(false)
            }
        
          }));

        const TextRowComponent = (props)=>{
            return <TouchableOpacity onPress={()=>{
                props.onChangeItem(props.item)
                setIsVisible(false)
            }}style={styles.textRowStyle}>
            <Text style={[styles.textStyle,props.selectedValue == props.item ? {color:"red"} : {color:'#333'}]}>{props.labelExtractor(props.item)}</Text>
        </TouchableOpacity>
        }
        
    
        return <Modal onBackdropPress={()=>{
            setIsVisible(false)
        }} isVisible={isVisible} style={{
            justifyContent:'center',
            alignItems:'center'
        }}>
            <View style={styles.mainConatiner}>
                <View style={{flexDirection:'row', justifyContent:'center' , alignItems:'center',paddingVertical:normalize(12),marginBottom:normalize(5)}}>
                    <Text style={{
                        fontSize:normalize(16),
                        fontWeight:'700',
                        color:"#000",
                        }}>{props.title}</Text>
                    <TouchableOpacity onPress ={()=>{
                        setIsVisible(false)
                    }}style={{ 
                        position:'absolute',
                        right:normalize(25),
                        height:normalize(20),
                        width:normalize(20),
                        borderRadius:normalize(20)/2 ,
                        backgroundColor:'#fff',
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 5,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 8,
                        
                        elevation: 5,
                        zIndex:1,
                        justifyContent:'center',
                        alignItems:'center'
                        }}>
                            <Image source={AppImages.crossIconBlack} style={{
                                height:normalize(10),
                                width:normalize(10),
                                resizeMode:'contain'
                            }}/>
                        </TouchableOpacity>
                </View>
                <ScrollView>
                    {props.data && props.data.length ? props.data.map((item,index)=>{
                        return <TextRowComponent {...props} item={item}/>
                    }):null}
                </ScrollView>
            </View>
        </Modal>




    
})

export default pickerComponent




const styles = StyleSheet.create({
    mainConatiner:{
        // height:normalize(484),
        maxHeight:normalize(500),
        width:normalize(354),
        backgroundColor:'#fff',
        borderRadius:normalize(14.5),
        paddingVertical:normalize(20)
        // alignItems:'center'
    },
    textRowStyle:{
        marginHorizontal:normalize(25),
        paddingBottom:normalize(10),
        paddingVertical:normalize(8),
        borderBottomColor:'#999',
        borderBottomWidth:normalize(1)
    },
    textStyle:{
        fontSize:normalize(14),
        fontWeight:'400',
        color:'#333'
    }

})