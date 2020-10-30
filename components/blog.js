import React from 'react';
import styles from '../styles/Blog.module.css'
import { Icon, Button, Divider } from 'semantic-ui-react';
import { Carousel } from 'react-responsive-carousel';

const Blog = () => {
    return(
        <div className={styles.container}>
            <div className={styles.subcontainer}>
            <div className={styles.logo}>
                <Icon name="blind" size="huge" />
                <span>KNPSS</span>
            </div>
            <div className={styles.heading}>
                <h1>Heading dummy text</h1>
                <p>10/24/2020, 3:54:57 PM</p>
            </div>
            <Divider/>
            <div className={styles.images}>
            <Carousel
                        autoPlay={true}
                        infiniteLoop={true}
                        showThumbs={false}
                        dynamicHeight
                        showIndicators={false}
                        swipeable
                        useKeyboardArrows
                        width="600px"
                    >
                        
                        <div>
                            <img src="https://llandscapes-10674.kxcdn.com/wp-content/uploads/2019/07/lighting.jpg"/>
                            <p className="post-read">
                                <span>Establishment of a school in a village</span>
                            </p>
                        </div>
                        
                        
                        
                        <div>
                            <img src="https://images.theconversation.com/files/125391/original/image-20160606-13080-s7o3qu.jpg?ixlib=rb-1.1.0&rect=273%2C0%2C2639%2C1379&q=45&auto=format&w=926&fit=clip" />
                            <p className="post-read">
                                <span>Establishment of a school in a village</span>
                            </p>
                        </div>
                        <div>
                            <img src="https://photographycourse.net/wp-content/uploads/2014/11/Landscape-Photography-steps.jpg" />
                            <p className="post-read">
                                <span>Establishment of a school in a village</span>
                                
                            </p>
                        </div>


                    </Carousel>
            </div>
            <Divider/>
            <div className={styles.document}>
                <h4>Documents</h4>
            <ul className={styles.pdfs}>
                <li className={styles.pdf}>Document pdf</li>
                <li className={styles.pdf}>Document pdf</li>
                <li className={styles.pdf}>Document pdf</li>
                <li className={styles.pdf}>Document pdf</li>
                <li className={styles.pdf}>Document pdf</li>
                <li className={styles.pdf}>Document pdf</li>
                <li className={styles.pdf}>Document pdf</li>
            </ul>

            </div>
            <Divider />
            <div className={styles.content}>
                <p>
                Lorem Ipsum is simply dummy text of the printing 
                and typesetting industry. Lorem Ipsum has been the industry's
                 standard dummy text ever since the 1500s, when an unknown printer took a galley
                  of type and scrambled it to make a type specimen book.
                   It has survived not only five centuries, but also the leap
                    into electronic typesetting, remaining essentially unchanged.
                     It was popularised in the 1960s with the release of Letraset sheets
                      containing Lorem Ipsum passages, and more recently with desktop publishing
                       software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
            </div>
            </div>
        </div>
    )
}

export default Blog;