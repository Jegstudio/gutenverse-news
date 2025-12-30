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
		$active    = ( 0 === $index ) ? 'gvnews_news_ticker_active' : '';
		$class     = gvnews_post_class( "gvnews_news_ticker_item gvnews_news_ticker_animated {$active}", $post->ID );
		$meta_date = $this->attribute['show_meta'] ? '<span class="post-date">' . $this->format_date( $post ) . '</span>' : '';

		$output =
		"<div {$class}>
                <span>
                    <a href=\"" . esc_url( get_the_permalink( $post ) ) . '" >' . esc_attr( get_the_title( $post ) ) . "</a>
                </span>
					$meta_date
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

		// Get icon rendering HTML for main icon
		$icon_type       = isset( $attr['newsticker_icon_type'] ) ? $attr['newsticker_icon_type'] : 'icon';
		$icon_svg        = isset( $attr['newsticker_icon_svg'] ) ? $attr['newsticker_icon_svg'] : '';
		$newsticker_icon = empty( $attr['newsticker_icon'] ) ? '' : $this->render_icon( $icon_type, $attr['newsticker_icon'], $icon_svg );

		// Get icon rendering HTML for prev button
		$prev_icon_type = isset( $attr['prev_icon_type'] ) ? $attr['prev_icon_type'] : 'icon';
		$prev_icon_svg  = isset( $attr['prev_icon_svg'] ) ? $attr['prev_icon_svg'] : '';
		$prev_icon_html = empty( $attr['prev_icon'] ) ? '' : $this->render_icon( $prev_icon_type, $attr['prev_icon'], $prev_icon_svg );

		// Get icon rendering HTML for next button
		$next_icon_type = isset( $attr['next_icon_type'] ) ? $attr['next_icon_type'] : 'icon';
		$next_icon_svg  = isset( $attr['next_icon_svg'] ) ? $attr['next_icon_svg'] : '';
		$next_icon_html = empty( $attr['next_icon'] ) ? '' : $this->render_icon( $next_icon_type, $attr['next_icon'], $next_icon_svg );

		$output =
		'<div ' . esc_attr( $this->element_id( $attr ) ) . ' class="gvnews_breakingnews clearfix ' . esc_attr( $this->unique_id ) . '">
                <div class="gvnews_breakingnews_title">' . $newsticker_icon . '&nbsp;<span>' . esc_attr( $attr['newsticker_title'] ) . "</span></div>

                <div class=\"gvnews_news_ticker\" data-autoplay='" . esc_attr( $attr['enable_autoplay'] ) . "' data-delay='" . esc_attr( $autoplay_delay ) . "' data-animation='" . esc_attr( $attr['newsticker_animation'] ) . "'>
                    <div class=\"gvnews_news_ticker_items\">
                        {$items}
                    </div>
                </div>
				<div class=\"gvnews_news_ticker_control\">
					<div class=\"gvnews_news_ticker_prev gvnews_news_ticker_arrow\">" . $prev_icon_html . "</div>
					<span class=\"nav-separator\"></span>
					<div class=\"gvnews_news_ticker_next gvnews_news_ticker_arrow\">" . $next_icon_html . "</div>
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
