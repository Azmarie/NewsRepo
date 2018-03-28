import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.scss';

function Home({ news }) {
  news = news.concat([
    {
      link: '/foo',
      title: 'Lorem ipsum',
      desc: 'foobar desc text',
      contentSnippet: '<div>foobar</div>'
    },
    {
      link: '/foo',
      title: 'Lorem ipsum',
      desc: 'foobar desc text',
      contentSnippet: '<div>foobar</div>'
    },
    {
      link: '/foo',
      title: 'Lorem ipsum',
      desc: 'foobar desc text',
      contentSnippet: '<div>foobar</div>'
    },
    {
      link: '/foo',
      title: 'Lorem ipsum',
      desc: 'foobar desc text',
      contentSnippet: '<div>foobar</div>'
    },
    {
      link: '/foo',
      title: 'Lorem ipsum',
      desc: 'foobar desc text',
      contentSnippet: '<div>foobar</div>'
    },
    {
      link: '/foo',
      title: 'Lorem ipsum',
      desc: 'foobar desc text',
      contentSnippet: '<div>foobar</div>'
    },
    {
      link: '/foo',
      title: 'Lorem ipsum',
      desc: 'foobar desc text',
      contentSnippet: '<div>foobar</div>'
    }

  ]);

  // <span
  //   className={s.newsDesc}
  //   dangerouslySetInnerHTML={{ __html: item.contentSnippet }}
  //   />

  return (
    <div className={s.root + ' ' + s.font}>
      <div className={s.mainnews + ' ' + s.leftpart}>
          <ul className={s.news}>
            {news.map((item, index) => (
              <li key={index} className={s.newsItem}>
                <h2>
                  <a href={item.link} className={s.newsTitle}>{item.title}</a>
                </h2>
                <p className={s.newsDesc}>{item.desc}</p>
              </li>
            ))}
          </ul>
      </div>
      <div className={s.container}>
        <div className={s.hotNews}>
          <h2 className={s.title}>Hot News</h2>
          <ol>
            {news.map((item, index) => (
              <li key={index}>
                <h3><a href={item.link}>{item.title}</a></h3>
              </li>
            ))}
          </ol>
        </div>
        <div className={s.aboutus}>
          <h2 className={s.title}>About Us</h2>
          <p className={s.info}>  We are a team from CMPT 470, SFU. This website is to collect news, artiles from the Internet for educational purpose.</p>
          <p classnames={s.info}>  We do concern about the copyright for every artiles we displayed. If you find there is any material which infringes your copyright, please let us know by email and provide the details (such as URL, your origin work, etc.), we will delete every infringements as soon as possible. </p>
          <p className={s.email}><svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M2.167 2h11.666C14.478 2 15 2.576 15 3.286v9.428c0 .71-.522 1.286-1.167 1.286H2.167C1.522 14 1 13.424 1 12.714V3.286C1 2.576 1.522 2 2.167 2zm-.164 3v1L8 10l6-4V5L8 9 2.003 5z" fill="#6a8" fill-rule="evenodd"></path></svg><a href="mailto:cmpt470-ai@sfu.ca" target="_blank">CMPT470-AI@sfu.ca</a></p>
          <hr />
        </div>
      </div>
    </div>
  );
}

Home.propTypes = {
  news: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    contentSnippet: PropTypes.string,
  })).isRequired,
};

export default withStyles(Home, s);
