import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import Block10Columns from './Block10Columns';
import DeprecatedBlockModule from '../../part/deprecated-module';

const Block10Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block: Block10Columns,
        blockWidth: 12,
    };
    const moduleName = '10';
    return <DeprecatedBlockModule columnAttr={columnAttr} moduleName={moduleName} {...props} />;

});

export default Block10Block;