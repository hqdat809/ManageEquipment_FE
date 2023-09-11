import { Action } from 'redux';

export interface LoadingState {
  [key: string]: boolean;
}

const getLoadingMatches = (actionType: string) => /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(actionType);

const loadingReducer = (state: LoadingState = {}, action: Action) => {
  const matches = getLoadingMatches(action.type);

  if (!matches) {
    return state;
  }

  const [, requestName, requestStatus] = matches;
  return {
    ...state,
    [requestName]: requestStatus === 'REQUEST',
  };
};

export default loadingReducer;
