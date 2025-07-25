import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import Block32Columns from './Block32Columns';
import DeprecatedBlockModule from '../../part/deprecated-module';

const Block32Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block       : Block32Columns,
        blockWidth  : 12,
    };
    const moduleName = '32';
    return <DeprecatedBlockModule columnAttr={columnAttr} moduleName={moduleName} {...props} />;
});

export default Block32Block;