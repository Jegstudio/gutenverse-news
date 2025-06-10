import classnames from 'classnames';
import { useRef } from '@wordpress/element';
import PaginationModule from '../../../part/pagination';
import HeaderModule from '../../../part/header';

const BlockWrapper = (props) => {
    const { elementId, blockType, headerData = false, paginationData = false, block, blockWidth, enableBoxed, enableBoxShadow } = props;
    const wrapperClasses = classnames(
        `gvnews_postblock_${blockType}`,
        'gvnews_postblock',
        'gvnews_module_hook',
        `gvnews_col_${blockWidth == 4 ? '1' : blockWidth == 8 ? '2' : '3'}o3`,
        {
            ['gvnews_postblock_blog_2']: '27' === blockType,
            ['gvnews_pagination_disable']: !paginationData,
            ['gvnews_pb_boxed']: enableBoxed,
            ['gvnews_pb_boxed_shadow']: enableBoxed && enableBoxShadow,
        }
    );
    if (['32'].includes(blockType)) {
        const isotope = useRef();
        return (
            <div ref={isotope} isotope-selector={`gvnews_postblock_32_${elementId}`} className={wrapperClasses}>
                {headerData && <HeaderModule {...headerData} />}
                {block ? block : 'loading'}
                {paginationData && <PaginationModule {...paginationData} />}
            </div>
        );
    } else {
        return (
            <div className={wrapperClasses}>
                {headerData && <HeaderModule {...headerData} />}
                {block ? block : 'loading'}
                {paginationData && <PaginationModule {...paginationData} />}
            </div>
        );
    }
};

export default BlockWrapper;