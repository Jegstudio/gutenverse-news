import React from 'react';
import { __ } from '@wordpress/i18n';
import ThumbModule from '../../part/thumbnail';
import { ContentModule } from '../../part/post';
import { ModuleSkeleton, ModuleOverlay } from '../../part/placeholder';
import { PostTitle, PostExcerpt } from '../../part/post';
import { MetaModule1, MetaModule2, MetaModule3, MetaCategory } from '../../part/meta';

const Block28Columns = (props) => {
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
        showDate,
        showDateFormat,
        showDateFormatCustom,
    } = props;

    const RenderBlock1 = (props) => {
        return (
            <article className={'gvnews_post gvnews_pl_xs_4'}>
                <div className="gvnews_postblock_content">
                    <i className='fas fa-caret-right'></i>
                    <PostTitle {...props} />
                    {showDate ? <MetaModule2 {...props} /> : ''}
                </div>
            </article>
        );
    };

    const BuildColumn1 = () => {
        const attr = {
            option: {
                ...moduleOption,
                option: {
                    ...moduleOption.option,
                    date_format: 'default' === showDateFormat ? showDateFormatCustom : moduleOption.option.date_format,
                    meta_date: showDate,
                    meta_comment: false,
                    meta_author: false,
                },
            },
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
            <div className="gvnews_posts">
                <div className="gvnews_postsmall gvnews_load_more_flag">{rows}</div>
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

export default Block28Columns;
