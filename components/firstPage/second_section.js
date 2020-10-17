import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from '../../styles/components/homePage/SecondSection.module.css'
import { Button, Icon } from 'semantic-ui-react'

import { Carousel } from 'react-responsive-carousel';

export default function SecondSection() {
    return (
        <div className="second-div">
            <div className="bg-image-second-div"></div>
            <div className="acheivements">
                <p className="acheivements-header">Our Recent Acheivements</p>
                <div className="acheivements-gallery">
                    <Carousel
                        autoPlay={true}
                        infiniteLoop={true}
                        showThumbs={false}
                        dynamicHeight
                        showIndicators={false}
                        swipeable
                        useKeyboardArrows
                    >
                        
                        <div>
                            <img src="https://llandscapes-10674.kxcdn.com/wp-content/uploads/2019/07/lighting.jpg" />
                            <p className="post-read">
                                <span>Establishment of a school in a village</span>
                                <Button animated>
                                    <Button.Content visible>Read More</Button.Content>
                                    <Button.Content hidden>
                                        <Icon name='arrow right' />
                                    </Button.Content>
                                </Button>
                            </p>
                        </div>
                        
                        
                        
                        <div>
                            <img src="https://images.theconversation.com/files/125391/original/image-20160606-13080-s7o3qu.jpg?ixlib=rb-1.1.0&rect=273%2C0%2C2639%2C1379&q=45&auto=format&w=926&fit=clip" />
                            <p className="post-read">
                                <span>Establishment of a school in a village</span>
                                <Button animated>
                                    <Button.Content visible>Read More</Button.Content>
                                    <Button.Content hidden>
                                        <Icon name='arrow right' />
                                    </Button.Content>
                                </Button>
                            </p>
                        </div>
                        <div>
                            <img src="https://photographycourse.net/wp-content/uploads/2014/11/Landscape-Photography-steps.jpg" />
                            <p className="post-read">
                                <span>Establishment of a school in a village</span>
                                <Button animated>
                                    <Button.Content visible>Read More</Button.Content>
                                    <Button.Content hidden>
                                        <Icon name='arrow right' />
                                    </Button.Content>
                                </Button>
                            </p>
                        </div>


                    </Carousel>
                </div>
            </div>
        </div>


    );
}