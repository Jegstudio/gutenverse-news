import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { panelList } from './panels/panel-list';
import Block6Columns from './Block6Columns';
import BlockModule from '../../part/module';
import { getImageSizeDetail } from '../../utils/helper';

const Block6Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block: Block6Columns,
        blockWidth: 12,
    };
    const moduleName = '6';
    return <BlockModule
        columnAttr={columnAttr}
        moduleName={moduleName}
        {...props}
        panelList={panelList}
        freeModule={true}
        defaultImageSizeMain={{ height: 350, width: 250, dimension: 715 }}
        mainThumbnailClass={'gvnews_pl_lg_3'}
    />;
});

export default Block6Block;