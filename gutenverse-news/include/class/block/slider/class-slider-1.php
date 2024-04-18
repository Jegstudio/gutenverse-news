<?php
/**
 * Slider 1
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block\Slider;

/**
 * Slider_1
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Slider_1 extends Slider_View_Abstract {


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
			$primary_category  = $this->get_primary_category( $post->ID );
			$post_thumbnail_id = get_post_thumbnail_id( $post->ID );
			$image_mechanism   = isset( $this->attribute['force_normal_image_load'] ) && ( 'true' === $this->attribute['force_normal_image_load'] || 'yes' === $this->attribute['force_normal_image_load'] ) ? 'gvnews_single_image_owl' : 'gvnews_single_image_lazy_owl';
			if ( 'gvnews_single_image_owl' === $image_mechanism && 0 >= $key ) {
				if ( $this->manager->get_current_width() > 8 ) {
					$image = \GUTENVERSE\NEWS\Util\Image\Image_Normal_Load::get_instance()->owl_single_image( $post_thumbnail_id, 'gvnews-1140x570' );
				} else {
					$image = \GUTENVERSE\NEWS\Util\Image\Image_Normal_Load::get_instance()->owl_single_image( $post_thumbnail_id, 'gvnews-750x375' );
				}
			} elseif ( $this->manager->get_current_width() > 8 ) {
				$image = apply_filters( $image_mechanism, $post_thumbnail_id, 'gvnews-1140x570' );
			} else {
				$image = apply_filters( $image_mechanism, $post_thumbnail_id, 'gvnews-750x375' );
			}

			$content .=
			'<div class="gvnews_slide_item">
                    ' . gvnews_edit_post( $post->ID ) . '
                    <a href="' . get_permalink( $post ) . "\" class=\"gvnews_slide_img\">{$image}</a>
                    <div class=\"gvnews_slide_caption\">
                        <div class=\"gvnews_caption_container\">
                            <div class=\"gvnews_post_category\">
                                {$primary_category}
                            </div>
                            <h2 class=\"gvnews_post_title\">
                                <a href=\"" . esc_url( get_the_permalink( $post ) ) . '" >' . esc_attr( get_the_title( $post ) ) . "</a>
                            </h2>
                            {$this->render_meta($post)}
                        </div>
                    </div>
                </div>";
		}

		return $content;
	}

	/**
	 * Method carousel
	 *
	 * @param array $results results.
	 *
	 * @return string
	 */
	public function carousel( $results ) {
		$content = '';
		foreach ( $results as $key => $post ) {
			$post_thumbnail_id = get_post_thumbnail_id( $post->ID );
			if ( $this->manager->get_current_width() > 8 ) {
				$image = apply_filters( 'gvnews_single_image_lazy_owl', $post_thumbnail_id, 'gvnews-350x250' );
			} else {
				$image = apply_filters( 'gvnews_single_image_lazy_owl', $post_thumbnail_id, 'gvnews-120x86' );
			}

			$content .= '<div class="gvnews_slide_thumbnail_item_wrapper" ><div  ' . gvnews_post_class( 'gvnews_slide_thumbnail_item', $post->ID ) . '><a href="' . get_permalink( $post ) . "\">{$image}</a></div></div>";
		}

		return $content;
	}

	/**
	 * Method render_element
	 *
	 * @param array $result results.
	 * @param array $attr    attribute.
	 *
	 * @return string
	 */
	public function render_element( $result, $attr ) {
		if ( ! empty( $result ) ) {
			$content        = $this->content( $result );
			$slider         = $this->carousel( $result );
			$autoplay_delay = isset( $attr['autoplay_delay']['size'] ) ? $attr['autoplay_delay']['size'] : $attr['autoplay_delay'];

			$html_classes = gvnews_build_html_classes(
				array(
					'gvnews_slider_wrapper',
					'gvnews_slider_type_1_wrapper',
					esc_attr( $this->unique_id ),
					esc_attr( $this->get_vc_class_name() ),
					esc_attr( $attr['el_class'] ),
				)
			);

			$data_attr = gvnews_build_data_attr(
				array(
					'autoplay'     => esc_attr( $attr['enable_autoplay'] ),
					'delay'        => esc_attr( $autoplay_delay ),
					'hover-action' => esc_attr( $attr['enable_hover_action'] ),
				)
			);

			$output =
			'<div ' . esc_attr( $this->element_id( $attr ) ) . " class=\"{$html_classes}\">
                    <div class=\"gvnews_slider_type_1 gvnews_slider\" {$data_attr}>
                        {$content}
                    </div>
                    <div class=\"gvnews_slider_thumbnail_wrapper\">
                        <div class=\"gvnews_slider_thumbnail\">
                            {$slider}
                        </div>
                    </div>
                </div>";
			return $output;
		} else {
			return $this->empty_content();
		}
	}
}
