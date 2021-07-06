/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
  LogBox,
} from 'react-native';
import {Provider} from 'react-redux';
import store from './source/redux/store'
import { unsubscribe, getNetwork } from './source/utilities/CheckNetwork';
import AppContainer from './source/navigation/index'
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import AppComponent from './source/app'

  export default class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        checkNetwork:false,
      };
    }
    componentDidMount() {
      LogBox.ignoreAllLogs(true);
      this.checkNetWork();
      this.updateState();
    }
    componentWillUnmount() {
      this.updateState();
    }
    async checkNetWork()  {
      let checknet = await (getNetwork());
      this.setState({checkNetwork:checknet});
    }
    async updateState() {
      let checknet = await (unsubscribe());
      this.setState({checkNetwork:checknet});
    }
    render() {
 
      
      return <Provider style={{flex: 1}} store={store}>
            <AppComponent />
        </Provider>
    }
  }

