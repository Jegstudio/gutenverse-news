(function (wp) {
    function setDeprecatedPopupEvent() {
        const popup = document.getElementById('gvnews-deprecated-popup');

        if (popup) {
            document.getElementById('gvnews-popup-close')?.addEventListener('click', () => {
                document.body.classList.remove('gvnews-deprecated-popup', 'gvnews-deprecated-options', 'gvnews-deprecated-blocks');
            });
        }
    }

    function setDeprecatedNoticeEvent() {
        const notice = document.getElementById('gvnews-deprecated-notice');

        if (notice) {
            document.getElementById('gvnews-notice-close')?.addEventListener('click', () => {
                document.body.classList.remove('gvnews-deprecated-notice');
                dismissNotice();
            });

            document.getElementById('gvnews-notice-learn-more')?.addEventListener('click', () => {
                document.body.classList.add('gvnews-deprecated-popup', 'gvnews-deprecated-blocks');
            });
        }
    }

    function setLearnMoreEvent() {
        const deprecatedBlocks = document.querySelectorAll('.gvnews-deprecated-block');
        if (deprecatedBlocks.length > 0) {
            deprecatedBlocks.forEach(block => {
                block.querySelectorAll('a').forEach(anchor => {
                    anchor.addEventListener('click', () => {
                        document.body.classList.add('gvnews-deprecated-popup', 'gvnews-deprecated-blocks');
                    });
                });
            });
        }
    }

    function showPopup() {
        document.body.classList.add('gvnews-deprecated-popup', 'gvnews-deprecated-blocks');
    }

    function dismissNotice() {
        const { apiNonce = '' } = window['GVNwsDeprecated'] || {};
        wp.apiFetch({
            path: '/gvnews-client/v1/dismissNotice',
            method: 'POST',
            data: {
                notice: 'deprecated_gutenverse_news',
                nonce: apiNonce,
            }
        });
    }

    function showEditorNotice() {
        wp.data.dispatch('core/notices').createNotice(
            'warning',
            'One or more Gutenverse News blocks in this page are deprecated and will be removed in the next plugin update. Please replace them to ensure your layout remains functional',
            {
                isDismissible: true,
                actions: [
                    {
                        label: 'Learn More',
                        onClick: () => {
                            showPopup();
                        }
                    },
                ],
                onDismiss: () => {
                    dismissNotice();
                }
            }
        );
    }

    // 🔁 Recursive function to get all blocks (including inner blocks)
    function getAllBlocksRecursive(blocks) {
        const all = [];

        blocks.forEach(block => {
            all.push(block);
            if (block.innerBlocks && block.innerBlocks.length > 0) {
                all.push(...getAllBlocksRecursive(block.innerBlocks));
            }
        });

        return all;
    }

    const isBlockEditor =
        typeof wp !== 'undefined' &&
        wp.data?.select('core/editor') &&
        wp.data?.select('core/block-editor');

    if (isBlockEditor) {
        const { dismissed = '' } = window['GVNwsDeprecated'] || {};
        setDeprecatedPopupEvent();
        if (dismissed !== 'dismissed') {
            wp.domReady(() => {
                const { subscribe, select } = wp.data;
                let alreadyRun = false;

                const unsubscribe = subscribe(() => {
                    const isReady =
                        select('core/editor').__experimentalIsEditorReady?.() ||
                        select('core/block-editor').getBlocks().length > 0;

                    if (isReady && !alreadyRun) {
                        alreadyRun = true;
                        unsubscribe();

                        // ✅ Get all blocks recursively
                        const topLevelBlocks = select('core/block-editor').getBlocks();
                        const allBlocks = getAllBlocksRecursive(topLevelBlocks);
                        const blockNames = allBlocks.map(block => block.name);
                        const deprecatedBlockNames = [
                            'gutenverse/news-post-title',
                            'gutenverse/news-post-tag',
                            'gutenverse/news-post-comment',
                            'gutenverse/news-archive-title',
                        ];

                        const hasDeprecated = blockNames.some(name =>
                            deprecatedBlockNames.includes(name)
                        );

                        if (hasDeprecated) {
                            showEditorNotice();
                        }
                    }
                });
            });
        }

    } else {
        document.addEventListener('DOMContentLoaded', function () {
            setDeprecatedPopupEvent();
            setLearnMoreEvent();
            setDeprecatedNoticeEvent();
        });
    }
})(window.wp);