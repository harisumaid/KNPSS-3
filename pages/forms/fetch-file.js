import Head from 'next/head'
import { Image, Card } from 'semantic-ui-react'
import styles from '../../styles/FetchFile.module.css'

export default function FetchFiles({ offices }) {

    return (<div className={styles.baseDiv}>
        <Head>
            <title>
                FetchFiles Page
            </title>
        </Head>
        <h1>In Fetch Form Page</h1>
        {offices.map((office) => {

            return (
                <ImageComponent
                    src={office.imagePath}
                    name={office.name}
                    details={office.designation}
                    key={office._id}
                />
            );

        })}

    </div>);
}

function ImageComponent(props) {
    return (
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
    );
}

export async function getServerSideProps() {
    // const offices = await fetch('http://localhost:3000/api/formFetch')
    //     .then(Response => Response.json())
    //     .then(data=>{
    //         console.log(data);
    //     })

    const Response = await fetch('http://localhost:3000/api/formFetch');
    const offices = await Response.json();

    return ({
        props: {
            offices: offices
        }
    });
}
