import React from 'react';
import { View,Text, StyleSheet } from 'react-native';
import {responsiveScreenFontSize} from "react-native-responsive-dimensions";
import CardView from 'react-native-cardview';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import color from '../../../utilities/AppColor';
const CustomeChapterBox = props => {
  //const bgcolor = props.bgcolor;
  //console.log(bgcolor);
  return (
    <CardView
      cardElevation={2}
      cardMaxElevation={5}
      cornerRadius={10}
      style={[styles.cardStyle, { backgroundColor: props.bgcolor }]}>
      <View style={styles.containerViewStyle}>
        <View style={{ flex: 2 }}>
          <Text style={styles.textStyle}>Completed</Text>
          <Text style={styles.textStyle}>{props.label}</Text>
        </View>
        <View style={[styles.countStyle, { backgroundColor: props.countbgcolor,borderColor: props.countbgcolor }]}>
          <Text style={styles.textStyleCounter}>{props.completed_counter}</Text>
        </View>
      </View>
    </CardView>

  );
};

const styles = StyleSheet.create({
  containerViewStyle:{
    flexDirection:'row',flex: 2, alignItems: 'center', justifyContent: 'center',
  },
  textStyle:{
    marginLeft:wp('3%'),
    color: color.colorWhite,
    justifyContent: 'center',
    alignContent: 'center',
    fontSize: hp('2%'),
  },
  textStyleCounter:{
    color: color.colorWhite, justifyContent: 'center', alignSelf: 'center', fontSize: hp('1.8%'),
  },
  cardStyle:{
    height: hp('10%'), width: wp('43%'),
  },
  countStyle: {
    borderWidth: 1,
    color: color.colorWhite,
    height: hp('5%'),
    width:wp('9%'),
    borderRadius: 5,
    textAlignVertical: 'center',
    justifyContent: 'center',
    marginRight:wp('2%'),
    flex:0.5,
  },

});

export default CustomeChapterBox;
