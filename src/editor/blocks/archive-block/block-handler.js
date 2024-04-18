import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { useState, useEffect, useRef } from '@wordpress/element';
import PaginationModule from '../../part/pagination';
import HeaderModule from '../../part/header';
import classnames from 'classnames';
import Block1Columns from '../block-1/Block1Columns';
import Block2Columns from '../block-2/Block2Columns';
import Block3Columns from '../block-3/Block3Columns';
import Block4Columns from '../block-4/Block4Columns';
import Block5Columns from '../block-5/Block5Columns';
import Block6Columns from '../block-6/Block6Columns';
import Block7Columns from '../block-7/Block7Columns';
import Block8Columns from '../block-8/Block8Columns';
import Block9Columns from '../block-9/Block9Columns';
import Block10Columns from '../block-10/Block10Columns';
import Block11Columns from '../block-11/Block11Columns';
import Block12Columns from '../block-12/Block12Columns';
import Block13Columns from '../block-13/Block13Columns';
import Block14Columns from '../block-14/Block14Columns';
import Block15Columns from '../block-15/Block15Columns';
import Block16Columns from '../block-16/Block16Columns';
import Block17Columns from '../block-17/Block17Columns';
import Block18Columns from '../block-18/Block18Columns';
import Block19Columns from '../block-19/Block19Columns';
import Block20Columns from '../block-20/Block20Columns';
import Block21Columns from '../block-21/Block21Columns';
import Block22Columns from '../block-22/Block22Columns';
import Block23Columns from '../block-23/Block23Columns';
import Block24Columns from '../block-24/Block24Columns';
import Block25Columns from '../block-25/Block25Columns';
import Block26Columns from '../block-26/Block26Columns';
import Block27Columns from '../block-27/Block27Columns';
/**
 * @TODO: Need to split block columns 28 - 39
 */
import Block28Columns from '../block-28/Block28Columns';
import Block29Columns from '../block-29/Block29Columns';
import Block30Columns from '../block-30/Block30Columns';
import Block31Columns from '../block-31/Block31Columns';
import Block32Columns from '../block-32/Block32Columns';
import Block33Columns from '../block-33/Block33Columns';
import Block34Columns from '../block-34/Block34Columns';
import Block35Columns from '../block-35/Block35Columns';
import Block36Columns from '../block-36/Block36Columns';
import Block37Columns from '../block-37/Block37Columns';
import Block38Columns from '../block-38/Block38Columns';
import Block39Columns from '../block-39/Block39Columns';

const BlockArchive = (props) => {
    const {
        blockType,
        postOffset = 0,
        numberPost,
        columnWidth,
        excerpLength,
        excerptEllipsis,
        metaDateType,
        metaDateFormat,
        metaDateFormatCustom,
    } = props;

    const [moduleOption, setModuleOption] = useState(false);
    const [postBulk, getPost] = useState(false);
    const [blockWidth, getWidth] = useState(12);
    const [postData, getTrim] = useState(false);
    const [loadPost, loadMore] = useState(15);
    const [postCount, setPostCount] = useState(0);
    const [overlay, setOverlay] = useState(false);
    const [block, setBlock] = useState(false);

    useEffect(() => {
        let off = !isNaN(parseInt(postOffset)) ? parseInt(postOffset) : 0;
        let num = parseInt(numberPost);
        let count = parseInt(postCount);
        if (postBulk && postBulk.length) {
            if (postBulk.slice(off, num + off).length) {
                if (postBulk.slice(off, num + off).length < num && loadPost <= count) {
                    loadMore(loadPost + 15);
                }
                getTrim(postBulk.slice(off, parseInt(num + off)));
            } else {
                count > off ? loadMore(loadPost + 15) : count != postCount ? loadMore(count) : null;
                getTrim(false);
            }
        } else {
            getTrim(false);
        }
    }, [blockType, numberPost, postBulk, postOffset]);

    useEffect(() => {
        apiFetch({
            path: addQueryArgs('/gvnews-client/v1/module-option'),
        }).then((data) => {
            const parsedData = JSON.parse(data);
            setModuleOption(parsedData);
            if (parsedData.option.post_count) {
                setPostCount(parsedData.option.post_count.publish);
            }
        });
    }, []);

    useEffect(() => {
        if (columnWidth == 'auto') {
            // todo add auto width detection?
            getWidth(12);
        } else {
            getWidth(columnWidth);
        }
    }, [columnWidth]);

    useEffect(() => {
        postBulk ? setOverlay(true) : null;
        apiFetch({
            path: addQueryArgs('/gvnews-client/v1/get-posts-archive'),
            method: 'POST',
            data: {
                attr: {
                    numberPost: loadPost,
                },
            },
        })
            .then((data) => {
                getPost(JSON.parse(data));
            })
            .catch((e) => {
                console.error(e.message);
            })
            .finally(() => {
                setOverlay(false);
            });
    }, [loadPost]);

    useEffect(() => {
        setBlock(
            <BlockColumns
                {...{
                    blockType,
                    blockWidth,
                    excerpLength,
                    excerptEllipsis,
                    moduleOption,
                    postData,
                    metaDateType,
                    metaDateFormat,
                    metaDateFormatCustom,
                    postBulk,
                    overlay,
                }}
            />
        );
    }, [
        blockType,
        blockWidth,
        excerpLength,
        excerptEllipsis,
        moduleOption,
        postData,
        metaDateType,
        metaDateFormat,
        metaDateFormatCustom,
        postBulk,
        overlay,
    ]);

    return <BlockWrapper {...{ ...props, block, blockWidth   }} />;
};

