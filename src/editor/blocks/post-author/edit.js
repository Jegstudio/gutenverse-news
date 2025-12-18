import { compose } from '@wordpress/compose';
import { useEffect, useRef } from '@wordpress/element';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import { CopyElementToolbar } from 'gutenverse-core/components';
import getBlockStyle from './styles/block-style';
import { isNotEmpty } from 'gutenverse-core/helper';

const PostAuthor = compose(
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
        titleTag: TitleTag,
        avatarPosition = 'left',
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

    const currentUser = wp.data.select('core').getCurrentUser();
    const description = isNotEmpty(currentUser?.description) ? currentUser?.description : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.';

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
                src={currentUser?.avatar_urls?.['48']}
                className="avatar avatar-80 photo"
            />
        </div>
    }

    return <>
        <CopyElementToolbar {...props} />
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
        <div  {...blockProps}>
            {(avatarPosition === 'left' || avatarPosition === 'top') && <AvatarImage />}
            <div className="gvnews-author-content">
                <TitleTag className="gvnews-author-name">
                    <a>{currentUser?.name}</a>
                </TitleTag>
                <p className="gvnews-author-desc">{description}</p>
                <div className="gvnews-author-socials">
                    <a className="url"><i className="fa fa-globe"></i></a>
                    <a className="url"><i className="fab fa-facebook"></i></a>
                    <a className="url"><i className="fab fa-twitter"></i></a>
                    <a className="url"><i className="fab fa-linkedin"></i></a>
                    <a className="url"><i className="fab fa-instagram"></i></a>
                </div>
            </div>
            {(avatarPosition === 'right' || avatarPosition === 'bottom') && <AvatarImage />}
        </div>
    </>;
});

export default PostAuthor;
