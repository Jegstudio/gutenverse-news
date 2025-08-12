<?php
/**
 * Post title
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
 * Post_Title
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Post_Title extends Post_Guten {

	/**
	 * Method get_custom_classes;
	 *
	 * @return string
	 */
	public function get_custom_classes() {
		return 'gvnews-post-title';
	}

	/**
	 * Method get_content
	 *
	 * @return string
	 */
	public function get_content() {

		return '<div class="title-wrapper">
					<h1 class="the-title">' . esc_attr( get_the_title() ) . '</h1>'
					. apply_filters( 'gvnews_metabox_subtitle_component', '' ) .
					'</div>';
	}
}
