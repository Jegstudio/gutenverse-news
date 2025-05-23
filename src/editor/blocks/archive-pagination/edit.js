import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { useRef, useEffect } from '@wordpress/element';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import { CopyElementToolbar } from 'gutenverse-core/components';
import getBlockStyle from './styles/block-style';

const ArchivePagination = compose(
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
        paginationMode,
        paginationAlign,
        paginationNavtext,
        paginationPageinfo
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
            'gvnews-archive-pagination',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: elementRef
    });

    return <>
        <CopyElementToolbar {...props} />
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
        <div {...blockProps}>
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