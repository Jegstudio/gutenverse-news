import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { panelList } from './panels/panel-list';
import Block1Columns from './Block1Columns';
import BlockModule from '../../part/module';
import dedicatedStyle from './styles/block-style';

const Block1Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block: Block1Columns,
        blockWidth: 12,
    };
    const moduleName = '1';
    const iconMappings = [
        { type: 'iconType', svg: 'iconSVG' },
        { type: 'paginationPrevIconType', svg: 'paginationPrevIconSVG' },
        { type: 'paginationNextIconType', svg: 'paginationNextIconSVG' },
        { type: 'galleryFormatIconType', svg: 'galleryFormatIconSVG' },
        { type: 'videoFormatIconType', svg: 'videoFormatIconSVG' },
        { type: 'listIconType', svg: 'listIconSVG' },
    ];
    return <BlockModule
        columnAttr={columnAttr}
        moduleName={moduleName}
        iconMappings={iconMappings} {...props}
        panelList={panelList}
        freeModule={true}
        defaultImageSizeMain={{ height: 360, width: 180, dimension: 500 }}
        defaultImageSizeSecond={{ height: 120, width: 86, dimension: 715 }}
        mainThumbnailClass={'gvnews_pl_lg_1'}
        secondThumbnailClass={'gvnews_pl_sm'}
        useDedicatedStyle={true}
        dedicatedStyle={dedicatedStyle}
    />;
});

export default Block1Block;
