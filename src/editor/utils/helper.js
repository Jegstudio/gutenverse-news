import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';

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

        if (undefined !== block.attributes.width.Desktop) {
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

}

export { searchPosts, searchPages, searchCategory, searchAuthor, searchTag, searchCustomPostTemplate , getParentColumnWidth };