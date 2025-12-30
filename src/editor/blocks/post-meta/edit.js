import { compose } from '@wordpress/compose';
import { useEffect, Fragment } from '@wordpress/element';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { useRef } from '@wordpress/element';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import { CopyElementToolbar } from 'gutenverse-core/components';
import getBlockStyle from './styles/block-style';
import { isNotEmpty, renderIcon } from 'gutenverse-core/helper';

const commentSVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. --><path d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9c.1-.2 .2-.3 .3-.5z"></path></svg>';

const PostMeta = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const {
        attributes,
        setAttributes,
        clientId,
        setBlockRef
    } = props;


    const {
        metaLeft = [],
        metaRight = [],
        elementId,
        authorPrefix,
        categoryPrefix,
        datePrefix,
        showAvatar
    } = attributes;

    const elementRef = useRef(null);

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);

    useEffect(() => {
        const updates = {};
        if (attributes.elementId !== undefined) {
            return;
        }
        if (attributes.metaLeft === undefined) {
            updates.metaLeft = [{
                label: __('Author', 'gutenverse-news'),
                value: 'author'
            }];
        }if (attributes.metaRight === undefined) {
            updates.metaRight = [{
                label: __('Date', 'gutenverse-news'),
                value: 'date'
            }];
        }
        if (Object.keys(updates).length > 0) {
            setAttributes(updates);
        }
    }, []);

    useEffect(() => {
        if (elementRef) {
            setBlockRef(elementRef);
        }
    }, [elementRef]);

    const { imgDir } = window['GVNewsConfig'];
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const blockProps = useBlockProps({
        className: classnames(
            'gvnews-block',
            'gvnews-block-wrapper',
            'gvnews-post-meta',
            'guten-element',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: elementRef
    });

    const convertDateFormat = inputDate => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const inputDateObj = new Date(inputDate);

        if (isNaN(inputDateObj.getTime())) {
            // Invalid input date, return an error message or handle it as needed.
            return 'Invalid date format';
        }

        const formattedDate = inputDateObj.toLocaleDateString('en-US', options);
        return formattedDate.toUpperCase(); // Convert to uppercase for the "OCTOBER" part
    };

    function getCurrentDateTimeFormatted() {
        const now = new Date();

        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is 0-based
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
        return formattedDate;
    }


    const MetaDate = ({ isLastItem }) => {

        return <div className={`gvnews-meta-date meta-items ${isLastItem} ${datePrefix ? 'with-prefix' : ''}`}>
            <a href="#">{convertDateFormat(getCurrentDateTimeFormatted())}</a>
        </div>;
    };

    const MetaCategory = ({ isLastItem }) => {
        return <div className={`gvnews-meta-category meta-items ${isLastItem}`}>
            <span>
                <span className="meta-text"> {categoryPrefix} </span>
                <a href="#" rel="category tag">Dummy, </a>
                <a href="#" rel="category tag">Another, </a>
                <a href="#" rel="category tag">Category </a>
            </span>
        </div>;
    };

    const MetaComment = ({ isLastItem }) => {
        return <div className={`gvnews-meta-comment meta-items ${isLastItem}`}>
            <a href="/#respond">{renderIcon('far fa-comment', 'svg', btoa(commentSVG))} 100</a>
        </div>;
    };

    const MetaAuthor = ({ isLastItem }) => {
        return <div className={`gvnews-meta-author meta-items ${isLastItem}`}>
            {showAvatar && <img
                alt="admin"
                src={`${imgDir}/author.png`}
                className="avatar avatar-80 photo"
                height="80"
                width="80"
                loading="lazy"
                decoding="async" />}
            <span className="meta_text null">{authorPrefix} </span>
            <a href="#">admin</a>
        </div>;
    };


    const RenderMeta = (props) => {
        return props.metas.map((meta, index) => {
            const isLastItem = index === props.metas.length - 1 ? 'is-last-item' : '';

            switch (meta.value) {
                case 'author':
                    return <MetaAuthor key={index} isLastItem={isLastItem} />;
                case 'date':
                    return <MetaDate key={index} isLastItem={isLastItem} />;
                case 'category':
                    return<MetaCategory key={index} isLastItem={isLastItem} />;
                case 'comment':
                    return <MetaComment key={index} isLastItem={isLastItem} />;
            }

            const hookComponents = applyFilters('gvnews.post-meta.components', [], attributes);

            if (isNotEmpty(hookComponents[meta.value])) {
                const Component = hookComponents[meta.value];
                return <Component key={index} isLastItem={isLastItem} />;
            }

            return '';
        });
    };

    const MetaLeftElement = () => {
        return <div className="meta-part meta-left">
            <RenderMeta metas={metaLeft ? metaLeft : []} />
        </div>;
    };

    const MetaRightElement = () => {
        return <div className="meta-part meta-right">
            <RenderMeta metas={metaRight ? metaRight : []} />
        </div>;
    };

    return <>
        <CopyElementToolbar {...props} />
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
        <div  {...blockProps}>
            <div className="gvnews-post-meta-inner">
                {MetaLeftElement()}
                {MetaRightElement()}
            </div>
        </div>
    </>;
});

export default PostMeta;
