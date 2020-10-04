import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <html>
                <Head>
                    <link
                        href="/static/semantic/dist/semantic.min.css"
                        rel="stylesheet"
                    />
                    <link href='https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap' rel="stylesheet"/> 
                </Head>
                <body className="custom_class">
                    <Main />
                    <NextScript />
                </body>
            </html>
        )
    }
}