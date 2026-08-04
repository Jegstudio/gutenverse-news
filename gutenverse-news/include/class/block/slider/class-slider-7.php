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
		$nav_prev         = esc_html__( 'prev', 'gutenverse-news' );
		$nav_next         = esc_html__( 'next', 'gutenverse-news' );
		$next_button_icon = $this->render_icon( $attr['next_button_icon_type'], $attr['nextButtonIcon'], $attr['next_button_icon_svg'] );
		$prev_button_icon = $this->render_icon( $attr['prev_button_icon_type'], $attr['prevButtonIcon'], $attr['prev_button_icon_svg'] );
		$content          = '';

		foreach ( $results as $key => $post ) {
			$primary_category = $this->get_primary_category( $post->ID );
			$overlay_icon     = $this->get_overlay_icon( $post->ID );
			if ( $this->manager->get_current_width() > 8 ) {
				$image = get_the_post_thumbnail_url( $post->ID, 'gvnews-1140x570' );
			} else {
				$image = get_the_post_thumbnail_url( $post->ID, 'gvnews-750x375' );
			}
			$hidden_image = $this->attribute['normal_image'] && 0 === $key ? '<img loading="eager" fetchpriority="high" class="thumbnail-prioritize" src="' . esc_url( $image ) . '" style="display: none" >' : '';
			$read_more    = ! $this->attribute['disable_readmore'] ? '<a href="' . esc_url( get_the_permalink( $post ) ) . '" aria-label="' . esc_attr__( 'Read more about ', 'gutenverse-news' ) . esc_attr( get_the_title( $post ) ) . '" class="gvnews_readmore">' . esc_html__( 'Read more', 'gutenverse-news' ) . '<span class="screen-reader-text">' . esc_html__( ' about ', 'gutenverse-news' ) . esc_html( get_the_title( $post ) ) . '</span></a>' : '';

			$content .=
				'<div ' . gvnews_post_class( 'gvnews_slide_item clearfix', $post->ID ) . '>
					' . $hidden_image . '
                    ' . gvnews_edit_post( $post->ID ) . '
                    <div class="gvnews_slide_image' . $overlay_icon['with_overlay_icon'] . '" style="background-image: url(' . esc_url( $image ) . ')">
                		<a href="' . esc_url( get_the_permalink( $post ) ) . "\" aria-label=\"" . esc_attr( get_the_title( $post ) ) . "\"></a>
						{$overlay_icon['overlay_icon']}
					</div>
                    <div class=\"gvnews_slide_caption\">
                        <div class=\"gvnews_caption_container\">
                        	<div class=\"gvnews_post_category\">
	                            {$primary_category}
	                        </div>
	                        <{$this->post_title_tag} class=\"gvnews_post_title\">
	                            <a href=\"" . esc_url( get_the_permalink( $post ) ) . '" aria-label="' . esc_attr( get_the_title( $post ) ) . '">' . esc_attr( get_the_title( $post ) ) . '</a>
	                        </' . $this->post_title_tag . '>
	                        <div class="gvnews_post_excerpt">
			                    <p>' . esc_attr( $this->get_excerpt( $post ) ) . '</p>
			                </div>
                            ' . $read_more . " 
                        </div>
                        <div class=\"gvnews_block_nav \"> 
                        	<a href=\"#\" class=\"prev\">
								{$prev_button_icon}
								<span>{$nav_prev}</span>
                        	</a> 
                        	<a href=\"#\" class=\"next\">
								<span>{$nav_next}</span>
								{$next_button_icon}
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
					$attr['allow_override_category_color'] ? 'gvnews_override_category' : '',
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
					'autoplay'        => esc_attr( $attr['enable_autoplay'] ),
					'delay'           => esc_attr( $autoplay_delay ),
					'hover-action'    => esc_attr( $attr['enable_hover_action'] ),
					'nav-prev'        => $nav_prev,
					'nav-next'        => $nav_next,
					'class-next'      => esc_attr( $attr['nextButtonIcon'] ),
					'class-next-type' => esc_attr( $attr['next_button_icon_type'] ),
					'class-next-svg'  => esc_attr( $attr['next_button_icon_svg'] ),
					'class-prev'      => esc_attr( $attr['prevButtonIcon'] ),
					'class-prev-type' => esc_attr( $attr['prev_button_icon_type'] ),
					'class-prev-svg'  => esc_attr( $attr['prev_button_icon_svg'] ),
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
