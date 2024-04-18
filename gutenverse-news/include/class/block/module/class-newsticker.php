<?php
/**
 * News ticker
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block\Module;

use GUTENVERSE\NEWS\Block\Block_View_Abstract;

/**
 * Newsticker
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Newsticker extends Block_View_Abstract {


	/**
	 * Method render_item
	 *
	 * @param object  $post  post post.
	 * @param integer $index index.
	 *
	 * @return string
	 */
	public function render_item( $post, $index ) {
		$active = ( 0 === $index ) ? 'gvnews_news_ticker_active' : '';
		$time   = $this->format_date( $post );
		$class  = gvnews_post_class( "gvnews_news_ticker_item gvnews_news_ticker_animated {$active}", $post->ID );

		$output =
		"<div {$class}>
                <span>
                    <a href=\"" . esc_url( get_the_permalink( $post ) ) . '" >' . esc_attr( get_the_title( $post ) ) . "</a>
                </span>
                <span class=\"post-date\">
                    $time
                </span>
            </div>";

		return $output;
	}

	/**
	 * Method render_module
	 *
	 * @param array  $attr         attribute attribbute.
	 * @param string $column_class column class. column class.
	 *
	 * @return string
	 */
	public function render_module( $attr, $column_class ) {
		$attr['pagination_number_post'] = 1;
		$results                        = $this->build_query( $attr );
		$results                        = $results['result'];
		$autoplay_delay                 = isset( $attr['autoplay_delay']['size'] ) ? $attr['autoplay_delay']['size'] : $attr['autoplay_delay'];

		$items = '';

		if ( ! $results ) {
			$items =
			'<div class="gvnews_news_ticker_item">
                <span>
                    ' . esc_html__( 'No Content Available', 'gutenverse-news' ) . '
                </span>
            </div>';
		} else {
			$size = count( $results );
			for ( $i = 0; $i < $size; $i++ ) {
				$items .= $this->render_item( $results[ $i ], $i );
			}
		}

		$output =
		'<div ' . esc_attr( $this->element_id( $attr ) ) . ' class="gvnews_breakingnews clearfix ' . esc_attr( $this->unique_id ) . '">
                <div class="gvnews_breakingnews_title"><i class="' . esc_attr( $attr['newsticker_icon'] ) . '">&nbsp;</i> <span>' . esc_attr( $attr['newsticker_title'] ) . "</span></div>

                <div class=\"gvnews_news_ticker\" data-autoplay='" . esc_attr( $attr['enable_autoplay'] ) . "' data-delay='" . esc_attr( $autoplay_delay ) . "' data-animation='" . esc_attr( $attr['newsticker_animation'] ) . "'>
                    <div class=\"gvnews_news_ticker_items\">
                        {$items}
                    </div>
                    <div class=\"gvnews_news_ticker_control\">
						<div class=\"gvnews_news_ticker_next gvnews_news_ticker_arrow\"><span><i class=\"fas fa-angle-right\"></i></span></div>
                        <div class=\"gvnews_news_ticker_prev gvnews_news_ticker_arrow\"><span><i class=\"fas fa-angle-left\"></i></span></div>
                    </div>
                </div>
            </div>";

		return $output;
	}

	/**
	 * Method render_column_alt
	 *
	 * @param array result $result result.
	 * @param string       $column_class $column_class column class.
	 *
	 * @return void
	 */
	public function render_column_alt( $result, $column_class ) {
	}

	/**
	 * Method render_column
	 *
	 * @param array result $result result.
	 * @param string       $column_class $column_class column class.
	 *
	 * @return void
	 */
	public function render_column( $result, $column_class ) {
	}
}
