import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
    render () {
        return (
            <Html land="en">
                <Head />
                <body className="root">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}