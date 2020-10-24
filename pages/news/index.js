import { fetchAllNews } from "../../lib/fetchForNews";
import Link from 'next/link';

export default function News({ newsProps }) {    
  return (
    <div>
      <h1>In the News section</h1>
      <ul>
        {newsProps.map((news) => {
          return (
            <li key={news._id}>
              <Link href={`/news/${news._id}`} >
              <a>{news.heading}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export async function getStaticProps() {

  const newsProps = JSON.parse(await fetchAllNews());
  return {
    props: {
      newsProps,
    },
    revalidate: 1
  };
}
