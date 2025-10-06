import { getBlockType, registerBlockType } from '@wordpress/blocks';
import { isBlockActive } from 'gutenverse-core/helper';
import { updateBlockList } from 'gutenverse-core/editor-helper';
import { gutenverseProActive } from './utils/helper';
import { loadUpgradeNotice } from './upgrade-notice/notice';
import { addFilter } from '@wordpress/hooks';
import { plainGeneratorFunction } from './utils/styling-util';

const registerBlocks = () => {
    const r = require.context('./blocks', true, /index\.js$/);
    r.keys().forEach(key => {
        const { settings, name } = r(key);
        let { metadata } = r(key);
        metadata = getData(metadata);

        name && !isDeprecated(metadata) && updateBlockList({ name, settings, metadata }, (metadata?.gutenversePro === true));
        if (window?.GutenverseConfig && name && !getBlockType(name) && isBlockActive(name)) {
            registerBlockType(name, {
                ...settings,
                ...metadata
            });
        }
    });
};

const getData = (metadata) => {
    if (metadata?.supports?.inserter === false && !metadata.gvnewsRemoved) {
        if (gutenverseProActive) {
            metadata.supports.inserter = true;
            metadata.gutenversePro = true;
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
    addFilter(
        'gutenverse-css-generator-plain-function',
        'gutenverse/css/generator/plain/function',
        (value, props) => plainGeneratorFunction(value, props)
    );
    registerBlocks();
    loadUpgradeNotice();
})();


