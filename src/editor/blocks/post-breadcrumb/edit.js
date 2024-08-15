import { compose } from '@wordpress/compose';
import { useState, useEffect } from '@wordpress/element';
import { withCustomStyle } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { ModuleOverlay } from '../../part/placeholder';
import { RawHTML } from '@wordpress/element';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { useRef } from '@wordpress/element';

const PostBreadcrumb = compose(
    withCustomStyle(panelList),
    withCopyElementToolbar()
)((props) => {
    const {
        attributes,
        setElementRef
    } = props;

    const {
        elementId,
    } = attributes;

    const blockStyleRef = useRef();

    useEffect(() => {
        if (blockStyleRef.current) {
            setElementRef(blockStyleRef.current);
        }
    }, [blockStyleRef]);

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
            }).catch((e) => {
                console.error(e.message);
            }).finally(() => {
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
        ref: blockStyleRef
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
        <PanelController panelList={panelList} {...props} />
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


