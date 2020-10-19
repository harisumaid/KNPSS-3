import {Form,Button} from 'semantic-ui-react';
import { useFormik } from "formik";

const SignUpForm = () => {};

export default function name(params) {
  const validate = (values) => {
    const errors = {};
    if (!values.firstname) {
      errors.firstname = "required name please";
    } else if (values.firstname.length > 15) {
      errors.firstname = "Name too long";
    }

    if (!values.lastname) {
      errors.lastname = "required last name";
    } else if (values.lastname.length > 15) {
      errors.lastname = " last name too long";
    }

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: "asdfsaf",
      firstname: "haris",
      lastname: "umaid",
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <label htmlFor="email"> Email</label>
        <Form.Input
          id="email"
          name="email"
          type="text"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        { formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div>:null }
        <label htmlFor="firstname">First Name</label>
        <Form.Input
          id="firstname"
          name="firstname"
          type="text"
          value={formik.values.firstname}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        { formik.touched.firstname&&formik.errors.firstname ? <div>{formik.errors.firstname}</div>:null }
        <label htmlFor="lastname">First Name</label>
        <Form.Input
          id="lastname"
          name="lastname"
          type="text"
          value={formik.values.lastname}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        { formik.touched.lastname && formik.errors.lastname ? <div>{formik.errors.lastname}</div>:null }
        <label htmlFor='fileinput' ></label>
        <Form.Input
        id='fileinput0'
        name='fileinput0'
        type='file'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        />
        <label htmlFor='fileinput' ></label>
        <Form.Input
        id='fileinput1'
        name='fileinput1'
        type='file'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        />
        <Button type="submit">Submit</Button>
      </Form  >
    </>
  );
}
