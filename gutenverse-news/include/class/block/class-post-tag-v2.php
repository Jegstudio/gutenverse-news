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

/**
 * Class Post Block
 *
 * @package gutenverse\block
 */
class Post_Tag_V2 extends Block_Abstract {
	/**
	 * Hold Post Tags Classname
	 *
	 * @var array
	 */
	private static $className = 'gvnews-post-tags';
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
	 * Render view in editor
	 */
	public function render_gutenberg() {
		return $this->render_content();
	}

	/**
	 * Render view in frontend
	 */
	public function render_frontend() {
		$element_id      = $this->get_element_id();
		$display_classes = $this->set_display_classes();
		$animation_class = $this->set_animation_classes();
		$custom_classes  = $this->get_custom_classes();

		return '<div class="guten-element '. $element_id . $animation_class . $custom_classes. ' ' . self::$className. $display_classes . '">' . 
				$this->render_content() . 
			'</div>';
	}
}
