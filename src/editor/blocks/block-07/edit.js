import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { panelList } from './panels/panel-list';
import Block7Columns from './Block7Columns';
import BlockModule from '../../part/module';
import dedicatedStyle from './styles/block-style';


const Block7Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block: Block7Columns,
        blockWidth: 12,
    };
    const moduleName = '7';
    const iconMappings = [
        { type: 'iconType', svg: 'iconSVG' },
        { type: 'paginationPrevIconType', svg: 'paginationPrevIconSVG' },
        { type: 'paginationNextIconType', svg: 'paginationNextIconSVG' },
    ];
    return <BlockModule
        columnAttr={columnAttr}
        moduleName={moduleName}
        iconMappings={iconMappings} {...props}
        panelList={panelList}
        freeModule={true}
        defaultImageSizeMain={{ height: 350, width: 180, dimension: 500 }}
        useDedicatedStyle={true}
        dedicatedStyle={dedicatedStyle}
    />;
});

export default Block7Block;