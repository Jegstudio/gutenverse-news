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
	 * Method render_module
	 *
	 * @param array  $attr         attribute.
	 * @param string $column_class column class..
	 *
	 * @return string
	 */
	public function render_module( $attr, $column_class ) {
		$column_class .= ' ' . esc_attr( $this->get_vc_class_name() );
		return gvnews_paging_navigation( $attr, false, $column_class );
	}
}
