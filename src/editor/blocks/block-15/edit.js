import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import Block15Columns from './Block15Columns';
import LockedBlockModule from '../../part/locked-module';
import { gutenverseProActive } from '../../utils/helper';
import BlockModule from '../../part/module';
import { panelList } from './panels/panel-list';
import { getImageSizeDetail } from '../../utils/helper';

const Block15Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block: Block15Columns,
        blockWidth: 12,
    };
    const moduleName = '15';
    if (gutenverseProActive) {
        const renderedImageSizeMain = getImageSizeDetail(props.attributes.renderedImageSizeMain, { height: 350, width: 250, dimension: 715 });
        return <BlockModule
            columnAttr={columnAttr}
            moduleName={moduleName}
            {...props}
            panelList={panelList}
            renderedImageSizeMain={renderedImageSizeMain}
        />;
    } else {
        return <LockedBlockModule columnAttr={columnAttr} moduleName={moduleName} {...props} />;
    }
});

export default Block15Block;