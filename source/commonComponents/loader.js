/* This is an Login Registration example from https://aboutreact.com/ */
/* https://aboutreact.com/react-native-login-and-signup/ */

//Import React and Hook we needed
import React from 'react';

//Import all required component
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal'

const Loader = props => {
  const { loading } = props;
  return (
    <Modal
      hasBackdrop={false}
      isVisible={props.loading}
      style={{
        margin: 0
      }}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator size="large" color="#FFAD36" />
        </View>
      </View>
    </Modal>
  );
};
export default Loader;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});