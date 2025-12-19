import { __ } from '@wordpress/i18n';
import {
    AlertControl,
    ColorControl,
    TypographyControl,
    TextShadowControl,
} from 'gutenverse-core/controls';

export const biographyStylePanel = (props) => {
    const {
        hideDesc
    } = props;

    if (hideDesc) {
        return [
            {
                id: 'sticky-notice',
                component: AlertControl,
                children: <>
                    <span>{__('Description disabled. The Description panel will be hidden.')}</span>
                </>
            },
        ];
    }

    return [
        {
            id: 'bioTypography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: 'bioColor',
            label: __('Text color', 'gutenverse'),
            component: ColorControl,
        },
        {
            id: 'bioTextShadow',
            label: __('Text Shadow', 'gutenverse'),
            component: TextShadowControl,
        },
    ];
};
