import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import Block28Columns from './Block28Columns';
import LockedBlockModule from '../../part/locked-module';
import { gutenverseProActive } from '../../utils/helper';
import BlockModule from '../../part/module';
import { panelList } from './panels/panel-list';
import dedicatedStyle from './styles/block-style';

const Block28Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block: Block28Columns,
        blockWidth: 8,
    };
    const moduleName = '28';
    const iconMappings = [
        { type: 'iconType', svg: 'iconSVG' },
        { type: 'paginationPrevIconType', svg: 'paginationPrevIconSVG' },
        { type: 'paginationNextIconType', svg: 'paginationNextIconSVG' },
        { type: 'listIconType', svg: 'listIconSVG' },
    ];
    if (gutenverseProActive) {
        return <BlockModule
            columnAttr={columnAttr}
            moduleName={moduleName}
            iconMappings={iconMappings}
            panelList={panelList}
            useDedicatedStyle={true}
            dedicatedStyle={dedicatedStyle}
            {...props}
        />;
    } else {
        return <LockedBlockModule columnAttr={columnAttr} moduleName={moduleName} iconMappings={iconMappings} {...props} />;
    }
});

export default Block28Block;