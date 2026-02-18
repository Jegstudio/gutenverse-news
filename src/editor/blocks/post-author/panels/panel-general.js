
import { __ } from '@wordpress/i18n';
import { CheckboxControl, IconRadioControl, SelectControl } from 'gutenverse-core/controls';
import { AlignCenter, AlignLeft, AlignRight } from 'gutenverse-core/components';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const generalPanel = (props) => {
    const {
        hideAvatar,
        hideName,
        avatarPosition,
    } = props;
    return [
        {
            id: 'hideName',
            label: __('Hide Name', 'gutenverse-news'),
            component: CheckboxControl
        },
        {
            id: 'hideDesc',
            label: __('Hide Description', 'gutenverse-news'),
            component: CheckboxControl
        },
        {
            id: 'hideAvatar',
            label: __('Hide Avatar', 'gutenverse-news'),
            component: CheckboxControl
        },
        {
            id: 'hideSocial',
            label: __('Hide Social', 'gutenverse-news'),
            component: CheckboxControl
        },
        {
            id: 'avatarPosition',
            label: __('Avatar Position', 'gutenverse-news'),
            show: !hideAvatar,
            component: SelectControl,
            options: [
                {
                    value: 'top',
                    label: 'Top'
                },
                {
                    value: 'left',
                    label: 'Left'
                },
                {
                    value: 'right',
                    label: 'Right'
                },
                {
                    value: 'bottom',
                    label: 'Bottom'
                },
            ]
        },
        {
            id: 'align',
            label: __('Alignment', 'gutenverse-news'),
            component: IconRadioControl,
            allowDeviceControl: true,
            options: [
                {
                    label: __('Align Left', 'gutenverse-news'),
                    value: 'flex-start',
                    icon: <AlignLeft />,
                },
                {
                    label: __('Align Center', 'gutenverse-news'),
                    value: 'center',
                    icon: <AlignCenter />,
                },
                {
                    label: __('Align Right', 'gutenverse-news'),
                    value: 'flex-end',
                    icon: <AlignRight />,
                },
            ],
        },
        {
            id: 'verticalAlign',
            label: __('Vertical Alignment', 'gutenverse-news'),
            description: __('Vertical alignment of the author box.', 'gutenverse-news'),
            show: avatarPosition === 'right' || avatarPosition === 'left',
            component: SelectControl,
            allowDeviceControl: true,
            options: [
                {
                    label: __('Top', 'gutenverse-news'),
                    value: 'flex-start',
                },
                {
                    label: __('Center', 'gutenverse-news'),
                    value: 'center',
                },
                {
                    label: __('Bottom', 'gutenverse-news'),
                    value: 'flex-end',
                },
            ],
        },
        {
            id: 'titleTag',
            show: !hideName,
            label: __('Title HTML Tag', 'gutenverse-news'),
            component: SelectControl,
            options: [
                {
                    label: __('H1'),
                    value: 'h1'
                },
                {
                    label: __('H2'),
                    value: 'h2'
                },
                {
                    label: __('H3'),
                    value: 'h3'
                },
                {
                    label: __('H4'),
                    value: 'h4'
                },
                {
                    label: __('H5'),
                    value: 'h5'
                },
                {
                    label: __('H6'),
                    value: 'h6'
                },
                {
                    label: __('SPAN'),
                    value: 'span'
                },
            ],
        },
    ];
};

