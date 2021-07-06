import React,{useEffect,useState} from "react"
import {Text,View,SafeAreaView} from "react-native"
import AsyncStorage from '@react-native-community/async-storage'
import APICaller from '../../utilities/apiCaller'
import * as userActions from '../../redux/actions/user'
import { connect } from 'react-redux';
import Loader from '../../commonComponents/loader';
import { withNavigationFocus } from 'react-navigation';

const WhiteScreen = ({navigation,userData,dispatch,isFocused}) => {

    const [isLoading,setIsLoading] = useState(true);

    const getSubscriptionData = async () => {
        
        if(userData.user_type === 1){
            const token = await AsyncStorage.getItem('userToken');
            console.log(token,"token")
            APICaller('subscription',undefined,'GET',token).then((response) =>{
              const {data} = response.data
              //console.log(data,"from getSubscriptiondatadata function in student dashboard")
            
              setIsLoading(false);
              if(data.length >0){
                dispatch(userActions.setSubscriptionStatus(true))
                
                    navigation.navigate("DashBoardScreen")
                
            
              }
              else{
                dispatch(userActions.setSubscriptionStatus(false))
                navigation.navigate("StudentDashBoard")
            }
              
            })
        }
        else if(userData.user_type === 2){
            const token = await AsyncStorage.getItem('userToken');
            console.log(token,"token")
            //console.log(token,"token")
            APICaller('subscription',undefined,'GET',token).then((response) =>{
              const {data} = response.data
              console.log(data,"from getSubscription data function in white screen")
              dispatch(userActions.ParentSubscriptionDetails(data))
                setIsLoading(false);
              if(data.length >0){
                  // subscription exist
                dispatch(userActions.setSubscriptionStatus(true))
                
                APICaller("students",undefined, 'GET', token)
                .then(({data})=>{
                    console.log(data,"dd")
                    if(data.data.length > 0){
                        navigation.navigate("DashBoardScreen")
                    }
                    else{
                        dispatch(userActions.getSubscriptionData(data))
                        navigation.navigate("AddChildren")
                    }
                })
                .catch(err=>{
                  console.log(err)
                })
                    
                
            
              }
              else{

                // subscription does not exist
                dispatch(userActions.setSubscriptionStatus(false))
                
                // if subscription does not exist check whether student has subscription
                APICaller("students",undefined, 'GET', token)
                .then(({data})=>{
                    console.log(data,"ddd")
                    if(data.data.length > 0){
                        dispatch(userActions.setSubscriptionStatus(true))
                        navigation.navigate("DashBoardScreen")
                    }
                    else{
                        dispatch(userActions.getSubscriptionData(data))
                        navigation.navigate("Subscription")
                    }
                })
                .catch(err=>{
                  console.log(err)
                })
            }
              
            })
        }
    }

    useEffect(()=>{
        getSubscriptionData()
    },[isFocused])
    return(
        <>
        <SafeAreaView style={{flex: 1,backgroundColor:"white"}}>
        <Loader loading={isLoading} />
        </SafeAreaView>
        </>
    )
}

const mapStateToProps = (state) => ({
    userData: state.UserReducer.userData,
    subscribeStatus:state.UserReducer.subscribeStatus,
    isFreeTrialEnabled:state.UserReducer.isFreeTrialEnabled
})

export default connect(mapStateToProps)(withNavigationFocus(WhiteScreen))
