import ActionType from '../constants/index';
const initialState = {
    isHamburgerMenuVisible:false,
    navigationProps:{}
};

const CommonReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.TOGGLE_HAMBURGER_MENU:
      return Object.assign({}, state, {
        isHamburgerMenuVisible: !state.isHamburgerMenuVisible
      });

    case ActionType.SET_NAVIGATION_PARAM:
      return Object.assign({},state,{
        navigationProps:action.payload
      })

    default:
      return state;
  }
};

export default CommonReducer;
