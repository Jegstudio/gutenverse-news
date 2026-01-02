import { __ } from '@wordpress/i18n';
import { ImageRadioControl } from 'gutenverse-core/controls';


export const typePanel = (props) => {
    const {
        heroType
    } = props;

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
                    pro: true,
                    minTier: 'professional'
                },
                {
                    value: '7',
                    image: <img src={`${imgDir}/hero-type-7.png`} />,
                    pro: true,
                    minTier: 'professional'
                },
                {
                    value: '8',
                    image: <img src={`${imgDir}/hero-type-8.png`} />,
                    pro: true,
                    minTier: 'professional'
                },
                {
                    value: '9',
                    image: <img src={`${imgDir}/hero-type-9.png`} />,
                    pro: true,
                    minTier: 'professional'
                },
                {
                    value: '10',
                    image: <img src={`${imgDir}/hero-type-10.png`} />,
                    pro: true,
                    minTier: 'professional'
                },
                {
                    value: '11',
                    image: <img src={`${imgDir}/hero-type-11.png`} />,
                    pro: true,
                    minTier: 'professional'
                },
                {
                    value: '12',
                    image: <img src={`${imgDir}/hero-type-12.png`} />,
                    pro: true,
                    minTier: 'professional'
                },
                {
                    value: '13',
                    image: <img src={`${imgDir}/hero-type-13.png`} />,
                    pro: true,
                    minTier: 'professional'
                },
                {
                    value: 'skew',
                    image: <img src={`${imgDir}/hero-type-Skew.png`} />,
                    pro: true,
                    minTier: 'professional'
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
    ];
};