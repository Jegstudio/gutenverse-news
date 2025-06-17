import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { panelList } from './panels/panel-list';
import Block2Columns from './Block2Columns';
import BlockModule from '../../part/module';

const Block2Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block       : Block2Columns,
        blockWidth  : 12,
    };
    const moduleName = '2';
    return <BlockModule columnAttr={columnAttr} moduleName={moduleName} {...props} panelList={panelList} />;
});

export default Block2Block;