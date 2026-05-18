import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import Block29Columns from './Block29Columns';
import LockedBlockModule from '../../part/locked-module';
import { gutenverseProActive } from '../../utils/helper';
import BlockModule from '../../part/module';
import { panelList } from './panels/panel-list';

const Block29Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block: Block29Columns,
        blockWidth: 8,
    };
    const moduleName = '29';
    const iconMappings = [
        { type: 'iconType', svg: 'iconSVG' },
        { type: 'paginationPrevIconType', svg: 'paginationPrevIconSVG' },
        { type: 'paginationNextIconType', svg: 'paginationNextIconSVG' },
    ];
    if (gutenverseProActive) {
        return <BlockModule columnAttr={columnAttr} moduleName={moduleName} iconMappings={iconMappings} {...props} panelList={panelList} />;
    } else {
        return <LockedBlockModule columnAttr={columnAttr} moduleName={moduleName} iconMappings={iconMappings} {...props} />;
    }
});

export default Block29Block;