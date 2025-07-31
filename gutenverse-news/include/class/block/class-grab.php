<?php
/**
 * Header element
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block;

/**
 * Class Init
 *
 * @package Gutenverse-News
 */
class Grab {


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
	 * Content.
	 *
	 * @var string
	 */
	protected $is_deprecated = false;

	/**
	 * Method get_content
	 *
	 * @return string
	 */
	public function get_content() {
		return '';
	}

	/**
	 * Render content
	 *
	 * @return string
	 */
	public function render_content() {
		$blockid = strtolower( str_replace( '_', '-', $this->attributes['gvnewsModule'] ) );
		$content = $this->get_content();

		return $this->render_wrapper(
			"block-{$blockid}",
			$content,
		);
	}

	/**
	 * Method render_gutenberg
	 *
	 * @return string
	 */
	public function render_gutenberg() {
		return $this->render_content();
	}

	/**
	 * Get element ID.
	 *
	 * @return string
	 */
	protected function get_element_id() {
		$element_id = isset( $this->attributes['elementId'] ) ? $this->attributes['elementId'] : '';
		return esc_attr( $element_id );
	}

	/**
	 * Method render_frontend
	 *
	 * @return string
	 */
	public function render_frontend() {
		$element_id      = $this->get_element_id();
		$display_classes = $this->set_display_classes();
		$extra_classes   = ' ';
		if ( isset( $this->attributes['widthClass'] ) && $this->attributes['widthClass'] ) {
			$extra_classes .= $this->attributes['widthClass'];
		}
		return '<div class="' . $element_id . $display_classes . $extra_classes . ' gvnews-block gvnews-block-wrapper">' . $this->render_content() . '</div>';
	}

	/**
	 * Method render
	 *
	 * @param mixed  $attributes $attributes attributes.
	 * @param string $content    $content content.
	 *
	 * @return string
	 */
	public function render( $attributes, $content ) {
		$this->set_attributes( $attributes );
		$this->set_content( $content );
		$this->is_deprecated = $this->check_deprecated();
		if ( ( defined( 'REST_REQUEST' ) && REST_REQUEST ) || gutenverse_is_block_editor() ) {
			return $this->render_gutenberg();
		} else {
			return $this->render_frontend();
		}
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
		* @var \GUTENVERSE\NEWS\Block\Block_View_Abstract $instance
		*/
		$instance = call_user_func( array( $mod, 'get_instance' ) );

		$content = $instance->build_module( $attr, $sccontent );

		return $content;
	}

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
	 * Build element with wrapper
	 *
	 * @param string $element_name  Element name.
	 * @param string $inner         Inner element.
	 * @param array  $array_classes Classes.
	 * @param array  $array_data    Data attribute.
	 * @param array  $id            Element ID.
	 *
	 * @return string
	 */
	protected function render_wrapper( $element_name, $inner, $array_classes = array(), $array_data = array(), $id = null ) {
		$classes = '';
		$data    = '';

		foreach ( $array_classes as $class ) {
			$classes = $classes . ' ' . $class;
		}

		foreach ( $array_data as $key => $value ) {
			$data = $data . ' data-' . $key . '="' . $value . '"';
		}

		if ( $id ) {
			$id = 'id="' . $id . '"';
		}

		$classes = 'gutenverse gvnews-' . $element_name . $classes . ' ' . $this->get_element_id();
		if ( $this->is_deprecated ) {
			$classes .= ' gvnews-deprecated-block';
		}

		return '<div ' . $id . ' class="' . $classes . '" ' . $data . '>' . $this->render_deprecated() . $inner . '</div>';
	}

	/**
	 * Method get_vc_class_name
	 *
	 * @return string
	 */
	public function get_vc_class_name() {
		$class_name = null;

		if ( isset( $this->attributes['css'] ) ) {
			$css_exploded = explode( '{', $this->attributes['css'] );
			$class        = $css_exploded[0];
			$class_name   = substr( $class, 1 );
		}

		if ( isset( $this->attributes['boxed'] ) && $this->attributes['boxed'] ) {
			$class_name .= ' gvnews_pb_boxed';
		}
		if ( isset( $this->attributes['boxed_shadow'] ) && $this->attributes['boxed_shadow'] ) {
			$class_name .= ' gvnews_pb_boxed_shadow';
		}

		return $class_name;
	}

	/**
	 * Display classes
	 *
	 * @return string
	 */
	protected function set_display_classes() {
		$display_classes = ' ';

		if ( isset( $this->attributes['hideDesktop'] ) && ( true === $this->attributes['hideDesktop'] || 'true' === $this->attributes['hideDesktop'] ) ) {
			$display_classes .= 'hide-desktop ';
		}

		if ( isset( $this->attributes['hideTablet'] ) && ( true === $this->attributes['hideTablet'] || 'true' === $this->attributes['hideTablet'] ) ) {
			$display_classes .= 'hide-tablet ';
		}

		if ( isset( $this->attributes['hideMobile'] ) && ( true === $this->attributes['hideMobile'] || 'true' === $this->attributes['hideMobile'] ) ) {
			$display_classes .= 'hide-mobile ';
		}

		return $display_classes;
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
		if ( $this->is_deprecated && ! gutenverse_pro_active() ) {
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
