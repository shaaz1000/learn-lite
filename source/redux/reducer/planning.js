import ActionType from '../constants/index';
const initialState = {
    selectedMonth:{},
    selectedSubject:{},
    selectedChapter:{}
};

const PlanningReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_SELECTED_MONTH:
      return Object.assign({}, state, {
        selectedMonth: action.payload
      });

    case ActionType.SET_SELECTED_SUBJECT:
      return Object.assign({},state,{
        selectedSubject:action.payload
      })

    case ActionType.SET_SELECTED_CHAPTER:
        return Object.assign({},state,{
            selectedChapter:action.payload
        })

    default:
      return state;
  }
};

export default PlanningReducer;
