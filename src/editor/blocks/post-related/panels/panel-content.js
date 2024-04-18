import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';
import { RangeControl, SelectControl, TextControl, CheckboxControl, ImageRadioControl } from 'gutenverse-core/controls';
import { addQueryArgs } from '@wordpress/url';

export const contentPanel = props => {
    const {
        pagination,
        metaDateFormat,
    } = props;

    const {
        imgDir
    } = window['GVNewsConfig'];

    return [
        {
            id: 'match',
            label: __('Related Post Filter', 'gutenverse-news'),
            description: __('Select how related post will filter article.', 'gutenverse-news'),
            component: SelectControl,
            options: [
                {
                    label: __('Category', 'gutenverse-news'),
                    value: 'category'
                },
                {
                    label: __('Tag', 'gutenverse-news'),
                    value: 'tag'
                },
            ],
        },
        {
            id: 'pagination',
            label: __('Related Pagination Style', 'gutenverse-news'),
            description: __('Adjust how related post will shown.', 'gutenverse-news'),
            component: SelectControl,
            options: [
                {
                    label: __('No Pagination', 'gutenverse-news'),
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
                    label: __('Auto Load on Scroll', 'gutenverse-news'),
                    value: 'scrollload'
                },
            ],
        },
        {
            id: 'numberPost',
            label: __('Number of Post', 'gutenverse-news'),
            description: __('Set the number of post each related post load.', 'gutenverse-news'),
            component: RangeControl,
            min: 2,
            max: 10,
            step: 1,
        },
        {
            id: 'pagination',
            label: __('Include into Unique Content Group', 'gutenverse-news'),
            description: __('Choose unique content option, and this module will be included into unique content group. It won\'t duplicate content across the group. Ajax loaded content won\'t affect this unique content feature.', 'gutenverse-news'),
            component: SelectControl,
            options: [
                {
                    label: __('Disable', 'gutenverse-news'),
                    value: 'disable'
                },
                {
                    label: __('Unique Content - Group 1', 'gutenverse-news'),
                    value: 'unique1'
                },
                {
                    label: __('Unique Content - Group 2', 'gutenverse-news'),
                    value: 'unique2'
                },
                {
                    label: __('Unique Content - Group 3', 'gutenverse-news'),
                    value: 'unique3'
                },
                {
                    label: __('Unique Content - Group 4', 'gutenverse-news'),
                    value: 'unique4'
                },
                {
                    label: __('Unique Content - Group 5', 'gutenverse-news'),
                    value: 'unique5'
                },
            ],
        },
        {
            show: pagination === 'nextprev' || pagination === 'loadmore' || pagination === 'scrollload',
            id: 'autoLoad',
            label: __('Auto Load Limit', 'gutenverse-news'),
            description: __('Limit of auto load when scrolling, set to zero to always load until end of content.', 'gutenverse-news'),
            component: RangeControl,
            min: 0,
            max: 500,
            step: 1,
        },
        {
            id: 'templateType',
            label: __('Related PostTemplate', 'gutenverse-news'),
            description: __('Choose your related post template.', 'gutenverse-news'),
            component: ImageRadioControl,
            options: [
                {
                    image: <img src={`${imgDir}/content-1.png`}/>,
                    value: 'template_1'
                },
                {
                    image: <img src={`${imgDir}/content-2.png`}/>,
                    value: 'template_2'
                },
                {
                    image: <img src={`${imgDir}/content-3.png`}/>,
                    value: 'template_3'
                },
                {
                    image: <img src={`${imgDir}/content-4.png`}/>,
                    value: 'template_4'
                },
                {
                    image: <img src={`${imgDir}/content-5.png`}/>,
                    value: 'template_5'
                },
                {
                    image: <img src={`${imgDir}/content-6.png`}/>,
                    value: 'template_6'
                },
                {
                    image: <img src={`${imgDir}/content-7.png`}/>,
                    value: 'template_7'
                },
                {
                    image: <img src={`${imgDir}/content-8.png`}/>,
                    value: 'template_8'
                },
                {
                    image: <img src={`${imgDir}/content-9.png`}/>,
                    value: 'template_9'
                },
                {
                    image: <img src={`${imgDir}/content-10.png`}/>,
                    value: 'template_10'
                },
                {
                    image: <img src={`${imgDir}/content-11.png`}/>,
                    value: 'template_11'
                },
                {
                    image: <img src={`${imgDir}/content-12.png`}/>,
                    value: 'template_12'
                },
                {
                    image: <img src={`${imgDir}/content-13.png`}/>,
                    value: 'template_13'
                },
                {
                    image: <img src={`${imgDir}/content-14.png`}/>,
                    value: 'template_14'
                },
                {
                    image: <img src={`${imgDir}/content-15.png`}/>,
                    value: 'template_15'
                },
                {
                    image: <img src={`${imgDir}/content-16.png`}/>,
                    value: 'template_16'
                },
                {
                    image: <img src={`${imgDir}/content-17.png`}/>,
                    value: 'template_17'
                },
                {
                    image: <img src={`${imgDir}/content-18.png`}/>,
                    value: 'template_18'
                },
                {
                    image: <img src={`${imgDir}/content-19.png`}/>,
                    value: 'template_19'
                },
                {
                    image: <img src={`${imgDir}/content-20.png`}/>,
                    value: 'template_20'
                },
                {
                    image: <img src={`${imgDir}/content-21.png`}/>,
                    value: 'template_21'
                },
                {
                    image: <img src={`${imgDir}/content-22.png`}/>,
                    value: 'template_22'
                },
                {
                    image: <img src={`${imgDir}/content-23.png`}/>,
                    value: 'template_23'
                },
                {
                    image: <img src={`${imgDir}/content-24.png`}/>,
                    value: 'template_24'
                },
                {
                    image: <img src={`${imgDir}/content-25.png`}/>,
                    value: 'template_25'
                },
                {
                    image: <img src={`${imgDir}/content-26.png`}/>,
                    value: 'template_26'
                },
                {
                    image: <img src={`${imgDir}/content-27.png`}/>,
                    value: 'template_27'
                },
            ],
        },
        {
            id: 'excerptLength',
            label: __('Excerpt Length', 'gutenverse-news'),
            description: __('Set word length of excerpt on related post.', 'gutenverse-news'),
            component: RangeControl,
            min: 0,
            max: 200,
            step: 1,
        },
        {
            id: 'metaDateFormat',
            label: __('Related Pagination Style', 'gutenverse-news'),
            description: __('Choose which date format you want to use for archive content.', 'gutenverse-news'),
            component: SelectControl,
            options: [
                {
                    label: __('Relative Date/Time Format (ago)', 'gutenverse-news'),
                    value: 'ago'
                },
                {
                    label: __('WordPress Default Format', 'gutenverse-news'),
                    value: 'default'
                },
                {
                    label: __('Custom Format', 'gutenverse-news'),
                    value: 'custom'
                },
            ],
        },
        {
            show: metaDateFormat === 'custom',
            id: 'metaDateFormatCustom',
            label: __('Custom Date Format for Related Post', 'gutenverse-news'),
            description: __('Please write custom date format for your module.', 'gutenverse-news'),
            component: TextControl,
        },
    ];
};