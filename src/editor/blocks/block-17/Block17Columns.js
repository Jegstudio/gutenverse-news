
import { __ } from '@wordpress/i18n';
import ThumbModule from '../../part/thumbnail';
import { MetaModule1, MetaModule2 } from '../../part/meta';
import { ModuleSkeleton, ModuleOverlay } from '../../part/placeholder';

const Block17Columns = props => {
    const {postData, moduleOption, excerptLength, excerptEllipsis, metaDateType, metaDateFormat, metaDateFormatCustom, blockWidth, postBulk, overlay} = props;

    function RenderBlock1(props){
        const {attr, post} = props;
        let aclass = '';
        let PostMeta = () => (
            <React.Fragment>
                {attr.option && !attr.option.meta_show && <MetaModule1 {...props}/>}
                <div className="gvnews_post_excerpt">
                    <p>{post.excerpt && post.excerpt.replace('&hellip;','').split(' ').splice(0,attr.length).join(' ') + attr.elipsis}</p>
                </div>
            </React.Fragment>
        );

        if (1==props.type){
            aclass = 'gvnews_post gvnews_pl_md_1';
        }else{
            aclass = 'gvnews_post gvnews_pl_sm';
        }

        return (
            <article className={aclass}>
                <ThumbModule size={715} cat={1==props.type ? true : false} post={post}/>
                <div className="gvnews_postblock_content">
                    <h3 className="gvnews_post_title">
                        <a>{post.title.replace(/&#8217;/g, '\'')}</a>
                    </h3>
                    {1==props.type ? <PostMeta/> : (attr.option && !attr.option.meta_show && <MetaModule2 {...props}/>)}
                </div>
            </article>
        );
    }

    const BuildColumn1 = props=>{
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
        const first = [];
        let start = 0;
        let limit = 2;

        if (4==blockWidth) {
            first.push(<RenderBlock1 key={postData[0].id} attr={attr} post={postData[0]} type={1}/>);
            start = 1;
        } else if (12==blockWidth) {
            limit = 3;
        }

        if (postData) {
            for (let i = start; i < postData.length; i++) {
                const key = i+1;
                if (4==blockWidth){
                    rows.push(<RenderBlock1 key={postData[i].id} attr={attr} post={postData[i]} type={2}/>);
                }else{
                    rows.push(i < limit ? <RenderBlock1 key={postData[i].id} attr={attr} post={postData[i]} type={1}/> : <RenderBlock1 key={postData[i].id} attr={attr} post={postData[i]} type={2}/>);
                }
            }
        }

        return(
            <div className="gvnews_posts_wrap">
                <div className="gvnews_posts">
                    {first}
                    {rows}
                </div>
            </div>
        );
    };

    return   <div className="gvnews_block_container gvnews_load_more_flag">
        { postData ? <BuildColumn1/> : postBulk ? <div className="gvnews_empty_module">{moduleOption.string && moduleOption.string.no_content}</div> : <ModuleSkeleton/> }
        { overlay && <ModuleOverlay/> }
    </div>;
};

export default Block17Columns;