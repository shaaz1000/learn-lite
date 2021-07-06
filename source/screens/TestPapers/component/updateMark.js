import React, { useState } from 'react';
import {View,Text,StyleSheet,Image,TextInput,TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal'
import normalize from '../../../utilities/UtilityMethods';
import UpdateMarkImage from '../../../assets/Image/updateMarkIllustraion.png'

const UpdateMarks =(props)=>{
    console.log('props in modal',props)
    const {marksData} = props;
    const [textValue,setTextValue] = useState(JSON.stringify(marksData.marks_obtained))

    return <Modal onBackdropPress={()=>{
        props.toggleUpdateModal()
    }} isVisible={props.isVisible} style={{
        justifyContent:'center',
        alignItems:'center'
    }}>
        <View style={styles.mainConatiner}>
            <Image source={UpdateMarkImage} style={styles.imageStyle}/>
            <Text style={styles.updateTextStyle}>Update Marks</Text>
            <View style={{marginTop:normalize(39),marginLeft:normalize(45)}}>
                <Text style={styles.ttlMarkStyle}>Total Marks</Text>
                <TextInput 
                    defaultValue={marksData.marks_obtained !=null ? JSON.stringify(marksData.marks_obtained):""}
                    onChangeText={(text)=>{
                        setTextValue(text)
                    }}
                    style={styles.textInputStyle}/>
            </View>
            <TouchableOpacity style={styles.updateButton} onPress={()=>{
                if(textValue !="" && textValue !=null){
                 props.updateMarks(textValue)

                }else {
                    alert('Please enter the valid marks')
                }
            }}>
                <Text style={styles.updateButtonTextStyle}>Update</Text>
            </TouchableOpacity>
        </View>
    </Modal>
}

export default UpdateMarks


const styles = StyleSheet.create({
    mainConatiner:{
        height:normalize(484),
        width:normalize(354),
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
    }
})