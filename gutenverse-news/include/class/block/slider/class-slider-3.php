<?php
/**
 * Slider 3
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block\Slider;

/**
 * Slider_3
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Slider_3 extends Slider_View_Abstract {

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
			if ( 'gvnews_single_image_owl' === $image_mechanism ) {
				$image = \GUTENVERSE\NEWS\Util\Image\Image_Normal_Load::get_instance()->owl_single_image( $post_thumbnail_id, 'gvnews-360x504' );
			} else {
				$image = apply_filters( $image_mechanism, $post_thumbnail_id, 'gvnews-360x504' );
			}

			$content .=
			'<div ' . gvnews_post_class( 'gvnews_slide_item', $post->ID ) . '>
                    ' . gvnews_edit_post( $post->ID ) . '
                    <a href="' . esc_url( get_the_permalink( $post ) ) . "\">
                        {$image}
                    </a>
                    <div class=\"gvnews_slide_caption\">
                        <div class=\"gvnews_caption_container\">
                            <div class=\"gvnews_post_category\">
                                {$primary_category}
                            </div>
                            <h2 class=\"gvnews_post_title\">
                                <a href=\"" . esc_url( get_the_permalink( $post ) ) . '">' . esc_attr( get_the_title( $post ) ) . '</a>
                            </h2>
                            <p class="gvnews_post_excerpt"> ' . esc_attr( $this->get_excerpt( $post ) ) . " </p>
                            {$this->render_meta($post)}
                        </div>
                    </div>
                </div>";
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
			$column_class   = $this->get_module_column_class( $attr );
			$autoplay_delay = isset( $attr['autoplay_delay']['size'] ) ? $attr['autoplay_delay']['size'] : $attr['autoplay_delay'];
			$number_item    = isset( $attr['number_item']['size'] ) ? $attr['number_item']['size'] : $attr['number_item'];

			$html_classes = gvnews_build_html_classes(
				array(
					'gvnews_slider_wrapper',
					'gvnews_slider_type_3_wrapper',
					$column_class,
					esc_attr( $this->unique_id ),
					esc_attr( $this->get_vc_class_name() ),
					esc_attr( $attr['el_class'] ),
				)
			);

			$data_attr = gvnews_build_data_attr(
				array(
					'items'    => $number_item,
					'autoplay' => esc_attr( $attr['enable_autoplay'] ),
					'delay'    => esc_attr( $autoplay_delay ),
				)
			);

			$output =
			'<div ' . esc_attr( $this->element_id( $attr ) ) . " class=\"{$html_classes}\">
                    <div class=\"gvnews_slider_type_3 gvnews_slider\" {$data_attr}>
                        {$content}
                    </div>
                </div>";

			return $output;
		} else {
			return $this->empty_content();
		}
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

		$time   = $this->format_date( $post );
		$output =
		"<div class=\"gvnews_post_meta\">
				<span class=\"gvnews_meta_date\"><i class=\"fas fa-clock\"></i> {$time}</span>
			</div>";

		return $output;
	}
}
