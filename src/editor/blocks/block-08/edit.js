import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { panelList } from './panels/panel-list';
import Block8Columns from './Block8Columns';
import BlockModule from '../../part/module';

const Block8Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block: Block8Columns,
        blockWidth: 12,
    };
    const moduleName = '8';
    return <BlockModule columnAttr={columnAttr} moduleName={moduleName} {...props} panelList={panelList} freeModule={true} />;
});

export default Block8Block;