<?php
/**
 * Archive Pagination
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block\Archive;

use GUTENVERSE\NEWS\Util\Svg_Icons;

/**
 * Archive_Pagination
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Archive_Pagination extends Archive_View_Abstract {

	/**
	 * Method render_module
	 *
	 * @param array  $attr         attribute.
	 * @param string $column_class column class..
	 *
	 * @return string
	 */
	public function render_module( $attr, $column_class ) {
		$column_class .= ' ' . esc_attr( $this->get_vc_class_name() );

		$attr['prev_text'] = Svg_Icons::render_svg_icon( 'fas fa-angle-left' ) . $attr['prev_text'];
		$attr['next_text'] = $attr['next_text'] . Svg_Icons::render_svg_icon( 'fas fa-angle-right' );
		return gvnews_paging_navigation( $attr, false, $column_class );
	}
}
