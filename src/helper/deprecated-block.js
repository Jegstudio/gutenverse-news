(function () {
    function setDeprecatedPopupEvent() {
        const popup = document.getElementById('gvnews-deprecated-popup');

        if (popup) {
            document.getElementById('gvnews-popup-close')?.addEventListener('click', () => {
                document.body.classList.remove('gvnews-deprecated-popup', 'gvnews-deprecated-options', 'gvnews-deprecated-blocks');
            });
        }
    }

    function setLearnMoreEvent() {
        const deprecatedBlocks = document.querySelectorAll('.gvnews-deprecated-block');

        if (deprecatedBlocks.length > 0) {
            setTimeout(showPopup, 3000);
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
                    setDeprecatedPopupEvent();

                    // ✅ Get all blocks recursively
                    const topLevelBlocks = select('core/block-editor').getBlocks();
                    const allBlocks = getAllBlocksRecursive(topLevelBlocks);
                    const blockNames = allBlocks.map(block => block.name);
                    let deprecatedBlockNames = [];
                    if (GVNwsDeprecatedIsPro) {
                        deprecatedBlockNames = [
                            'gutenverse/news-post-title',
                            'gutenverse/news-post-tag',
                            'gutenverse/news-post-comment',
                            'gutenverse/news-archive-title',
                        ];
                    } else {
                        deprecatedBlockNames = [
                            'gutenverse/news-carousel-1',
                            'gutenverse/news-carousel-2',
                            'gutenverse/news-carousel-3',
                            'gutenverse/news-hero-6',
                            'gutenverse/news-hero-7',
                            'gutenverse/news-hero-8',
                            'gutenverse/news-hero-9',
                            'gutenverse/news-hero-10',
                            'gutenverse/news-hero-11',
                            'gutenverse/news-hero-12',
                            'gutenverse/news-hero-13',
                            'gutenverse/news-hero-14',
                            'gutenverse/news-hero-skew',
                            'gutenverse/news-block-10',
                            'gutenverse/news-block-11',
                            'gutenverse/news-block-12',
                            'gutenverse/news-block-13',
                            'gutenverse/news-block-14',
                            'gutenverse/news-block-15',
                            'gutenverse/news-block-16',
                            'gutenverse/news-block-17',
                            'gutenverse/news-block-18',
                            'gutenverse/news-block-19',
                            'gutenverse/news-block-20',
                            'gutenverse/news-block-21',
                            'gutenverse/news-block-22',
                            'gutenverse/news-block-23',
                            'gutenverse/news-block-24',
                            'gutenverse/news-block-25',
                            'gutenverse/news-block-26',
                            'gutenverse/news-block-27',
                            'gutenverse/news-block-28',
                            'gutenverse/news-block-29',
                            'gutenverse/news-block-30',
                            'gutenverse/news-block-31',
                            'gutenverse/news-block-32',
                            'gutenverse/news-block-33',
                            'gutenverse/news-block-34',
                            'gutenverse/news-block-35',
                            'gutenverse/news-block-36',
                            'gutenverse/news-block-37',
                            'gutenverse/news-block-38',
                            'gutenverse/news-block-39',
                            'gutenverse/news-slider-2',
                            'gutenverse/news-slider-3',
                            'gutenverse/news-slider-4',
                            'gutenverse/news-slider-5',
                            'gutenverse/news-slider-6',
                            'gutenverse/news-slider-7',
                            'gutenverse/news-slider-8',
                            'gutenverse/news-slider-9',
                            'gutenverse/news-post-title',
                            'gutenverse/news-rss',
                            'gutenverse/news-post-tag',
                            'gutenverse/news-post-prev-next',
                            'gutenverse/news-archive-hero',
                            'gutenverse/news-post-comment',
                            'gutenverse/news-archive-title',
                        ];
                    }

                    const hasDeprecated = blockNames.some(name =>
                        deprecatedBlockNames.includes(name)
                    );

                    if (hasDeprecated) {
                        setTimeout(showPopup, 3000);
                    }
                }
            });
        });
    } else {
        document.addEventListener('DOMContentLoaded', function () {
            setDeprecatedPopupEvent();
            setLearnMoreEvent();
        });
    }
})();
