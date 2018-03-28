import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.scss';

function Home({ news }) {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <section className={s.newsSection + ' ' + s.selectedNews}>
          <h2 className={s.title}>Selected News</h2>
          <ul className={s.news}>
            {news.map((item, index) => (
              <li key={index} className={s.newsItem}>
                <a href={item.link} className={s.newsTitle}>{item.title}</a>
                <span
                  className={s.newsDesc}
                  dangerouslySetInnerHTML={{ __html: item.contentSnippet }}
                  />
              </li>
            ))}
          </ul>
        </section>
      </div>
      <div className={s.container}>
        <section className={s.newsSection + ' ' + s.hotNews}>
          <h2 className={s.title}>Hot News</h2>
        </section>
        <section className={s.newsSection + ' ' + s.hotTopics}>
          <h2 className={s.title}>Hot Topics</h2>
        </section>
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
