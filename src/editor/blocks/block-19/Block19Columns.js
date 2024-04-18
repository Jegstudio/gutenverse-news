import { Fragment }  from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { MetaModule2} from '../../part/meta';
import ThumbModule from '../../part/thumbnail';
import { ModuleSkeleton, ModuleOverlay } from '../../part/placeholder';

const Block19Columns = props => {
    const {postData, moduleOption, excerptLength, excerptEllipsis, metaDateType, metaDateFormat, metaDateFormatCustom, blockWidth, postBulk, overlay} = props;

    const RenderBlock1 = props=>{
        const {attr, post} = props;

        let PostMeta = () => (
            <Fragment>
                <ThumbModule size={715} cat={false} post={post}/>
                <div className="gvnews_postblock_content">
                    <h3 className="gvnews_post_title">
                        <a>{post.title.replace(/&#8217;/g, '\'')}</a>
                    </h3>
                    {attr.option && !attr.option.meta_show && <MetaModule2 {...props}/>}
                </div>
            </Fragment>
        );

        if (1==props.type){
            return (
                <article className="gvnews_post gvnews_pl_md_box">
                    <div className="box_wrap">
                        <PostMeta/>
                    </div>
                </article>
            );
        }else{
            return (
                <article className="gvnews_post gvnews_pl_sm">
                    <PostMeta/>
                </article>
            );
        }
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
                rows.push(<RenderBlock1 key={postData[i].id} attr={attr} post={postData[i]} type={2}/>);
            }
        }

        return(
            <div className="gvnews_posts">
                <RenderBlock1 key={postData[0].id} attr={attr} post={postData[0]} type={1}/>
                <div className="gvnews_postsmall">
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
                type : metaDateType,
                format : metaDateFormat,
                custom : metaDateFormatCustom,
            }
        };
        const rows = [];
        let limit = blockWidth == 8 ? 2 : 3;

        if (postData) {
            for (let i = 0; i < postData.length; i++) {
                if (i < limit){
                    rows.push(<RenderBlock1 key={postData[i].id} attr={attr} post={postData[i]} type={1}/>);
                }else{
                    rows.push(<RenderBlock1 key={postData[i].id} attr={attr} post={postData[i]} type={2}/>);
                }
            }
        }

        return(
            <div className="gvnews_posts">
                {rows}
            </div>
        );
    };

    const RenderColumn = ()=>{
        return blockWidth == 4 ? <BuildColumn1/> : <BuildColumn2/>;
    };

    return   <div className="gvnews_block_container gvnews_load_more_flag">
        { postData ? <RenderColumn/> : postBulk ? <div className="gvnews_empty_module">{moduleOption.string && moduleOption.string.no_content}</div> : <ModuleSkeleton/> }
        { overlay && <ModuleOverlay/> }
    </div>;
};

export default Block19Columns;