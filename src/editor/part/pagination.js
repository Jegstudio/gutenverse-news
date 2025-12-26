import { renderIcon } from 'gutenverse-core/helper';

function LoadMore(props) {
    const { nextPrevTotalPagination = { next: false, prev: false, total_page: 1 }, onPageChange = () => {} } = props;
    return (
        nextPrevTotalPagination.next && <div className="gvnews_block_loadmore">
            <a onClick={() => nextPrevTotalPagination.next && onPageChange(1, 'more')} href="javascript:void(0);">Load More</a>
        </div>
    );
}

function PervNext(props) {
    const { nextPrevTotalPagination = { next: false, prev: false, total_page: 1 }, onPageChange = () => {} } = props;

    const prevIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. --><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"></path></svg>';
    const nextIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. --><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"></path></svg>';

    return (
        <div className={`gvnews_block_nav ${ props.showNavText ? 'showtext' : ''}`}>
            <a href="javascript:void(0);" onClick={() => nextPrevTotalPagination.prev && onPageChange(-1, 'prev')} className={`prev ${!nextPrevTotalPagination.prev ? 'disabled' : ''}`} title="Previous">{renderIcon('fas fa-chevron-left', 'svg', btoa(prevIcon))}{props.showNavText ? ' Prev' : ''}</a>
            <a href="javascript:void(0);" onClick={() => nextPrevTotalPagination.next && onPageChange(1, 'next')} className={`next ${!nextPrevTotalPagination.next ? 'disabled' : ''}`} title="Next">{props.showNavText ? 'Next ' : ''}{renderIcon('fas fa-chevron-right', 'svg', btoa(nextIcon))}</a>
        </div>
    );
}

const PaginationModule = (props) => {
    if ( props.paginationMode === 'disable') {
        return null;
    }
    return <div className="gvnews_block_navigation" >
        {'nextprev' == props.paginationMode ? <PervNext {...props}/> : <LoadMore {...props} />}
    </div>;
};

export default PaginationModule;
