import { compose } from '@wordpress/compose';
import { useEffect, useRef } from '@wordpress/element';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useAnimationEditor, useInitializeIconToSvg } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import { CopyElementToolbar } from 'gutenverse-core/components';
import getBlockStyle from './styles/block-style';
import { FacebookIcon, SiteIcon, TwitterIcon, LinkedinIcon, InstagramIcon } from '../../utils/social-icons';
import { applyFilters } from '@wordpress/hooks';

const PostAuthor = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const {
        attributes,
        clientId,
        setBlockRef,
        setAttributes
    } = props;

    const {
        elementId,
        titleTag: TitleTag,
        avatarPosition = 'left',
    } = attributes;

    const elementRef = useRef(null);

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);

    useInitializeIconToSvg({
        elementId,
        attributes,
        setAttributes,
        icons: [
            { type: 'donationIconType', svg: 'donationIconSVG' },
        ],
    });

    useEffect(() => {
        if (elementRef) {
            setBlockRef(elementRef);
        }
    }, [elementRef]);

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);

    const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
    const { imgDir } = window['GVNewsConfig'];

    const blockProps = useBlockProps({
        className: classnames(
            'gvnews-block',
            'guten-element',
            'gvnews-block-wrapper',
            'gvnews-post-author',
            elementId,
            animationClass,
            displayClass,
            `avatar-${avatarPosition}`,
        ),
        ref: elementRef
    });

    const AvatarImage = () => {
        return <div className="gvnews-author-image">
            <img
                alt="admin"
                src={`${imgDir}/author.png`}
                className="avatar avatar-80 photo"
                height="80"
                width="80"
                loading="lazy"
                decoding="async" />
        </div>
    }

    const additionals = applyFilters('gvnews.post-author.components', [], attributes);


    return <>
        <CopyElementToolbar {...props} />
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
        <div  {...blockProps}>
            {(avatarPosition === 'left' || avatarPosition === 'top') && <AvatarImage />}
            <div className="gvnews-author-content">
                <TitleTag className="gvnews-author-name">
                    <a>John Doe</a>
                </TitleTag>
                <p className="gvnews-author-desc">{description}</p>
                <div className="gvnews-author-socials">
                    <a href="javascript:void(0);" className="url"><SiteIcon /></a>
                    <a href="javascript:void(0);" className="url"><FacebookIcon /></a>
                    <a href="javascript:void(0);" className="url"><TwitterIcon /></a>
                    <a href="javascript:void(0);" className="url"><LinkedinIcon /></a>
                    <a href="javascript:void(0);" className="url"><InstagramIcon /></a>
                </div>
                {additionals}
            </div>
            {(avatarPosition === 'right' || avatarPosition === 'bottom') && <AvatarImage />}
        </div>
    </>;
});

export default PostAuthor;
