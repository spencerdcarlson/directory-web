import React, {useContext} from 'react';
import api from '../api/api'
import { DirectoryContext } from "../context/directory";

export default function CSRF() {
  const [ { csrf }, dispatch ] = useContext(DirectoryContext);
  return (
    <div>
      <button
        onClick={() => {
          api.csrf().then((data) => {
            const { csrf } = data;
            dispatch({
              key: 'csrf',
              value: csrf
            })
          })

        }}
      >
        Make me blue!
      </button>
      {csrf}
    </div>

);
}
