import { __ } from '@wordpress/i18n';
import { CheckboxControl, ColorControl, RangeControl, SwitchControl, TypographyControl } from 'gutenverse-core/controls';

export const stylePanel = (props) => {
    const {
        elementId,
        setSwitcher,
        switcher
    } = props;

    return [
        {
            id: 'titleTypography',
            label: __('Title Typography', 'gutenverse-news'),
            component: TypographyControl,
        },
        {
            id: 'navTypography',
            label: __('Nav Text Typography', 'gutenverse-news'),
            component: TypographyControl,
        },
        {
            id: 'widthMode',
            label: __('Force 1 Column', 'gutenverse-news'),
            description: __('Turn on this option to show the next and previous blocks stacked in one column on mobile devices.', 'gutenverse-news'),
            component: CheckboxControl,
            allowDeviceControl: false,
            specificDevice: 'Mobile',
        },
        {
            id: 'gap',
            label: __('Gap', 'gutenverse-news'),
            component: RangeControl,
            allowDeviceControl: true,
            unit: 'px',
            min: 1,
            max: 100,
            step: 1,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'gap',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'gap',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ],
                    'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_prevnext_post`,
                }
            ],
        },
        {
            id: '__stylePrevNextType',
            component: SwitchControl,
            options: [
                {
                    value: 'normal',
                    label: 'Normal'
                },
                {
                    value: 'hover',
                    label: 'Hover'
                }
            ],
            onChange: ({ __stylePrevNextType }) => setSwitcher({ ...switcher, stylePrevNextType: __stylePrevNextType })
        },
        // Normal
        {
            id: 'titleColor',
            show: !switcher.stylePrevNextType || switcher.stylePrevNextType === 'normal',
            label: __('Title Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'navTextColor',
            show: !switcher.stylePrevNextType || switcher.stylePrevNextType === 'normal',
            label: __('Nav Text Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'accentColor',
            show: !switcher.stylePrevNextType || switcher.stylePrevNextType === 'normal',
            label: __('Accent Color', 'gutenverse-news'),
            component: ColorControl,
        },
        // Hover
        {
            id: 'titleColorHover',
            show: switcher.stylePrevNextType === 'hover',
            label: __('Title Color Hover', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'navTextColorHover',
            show: switcher.stylePrevNextType === 'hover',
            label: __('Nav Text Color Hover', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'accentColorHover',
            show: switcher.stylePrevNextType === 'hover',
            label: __('Accent Color Hover', 'gutenverse-news'),
            component: ColorControl,
        },
    ];
};