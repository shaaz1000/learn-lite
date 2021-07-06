import APIConstants from './URLConstant';
import Storage from '../utilities/Storage';
export let login = async (params) => {
    try {
        console.log("params", params);
        console.log("APIConstants.LOGIN", APIConstants.LOGIN);
        let response = await fetch(APIConstants.LOGIN, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        })
        let result = await response.json()
        console.log("result", result);
        return result;

    } catch (e) {
        console.log(e.message)
        return null
    }
}
export let Logout = async () => {
    try {

        let response = await fetch(APIConstants.LOGOUT, {
            method: 'Get',

        })
        let result = await response.json()
        return result;

    } catch (e) {
        console.log(e.message)
        return null
    }
}
export let updateProfile = async (params) => {
    try {
        console.log("params", params);
        console.log("JSON.stringify(params)",JSON.stringify(params))
        console.log("APIConstants.UPDATE_PROFILE", APIConstants.UPDATE_PROFILE);
        let response = await fetch(APIConstants.UPDATE_PROFILE, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        })
        let result = await response.json()
        console.log("result", result);
        return result;

    } catch (e) {
        console.log(e.message)
        return null
    }
}
// add parent student
export let addParentStudent = async (params) => {
    try {
        console.log("params", params);
        console.log("JSON.stringify(params)",JSON.stringify(params))
        console.log("APIConstants.addParentStudent", APIConstants.addParentStudent);
        let response = await fetch(APIConstants.addParentStudent, {
            method: 'POST',
            headers: {
                "Authorization" : "Bearer " + Storage.jwt_Token, 
                'Accept': 'application/json',
                // 'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        })
        let result = await response.json()
        console.log("result of add parent student", result);
        return result;

    } catch (e) {
        console.log(e.message)
        return null
    }
}