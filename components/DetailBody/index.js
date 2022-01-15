import React from 'react';
import { Affix, Col, Row, Breadcrumb } from 'antd';
import {
  CalendarOutlined,
  FolderOpenOutlined,
  FireOutlined
} from '@ant-design/icons';
import NextLink from 'next/link';
import classNames from 'classnames';
import { marked } from 'marked';
import hljs from 'highlight.js';
import Tocify from '../../utils/tocify.tsx';
import Author from '../Author';
import Ad from '../Ad';
import 'highlight.js/styles/monokai-sublime.css';
import styles from './detailBody.module.scss';
import useSWR from 'swr';

const DetailBody = ({ id }) => {
  const { data, error } = useSWR(`/api/article/${id}`);
  const tocify = new Tocify();
  const renderer = new marked.Renderer();
  // const [content, setContent] = useState({ content: '' });

  renderer.heading = function (text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor__fix"><h${level}>${text}</h${level}></a>\n`;
  };

  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false, // allow error tolerance
    sanitize: false, // don't remove anything
    tables: true, // support Github table
    breaks: false, // support Github line breaks
    smartLists: true, // optimize list output
    highlight: (code) => {
      return hljs.highlightAuto(code).value;
    }
  });

  if (error) return 'An error has occurred.';
  if (!data) return 'Loading...';
  return (
    <Row className="comm__main" type="flex" justify="center">
      <Col className="comm__left" xs={24} sm={24} md={16} lg={18} xl={14}>
        <div>
          <div className={styles.bread__container}>
            <Breadcrumb>
              <Breadcrumb.Item>
                <NextLink href="/">Home</NextLink>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <NextLink href={`/article`}>{'Article List'}</NextLink>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Current</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className={styles.detail__wrapper}>
            <h1 className={styles.detail__title}>React Tutorial</h1>
            <div
              className={classNames({
                [styles.list__icon]: true,
                [styles.center]: true
              })}
            >
              <span>
                <CalendarOutlined />
                {data.time}
              </span>
              <span>
                <FolderOpenOutlined />
                {data.catalogName}
              </span>
              <span>
                <FireOutlined />
                {data.viewCount}
              </span>
            </div>
            <div
              className={styles.detail__content}
              dangerouslySetInnerHTML={{
                __html: marked.parse(data.content) // transform to HTML
              }}
            ></div>
          </div>
        </div>
      </Col>
      <Col className="comm__right" xs={0} sm={0} md={7} lg={5} xl={4}>
        <Author />
        <Ad />
        <Affix offsetTop={5}>
          <div
            className={classNames({
              [styles.detail__nav]: true,
              comm__box: true
            })}
          >
            <div className={styles.nav__title}>Catalog</div>
            <div className="toc-list">{tocify && tocify.render()}</div>
          </div>
        </Affix>
      </Col>
    </Row>
  );
};

export default DetailBody;