import React, { useState } from 'react';
import { Container, Form, Checkbox, Button, Modal, Loader, Icon, Divider, Segment, Dimmer } from 'semantic-ui-react';
import { Formik } from 'formik';
import * as yup from 'yup'
import Router from 'next/router'



export default () => {
    const [open, setOpen] = useState(false);
    const [modalContent, setModalContent] = useState();
    const [err, setErr] = useState('');

    const handleLogin = async (values, actions) => {
        
        setOpen(true);
        try {
            const response = await fetch('/api/login', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: values.email,
                    password: values.password,
                })
            });
            const res = await response.json();
            console.log(res);
            if(!res.error) {
                // No error with login save the token in local storage for now
                localStorage.setItem('token', JSON.stringify(res.token + res.user._id));
                setErr('');
                setOpen(false);
                Router.push('/user');
            } else {
                setErr(res.error ? res.message : '');
                console.log(res);
                setOpen(false);
            }
            
            
            
        } catch (err) {
            console.log(err);
        }
    }

    const validationSchema = yup.object().shape({
        email: yup.string().required('*Email cannot be empty'),
        password: yup.string().required('*Password cannot be empty'),
    })

    return (
        <Container fluid>
            <nav style={{ width: '100%', height: '100px', backgroundColor: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom : '20px' }}>
                <span style={{ color: 'white', fontFamily: 'sans-serif', fontSize: '30px' }}>Login to your account</span>
            </nav>
            <Container>
                <Formik
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                    onSubmit={handleLogin}
                    validationSchema={validationSchema}


                >
                    {formikProps => (
                        <Container textAlign='left'>
                            <Form>
                                <Form.Field>
                                    <label>Email address</label>
                                    <input placeholder='Enter your email' onChange={formikProps.handleChange('email')} value={formikProps.values.email} onBlur={formikProps.handleBlur('email')} />
                                </Form.Field>
                                <p style={{ color: 'red' }}>{formikProps.touched.email && formikProps.errors.email}</p>

                                <Divider />
                                
                                <Form.Field>
                                    <label>Password</label>
                                    <input type='password' placeholder='Enter your password' onChange={formikProps.handleChange('password')} value={formikProps.values.password} onBlur={formikProps.handleBlur('password')} />
                                </Form.Field>
                                <p style={{ color: 'red' }}>{formikProps.touched.password && formikProps.errors.password}</p>        

                                <Divider />
                                <Button type="submit" onClick={formikProps.handleSubmit}>LOGIN</Button>
                                <Button onClick={() => Router.push('/user/register')}>SIGN UP</Button>
                                <p style={{ color: 'red' }}>{err.length > 0 ? err : ''}</p>
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