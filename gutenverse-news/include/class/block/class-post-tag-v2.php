<?php
/**
 * Post Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block;

use Gutenverse\Framework\Block\Block_Abstract;
use GUTENVERSE\NEWS\Util\Single\Single_Post;
use GUTENVERSE\NEWS\Block\Post_Guten;

/**
 * Class Post Block
 *
 * @package gutenverse\block
 */
class Post_Tag_V2 extends Post_Guten {
	/**
	 * Hold Post Tags Classname
	 *
	 * @var array
	 */
	protected $className = 'gvnews-post-tags';
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
}
