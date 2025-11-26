import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { panelList } from './panels/panel-list';
import Block6Columns from './Block6Columns';
import BlockModule from '../../part/module';

const Block6Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block: Block6Columns,
        blockWidth: 12,
    };
    const moduleName = '6';
    return <BlockModule columnAttr={columnAttr} moduleName={moduleName} {...props} panelList={panelList} freeModule={true} />;
});

export default Block6Block;