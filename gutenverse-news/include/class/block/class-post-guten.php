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

	/**
	 * Content.
	 *
	 * @var string
	 */
	protected $is_deprecated = false;

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

		if ( $this->is_deprecated ) {
			$class_list[] = ' gvnews-deprecated-block';
		}

		return trim( implode( ' ', $class_list ) );
	}

	/**
	 * Render view in frontend
	 */
	public function render_frontend() {
		$this->is_deprecated = $this->check_deprecated();
		return '<div class="' . $this->generate_container_class() . '">' .
				$this->render_content() . $this->render_deprecated() .
			'</div>';
	}

	/**
	 * Check if this block is already deprecated.
	 *
	 * @return boolean
	 */
	public function check_deprecated() {
		return false;
	}

	/**
	 * Render the overlay deprecated block notice.
	 *
	 * @return string
	 */
	protected function render_deprecated() {
		if ( $this->is_deprecated ) {
			wp_enqueue_script( 'gvnews-deprecated-blocks' );
			wp_enqueue_style( 'gvnews-deprecated-blocks' );
			add_filter( 'gvnews_print_deprecated_popup', '__return_true' );
			return '<div class="deprecated-block-content">	
						<span> 
							<svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M18.06 15.682L10.0437 0.713169C9.98868 0.617647 9.90947 0.538307 9.81404 0.483139C9.7186 0.427972 9.61032 0.398926 9.50009 0.398926C9.38986 0.398926 9.28158 0.427972 9.18614 0.483139C9.09071 0.538307 9.0115 0.617647 8.95649 0.713169L0.94109 15.682C0.888058 15.7754 0.860555 15.8811 0.861345 15.9886C0.862135 16.096 0.89119 16.2013 0.94559 16.294C1.05809 16.4839 1.26239 16.6 1.48379 16.6H17.5164C17.6248 16.5996 17.7314 16.5712 17.8257 16.5176C17.92 16.464 17.9988 16.387 18.0546 16.294C18.1091 16.2014 18.1383 16.0961 18.1393 15.9887C18.1402 15.8813 18.1129 15.7755 18.06 15.682ZM10.4001 14.8H8.60009V13H10.4001V14.8ZM10.4001 11.65H8.60009V5.79997H10.4001V11.65Z" fill="#EEBC0D"/>
							</svg> 
							<p><b>Deprecated</b>: This block is no longer supported.</p>
						</span> 
						<a href="javascript:void(0);">Learn More </a>
					</div>';
		}
	}
}
