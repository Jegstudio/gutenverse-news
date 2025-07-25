import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import Block34Columns from './Block34Columns';
import DeprecatedBlockModule from '../../part/deprecated-module';

const Block34Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block       : Block34Columns,
        blockWidth  : 12,
    };
    const moduleName = '34';
    return <DeprecatedBlockModule columnAttr={columnAttr} moduleName={moduleName} {...props} />;
});

export default Block34Block;