const BlockWrapper = (props) => {
    const { elementId, blockType, headerData = false, paginationData = false, block, blockWidth, enableBoxed, enableBoxShadow } = props;
    const wrapperClasses = classnames(
        `gvnews_postblock_${blockType}`,
        'gvnews_postblock',
        'gvnews_module_hook',
        `gvnews_col_${blockWidth == 4 ? '1' : blockWidth == 8 ? '2' : '3'}o3`,
        {
            ['gvnews_postblock_blog_2']: '27' === blockType,
            ['gvnews_pagination_disable']: !paginationData,
            ['gvnews_pb_boxed']: enableBoxed,
            ['gvnews_pb_boxed_shadow']: enableBoxed && enableBoxShadow,
        }
    );
    if (['32'].includes(blockType)) {
        const isotope = useRef();
        return (
            <div ref={isotope} isotope-selector={`gvnews_postblock_32_${elementId}`} className={wrapperClasses}>
                {headerData && <HeaderModule {...headerData} />}
                {block ? block : 'loading'}
                {paginationData && <PaginationModule {...paginationData} />}
            </div>
        );
    } else {
        return (
            <div className={wrapperClasses}>
                {headerData && <HeaderModule {...headerData} />}
                {block ? block : 'loading'}
                {paginationData && <PaginationModule {...paginationData} />}
            </div>
        );
    }
};

