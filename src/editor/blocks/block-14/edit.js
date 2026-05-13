import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import Block14Columns from './Block14Columns';
import LockedBlockModule from '../../part/locked-module';
import { gutenverseProActive } from '../../utils/helper';
import BlockModule from '../../part/module';
import { panelList } from './panels/panel-list';

const Block14Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block: Block14Columns,
        blockWidth: 12,
    };
    const moduleName = '14';
    const iconMappings = [
        { type: 'iconType', svg: 'iconSVG' },
        { type: 'paginationPrevIconType', svg: 'paginationPrevIconSVG' },
        { type: 'paginationNextIconType', svg: 'paginationNextIconSVG' },
    ];
    if (gutenverseProActive) {
        return <BlockModule
            columnAttr={columnAttr}
            moduleName={moduleName}
            iconMappings={iconMappings} {...props}
            panelList={panelList}
            defaultImageSizeMain={{ height: 1140, width: 570, dimension: 500 }}
            defaultImageSizeSecond={{ height: 360, width: 180, dimension: 500 }}
            mainThumbnailClass={'gvnews_pl_lg_box .gvnews_pl_md_1'}
            secondThumbnailClass={'gvnews_pl_md_1'}
        />;
    } else {
        return <LockedBlockModule columnAttr={columnAttr} moduleName={moduleName} iconMappings={iconMappings} {...props} />;
    }
});

export default Block14Block;