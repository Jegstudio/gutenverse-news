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
import { renderIcon } from 'gutenverse-core/helper';

const angleRightSVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. --><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"></path></svg>';

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
                {renderIcon('fas fa-angle-right', 'svg', btoa(angleRightSVG))}
                <span className="">
                    <a href="javascript:void(0);" >{__('Category', 'gutenverse-news')}</a>
                </span>
                {renderIcon('fas fa-angle-right', 'svg', btoa(angleRightSVG))}
                <span className="breadcrumb_last_link">
                    <a href="javascript:void(0);" >{__('Child Category', 'gutenverse-news')}</a>
                </span>
            </div>
            <DeprecatedOverlay />
        </div>
    </>;
});

export default PostBreadcrumb;


