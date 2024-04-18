import { __ } from '@wordpress/i18n';
import { TextControl } from 'gutenverse-core/controls';

export const heroDesignPanel = (props) => {
    const { elementId, heroType } = props;

    return [
        {
            id: 'heroHeightDesktop',
            component: TextControl,
            label: __('Hero Height on Dekstop', 'gutenverse-news'),
            description: __('Height on pixel / px, leave it empty to use the default number.', 'gutenverse-news'),
            show: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', 'skew'].includes(heroType),
        },
        {
            id: 'heroHeight1024',
            component: TextControl,
            label: __('Hero Height on 1024px Width Screen', 'gutenverse-news'),
            description: __('Height on pixel / px, leave it empty to use the default number.', 'gutenverse-news'),
            show: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', 'skew'].includes(heroType),
        },
        {
            id: 'heroHeight768',
            component: TextControl,
            label: __('Hero Height on 768px Width Screen', 'gutenverse-news'),
            description: __('Height on pixel / px, leave it empty to use the default number.', 'gutenverse-news'),
            show: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', 'skew'].includes(heroType),
        },
        {
            id: 'heroHeight667',
            component: TextControl,
            label: __('Hero Height on 667px Width Screen', 'gutenverse-news'),
            description: __('Height on pixel / px, leave it empty to use the default number.', 'gutenverse-news'),
            show: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', 'skew'].includes(heroType),
        },
        {
            id: 'heroHeight568',
            component: TextControl,
            label: __('Hero Height on 568px Width Screen', 'gutenverse-news'),
            description: __('Height on pixel / px, leave it empty to use the default number.', 'gutenverse-news'),
            show: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', 'skew'].includes(heroType),
        },
        {
            id: 'heroHeight480',
            component: TextControl,
            label: __('Hero Height on 480px Width Screen', 'gutenverse-news'),
            description: __('Height on pixel / px, leave it empty to use the default number.', 'gutenverse-news'),
            show: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', 'skew'].includes(heroType),
        },
    ];
};
