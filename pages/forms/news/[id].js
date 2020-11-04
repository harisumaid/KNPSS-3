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
  Loader,
} from "semantic-ui-react";
import { useFormik } from "formik";

export default function Post({ news }) {
  const [imageList, changeImageList] = useState([]);
  const [pdfList, changePdfList] = useState([]);
  const [processingType, setProcessingType] = useState([false, null]);
  const [inProcessing, setInProcessing] = useState(null);

  const router = useRouter();
  const continueDelete = async(content) => {
    setInProcessing("processing");
    switch (content) {
      case "post":
        console.log("Post deletion Sequence");
        const deleteResponse = await fetch('/api/deleteBlog',{
          method:'POST',
          body:JSON.stringify({_id:news._id,type:'news'}),
        });
        // delete from type{new,achievement}
        // delete from gallery
        const delRes = await deleteResponse.json();
        if (delRes.message==='deleted') {
          setInProcessing("processed");
          // delete this route 
          router.back();
        }
        break;

      default:
        const response = await fetch('/api/deleteContent',{
          method:'POST',
          body: JSON.stringify({key:processingType[1]})
        });
        const res = await response.json();
        console.log(res.result);
        if (res.result==='success') {
          setInProcessing("processed")
        }
        console.log("File deletion Sequence");
        break;
    }
  };
  const updatePost = (values)=>{
    //   update the content with the id
    // update the gallery with same id
  }
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
      <Dimmer page active={inProcessing != null}>
        {inProcessing === "processing" && <Loader active>Loading</Loader>}
        {inProcessing === "processed" && (
          <>
            <Header icon inverted>
              {" "}
              <Icon name="check" color="green" /> Deletion Successfull{" "}
            </Header>
            <br/>
            <Button onClick={()=>{setInProcessing(null)}} > Ok</Button>
          </>
        )}
      </Dimmer>
      <Dimmer page active={processingType[0]}>
        <Header as="h2" icon inverted>
          <Icon name="delete" />
          Do you want to confirm deletion
          <Header.Subheader>{processingType[1]}</Header.Subheader>
        </Header>
        <br />
        <Button
          negative
          onClick={() => {
            continueDelete(processingType[1]);
            setProcessingType([false, processingType[1]]);
          }}
        >
          Delete
        </Button>
        <Button primary onClick={() => setProcessingType([false, null])}>
          Cancel
        </Button>
      </Dimmer>
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
                  <div key={image}>
                    <Image
                      src={image}
                      size="small"
                      style={{ display: "inline" }}
                    ></Image>
                    <Icon
                      name="close"
                      color="red"
                      style={{ marginLeft: "10px" }}
                      onClick={() => {
                        setProcessingType([true, image]);
                      }}
                    ></Icon>
                    {/* <FinalizeModal type="image" /> */}
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
              <Button
                type="button"
                icon="close"
                labelPosition="left"
                content="Clear Files"
                color="red"
                onClick={(e) => {
                  console.log(e.target.form[3].value);
                  e.target.form[3].value = "";
                }}
              />
            </div>
          </Segment>
          <Header>Pdfs</Header>
          <Segment key="pdf">
            <div>
              {formik.values.pdfs.map((pdf) => {
                return (
                  <div key={pdf}>
                    <a href={pdf}>{pdf.slice(pdf.search("_") + 1)}</a>
                    <Icon
                      name="close"
                      color="red"
                      style={{ marginLeft: "10px" }}
                      onClick={() => {
                        setProcessingType([true, pdf]);
                      }}
                    ></Icon>
                    {/* <FinalizeModal type="pdf" /> */}
                  </div>
                );
              })}

              <br />
              <Form.Input
                type="file"
                accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.pdf"
                multiple
                id="pdfMultiple"
                onChange={(e) => {
                  changePdfList(e.currentTarget.files);
                  console.log(pdfList);
                }}
                style={{ display: "inline" }}
              />
              <Button
                type="button"
                icon="close"
                labelPosition="left"
                content="Clear Files"
                color="red"
                onClick={(e) => {
                  console.log(e.target.form[5].value);
                  e.target.form[5].value = "";
                }}
              />
            </div>
          </Segment>
          <Button type="submit" positive>
            Update
          </Button>
          <Button
            negative
            type="button"
            floated="right"
            onClick={() => {
              setProcessingType([!processingType[0], "post"]);
            }}
          >
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
