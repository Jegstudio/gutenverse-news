import { useState, useEffect, useRef }  from '@wordpress/element';

function Valid(value) {
    if ( value && value.length ) {
        return true;
    }
    return false;
}

function SubCatItem(props) {
    const { active, title, onClick } = props;
    return (
        <li>
            <a className={`subclass-filter ${active ? 'current' : ''}`} onClick={onClick} href="#">
                {title}
            </a>
        </li>
    );
}

function SubCat(props) {
    const { onSubCatChange = () => {} } = props;
    const isFirstRender = useRef(true);

    if ( !Valid(props.headerCategory) && !Valid(props.headerAuthor) && !Valid(props.headerTag) ) {
        return null;
    }
    const [active, setActive] = useState(-100);
    const [activeType, setActiveType] = useState('all');

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        onSubCatChange(active, activeType);
    }, [active]);

    const catOnClickHandler = (category, val) => {
        setActive(val);
        setActiveType(category);
    };

    return (
        <div className="gvnews_subcat okayNav loaded">
            <ul className="gvnews_subcat_list">
                <li>
                    <a className={`subclass-filter ${active === -100 ? 'current' : ''}`} onClick={() => setActive(-100)} href="#">{props.headerDefault}</a>
                </li>
                {Valid(props.headerCategory) && props.headerCategory.map( (d, index) => {
                    return(<SubCatItem key={index} active={active === d.value} onClick={() => catOnClickHandler('category', d.value)} title={d.label}/>);
                })}
                {Valid(props.headerAuthor) && props.headerAuthor.map( (d, index) => {
                    return(<SubCatItem key={index} active={active === d.value} onClick={() => catOnClickHandler('author', d.value)} title={d.label}/>);
                })}
                {Valid(props.headerTag) && props.headerTag.map( (d, index) => {
                    return(<SubCatItem key={index} active={active === d.value} onClick={() => catOnClickHandler('tag', d.value)} title={d.label}/>);
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
                    &nbsp;{props.second_title}
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