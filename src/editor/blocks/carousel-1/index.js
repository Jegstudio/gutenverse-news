import edit from './edit';
import save from './save';
import metadata from './block.json';
import { Carousel1Svg } from '../../../assets/block-icons';

const { name } = metadata;

export { metadata, name };

export const settings = {
    icon: <Carousel1Svg />,
    edit,
    save,
};
