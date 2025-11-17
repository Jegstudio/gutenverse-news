import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import Block19Columns from './Block19Columns';
import LockedBlockModule from '../../part/locked-module';
import { gutenverseProActive } from '../../utils/helper';
import BlockModule from '../../part/module';
import { panelList } from './panels/panel-list';
import { getImageSizeDetail } from '../../utils/helper';

const Block19Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block: Block19Columns,
        blockWidth: 12,
    };
    const moduleName = '19';
    if (gutenverseProActive) {
        const renderedImageSizeMain = getImageSizeDetail(props.attributes.renderedImageSizeMain, { height: 350, width: 250, dimension: 715 });
        const renderedImageSizeSecond = getImageSizeDetail(props.attributes.renderedImageSizeSecond, { height: 120, width: 86, dimension: 715 });
        return <BlockModule
            columnAttr={columnAttr}
            moduleName={moduleName}
            {...props}
            panelList={panelList}
            renderedImageSizeMain={renderedImageSizeMain}
            renderedImageSizeSecond={renderedImageSizeSecond}
            mainThumbnailClass={'gvnews_pl_md_box .box_wrap'}
            secondThumbnailClass={'gvnews_pl_sm .thumbnail-container'}
        />;
    } else {
        return <LockedBlockModule columnAttr={columnAttr} moduleName={moduleName} {...props} />;
    }
});

export default Block19Block;