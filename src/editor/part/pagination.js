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
    return (
        <div className={`gvnews_block_nav ${ props.showNavText ? 'showtext' : ''}`}>
            <a href="javascript:void(0);" onClick={() => nextPrevTotalPagination.prev && onPageChange(-1, 'prev')} className={`prev ${!nextPrevTotalPagination.prev ? 'disabled' : ''}`} title="Previous"><i className="fas fa-chevron-left"></i>{props.showNavText ? ' Prev' : ''}</a>
            <a href="javascript:void(0);" onClick={() => nextPrevTotalPagination.next && onPageChange(1, 'next')} className={`next ${!nextPrevTotalPagination.next ? 'disabled' : ''}`} title="Next">{props.showNavText ? 'Next ' : ''}<i className="fas fa-chevron-right"></i></a>
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
