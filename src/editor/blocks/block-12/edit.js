import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import Block12Columns from './Block12Columns';
import DeprecatedBlockModule from '../../part/deprecated-module';

const Block12Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block       : Block12Columns,
        blockWidth  : 12,
    };
    const moduleName = '12';
    return <DeprecatedBlockModule columnAttr={columnAttr} moduleName={moduleName} {...props} />;

});

export default Block12Block;