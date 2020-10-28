import {
  Card,
  Image,
  Container,
  Grid,
  Header,
  Divider,
} from "semantic-ui-react";
import styles from "../styles/Office.module.css";
import Head from "next/head";
import Navbar from "../components/navbar";
import { fetchAllOffice } from "../lib/fetchForOffice";

export default function Office({ Office }) {
  return (
    <div>
      <Head>
        <title>Office</title>
      </Head>
      <Navbar />
      <Container id={styles.mainContainer}>
        <Divider horizontal id={styles.divider}>
          Meet our members{" "}
        </Divider>
        <Grid columns="equal" centered id={styles.grid}>
          {Office.map((office) => {
            return (
              <Grid.Column
                mobile={16}
                tablet={8}
                computer={
                  Office.length <= 4 ? Math.floor(16 / Office.length) : 4
                }
                largeScreen={
                  Office.length <= 4 ? Math.floor(16 / Office.length) : 4
                }
                id={styles.gridColumns}
                key={office.name + office.designation}
              >
                <Grid centered id={styles.grid} >
                  <Grid.Row>
                    <Image src={office.imagePath}  circular size="small" />
                  </Grid.Row>
                  <Grid.Row id={styles.belowImage}  textAlign='center'>
                    <Header sub>{office.name}</Header>                    
                  </Grid.Row>
                  <Grid.Row id={styles.belowImage}>
                  {office.designation}
                  </Grid.Row>
                  <br></br>
                </Grid>
              </Grid.Column>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export async function getStaticProps() {
  const Office = JSON.parse(await fetchAllOffice());
  return {
    props: {
      Office,
    },
    revalidate: 86400,
  };
}
