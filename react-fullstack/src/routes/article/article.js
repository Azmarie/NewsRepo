import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './article.scss';

class article extends Component {
  // <div className={s.container}>
  //   <h1>{this.props.title}</h1>
  //   <p>{100}</p>
  // </div>
  render() {
    return (
      <div className={s.root} id='article'>
        <div id='flag' className={s.noshow} data-id={this.props.id}></div>
      </div>
    );
  }
}

// Contact.propTypes = { title: PropTypes.string.isRequired };

export default withStyles(article, s);
