import { getBlockType, registerBlockType } from '@wordpress/blocks';
import { isBlockActive } from 'gutenverse-core/helper';
import { updateBlockList } from 'gutenverse-core/editor-helper';
import { gutenverseProActive } from './utils/helper';

const registerBlocks = () => {
    const r = require.context('./blocks', true, /index\.js$/);

    r.keys().forEach(key => {
        const { settings, name, metadata } = r(key);
        const data = getData(metadata);
        name && !isDeprecated(data) && updateBlockList({ name, settings, data });

        if (window?.GutenverseConfig && name && !getBlockType(name) && isBlockActive(name)) {
            registerBlockType(name, {
                ...settings,
                ...data
            });
        }
    });
};

const getData = (metadata) => {
    if (metadata?.supports?.inserter === false) {
        if (gutenverseProActive) {
            return metadata.supports.inserter = true;
        }
    }
    return metadata;
}

const isDeprecated = (metadata) => {
    if (metadata?.supports?.inserter === false) {
        return true;
    }
    return false;
}

(() => {
    registerBlocks();
})();
