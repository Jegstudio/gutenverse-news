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

export {searchPosts, searchPages, searchCategory, searchAuthor, searchTag, searchCustomPostTemplate};