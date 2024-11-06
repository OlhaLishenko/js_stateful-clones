'use strict';

function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let newState = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(newState, action.extraData);
      stateHistory.push(structuredClone(newState));
    }

    if (action.type === 'removeProperties') {
      if (Array.isArray(action.keysToRemove)) {
        for (const keyToRemove of action.keysToRemove) {
          delete newState[keyToRemove];
        }
        stateHistory.push(structuredClone(newState));
      } else {
        continue;
      }
    }

    if (action.type === 'clear') {
      newState = {};
      stateHistory.push(structuredClone(newState));
    }
  }

  return stateHistory;
}
module.exports = transformStateWithClones;
