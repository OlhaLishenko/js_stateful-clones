'use strict';

function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let newState = { ...state };

  for (const action of actions) {
    for (const key in action) {
      if (action[key] === 'addProperties') {
        Object.assign(newState, action.extraData);
        stateHistory.push(structuredClone(newState));
        break;
      }

      if (action[key] === 'removeProperties') {
        for (const keyToRemove of action.keysToRemove) {
          delete newState[keyToRemove];
        }
        stateHistory.push(structuredClone(newState));
        break;
      }

      if (action[key] === 'clear') {
        newState = {};
        stateHistory.push(structuredClone(newState));
        break;
      }
    }
  }

  return stateHistory;
}
module.exports = transformStateWithClones;
