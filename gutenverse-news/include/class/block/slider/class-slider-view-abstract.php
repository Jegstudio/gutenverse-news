<?php
/**
 * Slider view abstract
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block\Slider;

use GUTENVERSE\NEWS\Block\Block_View_Abstract;

/**
 * Slider_View_Abstract
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
abstract class Slider_View_Abstract extends Block_View_Abstract {


	/**
	 * Method render_module
	 *
	 * @param array  $attr         attribute.
	 * @param string $column_class column class..
	 *
	 * @return string
	 */
	public function render_module( $attr, $column_class ) {
		$attr['pagination_number_post'] = 1;
		$results                        = $this->build_query( $attr );
		return $this->render_element( $results['result'], $attr );
	}

	/**
	 * Method render_meta
	 *
	 * @param object $post post.
	 *
	 * @return string
	 */
	public function render_meta( $post ) {
		$output = '';

		$author      = $post->post_author;
		$author_url  = get_author_posts_url( $author );
		$author_name = get_the_author_meta( 'display_name', $author );
		$author_text = '<span class="gvnews_meta_author">' . esc_html__( 'by', 'gutenverse-news' ) . " <a href=\"{$author_url}\">{$author_name}</a></span>";
		$time        = $this->format_date( $post );

		$output .= '<div class="gvnews_post_meta">';
		$output .= $author_text;
		$output .= "<span class=\"gvnews_meta_date\">{$time}</span>";
		$output .= '</div>';

		return $output;
	}

	/**
	 * Method set_slider_option
	 *
	 * @return void
	 */
	public function set_slider_option() {
		$this->options['enable_autoplay']    = '';
		$this->options['autoplay_delay']     = '3000';
		$this->options['date_format']        = 'default';
		$this->options['date_format_custom'] = 'Y/m/d';
	}

	/**
	 * Method remove_unit
	 *
	 * @param string $string string.
	 *
	 * @return string
	 */
	public function remove_unit( $string ) {
		return str_replace( array( 'px', 'em', '%', 'rem' ), '', strtolower( $string ) );
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
