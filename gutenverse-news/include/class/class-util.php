<?php
/**
 * Util
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Helper
 */
class Util {


	/**
	 * Method get_date_format
	 *
	 * @param Integer $id id.
	 *
	 * @return Integer
	 */
	public static function get_date_format( $id ) {
		return apply_filters( 'gvnews_single_post_date_format_custom', 'default', $id );
	}

	/**
	 * Method get_post_date
	 *
	 * @param String $format format.
	 * @param Object $post   post.
	 *
	 * @return string
	 */
	public static function get_post_date( $format = '', $post = null ) {
		if ( is_object( $post ) ) {
			$publish_date = isset( $post->publish_date ) ? gmdate( $format ? $format : 'Y-m-d', $post->publish_date ) : get_the_date( $format, $post );
		} else {
			$publish_date = isset( $post->publish_date ) ? gmdate( $format ? $format : 'Y-m-d', $post->publish_date ) : '';
		}

		return $publish_date;
	}

	/**
	 * Method post_date_format
	 *
	 * @param String $id   id.
	 * @param Object $post post.
	 *
	 * @return string
	 */
	public static function post_date_format( $id, $post ) {
		$date_format = self::get_date_format( $id );
		if ( 'ago' === $date_format ) {
			return self::get_ago_time( human_time_diff( is_object( $post ) ? get_the_time( 'U', $post ) : $post, current_time( 'timestamp' ) ) );
		} elseif ( 'default' === $date_format ) {
			return self::get_post_date( '', $post );
		} elseif ( $date_format ) {
			return self::get_post_date( $date_format, $post );
		}

		return self::get_post_date( '', $post );
	}

	/**
	 * Method get_ago_time
	 *
	 * @param String $time time.
	 *
	 * @return String
	 */
	public static function get_ago_time( $time ) {
		return esc_html(
			sprintf(
				/* translators: %s represents time */
				esc_html__( '%s ago', 'gutenverse-news' ),
				$time
			)
		);
	}

	/**
	 * Method gvnews_get_comments_number
	 *
	 * @param Integer $post_id post id.
	 *
	 * @return String
	 */
	public static function gvnews_get_comments_number( $post_id = 0 ) {
		$comment         = \GUTENVERSE\NEWS\Util\Comment_Number::get_instance();
		$comments_number = $comment->comments_number( $post_id );

		return apply_filters( 'gvnews_get_comments_number', $comments_number, $post_id );
	}
}
