import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import Block16Columns from './Block16Columns';
import DeprecatedBlockModule from '../../part/deprecated-module';
import { gutenverseProActive } from '../../utils/helper';
import BlockModule from '../../part/module';
import { panelList } from './panels/panel-list';

const Block16Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block: Block16Columns,
        blockWidth: 8,
    };
    const moduleName = '16';
    if (gutenverseProActive) {
        return <BlockModule columnAttr={columnAttr} moduleName={moduleName} {...props} panelList={panelList} />;
    } else {
        return <DeprecatedBlockModule columnAttr={columnAttr} moduleName={moduleName} {...props} />;
    }
});

export default Block16Block;