import Head from 'next/head'
import LandingSection from '../components/firstPage/landing_section'
import SecondSection from '../components/firstPage/second_section'
import ThirdSection from '../components/firstPage/third_section'

export default function Home(params) {
    return(
    <div>
        <Head>
            <title>KNPSS</title>
        </Head>
        <LandingSection/>
        <SecondSection/>
        <ThirdSection/>
    </div>
    );
}

