import Head from "next/head";
import Navbar from "../components/navbar";

export default function Donate() {
  return (
    <div>
      <Head>
        <title>Donate</title>
        <meta name="viewport" content="width=device-width"></meta>
      </Head>
      <Navbar />
      <h1>Donation Page</h1>
    </div>
  );
}
