import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import Block17Columns from './Block17Columns';
import DeprecatedBlockModule from '../../part/deprecated-module';

const Block17Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block       : Block17Columns,
        blockWidth  : 12,
    };
    const moduleName = '17';
    return <DeprecatedBlockModule columnAttr={columnAttr} moduleName={moduleName} {...props} />;

});

export default Block17Block;