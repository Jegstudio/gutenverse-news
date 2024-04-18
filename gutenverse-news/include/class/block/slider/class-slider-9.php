<?php
/**
 * Slider 9
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block\Slider;

/**
 * Slider_9
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Slider_9 extends Slider_View_Abstract {

	/**
	 * Method content
	 *
	 * @param array $results results.
	 *
	 * @return string
	 */
	public function content( $results ) {
		$content = '';
		$thumb = '';
		$index   = 0;

		foreach ( $results as $key => $post ) {
			$primary_category = $this->get_primary_category( $post->ID );
			if ( $this->manager->get_current_width() > 8 ) {
				$image = get_the_post_thumbnail_url( $post->ID, 'gvnews-1140x570' );
			} else {
				$image = get_the_post_thumbnail_url( $post->ID, 'gvnews-750x375' );
			}
			$image_mechanism = isset( $this->attribute['force_normal_image_load'] ) && ( 'true' === $this->attribute['force_normal_image_load'] || 'yes' === $this->attribute['force_normal_image_load'] );
			$hidden_image    = $image_mechanism && 0 <= $key ? '<img class="thumbnail-prioritize" src="' . esc_url( $image ) . '" style="display: none" >' : '';

			$content .=
			'<div ' . gvnews_post_class( 'gvnews_slide_item', $post->ID ) . " style=\"background-image: url({$image})\">
					' . $hidden_image . '
                    " . gvnews_edit_post( $post->ID ) . "
                    <div class=\"gvnews_slide_wrapper\">
                        <div class=\"gvnews_slide_caption\">
                            <div class=\"gvnews_caption_container\">
                                <div class=\"gvnews_post_category\">
                                    {$primary_category}
                                </div>
                                {$this->render_meta($post)}
                                <h2 class=\"gvnews_post_title\">
                                    <a href=\"" . esc_url( get_the_permalink( $post ) ) . '">' . esc_attr( get_the_title( $post ) ) . '</a>
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>';

			$thumbnail        = $this->get_thumbnail( $post->ID, 'gvnews-120x86' );
			$additional_class = ( ! has_post_thumbnail( $post->ID ) ) ? ' no_thumbnail' : '';

			$thumb .=
			"<article data-index='{$index}' " . gvnews_post_class( 'gvnews_post gvnews_pl_sm' . $additional_class, $post->ID ) . '>
                    <div class="gvnews_thumb">
                        <a href="' . esc_url( get_the_permalink( $post ) ) . '">' . $thumbnail . '</a>
                    </div>
                    <div class="gvnews_postblock_content">
                        ' . $this->post_meta_2( $post ) . '
                        <h3 class="gvnews_post_title">
                            <a href="' . esc_url( get_the_permalink( $post ) ) . '">' . esc_attr( get_the_title( $post ) ) . '</a>
                        </h3>
                    </div>
                </article>';
			++$index;
		}

		return array(
			'content' => $content,
			'thumb'   => $thumb,
		);
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
			$autoplay_delay = isset( $attr['autoplay_delay']['size'] ) ? $attr['autoplay_delay']['size'] : $attr['autoplay_delay'];

			$wrapper_classes = gvnews_build_html_classes(
				array(
					'gvnews_slider_wrapper',
					'gvnews_slider_type_9_wrapper',
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
			'<div ' . esc_attr( $this->element_id( $attr ) ) . " class=\"{$wrapper_classes}\">
                    <div class=\"gvnews_slider_type_9 gvnews_slider slider-carousel\" {$data_attr}>
                        {$content['content']}
                    </div>
                    <div class='gvnews_slider_type_9_inner_wrapper'>
                        <div class=\"gvnews_slider_type_9_thumb gvnews_posts\">
                            {$content['thumb']}
                        </div>
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
	 * @param array $post post.
	 *
	 * @return string
	 */
	public function render_meta( $post ) {
		$output = '';

		$time    = $this->format_date( $post );
		$comment = get_comments_number( $post );

		$output =
		'<div class="gvnews_post_meta">
				<span class="gvnews_meta_date"><i class="fas fa-clock"></i>' . esc_attr( $time ) . '</span>
				<span class="gvnews_meta_comment"><i class="fa fa-comments"></i> ' . esc_attr( $comment ) . '</span>
			</div>';

		return $output;
	}
}
