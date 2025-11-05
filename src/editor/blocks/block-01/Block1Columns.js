import ThumbModule from '../../part/thumbnail';
import { ContentModule } from '../../part/post';
import { createChunks } from '../../utils/helper';

const Block1Columns = props => {
    const {
        postData,
        numberPost,
        paginationPost = numberPost,
        isLoadMore = false,
        moduleOption,
        blockWidth,
        excerptLength,
        excerptEllipsis,
        metaDateType,
        metaDateFormat,
        metaDateFormatCustom,
        renderedImageSizeMain = {},
        renderedImageSizeSecond = {},
    } = props;

    const RenderBlock1 = props=>{
        return (
            <>
                <ThumbModule size={500} cat={true} post={props.post} imageSize={props.imageSize}/>
                <ContentModule title={true} meta={1} excerpt={true} read={true} post={props.post} attr={props.attr}/>
            </>
        );
    };

    const RenderBlock2 = props=>{
        const { index = 'x', isLoadMoreAnimation = false } = props;
        return (
            <article className={`gvnews_post gvnews_pl_sm ${isLoadMoreAnimation  ? `gvnews_ajax_loaded anim_${index}` : ''} ${!props?.post?.thumbnail?.url ? 'no_thumbnail' : ''}`}>
                <ThumbModule size={715} cat={false} post={props.post} imageSize={props.imageSize}/>
                <ContentModule title={true} meta={2} excerpt={false} read={false} post={props.post} attr={props.attr}/>
            </article>
        );
    };

    const RenderBlock3 = props=>{
        const { index = 'x', isLoadMoreAnimation = false } = props;
        return(
            <article className={`gvnews_post gvnews_pl_xs_2 ${isLoadMoreAnimation ? `gvnews_ajax_loaded anim_${index}` : ''}`}>
                <i className="fas fa-caret-right"></i>
                <div className="gvnews_postblock_content">
                    <ContentModule title={true} meta={2} excerpt={false} read={false} post={props.post} attr={props.attr}/>
                </div>
            </article>
        );
    };

    const CreateRows = ({RenderColumn}) => {
        if (postData.length === 0) return [];
        const chunks = createChunks(postData.slice(numberPost), paginationPost);
        const rows = [
            <RenderColumn key="0" datas={postData.slice(0, numberPost)} />,
            ...chunks.map(
                (chunk, index) => <RenderColumn isLoadMoreAnimation={isLoadMore && index === chunks.length - 1} key={index + 1} datas={chunk} />
            )
        ];

        return <>
            {rows}
        </>;
    };

    const BuildColumn1 = ()=>{
        const attr = {
            option : moduleOption,
            length : excerptLength,
            elipsis : excerptEllipsis,
            date : {
                type : metaDateType,
                format : metaDateFormat,
                custom : metaDateFormatCustom,
            }
        };

        const RenderColumn = ({datas = [], isLoadMoreAnimation = false}) => {
            const rows = [];
            if (datas) {
                for (let i = 1; i < datas.length; i++) {
                    rows.push(<RenderBlock2 isLoadMoreAnimation={isLoadMoreAnimation} index={i + 1} key={datas[i].id} attr={attr} post={datas[i]}/>);
                }
            }
            return <div className="gvnews_posts">
                <article className={`gvnews_post gvnews_pl_lg_1 ${isLoadMoreAnimation ? 'gvnews_ajax_loaded anim_0' : ''}`}>
                    {datas.length > 0 && <RenderBlock1 key={datas[0].id} attr={attr} post={datas[0]}/>}
                </article>
                <div className="gvnews_postsmall">
                    {rows}
                </div>
            </div>;
        };

        return <CreateRows RenderColumn={RenderColumn} />;
    };

    const BuildColumn2 = ()=>{
        const attr = {
            option : moduleOption,
            length : excerptLength,
            elipsis : excerptEllipsis,
            date : {
                type: metaDateType,
                format: metaDateFormat,
                custom: metaDateFormatCustom,
            }
        };

        const RenderColumn = ({ datas = [], isLoadMoreAnimation = false }) => {
            const rows = [];
            if (datas.length > 0) {
                for (let i = 1; i < datas.length; i++) {
                    rows.push(<RenderBlock2 isLoadMoreAnimation={isLoadMoreAnimation} index={i + 1}  key={datas[i]} attr={attr} post={datas[i]}/>);
                }
            }
            return <div className={'gvnews_posts gvnews-posts-row'}>
                <article className={`gvnews_post gvnews_pl_lg_1 col-sm-6 ${isLoadMoreAnimation ? 'gvnews_ajax_loaded anim_0' : ''}`}>
                    {datas.length > 0 && <RenderBlock1 key={datas[0].id} attr={attr} post={datas[0]}/>}
                </article>
                <div className={'gvnews_postsmall col-sm-6'}>
                    {rows}
                </div>
            </div>;
        };

        return <CreateRows RenderColumn={RenderColumn} />;
    };

    const BuildColumn3 = ()=>{
        const attr = {
            option : moduleOption,
            length : excerptLength,
            elipsis : excerptEllipsis,
            date : {
                type : metaDateType,
                format : metaDateFormat,
                custom : metaDateFormatCustom,
            }
        };

        const RenderColumn = ({ datas = [], isLoadMoreAnimation = false }) => {
            const rows = [];
            const rows2 = [];
            if (datas.length > 0) {
                let limit =  Math.ceil( ( datas.length - 1 ) * 2 / 5) + 1;
                for (let i = 1; i < limit; i++) {
                    rows.push(<RenderBlock2 isLoadMoreAnimation={isLoadMoreAnimation} index={i + 1} key={datas[i].id} attr={attr} post={datas[i]} imageSize={renderedImageSizeSecond}/>);
                }
                for (let i = limit; i < datas.length; i++) {
                    rows2.push(<RenderBlock3 isLoadMoreAnimation={isLoadMoreAnimation} index={i + 1} key={datas[i].id} attr={attr} post={datas[i]}/>);
                }
            }

            return <div className="gvnews_posts gvnews-posts-row">
                <article className={`gvnews_post gvnews_pl_lg_1 col-sm-4 ${isLoadMoreAnimation ? 'gvnews_ajax_loaded anim_0' : ''}`}>
                    {datas.length > 0 && <RenderBlock1 key={datas[0].id} attr={attr} post={datas[0]} imageSize={renderedImageSizeMain}/>}
                </article>
                <div className="gvnews_postsmall col-sm-4">
                    {rows}
                </div>
                <div className="gvnews_postsmall col-sm-4">
                    {rows2}
                </div>
            </div>;
        };


        return <CreateRows RenderColumn={RenderColumn} />;
    };

    const RenderColumn = ()=>{
        if (blockWidth == 4) {
            return <BuildColumn1/>;
        } else if (blockWidth == 12) {
            return <BuildColumn3/>;
        } else {
            return <BuildColumn2/>;
        }
    };

    return <RenderColumn />;
};

export default Block1Columns;