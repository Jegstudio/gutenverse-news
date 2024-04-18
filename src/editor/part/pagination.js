

function LoadMore() {
    return (
        <div className="gvnews_block_loadmore">
            <a href="#">Load More</a>
        </div>
    );
}

function PervNext(props) {
    return (
        <div className={`gvnews_block_nav ${ props.showNavText ? 'showtext' : ''}`}>
            <a href="#" className="prev disabled" title="Previous"><i className="fas fa-chevron-left"></i>{props.showNavText ? ' Prev' : ''}</a>
            <a href="#" className="next " title="Next">{props.showNavText ? 'Next ' : ''}<i className="fas fa-chevron-right"></i></a>
        </div>
    );
}

const PaginationModule = (props) => {

    if ( props.paginationMode == 'disable') {
        return null;
    }
    return <div className="gvnews_block_navigation">
        {'nextprev' == props.paginationMode ? <PervNext {...props}/> : <LoadMore/>}
    </div>;
};

export default PaginationModule;