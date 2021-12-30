import { Fragment } from "react";
import Link from 'next/link';
import { ArrowUp, ArrowDown } from "./icons";
import { headerToUrlString } from '@utils/sanitation';
import cn from "classnames";

const TocHeaderItem = ({header, headerType, openNav, handleNavExpand, addClass, slug, contentPresent}) => {
    headerType = typeof headerType !== 'string' ? '' : headerType 
    let headerURL = '';
    try {
        headerURL = headerType !== 'h1' ? headerToUrlString(header) : '';
    } catch (err) {
        console.log(err)
    }

    return (
        <Fragment>
            <div className={cn( `flex items-center justify-between hover:bg-gray-400 ${addClass}`, { "pl-2": headerType.includes('h2'), "border-b-2 border-textColor": contentPresent })}>
                <Link href={`/posts/${slug}#${headerURL}`} >
                    <a className={`justify-between items-center flex-initial w-auto font-bold pl-2 py-2`}>{header}</a>
                </Link>
                {contentPresent
                    ? openNav
                        ? (<span onClick={handleNavExpand} className={`flex items-center flex-none pl-2 w-8 ${headerType}`}>
                                <ArrowUp className={'fill-textColor'} />
                            </span>)
                        : (<span onClick={handleNavExpand} className={`flex items-center flex-none pl-2 w-8 ${headerType}`}>
                                <ArrowDown className={'fill-textColor'} />
                            </span>)
                    : false }
            </div>
        </Fragment>
    )
};

export default TocHeaderItem;