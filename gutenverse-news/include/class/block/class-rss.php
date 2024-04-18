<?php
/**
 * RSS
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block;

use GUTENVERSE\NEWS\Block\Grab;
use GUTENVERSE\NEWS\Util\Feed;

/**
 * Class Init
 *
 * @package Gutenverse-News
 */
class Rss extends Grab {


	/**
	 * Method get_content
	 *
	 * @return string
	 */
	public function get_content() {

		if ( defined( 'REST_REQUEST' ) && REST_REQUEST ) {
			$attr = array(
				'short_code'         => $this->attributes['gvnewsModule'],
				'feed_url'           => $this->attributes['feedurl'],
				'thumbnail'          => $this->attributes['thumb'],
				'fallback'           => $this->attributes['fallback'],
				'fallimage'          => isset( $this->attributes['fallbackimg']['id'] ) ? $this->attributes['fallbackimg']['id'] : '',
				'number_post'        => $this->attributes['numberPost'],
				'excerpt_length'     => $this->attributes['excerptLength'],
				'excerpt_ellipsis'   => $this->attributes['excerptEllipsis'],
				'date_format'        => $this->attributes['metaDateFormat'],
				'date_format_custom' => $this->attributes['metaDateFormatCustom'],
				'video_duration'     => true,
				'post_meta_style'    => 'style_2',
				'author_avatar'      => true,
				'more_menu'          => true,
				'column_width'       => $this->attributes['columnWidth'],
			);
		} else {
			$attr = array(
				'short_code'         => $this->attributes['gvnewsModule'],
				'first_title'        => $this->attributes['title'],
				'second_title'       => $this->attributes['second_title'],
				'url'                => $this->attributes['url_title'],
				'header_type'        => $this->attributes['headerType'],
				'header_icon'        => $this->attributes['icon'],
				'feed_url'           => $this->attributes['feedurl'],
				'thumbnail'          => $this->attributes['thumb'],
				'fallback'           => $this->attributes['fallback'],
				'fallimage'          => isset( $this->attributes['fallbackimg']['id'] ) ? $this->attributes['fallbackimg']['id'] : '',
				'number_post'        => $this->attributes['numberPost'],
				'boxed'              => $this->attributes['enableBoxed'],
				'boxed_shadow'       => $this->attributes['enableBoxed'] ? $this->attributes['enableBoxShadow'] : false,
				'excerpt_length'     => $this->attributes['excerptLength'],
				'excerpt_ellipsis'   => $this->attributes['excerptEllipsis'],
				'date_format'        => $this->attributes['metaDateFormat'],
				'date_format_custom' => $this->attributes['metaDateFormatCustom'],
				'video_duration'     => true,
				'post_meta_style'    => 'style_2',
				'author_avatar'      => true,
				'more_menu'          => true,
				'column_width'       => $this->attributes['columnWidth'],
			);
		}

		$name     = 'GUTENVERSE\\NEWS\\Block\\Module\\Module_' . $this->attributes['blockType'];
		$mod      = gvnews_get_view_class_from_shortcode( $name );
		$instance = call_user_func( array( $mod, 'get_instance' ) );

		$feed = fetch_feed( esc_url( $this->attributes['feedurl'] ) );
		$posts = $feed->get_items( 0, $this->attributes['numberPost'] );
		if ( ! is_wp_error( $feed ) && $posts ) {
			$result = array(
				'result' => array(),
			);

			foreach ( $posts as $post ) {
				$result['result'][] = new Feed( $post, $attr );
			}

			$result['next']       = false;
			$result['prev']       = false;
			$result['total_page'] = 1;

			$attr['pagination_mode'] = 'disable';
			$attr['results']         = $result;
			return $instance->build_module( $attr );
		}
	}
}
