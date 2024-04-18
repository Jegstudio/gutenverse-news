import { __ } from '@wordpress/i18n';
import { IconControl, TextControl, ColorControl, ImageRadioControl } from 'gutenverse-core/controls';
import { handleColor } from 'gutenverse-core/styling';

export const headerPanel = (props) => {
    const {
        elementId,
        headerType,
        title,
        second_title
    } = props;

    const {
        imgDir
    } = window['GVNewsConfig'];

    return [
        {
            id: 'icon',
            show: title !== '' || second_title !== '',
            label: __('Icon', 'gutenverse-news'),
            description: __('Choose icon for this block icon.', 'gutenverse-news'),
            component: IconControl
        },
        {
            id: 'title',
            label: __('Title', 'gutenverse-news'),
            description: __('Main title of Module Block.', 'gutenverse-news'),
            component: TextControl,
        },
        {
            id: 'second_title',
            label: __('Second Title', 'gutenverse-news'),
            description: __('Secondary title of Module Block.', 'gutenverse-news'),
            component: TextControl,
        },
        {
            id: 'url_title',
            label: __('URL Title', 'gutenverse-news'),
            description: __('Insert URL of heading title.', 'gutenverse-news'),
            component: TextControl,
        },
        {
            id: 'headerType',
            label: __('Header Type', 'gutenverse-news'),
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
            id: 'headerBackgroundColor',
            show: headerType === 'heading_1' || headerType === 'heading_2' || headerType === 'heading_4' || headerType === 'heading_5',
            label: __('Header Background Color', 'gutenverse-news'),
            description: __('Change color of your header background.', 'gutenverse-news'),
            component: ColorControl,
            style: [
                {
                    selector: `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_heading_1 .gvnews_block_title span`,
                    render: value => handleColor(value, 'background')
                },
                {
                    selector: `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_heading_2 .gvnews_block_title span`,
                    render: value => handleColor(value, 'background')
                },
                {
                    selector: `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_heading_4 .gvnews_block_title span`,
                    render: value => handleColor(value, 'background')
                },
                {
                    selector: `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_heading_5 .gvnews_block_title span`,
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
            style: [
                {
                    selector: `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_heading_3`,
                    render: value => handleColor(value, 'background')
                }
            ],
        },
        {
            id: 'headerTextColor',
            label: __('Header Text Color', 'gutenverse-news'),
            description: __('Change color of your header text.', 'gutenverse-news'),
            component: ColorControl,
            style: [
                {
                    selector: `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_title span`,
                    render: value => handleColor(value, 'color')
                }
            ],
        },
        {
            id: 'headerSecondColor',
            show: headerType === 'heading_2',
            label: __('Header Secondary Color', 'gutenverse-news'),
            description: __('Change color of your secondary header color.', 'gutenverse-news'),
            component: ColorControl,
            style: [
                {
                    selector: `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_heading_2`,
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
                    selector: `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_heading_1`,
                    render: value => handleColor(value, 'border-color')
                },
                {
                    selector: `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_heading_6`,
                    render: value => handleColor(value, 'border-color')
                },
                {
                    selector: `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_heading_9`,
                    render: value => handleColor(value, 'border-color')
                }
            ],
        },
        {
            id: 'headerLineColor2',
            show: headerType === 'heading_5',
            label: __('Header Line Color', 'gutenverse-news'),
            description: __('Change line color of your header.', 'gutenverse-news'),
            component: ColorControl,
            style: [
                {
                    selector: `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_heading_5:before`,
                    render: value => handleColor(value, 'border-color')
                }
            ],
        },
        {
            id: 'headerAccentColor',
            show: headerType === 'heading_6',
            label: __('Header Accent Color', 'gutenverse-news'),
            description: __('Change accent color of your header.', 'gutenverse-news'),
            component: ColorControl,
            style: [
                {
                    selector: `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_heading_6:after`,
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
                    selector: `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_heading_7 .gvnews_block_title span`,
                    render: value => handleColor(value, 'border-color')
                }
            ],
        },
    ];
};

export const headerSettingsPanel = (props) => {
    const {
        elementId,
        headerType,
        title,
        second_title
    } = props;

    const {
        imgDir
    } = window['GVNewsConfig'];

    return [
        {
            id: 'icon',
            show: title !== '' || second_title !== '',
            label: __('Icon', 'gutenverse-news'),
            description: __('Choose icon for this block icon.', 'gutenverse-news'),
            component: IconControl
        },
        {
            id: 'title',
            label: __('Title', 'gutenverse-news'),
            description: __('Main title of Module Block.', 'gutenverse-news'),
            component: TextControl,
        },
        {
            id: 'second_title',
            label: __('Second Title', 'gutenverse-news'),
            description: __('Secondary title of Module Block.', 'gutenverse-news'),
            component: TextControl,
        },
        {
            id: 'url_title',
            label: __('URL Title', 'gutenverse-news'),
            description: __('Insert URL of heading title.', 'gutenverse-news'),
            component: TextControl,
        },
    ];
};

export const headerStylesPanel = (props) => {
    const {
        elementId,
        headerType,
    } = props;

    const {
        imgDir
    } = window['GVNewsConfig'];

    return [
        {
            id: 'headerType',
            label: __('Header Type', 'gutenverse-news'),
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
            id: 'headerBackgroundColor',
            show: headerType === 'heading_1' || headerType === 'heading_2' || headerType === 'heading_4' || headerType === 'heading_5',
            label: __('Header Background Color', 'gutenverse-news'),
            description: __('Change color of your header background.', 'gutenverse-news'),
            component: ColorControl,
            style: [
                {
                    selector: `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_heading_1 .gvnews_block_title span`,
                    render: value => handleColor(value, 'background')
                },
                {
                    selector: `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_heading_2 .gvnews_block_title span`,
                    render: value => handleColor(value, 'background')
                },
                {
                    selector: `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_heading_4 .gvnews_block_title span`,
                    render: value => handleColor(value, 'background')
                },
                {
                    selector: `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_heading_5 .gvnews_block_title span`,
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
            style: [
                {
                    selector: `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_heading_3`,
                    render: value => handleColor(value, 'background')
                }
            ],
        },
        {
            id: 'headerTextColor',
            label: __('Header Text Color', 'gutenverse-news'),
            description: __('Change color of your header text.', 'gutenverse-news'),
            component: ColorControl,
            style: [
                {
                    selector: `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_title span`,
                    render: value => handleColor(value, 'color')
                }
            ],
        },
        {
            id: 'headerSecondColor',
            show: headerType === 'heading_2',
            label: __('Header Secondary Color', 'gutenverse-news'),
            description: __('Change color of your secondary header color.', 'gutenverse-news'),
            component: ColorControl,
            style: [
                {
                    selector: `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_heading_2`,
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
                    selector: `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_heading_1`,
                    render: value => handleColor(value, 'border-color')
                },
                {
                    selector: `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_heading_6`,
                    render: value => handleColor(value, 'border-color')
                },
                {
                    selector: `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_heading_9`,
                    render: value => handleColor(value, 'border-color')
                }
            ],
        },
        {
            id: 'headerLineColor2',
            show: headerType === 'heading_5',
            label: __('Header Line Color', 'gutenverse-news'),
            description: __('Change line color of your header.', 'gutenverse-news'),
            component: ColorControl,
            style: [
                {
                    selector: `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_heading_5:before`,
                    render: value => handleColor(value, 'border-color')
                }
            ],
        },
        {
            id: 'headerAccentColor',
            show: headerType === 'heading_6',
            label: __('Header Accent Color', 'gutenverse-news'),
            description: __('Change accent color of your header.', 'gutenverse-news'),
            component: ColorControl,
            style: [
                {
                    selector: `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_heading_6:after`,
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
                    selector: `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_heading_7 .gvnews_block_title span`,
                    render: value => handleColor(value, 'border-color')
                }
            ],
        },
    ];
};