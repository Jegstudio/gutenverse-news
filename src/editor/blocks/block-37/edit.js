import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import Block37Columns from './Block37Columns';
import DeprecatedBlockModule from '../../part/deprecated-module';

const Block37Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block       : Block37Columns,
        blockWidth  : 12,
    };
    const moduleName = '37';
    return <DeprecatedBlockModule columnAttr={columnAttr} moduleName={moduleName} {...props} />;
});

export default Block37Block;