import { __ } from '@wordpress/i18n';
import { CheckboxControl, TextControl, ImageControl, RangeControl, SelectControl, ImageRadioControl } from 'gutenverse-core/controls';

export const generalPanel = (props) => {
    const {
        fallback,
        metaDateFormat,
        enableBoxed,
        thumb
    } = props;

    const {
        imgDir
    } = window['GVNewsConfig'];

    return [
        {
            id: 'feedurl',
            label: __('Feed URL', 'gutenverse-news'),
            description: __('Insert Feed URL to be rendered.', 'gutenverse-news'),
            component: TextControl,
        },
        {
            id: 'blockType',
            label: __('Block Type', 'gutenverse-news'),
            description: __('Choose which header type fit with your content design.', 'gutenverse-news'),
            component: ImageRadioControl,
            options: [
                {
                    image: <img src={`${imgDir}/content-3.png`}/>,
                    value: '3'
                },
                {
                    image: <img src={`${imgDir}/content-video-1.png`}/>,
                    value: 'video_1'
                },
                {
                    image: <img src={`${imgDir}/content-video-2.png`}/>,
                    value: 'video_2'
                },
                {
                    image: <img src={`${imgDir}/content-video-3.png`}/>,
                    value: 'video_3'
                },
                {
                    image: <img src={`${imgDir}/content-video-4.png`}/>,
                    value: 'video_4'
                },
            ],
        },
        {
            id: 'thumb',
            label: __('Enable Thumbnail', 'gutenverse-news'),
            description: __('Thumbnail would increase loading time. Please use this setting with precaution.', 'gutenverse-news'),
            component: CheckboxControl,
        },
        {
            id: 'fallback',
            show: thumb,
            label: __('Enable Image Fallback', 'gutenverse-news'),
            description: __('Use fallback image incase there is no thumbnail information.', 'gutenverse-news'),
            component: CheckboxControl,
        },
        {
            id: 'fallbackimg',
            show: thumb && fallback,
            label: __('Image', 'gutenverse-news'),
            description: __('Use fallback image incase there is no thumbnail information.', 'gutenverse-news'),
            component: ImageControl,
        },
        {
            id: 'numberPost',
            label: __('Number of Post showed', 'gutenverse-news'),
            description: __('Set number of post for this block.', 'gutenverse-news'),
            component: RangeControl,
            min: 1,
            max: 100,
            step: 1
        },
        {
            id: 'enableBoxed',
            label: __('Enable Boxed', 'gutenverse-news'),
            description: __('Enable boxed module style.', 'gutenverse-news'),
            component: CheckboxControl
        },
        {
            id: 'enableBoxShadow',
            show: enableBoxed === true,
            label: __('Enable Box Shadow', 'gutenverse-news'),
            description: __('Enable boxed module shadow.', 'gutenverse-news'),
            component: CheckboxControl
        },
        {
            id: 'columnWidth',
            label: __('Block Column Width', 'gutenverse-news'),
            description: __('Please choose width of column you want to use on this block. 1 Block represents 4 columns.', 'gutenverse-news'),
            component: SelectControl,
            options: [
                {
                    value: 'auto',
                    label: __('Auto', 'gutenverse-news')
                },
                {
                    value: '4',
                    label: __('4 Column Design ( 1 Block )', 'gutenverse-news')
                },
                {
                    value: '8',
                    label: __('8 Column Design ( 2 Block )', 'gutenverse-news')
                },
                {
                    value: '12',
                    label: __('12  Column Design ( 3 Block )', 'gutenverse-news')
                },
            ]
        },
        {
            id: 'metaDateFormat',
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
            show: metaDateFormat === 'custom',
            label: __('Custom Format', 'gutenverse-news'),
            description: __('Please write custom date format for your module, for more detail about how to write date format.', 'gutenverse-news'),
            component: TextControl,
        },
        {
            id: 'excerptLength',
            label: __('Excerpt Length', 'gutenverse-news'),
            description: __('Set word length of excerpt on post block.', 'gutenverse-news'),
            component: RangeControl,
            min: 1,
            max: 200,
            step: 1
        },
        {
            id: 'excerptEllipsis',
            label: __('Excerpt Ellipsis', 'gutenverse-news'),
            description: __('Define excerpt ellipsis', 'gutenverse-news'),
            component: TextControl,
        },
    ];
};