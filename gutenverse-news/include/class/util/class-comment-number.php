<?php
/**
 * Comment Number
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Util;

/**
 * Comment_Number
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Comment_Number {


	/**
	 * Instance
	 *
	 * @var CommentNumber
	 */
	private static $instance;

	/**
	 * Cache key
	 *
	 * @var string
	 */
	private $cache_key = 'gvnews_comments_number';

	/**
	 * Comment Number
	 *
	 * @return CommentNumber
	 */
	public static function get_instance() {
		if ( null === static::$instance ) {
			static::$instance = new static();
		}
		return static::$instance;
	}

	/**
	 * Method __construct
	 *
	 * @return void
	 */
	private function __construct() {
	}

	/**
	 * Return number of post comments
	 *
	 * @param int $post_id post id.
	 *
	 * @return int
	 */
	public function comments_number( $post_id ) {
		return get_comments_number( $post_id );
	}

	/**
	 * Fetch data post comment
	 *
	 * @param int    $post_id post id.
	 * @param string $type    type.
	 *
	 * @return int
	 */
	protected function fetch_data( $post_id, $type ) {
		return 0;
	}

	/**
	 * Save post meta data for post comment
	 *
	 * @param int   $post_id post id.
	 * @param array $data    data.
	 */
	protected function save_result( $post_id, $data ) {
		update_post_meta( $post_id, $this->cache_key, $data );
	}

	/**
	 * Make request
	 *
	 * @param string $url url.
	 *
	 * @return bool|array (default:bool)
	 */
	protected function make_request( $url ) {
		$response = wp_remote_get( $url );

		if ( ! is_wp_error( $response ) && ( '200' === $response['response']['code'] || 200 === $response['response']['code'] ) ) {
			$result = json_decode( $response['body'], true );

			return $result;
		}

		return false;
	}

	/**
	 * Get post id
	 *
	 * @param int $post_id post id.
	 *
	 * @return int
	 */
	protected function get_post_id( $post_id ) {
		$post = get_post( $post_id );

		if ( $post ) {
			$post_id = $post->ID;
		}

		return $post_id;
	}
}
