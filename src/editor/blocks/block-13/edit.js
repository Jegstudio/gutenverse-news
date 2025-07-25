import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import Block13Columns from './Block13Columns';
import DeprecatedBlockModule from '../../part/deprecated-module';

const Block13Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block: Block13Columns,
        blockWidth: 12,
    };
    const moduleName = '13';
    return <DeprecatedBlockModule columnAttr={columnAttr} moduleName={moduleName} {...props} />;

});

export default Block13Block;