const BlockColumns = (props) => {
    const {
        blockType,
        blockWidth,
        excerpLength,
        excerptEllipsis,
        moduleOption,
        postData,
        metaDateType,
        metaDateFormat,
        metaDateFormatCustom,
        overlay,
        postBulk,
        adsData = false,
    } = props;
    const columns = [
        {
            id: '1',
            component: (attr) => {
                return <Block1Columns {...attr} />;
            },
        },
        {
            id: '2',
            component: (attr) => {
                return <Block2Columns {...attr} />;
            },
        },
        {
            id: '3',
            component: (attr) => {
                return <Block3Columns {...attr} />;
            },
        },
        {
            id: '4',
            component: (attr) => {
                return <Block4Columns {...attr} />;
            },
        },
        {
            id: '5',
            component: (attr) => {
                return <Block5Columns {...attr} />;
            },
        },
        {
            id: '6',
            component: (attr) => {
                return <Block6Columns {...attr} />;
            },
        },
        {
            id: '7',
            component: (attr) => {
                return <Block7Columns {...attr} />;
            },
        },
        {
            id: '8',
            component: (attr) => {
                return <Block8Columns {...attr} />;
            },
        },
        {
            id: '9',
            component: (attr) => {
                return <Block9Columns {...attr} />;
            },
        },
        {
            id: '10',
            component: (attr) => {
                return <Block10Columns {...attr} />;
            },
        },
        {
            id: '11',
            component: (attr) => {
                return <Block11Columns {...attr} />;
            },
        },
        {
            id: '12',
            component: (attr) => {
                return <Block12Columns {...attr} />;
            },
        },
        {
            id: '13',
            component: (attr) => {
                return <Block13Columns {...attr} />;
            },
        },
        {
            id: '14',
            component: (attr) => {
                return <Block14Columns {...attr} />;
            },
        },
        {
            id: '15',
            component: (attr) => {
                return <Block15Columns {...attr} />;
            },
        },
        {
            id: '16',
            component: (attr) => {
                return <Block16Columns {...attr} />;
            },
        },
        {
            id: '17',
            component: (attr) => {
                return <Block17Columns {...attr} />;
            },
        },
        {
            id: '18',
            component: (attr) => {
                return <Block18Columns {...attr} />;
            },
        },
        {
            id: '19',
            component: (attr) => {
                return <Block19Columns {...attr} />;
            },
        },
        {
            id: '20',
            component: (attr) => {
                return <Block20Columns {...attr} />;
            },
        },
        {
            id: '21',
            component: (attr) => {
                return <Block21Columns {...attr} />;
            },
        },
        {
            id: '22',
            component: (attr) => {
                return <Block22Columns {...attr} />;
            },
        },
        {
            id: '23',
            component: (attr) => {
                return <Block23Columns {...attr} />;
            },
        },
        {
            id: '24',
            component: (attr) => {
                return <Block24Columns {...attr} />;
            },
        },
        {
            id: '25',
            component: (attr) => {
                return <Block25Columns {...attr} />;
            },
        },
        {
            id: '26',
            component: (attr) => {
                return <Block26Columns {...attr} />;
            },
        },
        {
            id: '27',
            component: (attr) => {
                return <Block27Columns {...attr} />;
            },
        },
        {
            id: '28',
            component: (attr) => {
                return <Block28Columns {...attr} />;
            },
        },
        {
            id: '29',
            component: (attr) => {
                return <Block29Columns {...attr} />;
            },
        },
        {
            id: '30',
            component: (attr) => {
                return <Block30Columns {...attr} />;
            },
        },
        {
            id: '31',
            component: (attr) => {
                return <Block31Columns {...attr} />;
            },
        },
        {
            id: '32',
            component: (attr) => {
                return <Block32Columns {...attr} />;
            },
        },
        {
            id: '33',
            component: (attr) => {
                return <Block33Columns {...attr} />;
            },
        },
        {
            id: '34',
            component: (attr) => {
                return <Block34Columns {...attr} />;
            },
        },
        {
            id: '35',
            component: (attr) => {
                return <Block35Columns {...attr} />;
            },
        },
        {
            id: '36',
            component: (attr) => {
                return <Block36Columns {...attr} />;
            },
        },
        {
            id: '37',
            component: (attr) => {
                return <Block37Columns {...attr} />;
            },
        },
        {
            id: '38',
            component: (attr) => {
                return <Block38Columns {...attr} />;
            },
        },
        {
            id: '39',
            component: (attr) => {
                return <Block39Columns {...attr} />;
            },
        }
    ];
    let content = '';
    if (['1', '2', '8', '9', '11', '13', '14', '15', '16', '17', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39'].includes(blockType)) {
        columns.map((column) => {
            const { id, component } = column;
            if (blockType === id) {
                content = component({
                    blockWidth,
                    excerpLength,
                    excerptEllipsis,
                    moduleOption,
                    postData,
                    metaDateType,
                    metaDateFormat,
                    metaDateFormatCustom,
                    overlay,
                    postBulk,
                });
            }
        });
    } else if (['3', '4', '5', '6', '7', '10', '12', '18'].includes(blockType)) {
        columns.map((column) => {
            const { id, component } = column;
            if (blockType === id && adsData) {
                content = component({
                    blockWidth,
                    excerpLength,
                    excerptEllipsis,
                    moduleOption,
                    postData,
                    metaDateType,
                    metaDateFormat,
                    metaDateFormatCustom,
                    overlay,
                    postBulk,
                    adsData: adsData,
                });
            }
        });
    }
    return content;
};

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
