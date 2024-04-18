
import edit from './edit';
import save from './save';
import metadata from './block.json';
import { Block9BlockSvg } from '../../../assets/block-icons';
import example from './data/example';

const { name } = metadata;

export { metadata, name };

export const settings = {
    icon: <Block9BlockSvg />,
    example,
    edit,
    save,
};