import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { panelList } from './panels/panel-list';
import Block4Columns from './Block4Columns';
import BlockModule from '../../part/module';

const Block4Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block: Block4Columns,
        blockWidth: 8,
    };
    const moduleName = '4';
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
        defaultImageSizeMain={{ height: 350, width: 250, dimension: 715 }}
        mainThumbnailClass={'gvnews_pl_md_3'}
        withAds={true}
    />;
});

export default Block4Block;