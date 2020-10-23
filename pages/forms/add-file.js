import { Field, Formik, useFormik } from "formik";
import {
  Form,
  Segment,
  Label,
  Button,
  Icon,
  Input,
  Select,
  Message,
  Dimmer,
  Loader,
  Header,
  Modal,
} from "semantic-ui-react";
import Head from "next/head";
import { useState } from "react";
import * as Yup from "yup";
import styles from "../../styles/components/forms/AddNews.module.css";

export default function AddNews() {
  const options = [
    { key: "news", value: "news", text: "news" },
    { key: "achievement", value: "achievement", text: "achievement" },
  ];

  const [imageForms, addImageForms] = useState([]);
  const [pdfForms, addPdfForms] = useState([]);
  const [typeForm, changeTypeForm] = useState("");
  const [fileFormatError, toggleFileFormatError] = useState(false);
  const [formProcessing, changeFormProcessing] = useState(false);
  const [showModelAfterProcess, changeModelAfterProcess] = useState(null);

  const addMoreFile = (type) => {
    switch (type) {
      case "image":
        if (imageForms.length == 0) {
          addImageForms([1]);
          break;
        }
        addImageForms([...imageForms, imageForms[imageForms.length - 1] + 1]);
        break;
      case "pdf":
        if (pdfForms.length == 0) {
          addPdfForms([1]);
          break;
        }
        addPdfForms([...pdfForms, pdfForms[pdfForms.length - 1] + 1]);
        break;

      default:
        break;
    }
  };

  const removeFile = (type, element) => {
    let changedArray = [];
    switch (type) {
      case "image":
        imageForms.forEach(function (currentValue) {
          if (currentValue != element) {
            changedArray.push(currentValue);
          }
        });
        delete formik.values.images.element;
        addImageForms(changedArray);
        break;
      case "pdf":
        pdfForms.forEach(function (currentValue) {
          if (currentValue != element) {
            changedArray.push(currentValue);
          }
        });
        addPdfForms(changedArray);
        break;

      default:
        break;
    }
  };

  const validationSchema = Yup.object({
    type: Yup.string().required("Required"),
    date: Yup.date()
      .max(
        new Date(),
        `date must be less than ${new Date().toISOString().substr(0, 10)}`
      )
      .required("Enter a date please"),
    heading: Yup.string().required("Heading Required"),
    content: Yup.string().required("Some Details Required"),
  });

  const formik = useFormik({
    initialValues: {
      type: typeForm,
      date: new Date().toISOString().substr(0, 10),
      heading: "",
      content: "",
      images: {},
      pdfs: {},
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      changeFormProcessing(true);
      const formData = new FormData();
      Object.keys(values).forEach((value) => {
        if (value === "images" || value === "pdfs") {
          let index;
          for (index in values[value]) {
            formData.append(value, values[value][index]);
          }
        } else {
          formData.append(value, values[value]);
        }
      });
      const api =
        typeForm === "news" ? "/api/formsNews" : "/api/formsAchievement";
      const response = await fetch(api, {
        method: "POST",
        body: formData,
      });

      const res = await response.json();

      changeFormProcessing(false);

      if (res.error) {
        // jhol jhaal hai
        console.log(res.error);
        if (res.error === "File format not matched") {
          toggleFileFormatError(true);
        } else {
          changeModelAfterProcess({
            type: "error",
            content: "Sorry could complete the task, \n Reason : " + res.error,
          });
        }
      } else {
        if (res.result === "success") {
          addImageForms([]);
          addPdfForms([]);
          changeModelAfterProcess({
            type: "success",
            content: "Files added successfully",
          });
          resetForm();
        }
        console.log(res.result);
      }
    },
    setFieldValue: (field, value) => {
      if (field === "type") {
        values.type = value;
      } else {
        delete values.field;
      }
    },
  });

  const successModal = () => {
    return (
      <Modal
        basic
        onClose={() => changeModelAfterProcess(null)}
        onOpen={() => changeModelAfterProcess(null)}
        open={showModelAfterProcess != null ? true : false}
        size="small"
      >
        <Header icon>
          <Icon name="check"></Icon>
          {showModelAfterProcess.content}
        </Header>
        <Modal.Actions>
          <Button
            color="green"
            inverted
            onClick={() => changeModelAfterProcess(null)}
          >
            <Icon name="checkmark" /> OK
          </Button>
        </Modal.Actions>
      </Modal>
    );
  };

  const failureModal = () => {
    return (
      <>
        <Modal
          basic
          onClose={() => changeModelAfterProcess(null)}
          onOpen={() => changeModelAfterProcess(null)}
          open={showModelAfterProcess != null ? true : false}
          size="small"
        >
          <Header icon>
            <Icon name="window close outline"></Icon>
            {showModelAfterProcess.content}
          </Header>
          <Modal.Actions>
            <Button
              color="red"
              inverted
              onClick={() => changeModelAfterProcess(null)}
            >
              <Icon name="checkmark" /> OK
            </Button>
          </Modal.Actions>
        </Modal>
      </>
    );
  };

  return (
    <>
      <Head>
        <title>News Form</title>
      </Head>
      {showModelAfterProcess == null
        ? null
        : showModelAfterProcess.type === "success"
        ? successModal()
        : failureModal()}
      <Dimmer page active={formProcessing}>
        <Loader active={formProcessing}>Sending files. Please wait!!!</Loader>
      </Dimmer>
      <Segment id={styles.mainSegment}>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Input
            control={Select}
            required
            options={options}
            label="Type of Content"
            placeholder="Select type of content"
            name="type"
            id="type"
            onChange={(e) => {
              changeTypeForm(e.target.textContent);
              formik.setFieldValue("type", e.target.textContent, true);              
            }}
            // onChange={formik.handleChange}
            // onBlur={formik.handleBlur}
          />
          {typeForm && (
            <>
              <Form.Input
                label="Date"
                type="date"
                id="date"
                name="date"
                value={formik.values.date}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.date && formik.errors.date
                    ? { content: formik.errors.date }
                    : null
                }
              />
              <Form.Input
                label="Headline"
                type="text"
                placeholder="Heading about the content"
                id="heading"
                name="heading"
                value={formik.values.heading}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.heading && formik.errors.heading
                    ? { content: formik.errors.heading }
                    : null
                }
              />
              <Form.TextArea
                label="Details"
                placeholder="Details about the content"
                id="content"
                name="content"
                value={formik.values.content}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.content && formik.errors.content
                    ? { content: formik.errors.content }
                    : null
                }
              />
              <Label> Enter Images </Label>
              <br />
              <Segment>
                {imageForms.map((index) => {
                  return (
                    <Form.Group key={`group ${index}`} id={styles.mediaSegment}>
                      <Form.Input
                        required
                        placeholder={`image no.${index}`}
                        type="file"
                        key={`image input ${index}`}
                        id={`images.${index}`}
                        name={`images.${index}`}
                        value={formik.values.images.index}
                        onChange={(e) => {
                          fileFormatError ? toggleFileFormatError(false) : null;
                          formik.setFieldValue(
                            `images.${index}`,
                            e.currentTarget.files[0]
                          );
                        }}
                        onBlur={formik.handleBlur}
                        error={
                          fileFormatError
                            ? "Please provide file of specified format"
                            : null
                        }
                      />
                      <Button
                        icon="minus"
                        onClick={() => {
                          removeFile("image", index);
                          formik.setFieldValue(`images.${index}`);
                        }}
                        key={`input button ${index}`}
                        id={styles.mediaButton}
                      />
                    </Form.Group>
                  );
                })}
                <Button onClick={() => addMoreFile("image")}>
                  <Icon name="plus" />
                  Add More Image
                </Button>
              </Segment>
              <Label> Enter Pdfs </Label>
              <br />
              <Segment>
                {pdfForms.map((index) => {
                  return (
                    <Form.Group key={`group ${index}`} id={styles.mediaSegment}>
                      <Form.Input
                        required
                        name="files"
                        placeholder={`pdf no.${index}`}
                        type="file"
                        key={`pdf input ${index}`}
                        id={`pdfs.${index}`}
                        name={`pdfs.${index}`}
                        value={formik.values.pdfs.index}
                        onChange={(e) => {
                          fileFormatError ? toggleFileFormatError(false) : null;
                          formik.setFieldValue(
                            `pdfs.${index}`,
                            e.currentTarget.files[0]
                          );
                        }}
                        onBlur={formik.handleBlur}
                        error={
                          fileFormatError
                            ? "Please provide file of specified format"
                            : null
                        }
                      />
                      <Button
                        id={styles.mediaButton}
                        icon="minus"
                        onClick={() => {
                          removeFile("pdf", index);
                          formik.setFieldValue(`pdfs.${index}`);
                        }}
                        key={`pdf button ${index}`}
                      />
                    </Form.Group>
                  );
                })}
                <Button onClick={() => addMoreFile("pdf")}>
                  <Icon name="plus" />
                  Add More Pdf
                </Button>
              </Segment>
              {fileFormatError && (
                <Message error>
                  {" "}
                  Please provide file of specified format
                </Message>
              )}
              <Button type="submit" positive disabled={formProcessing}>
                Submit
              </Button>
            </>
          )}
        </Form>
      </Segment>
    </>
  );
}
