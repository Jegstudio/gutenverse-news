import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import Block33Columns from './Block33Columns';
import DeprecatedBlockModule from '../../part/deprecated-module';

const Block33Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block       : Block33Columns,
        blockWidth  : 12,
    };
    const moduleName = '33';
    return <DeprecatedBlockModule columnAttr={columnAttr} moduleName={moduleName} {...props} />;
});

export default Block33Block;