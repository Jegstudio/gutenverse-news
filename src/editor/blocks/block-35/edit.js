import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import Block35Columns from './Block35Columns';
import LockedBlockModule from '../../part/locked-module';
import { gutenverseProActive } from '../../utils/helper';
import BlockModule from '../../part/module';
import { panelList } from './panels/panel-list';
import dedicatedStyle from './styles/block-style';

const Block35Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block: Block35Columns,
        blockWidth: 12,
    };
    const moduleName = '35';
    if (gutenverseProActive) {
        return <BlockModule
            columnAttr={columnAttr}
            moduleName={moduleName}
            {...props}
            panelList={panelList}
            defaultImageSizeMain={{ height: 350, width: 350, dimension: 1000, class: 'default' }}
            useDedicatedStyle={true}
            dedicatedStyle={dedicatedStyle}
            isMasonry={true}
        />;
    } else {
        return <LockedBlockModule columnAttr={columnAttr} moduleName={moduleName} {...props} />;
    }
});

export default Block35Block;