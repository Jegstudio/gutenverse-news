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
class Post_Comment extends Grab {

	/**
	 * Method get_content
	 *
	 * @return string
	 */
	public function get_content() {
		add_filter( 'comments_open', '__return_true' );
		ob_start();
		comments_template();

		$wrapper_classes = gvnews_build_html_classes(
			array(
				'gvnews_comment_container',
				'gvnews_custom_comment_wrapper',
				esc_attr( $this->get_vc_class_name() ),
			)
		);

		return "<div class='{$wrapper_classes}'>" . ob_get_clean() . '</div>';
	}
}
