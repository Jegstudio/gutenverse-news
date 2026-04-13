import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { panelList } from './panels/panel-list';
import Block5Columns from './Block5Columns';
import BlockModule from '../../part/module';

const Block5Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block: Block5Columns,
        blockWidth: 12,
    };
    const moduleName = '5';
    return <BlockModule
        columnAttr={columnAttr}
        moduleName={moduleName}
        {...props}
        panelList={panelList}
        freeModule={true}
        defaultImageSizeMain={{ height: 350, width: 250, dimension: 715 }}
        mainThumbnailClass={'gvnews_pl_lg_2'}
        withAds={true}
    />;
});

export default Block5Block;