<?php
/**
 * Post Comment
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block;

use GUTENVERSE\NEWS\Block\Grab;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


/**
 * Post_Comment
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Post_Comment extends Post_Guten {

	/**
	 * Method get_custom_classes;
	 *
	 * @return string
	 */
	public function get_custom_classes() {
		return 'gvnews-post-comment';
	}

	/**
	 * Method get_content
	 *
	 * @return string
	 */
	public function get_content() {
		add_filter( 'comments_open', '__return_true' );
		ob_start();
		comments_template();

		return ob_get_clean();
	}
}
