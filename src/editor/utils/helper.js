import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';

const createChunks = (datas, chunkSize) => {
    const result = [];
    for (let i = 0; i < datas.length; i += chunkSize) {
        result.push(datas.slice(i, i + chunkSize));
    }
    return result;
};

const searchPosts = input => new Promise(resolve => {
    apiFetch({
        path: addQueryArgs('/wp/v2/posts', {
            search: input,
        }),
    }).then(data => {
        const promiseOptions = data.map(item => {
            return {
                label: item.title.rendered,
                value: item.id
            };
        });

        resolve(promiseOptions);
    }).catch(() => {
        resolve([]);
    });
});

const searchPages = input => new Promise(resolve => {
    apiFetch({
        path: addQueryArgs('/wp/v2/pages', {
            search: input,
        }),
    }).then(data => {
        const promiseOptions = data.map(item => {
            return {
                label: item.title.rendered,
                value: item.id
            };
        });

        resolve(promiseOptions);
    }).catch(() => {
        resolve([]);
    });
});

const searchCategory = input => new Promise(resolve => {
    apiFetch({
        path: addQueryArgs('/wp/v2/categories', {
            search: input,
        }),
    }).then(data => {
        const promiseOptions = data.map(item => {
            return {
                label: item.name,
                value: item.id
            };
        });

        resolve(promiseOptions);
    }).catch(() => {
        resolve([]);
    });
});

const searchAuthor = input => new Promise(resolve => {
    apiFetch({
        path: addQueryArgs('/wp/v2/users', {
            search: input,
        }),
    }).then(data => {
        const promiseOptions = data.map(item => {
            return {
                label: item.name,
                value: item.id
            };
        });

        resolve(promiseOptions);
    }).catch(() => {
        resolve([]);
    });
});

const searchTag = input => new Promise(resolve => {
    apiFetch({
        path: addQueryArgs('/wp/v2/tags', {
            search: input,
        }),
    }).then(data => {
        const promiseOptions = data.map(item => {
            return {
                label: item.name,
                value: item.id
            };
        });

        resolve(promiseOptions);
    }).catch(() => {
        resolve([]);
    });
});

const searchCustomPostTemplate = input => new Promise(resolve => {
    apiFetch({
        path: addQueryArgs('/wp/v2/posts', {
            search: input,
            post_type: 'custom-post-template'
        }),
    }).then(data => {
        const promiseOptions = data.map(item => {
            return {
                label: item.title.rendered,
                value: item.id
            };
        });

        resolve(promiseOptions);
    }).catch(() => {
        resolve([]);
    });
});

const gutenverseProActive = (window.GVNewsConfig && window.GVNewsConfig.gutenversePro);

// const phpFunctionCaller = input => new Promise(resolve => {
//     apiFetch({
//         path: addQueryArgs('/gvnews-client/v1/php-function-caller'),
//         method: 'POST',
//         data: {
//             attr: attr
//         }
//     }).then((data) => {
//         const promiseOptions = data.map(item => {
//             return {
//                 label: item.title.rendered,
//                 value: item.id
//             };
//         });
//         resolve(promiseOptions);
//     }).catch((e) => {
//         console.error(e.message);
//     })
// });

const getParentColumnWidth = (parents, getBlock) => {
    if (undefined !== parents) {
        const block = getBlock(parents);

        if (block?.attributes?.width?.Desktop !== undefined) {
            if (block.attributes.width.Desktop < 34) {
                return 4;
            } else if (block.attributes.width.Desktop < 51) {
                return 6;

            } else if (block.attributes.width.Desktop < 67) {
                return 8;
            }
        }
        return 12;
    }

};

const getModuleOptions = () => {

    const { moduleOption = {} } = window.GVNewsConfig;
    const defaultOption = {
        meta_show: true,
        meta_comment: true,
        meta_author: true,
        meta_rating: true,
        meta_date: true,
        meta_views: true,
        date_format: 'F j, Y',
        date_module: 'F j, Y',
        date_type: 'published', /* publish |  modified | both */
        post_count: 0,
    };
    return {
        string: {
            read_more: __('Read more', 'gutenverse-news'),
            next: __('Next', 'gutenverse-news'),
            previous: __('Previous', 'gutenverse-news'),
            load_more: __('Load More', 'gutenverse-news'),
            by: __('by', 'gutenverse-news'),
            no_content: __('No Content Available', 'gutenverse-news'),
        },
        option: {
            ...defaultOption,
            ...moduleOption,
        }
    };
};

export { createChunks, searchPosts, searchPages, searchCategory, searchAuthor, searchTag, searchCustomPostTemplate, getParentColumnWidth, getModuleOptions, gutenverseProActive };