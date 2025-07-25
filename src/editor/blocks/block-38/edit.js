import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import Block38Columns from './Block38Columns';
import DeprecatedBlockModule from '../../part/deprecated-module';

const Block38Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block       : Block38Columns,
        blockWidth  : 12,
    };
    const moduleName = '38';
    return <DeprecatedBlockModule columnAttr={columnAttr} moduleName={moduleName} {...props} />;
});

export default Block38Block;