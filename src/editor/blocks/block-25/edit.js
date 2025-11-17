import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import Block25Columns from './Block25Columns';
import LockedBlockModule from '../../part/locked-module';
import { gutenverseProActive } from '../../utils/helper';
import BlockModule from '../../part/module';
import { panelList } from './panels/panel-list';
import { getImageSizeDetail } from '../../utils/helper';

const Block25Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block: Block25Columns,
        blockWidth: 12,
    };
    const moduleName = '25';
    if (gutenverseProActive) {
        const renderedImageSizeMain = getImageSizeDetail(props.attributes.renderedImageSizeMain, { height: 360, width: 280, dimension: 500 });
        return <BlockModule
            columnAttr={columnAttr}
            moduleName={moduleName}
            {...props}
            panelList={panelList}
            renderedImageSizeMain={renderedImageSizeMain}
            mainThumbnailClass={'gvnews_thumb .thumbnail-container'}
        />;
    } else {
        return <LockedBlockModule columnAttr={columnAttr} moduleName={moduleName} {...props} />;
    }
});

export default Block25Block;