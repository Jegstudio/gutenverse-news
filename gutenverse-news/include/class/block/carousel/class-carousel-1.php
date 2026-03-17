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
	 * @param int   $normal_load_max normal load max.
	 *
	 * @return string
	 */
	public function content( $results, $normal_load_max ) {

		$content = '';
		foreach ( $results as $key => $post ) {
			$post_meta    = $this->post_meta_2( $post );
			$overlay_icon = $this->get_overlay_icon( $post->ID );

			$image    = $this->get_thumbnail( $post->ID, 'gvnews-350x250', ( $key >= $normal_load_max && 0 !== $normal_load_max ) );
			$content .=
			'<div class="gvnews_post_wrapper">
				<article ' . gvnews_post_class( 'gvnews_post', $post->ID ) . '>
                    <div class="gvnews_thumb' . $overlay_icon['with_overlay_icon'] . '">
                        ' . gvnews_edit_post( $post->ID ) . '
                        <a href="' . esc_url( get_the_permalink( $post ) ) . '" aria-label="' . esc_attr( get_the_title( $post ) ) . "\">$image</a>
						{$overlay_icon['overlay_icon']}
                    </div>
                    <div class=\"gvnews_postblock_content\">
                        <{$this->post_title_tag} class=\"gvnews_post_title\"><a href=\"" . esc_url( get_the_permalink( $post ) ) . '" aria-label="' . esc_attr( get_the_title( $post ) ) . '">' . esc_attr( get_the_title( $post ) ) . "</a></{$this->post_title_tag}>
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
			add_filter( 'gvnews_use_custom_image', array( $this, 'main_custom_image_size' ) );
			$number_item = isset( $attr['number_item']['size'] ) ? $attr['number_item']['size'] : $attr['number_item'];
			$content     = $this->content( $result, $number_item );
			remove_filter( 'gvnews_use_custom_image', array( $this, 'main_custom_image_size' ) );
			$autoplay_delay  = isset( $attr['autoplay_delay']['size'] ) ? $attr['autoplay_delay']['size'] : $attr['autoplay_delay'];
			$margin          = isset( $attr['margin']['size'] ) ? $attr['margin']['size'] : $attr['margin'];
			$responsive_item = isset( $attr['responsive_item'] ) ? $attr['responsive_item'] : array();
			$data_attr       = gvnews_build_data_attr(
				array(
					'nav'            => esc_attr( $attr['show_nav'] ),
					'autoplay'       => esc_attr( $attr['enable_autoplay'] ),
					'delay'          => esc_attr( $autoplay_delay ),
					'items'          => esc_attr( $number_item ),
					'margin'         => esc_attr( $margin ),
					'lazyload'       => esc_attr( $attr['normal_image'] ),
					'use-responsive' => true,
					'desktop-item'   => ! empty( $responsive_item['Desktop'] ) ? esc_attr( $responsive_item['Desktop'] ) : $number_item,
					'tablet-item'    => ! empty( $responsive_item['Tablet'] ) ? esc_attr( $responsive_item['Tablet'] ) : 2,
					'mobile-item'    => ! empty( $responsive_item['Mobile'] ) ? esc_attr( $responsive_item['Mobile'] ) : 1,
				)
			);

			$html_classes = gvnews_build_html_classes(
				array(
					'gvnews_postblock_carousel',
					'gvnews_postblock_carousel_1',
					'gvnews_postblock',
					'gvnews_col_12',
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
