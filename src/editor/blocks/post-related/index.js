
import edit from './edit';
import save from './save';
import metadata from './block.json';
import { PostRelatedSvg } from '../../../assets/block-icons';
import example from './data/example';

const { name } = metadata;

export { metadata, name };

export const settings = {
    icon: <PostRelatedSvg />,
    example,
    edit,
    save,
};
