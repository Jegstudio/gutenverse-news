import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import Block23Columns from './Block23Columns';
import DeprecatedBlockModule from '../../part/deprecated-module';

const Block23Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block       : Block23Columns,
        blockWidth  : 12,
    };
    const moduleName = '23';
    return <DeprecatedBlockModule columnAttr={columnAttr} moduleName={moduleName} {...props} />;
});

export default Block23Block;