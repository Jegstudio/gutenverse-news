import { compose } from '@wordpress/compose';
import { withCustomStyle } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { __ } from '@wordpress/i18n';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { useRef, useEffect } from '@wordpress/element';

const ArchiveDescription = compose(
    withCustomStyle(panelList),
    withCopyElementToolbar()
)((props) => {
    const {
        attributes,
        setElementRef
    } = props;

    const {
        elementId,
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
        className: classnames(
            'gvnews-block',
            'gvnews-block-wrapper',
            'gvnews-archive-description',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: blockStyleRef
    });

    return <>
        <PanelController panelList={panelList} {...props} />
        <div {...blockProps}>
            <div className="gvnews_archive_description_wrapper">
                <h2 className="gvnews_archive_description">{__('Archive description goes here, it will change into related archive description on frontend website.', 'gutenverse-news')}</h2>
            </div>
        </div>
    </>;
});

export default ArchiveDescription;