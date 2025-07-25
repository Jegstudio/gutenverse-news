import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import Block26Columns from './Block26Columns';
import DeprecatedBlockModule from '../../part/deprecated-module';

const Block26Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block       : Block26Columns,
        blockWidth  : 8,
    };
    const moduleName = '26';
    return <DeprecatedBlockModule columnAttr={columnAttr} moduleName={moduleName} {...props} />;
});

export default Block26Block;