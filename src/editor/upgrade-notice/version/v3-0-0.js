
export const ContentV300 = () => {

    return (
        <>
            <h2 className="update-title">What’s New</h2>
            <p className="update-desc">In this version, we are making major changes, including the removal of several blocks and options, renaming a block, and fixing a bug.</p>
            <ol>
                <li>Why are some blocks and features being removed?</li>
                <p>We’ve restructured every block and feature we previously released to ensure long-term sustainability. As you may know, this is our full-time work, and each development comes with costs that we need to cover.</p>
                <p>The block has not been deleted, you can still access it, but you cannot create a new one or edit the existing block. If you believe the plugin is worth it, we’d greatly appreciate your support by upgrading to the Pro version.</p>

                <li>Block Name Changes</li>
                <p>We changed the block name from <b>Post Author</b> to <b>Post Author Box</b>, and renamed the <b>Featured Image</b> block to <b>Advanced Featured Image</b>. These changes were made to avoid having the same block names as those in the <b>Gutenverse</b> plugin.</p>

                <li>Bug Fix</li>
                <p>Fixed an issue where the <b>Include Post</b> filter did not work properly when adding more than one post.</p>
            </ol>
        </>
    );
};

