<?php
/**
 * Post featured
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block;

use GUTENVERSE\NEWS\Block\Grab;
use GUTENVERSE\NEWS\Util\Single\Single_Post;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Post_Featured
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Post_Featured extends Grab {

	/**
	 * Method get_content
	 *
	 * @return string
	 */
	public function get_content() {
		$single       = Single_Post::get_instance();
		$current_page = gvnews_get_post_current_page();

		if ( 1 === $current_page ) {
			ob_start();
			$single->feature_post_1( 'gvnews-' . esc_attr( $this->attributes['imageSize'] ), 'gvnews-' . esc_attr( $this->attributes['gallerySize'] ), null, );
			return ob_get_clean();
		}
	}
}
