import { __ } from '@wordpress/i18n';
import { SelectControl, TextControl, SelectSearchControl, CheckboxControl, IconControl, RangeControl } from 'gutenverse-core/controls';
import { searchAuthor } from '../../../utils/helper';

export const generalPanel = (props) => {
    const {
        authorType,
        hideIfEmpty,
    } = props;
    const getSocialMedias = () => {
        const socialMedias = window.GVNewsConfig.socialMedias;
        const result = [];
        for (const key in socialMedias) {
            result.push({
                label: __(socialMedias[key], 'gutenverse-news'),
                value: key
            });
        }
        return result;
    };

    return [
        {
            id: 'icon',
            label: __('Custom Icon', 'gutenverse-news'),
            component: IconControl,
        },
        {
            id: 'iconSize',
            label: __('Icon Size', 'gutenverse-news'),
            component: RangeControl,
            min: 10,
            max: 100,
            unit: 'px',
            allowDeviceControl: true,
        },
        {
            id: 'authorType',
            label: __('Author Type', 'gutenverse-news'),
            component: SelectControl,
            options: [
                { label: 'Dynamic', value: 'dynamic' },
                { label: 'Static', value: 'static' },
            ],
        },
        {
            id: 'socialMedia',
            label: __('Social Media', 'gutenverse-news'),
            component: SelectControl,
            options: getSocialMedias(),
        },
        {
            id: 'hideIfEmpty',
            label: __('Hide if URL empty', 'gutenverse-news'),
            component: CheckboxControl,
        },
        {
            id: 'defaultUrl',
            label: __('Default URL', 'gutenverse-news'),
            component: TextControl,
            show: !hideIfEmpty,
        },
        {
            id: 'authorId',
            label: __('Select Author', 'gutenverse-news'),
            component: SelectSearchControl,
            onSearch: searchAuthor,
            show: authorType === 'static',
        }
    ];
};
