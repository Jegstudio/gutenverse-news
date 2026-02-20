import { getBlockType, registerBlockType } from '@wordpress/blocks';
import { isBlockActive } from 'gutenverse-core/helper';
import { updateBlockList } from 'gutenverse-core/editor-helper';
import { gutenverseProActive } from './utils/helper';
import { loadUpgradeNotice } from './upgrade-notice/notice';
import { addFilter } from '@wordpress/hooks';
import { plainGeneratorFunction } from './utils/styling-util';

const registerBlocks = () => {
    const r = require.context('./blocks', true, /index\.js$/);
    let blockLists = [];
    r.keys().forEach(key => {

        const mod = r(key);
        const { settings, name } = mod;
        const rawMeta = mod.metadata;
        const metadata = getData(rawMeta);

        name && !isDeprecated(metadata) && updateBlockList({ name, settings, metadata }, (metadata?.gutenversePro === true));
        if (window?.GutenverseConfig && name && !getBlockType(name) && isBlockActive(name)) {
            blockLists.push({ name, settings, metadata, title: metadata.title });
        }
    });
    blockLists
        .sort((first, second) => {
            const tFirst = first?.title ?? '';
            const tSecond = second?.title ?? '';
            return tFirst.localeCompare(tSecond, undefined, {
                numeric: true,
                sensitivity: 'base'
            });
        })
        .forEach(block => {
            registerBlockType(block.name, {
                ...block.settings,
                ...block.metadata
            });
        });
};

const getData = (metadata) => {
    if (!metadata.gvnewsRemoved) {
        if (gutenverseProActive) {
            metadata.supports.inserter = true;
            metadata.tier = ['professional', 'personal'];
            metadata.min_tier = 'professional';

        }
    }
    return metadata;
}

const isDeprecated = (metadata) => {
    if (metadata?.gvnewsRemoved === true) {
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


