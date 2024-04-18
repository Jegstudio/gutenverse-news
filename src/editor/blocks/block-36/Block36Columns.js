import React from 'react';
import { __ } from '@wordpress/i18n';
import ThumbModule from '../../part/thumbnail';
import { ContentModule } from '../../part/post';
import { ModuleSkeleton, ModuleOverlay } from '../../part/placeholder';

const Block36Columns = (props) => {
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
            <article className={'gvnews_post gvnews_pl_md_5'}>
                <div className="box_wrap">
                    <ThumbModule size={715} cat={true} post={post} />
                    <ContentModule cat={false} title={true} meta={3} read={false} excerpt={true} post={post} attr={attr} />
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

export default Block36Columns;
