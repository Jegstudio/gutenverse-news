import { __ } from '@wordpress/i18n';
import { TypographyControl, SwitchControl, ColorControl } from 'gutenverse-core/controls';
import { applyFilters } from '@wordpress/hooks';

export const metaStylePanel = (props, settings, withIcon = true, hover = 'all', hasBoxMeta = false) => {
    const {
        showMeta = true,
        showMetaAuthor = true,
        switcher,
        setSwitcher,
        gvnewsModule = '',
    } = props;

    if (!showMeta) {
        return [];
    }

    const isNormal = !switcher.meta || switcher.meta === 'normal';
    const showThridColor = 'GUTENVERSE\\NEWS\\Block\\Hero\\Hero_14' === gvnewsModule;

    let panelList = [
        {
            id: 'typographyMeta',
            label: __('Meta Typography', 'gutenverse-news'),
            description: __('This option will change your meta typography.', 'gutenverse-news'),
            component: TypographyControl,
            show: showMeta
        },
        {
            id: 'typographyMetaAuthor',
            label: __('Meta Author Typography', 'gutenverse-news'),
            description: __('This option will change your author name  typography on post meta.', 'gutenverse-news'),
            component: TypographyControl,
            show: settings.includes('author') && showMeta && showMetaAuthor
        },
        {
            id: '__metaHover',
            component: SwitchControl,
            show: 'disable' !== hover,
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
            onChange: ({ __metaHover }) => setSwitcher({ ...switcher, meta: __metaHover })
        },
        {
            id: 'boxMetaColor',
            label: __('Box Meta Color', 'gutenverse-news'),
            component: ColorControl,
            show: hasBoxMeta && isNormal && showMeta
        },
        {
            id: 'boxMetaColorHover',
            label: __('Box Meta Color', 'gutenverse-news'),
            component: ColorControl,
            show: hasBoxMeta && !isNormal && showMeta && 'author-only' !== hover
        },
        {
            id: 'boxMetaIconColor',
            label: __('Box Meta Icon Color', 'gutenverse-news'),
            component: ColorControl,
            show: hasBoxMeta && isNormal && showMeta && withIcon
        },
        {
            id: 'boxMetaIconColorHover',
            label: __('Box Meta Icon Color', 'gutenverse-news'),
            component: ColorControl,
            show: hasBoxMeta && !isNormal && showMeta && withIcon && 'author-only' !== hover
        },
        {
            id: 'metaColor',
            label: __('Meta Color', 'gutenverse-news'),
            component: ColorControl,
            show: isNormal && showMeta
        },
        {
            id: 'metaColorHover',
            label: __('Meta Color', 'gutenverse-news'),
            component: ColorControl,
            show: !isNormal && showMeta && 'author-only' !== hover
        },
        {
            id: 'metaIconColor',
            label: __('Meta Icon Color', 'gutenverse-news'),
            component: ColorControl,
            show: withIcon && isNormal && showMeta
        },
        {
            id: 'metaIconColorHover',
            label: __('Meta Icon Color', 'gutenverse-news'),
            component: ColorControl,
            show: withIcon && !isNormal && showMeta && 'author-only' !== hover
        },

        {
            id: 'thridMetaColor',
            label: __('Thrid List Meta Color', 'gutenverse-news'),
            component: ColorControl,
            description: __('This option will override the meta color setting on the thrid list.', 'gutenverse-news'),
            show: showThridColor && isNormal && showMeta
        },
        {
            id: 'thridMetaColorHover',
            label: __('Thrid List Meta Color', 'gutenverse-news'),
            component: ColorControl,
            description: __('This option will override the meta color setting on the thrid list on hover condition.', 'gutenverse-news'),
            show: showThridColor && !isNormal && showMeta && 'author-only' !== hover
        },
        {
            id: 'thridMetaIconColor',
            label: __('Thrid List Meta Icon Color', 'gutenverse-news'),
            component: ColorControl,
            description: __('This option will override the meta icon color setting on the thrid list.', 'gutenverse-news'),
            show: showThridColor && isNormal && showMeta
        },
        {
            id: 'thridMetaIconColorHover',
            label: __('Thrid List Meta Icon Color', 'gutenverse-news'),
            component: ColorControl,
            description: __('This option will override the meta icon color setting on the thrid list on hover condition.', 'gutenverse-news'),
            show: showThridColor && !isNormal && showMeta && 'author-only' !== hover
        },
    ];

    settings.includes('author') && panelList.push(
        {
            id: 'metaAuthorColor',
            label: __('Meta Author Color', 'gutenverse-news'),
            component: ColorControl,
            show: showMeta && showMetaAuthor && isNormal,
        },
        {
            id: 'metaAuthorColorHover',
            label: __('Meta Author Color', 'gutenverse-news'),
            component: ColorControl,
            show: showMeta && showMetaAuthor && !isNormal
        },
    );

    return applyFilters('gutenverse.news.panels.meta-style', panelList, props);
};