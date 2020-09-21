import React, { useState } from 'react';
import { Container, Form, Checkbox, Button, Modal, Loader, Icon, Divider, Segment, Dimmer } from 'semantic-ui-react';
import { Formik } from 'formik';
import * as yup from 'yup'
import Router from 'next/router'


export default () => {
    const [open, setOpen] = useState(false);
    const [modalContent, setModalContent] = useState();

    const handleRegister = async (values, actions) => {
        actions.resetForm();
        setOpen(true);
        try {
            const response = await fetch('/api/register', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: values.username,
                    email: values.email,
                    phone: values.phone,
                    password: values.password
                })
            });
            const res = await response.json();
            if(res.error === true) {
                setModalContent(res.message);
                setTimeout(() => {
                    setOpen(false);
                }, 2000)
            } else {
                setTimeout(() => {
                    setOpen(false);
                    setModalContent(res.message);
                    // Remove the :3000 in production
                    Router.push('/user/login');
                }, 1000)
            }
            
        } catch (err) {
            console.log(err);
        }
    }

    const validationSchema = yup.object().shape({
        username: yup.string().required('*Username cannot be empty'),
        email: yup.string().email('Not a valid email').required('*Email cannot be empty'),
        phone: yup.number().positive().required('*Phone number cannot be empty').typeError('*Must be a number'),
        password: yup.string().min(6, 'Password cannot be less than 6 characters').required('*Password cannot be empty'),
        retype: yup.string().oneOf([yup.ref('password'), null], "Passwords don't match")
    })

    return (
        <Container fluid>
            <nav style={{ width: '100%', height: '100px', backgroundColor: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom : '20px' }}>
                <span style={{ color: 'white', fontFamily: 'sans-serif', fontSize: '30px' }}>Register your account</span>
            </nav>
            <Container>
                <Formik
                    initialValues={{
                        username: '',
                        email: '',
                        phone: '',
                        password: '',
                        retype: ''
                    }}
                    onSubmit={handleRegister}
                    validationSchema={validationSchema}


                >
                    {formikProps => (
                        <Container textAlign='left'>
                            <Form>
                                <Form.Field>
                                    <label>Username</label>
                                    <input placeholder='Enter your username' onChange={formikProps.handleChange('username')} value={formikProps.values.username} onBlur={formikProps.handleBlur('username')} />
                                </Form.Field>
                                <p style={{ color: 'red' }}>{formikProps.touched.username && formikProps.errors.username}</p>

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
                                    <label>Password</label>
                                    <input type='password' placeholder='Enter your password' onChange={formikProps.handleChange('password')} value={formikProps.values.password} onBlur={formikProps.handleBlur('password')} />
                                </Form.Field>
                                <p style={{ color: 'red' }}>{formikProps.touched.password && formikProps.errors.password}</p>

                                <Divider />
                                <Form.Field>
                                    <label>Re-type Password</label>
                                    <input type='password' placeholder='Re-enter your password' onChange={formikProps.handleChange('retype')} value={formikProps.values.retype} onBlur={formikProps.handleBlur('retype')} />
                                </Form.Field>
                                <p style={{ color: 'red' }}>{formikProps.touched.retype && formikProps.errors.retype}</p>

                                <Divider />
                                <Button type="submit" onClick={formikProps.handleSubmit}>REGISTER</Button>
                                <Button onClick={() => Router.push('/user/login')}>SIGN IN</Button>
                            </Form>


                        </Container>
                    )}
                </Formik>

                <Dimmer active={open} >
                    <p>{modalContent}</p>
                    <div style={{margin : '80px'}}><Loader active={true}>Registering user </Loader></div> 
                </Dimmer>
            </Container>
        </Container>
    )
}