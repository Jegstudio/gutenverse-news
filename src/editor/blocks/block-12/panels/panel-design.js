import { __ } from '@wordpress/i18n';
import { SelectControl, CheckboxControl, TypographyControl, ColorControl } from 'gutenverse-core/controls';
import { handleTypography, handleColor } from 'gutenverse-core/styling';

export const designPanel = (props) => {
    const {
        enableBoxed,
        elementId,
        enableExcerpt
    } = props;

    return [
        {
            id: 'enableBoxed',
            label: __('Enable Boxed', 'gutenverse-news'),
            component: CheckboxControl
        },
        {
            id: 'enableBoxShadow',
            show: enableBoxed === true,
            label: __('Enable Box Shadow', 'gutenverse-news'),
            component: CheckboxControl
        },
        {
            id: 'columnWidth',
            label: __('Block Column Width', 'gutenverse-news'),
            component: SelectControl,
            options: [
                {
                    value: 'auto',
                    label: __('Auto', 'gutenverse-news')
                },
                {
                    value: '4',
                    label: __('4 Column Design ( 1 Block )', 'gutenverse-news')
                },
                {
                    value: '8',
                    label: __('8 Column Design ( 2 Block )', 'gutenverse-news')
                },
                {
                    value: '12',
                    label: __('12  Column Design ( 3 Block )', 'gutenverse-news')
                },
            ]
        },
        {
            id: 'typography',
            label: __('Title Typography', 'gutenverse-news'),
            component: TypographyControl,
            style: [
                {
                    selector: `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_title a`,
                    hasChild: true,
                    render: (value, id) => handleTypography(value, props, id)
                }
            ]
        },
        {
            id: 'typographyMeta',
            show: enableExcerpt === true,
            label: __('Meta Typography', 'gutenverse-news'),
            component: TypographyControl,
            style: [
                {
                    selector: `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_meta>div`,
                    hasChild: true,
                    render: (value, id) => handleTypography(value, props, id)
                }
            ]
        },
        {
            id: 'typographyContent',
            label: __('Content Typography', 'gutenverse-news'),
            component: TypographyControl,
            style: [
                {
                    selector: [`.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_excerpt p`, `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_excerpt .gvnews_readmore`],
                    hasChild: true,
                    render: (value, id) => handleTypography(value, props, id)
                }
            ]
        },
        {
            id: 'bgColor',
            label: __('Block Background', 'gutenverse-news'),
            component: ColorControl,
            style: [
                {
                    selector: [`.${elementId} .gvnews_postblock_content`, `.${elementId} .gvnews_postblock .gvnews_inner_post`],
                    render: value => handleColor(value, 'background')
                }
            ],
        },
        {
            id: 'titleColor',
            label: __('Title Color', 'gutenverse-news'),
            component: ColorControl,
            style: [
                {
                    selector: [`.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_title a`],
                    render: value => handleColor(value, 'color')
                }
            ],
        },
        {
            id: 'aHover',
            label: __('Accent Color & Link Hover', 'gutenverse-news'),
            component: ColorControl,
            style: [
                {
                    selector: [`.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_meta_author a`, `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_title a:hover`],
                    render: value => handleColor(value, 'color')
                }
            ],
        },
        {
            id: 'metaColor',
            label: __('Meta Color', 'gutenverse-news'),
            component: ColorControl,
            style: [
                {
                    selector: [`.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_meta`],
                    render: value => handleColor(value, 'color')
                }
            ],
        },
        {
            id: 'excerptColor',
            show: enableExcerpt === true,
            label: __('Excerpt Color', 'gutenverse-news'),
            component: ColorControl,
            style: [
                {
                    selector: [`.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_excerpt`],
                    render: value => handleColor(value, 'color')
                }
            ],
        },
    ];
};