import { __ } from '@wordpress/i18n';
import {
    SwitchControl,
    BorderControl,
    BorderResponsiveControl,
    DimensionControl,
    SizeControl
} from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const cardStylePanelModule = (props) => {
    const {
        elementId,
        hasSecondClass = false,
        switcher,
        setSwitcher,
        mainThumbnailClass,
        secondThumbnailClass,
        hasGap = {
            main: false,
            second: false
        }
    } = props;
    const device = getDeviceType();

    return [
        // {
        //     id: '__cardType',
        //     show: hasSecondClass,
        //     component: SwitchControl,
        //     options: [
        //         {
        //             value: 'main',
        //             label: 'Main'
        //         },
        //         {
        //             value: 'second',
        //             label: 'Second'
        //         }
        //     ],
        //     onChange: ({ __cardType }) => setSwitcher({ ...switcher, cardType: __cardType })
        // },
        // Main
        // TODO: Add width control
        // {
        //     id: 'cardWidth',
        //     label: __('Width', 'gutenverse'),
        //     show: (switcher.cardType === 'main' || !switcher.cardType),
        //     component: SizeControl,
        //     allowDeviceControl: true,
        //     units: {
        //         px: {
        //             text: 'px',
        //             min: 1,
        //             max: 500,
        //             step: 1
        //         },
        //         '%': {
        //             text: '%',
        //             min: 1,
        //             max: 100,
        //             step: 1
        //         },
        //     },
        //     liveStyle: [
        //         {
        //             'type': 'unitPoint',
        //             'id': 'cardWidth',
        //             'properties': [
        //                 {
        //                     'name': 'width',
        //                     'valueType': 'direct'
        //                 }
        //             ],
        //             'selector': `.${elementId} .gvnews_postblock .${mainThumbnailClass}`,
        //             'responsive': true
        //         }
        //     ]
        // },
        {
            id: 'cardPadding',
            component: DimensionControl,
            allowDeviceControl: true,
            show: (switcher.cardType === 'main' || !switcher.cardType),
            label: __('Padding', 'gutenverse-news'),
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
                ['%']: {
                    text: '%',
                    unit: '%'
                },
                rem: {
                    text: 'rem',
                    unit: 'rem'
                },
            },
        },
        {
            id: 'cardBorder',
            component: BorderControl,
            show: (switcher.cardType === 'main' || !switcher.cardType) && device === 'Desktop',
            label: __('Border', 'gutenverse-news'),
        },
        {
            id: 'cardBorderResponsive',
            component: BorderResponsiveControl,
            show: (switcher.cardType === 'main' || !switcher.cardType) && device !== 'Desktop',
            label: __('Border', 'gutenverse-news'),
            allowDeviceControl: true,
        },
        // Second
        {
            id: 'cardBorderSecond',
            component: BorderControl,
            show: (switcher.cardType === 'second') && device === 'Desktop',
            label: __('Border', 'gutenverse-news'),
        },
        {
            id: 'cardBorderResponsiveSecond',
            component: BorderResponsiveControl,
            show: (switcher.cardType === 'second') && device !== 'Desktop',
            label: __('Border', 'gutenverse-news'),
            allowDeviceControl: true,
        },
        {
            id: 'cardPaddingSecond',
            component: DimensionControl,
            allowDeviceControl: true,
            show: (switcher.cardType === 'second'),
            label: __('Padding', 'gutenverse-news'),
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
                ['%']: {
                    text: '%',
                    unit: '%'
                },
                rem: {
                    text: 'rem',
                    unit: 'rem'
                },
            },
        },
    ];
};