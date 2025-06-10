import BlockArchive from './block-archive';

const BlockHandler = (props) => {
    const { blockType, type } = props;
    let numberPost = 5,
        showExcerpt = false,
        showAds = false;

    if (['1', '2', '8', '14', '16'].includes(blockType)) {
        numberPost = 5;
    } else if (['3', '4', '5', '6', '7', '9', '10', '11', '12', '18', '23', '31'].includes(blockType)) {
        numberPost = 4;
    } else if (['13', '25', '26'].includes(blockType)) {
        numberPost = 3;
    } else if (['15', '17', '19', '20', '21', '22', '24', '27', '28', '29', '32', '33', '34', '35', '36', '37', '38', '39'].includes(blockType)) {
        numberPost = 6;
    } else if (['30'].includes(blockType)) {
        numberPost = 1;
    }

    if (
        ['1', '2', '3', '4', '5', '6', '7', '10', '12', '13', '16', '17', '23', '25', '26', '27', '30', '32', '33', '35', '36', '38'].includes(
            blockType
        )
    ) {
        showExcerpt = true;
    }

    if (['3', '4', '5', '6', '7', '10', '12', '18', '25', '26', '28', '29', '31'].includes(blockType)) {
        showAds = true;
    }

    return type === 'archive' ? <BlockArchive {...{ numberPost, showExcerpt, showAds, ...props }} /> : <></>;
};

export default BlockHandler;