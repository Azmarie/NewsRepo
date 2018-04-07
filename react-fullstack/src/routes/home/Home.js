import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.scss';

function Home({ news }) {
  news = [];

  return (
    <div className={s.root + ' ' + s.font}>
      <div className={s.mainnews + ' ' + s.leftpart}>
        <div id="mainnews"/>
      </div>
      <div className={s.container}>
        <div className={s.ourinitiatives}>
          <h2 className={s.title}>Why NewsRepo?</h2>
            <p className={s.info}> Not many industries are as dynamic and inviting as the technology industry. IT professional needs to constantly learn new knowledge and stay up-to-date with the trends to be on the edge of productivity. As for technology enthusiasts in general, a go-to platform to grab news and trending topics in the tech field is also in demand to help relieve the burden of spending much time going through numerous of sites.</p>
            <p classnames={s.info}>We aim to create a forward-thinking digital content platform which collects valuable news, information, and blogs from all sources.</p>
          </div>
        <div className={s.aboutus}>
          <h2 className={s.title}>About Us</h2>
            <p className={s.info}>  We are a team from CMPT 470, SFU. This website is to collect news, artiles from the Internet for educational purpose.</p>              <p classnames={s.info}>  We do concern about the copyright for every artiles we displayed. If you find there is any material which infringes your copyright, please let us know by email and provide the details (such as URL, your origin work, etc.), we will delete every infringements as soon as possible. </p>
            <p className={s.email}><svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M2.167 2h11.666C14.478 2 15 2.576 15 3.286v9.428c0 .71-.522 1.286-1.167 1.286H2.167C1.522 14 1 13.424 1 12.714V3.286C1 2.576 1.522 2 2.167 2zm-.164 3v1L8 10l6-4V5L8 9 2.003 5z" fill="#6a8" fill-rule="evenodd"></path></svg><a href="mailto:cmpt470-ai@sfu.ca" target="_blank">CMPT470-AI@sfu.ca</a></p>
          </div>
        </div>
    </div>
  );
}

// Home.propTypes = {
//   news: PropTypes.arrayOf(PropTypes.shape({
//     title: PropTypes.string.isRequired,
//     link: PropTypes.string.isRequired,
//     contentSnippet: PropTypes.string,
//   })).isRequired,
// };

export default withStyles(Home, s);
