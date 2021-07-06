import APIConstants from './URLConstant';
import Storage from '../utilities/Storage';
export let getSubscription = async (params) => {
    try {

        let response = await fetch(APIConstants.SUBSCRIPTION, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Storage.jwt_Token
            },
        })
        let result = await response.json()
        return result;

    } catch (e) {
        console.log(e.message)
        return null
    }
}