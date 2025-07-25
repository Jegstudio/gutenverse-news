import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import Block16Columns from './Block16Columns';
import DeprecatedBlockModule from '../../part/deprecated-module';

const Block16Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block       : Block16Columns,
        blockWidth  : 8,
    };
    const moduleName = '16';
    return <DeprecatedBlockModule columnAttr={columnAttr} moduleName={moduleName} {...props} />;
});

export default Block16Block;