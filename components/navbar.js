import { useState } from "react";
import { Menu, Dimmer, Button, Icon } from "semantic-ui-react";
import styles from '../styles/components/Navbar.module.css'
import Link from 'next/link'

export default function NavBar() {
  const [activeMenu, setActiveMenu] = useState(false);
  const menuClick = () => {
    setActiveMenu(!activeMenu);
  };
  return (
    <nav className={styles.navbar} >
      <Dimmer.Dimmable dimmed={activeMenu}>
        <Dimmer active={activeMenu} page onClickOutside={menuClick}>
          <Button
            basic
            inverted
            size="large"
            id={styles.backInMenu}
            onClick={menuClick}
          >
            <Icon name="arrow left"></Icon>
            Back
          </Button>
          <div className={styles.menuInDimmer}>
            <div className={styles.firstDivMenu}>
              <Link href="/">
                <a>
                  <h1
                    onClick={() => {
                      setActiveMenu(false);
                    }}
                  >
                    Home
                  </h1>
                </a>
              </Link>
              <Link href="/about">
                <a>
                  <h1>About</h1>
                </a>
              </Link>
              <Link href="/gallery">
                <a>
                  <h1>Gallery</h1>
                </a>
              </Link>
              <Link href="/contact">
                <a>
                  <h1>Contact us</h1>
                </a>
              </Link>
            </div>
            <div className={styles.menuInMobileOrTablet}>
              <Link href="/">
                <h1
                  onClick={() => {
                    setActiveMenu(false);
                  }}
                >
                  Home
                </h1>
              </Link>
              <Link href="/about">
                <h1>About</h1>
              </Link>
              <Link href="/gallery">
                <h1>Gallery</h1>
              </Link>
              <Link href="/contact">
                <h1>Contact us</h1>
              </Link>
              <Link href="/news">
                <h1>In the news</h1>
              </Link>
              <Link href="/achievement">
                <h1>Achievements</h1>
              </Link>
              <Link href="/office">
                <h1>Office Bearers</h1>
              </Link>
            </div>
            <div className={styles.secondDivMenu}>
              <Link href="/news">
                <a>
                  <h1>In the news</h1>
                </a>
              </Link>
              <Link href="/achievement">
                <a>
                  <h1>Achievements</h1>
                </a>
              </Link>
              <Link href="/office">
                <a>
                  <h1>Office Bearers</h1>
                </a>
              </Link>
            </div>
          </div>
        </Dimmer>
        <Menu inverted>
          <Menu.Item id={styles.logo} name="KNPSS" />

          <Menu.Item id={styles.topDivMenu} position="right" icon="bars" onClick={()=>setActiveMenu(true)} />
        </Menu>
      </Dimmer.Dimmable>
    </nav>
  );
}
