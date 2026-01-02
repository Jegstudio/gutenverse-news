import { __ } from '@wordpress/i18n';
import { AlertControl, ColorControl, RangeControl, SwitchControl, TypographyControl } from 'gutenverse-core/controls';
import { isNotEmpty } from 'gutenverse-core/helper';

export const styleCategoryPanel = (props) => {

    const {
        metaLeft,
        metaRight,
        switcher,
        setSwitcher,
        elementId,
        categoryPrefix
    } = props;


    if ((isNotEmpty(metaLeft) && metaLeft.some(item => item.value === 'category')) || (isNotEmpty(metaRight) && metaRight.some(item => item.value === 'category'))) {

        return [
            {
                id: 'categoryTypography',
                label: __('Category Typography', 'gutenverse-news'),
                component: TypographyControl
            },
            {
                id: 'categoryPrefixTypography',
                label: __('Category Prefix Typography', 'gutenverse-news'),
                component: TypographyControl,
                show: categoryPrefix.length > 0
            },
            {
                id: 'categoryPrefixGap',
                label: __('Category Prefix Gap', 'gutenverse-news'),
                component: RangeControl,
                allowDeviceControl: true,
                unit: 'px',
                min: 1,
                max: 50,
                step: 1,
                show: categoryPrefix.length > 0,
                liveStyle: [
                    {
                        'type': 'plain',
                        'id': 'categoryPrefixGap',
                        'responsive': true,
                        'properties': [
                            {
                                'name': 'margin-right',
                                'valueType': 'pattern',
                                'pattern': '{value}px',
                                'patternValues': {
                                    'value': {
                                        'type': 'direct'
                                    }
                                }
                            }
                        ],
                        'selector': `.${elementId}.gvnews-post-meta>div .gvnews-meta-category .meta_text`,
                    }
                ],
            },
            {
                id: '__colorHover',
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
                onChange: ({ __colorHover }) => setSwitcher({ ...switcher, color: __colorHover })
            },
            {
                id: 'categoryColor',
                label: __('Category Color', 'gutenverse-news'),
                show: (!switcher.color || switcher.color === 'normal'),
                component: ColorControl,
            },
            {
                id: 'categoryPrefixColor',
                label: __('Category Prefix Color', 'gutenverse-news'),
                show: (!switcher.color || switcher.color === 'normal') && categoryPrefix.length > 0,
                component: ColorControl,
            },
            {
                id: 'categoryColorHover',
                label: __('Category Color', 'gutenverse-news'),
                show: switcher.color === 'hover',
                component: ColorControl,
            }
        ];

    } else {
        return [
            {
                id: '__itemShowedCategory',
                component: AlertControl,
                children: <>
                    <span>{__('Please select at least one Category element.', 'gutenverse-news')}</span>
                </>
            }
        ];
    }
};