import { __ } from '@wordpress/i18n';
import { SelectControl, TextControl, RangeControl, CheckboxControl, ImageRadioControl } from 'gutenverse-core/controls';

export const settingHero = (props) => {
    const {
        elementId,
        metaDateFormat,
    } = props;

    const {
        imgDir
    } = window['GVNewsConfig'];

    return [
        {
            id: 'heroMargin',
            label: __('Hero Margin', 'gutenverse-news'),
            description: __('Margin of each hero element.', 'gutenverse-news'),
            component: RangeControl,
            min: 0,
            max: 30,
            step: 1,
            style: [
                {
                    selector: `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_heroblock_wrapper`,
                    render: value => `margin: 0 0 -${value}px -${value}px;`
                },
                {
                    selector: `.gvnews-block.gvnews-block-wrapper.${elementId} article.gvnews_post`,
                    render: value => `padding: 0 0 ${value}px ${value}px;`
                }
            ]
        },
        {
            id: 'heroStyle',
            label: __('Hero Style', 'gutenverse-news'),
            description: __('Choose which hero style that fit your content design.', 'gutenverse-news'),
            component: ImageRadioControl,
            options: [
                {
                    image: <img src={`${imgDir}/hero-1.png`}/>,
                    value: '1'
                },
                {
                    image: <img src={`${imgDir}/hero-2.png`}/>,
                    value: '2'
                },
                {
                    image: <img src={`${imgDir}/hero-3.png`}/>,
                    value: '3'
                },
                {
                    image: <img src={`${imgDir}/hero-4.png`}/>,
                    value: '4'
                },
                {
                    image: <img src={`${imgDir}/hero-5.png`}/>,
                    value: '5'
                },
                {
                    image: <img src={`${imgDir}/hero-6.png`}/>,
                    value: '6'
                },
                {
                    image: <img src={`${imgDir}/hero-7.png`}/>,
                    value: '7'
                },
            ],
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
            id: 'normalImage',
            label: __('Use Normal Image Load', 'gutenverse-news'),
            description: __('Force it to use normal load image and optimize Largest Contentful Paint (LCP) when using this element at the top of your site.', 'gutenverse-news'),
            component: CheckboxControl
        },
    ];
};