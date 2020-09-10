import React, { useState } from 'react';
import { Container, Form, Checkbox, Button, Modal, Loader, Icon, Divider, Segment } from 'semantic-ui-react';
import { Formik } from 'formik';
import * as yup from 'yup'


export default () => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const handleSubmit = async () => {
        setOpen(true);
        console.log('Hello');
    }

    const validationSchema = yup.object().shape({
        username : yup.string().required('*Username cannot be empty'),
        email : yup.string().email('Not a valid email').required('*Email cannot be empty'),
        phone : yup.number().positive().required('*Phone number cannot be empty').typeError('*Must be a number'),
        password : yup.string().min(6, 'Password cannot be less than 6 characters').required('*Password cannot be empty'),
        retype : yup.string().oneOf([yup.ref('password'), null], "Passwords don't match")
    })

    return(
        <Container fluid>
        <nav style={{width : '100%', height : '100px', backgroundColor : 'black', display : 'flex', alignItems : 'center', justifyContent : 'center'}}>
            <span style={{color : 'white', fontFamily : 'sans-serif', fontSize : '30px'}}>Register your account</span>
        </nav>
        <Container>
        <Formik
            initialValues={{
                    username : '',
                    email : '',
                    phone : null,
                    password : '',
                    retype : ''
                }}
            onSubmit={(values, actions) => {
                actions.resetForm();
                setOpen(true);
            }}
            validationSchema={validationSchema}
            
        
        >
             {formikProps => (
                 <Container textAlign='left'>
                     <Form>
                    <Form.Field>
                        <label>Username</label>
                        <input placeholder='Enter your username' onChange={formikProps.handleChange('username')} value={formikProps.values.username} onBlur={formikProps.handleBlur('username')}/>
                    </Form.Field>
                    <p style={{color : 'red'}}>{ formikProps.touched.username && formikProps.errors.username }</p>

                    <Divider/>
                    <Form.Field>
                        <label>Email address</label>
                        <input placeholder='Enter your email' onChange={formikProps.handleChange('email')} value={formikProps.values.email} onBlur={formikProps.handleBlur('email')}/>
                    </Form.Field>
                    <p style={{color : 'red'}}>{ formikProps.touched.email && formikProps.errors.email }</p>

                    <Divider/>
                    <Form.Field>
                        <label>Phone number</label>
                        <input placeholder='Enter your phone number' onChange={formikProps.handleChange('phone')} value={formikProps.values.phone} onBlur={formikProps.handleBlur('phone')}/>
                    </Form.Field>
                    <p style={{color : 'red'}}>{ formikProps.touched.phone && formikProps.errors.phone }</p>

                    <Divider/>
                    <Form.Field>
                        <label>Password</label>
                        <input placeholder='Enter your password' onChange={formikProps.handleChange('password')} value={formikProps.values.password} onBlur={formikProps.handleBlur('password')}/>
                    </Form.Field>
                    <p style={{color : 'red'}}>{ formikProps.touched.password && formikProps.errors.password }</p>

                    <Divider/>
                    <Form.Field>
                        <label>Re-type Password</label>
                        <input placeholder='Re-enter your password' onChange={formikProps.handleChange('retype')} value={formikProps.values.retype} onBlur={formikProps.handleBlur('retype')}/>
                    </Form.Field>
                    <p style={{color : 'red'}}>{ formikProps.touched.retype && formikProps.errors.retype }</p>

                    <Divider/>
                    <Button type="submit" onClick={formikProps.handleSubmit}>REGISTER</Button>
                    </Form>
                    
                    
                 </Container>
             )}
        </Formik>

        <Modal
        open={open}
        dimmer='blurring'
        onClose={() => setOpen(false)}
        style={{height : '20%', width : '20%'}}
      >
        <Modal.Content>
          <Loader active size='large'>Registering the user...</Loader>
        </Modal.Content>
        
      </Modal>

        </Container>

        

        </Container>
    )
}