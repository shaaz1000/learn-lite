/* This is an Login Registration example from https://aboutreact.com/ */
/* https://aboutreact.com/react-native-login-and-signup/ */

//Import React and Hook we needed
import React from 'react';
import HambugerMenuComponent from './hamburgerMenu'

const Wrapper = props => {
  const { loading } = props;

  return (
      <>
    <HambugerMenuComponent />
    </>
  );
};
export default Wrapper;

