import { compose } from '@wordpress/compose';
import { withCustomStyle } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import QueryTitle from '../../query/query-title';
import { useRef, useEffect } from '@wordpress/element';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';

const ArchiveTitle = compose(
    withCustomStyle(panelList),
    withCopyElementToolbar()
)((props) => {
    const {
        attributes,
        setAttributes,
        setElementRef
    } = props;

    const {
        elementId,
    } = attributes;


    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const titleRichTextRef = useRef();

    const blockProps = useBlockProps({
        className: classnames(
            'gvnews-block',
            'gvnews-block-wrapper',
            'gvnews-archive-title',
            elementId,
            animationClass,
            displayClass,
        ),
    });

    const blockStyleRef = useRef();

    useEffect(() => {
        if (blockStyleRef.current) {
            setElementRef(blockStyleRef.current);
        }
    }, [blockStyleRef]);

    return <>
        <PanelController panelList={panelList} {...props} />
        <div ref={blockStyleRef}>
            <QueryTitle {
                ...{
                    blockProps,
                    setAttributes,
                    type: 'archive',
                    titleRef: titleRichTextRef
                }
            } />
        </div>
    </>;
});

export default ArchiveTitle;