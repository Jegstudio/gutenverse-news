import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import Block13Columns from './Block13Columns';
import LockedBlockModule from '../../part/locked-module';
import { gutenverseProActive } from '../../utils/helper';
import BlockModule from '../../part/module';
import { panelList } from './panels/panel-list';

const Block13Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block: Block13Columns,
        blockWidth: 12,
    };
    const moduleName = '13';
    if (gutenverseProActive) {
        return <BlockModule
            columnAttr={columnAttr}
            moduleName={moduleName}
            {...props}
            panelList={panelList}
            defaultImageSizeMain={{ height: 360, width: 504, dimension: 1400 }}
            defaultImageSizeSecond={{ height: 350, width: 250, dimension: 715 }}
            mainThumbnailClass={'gvnews_pl_lg_1'}
            secondThumbnailClass={'gvnews_pl_md_1'}
        />;
    } else {
        return <LockedBlockModule columnAttr={columnAttr} moduleName={moduleName} {...props} />;
    }

});

export default Block13Block;