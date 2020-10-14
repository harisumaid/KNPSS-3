import {Image,Dimmer,Button, Icon, Header} from 'semantic-ui-react'
import styles from '../../styles/components/homePage/LandingSection.module.css'
import Link from 'next/link'
import {useState} from 'react'


export default function LandingSection(){
    const [activeMenu,setActiveMenu] = useState(false);
    const menuClick = ()=>{setActiveMenu(!activeMenu)}
    return(
        <>
        <Dimmer.Dimmable blurring dimmed={activeMenu} >
        <Dimmer active={activeMenu} page onClickOutside={menuClick} blurring >
            <Button basic inverted size='large' id={styles.backInMenu} onClick={menuClick} >
                <Icon name='arrow left' ></Icon>
                Back
            </Button>
            <div className={styles.menuInDimmer} >
            <div className={styles.firstDivMenu} >
                <Link href="/" >
                    <a><h1 onClick={()=>{setActiveMenu(false)}}  >Home</h1></a>
                </Link>
                <Link href="/about" >
                    <a><h1>About</h1></a>
                </Link>
                <Link href="/gallery" >
                    <a><h1>Gallery</h1></a>
                </Link>
                <Link href="/contact" >
                    <a><h1>Contact us</h1></a>
                </Link>
            </div>
            <div className={styles.menuInMobileOrTablet} >
                <Link href="/" >
                    <h1 onClick={()=>{setActiveMenu(false)}} >Home</h1>
                </Link>
                <Link href="/about" >
                    <h1>About</h1>
                </Link>
                <Link href="/gallery" >
                    <h1>Gallery</h1>
                </Link>
                <Link href="/contact" >
                    <h1>Contact us</h1>
                </Link>
                <Link href="/news" >
                    <h1>In the news</h1>
                </Link>
                <Link href="/achievement" >
                    <h1>Achievements</h1>
                </Link>
                <Link href="/office" >
                    <h1>Office Bearers</h1>
                </Link>
            </div>
            <div className={styles.secondDivMenu} >
                <Link href="/news" >
                    <a><h1>In the news</h1></a>
                </Link>
                <Link href="/achievement" >
                    <a><h1>Achievements</h1></a>
                </Link>
                <Link href="/office" >
                    <a><h1>Office Bearers</h1></a>
                </Link>
            </div>
            
            </div>
        </Dimmer>
         <div>
            <div className={styles.firstDiv} >
                <Icon link name={activeMenu?'close':'bars'} onClick={menuClick} id={styles.topDivMenu} size='huge' ></Icon>
                <Link href="/" ><a className={styles.logo} >KNPSS</a></Link>
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
        </Dimmer.Dimmable>
        </>
        )
}