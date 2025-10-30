import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { panelList } from './panels/panel-list';
import Block9Columns from './Block9Columns';
import BlockModule from '../../part/module';

const Block9Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block: Block9Columns,
        blockWidth: 12,
    };
    const moduleName = '9';
    return <BlockModule columnAttr={columnAttr} moduleName={moduleName} {...props} panelList={panelList} freeModule={true} />;
});

export default Block9Block;