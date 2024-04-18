

function Valid(value) {
    if ( value && value.length ) {
        return true;
    }
    return false;
}

function SubCatItem(props) {
    return (
        <li>
            <a className="subclass-filter" href="#">
                {props.title}
            </a>
        </li>
    );
}

function SubCat(props) {
    if ( !Valid(props.headerCategory) && !Valid(props.headerAuthor) && !Valid(props.headerTag) ) {
        return null;
    }
    return (
        <div className="gvnews_subcat okayNav loaded">
            <ul className="gvnews_subcat_list">
                <li>
                    <a className="subclass-filter current" href="#">{props.headerDefault}</a>
                </li>
                {Valid(props.headerCategory) && props.headerCategory.map(d => {
                    return(<SubCatItem title={d.label}/>);
                })}
                {Valid(props.headerAuthor) && props.headerAuthor.map(d => {
                    return(<SubCatItem title={d.label}/>);
                })}
                {Valid(props.headerTag) && props.headerTag.map(d => {
                    return(<SubCatItem title={d.label}/>);
                })}
            </ul>
        </div>
    );
}

function HeadTitle(props) {
    if ( !props.title && !props.second_title ) {
        return null;
    }
    return (
        <h3 className="gvnews_block_title">
            <span>
                {props.icon && <i className={props.icon}></i>}
                {props.title}
                {props.second_title && <strong>
                    {props.second_title}
                </strong>}
            </span>
        </h3>
    );
}

const HeaderModule = (props) => {
    if ( !Valid(props.headerCategory) && !Valid(props.headerAuthor) && !Valid(props.headerTag) && !props.title && !props.second_title ) {
        return null;
    }
    return <div className={`gvnews_block_heading gvnews_block_${props.headerType} gvnews_subcat_right`}>
        <HeadTitle {...props}/>
        <SubCat {...props}/>
    </div>;
};

export default HeaderModule;