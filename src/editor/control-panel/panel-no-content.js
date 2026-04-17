import { __ } from '@wordpress/i18n';
import { BorderResponsiveControl, DimensionControl, ColorControl, TypographyControl, BackgroundControl, PreviewControl, IconRadioControl } from 'gutenverse-core/controls';
import { AlignCenter, AlignLeft, AlignRight } from 'gutenverse-core/components';


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
            id: 'noContentTextAlign',
            label: __('Text Align', 'gutenverse-news'),
            component: IconRadioControl,
            allowDeviceControl: false,
            options: [
                {
                    label: __('Align Left', 'gutenverse-pro'),
                    value: 'start',
                    icon: <AlignLeft />,
                },
                {
                    label: __('Align Center', 'gutenverse-pro'),
                    value: 'center',
                    icon: <AlignCenter />,
                },
                {
                    label: __('Align Right', 'gutenverse-pro'),
                    value: 'end',
                    icon: <AlignRight />,
                },
            ],
        },
        {
            id: 'noContentTypography',
            label: __('Typography', 'gutenverse-news'),
            description: __('This option will change yout No Content Available typography.', 'gutenverse-news'),
            component: TypographyControl,
        },
        {
            id: 'noContentColor',
            label: __('Color', 'gutenverse-news'),
            description: __('Change color of your header No Content Available text.', 'gutenverse-news'),
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