
import edit from './edit';
import save from './save';
import metadata from './block.json';
import { Hero4Svg } from '../../../assets/block-icons';
import example from './data/example';

const { name } = metadata;

export { metadata, name };

export const settings = {
    icon: <Hero4Svg />,
    example,
    edit,
    save,
};
