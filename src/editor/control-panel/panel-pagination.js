import { __ } from '@wordpress/i18n';
import { SelectControl, CheckboxControl, RangeControl, NumberControl } from 'gutenverse-core/controls';

export const paginationPanel = (props) => {
    const {
        paginationMode,
    } = props;

    return [
        {
            id: 'paginationMode',
            label: __('Choose Pagination Mode', 'gutenverse-news'),
            description: __('Choose which pagination mode that fit with your block.', 'gutenverse-news'),
            component: SelectControl,
            options: [
                {
                    label: __('Disable', 'gutenverse-news'),
                    value: 'disable'
                },
                {
                    label: __('Next Prev', 'gutenverse-news'),
                    value: 'nextprev'
                },
                {
                    label: __('Load More', 'gutenverse-news'),
                    value: 'loadmore'
                },
                {
                    label: __('Autoload on Scroll', 'gutenverse-news'),
                    value: 'scrollload'
                },
            ],
        },
        {
            id: 'showNavText',
            show: paginationMode === 'nextprev',
            label: __('Show Navigation Text', 'gutenverse-news'),
            description: __('Show previous and next text.', 'gutenverse-news'),
            component: CheckboxControl
        },
        {
            id: 'paginationPost',
            label: __('Pagination Post', 'gutenverse-news'),
            description: __('Number of Post loaded during pagination request.', 'gutenverse-news'),
            show: paginationMode != 'disable',
            component: RangeControl,
            min: 1,
            max: 200,
            step: 1
        },
        {
            id: 'loadLimit',
            label: __('Auto Load Limit', 'gutenverse-news'),
            description: __('Limit of auto load when scrolling, set to zero to always load until end of content.', 'gutenverse-news'),
            show: paginationMode === 'scrollload',
            component: NumberControl,
            min: 1,
            max: 999,
            step: 1
        },
    ];
};