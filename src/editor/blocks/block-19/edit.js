import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import Block19Columns from './Block19Columns';
import DeprecatedBlockModule from '../../part/deprecated-module';

const Block19Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block       : Block19Columns,
        blockWidth  : 12,
    };
    const moduleName = '19';
    return <DeprecatedBlockModule columnAttr={columnAttr} moduleName={moduleName} {...props} />;
});

export default Block19Block;