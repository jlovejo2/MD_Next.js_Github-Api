import { useState } from "react";
import TocHeader from "./toc-header";

const Sidebar = ({tableOfContents}) => {
    const [openNav, setOpenNav] = useState(['']);
    const [allHeaders, setAllHeaders] = useState([]);

    const handleNavExpand = (parentID) => {
        const splitID = parentID.split("_")

        console.log('handle nav expand...', parentID, openNav)
        if (openNav.includes(parentID)) {
            if (splitID[1] === 'h2') {
                setOpenNav(openNav.filter((value) => {
                return !value.includes(splitID[0])
                }))
            } else if (splitID[1] !== 'h2') {
                splitID.pop()
                setOpenNav(openNav.filter((value) => {
                    console.log(value)
                    console.log(splitID)
                    return !value.includes(splitID.join('_'))
                }))
            } else {
                setOpenNav(openNav.filter((value) => {
                    return !value.includes(splitID[0])
                }))
            }
        } else setOpenNav([...openNav, parentID]);
    }

    return (
            <aside className="flex flex-col top-0 overflow-y-auto justify-start h-full bg-sidebar sm:w-64">
                <div className="flex flex-col justify-between items-start space-y-3 text-textColor p-2">
                    <div className="hidden xl:block uppercase font-bold text-lg px-1 py-2">
                        Table of Contents
                    </div>
                    { tableOfContents.length ? tableOfContents.map((post, postIndex) => {
                        const [headersArray] = Object.values(post.html.headers)
                        return (
                            <div key={postIndex} className="bg-sidebar3" id={`header${postIndex}`}>
                                <TocHeader slug={post.slug} headers={headersArray} handleNavExpand={handleNavExpand} openNavState={openNav} postIndex={postIndex}/>
                            </div>
                        )
                    }) : (
                        <div key={0} id={`header0`}>
                            <TocHeader slug={tableOfContents.slug} headers={Object.values(tableOfContents.html.headers)} handleNavExpand={handleNavExpand} openNavState={openNav} postIndex={0}/>
                        </div>
                    ) }
                </div>
            </aside>
        )
};

export default Sidebar;