import { fetchIdList,fetchForId } from '../../lib/fetchForNews'
import { useRouter } from 'next/router'
export default function Post({ news }) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>...Loading</div>  
  }
  return (
    <div>
      <ul>
        <li key={news._id} >{news._id}</li>
        <li key={news.heading}>{news.heading}</li>
        <li key={news.content}>{news.content}</li>
        <li key='images'>
          Images:-
          <ul>
            {news.imagesPath.map((path) => {
              return(<li key={path} >{path}</li>);
            })}
          </ul>
        </li>
        <li key='pdfs' >
            Pdfs:- 
            <ul>
                {news.pdfsPath.map((path)=>{
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
    const news = JSON.parse(await fetchForId(params.id));
    return {
        props:{
            news:news[0],
        }
    }
}