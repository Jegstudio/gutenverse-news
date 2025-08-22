import { compose } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { useRef } from '@wordpress/element';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';
import PanelDeprecated from '../../panels/panel-deprecated';
import DeprecatedOverlay from '../../part/deprecated-overlay';

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

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'gvnews-block',
            'gvnews-block-wrapper',
            'gvnews-post-breadcrumb',
            'gvnews-deprecated-block',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: elementRef
    });

    return <>
        <PanelDeprecated title="Post Breadrumbs" />
        <div  {...blockProps}>
            <div className="breadcrumbs">
                <span className="">
                    <a href="javascript:void(0);" >{__('Home', 'gutenverse-news')}</a>
                </span>
                <i className="fas fa-angle-right"></i>
                <span className="">
                    <a href="javascript:void(0);" >{__('Category', 'gutenverse-news')}</a>
                </span>
                <i className="fas fa-angle-right"></i>
                <span className="breadcrumb_last_link">
                    <a href="javascript:void(0);" >{__('Child Category', 'gutenverse-news')}</a>
                </span>
            </div>
            <DeprecatedOverlay />
        </div>
    </>;
});

export default PostBreadcrumb;


