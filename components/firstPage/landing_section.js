import {Image,Dimmer,Button, Icon} from 'semantic-ui-react'
import styles from '../../styles/components/homePage/LandingSection.module.css'
import Link from 'next/link'
import {useState} from 'react'


export default function LandingSection(){
    const [activeMenu,setActiveMenu] = useState(false);
    const menuClick = ()=>{setActiveMenu(!activeMenu)}
    return(
        <>
         <div>
            <div className={styles.firstDiv} >
                <Icon link name={activeMenu?'close':'bars'} onClick={menuClick} id={styles.topDivMenu} size='huge' ></Icon>
                <p className={styles.logo} >KNPSS</p>
                <h1 className={styles.title} >Kalinganagar Paribesh Surakshya Samiti</h1>
                <div className={styles.centerDescriptionContainer} >
                    <div className={styles.centerDescription} >
                        <h1>We love to help people in need</h1>
                        <Link href="/about" >
                            <Button id={styles.centerButton} size="huge" >Learn more</Button>
                        </Link>
                
                    </div>

                </div>
                <h1 className={styles.titleBottom} >Kalinganagar Paribesh Surakshya Samiti</h1>
                <div className={styles.topDiv} >
                </div>
                </div>

                <div className={styles.helpUsDiv}  >
                <h1>
                        Help us.
                    </h1>
                
                    <Button color='green' id={styles.helpUsDonate} size='huge' >Donate </Button>
                    <Button color='yellow' id={styles.helpUsDonate} size='huge' >Join us</Button>
                </div>
        </div>
        </>
        )
}