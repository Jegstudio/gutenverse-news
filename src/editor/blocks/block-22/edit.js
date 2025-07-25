import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import Block22Columns from './Block22Columns';
import DeprecatedBlockModule from '../../part/deprecated-module';


const Block22Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block       : Block22Columns,
        blockWidth  : 12,
    };
    const moduleName = '22';
    return <DeprecatedBlockModule columnAttr={columnAttr} moduleName={moduleName} {...props} />;
});

export default Block22Block;