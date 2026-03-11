import { __ } from '@wordpress/i18n';
import { BorderControl, BorderResponsiveControl, SelectControl, SwitchControl, AlertControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const thumbnailSettingPanel = (props) => {
    const {
        hasSecondImageSize = false,
        switcher,
        setSwitcher,
        thumb = true,
        skipThumbnailSize = false,
    } = props;

    if (!thumb) {
        return [
            {
                id: '__itemShowedThumbnail',
                component: AlertControl,
                children: <>
                    <span>{__('You need to turn on "Enable Thumbnail" to use this feature.', 'gutenverse-news')}</span>
                </>
            },
        ];
    }

    const device = getDeviceType();

    const getImageSizeOptions = () => {
        const imageSizes = window.GVNewsConfig.imageSizes;
        const result = [
            { label: __('Default', 'gutenverse-news'), value: 'default' },
            { label: __('Original Image', 'gutenverse-image'), value: 'full' },
        ];
        for (const key in imageSizes) {
            result.push({ label: __(imageSizes[key].display_name, 'gutenverse-news'), value: key });
        }
        return result;
    };

    return [
        {
            id: '__thumbnailType',
            show: hasSecondImageSize,
            component: SwitchControl,
            options: [
                {
                    value: 'main',
                    label: 'Main'
                },
                {
                    value: 'second',
                    label: 'Second'
                }
            ],
            onChange: ({ __thumbnailType }) => setSwitcher({ ...switcher, state: __thumbnailType })
        },
        // Main Thumbnail
        {
            id: 'renderedImageSizeMain',
            show: !skipThumbnailSize && (!switcher.state || switcher.state === 'main'),
            label: __('Rendered Image Size', 'gutenverse-news'),
            description: hasSecondImageSize ? __('Choose the image size that you want to rendered in main thumbnail in this module.', 'gutenverse-news') : '',
            component: SelectControl,
            options: getImageSizeOptions(),
        },
        {
            id: 'borderMainThumbnail',
            show: (!switcher.state || switcher.state === 'main') && device === 'Desktop',
            label: __('Border Type', 'gutenverse-news'),
            component: BorderControl,
        },
        {
            id: 'borderResponsiveMainThumbnail',
            show: (!switcher.state || switcher.state === 'main') && device !== 'Desktop',
            label: __('Border Type', 'gutenverse-news'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
        },
        // Second thumbnail
        {
            id: 'renderedImageSizeSecond',
            show: switcher.state === 'second',
            label: __('Rendered Image Size', 'gutenverse-news'),
            description: __('Choose the image size that you want to rendered in second thumbnail in this module.', 'gutenverse-news'),
            component: SelectControl,
            options: getImageSizeOptions(),
        },
        {
            id: 'borderSecondThumbnail',
            show: (switcher.state === 'second') && device === 'Desktop',
            label: __('Border Type', 'gutenverse-news'),
            component: BorderControl,
        },
        {
            id: 'borderResponsiveSecondThumbnail',
            show: (switcher.state === 'second') && device !== 'Desktop',
            label: __('Border Type', 'gutenverse-news'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
        },
    ];
};