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
                    // ✅ Get all blocks
                    const allBlocks = select('core/block-editor').getBlocks();
                    const blockNames = allBlocks.map(block => block.name);
                    const deprecatedBlockNames = [
                        'gutenverse/news-carousel-1',
                        'gutenverse/news-carousel-2',
                        'gutenverse/news-carousel-3',
                    ];
                    // ✅ Cek apakah ada block yang deprecated
                    const hasDeprecated = blockNames.some(name => deprecatedBlockNames.includes(name));

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
