<?php
/**
 * Carousel 1
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block\Carousel;

/**
 * Carousel_1
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Carousel_1 extends Carousel_View_Abstract {

	/**
	 * Method content
	 *
	 * @param array $results results.
	 *
	 * @return string
	 */
	public function content( $results ) {

		$content = '';
		foreach ( $results as $key => $post ) {
			$post_meta =
			'<div class="gvnews_post_meta">
                    <div class="gvnews_meta_date"><i class="fas fa-clock"></i> ' . esc_attr( $this->format_date( $post ) ) . '</div>
                </div>';

			$image    = $this->get_thumbnail( $post->ID, 'gvnews-350x250' );
			$content .=
			'<div class="gvnews_post_wrapper">
				<article ' . gvnews_post_class( 'gvnews_post', $post->ID ) . '>
                    <div class="gvnews_thumb">
                        ' . gvnews_edit_post( $post->ID ) . '
                        <a href="' . esc_url( get_the_permalink( $post ) ) . "\">$image</a>
                    </div>
                    <div class=\"gvnews_postblock_content\">
                        <h3 class=\"gvnews_post_title\"><a href=\"" . esc_url( get_the_permalink( $post ) ) . '">' . esc_attr( get_the_title( $post ) ) . "</a></h3>
                        {$post_meta}
                    </div>
				</article>
				</div>";
		}

		return $content;
	}

	/**
	 * Method render_element
	 *
	 * @param array $result result.
	 * @param array $attr   attribute.
	 *
	 * @return string
	 */
	public function render_element( $result, $attr ) {
		if ( ! empty( $result ) ) {
			$content        = $this->content( $result );
			$width          = $this->manager->get_current_width();
			$autoplay_delay = isset( $attr['autoplay_delay']['size'] ) ? $attr['autoplay_delay']['size'] : $attr['autoplay_delay'];
			$number_item    = isset( $attr['number_item']['size'] ) ? $attr['number_item']['size'] : $attr['number_item'];
			$margin         = isset( $attr['margin']['size'] ) ? $attr['margin']['size'] : $attr['margin'];

			// Bypass lazyload tinyslider.
			$image_normal_load = isset( $this->attribute['force_normal_image_load'] ) && ( 'true' === $this->attribute['force_normal_image_load'] || 'yes' === $this->attribute['force_normal_image_load'] );
			$lazyload          = $image_normal_load;

			$data_attr = gvnews_build_data_attr(
				array(
					'nav'      => esc_attr( $attr['show_nav'] ),
					'autoplay' => esc_attr( $attr['enable_autoplay'] ),
					'delay'    => esc_attr( $autoplay_delay ),
					'items'    => esc_attr( $number_item ),
					'margin'   => esc_attr( $margin ),
					'lazyload' => esc_attr( $lazyload ),
				)
			);

			$html_classes = gvnews_build_html_classes(
				array(
					'gvnews_postblock_carousel',
					'gvnews_postblock_carousel_1',
					'gvnews_postblock',
					'gvnews_col_' . esc_attr( $width ),
					esc_attr( $this->get_vc_class_name() ),
				)
			);

			$output =
			'<div class="' . $html_classes . "\">
                    <div class=\"gvnews_carousel_post\" {$data_attr}>
                        {$content}
                    </div>
                </div>";

			return $output;
		} else {
			return $this->empty_content();
		}
	}
}
