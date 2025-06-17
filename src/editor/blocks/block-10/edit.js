import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { panelList } from './panels/panel-list';
import Block10Columns from './Block10Columns';
import BlockModule from '../../part/module';

const Block10Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block       : Block10Columns,
        blockWidth  : 12,
    };
    const moduleName = '10';
    return <BlockModule columnAttr={columnAttr} moduleName={moduleName} {...props} panelList={panelList} />;
});

export default Block10Block;