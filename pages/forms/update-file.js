import { Button, Form, Select, Segment, Table } from "semantic-ui-react";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "../../styles/components/forms/UpdateFile.module.css";

export default function UpdateFile() {
  const options = [
    { key: "news", value: "news", text: "news" },
    { key: "achievement", value: "achievement", text: "achievement" },
  ];
  const [selectType, setSelectType] = useState(null);
  const [listItems, changeListItems] = useState([]);

  useEffect(() => {
    const getData = async () => {
      if (selectType != null) {
        const api =
          selectType === "news" ? "/api/fetchNews" : "/api/fetchAchievement";

        const respone = await fetch(api, {
          method: "POST",
        });
        const res = await respone.json();    
        changeListItems(res);
      }
    };
    getData();
  }, [selectType]);

  return (
    <div>
      <Head>
        <title>Update News</title>
      </Head>
      <Segment>
        <Select
          fluid
          placeholder="Select type of content "
          options={options}
          onChange={(e, d) => {
            setSelectType(d.value);
            console.log(d.value);
          }}
        />
      </Segment>
      <Segment>
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
              {listItems.map((news) => {
                return (
                  <Table.Row key={news._id}>
                    <Table.Cell>
                      <b>Headline : </b>
                      <Link
                        href={`${selectType}/${encodeURIComponent(news._id)}`}
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
      </Segment>
    </div>
  );
}
