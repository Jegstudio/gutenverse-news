import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import Block15Columns from './Block15Columns';
import DeprecatedBlockModule from '../../part/deprecated-module';


const Block15Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block       : Block15Columns,
        blockWidth  : 12,
    };
    const moduleName = '15';
    return <DeprecatedBlockModule columnAttr={columnAttr} moduleName={moduleName} {...props} />;
});

export default Block15Block;