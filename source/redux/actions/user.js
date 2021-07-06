import ActionType from '../constants/index';

export const setUserData = param => {
  return {
    type: ActionType.SET_USER_DATA,
    payload: param,
  };
};

export const setSubscriptionStatus = param =>{
  return {
    type:ActionType.SET_SUBSCRIPTION_STATUS,
    payload:param
  }
}

export const isFreeTrialSubscribed = param =>{
  
  return {
    type : ActionType.IS_FREE_TRIAL_ENABLED,
    payload:param
  }
}

export const getSubscriptionData = param => {

  return {
    type : ActionType.SET_SUBSCRIPTION_DATA,
    payload : param
  }
}

export const setSubscribedSubject = param => {
  return {
    type : ActionType.SET_SUBSCRIBED_SUBJECTS,
    payload : param
  }
}

export const setParentDetails = param => {
  return{
    type : ActionType.SET_PARENT_DETAILS,
    payload : param
  }
}
export const setSubscribedMonth = param => {
  return{
    type : ActionType.SET_SUBSCRIBED_MONTH,
    payload : param
  }
}

export const setStudentDetails = param => {
  return{
    type : ActionType.SET_STUDENT_DETAILS,
    payload : param
  }
} 

export const setStudentList = param => {
  return{
    type : ActionType.SET_STUDENT_LIST,
    payload : param
  }
}

export const setSelectedStudentId = param => {
  return{
    type : ActionType.SET_SELECTED_STUDENT_ID,
    payload : param
  }
}

export const ParentSubscriptionDetails = param => {
  return {
    type : ActionType.PARENT_SUBSCRIPTION_DETAILS,
    payload : param
  }
}