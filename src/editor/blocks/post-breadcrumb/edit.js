import { compose } from '@wordpress/compose';
import { useEffect } from '@wordpress/element';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { useRef } from '@wordpress/element';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import { CopyElementToolbar } from 'gutenverse-core/components';
import getBlockStyle from './styles/block-style';

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
            <div className="breadcrumbs">
                <span className="">
                    <a href="#" onClick={(e) => e.preventDefault()} >Home</a>
                </span>
                <i className="fas fa-angle-right"></i>
                <span className="">
                    <a href="#" onClick={(e) => e.preventDefault()} >Category</a>
                </span>
                <i className="fas fa-angle-right"></i>
                <span className="breadcrumb_last_link">
                    <a href="#" onClick={(e) => e.preventDefault()} >Child Category</a>
                </span>
            </div>
        </div>
    </>;
});

export default PostBreadcrumb;


