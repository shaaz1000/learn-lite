import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image, TextInput, ActivityIndicator } from 'react-native';
import AppImages from '../assets/Image';
import normalize from '../utilities/UtilityMethods';
import { connect } from 'react-redux';
import * as commonAction from '../redux/actions/commonActions'
import commonStyling from '../commonStyles/CssStyle'
import { color } from 'react-native-reanimated';
import { TouchableOpacity,FlatList} from 'react-native-gesture-handler'
const SearchBoxComponent = (props) => {


    return <View style={styles.searchBarContainer}>
        <View style={[{ flex: 1.5, }, commonStyling.columnCenter]}>
            <Image source={AppImages.searchIcon} style={{
                height:normalize(16),
                width:normalize(16)
            }}/>
        </View>
        <View style={[{ flex: 7.5 }, commonStyling.columnCenter, { alignItems: 'flex-start' }]}>
            <TextInput style={{ width: '100%', height: '100%',fontSize:normalize(14),fontFamily:'Sora-Regular' }}
                placeholder="Search"
                placeholderTextColor="#000"
                onChangeText={props && props.onChangeText}
            />
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingRight: normalize(5) }}>
           {props && props.showLoading ? <ActivityIndicator size="small" color="#999" /> :null} 
        </View>
        {props && props.showSuggestion && props.suggestionData.length ? <View style={{
            marginTop: normalize(58),
            position: 'absolute',
            maxHeight: normalize(200),
            width: '90%',
            backgroundColor: '#f8f8f8',
            padding: normalize(10),
            zIndex: 105
        }}>
            {/* <View style={{height:10,zIndex:99}}></View> */}
            <FlatList
 
                data={props.suggestionData}
                renderItem={({ item }) => {
                    return <TouchableOpacity style={styles.suggestionItemContainer} onPress={() => {
                        props && props.onItemPress(item)
                    }}>
                        <Text style={styles.suggestionTextStyle}>{item.chapter_name}</Text>
                    </TouchableOpacity>
                }}

            />
        </View> : null}


    </View>
}

export default connect()(SearchBoxComponent);

const styles = StyleSheet.create({

    searchBarContainer: {
        height: normalize(56),
        backgroundColor: '#fff',
        borderRadius: normalize(14.5),
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.13,
        shadowRadius: 8.62,

        elevation: 5,
        justifyContent: 'center',
        
    },
    suggestionItemContainer: {
        paddingVertical: normalize(8),
        paddingHorizontal: normalize(10),
        zIndex:110
    },
    suggestionTextStyle: {
        fontSize: normalize(14),
        color: '#999',
        fontWeight: '500',
        zIndex:116
    }
})