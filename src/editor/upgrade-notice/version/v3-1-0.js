export const ContentV310 = () => {

    return (
        <>
            <h2 className="update-title">What’s New</h2>
            <p className="update-desc">In this version, we introduce a set of meaningful improvements focused on flexibility, performance, and better design control across all Gutenverse News blocks.</p>
            <ol>
                <li>Improvements & Enhancements</li>
                <p>The Archive Hero block is now available again as a free feature, giving more flexibility when building archive pages. Design control has been expanded across all blocks with additional Meta and Typography options, along with richer styling controls for the Module Header, News Ticker, Archive Pagination, Hero blocks, Slider navigation, and the Post Author Box. Module blocks now offer more layout customization, including rendered thumbnail size, container and card styles, post item gaps, and improved spacing for category labels. Archive-related blocks receive further enhancements such as Tag Type options for Archive Description, customizable “no content” states, and clearer messaging when no search results are found. Spacing options have also been reorganized into the Settings tab for a cleaner and more consistent configuration experience. In addition, user profiles now support social media URL fields that can be displayed in the Post Author Box block.</p>
                <li>Performance Improvements</li>
                <p>We have completely removed jQuery usage from all blocks to reduce dependencies and improve loading efficiency. The asset loading mechanism has also been improved across all blocks to ensure better performance, smoother rendering, and a more responsive experience overall.</p>
                <li>Bug Fixes</li>
                <p>This update fixes an issue where the Archive block did not work correctly on archive search pages. It also resolves Post Masonry issues affecting Module – 32, Module – 33, Module – 34, and Module – 35. In addition, the Post Meta block now correctly allows Left and Right Meta elements to be left empty, and spacing option issues on the Archive Description block have been fixed to ensure more consistent layouts.</p>
            </ol>
        </>
    );
};

