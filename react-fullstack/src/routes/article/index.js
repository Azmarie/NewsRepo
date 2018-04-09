import React from 'react';
import Article from './article';

export const path = '/article/:id';
export const action = async (state) => {
  const title = 'Contact Us';
  return <Article title={title} articleId={state.params.id}/>;
};
