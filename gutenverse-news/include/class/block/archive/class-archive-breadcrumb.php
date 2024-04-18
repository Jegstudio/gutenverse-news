<?php
/**
 * Archive Breadcrumb
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block\Archive;

/**
 * Archive_Breadcrumb
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Archive_Breadcrumb extends Archive_View_Abstract {


	/**
	 * Last link class
	 *
	 * @var string
	 */
	private $last_link_class = 'breadcrumb_last_link';

	/**
	 * Method render_module_front
	 *
	 * @param array  $attr         attribute.
	 * @param string $column_class column class.
	 *
	 * @return string
	 */
	public function render_module_front( $attr, $column_class ) {

		$breadcrumb = '';

		if ( is_author() ) {
			$user       = get_userdata( get_query_var( 'author' ) );
			$breadcrumb = $this->build_breadcrumb( $user->ID );
		} else {
			$term = $this->get_term();
			if ( isset( $term->term_id ) ) {
				$breadcrumb = $this->build_breadcrumb( $term->term_id );
			}
		}

		return "<div class='gvnews_archive_breadcrumb_wrapper " . esc_attr( $this->get_vc_class_name() ) . ' ' . esc_attr( $attr['scheme'] ) . ' ' . esc_attr( $attr['el_class'] ) . "'>
                <div class=\"gvnews_breadcrumbs\">{$breadcrumb}</div>
            </div>";
	}

	/**
	 * Method build_breadcrumb
	 *
	 * @param integer $id id.
	 *
	 * @return string
	 */
	public function build_breadcrumb( $id ) {

		$breadcrumb   = array();
		$breadcrumb[] = $this->breadcrumb_text( esc_url( gvnews_home_url_multilang( '/' ) ), esc_html__( 'Home', 'gutenverse-news' ) );

		if ( is_author() ) {
			$breadcrumb[] = $this->breadcrumb_text( '', esc_html__( 'Author', 'gutenverse-news' ) );
			$breadcrumb[] = $this->breadcrumb_text( '', get_the_author_meta( 'display_name', $id ), $this->last_link_class );
		} else {
			if ( is_category() ) {
				$breadcrumb[] = $this->breadcrumb_text( '', esc_html__( 'Category', 'gutenverse-news' ) );
			} elseif ( is_tag() ) {
				$breadcrumb[] = $this->breadcrumb_text( '', esc_html__( 'Tag', 'gutenverse-news' ) );
			}

			$this->recursive_category( $id, $breadcrumb, true );
		}

		$breadcrumb = implode( '<i class="fas fa-chevron-right"></i>', $breadcrumb );
		$breadcrumb = "<div id=\"breadcrumbs\">$breadcrumb</div>";

		return apply_filters( 'gvnews_native_breadcrumb_category', $breadcrumb, $id );
	}

	/**
	 * Method breadcrumb_text
	 *
	 * @param string      $url   url.
	 * @param string      $title title.
	 * @param string|null $class class.
	 *
	 * @return string
	 */
	public function breadcrumb_text( $url, $title, $class = null ) {

		return "<span class=\"{$class}\">
                <a href=\"{$url}\">{$title}</a>
            </span>";
	}

	/**
	 * Method recursive_category
	 *
	 * @param array   $category   category.
	 * @param array   $breadcrumb breadcrumb.
	 * @param boolean $islast     id last.
	 *
	 * @return void
	 */
	public function recursive_category( $category, &$breadcrumb, $islast = false ) {

		if ( $category ) {

			$cat = get_term( $category );

			if ( $cat->parent ) {
				$this->recursive_category( $cat->parent, $breadcrumb );
			}

			$class = $islast ? $this->last_link_class : '';

			$breadcrumb[] = $this->breadcrumb_text( get_category_link( $cat->term_id ), $cat->name, $class );
		}
	}
}
