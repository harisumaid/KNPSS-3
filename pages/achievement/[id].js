import { fetchIdList, fetchForId } from "../../lib/fetchForAchievement";
import { useRouter } from "next/router";
import Blog from "../../components/blog";
import { Dimmer, Header } from "semantic-ui-react";

export default function Post({ achievement }) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>
      <Dimmer page >
        <Header>
          Content Loading Please Wait!!
        </Header>
      </Dimmer>
    </div>;
  }

  return (
    <div>
      <Blog post={achievement} />
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
  const achievement = JSON.parse(await fetchForId(params.id));
  return {
    props: {
      achievement: achievement[0],
    },
  };
}
