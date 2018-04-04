import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './article.scss';

class Article extends Component {
  render() {
    return (
      <div className={s.root} id='article'>
        <div id='article-container'></div>
        <div id='hidden-info'
             className={s.noshow}
             data-id={this.props.articleId}>
        </div>
      </div>
    );
  }
}

Article.propTypes = {
  title: PropTypes.string.isRequired,
  articleId: PropTypes.string.isRequired
};

export default withStyles(Article, s);
