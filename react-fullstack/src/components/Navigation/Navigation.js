import React, { PropTypes } from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Navigation.scss';
import Link from '../Link';

function Navigation({ className }) {
      // <Link className={s.link} to="/about">About</Link>
      // <Link className={s.link} to="/contact">Contact</Link>
  return (
    <div>
      <div className={cx(s.root, className)} role="navigation">
        <Link className={s.link} to="/login">Log in</Link>
        <span className={s.spacer}> | </span>
        <Link className={cx(s.link, s.highlight)} to="/register">Sign up</Link>
      </div>
      <nav className={s.mainmenu}>
        <ul>
          <li><Link to="/Category1">Category 1</Link></li>
          <li><Link to="/Category2">Category 2</Link></li>
          <li><Link to="/Category3">Category 3</Link></li>
          <li><Link to="/Category4">Category 4</Link></li>
        </ul>
      </nav>
    </div>
  );
}

Navigation.propTypes = {
  className: PropTypes.string,
};

export default withStyles(Navigation, s);
