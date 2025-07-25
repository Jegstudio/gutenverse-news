import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import Block31Columns from './Block31Columns';
import DeprecatedBlockModule from '../../part/deprecated-module';

const Block31Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block       : Block31Columns,
        blockWidth  : 8,
    };
    const moduleName = '31';
    return <DeprecatedBlockModule columnAttr={columnAttr} moduleName={moduleName} {...props} />;
});

export default Block31Block;