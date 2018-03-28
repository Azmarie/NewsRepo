/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.scss';
import Link from '../Link';
import Navigation from '../Navigation';

function Header() {
  return (
    <div className={s.root + ' ' + s.font}>
      <div className={s.container}>
        <div>
          <Link className={s.brand} to="/">
            <img src={require('./logo-small.png')} width="266" height="64" alt="NewsRepo" />
            <span className={s.brandTxt}></span>
          </Link>
          <Navigation className={s.nav} />
        </div>
        <div className={s.mainmenu}>
          <ul>
            <li><Link className={s.link} to="/Category1">Category 1</Link></li>
            <li><Link className={s.link} to="/Category2">Category 2</Link></li>
            <li><Link className={s.link} to="/Category3">Category 3</Link></li>
            <li><Link className={s.link} to="/Category4">Category 4</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default withStyles(Header, s);
