import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.scss';

function Home({ news }) {
  news = news.concat([
    {
      link: '/foo',
      title: 'foobar1',
      desc: 'foobar desc text',
      contentSnippet: '<div>foobar</div>'
    },
    {
      link: '/foo',
      title: 'foobar1',
      desc: 'foobar desc text',
      contentSnippet: '<div>foobar</div>'
    },
    {
      link: '/foo',
      title: 'foobar1',
      desc: 'foobar desc text',
      contentSnippet: '<div>foobar</div>'
    },
    {
      link: '/foo',
      title: 'foobar1',
      desc: 'foobar desc text',
      contentSnippet: '<div>foobar</div>'
    }
  ]);

  // <span
  //   className={s.newsDesc}
  //   dangerouslySetInnerHTML={{ __html: item.contentSnippet }}
  //   />

  return (
    <div className={s.root}>
      <div className={s.container + ' ' + s.leftpart}>
        <div className={s.mainnews}>
          <ul className={s.news}>
            {news.map((item, index) => (
              <li key={index} className={s.newsItem}>
                <a href={item.link} className={s.newsTitle}>{item.title}</a>
                <p className={s.newsDesc}>{item.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={s.container}>
        <div className={s.hotNews}>
          <h2 className={s.title}>Hot News</h2>
          <ul className={s.news}>
            {news.map((item, index) => (
              <li key={index} className={s.newsItem}>
                <a href={item.link} className={s.newsTitle}>{item.title}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className={s.aboutus}>
          <h2 className={s.title}>About Us</h2>
            <p>We are a team from CMPT 470, SFU. This website is to collect news, artiles from the Internet for educational purpose. We do concern about the copyright for every artiles we displayed. If you find there is any material which infringes your copyright, please let us know by email and provide the details (such as URL, your origin work, etc.). We will delete every infringements as soon as possible.</p>
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
