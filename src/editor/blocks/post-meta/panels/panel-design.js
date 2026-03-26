import { __ } from '@wordpress/i18n';
import { CheckboxControl } from 'gutenverse-core/controls';
import { isNotEmpty } from 'gutenverse-core/helper';

export const designPanel = (props) => {

    const {
        metaLeft,
        metaRight,
    } = props;
    const allMeta = [
        ...(isNotEmpty(metaLeft) ? metaLeft : []),
        ...(isNotEmpty(metaRight) ? metaRight : []),
    ];

    let withAuthor = false;
    let withDate = false;
    let withCategory = false;
    let withComment = false;

    for (let i = 0; i < allMeta.length; i++) {
        switch (allMeta[i].value) {
            case 'author': withAuthor = true; break;
            case 'date': withDate = true; break;
            case 'category': withCategory = true; break;
            case 'comment': withComment = true; break;
        }
    }

    return [
        {
            id: 'forceColumnLeft',
            label: __('Meta Left 1 Column', 'gutenverse-news'),
            description: __('Enable this option to display all left meta on 1 column on mobile device', 'gutenverse-news'),
            component: CheckboxControl,
        },
        {
            id: 'forceColumnRight',
            label: __('Meta Right 1 Column', 'gutenverse-news'),
            description: __('Enable this option to display all right meta on 1 column on mobile device', 'gutenverse-news'),
            component: CheckboxControl,
        },
        {
            id: 'authorHideMobile',
            label: __('Hide Author on Mobile', 'gutenverse-news'),
            component: CheckboxControl,
            show: withAuthor,
        },
        {
            id: 'dateHideMobile',
            label: __('Hide Date on Mobile', 'gutenverse-news'),
            component: CheckboxControl,
            show: withDate,
        },
        {
            id: 'categoryHideMobile',
            label: __('Hide Category on Mobile', 'gutenverse-news'),
            component: CheckboxControl,
            show: withCategory,
        },
        {
            id: 'commentHideMobile',
            label: __('Hide Comment on Mobile', 'gutenverse-news'),
            component: CheckboxControl,
            show: withComment,
        }

    ];

};
