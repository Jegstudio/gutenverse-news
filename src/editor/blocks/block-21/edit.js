import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import Block21Columns from './Block21Columns';
import BlockModule from '../../part/module';
import { panelList } from './panels/panel-list';

const Block21Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block: Block21Columns,
        blockWidth: 12,
    };
    const moduleName = '21';
    return <BlockModule columnAttr={columnAttr} moduleName={moduleName} {...props} panelList={panelList} />;

});

export default Block21Block;