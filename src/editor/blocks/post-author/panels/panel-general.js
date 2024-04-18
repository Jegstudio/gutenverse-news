import { __ } from '@wordpress/i18n';
import { TypographyControl } from 'gutenverse-core/controls';
import { handleTypography } from 'gutenverse-core/styling';

export const generalPanel = (props) => {
    const {
        elementId
    } = props;

    return [
        {
            id: 'authorTypography',
            label: __('Typography', 'gutenverse-news'),
            component: TypographyControl,
            style: [
                {
                    selector: `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_authorbox *`,
                    hasChild: true,
                    render: (value, id) => handleTypography(value, props, id)
                }
            ]
        },
    ];
};