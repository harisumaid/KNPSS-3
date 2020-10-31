import Nav from '../components/navbar';
import styles from '../styles/Contact.module.css';
import * as yup from 'yup';
import { Formik } from 'formik';
import { Container, Form, Divider, Button, TextArea  } from 'semantic-ui-react';

const validationSchema = yup.object().shape({
    email: yup.string()
        .email("*Please enter a valid email")
        .required("*Email cannot be empty*"),
    name: yup.string().required('*Name cannot be empty'),
    phone: yup.string()
        .matches(/^[0-9]+$/, "*Number entered should be in digits")
        .length(10, "*Number in a digit can't be greater than 10 ")
        .required("*Phone number cannot be empty"),
    message: yup.string().required('*Message cannot be empty')
})


export default function Contact(params) {

    const handleSubmit = (values) => {
        
    }


    return (
        <>
            <Nav />
            
            <div className={styles.heading}>
                <h1>Contact Us</h1>
            </div>
            <div className={styles.container}>
                <div className={styles.left}>
                    <div className={styles.location}>
                        <h2>Location</h2>
                        <Divider />
                        <p className={styles.paragraph}>
                            At/P.O/P.S - Kakhapura, Via - Danagadi, Dist - Jajpur, Pin-755026, 
                            Odisha    
                        </p>
                        <p className={styles.paragraph}>
                            Regd No : 3325/45-2016 
                        </p>
                        <p className={styles.paragraph}>
                            Email : knpssamitee@gmail.com
                        </p>
                    </div>
                    
                        
                    
                </div>

                <div className={styles.right}>
                    <h2>We'll be glad to answer your questions.</h2>
                    
                    <Formik
                        initialValues={{
                            name : '',
                            email: '',
                            phone: '',
                            message : ''
                        }}
                        onSubmit={(values) => handleSubmit(values)}
                        validationSchema={validationSchema}


                    >
                        {formikProps => (
                            <Container >
                                <Form>
                                    <Form.Field>
                                        <label>Name</label>
                                        <input placeholder='Enter your name' onChange={formikProps.handleChange('name')} value={formikProps.values.name} onBlur={formikProps.handleBlur('name')} />
                                    </Form.Field>
                                    <p style={{ color: 'red' }}>{formikProps.touched.name && formikProps.errors.name}</p>

                                    <Divider />
                                    <Form.Field>
                                        <label>Email address</label>
                                        <input placeholder='Enter your email' onChange={formikProps.handleChange('email')} value={formikProps.values.email} onBlur={formikProps.handleBlur('email')} />
                                    </Form.Field>
                                    <p style={{ color: 'red' }}>{formikProps.touched.email && formikProps.errors.email}</p>

                                    <Divider />
                                    <Form.Field>
                                        <label>Phone number</label>
                                        <input placeholder='Enter your phone number' onChange={formikProps.handleChange('phone')} value={formikProps.values.phone} onBlur={formikProps.handleBlur('phone')} />
                                        
                                    </Form.Field>
                                    <p style={{ color: 'red' }}>{formikProps.touched.phone && formikProps.errors.phone}</p>

                                    <Divider />
                                    <Form.Field>
                                        <label>Message</label>
                                        <TextArea placeholder='Enter your message' onChange={formikProps.handleChange('message')} value={formikProps.values.message} onBlur={formikProps.handleBlur('message')}  />
                                    </Form.Field>
                                    <p style={{ color: 'red' }}>{formikProps.touched.message && formikProps.errors.message}</p>

                                    <Divider />

                                    <Button type="submit" onClick={formikProps.handleSubmit}>SEND</Button>
                                    
                                </Form>


                            </Container>
                        )}
                    </Formik>
                </div>
            </div>

        </>
    );
}