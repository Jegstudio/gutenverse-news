import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import Block17Columns from './Block17Columns';
import BlockModule from '../../part/module';
import { panelList } from './panels/panel-list';

const Block17Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block: Block17Columns,
        blockWidth: 12,
    };
    const moduleName = '17';
    const iconMappings = [
        { type: 'iconType', svg: 'iconSVG' },
        { type: 'paginationPrevIconType', svg: 'paginationPrevIconSVG' },
        { type: 'paginationNextIconType', svg: 'paginationNextIconSVG' },
        { type: 'galleryFormatIconType', svg: 'galleryFormatIconSVG' },
        { type: 'videoFormatIconType', svg: 'videoFormatIconSVG' },
    ];
    return <BlockModule
        columnAttr={columnAttr}
        moduleName={moduleName}
        iconMappings={iconMappings} {...props}
        panelList={panelList}
        freeModule={true}
        defaultImageSizeMain={{ height: 1140, width: 570, dimension: 500 }}
        defaultImageSizeSecond={{ height: 120, width: 86, dimension: 715 }}
        mainThumbnailClass={'gvnews_pl_md_1'}
        secondThumbnailClass={'gvnews_pl_sm'}
    />;

});

export default Block17Block;