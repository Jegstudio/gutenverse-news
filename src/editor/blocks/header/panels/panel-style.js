import { isNotEmpty } from 'gutenverse-core/helper';
import { __ } from '@wordpress/i18n';
import { ColorControl, TypographyControl, RangeControl, ImageRadioControl } from 'gutenverse-core/controls';
import { handleColor } from 'gutenverse-core/styling';

export const stylePanel = (props) => {
    const {
        elementId,
        headerType,
        second_title,
    } = props;

    const withSecondText = ['heading_5', 'heading_6', 'heading_7', 'heading_8'].includes(headerType) && isNotEmpty(second_title);


    const {
        imgDir
    } = window['GVNewsConfig'];

    return [
        {
            id: 'headerType',
            label: __('Header Type', 'gutenverse'),
            description: __('Choose which header type fit with your content design.', 'gutenverse-news'),
            component: ImageRadioControl,
            options: [
                {
                    image: <img src={`${imgDir}/heading-1.png`} />,
                    value: 'heading_1'
                },
                {
                    image: <img src={`${imgDir}/heading-2.png`} />,
                    value: 'heading_2'
                },
                {
                    image: <img src={`${imgDir}/heading-3.png`} />,
                    value: 'heading_3'
                },
                {
                    image: <img src={`${imgDir}/heading-4.png`} />,
                    value: 'heading_4'
                },
                {
                    image: <img src={`${imgDir}/heading-5.png`} />,
                    value: 'heading_5'
                },
                {
                    image: <img src={`${imgDir}/heading-6.png`} />,
                    value: 'heading_6'
                },
                {
                    image: <img src={`${imgDir}/heading-7.png`} />,
                    value: 'heading_7'
                },
                {
                    image: <img src={`${imgDir}/heading-8.png`} />,
                    value: 'heading_8'
                },
                {
                    image: <img src={`${imgDir}/heading-9.png`} />,
                    value: 'heading_9'
                },
            ],
        },
        {
            id: 'headerTextTypography',
            label: __('Header Title Typography', 'gutenverse-news'),
            description: __('This option will change your header title text typography.', 'gutenverse-news'),
            component: TypographyControl,
        },

        {
            id: 'headerSecondTextTypography',
            label: __('Header Second Title Typography', 'gutenverse-news'),
            description: __('This option will change your header title text typography.', 'gutenverse-news'),
            component: TypographyControl,
            show: withSecondText,
        },
        {
            id: 'headerBackgroundColor',
            show: headerType === 'heading_1' || headerType === 'heading_2' || headerType === 'heading_4' || headerType === 'heading_5',
            label: __('Header Background Color', 'gutenverse-news'),
            description: __('Change color of your header background.', 'gutenverse-news'),
            component: ColorControl,
            style: [
                {
                    selector: `.editor-styles-wrapper .wp-block .${elementId} .gvnews_block_heading_1 .gvnews_block_title span`,
                    render: value => handleColor(value, 'background')
                },
                {
                    selector: `.editor-styles-wrapper .wp-block .${elementId} .gvnews_block_heading_2 .gvnews_block_title span`,
                    render: value => handleColor(value, 'background')
                },
                {
                    selector: `.editor-styles-wrapper .wp-block .${elementId} .gvnews_block_heading_4 .gvnews_block_title span`,
                    render: value => handleColor(value, 'background')
                },
                {
                    selector: `.editor-styles-wrapper .wp-block .${elementId} .gvnews_block_heading_5 .gvnews_block_title span`,
                    render: value => handleColor(value, 'background')
                }
            ],
        },
        {
            id: 'headerBackgroundColor2',
            show: headerType === 'heading_3',
            label: __('Header Background Color', 'gutenverse-news'),
            description: __('Change color of your header background.', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'headerTextColor',
            label: __('Header Text Color', 'gutenverse-news'),
            description: __('Change color of your header text.', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'headerSecondTextColor',
            label: __('Second Title Color', 'gutenverse-news'),
            description: __('Change color of your header text.', 'gutenverse-news'),
            show: withSecondText,
            component: ColorControl,
        },
        {
            id: 'headerSecondColor',
            show: headerType === 'heading_2',
            label: __('Header Secondary Color', 'gutenverse-news'),
            description: __('Change color of your secondary header color.', 'gutenverse-news'),
            component: ColorControl,
            style: [
                {
                    selector: `.editor-styles-wrapper .wp-block .${elementId} .gvnews_block_heading_2`,
                    render: value => handleColor(value, 'background')
                }
            ],
        },
        {
            id: 'headerLineColor',
            show: headerType === 'heading_1' || headerType === 'heading_6' || headerType === 'heading_9',
            label: __('Header Line Color', 'gutenverse-news'),
            description: __('Change line color of your header.', 'gutenverse-news'),
            component: ColorControl,
            style: [
                {
                    selector: `.editor-styles-wrapper .wp-block .${elementId} .gvnews_block_heading_1`,
                    render: value => handleColor(value, 'border-color')
                },
                {
                    selector: `.editor-styles-wrapper .wp-block .${elementId} .gvnews_block_heading_6`,
                    render: value => handleColor(value, 'border-color')
                },
                {
                    selector: `.editor-styles-wrapper .wp-block .${elementId} .gvnews_block_heading_9`,
                    render: value => handleColor(value, 'border-color')
                }
            ],
        },
        {
            id: 'headerLineThick',
            label: headerType === 'heading_9' ? __('Header Line Bottom Thick', 'gutenverse-news') : __('Header Line Thick', 'gutenverse-news'),
            component: RangeControl,
            allowDeviceControl: true,
            show: headerType === 'heading_1' || headerType === 'heading_5' || headerType === 'heading_6' || headerType === 'heading_7' || headerType === 'heading_9',
            unit: 'px',
            min: 1,
            max: 10,
            step: 1,
        },
        {
            id: 'headerLineColor2',
            show: headerType === 'heading_5',
            label: __('Header Line Color', 'gutenverse-news'),
            description: __('Change line color of your header.', 'gutenverse-news'),
            component: ColorControl,
            style: [
                {
                    selector: `.editor-styles-wrapper .wp-block .${elementId} .gvnews_block_heading_5:before`,
                    render: value => handleColor(value, 'border-color')
                }
            ],
        },
        {
            id: 'headerLineThick2',
            label: headerType === 'heading_9' ? __('Header Line Top Thick', 'gutenverse-news') : __('Header Line Thick', 'gutenverse-news'),
            show: headerType === 'heading_9',
            component: RangeControl,
            allowDeviceControl: true,
            unit: 'px',
            min: 1,
            max: 10,
            step: 1,
        },
        {
            id: 'headerAccentColor',
            show: headerType === 'heading_6',
            label: __('Header Accent Color', 'gutenverse-news'),
            description: __('Change accent color of your header.', 'gutenverse-news'),
            component: ColorControl,
            style: [
                {
                    selector: `.editor-styles-wrapper .wp-block .${elementId} .gvnews_block_heading_6:after`,
                    render: value => handleColor(value, 'background-color')
                }
            ],
        },
        {
            id: 'headerAccentColor2',
            show: headerType === 'heading_7',
            label: __('Header Accent Color', 'gutenverse-news'),
            description: __('Change accent color of your header.', 'gutenverse-news'),
            component: ColorControl,
            style: [
                {
                    selector: `.editor-styles-wrapper .wp-block .${elementId} .gvnews_block_heading_7 .gvnews_block_title span`,
                    render: value => handleColor(value, 'border-color')
                }
            ],
        },
    ];
};
