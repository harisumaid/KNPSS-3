import Navbar from "../components/navbar";
import Head from "next/head";
import { Form, Divider, Button, Dimmer, Header, Icon } from "semantic-ui-react";
import { useFormik } from "formik";
import { useState } from "react";
import styles from "../styles/JoinUs.module.css";
import * as Yup from "yup";

export default function JoinUs() {
  const [open, setOpen] = useState(true);
  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    dob: Yup.date()
      .max(
        new Date(),
        ` date of birth can't be greater than ${new Date()
          .toISOString()
          .substr(0, 10)}`
      )
      .required("Required"),
    occupation: Yup.string().required("Required"),
    qualification: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    phone: Yup.string()
      .matches(/^[0-9]+$/, "Number entered should be in digits")
      .length(10, "Number in a digit can't be greater than 10 ")
      .required("Required"),
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Required"),
    sonOf: Yup.string().required("Required"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      dob: new Date().toISOString().substr(0, 10),
      occupation: "",
      qualification: "",
      address: "",
      phone: "",
      email: "",
      sonOf: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const res = await fetch("/api/formMember", {
        method: "POST",
        body: JSON.stringify({ ...values }),
      });

      const response = await res.json();
      alert(JSON.stringify(response), null, 2);
    },
  });
  return (
    <div>
      <Head>
        <title>Join-Us</title>
      </Head>
      <Navbar />
      <div className={styles.mainDiv}>
        <Dimmer active={open} page>
          <Header as="h2" icon inverted>
            Cesation of Membership
            <Divider />
            <Header.Subheader style={{textAlign:'left'}} >
              A member of the organisation can cease of his/her membership by:
              <ul>
                <li>
                  Absenting himself/herself from three consecutive meetings.
                </li>
                <li>
                  If he/she is found working against the interest of the
                  organisation.
                </li>
                <li>By becoming unsound of mind.</li>
                <li>If he/she is convicted in any criminal case.</li>
              </ul>
            </Header.Subheader>
            <Button onClick={() => setOpen(false)}>Ok</Button>
          </Header>
        </Dimmer>
        <Divider horizontal>Here's how you can join KNPSS!</Divider>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Input
            label="Name"
            placeholder="Your Name"
            id="name"
            type="text"
            {...formik.getFieldProps("name")}
            error={
              formik.touched.name && formik.errors.name
                ? formik.errors.name
                : null
            }
          />
          <Form.Input
            label="Date of birth"
            placeholder="Your date of birth"
            id="dob"
            type="date"
            {...formik.getFieldProps("dob")}
            error={
              formik.touched.dob && formik.errors.dob ? formik.errors.dob : null
            }
          />
          <Form.Input
            label="Your Occupation"
            placeholder="Enter your occupation"
            id="occupation"
            type="text"
            {...formik.getFieldProps("occupation")}
            error={
              formik.touched.occupation && formik.errors.occupation
                ? formik.errors.occupation
                : null
            }
          />
          <Form.Input
            label="Your Qualification"
            placeholder="Enter your placeholder"
            id="qualification"
            type="text"
            {...formik.getFieldProps("qualification")}
            error={
              formik.touched.qualification && formik.errors.qualification
                ? formik.errors.qualification
                : null
            }
          />
          <Form.Input
            id="address"
            label="Your Address"
            placeholder="Enter your address"
            type="text"
            {...formik.getFieldProps("address")}
            error={
              formik.touched.address && formik.errors.address
                ? formik.errors.address
                : null
            }
          />
          <Form.Input
            id="phone"
            label="Your Phone Number"
            placeholder="10 digits mobile no."
            type="text"
            {...formik.getFieldProps("phone")}
            error={
              formik.touched.phone && formik.errors.phone
                ? formik.errors.phone
                : null
            }
          />
          <Form.Input
            id="email"
            label="Your Email"
            placeholder="Enter your email"
            {...formik.getFieldProps("email")}
            error={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : null
            }
          />
          <Form.Input
            id="sonOf"
            label="Son of (Father's name)"
            placeholder="Enter your father's name"
            {...formik.getFieldProps("sonOf")}
            error={
              formik.touched.sonOf && formik.errors.sonOf
                ? formik.errors.sonOf
                : null
            }
          />
          <Button type="submit" positive>
            {" "}
            SUBMIT{" "}
          </Button>
        </Form>
      </div>
    </div>
  );
}
