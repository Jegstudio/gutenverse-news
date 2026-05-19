import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import Block39Columns from './Block39Columns';
import LockedBlockModule from '../../part/locked-module';
import { gutenverseProActive } from '../../utils/helper';
import BlockModule from '../../part/module';
import { panelList } from './panels/panel-list';

const Block39Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block: Block39Columns,
        blockWidth: 12,
    };
    const moduleName = '39';
    const iconMappings = [
        { type: 'iconType', svg: 'iconSVG' },
        { type: 'paginationPrevIconType', svg: 'paginationPrevIconSVG' },
        { type: 'paginationNextIconType', svg: 'paginationNextIconSVG' },
        { type: 'galleryFormatIconType', svg: 'galleryFormatIconSVG' },
        { type: 'videoFormatIconType', svg: 'videoFormatIconSVG' },
    ];
    if (gutenverseProActive) {
        return <BlockModule
            columnAttr={columnAttr}
            moduleName={moduleName}
            iconMappings={iconMappings} {...props}
            panelList={panelList}
            defaultImageSizeMain={{ height: 360, width: 180, dimension: 500, class: 'default' }}
            mainThumbnailClass={'gvnews_pl_md_1'}
        />;
    } else {
        return <LockedBlockModule columnAttr={columnAttr} moduleName={moduleName} iconMappings={iconMappings} {...props} />;
    }
});

export default Block39Block;