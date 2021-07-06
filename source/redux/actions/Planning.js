import ActionType from '../constants/index';

export const setSelectedMonth = param => {
  return {
    type: ActionType.SET_SELECTED_MONTH,
    payload: param,
  };
};

export const setSelectedSubject = param =>{
  return {
    type:ActionType.SET_SELECTED_SUBJECT,
    payload:param
  }
}

export const setSelectedChapter = param =>{
    return {
      type:ActionType.SET_SELECTED_CHAPTER,
      payload:param
    }
  }
  