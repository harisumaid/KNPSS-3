import 'semantic-ui-css/semantic.min.css'
//You cannot import global CSS anywhere else.
//this style act as the global CSS for all component

export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />
}