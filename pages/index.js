import Head from "next/head";
import LandingSection from "../components/firstPage/landing_section";
import SecondSection from "../components/firstPage/second_section";
import ThirdSection from "../components/firstPage/third_section";
import styles from "../styles/Home.module.css";
import { datajsoning } from "./api/jsonForHome";
import { fetchAllGallery } from "../lib/fetchForGallery";

export default function Home({ Gallery, data }) {
  return (
    <div className={styles.homeMain} >
      <Head>
        <title>KNPSS</title>
      </Head>
      <LandingSection />
      <SecondSection Gallery={Gallery} />
      <ThirdSection props={data.data} />
    </div>
  );
}

export async function getStaticProps() {
  const res = datajsoning();
  const data = JSON.parse(res);
  const Gallery = JSON.parse(await fetchAllGallery());
  return {
    props: {
      Gallery,
      data,
    },
    revalidate: 1,
  };
}
