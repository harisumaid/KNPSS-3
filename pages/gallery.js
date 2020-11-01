import { Divider, Header, Grid, Image } from "semantic-ui-react";
import { fetchAllGallery } from "../lib/fetchForGallery";
import Navbar from "../components/navbar";
import Link from "next/link";
import Head from "next/head";
import styles from "../styles/Gallery.module.css";

export default function Gallery({ Gallery }) {
  return (
    <div>
      <Head>
        <title>Gallery</title>
      </Head>
      <Navbar />
      <div className={styles.mainDiv}>
        <Divider id={styles.galleryDivider} horizontal>
          <Header as="h1">Gallery Section</Header>
        </Divider>
        <Grid divided>
          {Gallery.map((gallery) => {
            return (
              <Grid.Column
                id={styles.eachGrid}
                mobile={16}
                tablet={8}
                computer={4}
                key={gallery._id}
              >
                <Link href={`/${gallery.type}/${gallery._id}`} passHref>
                  <Grid centered id={styles.grid} textAlign="left">
                    <Grid.Row id={styles.belowImage}>
                      <Header sub>{gallery.heading}</Header>
                    </Grid.Row>
                    <Grid.Row>
                      <Image
                        src={gallery.image0Path}
                        size="small"
                        style={{
                          "backgroundUrl":
                            "https://react.semantic-ui.com/images/wireframe/image.png",
                        }}
                      />
                    </Grid.Row>
                    <Grid.Row id={styles.belowImage}>
                      {" "}
                      <b>Date : </b> {gallery.date}
                    </Grid.Row>
                  </Grid>
                </Link>
              </Grid.Column>
            );
          })}
        </Grid>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const Gallery = JSON.parse(await fetchAllGallery());
  return {
    props: {
      Gallery,
    },
    revalidate: 1,
  };
}
