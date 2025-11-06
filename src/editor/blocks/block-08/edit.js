import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { panelList } from './panels/panel-list';
import Block8Columns from './Block8Columns';
import BlockModule from '../../part/module';
import { getImageSizeDetail } from '../../utils/helper';

const Block8Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block: Block8Columns,
        blockWidth: 12,
    };
    const moduleName = '8';
    const renderedImageSizeMain = getImageSizeDetail(props.attributes.renderedImageSizeMain, { height: 350, width: 180, dimension: 500 });
    return <BlockModule
        columnAttr={columnAttr}
        moduleName={moduleName}
        {...props}
        panelList={panelList}
        freeModule={true}
        renderedImageSizeMain={renderedImageSizeMain}
    />;
});

export default Block8Block;