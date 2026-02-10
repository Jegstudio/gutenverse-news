<?php
/**
 * Archive Description
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block\Archive;

/**
 * Archive_Desc
 *
 * @package gutenverse-news
 * @author  Jegstudio
 */
class Archive_Desc extends Archive_View_Abstract {


	/**
	 * Method render_module
	 *
	 * @param array  $attr         attribute.
	 * @param string $column_class column class..
	 *
	 * @return string
	 */
	public function render_module( $attr, $column_class ) {
		$term = $this->get_term();
		$desc = isset( $term->description ) ? $term->description : '';

		$tag  = isset( $attr['tagType'] ) ? $attr['tagType'] : 'h2';
		return '<' . $tag . ' class="archive-desc">' . esc_attr( $desc ) . '</' . $tag . '>';
	}
}
