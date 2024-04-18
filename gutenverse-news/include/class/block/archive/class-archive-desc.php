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
	 * Method render_module_front
	 *
	 * @param array  $attr         attribute.
	 * @param string $column_class column class.
	 *
	 * @return string
	 */
	public function render_module_front( $attr, $column_class ) {
		$term = $this->get_term();
		$desc = isset( $term->description ) ? $term->description : '';

		return "<div class='gvnews_archive_description_wrapper " . esc_attr( $this->get_vc_class_name() ) . ' ' . esc_attr( $attr['scheme'] ) . ' ' . esc_attr( $attr['el_class'] ) . "'>
                <h2 class=\"gvnews_archive_description\">" . esc_attr( $desc ) . '</h2>
            </div>';
	}
}
