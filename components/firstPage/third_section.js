import styles from '../../styles/components/homePage/ThirdSection.module.css'
import {Segment,Table,Header,List,Divider} from 'semantic-ui-react'

export default function ThirdSection({props}) {
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
                                {props.map((data)=>{
                                    return(
                                    <List.Item key={data.id} >
                                        <List.Content>
                                            {data.details}  Dt:- {data.date}
                                        </List.Content>
                                    </List.Item>   
                                     )
                                })}
                            </List>
                        </Segment>
                </div>
                <div className={styles.video} >
                    <iframe 
                        className={styles.videoFrame}
                        src="https://www.youtube.com/embed/47HN6xOwphA" 
                        frameBorder="0" 
                        allow="autoplay;"
                        allowFullScreen>

                    </iframe>
                </div>
                <div className={styles.twitter} >
                <Segment id={styles.segment} >
                            <Header as='h3' color='blue' id={styles.inTheNewsHeader} >Twitter updates</Header>
                            <Divider/>
                            <List id={styles.tweetList} >
                            {props.map((data)=>{
                                    return(
                                    <List.Item key={data.id} >
                                        <List.Content>
                                            {data.details}  Dt:- {data.date}
                                        </List.Content>
                                    </List.Item>   
                                     )
                                })}
                            </List>
                        </Segment>
                </div>
            </div>
        </div>
    );
}