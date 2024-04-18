import { __ } from '@wordpress/i18n';
import { TextControl, CheckboxControl, ImageRadioControl, RangeControl, SelectControl } from 'gutenverse-core/controls';

export const generalPanel = (props) => {
    const { elementId, heroType, dateFormat } = props;

    const { imgDir } = window['GVNewsConfig'];

    return [
        {
            id: 'blockType',
            component: ImageRadioControl,
            label: __('Block Type', 'gutenverse-news'),
            description: __('Choose which block type that fit your content design.', 'gutenverse-news'),
            options: [
                {
                    value: '3',
                    image: <img src={`${imgDir}/content-3.png`} />
                },
                {
                    value: '4',
                    image: <img src={`${imgDir}/content-4.png`} />
                },
                {
                    value: '5',
                    image: <img src={`${imgDir}/content-5.png`} />
                },
                {
                    value: '6',
                    image: <img src={`${imgDir}/content-6.png`} />
                },
                {
                    value: '7',
                    image: <img src={`${imgDir}/content-7.png`} />
                },
                {
                    value: '9',
                    image: <img src={`${imgDir}/content-9.png`} />
                },
                {
                    value: '10',
                    image: <img src={`${imgDir}/content-10.png`} />
                },
                {
                    value: '11',
                    image: <img src={`${imgDir}/content-11.png`} />
                },
                {
                    value: '12',
                    image: <img src={`${imgDir}/content-12.png`} />
                },
                {
                    value: '14',
                    image: <img src={`${imgDir}/content-14.png`} />
                },
                {
                    value: '15',
                    image: <img src={`${imgDir}/content-15.png`} />
                },
                {
                    value: '18',
                    image: <img src={`${imgDir}/content-18.png`} />
                },
                {
                    value: '22',
                    image: <img src={`${imgDir}/content-22.png`} />
                },
                {
                    value: '23',
                    image: <img src={`${imgDir}/content-23.png`} />
                },
                {
                    value: '25',
                    image: <img src={`${imgDir}/content-25.png`} />
                },
                {
                    value: '26',
                    image: <img src={`${imgDir}/content-26.png`} />
                },
                {
                    value: '27',
                    image: <img src={`${imgDir}/content-27.png`} />
                },
                {
                    value: '32',
                    image: <img src={`${imgDir}/content-32.png`} />
                },
                {
                    value: '33',
                    image: <img src={`${imgDir}/content-33.png`} />
                },
                {
                    value: '34',
                    image: <img src={`${imgDir}/content-34.png`} />
                },
                {
                    value: '35',
                    image: <img src={`${imgDir}/content-35.png`} />
                },
                {
                    value: '36',
                    image: <img src={`${imgDir}/content-36.png`} />
                },
                {
                    value: '37',
                    image: <img src={`${imgDir}/content-37.png`} />
                },
                {
                    value: '38',
                    image: <img src={`${imgDir}/content-38.png`} />
                },
                {
                    value: '39',
                    image: <img src={`${imgDir}/content-39.png`} />
                },
            ],
        },
        {
            id: 'numberPost',
            component: RangeControl,
            label: __('Number of post', 'gutenverse-news'),
            min: 1,
            max: 100,
            step: 1,
            description: __('Set number of post for this block.', 'gutenverse-news'),
        },
        {
            id: 'boxed',
            component: CheckboxControl,
            label: __('Enable Boxed', 'gutenverse-news'),
            description: __('', 'gutenverse-news'),
        },
        {
            id: 'boxedShadow',
            component: CheckboxControl,
            label: __('Enable Shadow', 'gutenverse-news'),
            description: __('Enable excerpt ellipsis', 'gutenverse-news'),
        },
        {
            id: 'excerptLength',
            component: RangeControl,
            label: __('Excerpt Length', 'gutenverse-news'),
            min: 0,
            max: 200,
            step: 1,
            description: __('Set word length of excerpt on post block.', 'gutenverse-news'),
        },
        {
            id: 'excerptEllipsis',
            component: TextControl,
            label: __('Excerpt Ellipsis', 'gutenverse-news'),
            description: __('Define excerpt ellipsis', 'gutenverse-news'),
        },
        {
            id: 'dateFormat',
            component: SelectControl,
            label: __('Content Date Format', 'gutenverse-news'),
            description: __('Choose which date format you want to use.', 'gutenverse-news'),
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
                'Please write custom date format for your module, for more detail about how to write date format, you can refer to this <a href="https://codex.wordpress.org/Formatting_Date_and_Time" target="_blank">link</a>.',
                'gutenverse-news'
            ),
        },
        {
            id: 'firstPage',
            component: CheckboxControl,
            label: __('Only First Page', 'gutenverse-news'),
            description: __('Enable this option if you want to show this block only on the first page.', 'gutenverse-news'),
        },
    ];
};
