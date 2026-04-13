import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { panelList } from './panels/panel-list';
import Block3Columns from './Block3Columns';
import BlockModule from '../../part/module';

const Block3Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block       : Block3Columns,
        blockWidth  : 12,
    };
    const moduleName = '3';
    return <BlockModule
        columnAttr={columnAttr}
        moduleName={moduleName}
        {...props}
        panelList={panelList}
        freeModule={true}
        defaultImageSizeMain={{ height: 350, width: 250, dimension: 715 }}
        mainThumbnailClass={'gvnews_pl_md_2'}
        withAds={true}
    />;
});

export default Block3Block;