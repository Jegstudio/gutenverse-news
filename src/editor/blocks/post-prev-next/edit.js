import { compose } from '@wordpress/compose';
import { useEffect, useState, useRef } from '@wordpress/element';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { ModuleOverlay } from '../../part/placeholder';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';
import PanelUpgradePro from '../../panels/panel-upgrade-pro';
import UpgradeProOverlay from '../../part/upgrade-pro-overlay';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { gutenverseProActive } from '../../utils/helper';
import { CopyElementToolbar, InspectorControls } from 'gutenverse-core/components';
import { applyFilters } from '@wordpress/hooks';

const PostPrevNext = compose(
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
    const [prevNextData, setPrevNextData] = useState(false);
    const [content, setContent] = useState(false);
    const currentId = wp.data.select('core/editor').getCurrentPostId();

    const blockProps = useBlockProps({
        className: classnames(
            'gvnews-block',
            'gvnews-block-wrapper',
            'gvnews-prev-next',
            'guten-element',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: elementRef
    });

    useEffect(() => {
        apiFetch({
            path: addQueryArgs('/gvnews-client/v1/get-post-prev-next'),
            method: 'POST',
            data: {
                id: currentId
            },
        }).then((data) => {
            setPrevNextData(JSON.parse(data));
        });
    }, [
        currentId,
    ]);

    useEffect(() => {
        if (prevNextData.previous || prevNextData.next) {
            setContent(<>
                {prevNextData.previous && <a href="javascript:void(0);" className="post prev-post">
                    <span className="caption">{__('Previous Post', 'gutenverse-news')}</span>
                    <h3 className="post-title">{prevNextData.previous.title}</h3>
                </a>}
                {prevNextData.next && <a href="javascript:void(0);" className="post next-post">
                    <span className="caption">{__('Next Post', 'gutenverse-news')}</span>
                    <h3 className="post-title">{prevNextData.next.title}</h3>
                </a>}
            </>);
        } else {
            setContent(<>
                <a href="javascript:void(0);" className="post prev-post">
                    <span className="caption">Previous Post</span>
                    <h3 className="post-title">Lorem ipsum dolor sit amet consectetur adipiscing elit conubia nostra</h3>
                </a>
                <a href="javascript:void(0);" className="post next-post">
                    <span className="caption">Next Post</span>
                    <h3 className="post-title">Nunc eu iaculis mi nulla facilisi aenean a risus sed luctus arcu </h3>
                </a>
            </>);
        }
    }, [prevNextData]);

    const isDeprecated = !gutenverseProActive;
    const wrapperClass = `gvnews_custom_prev_next_wrapper gvnews_prev_next_container${isDeprecated ? ' gvnews-deprecated-block' : ''}`;

    return (
        <>
            {isDeprecated ? (
                <PanelUpgradePro title="Post Next Prev" />
            ) : (
                <>
                    <CopyElementToolbar {...props} />
                    <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
                    <InspectorControls>
                        {applyFilters(
                            'gutenverse.blocks-pro.upgrade-banner-professional',
                            null,
                            props
                        )}
                    </InspectorControls>
                </>
            )}
            <div {...blockProps}>
                <div className={wrapperClass}>
                    <div className="gvnews_prevnext_post">
                        {content ? content : <ModuleOverlay />}
                    </div>
                    {isDeprecated && <UpgradeProOverlay />}
                </div>
            </div>
        </>
    );
});

export default PostPrevNext;