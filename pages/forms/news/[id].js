import { fetchIdList, fetchForId } from "../../../lib/fetchForNews";
import { useRouter } from "next/router";
import { useState } from "react";
import Head from "next/head";
import {
  Dimmer,
  Header,
  Segment,
  Form,
  Button,
  Image,
  Icon,
  Modal,
} from "semantic-ui-react";
import { useFormik } from "formik";

export default function Post({ news }) {
  const [imageList, changeImageList] = useState([]);
  const [pdfList, changePdfList] = useState([]);
  const [open, setOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const FinalizeModal = () => {
    return (
      <Modal
        // onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={
          <Button
            icon="close"
            color="red"
            style={{ marginLeft: "10px" }}
          ></Button>
        }
      >
        <Modal.Header>Delete that item</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header>Selected content will be deleted</Header>

            <p>Deleted content can't be retrieved</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setOpen(false)}>
            Nope
          </Button>
          <Button
            content="Carry on"
            labelPosition="right"
            icon="checkmark"
            onClick={() => setOpen(false)}
            negative
          />
        </Modal.Actions>
      </Modal>
    );
  };

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      date: news.date,
      heading: news.heading,
      content: news.content,
      images: news.imagesPath,
      pdfs: news.pdfsPath,
    },
    onSubmit: async (values) => {
      console.log(values);
    },
  });
  if (router.isFallback) {
    return (
      <div>
        {" "}
        <Dimmer page>
          <Header>Content Loading Please Wait!!</Header>
        </Dimmer>
      </div>
    );
  }
  return (
    <div>
      <Head>
        <title>{news.heading}</title>
      </Head>
      <Segment>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Input
            label="Date"
            id="date"
            type="date"
            {...formik.getFieldProps("date")}
          />
          <Form.Input
            label="Heading"
            id="heading"
            type="text"
            {...formik.getFieldProps("heading")}
          />
          <Form.TextArea
            label="Details"
            id="details"
            type="text"
            {...formik.getFieldProps("content")}
          />
          <Header>Images</Header>
          <Segment key="image">
            <div>
              {formik.values.images.map((image) => {
                return (
                  <div>
                    <Image
                      src={image}
                      size="small"
                      style={{ display: "inline" }}
                    ></Image>
                    <FinalizeModal />
                  </div>
                );
              })}
              <br />

              <Form.Input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  changeImageList(e.currentTarget.files);
                  console.log(imageList);
                }}
              />
            </div>
          </Segment>
          <Header>Pdfs</Header>
          <Segment key="pdf">
            <div>
              {formik.values.pdfs.map((pdf) => {
                return (
                  <div>
                    <a href={pdf}>{pdf.slice(pdf.search("_") + 1)}</a>
                    <FinalizeModal />
                  </div>
                );
              })}

              <br />
              <Form.Input
                type="file"
                accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.pdf"
                multiple
                onChange={(e) => {
                  changePdfList(e.currentTarget.files);
                  console.log(pdfList);
                }}
              />
            </div>
          </Segment>
          <Button type="submit" positive>
            Update
          </Button>
          <Button negative type="button" floated="right">
            Delete Blog
          </Button>
        </Form>
      </Segment>
    </div>
  );
}

export async function getStaticPaths() {
  const paths = await fetchIdList();
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const news = JSON.parse(await fetchForId(params.id));
  return {
    props: {
      news: news[0],
    },
  };
}
