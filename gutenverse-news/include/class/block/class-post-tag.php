<?php
/**
 * Post tag
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block;

use GUTENVERSE\NEWS\Util\Single\Single_Post;
use GUTENVERSE\NEWS\Block\Post_Guten;

/**
 * Post_Tag
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Post_Tag extends Post_Guten {
	/**
	 * Hold Post Tags Classname
	 *
	 * @var array
	 */
	protected $class_name = 'gvnews-post-tags';
	/**
	 * Render content
	 *
	 * @return string
	 */
	public function render_content() {
		if ( has_tag() ) {
			ob_start();
			Single_Post::get_instance()->render_post_tag();
			$tag = ob_get_clean();

			return $tag;
		}
	}

	/**
	 * Check if this block is already deprecated.
	 *
	 * @return boolean
	 */
	public function check_deprecated() {
		return current_user_can( 'edit_pages' );
	}
}
