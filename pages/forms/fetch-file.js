import Head from 'next/head'
import { Image, Card, Dropdown, Dimmer, Loader } from 'semantic-ui-react'
import styles from '../../styles/FetchFile.module.css'
import { useState, useEffect } from 'react'
import Router from 'next/router';
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

export default function FetchFiles({ offices }) {
    const [document, setDocument] = useState([]);
    const [formType, setFormType] = useState(null);
    const [showLoader, setShowLoader] = useState(false);

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

    return (<div className={styles.baseDiv}>
        <Head>
            <title>
                FetchFiles Page
            </title>
        </Head>
        <h1>In Fetch Form Page</h1>
        <Dropdown
            name='formSelect'
            label='Enter Type of Field'
            placeholder='Select type of Field'
            fluid
            selection
            options={FormOptions}
            onChange={(e, d) => {
                setFormType(d.value);
                setDocument([]);
            }}
            required
        />
        {showForms}
        <Dimmer active={showLoader} >
            <Loader active={showLoader} >Fetching {formType}'s details</Loader>
        </Dimmer>


    </div>);


    function ImageComponent(props) {
        return (
            <>
                <br />
                <Card>
                    <Image src={props.src} wrapped ui={false} />
                    <Card.Content>
                        <Card.Header>
                            {props.name}
                        </Card.Header>

                        <Card.Description>
                            {props.details}
                        </Card.Description>
                    </Card.Content>
                </Card>
            </>
        );
    }

    function ForNews() {
        if (formType == 'news' && JSON.stringify(document) === JSON.stringify([])) {
            fetchDetails('news').then((res) => {
                setDocument(res);
                setShowLoader(false);
            });
        }
        return (
            <div>
                {document.map((news) => {
                    return (
                        <ImageComponent
                            src={news.filePath}
                            name={news.title}
                            details={news.details}
                            key={news._id}
                        />
                    );
                })}
            </div>
        );
    }

    function ForGallery() {
        if (formType == 'gallery' && JSON.stringify(document) === JSON.stringify([])) {
            fetchDetails('gallery').then((res) => {
                setDocument(res);
                setShowLoader(false);
            });
        }
        return (
            <div>
                {document.map((gallery) => {
                    return (
                        <ImageComponent
                            src={gallery.filePath}
                            name={gallery.title}
                            details={gallery.details}
                            key={gallery._id}
                        />
                    );
                })}
            </div>
        );
    }

    function ForAchievement() {

        if (formType == 'achievement' && JSON.stringify(document) === JSON.stringify([])) {
            fetchDetails('achievement').then((res) => {
                setDocument(res);
                setShowLoader(false);
            });
        }
        return (
            <div>
                {document.map((achievement) => {
                    return (
                        <ImageComponent
                            src={achievement.filePath}
                            name={achievement.title}
                            details={achievement.details}
                            key={achievement._id}
                        />
                    );
                })}
            </div>
        );
    }

    function ForOffice() {
        if (formType == 'office' && JSON.stringify(document) === JSON.stringify([])) {
            fetchDetails('office').then((res) => {
                console.log('In here');
                setDocument(res);
                setShowLoader(false);
            });
        }

        return (
            <div>
                {document.map((office) => {

                    return (
                        <ImageComponent
                            src={office.imagePath}
                            name={office.name}
                            details={office.designation}
                            key={office._id}
                        />
                    );

                })}
            </div>
        );

    }


    async function fetchDetails(fieldType) {
        setShowLoader(true);
        console.log('asdasdasd');
        const Response = await fetch('/api/formFetch?formType=' + fieldType, {
            method: 'GET',
        })
        const res = await Response.json();
        return (res);
    }

}

// export async function getServerSideProps() {
//     // const offices = await fetch('http://localhost:3000/api/formFetch')
//     //     .then(Response => Response.json())
//     //     .then(data=>{
//     //         console.log(data);
//     //     })

//     const Response = await fetch('http://localhost:3000/api/formFetch');
//     const offices = await Response.json();

//     return ({
//         props: {
//             offices: offices
//         }
//     });
// }
