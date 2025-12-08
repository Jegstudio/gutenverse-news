import { __ } from '@wordpress/i18n';
import { AlertControl, BoxShadowControl, BorderControl, DimensionControl, IconControl, TextControl, ColorControl, ImageRadioControl, TypographyControl, SwitchControl, RangeControl } from 'gutenverse-core/controls';
import { isNotEmpty } from 'gutenverse-core/helper';
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
            label: __('Header Title Color', 'gutenverse-news'),
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
            id: 'headerSecondTextColor',
            label: __('Second Title Color', 'gutenverse-news'),
            description: __('Change color of your header text.', 'gutenverse-news'),
            show: ['heading_5', 'heading_6', 'heading_7', 'heading_8'].includes(headerType),
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
        title,
        second_title,
        switcher,
        setSwitcher,
        headerCategory,
        headerAuthor,
        headerTag,
    } = props;

    const withText = isNotEmpty(title) || isNotEmpty(second_title);
    const withSecondText = ['heading_5', 'heading_6', 'heading_7', 'heading_8'].includes(headerType) && isNotEmpty(second_title);
    const withHeaderFilter = isNotEmpty(headerCategory) || isNotEmpty(headerAuthor) || isNotEmpty(headerTag);

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
            id: 'headerTextTypography',
            label: __('Header Title Typography', 'gutenverse-news'),
            description: __('This option will change your header title text typography.', 'gutenverse-news'),
            component: TypographyControl,
            show: withText
        },

        {
            id: 'headerSecondTextTypography',
            label: __('Header Second Title Typography', 'gutenverse-news'),
            description: __('This option will change your header title text typography.', 'gutenverse-news'),
            show: withSecondText,
            component: TypographyControl,
        },
        {
            id: 'headerFilterTypography',
            label: __('Header Filter Text Typography', 'gutenverse-news'),
            description: __('This option will change your header title filter text typography.', 'gutenverse-news'),
            show: withHeaderFilter,
            component: TypographyControl,

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
            show: withText
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
                    selector: `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_heading_5:before`,
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
        {
            id: 'headerHeight',
            label: __('Header Height', 'gutenverse-news'),
            component: RangeControl,
            allowDeviceControl: true,
            unit: 'px',
            min: 1,
            max: 100,
            step: 1,
        },
        {
            id: 'headerTitlePadding',
            label: __('Header Title Padding', 'gutenverse-news'),
            component: DimensionControl,
            allowDeviceControl: true,
            position: ['right', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                percent: {
                    text: '%',
                    unit: '%'
                },
            },
        },
        {
            id: 'headerFilterPadding',
            label: __('Header Filter Padding', 'gutenverse-news'),
            component: DimensionControl,
            allowDeviceControl: true,
            position: ['right', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                percent: {
                    text: '%',
                    unit: '%'
                },
            },
        },
        {
            id: 'headerMargin',
            label: __('Header Margin', 'gutenverse-news'),
            component: DimensionControl,
            allowDeviceControl: true,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                percent: {
                    text: '%',
                    unit: '%'
                },
            },
        },
        {
            id: '__headerSwitcher',
            component: SwitchControl,
            options: [
                {
                    value: 'normal',
                    label: 'Normal'
                },
                {
                    value: 'hover',
                    label: 'Hover'
                },
                {
                    value: 'active',
                    label: 'Active'
                }
            ],
            show: withHeaderFilter,
            onChange: ({ __headerSwitcher }) => setSwitcher({ ...switcher, header: __headerSwitcher })
        },

        {
            id: 'headerFilterColor',
            label: __('Header Filter Text Color', 'gutenverse-news'),
            description: __('Change color of your header filter text in normal condition.', 'gutenverse-news'),
            show: (withHeaderFilter && (!switcher.header || switcher.header === 'normal')),
            component: ColorControl,

        },
        {
            id: 'headerFilterColorHover',
            label: __('Header Filter Text Color', 'gutenverse-news'),
            description: __('Change color of your header filter text in hover condition.', 'gutenverse-news'),
            show: withHeaderFilter && switcher.header === 'hover',
            component: ColorControl,
        },
        {
            id: 'headerFilterColorActive',
            label: __('Header Filter Text Color', 'gutenverse-news'),
            description: __('Change color of your header filter text in active condition.', 'gutenverse-news'),
            show: withHeaderFilter && switcher.header === 'active',
            component: ColorControl,
        },
        {
            id: 'headerFilterLineColor',
            label: __('Header Filter Line Color', 'gutenverse-news'),
            description: __('Change color of your header filter line color on active condition.', 'gutenverse-news'),
            show: withHeaderFilter && headerType === 'heading_3' && switcher.header === 'active',
            component: ColorControl,
        },
    ];
};

export const HeaderFilterDropdownPanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher,
        headerCategory,
        headerAuthor,
        headerTag,
    } = props;

    const withHeaderFilter = isNotEmpty(headerCategory) || isNotEmpty(headerAuthor) || isNotEmpty(headerTag);
    if (!withHeaderFilter) {
        return [{
            id: 'sticky-notice',
            component: AlertControl,
            children: <>
                <span>{__('This option is used for styling the Header Filter dropdown, you can add some header filter to use this option.', 'gutenverse-news')}</span>
            </>
        },];
    }
    return [

        {
            id: 'filterDowndownTypography',
            label: __('Item Typography', 'gutenverse-news'),
            description: __('This option will change your header filter dropdown typography.', 'gutenverse-news'),
            component: TypographyControl,
        },
        {
            id: 'filterDowndownWrapperBackground',
            label: __('Wrapper Background Color', 'gutenverse-news'),
            description: __('Change color of your header filter dropdown wrapper background in normal.', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'filterDropdownItemPadding',
            label: __('Item Padding', 'gutenverse-news'),
            component: DimensionControl,
            allowDeviceControl: false,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                percent: {
                    text: '%',
                    unit: '%'
                },
            },
        },
        {
            id: 'filterDropdownWrapperPadding',
            label: __('Wrapper Padding', 'gutenverse-news'),
            component: DimensionControl,
            allowDeviceControl: false,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                percent: {
                    text: '%',
                    unit: '%'
                },
            },
        },
        {
            id: 'filterDropdownWrapperBorder',
            label: __('Wrapper Border', 'gutenverse-news'),
            component: BorderControl,
            allowDeviceControl: false,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'filterDropdownWrapper',
                    'selector': `.${elementId} .gvnews_subcat .okayNav__nav--invisible`,
                }
            ]
        },
        {
            id: 'filterDropdownBoxShadow',
            label: __('Wrapper Box Shadow', 'gutenverse-news'),
            component: BoxShadowControl,
            allowDeviceControl: false,
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'id': 'filterDropdownBoxShadow',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId} .gvnews_subcat .okayNav__nav--invisible`,
                }
            ],
        },
        {
            id: '__filterDowndownSwitcher',
            component: SwitchControl,
            options: [
                {
                    value: 'normal',
                    label: 'Normal'
                },
                {
                    value: 'hover',
                    label: 'Hover'
                },
                {
                    value: 'active',
                    label: 'Active'
                }
            ],
            onChange: ({ __filterDowndownSwitcher }) => setSwitcher({ ...switcher, filterDowndown: __filterDowndownSwitcher })
        },
        {
            id: 'filterDowndownColor',
            label: __('Item Color', 'gutenverse-news'),
            description: __('Change color of your header filter dropdown text in normal condition.', 'gutenverse-news'),
            show: (!switcher.filterDowndown || switcher.filterDowndown === 'normal'),
            component: ColorControl,
        },
        {
            id: 'filterDowndownColorHover',
            label: __('Item Color', 'gutenverse-news'),
            description: __('Change color of your header filter dropdown text in hover condition.', 'gutenverse-news'),
            show: switcher.filterDowndown === 'hover',
            component: ColorControl,
        },
        {
            id: 'filterDowndownColorActive',
            label: __('Item Color', 'gutenverse-news'),
            description: __('Change color of your header filter dropdown text in active condition.', 'gutenverse-news'),
            show: switcher.filterDowndown === 'active',
            component: ColorControl,
        },
        {
            id: 'filterDowndownItemBackground',
            label: __('Item Background Color', 'gutenverse-news'),
            description: __('Change color of your header filter dropdown item background in normal condition.', 'gutenverse-news'),
            show: (!switcher.filterDowndown || switcher.filterDowndown === 'normal'),
            component: ColorControl,
        },
        {
            id: 'filterDowndownItemBackgroundHover',
            label: __('Item Background Color', 'gutenverse-news'),
            description: __('Change color of your header filter dropdown item background in hover condition.', 'gutenverse-news'),
            show: switcher.filterDowndown === 'hover',
            component: ColorControl,
        },
        {
            id: 'filterDowndownItemBackgroundActive',
            label: __('Item Background Color', 'gutenverse-news'),
            description: __('Change color of your header filter dropdown item background in active condition.', 'gutenverse-news'),
            show: switcher.filterDowndown === 'active',
            component: ColorControl,
        },
        {
            id: 'filterDropdownToogleColor',
            label: __('Toggle Color', 'gutenverse-news'),
            description: __('Change color of your header filter toogle color when dropdown is not open.', 'gutenverse-news'),
            show: (!switcher.filterDowndown || switcher.filterDowndown === 'normal'),
            component: ColorControl,
        },
        {
            id: 'filterDropdownToogleColorHover',
            label: __('Toggle Color', 'gutenverse-news'),
            description: __('Change color of your header filter toogle color when on hover condition.', 'gutenverse-news'),
            show: switcher.filterDowndown === 'hover',
            component: ColorControl,
        },
        {
            id: 'filterDropdownToogleColorActive',
            label: __('Toggle Color', 'gutenverse-news'),
            description: __('Change color of your header filter toogle color when dropdown is open.', 'gutenverse-news'),
            show: switcher.filterDowndown === 'active',
            component: ColorControl,
        },
        {
            id: 'filterDropdownItemBorder',
            label: __('Item Border', 'gutenverse-news'),
            component: BorderControl,
            show: (!switcher.filterDowndown || switcher.filterDowndown === 'normal'),
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'filterDropdownItem',
                    'selector': `.${elementId} .gvnews_subcat .okayNav__nav--invisible .subclass-filter`,
                }
            ]
        },
        {
            id: 'filterDropdownItemBorderHover',
            label: __('Item Border', 'gutenverse-news'),
            component: BorderControl,
            show: switcher.filterDowndown === 'hover',
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'filterDropdownItem',
                    'selector': `.${elementId} .gvnews_subcat .okayNav__nav--invisible .subclass-filter:hover`,
                }
            ]
        },
        {
            id: 'filterDropdownItemBorderActive',
            label: __('Item Border', 'gutenverse-news'),
            component: BorderControl,
            show: switcher.filterDowndown === 'active',
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'filterDropdownItem',
                    'selector': `.${elementId} .gvnews_subcat .okayNav__nav--invisible .subclass-filter.current`,
                }
            ]
        },
    ]
}


