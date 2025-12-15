import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { panelList } from './panels/panel-list';
import Block2Columns from './Block2Columns';
import BlockModule from '../../part/module';
import { getImageSizeDetail } from '../../utils/helper';

const Block2Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block: Block2Columns,
        blockWidth: 12,
    };
    const moduleName = '2';
    return <BlockModule
        columnAttr={columnAttr}
        moduleName={moduleName}
        {...props}
        panelList={panelList}
        freeModule={true}
        defaultImageSizeMain={{ height: 350, width: 250, dimension: 715 }}
        defaultImageSizeSecond={{ height: 120, width: 86, dimension: 715 }}
        mainThumbnailClass={'gvnews_pl_lg_2'}
        secondThumbnailClass={'gvnews_pl_sm'}
    />;
});

export default Block2Block;