import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { panelList } from './panels/panel-list';
import Block8Columns from './Block8Columns';
import BlockModule from '../../part/module';

const Block8Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block: Block8Columns,
        blockWidth: 12,
    };
    const moduleName = '8';
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
        defaultImageSizeMain={{ height: 350, width: 180, dimension: 500 }}
        mainThumbnailClass={'gvnews_pl_md_1'}
    />;
});

export default Block8Block;