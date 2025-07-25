import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import Block25Columns from './Block25Columns';
import DeprecatedBlockModule from '../../part/deprecated-module';

const Block25Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block       : Block25Columns,
        blockWidth  : 12,
    };
    const moduleName = '25';
    return <DeprecatedBlockModule columnAttr={columnAttr} moduleName={moduleName} {...props} />;
});

export default Block25Block;