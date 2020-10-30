import { fetchAllAchievement } from "../../lib/fetchForAchievement";
import Link from "next/link";
import Head from "next/head";
import Navbar from "../../components/navbar";
import { Table } from "semantic-ui-react";
import styles from "../../styles/News.module.css";

export default function Achievement({ achievementProps }) {
  return (
    <div>
      <Head>
        <title>Achievements</title>
      </Head>
      <Navbar />
      <div className={styles.mainDiv}>
        <Table id={styles.table}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell> Our Achievements </Table.HeaderCell>
              <Table.HeaderCell textAlign="right">
                {" "}
                Date of publish{" "}
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {achievementProps.map((achievement) => {
              return (
                <Table.Row key={achievement._id}>
                  <Table.Cell>
                    <b>Headline : </b>
                    <Link
                      href={`achievement/${encodeURIComponent(achievement._id)}`}
                      passHref
                    >
                      <a>{achievement.heading}</a>
                    </Link>
                  </Table.Cell>
                  <Table.Cell textAlign="right">
                    {" "}
                    <b>Date : </b> {achievement.date}
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const achievementProps = JSON.parse(await fetchAllAchievement());
  return {
    props: {
      achievementProps,
    },
    revalidate: 1,
  };
}
