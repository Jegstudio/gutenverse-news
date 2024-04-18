import { __ } from '@wordpress/i18n';
import { SelectControl, CheckboxControl } from 'gutenverse-core/controls';

export const generalPanel = (props) => {
    const {
        elementId,
    } = props;

    return [
        {
            'id': 'paginationMode',
            'component': SelectControl,
            'label': __( 'Pagination Mode', 'gutenverse-news' ),
            'description': __( 'Choose which pagination mode that fit with your block.', 'gutenverse-news' ),
            'options': [
                {
                    'value': 'nav_1',
                    'label': __( 'Normal - Navigation 1', 'gutenverse-news' )
                },
                {
                    'value': 'nav_2',
                    'label': __( 'Normal - Navigation 2', 'gutenverse-news' )
                },
                {
                    'value': 'nav_3',
                    'label': __( 'Normal - Navigation 3', 'gutenverse-news' )
                }
            ]
        },
        {
            'id': 'paginationAlign',
            'component': SelectControl,
            'label': __( 'Pagination Align', 'gutenverse-news' ),
            'description': __( 'Choose pagination alignment.', 'gutenverse-news' ),
            'options': [
                {
                    'value': 'left',
                    'label': __( 'Left', 'gutenverse-news' )
                },
                {
                    'value': 'center',
                    'label': __( 'Center', 'gutenverse-news' )
                }
            ]
        },
        {
            'id': 'paginationNavtext',
            'component': CheckboxControl,
            'label': __( 'Show Navigation Text', 'gutenverse-news' )
        },
        {
            'id': 'paginationPageinfo',
            'component': CheckboxControl,
            'label': __( 'Show Page Info', 'gutenverse-news' )
        }
    ];
};