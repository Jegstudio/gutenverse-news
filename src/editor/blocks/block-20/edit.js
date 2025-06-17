import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { panelList } from './panels/panel-list';
import Block20Columns from './Block20Columns';
import BlockModule from '../../part/module';

const Block20Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block       : Block20Columns,
        blockWidth  : 12,
    };
    const moduleName = '20';
    return <BlockModule columnAttr={columnAttr} moduleName={moduleName} {...props} panelList={panelList} />;
});

export default Block20Block;