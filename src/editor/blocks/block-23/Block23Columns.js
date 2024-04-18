import { Fragment }  from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import ThumbModule from '../../part/thumbnail';
import { MetaModule3 } from '../../part/meta';
import { PostTitle, PostExcerpt } from '../../part/post';
import {ModuleSkeleton, ModuleOverlay} from '../../part/placeholder';

const Block23Columns = props => {
    const {postData, moduleOption, excerptLength, excerptEllipsis, metaDateType, metaDateFormat, metaDateFormatCustom, postBulk, overlay} = props;
    const RenderBlock1 = props=>{
        const {post, attr} = props;
        return (
            <Fragment>
                <ThumbModule size={715} cat={true} post={post}/>
                <div className="gvnews_postblock_content">
                    {post.title && <PostTitle post={post} />}
                    {post.excerpt && <PostExcerpt post={post} attr={attr}/>}
                    {attr.option && <MetaModule3 {...props} />}
                </div>
            </Fragment>
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
                    <article key={postData[i].id} className="gvnews_post gvnews_pl_md_1">
                        <RenderBlock1 attr={attr} post={postData[i]}/>
                    </article>
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
        { postData ? <BuildColumn1/> : postBulk ? <div className="gvnews_empty_module">{moduleOption.string && moduleOption.string.no_content}</div> : <ModuleSkeleton/>}
        { overlay && <ModuleOverlay/> }
    </div>;
};

export default Block23Columns;
