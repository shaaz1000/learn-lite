import ActionType from '../constants/index';
const initialState = {
    userData:{},
    subscribeStatus:false,
    isFreeTrialEnabled:false,
    userSubscriptionDetails: "",
    subscribedSubjects : [],
    parentDetails : "",
    subscribedMonths : [],
    studentDetails : {},
    ListOfStudent:[],
    StudentId : 0,
    parentSubscriptionDetails : []
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_USER_DATA:
      return Object.assign({}, state, {
        userData: action.payload
      });

    case ActionType.SET_SUBSCRIPTION_STATUS:
      return Object.assign({},state,{
        subscribeStatus:action.payload
      })

    case ActionType.IS_FREE_TRIAL_ENABLED:
      return Object.assign({},state,{
        isFreeTrialEnabled: action.payload
      })
    
    case ActionType.SET_SUBSCRIPTION_DATA:
      return Object.assign({},state,{
        userSubscriptionDetails : action.payload
      })

    case ActionType.SET_SUBSCRIBED_SUBJECTS:
      return Object.assign({},state,{
        subscribedSubjects : action.payload
      })
    case ActionType.SET_PARENT_DETAILS:
      return Object.assign({},state,{
        parentDetails : action.payload
      })
    
    case ActionType.SET_SUBSCRIBED_MONTH:
      return Object.assign({},state,{
        subscribedMonths : action.payload
      })

    case ActionType.SET_STUDENT_DETAILS:
      return Object.assign({},state,{
        studentDetails : action.payload
      })
    case ActionType.SET_STUDENT_LIST :
      return Object.assign({},state,{
        ListOfStudent : action.payload
      })
    case ActionType.SET_SELECTED_STUDENT_ID:
      return Object.assign({},state,{
        StudentId : action.payload
      })
    case ActionType.PARENT_SUBSCRIPTION_DETAILS:
      return Object.assign({},state,{
        parentSubscriptionDetails : action.payload
      })
    default:
      return state;
  }
};

export default UserReducer;
