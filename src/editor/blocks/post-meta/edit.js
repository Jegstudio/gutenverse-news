import { compose } from '@wordpress/compose';
import { useEffect, Fragment } from '@wordpress/element';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { useRef } from '@wordpress/element';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import { CopyElementToolbar } from 'gutenverse-core/components';
import getBlockStyle from './styles/block-style';

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


    const MetaDate = ({isLastItem}) => {

        return <div className={`gvnews-meta-date meta-items ${isLastItem} ${datePrefix ? 'with-prefix' : ''}`}>
            <a href="#">{convertDateFormat(getCurrentDateTimeFormatted())}</a>
        </div>;
    };

    const MetaCategory = ({isLastItem}) => {
        return <div className={`gvnews-meta-category meta-items ${isLastItem}`}>
            <span>
                <span className="meta-text"> {categoryPrefix} </span>
                <a href="#" rel="category tag">Dummy, </a>
                <a href="#" rel="category tag">Another, </a>
                <a href="#" rel="category tag">Category </a>
            </span>
        </div>;
    };

    const MetaComment = ({isLastItem}) => {
        return <div className={`gvnews-meta-comment meta-items ${isLastItem}`}>
            <a href="/#respond"><i className="far fa-comment"></i> 100</a>
        </div>;
    };

    const MetaAuthor = ({isLastItem}) => {
        return <div className={`gvnews-meta-author meta-items ${isLastItem}`}>
            <img
                alt="admin"
                src={`${imgDir}/author.png`}
                className="avatar avatar-80 photo"
                height="80"
                width="80"
                loading="lazy"
                decoding="async" />
            <span className="meta_text null">{authorPrefix} </span>
            <a href="#">admin</a>
        </div>;
    };


    const RenderMeta = (props) => {
        return props.metas.map((meta, index) => {
            const isLastItem = index === props.metas.length - 1? 'is-last-item' : '';
            let output;

            switch (meta.value) {
                case 'author':
                    output = <MetaAuthor key={index} isLastItem={isLastItem} />;
                    break;
                case 'date':
                    output = <MetaDate key={index} isLastItem={isLastItem} />;
                    break;
                case 'category':
                    output = <MetaCategory key={index} isLastItem={isLastItem} />;
                    break;
                case 'comment':
                    output = <MetaComment key={index} isLastItem={isLastItem} />;
                    break;
                default:
                    output = null;
            }

            return output;
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
            <div className="gvnews-post-meta">
                {MetaLeftElement()}
                {MetaRightElement()}
            </div>
        </div>
    </>;
});

export default PostMeta;