import { compose } from '@wordpress/compose';
import { useState, useEffect, useRef } from '@wordpress/element';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { ModuleOverlay } from '../../part/placeholder';
import { RawHTML } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { useEntityProp, store as coreStore } from '@wordpress/core-data';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import { CopyElementToolbar } from 'gutenverse-core/components';
import getBlockStyle from './styles/block-style';

const PostFeaturedImage = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const {
        attributes,
        clientId,
        setBlockRef,
        context: { postId, postType }
    } = props;

    const {
        elementId,
        imageSize,
        gallerySize,
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
    const [shareBar, setShareBar] = useState(false);
    const [content, setContent] = useState(false);
    const currentId = wp.data.select('core/editor').getCurrentPostId();
    const { imagePlaceholder } = window['GutenverseConfig'];

    const [featuredImage] = useEntityProp('postType', postType, 'featured_media', postId);
    const [link] = useEntityProp('postType', postType, 'link', postId);

    const { media } = useSelect(
        (select) => {
            const { getMedia, getPostType } = select(coreStore);
            return {
                media:
                    featuredImage &&
                    getMedia(featuredImage, {
                        context: 'view',
                    }),
                postType: postType && getPostType(postType),
            };
        },
        [featuredImage, postType]
    );
    const mediaUrl = media?.source_url;

    useEffect(() => {
        setContent(mediaUrl ?
            <img
                src={mediaUrl}
                style={{
                    objectFit: 'cover',
                    verticalAlign: 'middle',
                    maxHeight: '100%',
                    maxWidth: '100%'
                }}
                className="lazyloaded"
            /> :
            <img
                src={imagePlaceholder}
                style={{
                    objectFit: 'cover',
                    verticalAlign: 'middle',
                    maxHeight: '100%',
                    maxWidth: '100%'
                }}
                className="lazyloaded"
            />);
    }, [mediaUrl]);

    const blockProps = useBlockProps({
        className: classnames(
            'gvnews-block',
            'gvnews-block-wrapper',
            'guten-element',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: elementRef
    });

    const thumbnailSize = () => {
        let size;
        switch (imageSize) {
            case '1140x570':
            case 'featured-1140':
            case '750x375':
                size = '500';
                break;
            case '1140x815':
            case '750x536':
            case 'featured-750':
                size = '715';
                break;
            default:
        }
        return size;
    };

    return <>
        <CopyElementToolbar {...props} />
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
        <div  {...blockProps}>
            <div className="gvnews_featured featured_image custom_post">
                <div className={`thumbnail-container animate-lazy size-${thumbnailSize()}`}>
                    {content ? content : <ModuleOverlay />}
                </div>
            </div>
        </div>
    </>;
});

export default PostFeaturedImage;