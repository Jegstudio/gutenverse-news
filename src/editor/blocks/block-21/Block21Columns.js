import { Fragment }  from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { ContentModule } from '../../part/post';
import ThumbModule from '../../part/thumbnail';
import { ModuleSkeleton, ModuleOverlay } from '../../part/placeholder';

const Block21Columns = props => {
    const {postData, moduleOption, excerptLength, excerptEllipsis, metaDateType, metaDateFormat, metaDateFormatCustom, postBulk, overlay} = props;

    const RenderBlock1 = props=>{
        const {post, attr} = props;
        return (
            <Fragment>
                {<ThumbModule size={715} cat={false} post={post} />}
                <ContentModule
                    title={true}
                    meta={2}
                    excerpt={false}
                    post={post}
                    attr={attr}
                />
            </Fragment>
        );
    };

    const  BuildColumn1 = ()=>{
        const attr = {
            option: moduleOption,
            length: excerptLength,
            elipsis: excerptEllipsis,
            date: {
                type: metaDateType,
                format: metaDateFormat,
                custom: metaDateFormatCustom,
            },
        };
        const rows = [];

        if (postData) {
            for (let i = 0; i < postData.length; i++) {
                rows.push(
                    <article
                        key={postData[i].id}
                        className={`gvnews_post gvnews_pl_sm ${
                            !postData[i].thumbnail.url && 'no_thumbnail'
                        }`}
                    >
                        <RenderBlock1  attr={attr} post={postData[i]} />
                    </article>
                );
            }
        }

        return <div className="gvnews_posts">{rows}</div>;
    };

    return <div className="gvnews_block_container gvnews_load_more_flag">
        {postData ? (
            <BuildColumn1 {...props} />
        ) : postBulk ? (
            <div className="gvnews_empty_module">
                {moduleOption.string && moduleOption.string.no_content}
            </div>
        ) : (
            <ModuleSkeleton />
        )}
        {overlay && <ModuleOverlay />}
    </div>;
};

export default Block21Columns;
