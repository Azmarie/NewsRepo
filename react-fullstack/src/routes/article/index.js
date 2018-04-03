import React from 'react';
import Contact from './article';

export const path = '/article/:id';
export const action = async (state) => {
  // const title = 'Contact Us';

  console.log(state);
  //state.context.onSetTitle(title);
  return <Contact title={"Foobar"} />;
};
