import { __ } from '@wordpress/i18n';
import { BorderControl, CheckboxControl, DimensionControl, ColorControl, TypographyControl, BackgroundControl } from 'gutenverse-core/controls';


export const noContentPanel = (props) => {
    const {
        showNoContent,
        elementId
    } = props;

    return [
        {
            id: 'showNoContent',
            label: __('Show No Content', 'gutenverse-news'),
            description: __('Enable this option to show the content when no post is found.', 'gutenverse-news'),
            component: CheckboxControl
        },
        {
            id: 'noContentTypography',
            label: __('Typography', 'gutenverse-news'),
            description: __('This option will change your header filter dropdown typography.', 'gutenverse-news'),
            component: TypographyControl,
        },
        {
            id: 'noContentColor',
            label: __('Color', 'gutenverse-news'),
            description: __('Change color of your header filter dropdown text in normal condition.', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'noContentBackground',
            label: __('Background', 'gutenverse-news'),
            component: BackgroundControl,
            options: ['default', 'gradient'],
        },
        {
            id: 'noContentBorder',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'noContentBorder',
                    'selector': `.${elementId} .gvnews_news_ticker_control`,
                }
            ]
        },
        {
            id: 'noContentPadding',
            label: __('Padding', 'gutenverse'),
            component: DimensionControl,
            position: ['right', 'left'],
            allowDeviceControl: true,
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
    ];
};