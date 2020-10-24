import { fetchIdList,fetchForId } from '../../lib/fetchForAchievement'
import { useRouter } from 'next/router'

export default function Post({ achievement }) {
  const router = useRouter();
  if(router.isFallback){
    return <div>Loading ...</div>
  }

  return (
    <div>
      <ul>
        <li key={achievement._id} >{achievement._id}</li>
        <li key={achievement.heading}>{achievement.heading}</li>
        <li key={achievement.content}>{achievement.content}</li>
        <li key='images'>
          Images:-
          <ul>
            {achievement.imagesPath.map((path) => {
              return(<li key={path} >{path}</li>);
            })}
          </ul>
        </li>
        <li key='pdfs' >
            Pdfs:- 
            <ul>
                {achievement.pdfsPath.map((path)=>{
                    return(<li key={path} >{path}</li>)
                })}
            </ul>
        </li>
      </ul>
    </div>
  );
}

export async function getStaticPaths(){
    const paths = await fetchIdList();
    return {
        paths,
        fallback: true,
    }
}

export async function getStaticProps({params}){
    const achievement = JSON.parse(await fetchForId(params.id));
    return {
        props:{
            achievement:achievement[0],
        }
    }
}