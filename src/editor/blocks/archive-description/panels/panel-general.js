import { __ } from '@wordpress/i18n';
import { ColorControl, TypographyControl, SelectControl, IconRadioControl } from 'gutenverse-core/controls';
import { handleColor } from 'gutenverse-core/styling';
import { AlignLeft, AlignRight, AlignCenter, AlignJustify } from 'gutenverse-core/components';

export const generalPanel = (props) => {
    const {
        elementId,
    } = props;

    return [
        {
            id: 'tagType',
            label: __('Tag Type Type', 'gutenverse'),
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
                    label: __('p'),
                    value: 'p'
                },
            ],
        },
        {
            id: 'textAlign',
            label: __('Text Alignment', 'gutenverse'),
            component: IconRadioControl,
            options: [
                {
                    label: __('Align Left', 'gutenverse'),
                    value: 'left',
                    icon: <AlignLeft />,
                },
                {
                    label: __('Align Center', 'gutenverse'),
                    value: 'center',
                    icon: <AlignCenter />,
                },
                {
                    label: __('Align Right', 'gutenverse'),
                    value: 'right',
                    icon: <AlignRight />,
                },
                {
                    label: __('Align Justify', 'gutenverse'),
                    value: 'justify',
                    icon: <AlignJustify />,
                },
            ]
        }
    ];
};