
import edit from './edit';
import save from './save';
import metadata from './block.json';
import { Block31BlockSvg } from '../../../assets/block-icons';
import example from './data/example';

const { name } = metadata;

export { metadata, name };

export const settings = {
    icon: <Block31BlockSvg />,
    example,
    edit,
    save,
};
