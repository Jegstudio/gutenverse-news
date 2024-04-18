import React from 'react';
import { __ } from '@wordpress/i18n';
import ThumbModule from '../../part/thumbnail';
import { ContentModule, PostExcerpt, PostTitle } from '../../part/post';
import { ModuleSkeleton, ModuleOverlay } from '../../part/placeholder';
import { MetaCategory, MetaModule3 } from '../../part/meta';

const Block38Columns = (props) => {
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
                <div className="gvnews_thumb" style={{ backgroundImage: `url(${post.thumbnail.url})` }}></div>
                <div className="box_wrap">
                    <MetaCategory {...props} />
                    <div className="gvnews_postblock_content">
                        {post.title && <PostTitle post={post} />}
                        {post.excerpt && <PostExcerpt post={post} attr={attr} />}
                        {attr.option && <MetaModule3 {...props} />}
                    </div>
                    <div className="gvnews_readmore_arrow">
                        <a>
                            <i className="fa fa-long-arrow-right"></i>
                        </a>
                    </div>
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
            <div className="gvnews_posts_wrap">
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

export default Block38Columns;
