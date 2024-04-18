import { compose } from '@wordpress/compose';
import { useState, useEffect, useRef } from '@wordpress/element';
import { withCustomStyle } from 'gutenverse-core/hoc';
import { useBlockProps, RichText } from '@wordpress/block-editor';
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
import { useSelect } from '@wordpress/data';
import { useEntityProp, store as coreStore } from '@wordpress/core-data';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';

const PostFeaturedImage = compose(
    withCustomStyle(panelList),
    withCopyElementToolbar()
)((props) => {
    const {
        attributes,
        context: { postId, postType }
    } = props;

    const {
        elementId,
        imageSize,
        gallerySize,
    } = attributes;

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
        setContent(mediaUrl ? <img src={mediaUrl} style={{ objectFit: 'cover', verticalAlign: 'middle', maxHeight: '100%', maxWidth: '100%' }} className="lazyloaded" /> : <img src={imagePlaceholder} style={{ objectFit: 'cover', verticalAlign: 'middle', maxHeight: '100%', maxWidth: '100%' }} className="lazyloaded" />);
    }, [mediaUrl]);

    const blockProps = useBlockProps({
        className: classnames(
            'gvnews-block',
            'gvnews-block-wrapper',
            'gvnews-featured-image',
            elementId,
            animationClass,
            displayClass,
        ),
    });

    const thumbnailSize = () => {
        let size;
        switch (imageSize) {
            case '1140x570':
            case '750x375':
                size = '500';
                break;
            case '1140x815':
            case '750x536':
                size = '715';
                break;
            default:
        }
        return size;
    };

    return <>
        <PanelController panelList={panelList} {...props} />
        <div  {...blockProps}>
            <div className="gvnews_custom_featured_wrapper">
                <div className="gvnews_featured featured_image custom_post">
                    <a href="#">
                        <div className={`thumbnail-container animate-lazy size-${thumbnailSize()}`}>
                            {content ? content : <ModuleOverlay />}
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </>;
});

export default PostFeaturedImage;