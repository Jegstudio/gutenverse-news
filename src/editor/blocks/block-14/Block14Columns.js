
import { __ } from '@wordpress/i18n';
import ThumbModule from '../../part/thumbnail';
import { MetaModule3, MetaCategory } from '../../part/meta';
import { ModuleSkeleton, ModuleOverlay } from '../../part/placeholder';

const Block14Columns = props => {
    const {postData, moduleOption, excerptLength, excerptEllipsis, metaDateType, metaDateFormat, metaDateFormatCustom, postBulk, overlay} = props;

    const RenderBlock1 = props=>{
        const {attr, post} = props;
        const block = [];
        if (1 == props.type) {
            block.push(
                <React.Fragment key={post.id} >
                    <ThumbModule size={500} cat={false} post={post}/>
                    <div className="gvnews_postblock_content">
                        {<MetaCategory {...props} />}
                        <h3 className="gvnews_post_title">
                            <a>{post.title && post.title.replace(/&#8217;/g, '\'')}</a>
                        </h3>
                        {attr.option && !attr.option.meta_show && <MetaModule3 {...props}/>}
                    </div>
                </React.Fragment>
            );
        } else {
            block.push(
                <article key={post.id} className="gvnews_post gvnews_pl_md_1">
                    <ThumbModule size={500} cat={false} post={post}/>
                    <div className="gvnews_postblock_content">
                        {<MetaCategory {...props} />}
                        <h3 className="gvnews_post_title">
                            <a>{post.title && post.title.replace(/&#8217;/g, '\'')}</a>
                        </h3>
                        {attr.option && !attr.option.meta_show && <MetaModule3 {...props}/>}
                    </div>
                </article>
            );
        }
        return block;
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
                rows.push(<RenderBlock1 key={postData[i].id} attr={attr} type={2} post={postData[i]}/>);
            }
        }

        return(
            <div className="gvnews_posts_wrap">
                <div className="gvnews_postbig">
                    <article className="gvnews_post gvnews_pl_lg_box">
                        <div className="box_wrap">
                            <RenderBlock1 key={postData[0].id} attr={attr} type={postData[0].id} post={postData[0]}/>
                        </div>
                    </article>
                </div>
                <div className="gvnews_posts">
                    {rows}
                </div>
            </div>
        );
    };

    return  <div className="gvnews_block_container gvnews_load_more_flag">
        { postData ? <BuildColumn1/> : postBulk ? <div className="gvnews_empty_module">{moduleOption.string && moduleOption.string.no_content}</div> : <ModuleSkeleton/> }
        { overlay && <ModuleOverlay/> }
    </div>;
};

export default Block14Columns;