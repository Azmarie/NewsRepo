import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './article.scss';
import Link from '../../components/Link'
// import { render } from 'react-dom';
import { Grid, Row, Col } from 'react-bootstrap';

// <div id='article-container'></div>
// <div id='comment-container'></div>

class Article extends Component {
  render() {
    return (
      <div className={s.root} id='article'>
      <Grid>
        <Row className="show-grid">
          <Col xs={12} md={8}>
            <div id='article-container'></div>
          </Col>
          <Col xs={6} md={4}>
            <div id='comment-container'></div>
          </Col>
        </Row>
      </Grid>
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
