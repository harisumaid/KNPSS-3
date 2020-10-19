import { Form, Dropdown, Ref, Dimmer, Loader } from 'semantic-ui-react'
import styles from "../../styles/AddFile.module.css";
import Head from 'next/head'
import { useState, useRef, useEffect } from 'react'
import Router from 'next/router';

let fileInput;

const FormOptions = [
    {
        key: 'news',
        text: 'In the News',
        value: 'news',
    },
    {
        key: 'achievement',
        text: 'Achievements',
        value: 'achievement',
    },
    {
        key: 'office',
        text: 'Office Bearer',
        value: 'office',
    },
    {
        key: 'gallery',
        text: 'Gallery',
        value: 'gallery',
    },

];

export default function AddFile() {
    const [formType, setFormType] = useState(null);
    const [showLoader,setShowLoader] = useState(false);

    useEffect(() => {
        (async() => {
            const token = localStorage.getItem('token');
            if(!token) {
                Router.push('/user/login');
            } 
        })()
    })



    let showForms;


    if (formType == 'news') {
        showForms = <ForNews />
    } else if (formType == 'achievement') {
        showForms = <ForAchievement />
    } else if (formType == 'office') {
        showForms = <ForOffice />
    } else if (formType == 'gallery') {
        showForms = <ForGallery />
    } else {
        showForms = <div></div>
    }

    return (
        <div className={styles.baseForm}>
            <Head>
                <title>
                    Add File Page
                </title>
            </Head>
            <h1>
                Add files
            </h1>
            <Dropdown
                name='formSelect'
                label='Enter Type of Form'
                placeholder='Select type of Form'
                fluid
                selection
                options={FormOptions}
                onChange={(e, d) => setFormType(d.value)}
                required
            />
            {showForms}
            <Dimmer active={showLoader} >
                <Loader active={showLoader} > Adding Data to database </Loader>
            </Dimmer>

        </div>
    );

    function FormElement(props) {
        fileInput = useRef();
        if (props.type == 'file') {
            return (
                <Form.Field>
                    <Ref innerRef={fileInput}>
                        <Form.Input
                            name={props.name}
                            label={props.label}
                            type={props.type}
                            as={props.as}
                            placeholder={props.placeholder}
                            required />
                    </Ref>
                </Form.Field>);
        } else {
            return (
                <Form.Field>
                    <Form.Input
                        name={props.name}
                        label={props.label}
                        type={props.type}
                        as={props.as}
                        placeholder={props.placeholder}
                        required />
                </Form.Field>
            );
        }
    }

    function ForNews(props) {
        return (
            <Form onSubmit={onSubmit} encType='multipart/form-data'>
                <FormElement name='date' label="Enter Date" type="date" />
                <FormElement name='title' label="Enter Title" type="text" placeholder="Title" />
                <Form.TextArea name='details' label='Enter Details' placeholder='Details' />
                <FormElement name='file' label='Enter File' type='file' />
                <Form.Button content='submit' />
            </Form>
        );
    }

    function ForAchievement(props) {
        return (
            <ForNews />
        );
    }

    function ForOffice(props) {
        return (
            <Form onSubmit={onSubmit} encType='multipart/form-data'>
                <FormElement name='name' label="Enter Office Bearer's Name" type="text" placeholder="His Name" />
                <FormElement name='designation' label="Enter Office Bearer's Designation" type="text" placeholder="His Designation" />
                <FormElement name='file' label="Enter Office Bearer's Image" type='file' />
                <Form.Button content='SUBMIT' />
            </Form>
        );
    }

    function ForGallery(props) {
        return (
            <Form onSubmit={onSubmit} encType='multipart/form-data'>
                <FormElement name='date' label="Enter Date" type="date" />
                <FormElement name='title' label="Enter Title" type="text" placeholder="Title" />
                <Form.TextArea name='details' label='Enter Details' placeholder='Details' />
                <FormElement name='file' label='Enter Image' type='file' />
                <Form.Button content='SUBMIT' />
            </Form>
        );
    }

    async function onSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        setShowLoader(true);

        // only checking for office cause office's form submission field are different,
        //  while the rest of the forms are same
        if (formType == 'office') {
            formData.append('formType', formType);
            formData.append('name', e.currentTarget.name.value);
            formData.append('designation', e.currentTarget.designation.value);
            formData.append('file', fileInput.current.childNodes[1].firstChild.files[0]);
        } else {
            formData.append('formType', formType);
            formData.append('date', e.currentTarget.date.value);
            formData.append('title', e.currentTarget.title.value);
            formData.append('details', e.currentTarget.details.value);
            formData.append('file', fileInput.current.childNodes[1].firstChild.files[0]);
        }

        console.log(fileInput.current.childNodes[1].firstChild.files[0]);

        const response = await fetch('/api/formProcess', {
            method: 'POST',
            body: formData,
        });
        const res = await response.json();
        if (res.status == 'File recieved and Stored') {
            console.log('response success');
            window.location.reload(true);
        }
    }
}