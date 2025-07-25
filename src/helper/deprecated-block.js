(function () {
    function setDeprecatedPopupEvent() {
        const popup = document.getElementById('gvnews-deprecated-popup');

        if (popup) {
            document.getElementById('gvnews-popup-close')?.addEventListener('click', () => {
                document.body.classList.remove('gvnews-deprecated-popup');
            });

            document.getElementById('gvnews-popup-ok')?.addEventListener('click', () => {
                document.body.classList.remove('gvnews-deprecated-popup');
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
                        document.body.classList.add('gvnews-deprecated-popup');
                    });
                });
            });
        }
    }

    function showPopup() {
        document.body.classList.add('gvnews-deprecated-popup');
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

                    const deprecatedBlockNames = [
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
                    ];
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
