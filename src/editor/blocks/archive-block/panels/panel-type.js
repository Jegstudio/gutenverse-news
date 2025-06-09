import { __ } from '@wordpress/i18n';
import { ImageRadioControl } from 'gutenverse-core/controls';

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
    ];
};