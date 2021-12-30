export default function Container({children, addCSS}) {
    return <div className={`container mx-auto px-5 ${addCSS}`}>{children}</div>
}