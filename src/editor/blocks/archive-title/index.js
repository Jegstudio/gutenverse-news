import edit from './edit';
import save from './save';
import metadata from './block.json';
import { ArchiveTitleSvg } from '../../../assets/block-icons';
import example from './data/example';

const { name } = metadata;

export { metadata, name };

export const settings = {
    icon: <ArchiveTitleSvg />,
    example,
    edit,
    save,
};
