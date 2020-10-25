import { Table } from "semantic-ui-react";
import { fetchAllGallery } from "../lib/fetchForGallery";
import Link from "next/link";

export default function Gallery({ Gallery }) {
  return (
    <div>
      <h1>Gallery Section</h1>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Id</Table.HeaderCell>
            <Table.HeaderCell>Heading</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {Gallery.map((gallery) => {
              return (
            <Table.Row key={gallery.type+gallery._id}>
              <Table.Cell>{gallery._id}</Table.Cell>
              <Table.Cell>
                <Link href={`/${gallery.type}/${gallery._id}`}>
                  <a>{gallery.heading}</a>
                </Link>
              </Table.Cell>
            </Table.Row>
          )})}
        </Table.Body>
      </Table>
    </div>
  );
}

export async function getStaticProps() {
  const Gallery = JSON.stringify(await fetchAllGallery());
  return {
    props: {
      Gallery: JSON.parse(Gallery),
    },
    revalidate: 1,
  };
}
