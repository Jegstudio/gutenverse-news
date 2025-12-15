import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { panelList } from './panels/panel-list';
import Block7Columns from './Block7Columns';
import BlockModule from '../../part/module';
import { getImageSizeDetail } from '../../utils/helper';

const Block7Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block: Block7Columns,
        blockWidth: 12,
    };
    const moduleName = '7';
    return <BlockModule
        columnAttr={columnAttr}
        moduleName={moduleName}
        {...props}
        panelList={panelList}
        freeModule={true}
        defaultImageSizeMain={{ height: 350, width: 180, dimension: 500 }}
        mainThumbnailClass={'gvnews_pl_lg_6'}
    />;
});

export default Block7Block;