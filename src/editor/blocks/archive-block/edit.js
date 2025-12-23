import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import BlockHandler from './components/block-handler';
// import BlockHandler from './block-handler';
import { useRef, useEffect } from '@wordpress/element';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import { CopyElementToolbar, u } from 'gutenverse-core/components';
import getBlockStyle from './styles/block-style';

const ArchiveBlock = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const {
        attributes,
        clientId,
        setBlockRef,
        setAttributes,
    } = props;

    const {
        elementId,
        scheme,
        columnWidth,
        blockType,
        numberPost,
        boxed,
        boxedShadow,
        excerptLength,
        excerptEllipsis,
        dateType = 'published',
        dateFormat,
        dateFormatCustom,
        firstPage,
        showMeta = true,
        showMetaDate = true,
        showMetaAuthor = true,
        showMetaComment = true,
        readmoreButtonDisabled = false,
        listIcon = '',
        gutenversePreviewBlock = '',
        mainClass,
        renderedImageSizeMain
    } = attributes;

    const elementRef = useRef(null);

    const setMainClass = () => {
        const gvnewsPost = u(elementRef.current).find('.gvnews_post').first();
        let gvnewsPostMainClass = mainClass;
        if (!gvnewsPost) { // First Render skip
            return;
        }
        gvnewsPostMainClass = gvnewsPost.classList[1];
        setAttributes({
            ...attributes,
            mainClass: gvnewsPostMainClass
        });
    };

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);

    useEffect(() => {
        if (elementRef) {
            setBlockRef(elementRef);
        }
    }, [elementRef]);
    useEffect(() => {
        setMainClass();
    }, [blockType]);

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);

    const blockProps = useBlockProps({
        className: classnames('gvnews-block',
            'gvnews-block-wrapper', 'gvnews-archive-block', elementId, animationClass, displayClass),
        ref: elementRef
    });

    const theProps = {
        ...props,
        type: 'archive',
        elementId,
        scheme,
        columnWidth,
        blockType,
        numberPost,
        boxed,
        boxedShadow,
        excerptLength,
        excerptEllipsis,
        metaDateType: dateType,
        metaDateFormat: dateFormat,
        metaDateFormatCustom: dateFormatCustom,
        firstPage,
        showMeta,
        showMetaDate,
        showMetaAuthor,
        showMetaComment,
        readmoreButtonDisabled,
        listIcon,
        gutenversePreviewBlock,
        renderedImageSizeMain,
    };

    return (
        <>
            <CopyElementToolbar {...props} />
            <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
            <div {...blockProps}>
                <div className="guten-raw-wrapper gvnews-editor">
                    <BlockHandler {...theProps} />
                </div>
            </div>
        </>
    );
});

export default ArchiveBlock;
