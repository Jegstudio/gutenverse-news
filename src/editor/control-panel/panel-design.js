import { __ } from '@wordpress/i18n';
import { SelectControl, CheckboxControl, TypographyControl, ColorControl } from 'gutenverse-core/controls';
import { handleTypography, handleColor } from 'gutenverse-core/styling';

export const designPanel = (props, typeCount = 1, listIcon = false) => {
    const {
        enableBoxed,
        elementId,
        enableExcerpt,
        extendedOption = props => { return []; },
        columnWidth,
    } = props;

    return [
        ...extendedOption({ ...props }),
        {
            id: 'enableBoxed',
            label: __('Enable Boxed', 'gutenverse-news'),
            description: __('Enable boxed module style.', 'gutenverse-news'),
            component: CheckboxControl
        },
        {
            id: 'enableBoxShadow',
            show: enableBoxed === true,
            label: __('Enable Box Shadow', 'gutenverse-news'),
            description: __('Enable boxed module shadow.', 'gutenverse-news'),
            component: CheckboxControl
        },
        {
            id: 'columnWidth',
            label: __('Block Column Width', 'gutenverse-news'),
            description: __('Please choose width of column you want to use on this block. 1 Block represents 4 columns.', 'gutenverse-news'),
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
            description: __('This option will change your title typography.', 'gutenverse-news'),
            component: TypographyControl,
        },
        {
            id: 'secondTitleTypography',
            label: __('Second List Title Typography', 'gutenverse-news'),
            description: __('This option will override the post title typography setting on the second list.', 'gutenverse-news'),
            show: typeCount >= 2,
            component: TypographyControl,
        },
        {
            id: 'thridTitleTypography',
            label: __('Thrid List Title Typography', 'gutenverse-news'),
            description: __('This option will override the post title typography setting on the thrid list.', 'gutenverse-news'),
            show: typeCount >= 3 && (columnWidth === 'auto' || columnWidth === '12'),
            component: TypographyControl,
        },
        {
            id: 'titleColor',
            label: __('Title Color', 'gutenverse-news'),
            component: ColorControl,
            style: [
                {
                    selector: [`.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_postblock .gvnews_post_title a`],
                    render: value => handleColor(value, 'color')
                }
            ],
        },
        {
            id: 'typographyContent',
            label: __('Content Typography', 'gutenverse-news'),
            description: __('This option will change your post excerpt and read more button typography.', 'gutenverse-news'),
            component: TypographyControl,
            style: [
                {
                    selector: [`.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_postblock .gvnews_post_excerpt p`, `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_postblock .gvnews_post_excerpt .gvnews_readmore`],
                    hasChild: true,
                    render: (value, id) => handleTypography(value, props, id)
                }
            ]
        },
        {
            id: 'aHover',
            label: __('Accent Color & Link Hover', 'gutenverse-news'),
            component: ColorControl,
            style: [
                {
                    selector: [`.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_postblock .gvnews_meta_author a`, `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_postblock .gvnews_post_title a:hover`],
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
                    selector: [`.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_postblock .gvnews_post_excerpt`],
                    render: value => handleColor(value, 'color')
                }
            ],
        },
        {
            id: 'listIconColor',
            label: __('List Icon Color', 'gutenverse-news'),
            description: __('This option will change the list icon color.', 'gutenverse-news'),
            show: listIcon ,
            component: ColorControl,
        },
    ];
};