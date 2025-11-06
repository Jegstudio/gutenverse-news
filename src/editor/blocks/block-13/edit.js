import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import Block13Columns from './Block13Columns';
import LockedBlockModule from '../../part/locked-module';
import { gutenverseProActive } from '../../utils/helper';
import BlockModule from '../../part/module';
import { panelList } from './panels/panel-list';
import { getImageSizeDetail } from '../../utils/helper';

const Block13Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block: Block13Columns,
        blockWidth: 12,
    };
    const moduleName = '13';
    if (gutenverseProActive) {
        const renderedImageSizeMain = getImageSizeDetail(props.attributes.renderedImageSizeMain, { height: 360, width: 504, dimension: 1400 });
        const renderedImageSizeSecond = getImageSizeDetail(props.attributes.renderedImageSizeSecond, { height: 350, width: 250, dimension: 715 });
        return <BlockModule
            columnAttr={columnAttr}
            moduleName={moduleName}
            {...props}
            panelList={panelList}
            renderedImageSizeMain={renderedImageSizeMain}
            renderedImageSizeSecond={renderedImageSizeSecond}
        />;
    } else {
        return <LockedBlockModule columnAttr={columnAttr} moduleName={moduleName} {...props} />;
    }

});

export default Block13Block;