import classnames from 'classnames';
import { useRef } from '@wordpress/element';
import PaginationModule from '../../../part/pagination';
import HeaderModule from '../../../part/header';
import { ModuleOverlay } from '../../../part/placeholder';
import { useIsFirstRender } from 'gutenverse-core/hooks';

const BlockWrapper = (props) => {
    const firstRender = useIsFirstRender();
    const { elementId, blockType, headerData = false, paginationData = false, block, overlay, blockWidth, boxed, boxedShadow } = props;
    const wrapperClasses = classnames(
        `gvnews_postblock_${blockType}`,
        'gvnews_postblock',
        'gvnews_module_hook',
        `gvnews_col_${blockWidth == 4 ? '1' : blockWidth == 8 ? '2' : '3'}o3`,
        {
            ['gvnews_postblock_blog_2']: '27' === blockType,
            ['gvnews_pagination_disable']: !paginationData,
            ['gvnews_pb_boxed']: boxed,
            ['gvnews_pb_boxed_shadow']: boxed && boxedShadow,
        }
    );
    if (['32'].includes(blockType)) {
        const isotope = useRef();
        return (
            // eslint-disable-next-line react/no-unknown-property
            <div ref={isotope} isotope-selector={`gvnews_postblock_32_${elementId}`} className={wrapperClasses}>
                {headerData && <HeaderModule {...headerData} />}
                {block}
                {overlay && !firstRender ? <ModuleOverlay /> : ''}
                {paginationData && <PaginationModule {...paginationData} />}
            </div>
        );
    } else {
        return (
            <div className={wrapperClasses}>
                {headerData && <HeaderModule {...headerData} />}
                {block}
                {overlay && !firstRender ? <ModuleOverlay /> : ''}
                {paginationData && <PaginationModule {...paginationData} />}
            </div>
        );
    }
};

export default BlockWrapper;