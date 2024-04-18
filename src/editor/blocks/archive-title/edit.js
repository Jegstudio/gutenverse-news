import { compose } from '@wordpress/compose';
import { withCustomStyle } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import QueryTitle from '../../query/query-title';
import { useRef } from '@wordpress/element';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';

const ArchiveTitle = compose(
    withCustomStyle(panelList),
    withCopyElementToolbar()
)((props) => {
    const {
        attributes,
        setAttributes
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

    return <>
        <PanelController panelList={panelList} {...props} />
        <QueryTitle {
            ...{
                blockProps,
                setAttributes,
                type: 'archive',
                titleRef: titleRichTextRef
            }
        } />
    </>;
});

export default ArchiveTitle;