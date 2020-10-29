import { fetchAllNews } from "../../lib/fetchForNews";
import Link from "next/link";
import Head from "next/head";
import Navbar from "../../components/navbar";
import { Table } from "semantic-ui-react";
import styles from "../../styles/News.module.css";

export default function News({ newsProps }) {
  return (
    <div>
      <Head>
        <title>In the news</title>
      </Head>
      <Navbar />
      <div className={styles.mainDiv}>
        <Table id={styles.table}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell> News Headline </Table.HeaderCell>
              <Table.HeaderCell textAlign="right">
                {" "}
                Date of publish{" "}
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {newsProps.map((news) => {
              return (
                <Table.Row key={news._id}>
                  <Table.Cell>
                    <b>Headline : </b>
                    <Link
                      href={`news/${encodeURIComponent(news._id)}`}
                      passHref
                    >
                      <a>{news.heading}</a>
                    </Link>
                  </Table.Cell>
                  <Table.Cell textAlign="right">
                    {" "}
                    <b>Date : </b> {news.date}
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
  const newsProps = JSON.parse(await fetchAllNews());
  return {
    props: {
      newsProps,
    },
    revalidate: 1,
  };
}
