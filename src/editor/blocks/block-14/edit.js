import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import Block14Columns from './Block14Columns';
import LockedBlockModule from '../../part/locked-module';
import { gutenverseProActive } from '../../utils/helper';
import BlockModule from '../../part/module';
import { panelList } from './panels/panel-list';
import { getImageSizeDetail } from '../../utils/helper';

const Block14Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block: Block14Columns,
        blockWidth: 12,
    };
    const moduleName = '14';
    if (gutenverseProActive) {
        const renderedImageSizeMain = getImageSizeDetail(props.attributes.renderedImageSizeMain, { height: 1140, width: 570, dimension: 500 });
        const renderedImageSizeSecond = getImageSizeDetail(props.attributes.renderedImageSizeSecond, { height: 360, width: 180, dimension: 500 });
        return <BlockModule
            columnAttr={columnAttr}
            moduleName={moduleName}
            {...props}
            panelList={panelList}
            renderedImageSizeMain={renderedImageSizeMain}
            renderedImageSizeSecond={renderedImageSizeSecond}
            mainThumbnailClass={'gvnews_pl_lg_box .gvnews_pl_md_1'}
            secondThumbnailClass={'gvnews_pl_md_1'}
        />;
    } else {
        return <LockedBlockModule columnAttr={columnAttr} moduleName={moduleName} {...props} />;
    }
});

export default Block14Block;