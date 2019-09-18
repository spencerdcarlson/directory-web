import React, {createContext, useContext, useReducer} from 'react';
export const DirectoryContext = createContext();

export const DirectoryProvider = ({reducer, initialState, children}) =>(
  <DirectoryContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </DirectoryContext.Provider>
);

export const reducer = (state, {key = null, value = ''} = {}) => {
  if (key) {
    const newState = {...state};
    newState[key] = value;
    return newState;
  }
  else return state;
};

export const initialState = { csrf: 'none' };