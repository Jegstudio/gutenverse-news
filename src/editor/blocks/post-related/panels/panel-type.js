import { __ } from '@wordpress/i18n';
import { ImageRadioControl } from 'gutenverse-core/controls';

export const panelType = () => {

    const { imgDir } = window['GVNewsConfig'];
    return [
        {
            id: 'templateType',
            label: __('Related Post Template', 'gutenverse-news'),
            description: __('Choose your related post template.', 'gutenverse-news'),
            component: ImageRadioControl,
            options: [
                {
                    image: <img src={`${imgDir}/content-1.png`} />,
                    value: 'template_1'
                },
                {
                    image: <img src={`${imgDir}/content-2.png`} />,
                    value: 'template_2'
                },
                {
                    image: <img src={`${imgDir}/content-3.png`} />,
                    value: 'template_3'
                },
                {
                    image: <img src={`${imgDir}/content-4.png`} />,
                    value: 'template_4'
                },
                {
                    image: <img src={`${imgDir}/content-5.png`} />,
                    value: 'template_5'
                },
                {
                    image: <img src={`${imgDir}/content-6.png`} />,
                    value: 'template_6'
                },
                {
                    image: <img src={`${imgDir}/content-7.png`} />,
                    value: 'template_7'
                },
                {
                    image: <img src={`${imgDir}/content-8.png`} />,
                    value: 'template_8'
                },
                {
                    image: <img src={`${imgDir}/content-9.png`} />,
                    value: 'template_9'
                },
                {
                    image: <img src={`${imgDir}/content-10.png`} />,
                    value: 'template_17',
                },
                {
                    image: <img src={`${imgDir}/content-11.png`} />,
                    value: 'template_21',
                },
                {
                    image: <img src={`${imgDir}/content-12.png`} />,
                    value: 'template_10',
                    pro: true,
                    minTier: 'professional'
                },
                {
                    image: <img src={`${imgDir}/content-13.png`} />,
                    value: 'template_11',
                    pro: true,
                    minTier: 'professional'
                },
                {
                    image: <img src={`${imgDir}/content-14.png`} />,
                    value: 'template_12',
                    pro: true,
                    minTier: 'professional'
                },
                {
                    image: <img src={`${imgDir}/content-15.png`} />,
                    value: 'template_13',
                    pro: true,
                    minTier: 'professional'
                },
                {
                    image: <img src={`${imgDir}/content-16.png`} />,
                    value: 'template_14',
                    pro: true,
                    minTier: 'professional'
                },
                {
                    image: <img src={`${imgDir}/content-17.png`} />,
                    value: 'template_15',
                    pro: true,
                    minTier: 'professional'
                },
                {
                    image: <img src={`${imgDir}/content-18.png`} />,
                    value: 'template_16',
                    pro: true,
                    minTier: 'professional'
                },
                {
                    image: <img src={`${imgDir}/content-19.png`} />,
                    value: 'template_18',
                    pro: true,
                    minTier: 'professional'
                },
                {
                    image: <img src={`${imgDir}/content-20.png`} />,
                    value: 'template_19',
                    pro: true,
                    minTier: 'professional'
                },
                {
                    image: <img src={`${imgDir}/content-21.png`} />,
                    value: 'template_20',
                    pro: true,
                    minTier: 'professional'
                },
                {
                    image: <img src={`${imgDir}/content-22.png`} />,
                    value: 'template_22',
                    pro: true,
                    minTier: 'professional'
                },
                {
                    image: <img src={`${imgDir}/content-23.png`} />,
                    value: 'template_23',
                    pro: true,
                    minTier: 'professional'
                },
                {
                    image: <img src={`${imgDir}/content-24.png`} />,
                    value: 'template_24',
                    pro: true,
                    minTier: 'professional'
                },
                {
                    image: <img src={`${imgDir}/content-25.png`} />,
                    value: 'template_25',
                    pro: true,
                    minTier: 'professional'
                },
                {
                    image: <img src={`${imgDir}/content-26.png`} />,
                    value: 'template_26',
                    pro: true,
                    minTier: 'professional'
                },
                {
                    image: <img src={`${imgDir}/content-27.png`} />,
                    value: 'template_27',
                    pro: true,
                    minTier: 'professional'
                },
            ],
        },
    ]
};