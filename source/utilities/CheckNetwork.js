import NetInfo from '@react-native-community/netinfo';
let isNetwork = false;

export const unsubscribe11 = NetInfo.addEventListener(state => {
	isNetwork = state.isConnected;
	//console.log("Connection type", state.type);
	//console.log("Is connected?", state.isConnected);
  });

  export const unsubscribe = async() => {
	  await NetInfo.addEventListener(state => {
		isNetwork = state.isConnected;
		//console.log('unsubscribe' + isNetwork);
			global.checkInternet=isNetwork;
	  });
	  return isNetwork;
  }

  export const getNetwork = async () => {
	await NetInfo.fetch().then(state => {
		isNetwork = state.isConnected;
		//console.log('getNetwork' + isNetwork);
		global.checkInternet=isNetwork;
		//alert(dd);
		//console.log("Connection type", state.type);
		//console.log("Is connected?", state.isConnected);
	});
	return isNetwork;
};
