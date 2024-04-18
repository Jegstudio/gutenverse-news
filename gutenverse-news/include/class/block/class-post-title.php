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
class Post_Title extends Grab {

	/**
	 * Method get_content
	 *
	 * @return string
	 */
	public function get_content() {

		$wrapper_classes = gvnews_build_html_classes(
			array(
				'gvnews_custom_title_wrapper',
				esc_attr( $this->get_vc_class_name() ),
			)
		);

		return "<div  class='{$wrapper_classes}'>
                <h1 class=\"gvnews_post_title\">" . esc_attr( get_the_title() ) . '</h1>
            </div>';
	}
}
