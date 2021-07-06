import React from 'react';
import { View,Text, StyleSheet } from 'react-native';
import {responsiveScreenFontSize} from "react-native-responsive-dimensions";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import RNPicker from 'rn-modal-picker';
import color from '../../../utilities/AppColor';
const CustomePicker = props => {
  return (
    <RNPicker
      dataSource={props.dataSource}
      defaultValue={false}
      pickerTitle={props.title}
      showSearchBar={false}
      disablePicker={false}
      changeAnimation={'none'}
      searchBarPlaceHolder={'Search.....'}
      showPickerTitle={true}
      pickerStyle={styles.pickerStyle}
      itemSeparatorStyle={styles.itemSeparatorStyle}
      pickerItemTextStyle={styles.listTextViewStyle}
      selectedLabel={props.data}
      placeHolderLabel={props.data}
      scrollEnabled={false}
      selectLabelTextStyle={styles.selectLabelTextStyle}
      placeHolderTextStyle={styles.placeHolderTextStyle}
      dropDownImageStyle={styles.dropDownImageStyle}
      dropDownImage={require('../../../assets/Image/icon_arrow.png')}
      selectedValue={props.selectValue}
    />

  );
};

const styles = StyleSheet.create({
  itemSeparatorStyle: {
    height: 1,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: color.colorpickerSeperator,
  },
  selectLabelTextStyle: {
    color: color.colorBlack,
    textAlign: 'left',
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
    paddingHorizontal: 8,
    width: wp('35%'),
    fontSize: hp('2%'),
  },
  placeHolderTextStyle:{
    color: color.colorBlack,
    paddingHorizontal: 8,
    width: wp('35%'),
    fontSize: hp('2%'),
  },
  dropDownImageStyle: {
    alignSelf: 'center',
    width: wp('4%'),
    height: hp('4%'),
  },
  listTextViewStyle: {
    color: color.colorBlack,
    marginTop: 10,
    marginBottom: 10,
    flex: 0.9,
    marginLeft: 20,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'left',
    fontSize: hp('2%'),
  },
  pickerStyle: {
    flexDirection: 'row',
    height: hp('6%'),
    width: wp('43%'),
    color: color.colorBlack,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomePicker;
