/* This is an Login Registration example from https://aboutreact.com/ */
/* https://aboutreact.com/react-native-login-and-signup/ */

//Import React and Hook we needed
import React,{useState} from 'react';
import { Touchable } from 'react-native';

//Import all required component
import { StyleSheet, View, Text ,Linking} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const IosPaymentStatisScreen = () => {
  
  return (
    <View style={{flex: 1,justifyContent: 'center', alignItems: 'center',backgroundColor:"white"}}>
        <Text style={styles.textStyle}>You can continue to access the content in Apple devices after completing the payment for subscription here <Text 
                
                style={{color:"red",textDecorationLine:"underline",fontWeight:"bold",fontSize:17}}>
             https://learnlite.in/subscribe/10
            </Text>
        </Text>
        <TouchableOpacity 
        onPress={()=>Linking.openURL("https://learnlite.in/subscribe/10")}
            style={styles.buttonStyle}>
            <Text style={{color:"white",fontSize:18,padding:5}}>Press here</Text>
        </TouchableOpacity>
    </View>
  );
};
export default IosPaymentStatisScreen;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    
  },
  textStyle:{
        fontSize:17,
        margin:10,
        fontWeight:"bold",
        textAlign:"center"
  },
  buttonStyle:{
      backgroundColor:"#FF4D4D",
      padding:10,
      borderRadius:10,
  }
});