import { __ } from '@wordpress/i18n';
import { SelectControl, CheckboxControl, RangeControl, NumberControl, HeadingControl, IconRadioControl, TextControl, IconSVGControl } from 'gutenverse-core/controls';

export const paginationPanel = (props) => {
    const {
        paginationMode,
        showNavText
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
        {
            id: '__paginationIconLoadMore',
            component: HeadingControl,
            label: __('Load More Icon', 'gutenverse-news'),
            show: paginationMode === 'loadmore' || paginationMode === 'scrollload',
        },
        {
            id: 'paginationIcon',
            label: __('Icon', 'gutenverse-news'),
            component: IconSVGControl,
            show: paginationMode === 'loadmore' || paginationMode === 'scrollload',
        },
        {
            id: 'paginationIconPosition',
            label: __('Icon Position', 'gutenverse-news'),
            component: SelectControl,
            show: paginationMode === 'loadmore' || paginationMode === 'scrollload',
            options: [
                {
                    label: __('Before Text', 'gutenverse-news'),
                    value: 'before'
                },
                {
                    label: __('After Text', 'gutenverse-news'),
                    value: 'after'
                },
            ],
        },
        {
            id: 'paginationLoadmoreText',
            label: __('Load More Text', 'gutenverse-news'),
            component: TextControl,
            show: paginationMode === 'loadmore' || paginationMode === 'scrollload',
        },
        {
            id: 'paginationLoadingText',
            label: __('Loading Text', 'gutenverse-news'),
            component: TextControl,
            show: paginationMode === 'loadmore' || paginationMode === 'scrollload',
        },
        {
            id: '__paginationIconPrevNext',
            component: HeadingControl,
            label: __('Prev/Next Icon', 'gutenverse-news'),
            show: paginationMode === 'nextprev',
        },
        {
            id: 'paginationPrevIcon',
            label: __('Prev Icon', 'gutenverse-news'),
            component: IconSVGControl,
            show: paginationMode === 'nextprev',
        },
        {
            id: 'paginationNextIcon',
            label: __('Next Icon', 'gutenverse-news'),
            component: IconSVGControl,
            show: paginationMode === 'nextprev',
        },
        {
            id: 'showNavText',
            show: paginationMode === 'nextprev',
            label: __('Show Navigation Text', 'gutenverse-news'),
            description: __('Show previous and next text.', 'gutenverse-news'),
            component: CheckboxControl
        },
        {
            id: 'paginationPrevText',
            label: __('Prev Text', 'gutenverse-news'),
            component: TextControl,
            show: paginationMode === 'nextprev' && showNavText,
        },
        {
            id: 'paginationNextText',
            label: __('Next Text', 'gutenverse-news'),
            component: TextControl,
            show: paginationMode === 'nextprev' && showNavText,
        },
    ];
};
