<?php
/**
 * Social Author Icon
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block;

use GUTENVERSE\NEWS\Block\Post_Guten;
use GUTENVERSE\NEWS\Social_Contacts;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Social_Author_Icon
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Social_Author_Icon extends Post_Guten {

	/**
	 * Method get_custom_classes;
	 *
	 * @return string
	 */
	public function get_custom_classes() {
		return 'gvnews-social-author-icon guten-social-icon';
	}

	/**
	 * Method get_content
	 *
	 * @return string
	 */
	public function get_content() {
		$attributes       = $this->attributes;
		$author_type      = isset( $attributes['authorType'] ) ? $attributes['authorType'] : 'dynamic';
		$social_media     = ! empty( $attributes['socialMedia'] ) ? $attributes['socialMedia'] : '';
		$hide_if_empty    = $attributes['hideIfEmpty'];
		$default_url      = isset( $attributes['defaultUrl'] ) ? $attributes['defaultUrl'] : '';
		$static_author_id = isset( $attributes['authorId'] ) ? $attributes['authorId']['value'] : 0;
		$custom_icon      = isset( $attributes['icon'] ) ? $attributes['icon'] : '';

		// Determine author ID based on author type.
		$author_id = 0;
		if ( 'static' === $author_type ) {
			$author_id = $static_author_id;
		} else {
			$post_id   = ! empty( $this->context['postId'] ) ? esc_html( $this->context['postId'] ) : get_the_ID();
			$author_id = is_author() ? get_queried_object_id() : get_post_field( 'post_author', $post_id );
		}

		// Get URL from social media if specified.
		$url = '';
		if ( ! empty( $social_media ) && ! empty( $author_id ) ) {
			$url = get_the_author_meta( $social_media, $author_id );
		}

		if ( empty( $url ) ) {
			if ( $hide_if_empty ) {
				return '';
			}
			if ( ! empty( $default_url ) ) {
				$url = $default_url;
			}
		}

		$icon_html = $this->render_icon( $custom_icon, $social_media );

		return '<a href="' . esc_url( $url ) . '">' .
					$icon_html .
				'</a>';
	}

	/**
	 * Render icon HTML
	 *
	 * @param string $custom_icon Custom icon class.
	 * @param string $social_media Social media key.
	 * @return string
	 */
	private function render_icon( $custom_icon, $social_media ) {
		// Use custom icon if provided.
		if ( ! empty( $custom_icon ) ) {
			return '<i class="' . esc_attr( $custom_icon ) . '"></i>';
		}

		// Fallback to social media icon.
		$icons      = Social_Contacts::social_icon_list_class();
		$icon_class = isset( $icons[ $social_media ] ) ? $icons[ $social_media ] : 'fa fa-globe';
		return '<i class="' . esc_attr( $icon_class ) . '"></i>';
	}

	/**
	 * Render view in frontend
	 */
	public function render_frontend() {
		$this->is_deprecated = $this->check_deprecated();
		$this->is_pro_block  = $this->check_pro();
		$content             = $this->render_content();
		if ( empty( $content ) ) {
			return '';
		}
		return '<div class="' . $this->generate_container_class() . '">' .
				$content . $this->render_overlay() .
			'</div>';
	}
}
