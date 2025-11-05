import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { panelList } from './panels/panel-list';
import Block4Columns from './Block4Columns';
import BlockModule from '../../part/module';
import { getImageSizeDetail } from '../../utils/helper';

const Block4Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block       : Block4Columns,
        blockWidth  : 8,
    };
    const moduleName = '4';
    const renderedImageSizeMain = getImageSizeDetail(props.attributes.renderedImageSizeMain, { height: 350, width: 250, dimension: 715 });
    return <BlockModule
        columnAttr={columnAttr}
        moduleName={moduleName}
        {...props}
        panelList={panelList}
        freeModule={true}
        renderedImageSizeMain={renderedImageSizeMain}
    />;
});

export default Block4Block;