import { fetchIdList, fetchForId } from "../../lib/fetchForNews";
import { useRouter } from "next/router";
import Blog from "../../components/blog";

export default function Post({ news }) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>...Loading</div>;
  }
  return (
    <div>
      <Blog post={news} />
    </div>
  );
}

export async function getStaticPaths() {
  const paths = await fetchIdList();
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const news = JSON.parse(await fetchForId(params.id));
  return {
    props: {
      news: news[0],
    },
  };
}
