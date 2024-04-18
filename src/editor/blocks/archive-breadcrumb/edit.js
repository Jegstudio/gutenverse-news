import { compose } from '@wordpress/compose';
import { withCustomStyle } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';

const ArchiveBreadcrumb = compose(
    withCustomStyle(panelList),
    withCopyElementToolbar()
)((props) => {
    const {
        attributes
    } = props;

    const {
        elementId,
        scheme
    } = attributes;


    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);

    const blockProps = useBlockProps({
        className: classnames(
            'gvnews-block',
            'gvnews-block-wrapper',
            'gvnews-archive-breadcrumb',
            elementId,
            animationClass,
            displayClass,
        ),
    });

    return <>
        <PanelController panelList={panelList} {...props} />
        <div {...blockProps} >
            <div className={`gvnews_archive_breadcrumb_wrapper ${scheme}`} >
                <div className={'gvnews_breadcrumbs gvnews_breadcrumb_container'}>
                    <div id="breadcrumbs">
                        <span>
                            <a href="" target="_self">Home</a>
                        </span>
                        <i className="fas fa-chevron-right"></i>
                        <span>
                            <a href="" target="_self">Category</a>
                        </span>
                        <i className="fas fa-chevron-right"></i>
                        <span className="breadcrumb_last_link">
                            <a href="" target="_self">Child Category</a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </>;
});

export default ArchiveBreadcrumb;