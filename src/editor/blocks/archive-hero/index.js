import edit from './edit';
import save from './save';
import jsondata from './block.json';
import { ArchiveHeroSvg } from '../../../assets/block-icons';
import example from './data/example';

const { name, attributes } = jsondata;
const heroType = [1,2,3,4,5,6,7];
const overrideOverlay = {};

Object.keys(attributes).forEach((value) => {
    if ( value.indexOf('__i__') > -1 ) {
        heroType.map(type => {
            overrideOverlay[value.replace('__i__', type)] = attributes[value];
        });
        delete attributes[value];
    }
});
const metadata = {
    ...jsondata,
    attributes: {
        ...attributes,
        ...overrideOverlay
    }
};

export { metadata, name };

export const settings = {
    icon: <ArchiveHeroSvg />,
    example,
    edit,
    save,
};
