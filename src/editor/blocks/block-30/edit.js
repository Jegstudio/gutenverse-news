import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import Block30Columns from './Block30Columns';
import DeprecatedBlockModule from '../../part/deprecated-module';

const Block30Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block       : Block30Columns,
        blockWidth  : 8,
    };
    const moduleName = '30';
    return <DeprecatedBlockModule columnAttr={columnAttr} moduleName={moduleName} {...props} />;
});

export default Block30Block;