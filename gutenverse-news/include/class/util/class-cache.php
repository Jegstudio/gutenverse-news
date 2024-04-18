<?php
/**
 * Cache
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Util;

/**
 * Cache
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Cache {


	/**
	 * Method cache_term
	 *
	 * @param object $terms terms.
	 *
	 * @return void
	 */
	public static function cache_term( $terms ) {
		foreach ( $terms as $term ) {
			wp_cache_add( $term->term_id, $term, 'terms' );
		}
	}

	/**
	 * Get users
	 *
	 * @return array
	 */
	public static function get_users() {
		$users = wp_cache_get( 'users', 'gvnews' );
		if ( ! $users ) {
			$users = get_users();
			wp_cache_set( 'users', $users, 'gvnews' );
		}

		return $users;
	}

	/**
	 * Get count users
	 *
	 * @return array
	 */
	public static function get_count_users() {
		$count = wp_cache_get( 'count_users', 'gvnews' );
		if ( ! $count ) {
			$count = count_users();
			wp_cache_set( 'count_users', $count, 'gvnews' );
		}

		return $count;
	}

	/**
	 * Get categories
	 *
	 * @return array
	 */
	public static function get_categories() {
		$categories = wp_cache_get( 'categories', 'gvnews' );
		if ( ! $categories ) {
			$categories = get_categories( array( 'hide_empty' => 0 ) );
			wp_cache_set( 'categories', $categories, 'gvnews' );
			self::cache_term( $categories );
		}

		return $categories;
	}

	/**
	 * Get categories count
	 *
	 * @return array
	 */
	public static function get_categories_count() {
		$count = wp_cache_get( 'categories_count', 'gvnews' );
		if ( ! $count ) {
			$count = wp_count_terms( 'category' );
			wp_cache_set( 'categories_count', $count, 'gvnews' );
		}

		return $count;
	}

	/**
	 * Get tags
	 *
	 * @return array
	 */
	public static function get_tags() {
		$tags = wp_cache_get( 'tags', 'gvnews' );
		if ( ! $tags ) {
			$tags = get_tags( array( 'hide_empty' => 0 ) );
			wp_cache_set( 'tags', $tags, 'gvnews' );
			self::cache_term( $tags );
		}

		return $tags;
	}

	/**
	 * Get tags count
	 *
	 * @return array
	 */
	public static function get_tags_count() {
		$count = wp_cache_get( 'tags_count', 'gvnews' );
		if ( ! $count ) {
			$count = wp_count_terms( 'post_tag' );
			wp_cache_set( 'tags_count', $count, 'gvnews' );
		}

		return $count;
	}

	/**
	 * Get post type
	 *
	 * @return array
	 */
	public static function get_post_type() {
		$post_type = wp_cache_get( 'post_type', 'gvnews' );
		if ( ! $post_type ) {
			$post_type = get_post_types(
				array(
					'public'  => true,
					'show_ui' => true,
				)
			);
			wp_cache_set( 'post_type', $post_type, 'gvnews' );
		}

		return $post_type;
	}

	/**
	 * Get exclude post type
	 *
	 * @return array|bool|mixed
	 */
	public static function get_exclude_post_type() {
		$post_type = wp_cache_get( 'exclude_post_type', 'gvnews' );
		if ( ! $post_type ) {
			$post_types = self::get_post_type();
			$result     = array();

			$exclude_post_type = array(
				'attachment',
				'custom-post-template',
				'archive-template',
				'custom-mega-menu',
				'elementor_library',
				'footer',
			);

			foreach ( $post_types as $type ) {
				if ( ! in_array( $type, $exclude_post_type, true ) ) {
					$result[ $type ] = get_post_type_object( $type )->label;
				}
			}

			$post_type = $result;

			wp_cache_set( 'exclude_post_type', $post_type, 'gvnews' );
		}

		return $post_type;
	}
}
