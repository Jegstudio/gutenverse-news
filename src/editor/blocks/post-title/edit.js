import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { __ } from '@wordpress/i18n';
import { useRef, useEffect } from '@wordpress/element';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';
import PanelDeprecated from '../../panels/panel-deprecated';
import DeprecatedOverlay from '../../part/deprecated-overlay';

const PostTitle = compose(
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

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);

    const elementRef = useRef(null);

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);

    useEffect(() => {
        if (elementRef) {
            setBlockRef(elementRef);
        }
    }, [elementRef]);

    const blockProps = useBlockProps({
        className: classnames(
            'gvnews-block',
            'gvnews-post-title',
            'guten-element',
            'gvnews-deprecated-block',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: elementRef
    });

    return <>
        <PanelDeprecated title="Post Title" />
        <div {...blockProps}>
            <div className="title-wrapper">
                <h1 className="the-title">
                    {__('This is dummy title and will be replaced with real title of your post', 'gutenverse-news')}
                </h1>
            </div>
            <DeprecatedOverlay />
        </div>
    </>;
});

export default PostTitle;