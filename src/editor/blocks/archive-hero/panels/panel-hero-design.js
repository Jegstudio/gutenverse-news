import { __ } from '@wordpress/i18n';
import { RangeControl, TextControl } from 'gutenverse-core/controls';

export const heroDesignPanel = (props) => {
    const { elementId, heroType } = props;

    return [
        {
            id: 'heroHeightDesktop',
            label: __('Hero Height on Dekstop', 'gutenverse-news'),
            description: __('Height on pixel / px, leave it empty to use the default number.', 'gutenverse-news'),
            component: RangeControl,
            min: 0,
            max: 2000,
            unit: 'px',
            // show: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', 'skew'].includes(heroType),
        },
        {
            id: 'heroHeight1024',
            label: __('Hero Height on 1024px Width Screen', 'gutenverse-news'),
            description: __('Height on pixel / px, leave it empty to use the default number.', 'gutenverse-news'),
            component: RangeControl,
            min: 0,
            max: 2000,
            unit: 'px',
            // show: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', 'skew'].includes(heroType),
        },
        {
            id: 'heroHeight768',
            label: __('Hero Height on 768px Width Screen', 'gutenverse-news'),
            description: __('Height on pixel / px, leave it empty to use the default number.', 'gutenverse-news'),
            component: RangeControl,
            min: 0,
            max: 2000,
            unit: 'px',
            // show: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', 'skew'].includes(heroType),
        },
        {
            id: 'heroHeight667',
            label: __('Hero Height on 667px Width Screen', 'gutenverse-news'),
            description: __('Height on pixel / px, leave it empty to use the default number.', 'gutenverse-news'),
            component: RangeControl,
            min: 0,
            max: 2000,
            unit: 'px',
            // show: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', 'skew'].includes(heroType),
        },
        {
            id: 'heroHeight568',
            label: __('Hero Height on 568px Width Screen', 'gutenverse-news'),
            description: __('Height on pixel / px, leave it empty to use the default number.', 'gutenverse-news'),
            component: RangeControl,
            min: 0,
            max: 2000,
            unit: 'px',
            // show: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', 'skew'].includes(heroType),
        },
        {
            id: 'heroHeight480',
            label: __('Hero Height on 480px Width Screen', 'gutenverse-news'),
            description: __('Height on pixel / px, leave it empty to use the default number.', 'gutenverse-news'),
            component: RangeControl,
            min: 0,
            max: 2000,
            unit: 'px',
            // show: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', 'skew'].includes(heroType),
        },
    ];
};
