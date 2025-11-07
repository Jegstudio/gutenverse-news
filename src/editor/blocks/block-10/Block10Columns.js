import ThumbModule from '../../part/thumbnail';
import { ContentModule } from '../../part/post';
import { MetaModule1 } from '../../part/meta';

const Block10Columns = props => {
    const {postData, numberPost, paginationPost = numberPost, page, isLoadMore = false, moduleOption, excerptLength, excerptEllipsis, metaDateType, metaDateFormat, metaDateFormatCustom, readmoreButtonDisabled = false} = props;
    const postDataLen = postData.length;
    const loadValidAnim = postDataLen - paginationPost;

    const RenderBlock1 = props=>{
        const { index = 'x' } = props;
        return (
            <article className={`gvnews_post gvnews_pl_lg_4 ${isLoadMore && index >= loadValidAnim && index <= postDataLen && page > 1 ? `gvnews_ajax_loaded anim_${(index - loadValidAnim)}` : ''}`}>
                <header className="gvnews_postblock_heading">
                    <h3 className="gvnews_post_title">
                        <a>{props.post.title.replace(/&#8217;/g, '\'')}</a>
                    </h3>
                    {props.attr.option && !props.attr.option.meta_show && <MetaModule1 {...props}/>}
                </header>
                <ThumbModule size={500} cat={true} post={props.post}/>
                <ContentModule title={false} meta={false} excerpt={true} read={!readmoreButtonDisabled} post={props.post} attr={props.attr}/>
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

        if (postData.length > 0) {
            for (let i = 0; i < postData.length; i++) {
                rows.push(<RenderBlock1 index={i} key={postData[i].id} attr={attr} post={postData[i]}/>);
            }
        }

        return(
            <div className="gvnews_posts">
                {rows}
            </div>
        );
    };

    return <BuildColumn1/>;
};

export default Block10Columns;