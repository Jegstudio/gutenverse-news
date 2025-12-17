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
		$thumb   = '';
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
					{$hidden_image}
                    " . gvnews_edit_post( $post->ID ) . "
                    <div class=\"gvnews_slide_wrapper\">
                        <div class=\"gvnews_slide_caption\">
                            <div class=\"gvnews_caption_container\">
                                <div class=\"gvnews_post_category\">
                                    {$primary_category}
                                </div>
                                {$this->render_meta( $post )}
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

		$icon_date = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. --><path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"></path></svg>';
		$icon_date = $this->render_icon( 'svg', 'fas fa-clock', base64_encode( $icon_date ) );

		$icon_comment = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. --><path d="M208 352c114.9 0 208-78.8 208-176S322.9 0 208 0S0 78.8 0 176c0 38.6 14.7 74.3 39.6 103.4c-3.5 9.4-8.7 17.7-14.2 24.7c-4.8 6.2-9.7 11-13.3 14.3c-1.8 1.6-3.3 2.9-4.3 3.7c-.5 .4-.9 .7-1.1 .8l-.2 .2 0 0 0 0C1 327.2-1.4 334.4 .8 340.9S9.1 352 16 352c21.8 0 43.8-5.6 62.1-12.5c9.2-3.5 17.8-7.4 25.3-11.4C134.1 343.3 169.8 352 208 352zM448 176c0 112.3-99.1 196.9-216.5 207C255.8 457.4 336.4 512 432 512c38.2 0 73.9-8.7 104.7-23.9c7.5 4 16 7.9 25.2 11.4c18.3 6.9 40.3 12.5 62.1 12.5c6.9 0 13.1-4.5 15.2-11.1c2.1-6.6-.2-13.8-5.8-17.9l0 0 0 0-.2-.2c-.2-.2-.6-.4-1.1-.8c-1-.8-2.5-2-4.3-3.7c-3.6-3.3-8.5-8.1-13.3-14.3c-5.5-7-10.7-15.4-14.2-24.7c24.9-29 39.6-64.7 39.6-103.4c0-92.8-84.9-168.9-192.6-175.5c.4 5.1 .6 10.3 .6 15.5z"></path></svg>';
		$icon_comment = $this->render_icon( 'svg', 'fas fa-comments', base64_encode( $icon_comment ) );

		$output =
			'<div class="gvnews_post_meta">
				<span class="gvnews_meta_date">' . $icon_date . esc_attr( $time ) . '</span>
				<span class="gvnews_meta_comment">' . $icon_comment . ' ' . esc_attr( $comment ) . '</span>
			</div>';

		return $output;
	}
}
