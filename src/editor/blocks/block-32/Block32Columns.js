import React from 'react';
import { __ } from '@wordpress/i18n';
import ThumbModule from '../../part/thumbnail';
import { ContentModule } from '../../part/post';
import { ModuleSkeleton, ModuleOverlay } from '../../part/placeholder';
import { MetaCategory, MetaModule1 } from '../../part/meta';

const Block32Columns = (props) => {
    const {
        postData,
        moduleOption,
        excerptLength,
        excerptEllipsis,
        metaDateType,
        metaDateFormat,
        metaDateFormatCustom,
        blockWidth,
        postBulk,
        overlay,
    } = props;

    const RenderBlock1 = (props) => {
        const { post, attr } = props;
        return (
            <article className={'gvnews_post'}>
                <div className="box_wrap">
                    <header className="gvnews_postblock_heading">
                        {<MetaCategory {...props} />}
                        {post.title && (
                            <h3 property="headline" className="gvnews_post_title">
                                <a>{post.title.replace(/&#8217;/g, '\'')}</a>
                            </h3>
                        )}
                    </header>
                    {post.thumbnail.url && <ThumbModule size={1000} cat={false} post={post} />}
                    <ContentModule cat={false} title={false} read={true} excerpt={true} post={post} attr={attr} />
                    {attr.option && <MetaModule1 {...props} />}
                </div>
            </article>
        );
    };

    const BuildColumn1 = () => {
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
                rows.push(<RenderBlock1 key={i} attr={attr} post={postData[i]} width={blockWidth} />);
            }
        }

        return (
            <div className="gvnews_posts_wrap gvnews_posts_masonry">
                <div className={'gvnews_posts gvnews_load_more_flag'}>{rows}</div>
            </div>
        );
    };

    return (
        <div className="gvnews_block_container">
            {postData ? (
                <BuildColumn1 />
            ) : postBulk ? (
                <div className="gvnews_empty_module">{moduleOption.string && moduleOption.string.no_content}</div>
            ) : (
                <ModuleSkeleton />
            )}
            {overlay && <ModuleOverlay />}
        </div>
    );
};

export default Block32Columns;
