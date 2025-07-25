import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import Block14Columns from './Block14Columns';
import DeprecatedBlockModule from '../../part/deprecated-module';


const Block14Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block       : Block14Columns,
        blockWidth  : 12,
    };
    const moduleName = '14';
    return <DeprecatedBlockModule columnAttr={columnAttr} moduleName={moduleName} {...props} />;

});

export default Block14Block;