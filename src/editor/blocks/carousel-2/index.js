import edit from './edit';
import save from './save';
import metadata from './block.json';
import { Carousel2Svg } from '../../../assets/block-icons';

const { name } = metadata;

export { metadata, name };

export const settings = {
    icon: <Carousel2Svg />,
    edit,
    save,
};
