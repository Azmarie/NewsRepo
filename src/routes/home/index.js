import React from 'react';
import Home from './Home';
import fetch from '../../core/fetch';

export const path = '/';
export const action = async (state) => {
  state.context.onSetTitle('NewsRepo');
  return <Home news={[]} />;
};
