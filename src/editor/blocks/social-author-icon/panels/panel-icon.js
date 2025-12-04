import { __ } from '@wordpress/i18n';
import { ColorControl, RangeControl, IconControl } from 'gutenverse-core/controls';
import { handleColor, handleUnitPoint } from 'gutenverse-core/styling';

export const iconPanel = (props) => {
    const {
        elementId
    } = props;

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
            // style: [
            //     {
            //         selector: `.${elementId} .gvnews-social-icon-link i, .${elementId} .gvnews-social-icon-link svg`,
            //         render: value => handleUnitPoint(value, 'font-size')
            //     }
            // ]
        },
        {
            id: 'iconColor',
            label: __('Icon Color', 'gutenverse-news'),
            component: ColorControl,
            // style: [
            //     {
            //         selector: `.${elementId} .gvnews-social-icon-link i, .${elementId} .gvnews-social-icon-link svg`,
            //         render: value => handleColor(value, 'color')
            //     }
            // ]
        },
        {
            id: 'iconBackground',
            label: __('Icon Background', 'gutenverse-news'),
            component: ColorControl,
            // style: [
            //     {
            //         selector: `.${elementId} .gvnews-social-icon-link`,
            //         render: value => handleColor(value, 'background-color')
            //     }
            // ]
        }
    ];
};
