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
      style={[styles.cardStyle,{backgroundColor: props.bgcolor}]}>
      <View style={[styles.mainContainer]}>
        <Text style={[styles.textStyle,{fontSize: hp('2%')}]}>Total No. of</Text>
        <Text style={[styles.textStyle,{fontSize: hp('2%')}]}>Chapters</Text>
        <Text style={[styles.textStyle,{fontSize: hp('2.1%'),fontWeight: 'bold'}]}>{props.chapter_text}</Text>
        <Text style={[styles.textStyle,{fontSize: hp('2.3%')}]}>{props.total_chapters}</Text>
      </View>
    </CardView>

  );
};

const styles = StyleSheet.create({
  mainContainer:{
    flex: 1, alignItems: 'center', justifyContent: 'center',
  },
  textStyle:{
    color: color.colorWhite, justifyContent: 'center', alignContent: 'center',
  },
  cardStyle:{
    height: hp('18%'), width: wp('29%'),
  }

});

export default CustomeChapterBox;
