<?php
/**
 * Carousel View Abstract
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block\Carousel;

use GUTENVERSE\NEWS\Block\Block_View_Abstract;

/**
 * Carousel_View_Abstract
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
abstract class Carousel_View_Abstract extends Block_View_Abstract {

	/**
	 * Method render_module
	 *
	 * @param array  $attr         attribute.
	 * @param string $column_class column class.
	 *
	 * @return string
	 */
	public function render_module( $attr, $column_class ) {
		$attr['pagination_number_post'] = 1;
		$results                        = $this->build_query( $attr );

		return $this->render_element( $results['result'], $attr );
	}

	/**
	 * Method post_meta
	 *
	 * @param object $post post.
	 *
	 * @return string
	 */
	public function post_meta( $post ) {
		$output  = '<div class="gvnews_post_meta">';
		$output .= '<div class="gvnews_meta_date"><a href="' . esc_url( get_the_permalink( $post ) ) . '" ><i class="fas fa-clock"></i> ' . $this->format_date( $post ) . '</a></div>';
		$output .= '</div>';

		return $output;
	}

	/**
	 * Method render_element
	 *
	 * @param array $result result.
	 * @param array $attr   attribute.
	 *
	 * @return string
	 */
	abstract public function render_element( $result, $attr );
}
