import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import Block18Columns from './Block18Columns';
import DeprecatedBlockModule from '../../part/deprecated-module';


const Block18Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block       : Block18Columns,
        blockWidth  : 12,
    };
    const moduleName = '18';
    return <DeprecatedBlockModule columnAttr={columnAttr} moduleName={moduleName} {...props} />;

});

export default Block18Block;