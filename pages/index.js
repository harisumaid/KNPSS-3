import Head from 'next/head'
import LandingSection from '../components/firstPage/landing_section'
import SecondSection from '../components/firstPage/second_section'
import ThirdSection from '../components/firstPage/third_section'
import {datajsoning} from './api/jsonForHome'

export default function Home({data}) {
    return(
    <div>
        <Head>
            <title>KNPSS</title>
        </Head>
        <LandingSection/>
        <SecondSection/>
        <ThirdSection props={data.data}/>
    </div>
    );
}

export async function getServerSideProps() {
    const res =  datajsoning();
    const data = JSON.parse(res);
    return {
        props : {
            data,
        }
    }
}

