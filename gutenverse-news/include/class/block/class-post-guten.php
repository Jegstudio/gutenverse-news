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

/**
 * Class Post Block
 *
 * @package gutenverse\block
 */
class Post_Guten extends Block_Abstract {
	/**
	 * Block Attributes.
	 *
	 * @var array
	 */
	protected $attributes;

	/**
	 * Content.
	 *
	 * @var string
	 */
	protected $content;
	/**
	 * Hold Post block Classname
	 *
	 * @var string
	 */
	protected $class_name = 'gvnews-custom-block';
	/**
	 * Block attributes
	 *
	 * @param array $attributes .
	 */
	public function set_attributes( $attributes ) {
		$this->attributes = $attributes;
	}

	/**
	 * Content
	 *
	 * @param string $content content.
	 */
	protected function set_content( $content ) {
		$this->content = $content;
	}
	/**
	 * Get module
	 *
	 * @param array  $attr      attribute.
	 * @param string $sccontent Inner element.
	 */
	public function get_module( $attr, $sccontent = '' ) {
		$mod = gvnews_get_view_class_from_shortcode( $attr['short_code'] );

		do_action( 'gvnews_build_shortcode_' . strtolower( $mod ) );

		/**
		* Call module class
		*
		* @var ModuleViewAbstract $instance
		*/
		$instance = call_user_func( array( $mod, 'get_instance' ) );

		$content = $instance->build_module( $attr, $sccontent );

		return $content;
	}
	/**
	 * Get content
	 *
	 * @return string
	 */
	public function get_content() {
		return null;
	}
	/**
	 * Render content
	 *
	 * @return string
	 */
	public function render_content() {
		$content = $this->get_content();

		return $content;
	}

	/**
	 * Render view in editor
	 */
	public function render_gutenberg() {
		return $this->render_content();
	}

	/**
	 * Generate container class in editor
	 */
	public function generate_container_class() {
		$class_list = array(
			'guten-element',
			$this->get_element_id(),
			$this->class_name,
			'gvnews-block gvnews-block-wrapper',
			$this->get_custom_classes(),
			$this->set_animation_classes(),
			$this->set_display_classes(),
		);

		return trim( implode( ' ', $class_list ) );
	}

	/**
	 * Render view in frontend
	 */
	public function render_frontend() {
		return '<div class="' . $this->generate_container_class() . '">' .
				$this->render_content() .
			'</div>';
	}
}
