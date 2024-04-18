
import { __ } from '@wordpress/i18n';
import ThumbModule from '../../part/thumbnail';
import { ContentModule } from '../../part/post';
import { RawHTML } from '@wordpress/element';
import { ModuleSkeleton, ModuleOverlay } from '../../part/placeholder';
import { MetaModule3, MetaCategory, MetaAuthor, MetaComments} from '../../part/meta';

const Block26Columns = props => {
    const {postData, moduleOption, excerptLength, excerptEllipsis, metaDateType, metaDateFormat, metaDateFormatCustom, blockWidth, postBulk, overlay} = props;

    const RenderBlock1 = props=>{
        const {attr, post} = props;
        return (
            <article className={'gvnews_post gvnews_pl_lg_9'}>
                <div className="gvnews_postblock_heading">
                    {<MetaCategory {...props} />}
                    {post.title && <h3 property="headline" className="gvnews_post_title">
                        <a>{post.title.replace(/&#8217;/g, '\'')}</a>
                    </h3>}
                    {attr.option && <MetaModule3 {...props}/>}
                </div>
                <ThumbModule size={500} cat={false} post={post}/>
                <ContentModule title={false} excerpt={true} read={true} post={post} attr={attr}/>
                <div className="gvnews_meta_footer clearfix">
                    {<MetaAuthor {...props} />}
                    {blockWidth != 4 && <RawHTML key="html">{post.share}</RawHTML> }
                    {<MetaComments {...props} showText={true}/>}
                </div>
            </article>
        );
    };

    const BuildColumn1 = ()=>{
        const attr = {
            option: moduleOption,
            length: excerptLength,
            elipsis: excerptEllipsis,
            date: {
                type: metaDateType,
                format: metaDateFormat,
                custom: metaDateFormatCustom,
            }
        };

        const rows = [];

        if (postData) {
            for (let i = 0; i < postData.length; i++) {
                rows.push(
                    <RenderBlock1 key={postData[i].id} attr={attr} post={postData[i]} />
                );
            }
        }

        return(
            <div className="gvnews_posts gvnews_load_more_flag">
                {rows}
            </div>
        );
    };

    return  <div className="gvnews_block_container">
        { postData ? <BuildColumn1/> : postBulk ? <div className="gvnews_empty_module">{moduleOption.string && moduleOption.string.no_content}</div> : <ModuleSkeleton/> }
        { overlay && <ModuleOverlay/> }
    </div>;
};

export default Block26Columns;
