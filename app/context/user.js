import React, {createContext, useReducer} from 'react';
export const UserContext = createContext();

export const UserProvider = ({reducer, initialState, children}) =>(
  <UserContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </UserContext.Provider>
);

export const reducer = (state, {key = null, value = ''} = {}) => {
  if (key) {
    const newState = {...state};
    newState[key] = value;
    return newState;
  }
  else return state;
};

export const initialState = { user: null, role: null };