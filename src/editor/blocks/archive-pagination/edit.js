import { compose } from '@wordpress/compose';
import { withCustomStyle } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';

const ArchivePagination = compose(
    withCustomStyle(panelList),
    withCopyElementToolbar()
)((props) => {
    const {
        attributes
    } = props;

    const {
        elementId,
        paginationMode,
        paginationAlign,
        paginationNavtext,
        paginationPageinfo
    } = attributes;


    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);

    const blockProps = useBlockProps({
        className: classnames(
            'gvnews-block',
            'gvnews-block-wrapper',
            'gvnews-archive-pagination',
            elementId,
            animationClass,
            displayClass,
        ),
    });

    return <>
        <PanelController panelList={panelList} {...props} />
        <div {...blockProps} >
            <div className={`gvnews_navigation gvnews_pagination gvnews_col_3o3 gvnews_page${paginationMode} gvnews_align${paginationAlign} ${!paginationNavtext && 'no_navtext'} ${!paginationPageinfo && 'no_pageinfo'}`}>
                <span className="page_info">Page 1 of 3</span>
                <span className="page_number active">1</span>
                <a className="page_number" data-id="2" href="#">2</a>
                <a className="page_number" data-id="3" href="#">3</a>
                <a className="page_nav next" data-id="2" href="#"><span className="navtext">Next</span></a>
            </div>
        </div>
    </>;
});

export default ArchivePagination;