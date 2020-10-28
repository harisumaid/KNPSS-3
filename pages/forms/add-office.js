import {
  Form,
  Loader,
  Dimmer,
  Button,
  Segment,
  Header,
  Icon,
} from "semantic-ui-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import Head from "next/head";
import { useState } from "react";

export default function AddOffice() {
  const [loading, changeLoading] = useState(false);
  const [feedback, changeFeedback] = useState(false);
  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    designation: Yup.string().required("Required Designation"),
    imagePath: Yup.string().required("Image Path required"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      designation: "",
      imagePath: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      changeLoading(true);
      const api = "/api/formsOffice";
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("designation", values.designation);
      formData.append("imagePath", values.imagePath);
      const response = await fetch(api, {
        method: "POST",
        body: formData,
      });

      const res = await response.json();
      if (res.success == "success") {
        changeFeedback(true);
        resetForm();
      }
      console.log(res);
    },
  });
  return (
    <div>
      <Head>
        <title>Add Office Member</title>
      </Head>

      <Dimmer page active={loading}>
        <Loader active={!feedback}>Saving Files</Loader>
        {feedback && (
          <div>
            <Header inverted icon>
              <Icon name="check" color="green"></Icon>
              Office member added successfully
            </Header>
            <br></br>
            <Button
              onClick={() => {
                changeFeedback(false);
                changeLoading(false);
              }}
            >
              Ok.
            </Button>
          </div>
        )}
      </Dimmer>
      <Segment>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Input
            label="Name"
            type="text"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.name && formik.errors.name
                ? { content: formik.errors.name }
                : null
            }
          />

          <Form.Input
            label="Designation"
            type="text"
            id="designation"
            name="designation"
            value={formik.values.designation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.designation && formik.errors.designation
                ? { content: formik.errors.designation }
                : null
            }
          />

          <Form.Input
            label="Image Path"
            type="text"
            id="imagePath"
            name="imagePath"
            value={formik.values.imagePath}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.imagePath && formik.errors.imagePath
                ? { content: formik.errors.imagePath }
                : null
            }
          />

          <Button type="submit" positive>
            {" "}
            Submit
          </Button>
        </Form>
      </Segment>
    </div>
  );
}
