<?php
/**
 * Slider 1
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block\Slider;

use Gutenverse\Framework\Options;

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
		$content             = '';
		$image_load          = Options::get_instance()->get_image_load( 'normal', $this->attribute['normal_image'], $this->attribute['image_load'] );
		$fetch_priority_high = $this->attribute['fetch_priority_high'];

		foreach ( $results as $key => $post ) {
			if ( $key > 0 ) {
				$image_load          = 'lazy';
				$fetch_priority_high = false;
			}
			$primary_category  = $this->get_primary_category( $post->ID );
			$overlay_icon      = $this->get_overlay_icon( $post->ID );
			$post_thumbnail_id = get_post_thumbnail_id( $post->ID );
			if ( $this->manager->get_current_width() > 8 ) {
				$image = \GUTENVERSE\NEWS\Util\Image\Image_Normal_Load::get_instance()->owl_single_image( $post_thumbnail_id, 'gvnews-1140x570', $image_load, $fetch_priority_high );
			} else {
				$image = \GUTENVERSE\NEWS\Util\Image\Image_Normal_Load::get_instance()->owl_single_image( $post_thumbnail_id, 'gvnews-750x375', $image_load, $fetch_priority_high );
			}

			$content .=
				'<div class="gvnews_slide_item">
                    ' . gvnews_edit_post( $post->ID ) . '
                    <a href="' . get_permalink( $post ) . '" aria-label="' . esc_attr( get_the_title( $post ) ) . "\" class=\"gvnews_slide_img\">{$image}</a>
                    {$overlay_icon['overlay_icon']}
                    <div class=\"gvnews_slide_caption\">
                        <div class=\"gvnews_caption_container\">
                            <div class=\"gvnews_post_category\">
                                {$primary_category}
                            </div>
                            <{$this->post_title_tag} class=\"gvnews_post_title\">
                                <a href=\"" . esc_url( get_the_permalink( $post ) ) . '" aria-label="' . esc_attr( get_the_title( $post ) ) . '">' . esc_attr( get_the_title( $post ) ) . "</a>
                            </{$this->post_title_tag}>
                            {$this->render_meta( $post )}
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
		$content    = '';
		$image_load = Options::get_instance()->get_image_load( 'normal', $this->attribute['normal_image'], $this->attribute['image_load'] );
		foreach ( $results as $key => $post ) {
			$post_thumbnail_id = get_post_thumbnail_id( $post->ID );
			if ( $this->manager->get_current_width() > 8 ) {
				$image = \GUTENVERSE\NEWS\Util\Image\Image_Normal_Load::get_instance()->owl_single_image( $post_thumbnail_id, 'gvnews-350x250', $image_load );
			} else {
				$image = \GUTENVERSE\NEWS\Util\Image\Image_Normal_Load::get_instance()->owl_single_image( $post_thumbnail_id, 'gvnews-120x86', $image_load );
			}

			$content .= '<div class="gvnews_slide_thumbnail_item_wrapper" ><div  ' . gvnews_post_class( 'gvnews_slide_thumbnail_item', $post->ID ) . '><a href="' . get_permalink( $post ) . '" aria-label="' . esc_attr( get_the_title( $post ) ) . "\">{$image}</a></div></div>";
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
					'autoplay'        => esc_attr( $attr['enable_autoplay'] ),
					'delay'           => esc_attr( $autoplay_delay ),
					'hover-action'    => esc_attr( $attr['enable_hover_action'] ),
					'class-next'      => esc_attr( $attr['nextButtonIcon'] ),
					'class-next-type' => esc_attr( $attr['next_button_icon_type'] ),
					'class-next-svg'  => esc_attr( $attr['next_button_icon_svg'] ),
					'class-prev'      => esc_attr( $attr['prevButtonIcon'] ),
					'class-prev-type' => esc_attr( $attr['prev_button_icon_type'] ),
					'class-prev-svg'  => esc_attr( $attr['prev_button_icon_svg'] ),
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
