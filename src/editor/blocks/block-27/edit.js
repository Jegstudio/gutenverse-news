import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import Block27Columns from './Block27Columns';
import DeprecatedBlockModule from '../../part/deprecated-module';

const Block27Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block       : Block27Columns,
        blockWidth  : 12,
    };
    const moduleName = '27';
    return <DeprecatedBlockModule columnAttr={columnAttr} moduleName={moduleName} {...props} />;
});

export default Block27Block;