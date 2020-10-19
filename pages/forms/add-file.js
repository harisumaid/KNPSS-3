import { Field, Formik, useFormik } from "formik";
import {
  Form,
  Segment,
  Label,
  Button,
  Icon,
  Input,
  Select,
} from "semantic-ui-react";
import Head from "next/head";
import { useState } from "react";
import styles from "../../styles/components/forms/AddNews.module.css";

export default function AddNews() {
  const options = [
    { key: "news", value: "news", text: "news" },
    { key: "achievement", value: "achievement", text: "achievement" },
  ];

  const [imageForms, addImageForms] = useState([]);
  const [pdfForms, addPdfForms] = useState([]);
  const [typeForm, changeTypeForm] = useState("");

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

  const formik = useFormik({
    initialValues: {
      type: typeForm,
      date: new Date().toISOString().substr(0, 10),
      heading: "",
      content: "",
      images: {},
      pdfs: {},
    },
    onSubmit: async (values) => {
      const formData = new FormData();
      Object.keys(values).forEach((value) => {
        if (value === "images" || value === "pdfs") {
          console.log(value);
          let index;
          for (index in values[value]) {
            console.log(values[value][index]);
            formData.append(value, values[value][index]);
          }
        } else {
          console.log(values[value]);
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

      console.log(res);

      alert(JSON.stringify(values, null, 3));
    },
    setFieldValue: (field, value) => {
      if (field === "type") {
        values.type = value;
      } else {
        delete values.field;
      }
    },
  });

  return (
    <>
      <Head>
        <title>News Form</title>
      </Head>
      <Segment>
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
              console.log(formik.values.type);
              changeTypeForm(e.target.textContent);
              formik.setFieldValue("type", e.target.textContent);
              console.log(formik.values.type);
            }}
            // onChange={formik.handleChange}
            // onBlur={formik.handleBlur}
          />
          {typeForm && (
            <>
              <Form.Input
                required
                label="Date"
                type="date"
                id="date"
                name="date"
                value={formik.values.date}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <Form.Input
                required
                label="Headline"
                type="text"
                placeholder="Heading about the content"
                id="heading"
                name="heading"
                value={formik.values.heading}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <Form.TextArea
                required
                label="Details"
                placeholder="Details about the content"
                id="content"
                name="content"
                value={formik.values.content}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <Label> Enter Images </Label>
              <br />
              <Segment>
                {imageForms.map((index) => {
                  return (
                    <Form.Group key={`group ${index}`}>
                      <Form.Input
                        required
                        placeholder={`image no.${index}`}
                        type="file"
                        key={`image input ${index}`}
                        id={`images.${index}`}
                        name={`images.${index}`}
                        value={formik.values.images.index}
                        onChange={(e) => {
                          formik.setFieldValue(
                            `images.${index}`,
                            e.currentTarget.files[0]
                          );
                        }}
                        onBlur={formik.handleBlur}
                      />
                      <Button
                        icon="minus"
                        onClick={() => {
                          removeFile("image", index);
                          formik.setFieldValue(`images.${index}`);
                        }}
                        key={`input button ${index}`}
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
                    <Form.Group key={`group ${index}`}>
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
                          formik.setFieldValue(
                            `pdfs.${index}`,
                            e.currentTarget.files[0]
                          );
                        }}
                        onBlur={formik.handleBlur}
                      />
                      <Button
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
              <Button type="submit">Submit</Button>
            </>
          )}
        </Form>
      </Segment>
    </>
  );
}
