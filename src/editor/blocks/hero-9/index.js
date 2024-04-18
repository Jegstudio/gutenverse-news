
import edit from './edit';
import save from './save';
import metadata from './block.json';
import { Hero9Svg } from '../../../assets/block-icons';
import example from './data/example';

const { name } = metadata;

export { metadata, name };

export const settings = {
    icon: <Hero9Svg />,
    example,
    edit,
    save,
};
