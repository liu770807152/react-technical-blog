import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Row, List, Breadcrumb } from 'antd';
import {
  CalendarOutlined,
  FolderOpenOutlined,
  FireOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import Author from '../Author/Author';
import Ad from '../Ad/Ad';
import Footer from '../Footer/Footer';
import styles from './listBody.module.css';

const Body = () => {
  const [myList, setList] = useState([]);

  useEffect(async () => {
    // axios('http://127.0.0.1:7001/default/articleList')
    //   .then((data) => {
    //     setList(data.data);
    //   })
    //   .catch((reason) => {
    //     console.error(reason);
    //   });
    const {
      data: { result }
    } = await axios('http://127.0.0.1:7001/api/articleList');
    setList(result);
  }, []);

  return (
    <>
      <Row className="comm__main" type="flex" justify="center">
        <Col className="comm__left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div className={styles.bread__container}>
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link href={{ pathname: '/' }}>Home</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Video Tutorial</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <List
            header={<div className={styles.list__title}>Blog List</div>}
            itemLayout="vertical"
            dataSource={myList}
            renderItem={(item) => (
              <List.Item>
                <div className={styles.list__title}>
                  <Link href={{ pathname: '/detail', query: { id: item.id } }}>
                    {item.title}
                  </Link>
                </div>
                <div className={styles.list__icon}>
                  <span>
                    <CalendarOutlined />
                    {item.time}
                  </span>
                  <span>
                    <FolderOpenOutlined />
                    {item.typeName}
                  </span>
                  <span>
                    <FireOutlined />
                    {item.viewCount}
                  </span>
                </div>
                <div className={styles.list__context}>{item.introduction}</div>
              </List.Item>
            )}
          />
        </Col>
        <Col className="comm__right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Ad />
        </Col>
      </Row>
      <Footer />
    </>
  );
};

export default Body;
