import {Image,Dimmer,Button, Icon} from 'semantic-ui-react'
import styles from '../../styles/components/homePage/LandingSection.module.css'
import Link from 'next/link'
import {useState} from 'react'
import {useMediaQuery} from 'react-responsive';


const Desktop = ()=>{
    const [activeMenu,setActiveMenu] = useState(false);
    const menuClick = ()=>{setActiveMenu(!activeMenu)}
    return(
        <>
         <div>
            <div className={styles.firstDiv} >
                <Icon link name={activeMenu?'close':'bars'} onClick={menuClick} id={styles.topDivMenu} size='huge' ></Icon>
                <h1 className={styles.logo} >KNPSS</h1>
                <h1 className={styles.title} >Kalinganagar Paribesh Surakshya Samiti</h1>
                <div className={styles.centerDescriptionContainer} >
                    <div className={styles.centerDescription} >
                        <h1>We love to help people in need</h1>
                        <Link href="/about" >
                            <Button id={styles.centerButton} >Learn more</Button>
                        </Link>
                
                    </div>

                </div>
                <div className={styles.topDiv} >
                </div>
                <div className={styles.helpUsDiv}  >
                <h1 id={styles.helpUsDonate} >
                        Help us.
                    </h1>
                
                    <Button color='green' id={styles.helpUsDonate} size='huge' >Donate</Button>
                    <Button color='yellow' id={styles.helpUsDonate} size='huge' >Join us</Button>
                </div>
            </div>
        </div>
        </>
        )
}

const Mobile = ()=>{
    const [activeMenu,setActiveMenu] = useState(false);
    const menuClick = ()=>{setActiveMenu(!activeMenu)}
    const isLandScape = useMediaQuery({orientation:'landscape'});
    return(
        <>
            <div className={styles.firstDiv} >
                <h1 className={styles.logoMobile} >KNPSS</h1>
                <Icon link name={activeMenu?'close':'bars'} onClick={menuClick} id={styles.topDivMenu} size='big' ></Icon>
                
                <div className={ isLandScape?styles.centerDescriptionContainer:styles.centerDescriptionContainerMobile} >
                <div className={styles.centerDescription} >
                <h1 id={styles.centerDescriptionMobile} >We love to help people in need</h1>
                <Link href="/about" >
                <Button id={styles.centerButton} >Learn more</Button>
                </Link>
                
                </div>                    
                </div>
                <div className={isLandScape?styles.topDiv:styles.topDivMobile} >
                </div>
                <div className={isLandScape?styles.helpUsDiv: styles.helpUsDivMobile}  >
                <h1 id={styles.helpUsDonate} >
                        Help us.
                    </h1>
                
                    <Button color='green' id={styles.helpUsDonate} size='huge' >Donate</Button>
                    <Button color='yellow' id={styles.helpUsDonate} size='huge' >Join us</Button>
                </div>
            </div>
            
        </>
        )
}


export default function LandingSection(){

    
const isDesktop = useMediaQuery({ minWidth: 1200 });
const isTabOrMobile = useMediaQuery({maxWidth:1200});
    
    if (isDesktop) {
        return(<Desktop/>);
    } else {
        return(<Mobile/>);
    }
}