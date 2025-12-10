import { __ } from '@wordpress/i18n';
import { CheckboxControl, SelectControl, TextControl, IconSVGControl } from 'gutenverse-core/controls';
import { applyFilters } from '@wordpress/hooks';

export const metaPanel = (props, settings = []) => {
    const {
        metaDateFormat = 'default',
        showMetaDate = true,
        showMetaComment = true,
        showMeta = true
    } = props;

    let panelList = [
        {
            id: 'showMeta',
            label: __('Show Meta', 'gutenverse-news'),
            description: __('Enable this option to meta on this block.', 'gutenverse-news'),
            component: CheckboxControl
        }
    ];

    settings.includes('author') && panelList.push(
        {
            id: 'showMetaAuthor',
            label: __('Show Meta Author', 'gutenverse-news'),
            description: __('Enable this option to show meta author on this block.', 'gutenverse-news'),
            show: showMeta,
            component: CheckboxControl
        },
    );
    settings.includes('date') && panelList.push(
        {
            id: 'showMetaDate',
            label: __('Show Meta Date', 'gutenverse-news'),
            description: __('Enable this option to show meta date on this block.', 'gutenverse-news'),
            show: showMeta,
            component: CheckboxControl
        },
        {
            id: 'metaDateFormat',
            show: showMeta && showMetaDate === true,
            label: __('Date Format', 'gutenverse-news'),
            description: __('Choose which date format you want to use.', 'gutenverse-news'),
            component: SelectControl,
            options: [
                {
                    label: __('Relative Date/Time Format (ago)', 'gutenverse-news'),
                    value: 'ago'
                },
                {
                    label: __('Wordpress Default Format', 'gutenverse-news'),
                    value: 'default'
                },
                {
                    label: __('Custom Format', 'gutenverse-news'),
                    value: 'custom'
                },
            ],
        },
        {
            id: 'metaDateFormatCustom',
            show: showMeta && metaDateFormat === 'custom',
            label: __('Custom Format', 'gutenverse-news'),
            description: __('Please write custom date format for your module, for more detail about how to write date format.', 'gutenverse-news'),
            component: TextControl,
        },
        {
            id: 'metaDateIcon',
            show: showMeta && showMetaDate === true,
            label: __('Date Icon', 'gutenverse-news'),
            description: __('Choose icon for meta date.', 'gutenverse-news'),
            component: IconSVGControl
        },
    );
    settings.includes('comment') && panelList.push(
        {
            id: 'showMetaComment',
            label: __('Show Meta Comment', 'gutenverse-news'),
            description: __('Enable this option to show meta comment on this block.', 'gutenverse-news'),
            show: showMeta,
            component: CheckboxControl
        },
        {
            id: 'metaCommentIcon',
            show: showMeta && showMetaComment === true,
            label: __('Comment Icon', 'gutenverse-news'),
            description: __('Choose icon for meta comment.', 'gutenverse-news'),
            component: IconSVGControl
        },
    );
    return applyFilters('gutenverse.news.penels.meta.setting', panelList, props);
};
