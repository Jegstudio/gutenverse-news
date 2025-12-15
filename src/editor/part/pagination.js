function PervNext(props) {
    const {
        nextPrevTotalPagination = { next: false, prev: false, total_page: 1 },
        onPageChange = () => {},
        showNavText = false,
        paginationPrevIcon = 'fas fa-chevron-left',
        paginationPrevIconType = 'icon',
        paginationPrevIconSVG = '',
        paginationNextIcon = 'fas fa-chevron-right',
        paginationNextIconType = 'icon',
        paginationNextIconSVG = '',
        paginationPrevText = 'Prev',
        paginationNextText = 'Next'
    } = props;

    // Get prev icon
    const prevFinalIcon = (paginationPrevIconType === 'svg' && !paginationPrevIconSVG) ? '' : paginationPrevIcon;
    const prevIconHtml = renderIcon(prevFinalIcon, paginationPrevIconType, paginationPrevIconSVG);

    // Get next icon
    const nextFinalIcon = (paginationNextIconType === 'svg' && !paginationNextIconSVG) ? '' : paginationNextIcon;
    const nextIconHtml = renderIcon(nextFinalIcon, paginationNextIconType, paginationNextIconSVG);

    return (
        <div className={`gvnews_block_nav ${showNavText ? 'showtext' : ''}`}>
            <a href="javascript:void(0);" onClick={() => nextPrevTotalPagination.prev && onPageChange(-1, 'prev')} className={`prev ${!nextPrevTotalPagination.prev ? 'disabled' : ''}`} title="Previous">
                {prevIconHtml}
                {showNavText && ` ${paginationPrevText}`}
            </a>
            <a href="javascript:void(0);" onClick={() => nextPrevTotalPagination.next && onPageChange(1, 'next')} className={`next ${!nextPrevTotalPagination.next ? 'disabled' : ''}`} title="Next">
                {showNavText && `${paginationNextText} `}
                {nextIconHtml}
            </a>
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
