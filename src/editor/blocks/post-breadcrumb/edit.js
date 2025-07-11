import { compose } from '@wordpress/compose';
import { useState, useEffect } from '@wordpress/element';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { RawHTML } from '@wordpress/element';
import { useRef } from '@wordpress/element';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import { CopyElementToolbar } from 'gutenverse-core/components';
import getBlockStyle from './styles/block-style';

const PostBreadcrumb = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const {
        attributes,
        clientId,
        setBlockRef
    } = props;

    const {
        elementId,
    } = attributes;

    const elementRef = useRef(null);

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);

    useEffect(() => {
        if (elementRef) {
            setBlockRef(elementRef);
        }
    }, [elementRef]);

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const [content, setContent] = useState('');
    const [breadcrumbData, setBreadcrumbData] = useState(false);
    const [currentPostId, setCurrentPostid] = useState(false);

    useEffect(() => {
        setCurrentPostid(wp.data.select('core/editor').getCurrentPostId());
    }, []);

    useEffect(() => {
        if (currentPostId) {
            apiFetch({
                path: addQueryArgs('/gvnews-client/v1/get-breadcrumb'),
                method: 'POST',
                data: {
                    attr: {
                        id: currentPostId
                    }
                },
            }).then((data) => {
                setBreadcrumbData(data);
            });
        }
    }, [
        currentPostId
    ]);

    const blockProps = useBlockProps({
        className: classnames(
            'gvnews-block',
            'gvnews-block-wrapper',
            'gvnews-post-breadcrumb',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: elementRef
    });

    useEffect(() => {
        if (breadcrumbData) {
            setContent(
                <div className="gvnews_custom_breadcrumb_wrapper">
                    <div className="gvnews_breadcrumbs gvnews_breadcrumb_container">
                        <RawHTML>
                            {breadcrumbData}
                        </RawHTML>
                    </div>
                </div>
            );
        }
    }, [
        breadcrumbData
    ]);

    const DummyBlocks = () => {
        return <div className="gvnews_breadcrumbs gvnews_breadcrumb_container">
            <div id="breadcrumbs">
                <span className="">
                    <a href="#" target="_self">Home</a>
                </span>
                <i className="fas fa-angle-right"></i>
                <span className="">
                    <a href="" target="_self">Category</a>
                </span>
                <i className="fas fa-angle-right"></i>
                <span className="breadcrumb_last_link">
                    <a href="#" target="_self">Child Category</a>
                </span>
            </div>
        </div>;
    };

    return <>
        <CopyElementToolbar {...props} />
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
        <div  {...blockProps}>
            <div className="gvnews_custom_related_wrapper">
                <div className="gvnews_custom_breadcrumb_wrapper">
                    {content ? content : <DummyBlocks />}
                </div>
            </div>
        </div>
    </>;
});

export default PostBreadcrumb;


