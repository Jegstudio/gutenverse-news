import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import Block24Columns from './Block24Columns';
import DeprecatedBlockModule from '../../part/deprecated-module';

const Block24Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block       : Block24Columns,
        blockWidth  : 12,
    };
    const moduleName = '24';
    return <DeprecatedBlockModule columnAttr={columnAttr} moduleName={moduleName} {...props} />;
});

export default Block24Block;