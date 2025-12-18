import { __ } from '@wordpress/i18n';
import { BorderResponsiveControl, DimensionControl, ColorControl, TypographyControl, BackgroundControl, PreviewControl } from 'gutenverse-core/controls';


export const noContentPanel = (props) => {
    const {
        elementId
    } = props;

    return [
        {
            id: 'gutenversePreviewBlock',
            previewName: 'noContent',
            label: __('Preview No Content', 'gutenverse-news'),
            description: __('Enable this option to show the content when no post is found.', 'gutenverse-news'),
            children: <>
                <p>{__('Used to style the message displayed when no posts are found.', 'gutenverse-news')}</p>
                <p>{__('Enable preview mode to simulate an empty state in the editor.', 'gutenverse-news')}</p>
            </>,
            component: PreviewControl
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
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'noContentBorder',
                    'selector': `.${elementId} .gvnews_empty_module`,
                }
            ]
        },
        {
            id: 'noContentPadding',
            label: __('Padding', 'gutenverse'),
            component: DimensionControl,
            position: ['top', 'right', 'bottom', 'left'],
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