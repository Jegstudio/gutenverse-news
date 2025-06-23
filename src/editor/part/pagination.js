import { useEffect, useRef } from '@wordpress/element';
import { debounce } from '@wordpress/compose';

function LoadMore(props) {
    const { nextPrevTotalPagination = { next: false, prev: false, total_page: 1 }, onPageChange = () => {} } = props;
    return (
        nextPrevTotalPagination.next && <div className="gvnews_block_loadmore">
            <a onClick={() => nextPrevTotalPagination.next && onPageChange(1, 'more')} href="#">Load More</a>
        </div>
    );
}

function PervNext(props) {
    const { nextPrevTotalPagination = { next: false, prev: false, total_page: 1 }, onPageChange = () => {} } = props;
    return (
        <div className={`gvnews_block_nav ${ props.showNavText ? 'showtext' : ''}`}>
            <a href="#" onClick={() => nextPrevTotalPagination.prev && onPageChange(-1, 'prev')} className={`prev ${!nextPrevTotalPagination.prev ? 'disabled' : ''}`} title="Previous"><i className="fas fa-chevron-left"></i>{props.showNavText ? ' Prev' : ''}</a>
            <a href="#" onClick={() => nextPrevTotalPagination.next && onPageChange(1, 'next')} className={`next ${!nextPrevTotalPagination.next ? 'disabled' : ''}`} title="Next">{props.showNavText ? 'Next ' : ''}<i className="fas fa-chevron-right"></i></a>
        </div>
    );
}

const PaginationModule = (props) => {
    const { nextPrevTotalPagination = { next: false, prev: false, total_page: 1 }, onPageChange = () => {} } = props;
    const navigationRef = useRef(null);

    useEffect(() => {
        const wpContainer = document.querySelector('.interface-interface-skeleton__content');
        if (props.paginationMode !== 'scrollload' || !navigationRef.current || !wpContainer) {
            return;
        }

        const debouncedHandler = debounce(() => nextPrevTotalPagination.next && onPageChange(1, 'more'), 100);

        const handleScroll = () => {
            const containerHeight = wpContainer.getBoundingClientRect().height;
            const currentY = wpContainer.scrollTop;
            const offset = 0;
            const elementOffset = navigationRef.current.offsetTop;

            if (elementOffset - currentY <= containerHeight + offset) {
                debouncedHandler();
            }
        };

        wpContainer.addEventListener('scroll', handleScroll);

        return () => {
            debouncedHandler.cancel();
            wpContainer.removeEventListener('scroll', handleScroll);
        };
    }, [nextPrevTotalPagination]);

    if ( props.paginationMode === 'disable') {
        return null;
    }
    return <div className="gvnews_block_navigation" ref={navigationRef} >
        {'nextprev' == props.paginationMode ? <PervNext {...props}/> : <LoadMore {...props} />}
    </div>;
};

export default PaginationModule;