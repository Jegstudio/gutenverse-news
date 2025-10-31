import { __ } from '@wordpress/i18n';
import { CheckboxControl } from 'gutenverse-core/controls';
import { applyFilters } from '@wordpress/hooks';

export const metaPanel = (props, settings = []) => {

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
            show: props.showMeta,
            component: CheckboxControl
        },
    );
    settings.includes('date') && panelList.push(
        {
            id: 'showMetaDate',
            label: __('Show Meta Date', 'gutenverse-news'),
            description: __('Enable this option to show meta date on this block.', 'gutenverse-news'),
            show: props.showMeta,
            component: CheckboxControl
        },
    );
    settings.includes('comment') && panelList.push(
        {
            id: 'showMetaComment',
            label: __('Show Meta Comment', 'gutenverse-news'),
            description: __('Enable this option to show meta comment on this block.', 'gutenverse-news'),
            show: props.showMeta,
            component: CheckboxControl
        },
    );
    return applyFilters('gutenverse.news.unique-content-group', panelList, props);
};