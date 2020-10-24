import { fetchAllAchievement } from "../../lib/fetchForAchievement";

export default function Achievement({ achievementProps }) {
  return (
    <div>
      <h1>In the Achievement section</h1>
      <ul>
        {achievementProps.map((achievement) => {
          return (
            <li key={achievement._id}>
              <a href={`/achievement/${achievement._id}`}>
                {achievement.heading}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const achievementProps = JSON.parse(await fetchAllAchievement());
  return {
    props: {
      achievementProps,
    },
    revalidate: 1,
  };
}
