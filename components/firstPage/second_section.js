import React from "react";
import styles from "../../styles/components/homePage/SecondSection.module.css";
import { Button, Icon, Image } from "semantic-ui-react";
import Link from "next/link";

import { Carousel } from "react-responsive-carousel";

export default function SecondSection({ Gallery }) {
  return (
    <div className={styles.secondDiv}>
      <div className={styles.bgImageSecondDiv}></div>
      <div className={styles.acheivements}>
        <p className={styles.acheivementsHeader}>Our Recent Acheivements</p>
        <div className={styles.acheivementsGallery}>
          <Carousel
            autoPlay={true}
            infiniteLoop={true}
            showThumbs={false}
            showIndicators={false}
            swipeable
            dynamicHeight
            useKeyboardArrows
            id={styles.carousel}
          >
            {Gallery.map((gallery) => {
              return (
                <div key={gallery._id}>
                  <Image src={gallery.image0Path} size="massive" />
                  <p className={styles.postRead}>
                    <span>{`${gallery.heading}`}</span><br/> <span>{`Dt: ${gallery.date}`}</span>
                    <br/>
                    <Link href={`/${gallery.type}/${gallery._id}`}>
                      <Button animated>
                        <Button.Content visible>Read More</Button.Content>
                        <Button.Content hidden>
                          <Icon name="arrow right" />
                        </Button.Content>
                      </Button>
                    </Link>
                  </p>
                </div>
              );
            })}
          </Carousel>
        </div>
      </div>
    </div>
  );
}
