import { __ } from '@wordpress/i18n';
import { NumberControl } from 'gutenverse-core/controls';

export const designHero = (props) => {
    const {
    } = props;
    return [
        {
            id: 'heightDesktop',
            label: __('Hero Height on Dekstop', 'gutenverse-news'),
            description: __('Height on pixel / px, leave it empty to use the default number.', 'gutenverse-news'),
            component: NumberControl,
        },
        {
            id: 'height1024',
            label: __('Hero Height on 1024px Width Screen', 'gutenverse-news'),
            description: __('Height on pixel / px, leave it empty to use the default number.', 'gutenverse-news'),
            component: NumberControl,
        },
        {
            id: 'height768',
            label: __('Hero Height on 768px Width Screen', 'gutenverse-news'),
            description: __('Height on pixel / px, leave it empty to use the default number.', 'gutenverse-news'),
            component: NumberControl,
        },
        {
            id: 'height667',
            label: __('Hero Height on 667px Width Screen', 'gutenverse-news'),
            description: __('Height on pixel / px, leave it empty to use the default number.', 'gutenverse-news'),
            component: NumberControl,
        },
        {
            id: 'height568',
            label: __('Hero Height on 568px Width Screen', 'gutenverse-news'),
            description: __('Height on pixel / px, leave it empty to use the default number.', 'gutenverse-news'),
            component: NumberControl,
        },
        {
            id: 'height480',
            label: __('Hero Height on 480px Width Screen', 'gutenverse-news'),
            description: __('Height on pixel / px, leave it empty to use the default number.', 'gutenverse-news'),
            component: NumberControl,
        },
    ];
};