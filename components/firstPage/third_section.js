import styles from '../../styles/components/homePage/ThirdSection.module.css'
import {Segment,Table,Header,List,Divider} from 'semantic-ui-react'

export default function ThirdSection() {
    return(
        <div>
        

            <div className={styles.thirdDiv} >
                <div className={styles.background} >
                </div>
                <div className={styles.news}>
                        <Segment id={styles.segment} >
                            <Header as='h3' color='green' id={styles.inTheNewsHeader} >In the news</Header>
                            <Divider clearing/>
                            <List id={styles.newsList} >
                                <List.Item>
                                    <List.Content>
                                    Standardization of Environmental Clearance Conditions.... dt 09/08/2018
                                    </List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Content>
                                    Directions under section 18(1)(b) of The Water act of 1974.... dt 02/11/2018
                                    </List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Content>
                                    Standardization of Environmental Clearance Conditions.... dt 09/08/2018
                                    </List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Content>
                                    Maharashtra Plastic ban booklet. dt 10/07/2018
                                    </List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Content>
                                    Some Case Laws on Frequently Sought Information and their answers.
                                    </List.Content>
                                </List.Item>
                            </List>
                        </Segment>
                </div>
                <div className={styles.video} >
                    <iframe 
                        className={styles.videoFrame}
                        src="https://www.youtube.com/embed/eVTXPUF4Oz4" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen>

                    </iframe>
                </div>
                <div className={styles.twitter} >
                <Segment id={styles.segment} >
                            <Header as='h3' color='blue' id={styles.inTheNewsHeader} >Twitter updates</Header>
                            <Divider/>
                            <List id={styles.tweetList} >
                                <List.Item>
                                    <List.Content>
                                    Standardization of Environmental Clearance Conditions.... dt 09/08/2018
                                    </List.Content>
                                </List.Item>
                                
                                <List.Item>
                                    <List.Content>
                                    Directions under section 18(1)(b) of The Water act of 1974.... dt 02/11/2018
                                    </List.Content>
                                </List.Item>
                                
                                <List.Item>
                                    <List.Content>
                                    Standardization of Environmental Clearance Conditions.... dt 09/08/2018
                                    </List.Content>
                                </List.Item>
                                
                                <List.Item>
                                    <List.Content>
                                    Maharashtra Plastic ban booklet. dt 10/07/2018
                                    </List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Content>
                                    Some Case Laws on Frequently Sought Information and their answers.
                                    </List.Content>
                                </List.Item>
                            </List>
                        </Segment>
                </div>
            </div>
        </div>
    );
}