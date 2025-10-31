import { __ } from '@wordpress/i18n';
import { ColorControl, TypographyControl, RepeaterControl } from 'gutenverse-core/controls';

export const leftContentStylePanel = () => {
    return [
        {
            id: 'leftContentStyle',
            label: __('Hero Style', 'gutenverse-news'),
            component: RepeaterControl,
            titleFormat: (value) => {
                return `Item ${value.index}`;
            },
            isAddNew: false,
            isRemove: false,
            isDuplicate: false,
            isDragable: false,
            options: [
                {
                    id: 'titleTypography',
                    label: __('Title Typography', 'gutenverse-news'),
                    component: TypographyControl,
                },
                {
                    id: 'metaTypography',
                    label: __('Meta Typography', 'gutenverse-news'),
                    component: TypographyControl,
                },
                {
                    id: 'titleColor',
                    label: __('Title Color', 'gutenverse-news'),
                    component: ColorControl,
                },
                {
                    id: 'titleColorHover',
                    label: __('Title Color Hover', 'gutenverse-news'),
                    component: ColorControl,
                },
                {
                    id: 'metaColor',
                    label: __('Meta Color', 'gutenverse-news'),
                    component: ColorControl,
                },
            ],
        },
    ];
};