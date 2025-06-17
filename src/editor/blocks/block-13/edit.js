import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { panelList } from './panels/panel-list';
import Block13Columns from './Block13Columns';
import BlockModule from '../../part/module';

const Block13Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block       : Block13Columns,
        blockWidth  : 12,
    };
    const moduleName = '13';
    return <BlockModule columnAttr={columnAttr} moduleName={moduleName} {...props} panelList={panelList} />;
});

export default Block13Block;