import { useState, useEffect, useRef } from '@wordpress/element';
import OkayNav from "../../frontend/okaynav/okaynav";

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
            <a className={`subclass-filter ${active ? 'current' : ''}`} onClick={onClick} href="javascript:void(0);">
                {title}
            </a>
        </li>
    );
}

function SubCat(props) {
    const { onSubCatChange = () => { } } = props;
    const [active, setActive] = useState(-100);
    const headerRef = useRef(null);

    const catOnClickHandler = (type, val, label) => {
        setActive(val);
        onSubCatChange(val, type, label);
    };

    useEffect(() => {
        setActive(-100);
        catOnClickHandler('all', -100, 'all');
        let okayNavInstance = null;

        if (headerRef.current) {
            okayNavInstance = new OkayNav(headerRef.current, {
                swipe_enabled: false,
                threshold: 50,
                toggle_icon_content: '<span></span><span></span><span></span>'
            });
        }

        return () => {
            if (okayNavInstance) {
                okayNavInstance.destroy();
            }
        };

    }, [props.headerCategory, props.headerAuthor, props.headerTag]);

    if ( !Valid(props.headerCategory) && !Valid(props.headerAuthor) && !Valid(props.headerTag) ) {
        return null;
    }

    return (
        <div ref={headerRef} className="gvnews_subcat">
            <ul className="gvnews_subcat_list">
                <li>
                    <a className={`subclass-filter ${active === -100 ? 'current' : ''}`} onClick={() => catOnClickHandler('all', -100, 'all')} href="javascript:void(0);">{props.headerDefault}</a>
                </li>
                {Valid(props.headerCategory) && props.headerCategory.map( (d, index) => {
                    return(<SubCatItem key={index} active={active === d.value} onClick={() => catOnClickHandler('category', d.value, d.label)} title={d.label}/>);
                })}
                {Valid(props.headerAuthor) && props.headerAuthor.map( (d, index) => {
                    return(<SubCatItem key={index} active={active === d.value} onClick={() => catOnClickHandler('author', d.value, d.label)} title={d.label}/>);
                })}
                {Valid(props.headerTag) && props.headerTag.map( (d, index) => {
                    return(<SubCatItem key={index} active={active === d.value} onClick={() => catOnClickHandler('tag', d.value, d.label)} title={d.label}/>);
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
        <HeadTitle {...props} />
        {('heading_5' === props.headerType) && <span className="line"></span>}
        <SubCat {...props} />
    </div>;
};

export default HeaderModule;