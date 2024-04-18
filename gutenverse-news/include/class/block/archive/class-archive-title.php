<?php
/**
 * Archive Title
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block\Archive;

/**
 * Archive_Title
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Archive_Title extends Archive_View_Abstract {


	/**
	 * Method render_module_front
	 *
	 * @param array  $attr         attribute.
	 * @param string $column_class column class.
	 *
	 * @return string
	 */
	public function render_module_front( $attr, $column_class ) {

		$title = '';
		if ( is_category() ) {
			$title = single_cat_title( '', false );
		} elseif ( is_tag() ) {
			$title = single_tag_title( '', false );
		} elseif ( is_author() ) {
			$title = '<span class="vcard">' . get_the_author() . '</span>';
		} elseif ( is_year() ) {
			$title = get_the_date( _x( 'Y', 'yearly archives date format', 'gutenverse-news' ) );
		} elseif ( is_month() ) {
			$title = get_the_date( _x( 'F Y', 'monthly archives date format', 'gutenverse-news' ) );
		} elseif ( is_day() ) {
			$title = get_the_date( _x( 'F j, Y', 'daily archives date format', 'gutenverse-news' ) );
		}

		if ( ! empty( $attr['title'] ) ) {
			$title = $attr['title'] . $title;
		}

		return "<div class='gvnews_archive_title_wrapper " . esc_attr( $this->get_vc_class_name() ) . ' ' . esc_attr( $attr['scheme'] ) . ' ' . esc_attr( $attr['el_class'] ) . "'>
                <h1 class=\"gvnews_archive_title\">{$title}</h1>
            </div>";
	}
}
