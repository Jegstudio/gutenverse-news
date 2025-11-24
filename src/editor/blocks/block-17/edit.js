import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import Block17Columns from './Block17Columns';
import BlockModule from '../../part/module';
import { panelList } from './panels/panel-list';

const Block17Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block: Block17Columns,
        blockWidth: 12,
    };
    const moduleName = '17';
    return <BlockModule columnAttr={columnAttr} moduleName={moduleName} {...props} panelList={panelList} />;

});

export default Block17Block;