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
            'gvnews-block',
            'gvnews-block-wrapper',
            'gvnews-post-author',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: elementRef
    });

    return <>
        <CopyElementToolbar {...props} />
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
        <div  {...blockProps}>
            <div className="gvnews-author-box-container">
                <div className="gvnews-authorbox">
                    <div className="gvnews-author-image">
                        <img
                            alt="admin"
                            srcSet="https://secure.gravatar.com/avatar/33e54dec0cd79fc4b5e911c15f836c46ec8d0e452ecd3ca5f707bce0a3540a3b?s=96&amp;d=mm&amp;r=g"
                        />
                    </div>
                    <div className="gvnews-author-content">
                        <h3 className="gvnews-author-name">
                            <a href="#" onClick={(e) => e.preventDefault()} >admin</a>
                        </h3>
                        <p className="gvnews-author-desc">Example Description</p>
                        <div className="gvnews-author-socials" >
                            <a href="#" onClick={(e) => e.preventDefault()} className="url">
                                <i className="fa fa-globe"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>;
});

export default PostAuthor;