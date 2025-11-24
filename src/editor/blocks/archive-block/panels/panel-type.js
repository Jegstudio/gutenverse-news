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
                    deprecated: !gutenverseProActive,
                    pro: gutenverseProActive
                },
                {
                    value: '11',
                    image: <img src={`${imgDir}/content-13.png`} />,
                    deprecated: !gutenverseProActive,
                    pro: gutenverseProActive
                },
                {
                    value: '12',
                    image: <img src={`${imgDir}/content-14.png`} />,
                    deprecated: !gutenverseProActive,
                    pro: gutenverseProActive
                },
                {
                    value: '14',
                    image: <img src={`${imgDir}/content-16.png`} />,
                    deprecated: !gutenverseProActive,
                    pro: gutenverseProActive
                },
                {
                    value: '15',
                    image: <img src={`${imgDir}/content-17.png`} />,
                    deprecated: !gutenverseProActive,
                    pro: gutenverseProActive
                },
                {
                    value: '18',
                    image: <img src={`${imgDir}/content-19.png`} />,
                    deprecated: !gutenverseProActive,
                    pro: gutenverseProActive
                },
                {
                    value: '22',
                    image: <img src={`${imgDir}/content-22.png`} />,
                    deprecated: !gutenverseProActive,
                    pro: gutenverseProActive
                },
                {
                    value: '23',
                    image: <img src={`${imgDir}/content-23.png`} />,
                    deprecated: !gutenverseProActive,
                    pro: gutenverseProActive
                },
                {
                    value: '25',
                    image: <img src={`${imgDir}/content-25.png`} />,
                    deprecated: !gutenverseProActive,
                    pro: gutenverseProActive
                },
                {
                    value: '26',
                    image: <img src={`${imgDir}/content-26.png`} />,
                    deprecated: !gutenverseProActive,
                    pro: gutenverseProActive
                },
                {
                    value: '27',
                    image: <img src={`${imgDir}/content-27.png`} />,
                    deprecated: !gutenverseProActive,
                    pro: gutenverseProActive
                },
                {
                    value: '32',
                    image: <img src={`${imgDir}/content-32.png`} />,
                    deprecated: !gutenverseProActive,
                    pro: gutenverseProActive
                },
                {
                    value: '33',
                    image: <img src={`${imgDir}/content-33.png`} />,
                    deprecated: !gutenverseProActive,
                    pro: gutenverseProActive
                },
                {
                    value: '34',
                    image: <img src={`${imgDir}/content-34.png`} />,
                    deprecated: !gutenverseProActive,
                    pro: gutenverseProActive
                },
                {
                    value: '35',
                    image: <img src={`${imgDir}/content-35.png`} />,
                    deprecated: !gutenverseProActive,
                    pro: gutenverseProActive
                },
                {
                    value: '36',
                    image: <img src={`${imgDir}/content-36.png`} />,
                    deprecated: !gutenverseProActive,
                    pro: gutenverseProActive
                },
                {
                    value: '37',
                    image: <img src={`${imgDir}/content-37.png`} />,
                    deprecated: !gutenverseProActive,
                    pro: gutenverseProActive
                },
                {
                    value: '38',
                    image: <img src={`${imgDir}/content-38.png`} />,
                    deprecated: !gutenverseProActive,
                    pro: gutenverseProActive
                },
                {
                    value: '39',
                    image: <img src={`${imgDir}/content-39.png`} />,
                    deprecated: !gutenverseProActive,
                    pro: gutenverseProActive
                },
            ],
        },
    ];
};