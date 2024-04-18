<?php
/**
 * Slider 4
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block\Slider;

/**
 * Slider_4
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Slider_4 extends Slider_View_Abstract {

	/**
	 * Method content
	 *
	 * @param array $results results.
	 * @param array $attr attribute.
	 *
	 * @return string
	 */
	public function content( $results, $attr ) {
		$content = '';
		foreach ( $results as $key => $post ) {
			$primary_category = $this->get_primary_category( $post->ID );
			$size             = $attr['fullsize_image'] ? 'full' : 'gvnews-1140x815';
			$image            = get_the_post_thumbnail_url( $post->ID, $size );
			$image_mechanism  = isset( $this->attribute['force_normal_image_load'] ) && ( 'true' === $this->attribute['force_normal_image_load'] || 'yes' === $this->attribute['force_normal_image_load'] );
			$hidden_image     = $image_mechanism && 0 <= $key ? '<img class="thumbnail-prioritize" src="' . esc_url( $image ) . '" style="display: none" >' : '';

			$content .=
			'<div class="gvnews_slide_item_wrapper"><div ' . gvnews_post_class( 'gvnews_slide_item', $post->ID ) . ' style="background-image: url(' . esc_url( $image ) . ')">
					' . $hidden_image . '
                    ' . gvnews_edit_post( $post->ID ) . "
                    <div class=\"gvnews_slide_caption\">
                        <div class=\"gvnews_caption_container\">
                            <div class=\"gvnews_post_category\">
                                {$primary_category}
                            </div>
                            <h2 class=\"gvnews_post_title\">
                                <a href=\"" . esc_url( get_the_permalink( $post ) ) . '">' . esc_attr( get_the_title( $post ) ) . "</a>
                            </h2>
                            {$this->render_meta($post)}
                        </div>
                    </div>
                </div></div>";
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
			$content        = $this->content( $result, $attr );
			$autoplay_delay = isset( $attr['autoplay_delay']['size'] ) ? $attr['autoplay_delay']['size'] : $attr['autoplay_delay'];
			$post_id        = $result[0]->ID;

			$html_classes = gvnews_build_html_classes(
				array(
					'gvnews_slider_wrapper',
					'gvnews_slider_type_4_wrapper',
					'gvnews_owlslider',
					esc_attr( $this->unique_id ),
					esc_attr( $this->get_vc_class_name() ),
					esc_attr( $attr['el_class'] ),
				)
			);

			$data_attr = gvnews_build_data_attr(
				array(
					'autoplay' => esc_attr( $attr['enable_autoplay'] ),
					'delay'    => esc_attr( $autoplay_delay ),
				)
			);

			$output =
			'<div ' . esc_attr( $this->element_id( $attr ) ) . " class=\"{$html_classes}\">
                    <div class=\"gvnews_slider_type_4 gvnews_slider\" {$data_attr}>
                        {$content}
                    </div>
                </div>";

			return $output;
		} else {
			return $this->empty_content();
		}
	}
}
