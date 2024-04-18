
import { __ } from '@wordpress/i18n';
import ThumbModule from '../../part/thumbnail';
import { ContentModule, PostTitle } from '../../part/post';
import { ModuleSkeleton, ModuleOverlay } from '../../part/placeholder';

const Block24Columns = props => {
    const {postData, moduleOption, excerptLength, excerptEllipsis, metaDateType, metaDateFormat, metaDateFormatCustom, blockWidth, postBulk, overlay} = props;

    const RenderBlock1 = props=>{
        const {post} = props;
        return (
            <article className={`gvnews_post gvnews_pl_md_box ${!post.thumbnail.url && 'no_thumbnail'}`}>
                <div className="box_wrap">
                    <ThumbModule size={715} cat={false} post={post}/>
                    <ContentModule title={true} meta={2} excerpt={false} read={false} post={post} attr={props.attr}/>
                </div>
            </article>
        );
    };

    const RenderBlock2 = props=>{
        return (
            <article className="gvnews_post gvnews_pl_xs_4">
                <div className="gvnews_postblock_content">
                    <i className='fas fa-caret-right'></i>
                    {props.post.title && <PostTitle post={props.post} />}
                </div>
            </article>
        );
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
        const rows = [];

        if (postData) {
            for (let i = 1; i < postData.length; i++) {
                rows.push(<RenderBlock2 key={postData[i].id} attr={attr} post={postData[i]}/>);
            }
        }

        return(
            <div className="gvnews_posts">
                {postData && <RenderBlock1 key={postData[0].id} attr={attr} post={postData[0]}/>}
                <div className="gvnews_postsmall gvnews_load_more_flag">
                    {rows}
                </div>
            </div>
        );
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
        const rows = [];
        const rows2 = [];

        const postDataLength = postData.length;

        if (postData) {
            const limit = postDataLength > 2 ? 2 : postDataLength;
            for (let i = 0; i < limit ; i++) {
                rows.push(<RenderBlock1 key={postData[i].id} attr={attr} post={postData[i]}/>);
            }
        }

        if (postData) {
            if(postDataLength>2){
                for (let i = 2; i < postDataLength; i++) {
                    rows.push(<RenderBlock2 key={postData[i].id} attr={attr} post={postData[i]}/>);
                }
            }
        }

        return(
            <div className={'gvnews_posts'}>
                {rows}
                {rows2}
            </div>
        );
    };

    const BuildColumn3 = ()=>{
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
        const rows = [];
        const rows2 = [];

        const postDataLength = postData.length;

        if (postData) {
            const limit = postDataLength > 3 ? 3 : postDataLength;
            for (let i = 0; i < limit ; i++) {
                rows.push(<RenderBlock1 key={postData[i].id} attr={attr} post={postData[i]}/>);
            }
        }

        if (postData) {
            if(postDataLength>3){
                for (let i = 3; i < postDataLength; i++) {
                    rows.push(<RenderBlock2 key={postData[i].id} attr={attr} post={postData[i]}/>);
                }
            }
        }

        return(
            <div className={'gvnews_posts gvnews_load_more_flag'}>
                {rows}
                {rows2}
            </div>
        );
    };

    const RenderColumn = ()=>{
        if (blockWidth == 4) {
            return <BuildColumn1/>;
        } else if (blockWidth == 8) {
            return <BuildColumn2/>;
        } else {
            return <BuildColumn3/>;
        }
    };

    return  <div className="gvnews_block_container">
        { postData ? <RenderColumn/> : postBulk ? <div className="gvnews_empty_module">{moduleOption.string && moduleOption.string.no_content}</div> : <ModuleSkeleton/> }
        { overlay && <ModuleOverlay/> }
    </div>;
};

export default Block24Columns;
