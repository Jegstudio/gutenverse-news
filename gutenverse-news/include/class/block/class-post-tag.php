<?php
/**
 * Post tag
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
 * Post_Tag
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Post_Tag extends Grab {

	/**
	 * Method get_content
	 *
	 * @return string
	 */
	public function get_content() {
		if ( has_tag() ) {
			ob_start();
			Single_Post::get_instance()->render_post_tag();
			$tag = ob_get_clean();

			$wrapper_classes = gvnews_build_html_classes(
				array(
					'gvnews_custom_tag_wrapper',
					esc_attr( $this->get_vc_class_name() ),
				)
			);

			return "<div class='{$wrapper_classes}'>
                    <div class=\"gvnews_post_tags\">
                        {$tag}
                    </div>
                </div>";
		}
	}
}
