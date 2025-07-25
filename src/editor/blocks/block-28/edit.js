import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import Block28Columns from './Block28Columns';
import DeprecatedBlockModule from '../../part/deprecated-module';

const Block28Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block       : Block28Columns,
        blockWidth  : 8,
    };
    const moduleName = '28';
    return <DeprecatedBlockModule columnAttr={columnAttr} moduleName={moduleName} {...props} />;
});

export default Block28Block;