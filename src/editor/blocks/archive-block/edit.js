import { compose } from '@wordpress/compose';
import { withCustomStyle } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import BlockHandler from './block-handler';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { useRef, useEffect } from '@wordpress/element';

const ArchiveBlock = compose(
    withCustomStyle(panelList),
    withCopyElementToolbar()
)((props) => {
    const {
        attributes,
        setElementRef
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
    } = attributes;

    const blockStyleRef = useRef();

    useEffect(() => {
        if (blockStyleRef.current) {
            setElementRef(blockStyleRef.current);
        }
    }, [blockStyleRef]);

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);

    const blockProps = useBlockProps({
        className: classnames('gvnews-block',
            'gvnews-block-wrapper', 'gvnews-archive-block', elementId, animationClass, displayClass),
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
        excerpLength: excerptLength,
        excerptEllipsis,
        metaDateType: dateType,
        metaDateFormat: dateFormat,
        metaDateFormatCustom: dateFormatCustom,
        firstPage,
    };

    return (
        <>
            <PanelController panelList={panelList} {...props} />
            <div {...blockProps} ref={blockStyleRef}>
                <div className="guten-raw-wrapper gvnews-editor">
                    <BlockHandler {...theProps} />
                </div>
            </div>
        </>
    );
});

export default ArchiveBlock;
