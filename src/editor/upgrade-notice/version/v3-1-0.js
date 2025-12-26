export const ContentV310 = () => {

    return (
        <>
            <h2 className="update-title">What’s New in This Update</h2>
            <p className="update-desc">This release brings meaningful improvements to flexibility, performance, and design control—giving you more freedom to build and style the Gutenverse News Blocks</p>
            <div className="update-item">
                <h3>Highlights</h3>
                <ul>
                    <li> The Archive Hero block is now available again in the Free version</li>
                    <li> Convert Webfonts to SVG icons for better performance and SEO</li>
                    <li> Expanded Meta and Typography controls across all blocks</li>
                    <li> Richer styling options for Module Header, News Ticker, Author Box, and Hero blocks</li>
                    <li> More control over Archive elements, including Pagination, Description, and “No Content” states</li>
                    <li> Flexible layout improvements such as post item gaps, category label spacing, and border controls</li>
                    <li> Ability to disable the Read More button and customize thumbnail rendering sizes</li>
                    <li> Cleaner settings experience with Spacing options moved into the Settings tab</li>
                </ul>
            </div>
            <div className="update-item">
                <h3>Performance Improvements</h3>
                <ul>
                    <li>Fully removed jQuery dependency across all blocks</li>
                    <li>Improved asset loading mechanism for faster and more efficient rendering</li>
                </ul>
            </div>

            <div className="update-item">
                <h3>Bug Fixes</h3>
                <ul>
                    <li>Fixed Archive block issues on archive search pages</li>
                    <li>Resolved Masonry layout issues on Modules 32–35</li>
                    <li>Fixed Post Meta block limitations when using empty Left/Right meta elements</li>
                    <li>Addressed spacing issues on the Archive Description block</li>
                </ul>
            </div>
        </>
    );
};

