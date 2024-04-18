import React from 'react';
import { __ } from '@wordpress/i18n';
import ThumbModule from '../../part/thumbnail';
import { ContentModule } from '../../part/post';
import { ModuleSkeleton, ModuleOverlay } from '../../part/placeholder';

const Block29Columns = (props) => {
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
        showBorder,
        showDate,
        showDateFormat,
        showDateFormatCustom,
    } = props;

    const RenderBlock1 = (props) => {
        const { post, attr } = props;
        return (
            <article className={'gvnews_post gvnews_pl_xs'}>
                <ContentModule meta={showDate ? 2 : false} title={true} post={post} attr={attr} />
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
        const border = showBorder ? 'show_border' : '';
        return (
            <div className={'gvnews_posts ' + border}>
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

export default Block29Columns;
