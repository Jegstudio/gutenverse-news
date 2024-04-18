<?php
/**
 * Archive Pagination
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block\Archive;

/**
 * Archive_Pagination
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Archive_Pagination extends Archive_View_Abstract {


	/**
	 * Method render_module_front
	 *
	 * @param array  $attr         attribute.
	 * @param string $column_class column class.
	 *
	 * @return string
	 */
	public function render_module_front( $attr, $column_class ) {
		return $this->build_pagination_module( $attr, false, $column_class );
	}

	/**
	 * Method build_pagination_module
	 *
	 * @param array  $attr         attribute.
	 * @param array  $total        total.
	 * @param string $column_class column class.
	 *
	 * @return string
	 */
	public function build_pagination_module( $attr, $total, $column_class ) {
		$column_class .= ' ' . esc_attr( $this->get_vc_class_name() );
		return gvnews_paging_navigation( $attr, $total, $column_class );
	}
}
