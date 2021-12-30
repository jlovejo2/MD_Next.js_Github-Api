import Alert from "../components/alert"
import Sidebar from '../components/sidebar';
import Footer from "../components/footer";
import AppHeader from "../components/app-header";
import Meta from "./meta"
import Container from "./container";

export default function Layout({ preview, tableOfContents, children}) {
    return (
        <>
            <Meta />
            <AppHeader />
            <div className="flex">
                <Sidebar tableOfContents={tableOfContents} />
                <div className="flex flex-col min-w-auto min-h-screen">
                    <main>{children}</main>
                </div>
            </div>
            <Footer />
        </>
    )
}