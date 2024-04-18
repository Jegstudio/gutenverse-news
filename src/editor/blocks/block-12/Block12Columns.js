
import { __ } from '@wordpress/i18n';
import ThumbModule from '../../part/thumbnail';
import { MetaModule1, MetaModule3, MetaCategory } from '../../part/meta';
import { ModuleSkeleton, ModuleOverlay } from '../../part/placeholder';

const Block12Columns = props => {
    const {postData, moduleOption, excerptLength, excerptEllipsis, metaDateType, metaDateFormat, metaDateFormatCustom, postBulk, overlay} = props;

    const RenderBlock1 = props=>{
        const {post, attr} = props;
        return (
            <article className="gvnews_post gvnews_pl_lg_card">
                <div className="gvnews_inner_post">
                    <ThumbModule size={715} cat={false} post={post}/>
                    <div className="gvnews_postblock_content">
                        {<MetaCategory {...props} />}
                        <h3 className="gvnews_post_title">
                            <a>{post.title && post.title.replace(/&#8217;/g, '\'')}</a>
                        </h3>
                        {attr.option && !attr.option.meta_show && ( props.blockWidth == 4 ? <MetaModule3 {...props}/> : <MetaModule1 {...props}/>)}
                        {props.blockWidth != 4 && <div className="gvnews_post_excerpt">
                            <p>
                                {post.excerpt.replace('&hellip;','').split(' ').splice(0,attr.length).join(' ') + attr.elipsis}
                            </p>
                            <a className="gvnews_readmore">
                                {attr.option.string && attr.option.string.load_more}
                            </a>
                        </div>}
                    </div>
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
            for (let i = 0; i < postData.length; i++) {
                rows.push(<RenderBlock1 key={postData[i].id} attr={attr} post={postData[i]}/>);
            }
        }

        return(
            <div className="gvnews_posts">
                {rows}
            </div>
        );
    };

    return <div className="gvnews_block_container gvnews_load_more_flag">
        { postData ? <BuildColumn1/> : postBulk ? <div className="gvnews_empty_module">{moduleOption.string && moduleOption.string.no_content}</div> : <ModuleSkeleton/> }
        { overlay && <ModuleOverlay/> }
    </div>;
};

export default Block12Columns;