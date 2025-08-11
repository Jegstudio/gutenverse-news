import { __ } from '@wordpress/i18n';
import { RangeControl, SelectControl, TextControl, ImageRadioControl } from 'gutenverse-core/controls';
import { gutenverseProActive } from '../../../utils/helper';

export const contentPanel = props => {
    const {
        pagination,
        metaDateFormat,
    } = props;

    const {
        imgDir
    } = window['GVNewsConfig'];

    return [
        // {
        //     id: 'pagination',
        //     label: __('Related Pagination Style', 'gutenverse-news'),
        //     description: __('Adjust how related post will shown.', 'gutenverse-news'),
        //     component: SelectControl,
        //     options: [
        //         {
        //             label: __('No Pagination', 'gutenverse-news'),
        //             value: 'disable'
        //         },
        //         {
        //             label: __('Next Prev', 'gutenverse-news'),
        //             value: 'nextprev'
        //         },
        //         {
        //             label: __('Load More', 'gutenverse-news'),
        //             value: 'loadmore'
        //         },
        //         {
        //             label: __('Auto Load on Scroll', 'gutenverse-news'),
        //             value: 'scrollload'
        //         },
        //     ],
        // },
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
                    image: <img src={`${imgDir}/content-1.png`} />,
                    value: 'template_1'
                },
                {
                    image: <img src={`${imgDir}/content-2.png`} />,
                    value: 'template_2'
                },
                {
                    image: <img src={`${imgDir}/content-3.png`} />,
                    value: 'template_3'
                },
                {
                    image: <img src={`${imgDir}/content-4.png`} />,
                    value: 'template_4'
                },
                {
                    image: <img src={`${imgDir}/content-5.png`} />,
                    value: 'template_5'
                },
                {
                    image: <img src={`${imgDir}/content-6.png`} />,
                    value: 'template_6'
                },
                {
                    image: <img src={`${imgDir}/content-7.png`} />,
                    value: 'template_7'
                },
                {
                    image: <img src={`${imgDir}/content-8.png`} />,
                    value: 'template_8'
                },
                {
                    image: <img src={`${imgDir}/content-9.png`} />,
                    value: 'template_9'
                },
                {
                    image: <img src={`${imgDir}/content-10.png`} />,
                    value: 'template_10',
                    deprecated: !gutenverseProActive,
                    pro: gutenverseProActive
                },
                {
                    image: <img src={`${imgDir}/content-11.png`} />,
                    value: 'template_11',
                    deprecated: !gutenverseProActive,
                    pro: gutenverseProActive
                },
                {
                    image: <img src={`${imgDir}/content-12.png`} />,
                    value: 'template_12',
                    deprecated: !gutenverseProActive,
                    pro: gutenverseProActive
                },
                {
                    image: <img src={`${imgDir}/content-13.png`} />,
                    value: 'template_13',
                    deprecated: !gutenverseProActive,
                    pro: gutenverseProActive
                },
                {
                    image: <img src={`${imgDir}/content-14.png`} />,
                    value: 'template_14',
                    deprecated: !gutenverseProActive,
                    pro: gutenverseProActive
                },
                {
                    image: <img src={`${imgDir}/content-15.png`} />,
                    value: 'template_15',
                    deprecated: !gutenverseProActive,
                    pro: gutenverseProActive
                },
                {
                    image: <img src={`${imgDir}/content-16.png`} />,
                    value: 'template_16',
                    deprecated: !gutenverseProActive,
                    pro: gutenverseProActive
                },
                {
                    image: <img src={`${imgDir}/content-17.png`} />,
                    value: 'template_17',
                    deprecated: !gutenverseProActive,
                    pro: gutenverseProActive
                },
                {
                    image: <img src={`${imgDir}/content-18.png`} />,
                    value: 'template_18',
                    deprecated: !gutenverseProActive,
                    pro: gutenverseProActive
                },
                {
                    image: <img src={`${imgDir}/content-19.png`} />,
                    value: 'template_19',
                    deprecated: !gutenverseProActive,
                    pro: gutenverseProActive
                },
                {
                    image: <img src={`${imgDir}/content-20.png`} />,
                    value: 'template_20',
                    deprecated: !gutenverseProActive,
                    pro: gutenverseProActive
                },
                {
                    image: <img src={`${imgDir}/content-21.png`} />,
                    value: 'template_21',
                    deprecated: !gutenverseProActive,
                    pro: gutenverseProActive
                },
                {
                    image: <img src={`${imgDir}/content-22.png`} />,
                    value: 'template_22',
                    deprecated: !gutenverseProActive,
                    pro: gutenverseProActive
                },
                {
                    image: <img src={`${imgDir}/content-23.png`} />,
                    value: 'template_23',
                    deprecated: !gutenverseProActive,
                    pro: gutenverseProActive
                },
                {
                    image: <img src={`${imgDir}/content-24.png`} />,
                    value: 'template_24',
                    deprecated: !gutenverseProActive,
                    pro: gutenverseProActive
                },
                {
                    image: <img src={`${imgDir}/content-25.png`} />,
                    value: 'template_25',
                    deprecated: !gutenverseProActive,
                    pro: gutenverseProActive
                },
                {
                    image: <img src={`${imgDir}/content-26.png`} />,
                    value: 'template_26',
                    deprecated: !gutenverseProActive,
                    pro: gutenverseProActive
                },
                {
                    image: <img src={`${imgDir}/content-27.png`} />,
                    value: 'template_27',
                    deprecated: !gutenverseProActive,
                    pro: gutenverseProActive
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