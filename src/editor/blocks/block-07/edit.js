import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { panelList } from './panels/panel-list';
import Block7Columns from './Block7Columns';
import BlockModule from '../../part/module';

const Block7Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block       : Block7Columns,
        blockWidth  : 12,
    };
    const moduleName = '7';
    return <BlockModule columnAttr={columnAttr} moduleName={moduleName} {...props} panelList={panelList} />;
});

export default Block7Block;