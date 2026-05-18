import { compose } from '@wordpress/compose';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { panelList } from './panels/panel-list';
import Block9Columns from './Block9Columns';
import BlockModule from '../../part/module';

const Block9Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const columnAttr = {
        block: Block9Columns,
        blockWidth: 12,
    };
    const moduleName = '9';
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

export default Block9Block;