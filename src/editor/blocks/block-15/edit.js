import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import Block15Columns from './Block15Columns';
import DeprecatedBlockModule from '../../part/deprecated-module';
import { gutenverseProActive } from '../../utils/helper';
import BlockModule from '../../part/module';
import { panelList } from './panels/panel-list';

const Block15Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block: Block15Columns,
        blockWidth: 12,
    };
    const moduleName = '15';
    if (gutenverseProActive) {
        return <BlockModule columnAttr={columnAttr} moduleName={moduleName} {...props} panelList={panelList} />;
    } else {
        return <DeprecatedBlockModule columnAttr={columnAttr} moduleName={moduleName} {...props} />;
    }
});

export default Block15Block;