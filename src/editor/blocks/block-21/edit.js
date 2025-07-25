import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import Block21Columns from './Block21Columns';
import DeprecatedBlockModule from '../../part/deprecated-module';


const Block21Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block       : Block21Columns,
        blockWidth  : 12,
    };
    const moduleName = '21';
    return <DeprecatedBlockModule columnAttr={columnAttr} moduleName={moduleName} {...props} />;

});

export default Block21Block;