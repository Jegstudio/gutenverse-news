import { __ } from '@wordpress/i18n';
import { TypographyControl, SwitchControl, ColorControl } from 'gutenverse-core/controls';
import { applyFilters } from '@wordpress/hooks';

export const metaStylePanel = (props, settings, withIcon = true, hover = 'all') => {
    const {
        showMeta = true,
        showMetaAuthor = true,
        switcher,
        setSwitcher,
    } = props;

    if (!showMeta) {
        return [];
    }

    const isNormal = !switcher.meta || switcher.meta === 'normal';

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