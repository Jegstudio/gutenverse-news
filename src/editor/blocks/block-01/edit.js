import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { panelList } from './panels/panel-list';
import Block1Columns from './Block1Columns';
import BlockModule from '../../part/module';
import { getImageSizeDetail } from '../../utils/helper';

const Block1Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block: Block1Columns,
        blockWidth: 12,
    };
    const moduleName = '1';
    const renderedImageSizeMain = getImageSizeDetail(props.attributes.renderedImageSizeMain, { height: 360, width: 180, dimension: 500 });
    const renderedImageSizeSecond = getImageSizeDetail(props.attributes.renderedImageSizeSecond, { height: 120, width: 86, dimension: 715 });
    return <BlockModule
        columnAttr={columnAttr}
        moduleName={moduleName}
        {...props}
        panelList={panelList}
        freeModule={true}
        renderedImageSizeMain={renderedImageSizeMain}
        renderedImageSizeSecond={renderedImageSizeSecond}
        mainThumbnailClass={'gvnews_pl_lg_1 .thumbnail-container'}
        secondThumbnailClass={'gvnews_pl_sm .thumbnail-container'}
    />;
});

export default Block1Block;