<?php
/**
 * Post Comment
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
 * Post_Comment
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Post_Comment extends Grab {

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
		$classes    = '';
		$data       = '';
		$parts      = preg_split( '/[\\\\\/]/', $element_name );
		$block_type = end( $parts );

		foreach ( $array_classes as $class ) {
			$classes = $classes . ' ' . $class;
		}

		foreach ( $array_data as $key => $value ) {
			$data = $data . ' data-' . $key . '="' . $value . '"';
		}

		if ( $id ) {
			$id = 'id="' . $id . '"';
		}

		$classes = 'gutenverse gvnews-' . $block_type . $classes . ' ' . $this->get_element_id();

		return '<div ' . $id . ' class="' . $classes . '" ' . $data . '>' . $inner . '</div>';
	}

	/**
	 * Method get_content
	 *
	 * @return string
	 */
	public function get_content() {
		add_filter( 'comments_open', '__return_true' );
		ob_start();
		comments_template();

		$wrapper_classes = gvnews_build_html_classes(
			array(
				'gvnews_comment_container',
				'gvnews_custom_comment_wrapper',
				esc_attr( $this->get_vc_class_name() ),
			)
		);

		return "<div class='{$wrapper_classes}'>" . ob_get_clean() . '</div>';
	}
}
