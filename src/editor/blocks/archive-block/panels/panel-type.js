import { __ } from '@wordpress/i18n';
import { ImageRadioControl } from 'gutenverse-core/controls';
import { gutenverseProActive } from '../../../utils/helper';

export const panelType = () => {

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
                    image: <img src={`${imgDir}/content-12.png`} />,
                    pro: true,
                    minTier: 'professional'
                },
                {
                    value: '11',
                    image: <img src={`${imgDir}/content-13.png`} />,
                    pro: true,
                    minTier: 'professional'
                },
                {
                    value: '12',
                    image: <img src={`${imgDir}/content-14.png`} />,
                    pro: true,
                    minTier: 'professional'
                },
                {
                    value: '14',
                    image: <img src={`${imgDir}/content-16.png`} />,
                    pro: true,
                    minTier: 'professional'
                },
                {
                    value: '15',
                    image: <img src={`${imgDir}/content-17.png`} />,
                    pro: true,
                    minTier: 'professional'
                },
                {
                    value: '18',
                    image: <img src={`${imgDir}/content-19.png`} />,
                    pro: true,
                    minTier: 'professional'
                },
                {
                    value: '22',
                    image: <img src={`${imgDir}/content-22.png`} />,
                    pro: true,
                    minTier: 'professional'
                },
                {
                    value: '23',
                    image: <img src={`${imgDir}/content-23.png`} />,
                    pro: true,
                    minTier: 'professional'
                },
                {
                    value: '25',
                    image: <img src={`${imgDir}/content-25.png`} />,
                    pro: true,
                    minTier: 'professional'
                },
                {
                    value: '26',
                    image: <img src={`${imgDir}/content-26.png`} />,
                    pro: true,
                    minTier: 'professional'
                },
                {
                    value: '27',
                    image: <img src={`${imgDir}/content-27.png`} />,
                    pro: true,
                    minTier: 'professional'
                },
                {
                    value: '32',
                    image: <img src={`${imgDir}/content-32.png`} />,
                    pro: true,
                    minTier: 'professional'
                },
                {
                    value: '33',
                    image: <img src={`${imgDir}/content-33.png`} />,
                    pro: true,
                    minTier: 'professional'
                },
                {
                    value: '34',
                    image: <img src={`${imgDir}/content-34.png`} />,
                    pro: true,
                    minTier: 'professional'
                },
                {
                    value: '35',
                    image: <img src={`${imgDir}/content-35.png`} />,
                    pro: true,
                    minTier: 'professional'
                },
                {
                    value: '36',
                    image: <img src={`${imgDir}/content-36.png`} />,
                    pro: true,
                    minTier: 'professional'
                },
                {
                    value: '37',
                    image: <img src={`${imgDir}/content-37.png`} />,
                    pro: true,
                    minTier: 'professional'
                },
                {
                    value: '38',
                    image: <img src={`${imgDir}/content-38.png`} />,
                    pro: true,
                    minTier: 'professional'
                },
                {
                    value: '39',
                    image: <img src={`${imgDir}/content-39.png`} />,
                    pro: true,
                    minTier: 'professional'
                },
            ],
        },
    ];
};