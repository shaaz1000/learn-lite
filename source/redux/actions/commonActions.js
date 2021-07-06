import ActionType from '../constants/index';

export const toggleHamburgerMenu = param => {
  return {
    type: ActionType.TOGGLE_HAMBURGER_MENU,
    payload: true,
  };
};

export const setNavigationProps = param =>{
  return {
    type:ActionType.SET_NAVIGATION_PARAM,
    payload:param
  }
}

export const setToken = param =>{
  return {
    type:ActionType.SET_NAVIGATION_PARAM,
    payload:param
  }
}

