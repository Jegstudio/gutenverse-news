import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import Block29Columns from './Block29Columns';
import DeprecatedBlockModule from '../../part/deprecated-module';


const Block29Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block       : Block29Columns,
        blockWidth  : 8,
    };
    const moduleName = '29';
    return <DeprecatedBlockModule columnAttr={columnAttr} moduleName={moduleName} {...props} />;
});

export default Block29Block;