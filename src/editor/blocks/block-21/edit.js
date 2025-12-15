import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import Block21Columns from './Block21Columns';
import BlockModule from '../../part/module';
import { panelList } from './panels/panel-list';
import { getImageSizeDetail } from '../../utils/helper';

const Block21Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block: Block21Columns,
        blockWidth: 12,
    };
    const moduleName = '21';
    return <BlockModule
        columnAttr={columnAttr}
        moduleName={moduleName}
        {...props}
        panelList={panelList}
        freeModule={true}
        defaultImageSizeMain={{ height: 120, width: 86, dimension: 715 }}
        mainThumbnailClass={'gvnews_pl_sm'}
    />;

});

export default Block21Block;