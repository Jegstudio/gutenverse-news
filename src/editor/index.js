import { getBlockType, registerBlockType } from '@wordpress/blocks';
import { isBlockActive } from 'gutenverse-core/helper';
import { updateBlockList } from 'gutenverse-core/editor-helper';

const registerBlocks = () => {
    const r = require.context('./blocks', true, /index\.js$/);

    r.keys().forEach(key => {
        const { settings, metadata, name } = r(key);

        name && !isDeprecated(metadata) && updateBlockList({ name, settings, metadata });

        if (window?.GutenverseConfig && name && !getBlockType(name) && isBlockActive(name)) {
            registerBlockType(name, {
                ...settings,
                ...metadata
            });
        }
    });
};

const isDeprecated = (metadata) => {
    if (metadata?.supports?.inserter === false) {
        return true;
    }
    return false;
}

(() => {
    registerBlocks();
})();
