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
        paginationPageinfo,
        paginationNextText,
        paginationPrevText
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

    const isNav3 = paginationMode === 'nav_3';
    const isCenterAlign = paginationAlign === 'center';

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
                {isCenterAlign && <span className="page_info">Page 1 of 3</span>}
                <div className="nav-wrapper">
                    {!isNav3 && <a className="nav-item page_nav prev" data-id="2" href="javascript:void(0);"><span className="nav-item navtext">{paginationPrevText}</span></a>}
                    {paginationAlign === 'left' && <span className="page_info">Page 1 of 3</span>}
                    <span className="nav-item page_number active">1</span>
                    <span className="nav-item page_number dots">…</span>
                    <a className="nav-item page_number" data-id="2" href="javascript:void(0);">2</a>
                    <a className="nav-item page_number" data-id="3" href="javascript:void(0);">3</a>
                    {!isNav3 && <a className="nav-item page_nav next" data-id="2" href="javascript:void(0);"><span className="nav-item navtext">{paginationNextText}</span></a>}
                </div>
                {isNav3 && !isCenterAlign && <div className="next-prev-button">
                    <a className="page_nav prev" data-id="2" href="javascript:void(0);"><span className="navtext">{paginationPrevText}</span></a>
                    <a className="page_nav next" data-id="2" href="javascript:void(0);"><span className="navtext">{paginationNextText}</span></a>
                </div>}
                {isNav3 && isCenterAlign &&
                    <>
                        <a className="page_nav prev" data-id="2" href="javascript:void(0);"><span className="navtext">{paginationPrevText}</span></a>
                        <a className="page_nav next" data-id="2" href="javascript:void(0);"><span className="navtext">{paginationNextText}</span></a>
                    </>
                }
            </div>
        </div>
    </>;
});

export default ArchivePagination;