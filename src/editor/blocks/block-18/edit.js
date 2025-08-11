import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import Block18Columns from './Block18Columns';
import DeprecatedBlockModule from '../../part/deprecated-module';
import { gutenverseProActive } from '../../utils/helper';
import BlockModule from '../../part/module';
import { panelList } from './panels/panel-list';

const Block18Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block: Block18Columns,
        blockWidth: 12,
    };
    const moduleName = '18';
    if (gutenverseProActive) {
        return <BlockModule columnAttr={columnAttr} moduleName={moduleName} {...props} panelList={panelList} />;
    } else {
        return <DeprecatedBlockModule columnAttr={columnAttr} moduleName={moduleName} {...props} />;
    }

});

export default Block18Block;