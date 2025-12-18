<?php
/**
 * Slider 7
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block\Slider;

/**
 * Slider_7
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Slider_7 extends Slider_View_Abstract {

	/**
	 * Method content
	 *
	 * @param array $results result.
	 * @param array $attr    attribute.
	 *
	 * @return string
	 */
	private function content( $results, $attr ) {
		$nav_prev = esc_html__( 'prev', 'gutenverse-news' );
		$nav_next = esc_html__( 'next', 'gutenverse-news' );
		$next_button_icon = isset( $attr['nextButtonIcon'] ) ? $attr['nextButtonIcon'] : 'fas fa-chevron-right';
		$prev_button_icon = isset( $attr['prevButtonIcon'] ) ? $attr['prevButtonIcon'] : 'fas fa-chevron-left';
		$content  = '';

		foreach ( $results as $key => $post ) {
			$primary_category = $this->get_primary_category( $post->ID );
			if ( $this->manager->get_current_width() > 8 ) {
				$image = get_the_post_thumbnail_url( $post->ID, 'gvnews-1140x570' );
			} else {
				$image = get_the_post_thumbnail_url( $post->ID, 'gvnews-750x375' );
			}
			$image_mechanism = isset( $this->attribute['force_normal_image_load'] ) && ( 'true' === $this->attribute['force_normal_image_load'] || 'yes' === $this->attribute['force_normal_image_load'] );
			$hidden_image    = $image_mechanism && 0 <= $key ? '<img class="thumbnail-prioritize" src="' . esc_url( $image ) . '" style="display: none" >' : '';
			$read_more       = ! $this->attribute['disable_readmore'] ? '<a href="' . esc_url( get_the_permalink( $post ) ) . '" class="gvnews_readmore">' . esc_html__( 'Read more', 'gutenverse-news' ) . '</a>' : '';

			$icon_arrow_left = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. --><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"></path></svg>';
			$icon_arrow_left = $this->render_icon( 'svg', 'fas fa-chevron-left', base64_encode( $icon_arrow_left ) );

			$icon_arrow_right = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. --><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"></path></svg>';
			$icon_arrow_right = $this->render_icon( 'svg', 'fas fa-chevron-right', base64_encode( $icon_arrow_right ) );

			$content .=
				'<div ' . gvnews_post_class( 'gvnews_slide_item clearfix', $post->ID ) . '>
					' . $hidden_image . '
                    ' . gvnews_edit_post( $post->ID ) . '
                    <div class="gvnews_slide_image" style="background-image: url(' . esc_url( $image ) . ')">
                		<a href="' . esc_url( get_the_permalink( $post ) ) . "\"></a>
					</div>
                    <div class=\"gvnews_slide_caption\">
                        <div class=\"gvnews_caption_container\">
                        	<div class=\"gvnews_post_category\">
	                            {$primary_category}
	                        </div>
	                        <h2 class=\"gvnews_post_title\">
	                            <a href=\"" . esc_url( get_the_permalink( $post ) ) . '">' . esc_attr( get_the_title( $post ) ) . '</a>
	                        </h2>
	                        <div class="gvnews_post_excerpt">
			                    <p>' . esc_attr( $this->get_excerpt( $post ) ) . '</p>
			                </div>
                            ' . $read_more . " 
                        </div>
                        <div class=\"gvnews_block_nav \"> 
                        	<a href=\"#\" class=\"prev\">
								{$icon_arrow_left}
                                {$nav_prev}
                        	</a> 
                        	<a href=\"#\" class=\"next\">
                                {$nav_next}
								{$icon_arrow_right}
                        	</a> 
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
			$content        = $this->content( $result, $attr );
			$column_class   = $this->get_module_column_class( $attr );
			$autoplay_delay = isset( $attr['autoplay_delay']['size'] ) ? $attr['autoplay_delay']['size'] : $attr['autoplay_delay'];
			$nav_prev       = esc_html__( 'prev', 'gutenverse-news' );
			$nav_next       = esc_html__( 'next', 'gutenverse-news' );
			$position       = isset( $attr['featured_position'] ) ? $attr['featured_position'] : 'left';

			$wrapper_classes = gvnews_build_html_classes(
				array(
					'gvnews_slider_wrapper',
					'gvnews_slider_type_7_wrapper',
					esc_attr( $this->unique_id ),
					esc_attr( $this->get_vc_class_name() ),
					esc_attr( $attr['el_class'] ),
				)
			);

			$container_classes = gvnews_build_html_classes(
				array(
					'gvnews_slider_type_7',
					'gvnews_slider',
					esc_attr( $column_class ),
					'featured-' . esc_attr( $position ),
				)
			);

			$data_attr = gvnews_build_data_attr(
				array(
					'autoplay'     => esc_attr( $attr['enable_autoplay'] ),
					'delay'        => esc_attr( $autoplay_delay ),
					'hover-action' => esc_attr( $attr['enable_hover_action'] ),
					'nav-prev'     => $nav_prev,
					'nav-next'     => $nav_next,
					'class-next'   => $attr['nextButtonIcon'],
					'class-prev'   => $attr['prevButtonIcon'],
				)
			);

			$output =
				'<div ' . esc_attr( $this->element_id( $attr ) ) . " class=\"{$wrapper_classes}\">
				<div class=\"{$container_classes}\"  {$data_attr}>
                        {$content}
                    </div>
                </div>";

			return $output;
		} else {
			return $this->empty_content();
		}
	}
}
