
import { __ } from '@wordpress/i18n';
import { MetaModule1} from '../../part/meta';
import { RawHTML } from '@wordpress/element';
import { ModuleSkeleton, ModuleOverlay } from '../../part/placeholder';

const Block18Columns = props => {
    const {postData, moduleOption, excerptLength, excerptEllipsis, metaDateType, metaDateFormat, metaDateFormatCustom, blockWidth, postBulk, overlay} = props;

    const RenderBlock1 = props=>{
        const {post, attr} = props;
        const thumb = post.thumbnail.url ? {src: post.thumbnail.url} : null;
        return (
            <article className="gvnews_post gvnews_pl_lg_8">
                <div className="gvnews_postblock_heading">
                    <h3 className="gvnews_post_title">
                        <a>{post.title.replace(/&#8217;/g, '\'')}</a>
                    </h3>
                </div>
                <div className="gvnews_postblock_content">
                    <div className="gvnews_thumb">
                        <a>
                            <div className={[`thumbnail-container ${4==blockWidth ? 'size-715' : ''}`]} style={{'paddingBottom': 4!=blockWidth ? post.thumbnail.padding+'%' : ''}}>
                                <img {...thumb} style={{'objectFit': 'cover', 'verticalAlign': 'middle', 'maxHeight': '100%', 'maxWidth': '100%'}} className="lazyloaded"/>
                            </div>
                        </a>
                    </div>
                    {attr.option && !attr.option.meta_show && <MetaModule1 {...props}/>}
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

export default Block18Columns;