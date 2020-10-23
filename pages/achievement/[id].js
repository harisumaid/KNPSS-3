import { fetchIdList,fetchForId } from '../../lib/fetchForAchievement'

export default function Post({ achievement }) {
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
        fallback: false,
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