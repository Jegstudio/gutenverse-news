<?php
/**
 * Previouse Next Post
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block;

use GUTENVERSE\NEWS\Block\Grab;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


/**
 * Post_Prev_Next
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Post_Prev_Next extends Grab {

	/**
	 * Method get_content
	 *
	 * @return string
	 */
	public function get_content() {
		ob_start();
		get_template_part( 'fragment/post/prev-next-post' );
		$prevnext = ob_get_clean();

		$wrapper_classes = gvnews_build_html_classes(
			array(
				'gvnews_custom_prev_next_wrapper',
				'gvnews_prev_next_container',
				esc_attr( $this->get_vc_class_name() ),
			)
		);

		return "<div class='{$wrapper_classes}'>                
                {$prevnext}                
            </div>";
	}
}
