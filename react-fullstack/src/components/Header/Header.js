import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.scss';
import Link from '../Link';
import Navigation from '../Navigation';

function Header() {
  // <div className={s.mainmenu}>
  //   <ul>
  //     <li><a href="#Category">Category 1</a></li>
  //     <li><a href="#Category">Category 2</a></li>
  //     <li><a href="#Category">Category 3</a></li>
  //     <li><a href="#Category">Category 4</a></li>
  //   </ul>
  // </div>
  return (
    <div className={s.root + ' ' + s.font}>
      <div className={s.container}>
        <div className={s.titlehoder}>
          <Link className={s.brand} to="/">
            <img src={require('./logo-small.png')} width="225" alt="NewsRepo" />
          </Link>
          <Navigation className={s.nav} />
        </div>
        <div className={s.mainmenu}>
          
        </div>
      </div>
    </div>
  );
}

export default withStyles(Header, s);
