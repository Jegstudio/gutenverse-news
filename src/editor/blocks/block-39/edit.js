import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import Block39Columns from './Block39Columns';
import DeprecatedBlockModule from '../../part/deprecated-module';
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
    if (gutenverseProActive) {
        return <BlockModule columnAttr={columnAttr} moduleName={moduleName} {...props} panelList={panelList} />;
    } else {
        return <DeprecatedBlockModule columnAttr={columnAttr} moduleName={moduleName} {...props} />;
    }
});

export default Block39Block;