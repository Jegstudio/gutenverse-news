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
	 * Method render_frontend
	 *
	 * @return string
	 */
	public function render_frontend() {
		$element_id      = $this->attributes['elementId'];
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
	 * @param $attributes $attributes attributes.
	 * @param $content    $content content.
	 *
	 * @return string
	 */
	public function render( $attributes, $content ) {
		$this->set_attributes( $attributes );
		$this->set_content( $content );

		if ( defined( 'REST_REQUEST' ) && REST_REQUEST ) {
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
		* @var ModuleViewAbstract $instance
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

		$classes = 'gutenverse gvnews-' . $element_name . $classes . ' ' . $this->attributes['elementId'];

		return '<div ' . $id . ' class="' . $classes . '" ' . $data . '>' . $inner . '</div>';
	}

	/**
	 * Method get_vc_class_name
	 *
	 * @return string
	 */
	public function get_vc_class_name() {
		$class_name = null;

		if ( isset( $this->attribute['css'] ) ) {
			$css_exploded = explode( '{', $this->attribute['css'] );
			$class        = $css_exploded[0];
			$class_name   = substr( $class, 1 );
		}

		if ( isset( $this->attribute['boxed'] ) && $this->attribute['boxed'] ) {
			$class_name .= ' gvnews_pb_boxed';
		}
		if ( isset( $this->attribute['boxed_shadow'] ) && $this->attribute['boxed_shadow'] ) {
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
}
