<?php
/**
 * Post breadcrumb
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
 * Post_Breadcrumb
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Post_Breadcrumb extends Grab {

	/**
	 * Last link class
	 *
	 * @var string
	 */
	private $last_link_class = 'breadcrumb_last_link';

	/**
	 * Json schema
	 *
	 * @var array
	 */
	private $json_schema = array();

	/**
	 * Method call_breadcrumb
	 *
	 * @param integer $id id.
	 *
	 * @return string
	 */
	public function call_breadcrumb( $id ) {
		if ( is_category( $id ) || is_tag( $id ) ) {
			$output = $this->render_category( $id );
		} elseif ( is_search( $id ) ) {
			$output = $this->render_search();
		} elseif ( is_author( $id ) ) {
			$output = $this->render_author();
		} elseif ( is_page( $id ) ) {
			$output = $this->render_page();
		} elseif ( is_home( $id ) ) {
			$output = null;
		} elseif ( is_404( $id ) ) {
			$output = $this->render_404();
		} elseif ( is_attachment( $id ) ) {
			$output = $this->render_attachment();
		} else {
			$output = $this->render_default( $id );
		}

		return $output;
	}

	/**
	 * Method render_404
	 *
	 * @return string
	 */
	public function render_404() {
		$breadcrumb   = array();
		$breadcrumb[] = $this->breadcrumb_text( gvnews_home_url_multilang(), esc_html__( 'Home', 'gutenverse-news' ) );
		$breadcrumb[] = $this->breadcrumb_text( '', esc_html__( 'Page Not Found', 'gutenverse-news' ), $this->last_link_class );

		$direction  = 'fa-chevron-right';
		$breadcrumb = implode( '<i class="fas ' . esc_attr( $direction ) . '"></i>', $breadcrumb );
		$breadcrumb = "<div id=\"breadcrumbs\">$breadcrumb</div>";

		return apply_filters( 'gvnews_native_breadcrumb_page', $breadcrumb );
	}

	/**
	 * Method render_attachment
	 *
	 * @return string
	 */
	public function render_attachment() {
		$breadcrumb   = array();
		$breadcrumb[] = $this->breadcrumb_text( gvnews_home_url_multilang(), esc_html__( 'Home', 'gutenverse-news' ) );

		$attachment = get_post( get_the_ID() );
		$parent_id  = $attachment->post_parent;

		$category = apply_filters( 'gvnews_get_primary_category_filter', '', $parent_id );

		if ( null !== $category ) {
			$this->recursive_category( $category, $breadcrumb, false );
		}

		$breadcrumb[] = $this->breadcrumb_text( get_the_permalink( $parent_id ), get_the_title( $parent_id ), $this->last_link_class );

		$direction  = 'fa-chevron-right';
		$breadcrumb = implode( '<i class="fas ' . esc_attr( $direction ) . '"></i>', $breadcrumb );
		$breadcrumb = "<div id=\"breadcrumbs\">$breadcrumb</div>";

		return apply_filters( 'gvnews_native_breadcrumb_page', $breadcrumb );
	}

	/**
	 * Method render_page
	 *
	 * @return string
	 */
	public function render_page() {
		$breadcrumb   = array();
		$breadcrumb[] = $this->breadcrumb_text( gvnews_home_url_multilang(), esc_html__( 'Home', 'gutenverse-news' ) );
		$breadcrumb[] = $this->breadcrumb_text( '', get_the_title(), $this->last_link_class );

		$direction  = 'fa-chevron-right';
		$breadcrumb = implode( '<i class="fas ' . esc_attr( $direction ) . '"></i>', $breadcrumb );
		$breadcrumb = "<div id=\"breadcrumbs\">$breadcrumb</div>";

		return apply_filters( 'gvnews_native_breadcrumb_page', $breadcrumb );
	}

	/**
	 * Method render_author
	 *
	 * @return integer
	 */
	public function render_author() {
		$breadcrumb   = array();
		$breadcrumb[] = $this->breadcrumb_text( gvnews_home_url_multilang(), esc_html__( 'Home', 'gutenverse-news' ) );
		$breadcrumb[] = $this->breadcrumb_text( '', esc_html__( 'Author', 'gutenverse-news' ), $this->last_link_class );

		$direction  = 'fa-chevron-right';
		$breadcrumb = implode( '<i class="fas ' . esc_attr( $direction ) . '"></i>', $breadcrumb );
		$breadcrumb = "<div id=\"breadcrumbs\">$breadcrumb</div>";

		return apply_filters( 'gvnews_native_breadcrumb_search', $breadcrumb );
	}

	/**
	 * Method render_search
	 *
	 * @return string
	 */
	public function render_search() {
		$breadcrumb   = array();
		$breadcrumb[] = $this->breadcrumb_text( gvnews_home_url_multilang(), esc_html__( 'Home', 'gutenverse-news' ) );
		$breadcrumb[] = $this->breadcrumb_text( '', esc_html__( 'Search', 'gutenverse-news' ), $this->last_link_class );

		$direction  = 'fa-chevron-right';
		$breadcrumb = implode( '<i class="fas ' . esc_attr( $direction ) . '"></i>', $breadcrumb );
		$breadcrumb = "<div id=\"breadcrumbs\">$breadcrumb</div>";

		return apply_filters( 'gvnews_native_breadcrumb_search', $breadcrumb );
	}

	/**
	 * Method breadcrumb_schema
	 *
	 * @return array
	 */
	public function breadcrumb_schema() {
		return $this->json_schema;
	}

	/**
	 * Method add_schema
	 *
	 * @param string $url   url.
	 * @param string $title title.
	 *
	 * @return void
	 */
	public function add_schema( $url, $title ) {
		$this->json_schema[] = array(
			'url'   => $url,
			'title' => $title,
		);
	}

	/**
	 * Method breadcrumb_text
	 *
	 * @param string $url   url.
	 * @param string $title title.
	 * @param string $class class.
	 *
	 * @return string
	 */
	public function breadcrumb_text( $url, $title, $class = null ) {
		$this->add_schema( $url, $title );
		return "<span class=\"{$class}\">
                <a href=\"{$url}\">{$title}</a>
            </span>";
	}

	/**
	 * Method render_category
	 *
	 * @param integer $id id.
	 *
	 * @return string
	 */
	public function render_category( $id ) {
		$breadcrumb   = array();
		$breadcrumb[] = $this->breadcrumb_text( gvnews_home_url_multilang(), esc_html__( 'Home', 'gutenverse-news' ) );

		if ( is_category() ) {
			$breadcrumb[] = $this->breadcrumb_text( '', esc_html__( 'Category', 'gutenverse-news' ) );
		} elseif ( is_tag() ) {
			$breadcrumb[] = $this->breadcrumb_text( '', esc_html__( 'Tag', 'gutenverse-news' ) );
		}

		$this->recursive_category( $id, $breadcrumb, true );

		$direction  = 'fa-chevron-right';
		$breadcrumb = implode( '<i class="fas ' . esc_attr( $direction ) . '"></i>', $breadcrumb );
		$breadcrumb = "<div id=\"breadcrumbs\">$breadcrumb</div>";

		return apply_filters( 'gvnews_native_breadcrumb_category', $breadcrumb, $id );
	}

	/**
	 * Method render_default
	 *
	 * @param integer $id id.
	 *
	 * @return string
	 */
	public function render_default( $id ) {
		$breadcrumb   = array();
		$breadcrumb[] = $this->breadcrumb_text( gvnews_home_url_multilang(), esc_html__( 'Home', 'gutenverse-news' ) );

		$category = apply_filters( 'gvnews_get_primary_category_filter', '', $id );

		if ( null !== $category ) {
			$this->recursive_category( get_the_category(), $breadcrumb, true );

			$direction  = 'fa-chevron-right';
			$breadcrumb = implode( '<i class="fas ' . esc_attr( $direction ) . '"></i>', $breadcrumb );
			$breadcrumb = "<div id=\"breadcrumbs\">$breadcrumb</div>";

			return apply_filters( 'gvnews_native_breadcrumb', $breadcrumb, $id );
		}

		return null;
	}

	/**
	 * Method recursive_category
	 *
	 * @param string  $category   category.
	 * @param string  $breadcrumb breadcrumb.
	 * @param boolean $islast     is last.
	 *
	 * @return void
	 */
	public function recursive_category( $category, &$breadcrumb, $islast = false ) {
		if ( $category ) {
			$cat = get_term( $category );

			if ( isset( $cat->parent ) && $cat->parent ) {
				$this->recursive_category( $cat->parent, $breadcrumb );
			}

			$class        = $islast ? $this->last_link_class : '';
			$breadcrumb[] = $this->breadcrumb_text( get_category_link( $cat->term_id ), $cat->name, $class );
		}
	}

	/**
	 * Method get_content
	 *
	 * @return string
	 */
	public function get_content() {
		$attributes = apply_filters(
			'gvnews_post_breadcrumb_block_attributes',
			array(
				'short_code' => $this->attributes['gvnewsModule'],
			)
		);
		return $this->call_breadcrumb( isset( get_queried_object()->term_id ) ? get_queried_object()->term_id : null );
	}
}
