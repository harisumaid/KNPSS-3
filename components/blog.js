import React from "react";
import styles from "../styles/Blog.module.css";
import { Icon, Image, Divider } from "semantic-ui-react";
import { Carousel } from "react-responsive-carousel";
import Navbar from "../components/navbar";
const Blog = ({ post }) => {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.subcontainer}>
          <div className={styles.logo}>
            <Icon name="blind" size="huge" />
            <span>KNPSS</span>
          </div>
  <Divider horizontal >{post.heading}</Divider>
          <div className={styles.heading}>
            {/* <h1>{post.heading}</h1> */}
            <p>{post.date}</p>
          </div>
          <Divider />
          <div className={styles.images}>
            <Carousel
              autoPlay={true}
              infiniteLoop={true}
              showThumbs={false}
              dynamicHeight
              showIndicators={false}
              swipeable
              useKeyboardArrows
            >
              {post.imagesPath.map((path) => {
                return (
                  <div key={path}>
                    <Image src={path} />
                    <p className="post-read"></p>
                  </div>
                );
              })}
            </Carousel>
          </div>
          <Divider />
          <div className={styles.document}>
            {post.pdfsPath.length > 0 && <h4>Documents</h4>}
            <ul className={styles.pdfs}>
              {post.pdfsPath.length === 0 ? (
                <h4>No Documents Available</h4>
              ) : (
                post.pdfsPath.map((path) => {
                  return (
                    <li className={styles.pdf} key={path}>
                      {" "}
                      <a href={path}>{path.slice(path.search('_')+1)}</a>{" "}
                    </li>
                  );
                })
              )}
            </ul>
          </div>
          <Divider />
          <div className={styles.content}>
            <p className={styles.paragraph}>{post.content}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
