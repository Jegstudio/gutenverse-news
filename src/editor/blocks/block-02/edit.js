import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { panelList } from './panels/panel-list';
import Block2Columns from './Block2Columns';
import BlockModule from '../../part/module';
import { getImageSizeDetail } from '../../utils/helper';

const Block2Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block: Block2Columns,
        blockWidth: 12,
    };
    const moduleName = '2';
    const renderedImageSizeMain = getImageSizeDetail(props.attributes.renderedImageSizeMain, { height: 350, width: 250, dimension: 715 });
    const renderedImageSizeSecond = getImageSizeDetail(props.attributes.renderedImageSizeSecond, { height: 120, width: 86, dimension: 715 });
    return <BlockModule
        columnAttr={columnAttr}
        moduleName={moduleName}
        {...props}
        panelList={panelList}
        freeModule={true}
        renderedImageSizeMain={renderedImageSizeMain}
        renderedImageSizeSecond={renderedImageSizeSecond}
    />;
});

export default Block2Block;