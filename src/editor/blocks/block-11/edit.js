import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import Block11Columns from './Block11Columns';
import DeprecatedBlockModule from '../../part/deprecated-module';


const Block11Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block: Block11Columns,
        blockWidth: 12,
    };
    const moduleName = '11';
    return <DeprecatedBlockModule columnAttr={columnAttr} moduleName={moduleName} {...props} />;

});

export default Block11Block;