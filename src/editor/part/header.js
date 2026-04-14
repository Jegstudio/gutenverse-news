import { useState, useEffect, useRef } from '@wordpress/element';
import OkayNav from '../../frontend/okaynav/okaynav';
import { renderIcon } from 'gutenverse-core/helper';

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

function SubCatNav(props) {
    const { active, catOnClickHandler } = props;
    const headerRef = useRef(null);

    useEffect(() => {
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
    }, []);

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

function SubCat(props) {
    const { onSubCatChange = () => { } } = props;
    const [active, setActive] = useState(-100);

    const catOnClickHandler = (type, val, label) => {
        setActive(val);
        onSubCatChange(val, type, label);
    };

    useEffect(() => {
        setActive(-100);
        catOnClickHandler('all', -100, 'all');
    }, [props.headerCategory, props.headerAuthor, props.headerTag]);

    if ( !Valid(props.headerCategory) && !Valid(props.headerAuthor) && !Valid(props.headerTag) ) {
        return null;
    }

    const navKey = [
        ...(props.headerCategory || []),
        ...(props.headerAuthor || []),
        ...(props.headerTag || []),
    ].map(d => d.value).join(',');

    return <SubCatNav key={navKey} active={active} catOnClickHandler={catOnClickHandler} {...props} />;
}

function HeadTitle(props) {
    if ( !props.title && !props.second_title ) {
        return null;
    }

    const icon = props.icon || '';
    const iconType = props.iconType || 'icon';
    const iconSVG = props.iconSVG || '';
    const TitleTag = props.headerHtmlTag || 'h3';

    const finalIcon = (iconType === 'svg' && !iconSVG) ? '' : icon;

    return (
        <TitleTag className="gvnews_block_title">
            <span>
                {renderIcon(finalIcon, iconType, iconSVG)}
                {props.title}
                {props.second_title && <strong>
                    &nbsp;{props.second_title}
                </strong>}
            </span>
        </TitleTag>
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
