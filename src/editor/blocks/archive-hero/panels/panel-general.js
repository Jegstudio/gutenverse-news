import { __ } from '@wordpress/i18n';
import { TextControl, CheckboxControl, ImageRadioControl, RangeControl, SelectControl } from 'gutenverse-core/controls';

export const generalPanel = (props) => {
    const { elementId, heroType, dateFormat } = props;

    const { imgDir } = window['GVNewsConfig'];

    return [
        {
            id: 'heroType',
            component: ImageRadioControl,
            label: __('Hero Type', 'gutenverse-news'),
            description: __('Choose which hero type that fit your content design.', 'gutenverse-news'),
            options: [
                {
                    value: '1',
                    image: <img src={`${imgDir}/hero-type-1.png`} />,
                },
                {
                    value: '2',
                    image: <img src={`${imgDir}/hero-type-2.png`} />,
                },
                {
                    value: '3',
                    image: <img src={`${imgDir}/hero-type-3.png`} />,
                },
                {
                    value: '4',
                    image: <img src={`${imgDir}/hero-type-4.png`} />,
                },
                {
                    value: '5',
                    image: <img src={`${imgDir}/hero-type-5.png`} />,
                },
                {
                    value: '6',
                    image: <img src={`${imgDir}/hero-type-6.png`} />,
                },
                {
                    value: '7',
                    image: <img src={`${imgDir}/hero-type-7.png`} />,
                },
                {
                    value: '8',
                    image: <img src={`${imgDir}/hero-type-8.png`} />,
                },
                {
                    value: '9',
                    image: <img src={`${imgDir}/hero-type-9.png`} />,
                },
                {
                    value: '10',
                    image: <img src={`${imgDir}/hero-type-10.png`} />,
                },
                {
                    value: '11',
                    image: <img src={`${imgDir}/hero-type-11.png`} />,
                },
                {
                    value: '12',
                    image: <img src={`${imgDir}/hero-type-12.png`} />,
                },
                {
                    value: '13',
                    image: <img src={`${imgDir}/hero-type-13.png`} />,
                },
                {
                    value: 'skew',
                    image: <img src={`${imgDir}/hero-type-Skew.png`} />,
                },
            ],
        },
        {
            id: 'heroStyle',
            component: ImageRadioControl,
            label: __('Hero Style', 'gutenverse-news'),
            description: __('Choose which hero style that fit your content design.', 'gutenverse-news'),
            show: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', 'skew'].includes(heroType),
            options: [
                {
                    image: <img src={`${imgDir}/hero-1.png`} />,
                    value: '1',
                },
                {
                    image: <img src={`${imgDir}/hero-2.png`} />,
                    value: '2',
                },
                {
                    image: <img src={`${imgDir}/hero-3.png`} />,
                    value: '3',
                },
                {
                    image: <img src={`${imgDir}/hero-4.png`} />,
                    value: '4',
                },
                {
                    image: <img src={`${imgDir}/hero-5.png`} />,
                    value: '5',
                },
                {
                    image: <img src={`${imgDir}/hero-6.png`} />,
                    value: '6',
                },
                {
                    image: <img src={`${imgDir}/hero-7.png`} />,
                    value: '7',
                },
            ],
        },
        {
            id: 'heroMargin',
            component: RangeControl,
            label: __('Hero Margin', 'gutenverse-news'),
            min: 0,
            max: 30,
            step: 1,
            description: __('Margin of each hero element.', 'gutenverse-news'),
            show: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', 'skew'].includes(heroType),
        },
        {
            id: 'dateFormat',
            component: SelectControl,
            label: __('Choose Date Format', 'gutenverse-news'),
            description: 'Choose which date format you want to use.',
            show: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', 'skew'].includes(heroType),
            options: [
                {
                    value: 'ago',
                    label: __('Relative Date/Time Format (ago)', 'gutenverse-news'),
                },
                {
                    value: 'default',
                    label: __('WordPress Default Format', 'gutenverse-news'),
                },
                {
                    value: 'custom',
                    label: __('Custom Format', 'gutenverse-news'),
                },
            ],
        },
        {
            id: 'dateFormatCustom',
            component: TextControl,
            label: __('Custom Date Format', 'gutenverse-news'),
            description: __(
                'Please write custom date format for your module, for more detail about how to write date format, you can refer to this <a href="https://codex.wordpress.org/Formatting_Date_and_Time" target="_blank">link</a>.'
            ),
            show: 'custom' === dateFormat,
        },
        {
            id: 'firstPage',
            component: CheckboxControl,
            label: __('Only First Page', 'gutenverse-news'),
            description: __('Enable this option if you want to show this hero only on the first page.', 'gutenverse-news'),
        },
    ];
};
