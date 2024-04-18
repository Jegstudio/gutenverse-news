import edit from './edit';
import save from './save';
import metadata from './block.json';
import { Slider8Svg } from '../../../assets/block-icons';
import example from './data/example';

const { name } = metadata;

export { metadata, name };

export const settings = {
    icon: <Slider8Svg />,
    example,
    edit,
    save,
};
