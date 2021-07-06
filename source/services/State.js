import APIConstants from './URLConstant';
export let getStates = async () => {
    try {

        let response = await fetch(APIConstants.GET_STATE, {
            method: 'Get',

        })
        let result = await response.json()
        return result;

    } catch (e) {
        console.log(e.message)
        return null
    }
}
export let getCity = async (params) => {
    try {

         let response = await fetch(APIConstants.GET_CITY, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)

        })
        let result = await response.json()
        return result;

    } catch (e) {
        console.log(e.message)
        return null
    }
}