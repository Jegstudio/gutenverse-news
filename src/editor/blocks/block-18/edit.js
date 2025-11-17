import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import Block18Columns from './Block18Columns';
import LockedBlockModule from '../../part/locked-module';
import { gutenverseProActive } from '../../utils/helper';
import BlockModule from '../../part/module';
import { panelList } from './panels/panel-list';
import { getImageSizeDetail } from '../../utils/helper';

const Block18Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block: Block18Columns,
        blockWidth: 12,
    };
    const moduleName = '18';
    if (gutenverseProActive) {
        const renderedImageSizeMain = getImageSizeDetail(props.attributes.renderedImageSizeMain, { height: 750, width: 536, dimension: 715 });
        return <BlockModule
            columnAttr={columnAttr}
            moduleName={moduleName}
            {...props}
            panelList={panelList}
            renderedImageSizeMain={renderedImageSizeMain}
            mainThumbnailClass={'gvnews_pl_lg_8 .thumbnail-container'}
        />;
    } else {
        return <LockedBlockModule columnAttr={columnAttr} moduleName={moduleName} {...props} />;
    }

});

export default Block18Block;