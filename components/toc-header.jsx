import { Fragment } from "react";
import TocHeaderItem from "./toc-header-item";
import { getKeyByValue } from "@utils/sanitation";
import cn from "classnames";

const TocHeader = ({headers, addClass, openNavState, openNav, handleNavExpand, contentPresent, postIndex, slug, headerType }) => {
    contentPresent = Object.values(headers).length > 1 ? true : false;
    let addStyling = addClass ? addClass : ''
    let parentID = '';

    return (
            <Fragment>
                {
                    Object.values(headers).map(((header) => {
                        if (getKeyByValue(headers, header) !== 'content') headerType = getKeyByValue(headers, header)
                        if ( typeof header === 'string' && !headerType) headerType = postIndex
                        if (getKeyByValue(headers, header) === 'content' && Object.values(headers).length > 1) parentID = `_${headerType}`
                        if (getKeyByValue(headers, header) === 'content' && Object.values(headers).length === 1) parentID = `_${headerType.split('_')[0]}`

                        if (typeof header === 'string') {

                            return <TocHeaderItem
                                        key={`${postIndex}_${getKeyByValue(headers, header)}`}
                                        header={header}
                                        headerType={headerType}
                                        slug={slug}
                                        addClass={addStyling}
                                        contentPresent={contentPresent}
                                        handleNavExpand={() => handleNavExpand(`header${postIndex}${parentID}`)}
                                        openNav={openNavState.includes(`header${postIndex}${parentID}`)}
                                    />
                        } else if (header.content) {
                            return (
                                <div key={`${postIndex}_${getKeyByValue(headers, header)}`} id={`header${postIndex}_${headerType}`} className={cn (`flex justify-start flex-col w-auto md:w-auto text-sm`, { 'hidden': openNavState.includes(`header${postIndex}${parentID}`), "pl-4": parentID.includes('h1'), "pl-6": parentID.includes('h2'), "pl-8": parentID.includes('h3'), "pl-10": parentID.includes('h4'), "pl-12": parentID.includes('h5') } )}>
                                    <TocHeader
                                        slug={slug}
                                        headerType={headerType}
                                        headers={header}
                                        addClass={addClass}
                                        postIndex={postIndex}
                                        contentPresent={contentPresent}
                                        handleNavExpand={handleNavExpand}
                                        openNav={openNav}
                                        openNavState={openNavState}
                                    />
                                </div>
                            )
                        } else {
                            return (
                                <div key={`${postIndex}_${getKeyByValue(headers, header)}`} id={`header${postIndex}_${headerType}`} className={`flex justify-start flex-col w-auto md:w-auto`}>
                                    <TocHeader
                                        slug={slug}
                                        headerType={headerType}
                                        headers={header}
                                        addClass={addClass}
                                        postIndex={postIndex}
                                        contentPresent={contentPresent}
                                        handleNavExpand={handleNavExpand}
                                        openNav={openNav}
                                        openNavState={openNavState}
                                    />
                                </div>
                            )
                        }
                    }))
                }
            </Fragment>
    )
};

export default TocHeader;