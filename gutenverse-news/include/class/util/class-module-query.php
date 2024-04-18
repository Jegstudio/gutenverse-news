<?php
/**
 * Module Query
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Util;

/**
 * Module_Query
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Module_Query {

	/**
	 * Cache thumbnail
	 *
	 * @var $cache_thumbnail
	 */
	private static $cache_thumbnail = array();

	/**
	 * Do query
	 *
	 * @param array $attr attributes.
	 *
	 * @return array
	 */
	public static function do_query( $attr ) {
		$attr = self::unset_unnecessary( $attr );

		if ( isset( $attr['sort_by'] ) ) {
			if ( 'most_comment_day' === $attr['sort_by']
				|| 'most_comment_week' === $attr['sort_by']
				|| 'most_comment_month' === $attr['sort_by']
			) {
				$result = self::custom_query( $attr );
			} else {
				$result = self::default_query( $attr );
			}
		} else {
			$result = self::default_query( $attr );
		}

		// need to optimize query.
		self::optimize_query( $result );

		return $result;
	}

	/**
	 * Method unset_unnecessary
	 *
	 * @param array $attr attributes.
	 *
	 * @return array
	 */
	private static function unset_unnecessary( $attr ) {
		$accepted = array(
			'post_type',
			'sponsor',
			'number_post',
			'post_offset',
			'include_post',
			'included_only',
			'exclude_post',
			'include_category',
			'exclude_category',
			'include_author',
			'include_tag',
			'exclude_tag',
			'sort_by',
			'paged',
			'video_only',
			'content_type',
			'pagination_number_post',
			'pagination_mode',
			'date_query',
			'lang',
			's',
		);

		$accepted = apply_filters( 'gvnews_unset_unnecessary_attr', $accepted, $attr );

		foreach ( $attr as $key => $value ) {
			if ( ! in_array( $key, $accepted, true ) ) {
				unset( $attr[ $key ] );
			}
		}

		if ( isset( $attr['pagination_number_post'] ) ) {
			$attr['pagination_number_post'] = intval( $attr['pagination_number_post'] );
		}

		if ( isset( $attr['paged'] ) ) {
			$attr['paged'] = intval( $attr['paged'] );
		}

		if ( isset( $attr['number_post']['size'] ) ) {
			$attr['number_post'] = $attr['number_post']['size'];
		}

		return $attr;
	}

	/**
	 * Method optimize_query
	 *
	 * @param array $result array.
	 *
	 * @return void
	 */
	private static function optimize_query( $result ) {
		self::cache_thumbnail( $result );
	}

	/**
	 * Method cache_thumbnail
	 *
	 * @param array $results results.
	 *
	 * @return void
	 */
	public static function cache_thumbnail( $results ) {
		$thumbnails = array();

		foreach ( $results['result'] as $result ) {
			if ( ! in_array( $result->ID, self::$cache_thumbnail, true ) ) {
				$thumbnails[]            = get_post_thumbnail_id( $result->ID );
				self::$cache_thumbnail[] = $result->ID;
			}
		}

		if ( ! empty( $thumbnails ) ) {
			$query = array(
				'post__in'  => $thumbnails,
				'post_type' => 'attachment',
				'showposts' => count( $thumbnails ),
			);

			get_posts( $query );
		}
	}

	/**
	 * WordPress Default Query
	 *
	 * @param array $attr attributes.
	 *
	 * @return array
	 */
	private static function default_query( $attr ) {
		$include_category = array();
		$exclude_category = array();
		$result           = array();
		$args             = array();
		$included_only    = false;

		$attr['number_post']            = isset( $attr['number_post'] ) ? $attr['number_post'] : get_option( 'posts_per_page' );
		$attr['pagination_number_post'] = isset( $attr['pagination_number_post'] ) ? $attr['pagination_number_post'] : $attr['number_post'];

		// Argument.
		$args['post_type']           = isset( $attr['post_type'] ) ? $attr['post_type'] : 'post';
		$args['paged']               = isset( $attr['paged'] ) ? $attr['paged'] : 1;
		$args['offset']              = self::calculate_offset( $args['paged'], $attr['post_offset'], $attr['number_post'], $attr['pagination_number_post'] );
		$args['posts_per_page']      = ( $args['paged'] > 1 ) ? $attr['pagination_number_post'] : $attr['number_post'];
		$args['no_found_rows']       = ! isset( $attr['pagination_mode'] ) || 'disable' === $attr['pagination_mode'];
		$args['ignore_sticky_posts'] = 1;

		if ( ! empty( $attr['exclude_post'] ) ) {
			$args['post__not_in'] = explode( ',', $attr['exclude_post'] );
		}

		if ( ! empty( $attr['include_post'] ) ) {
			if ( isset( $attr['included_only'] ) && $attr['included_only'] ) {
				$included_only    = true;
				$args['post__in'] = explode( ',', $attr['include_post'] );
			}
		}

		if ( ! empty( $attr['include_category'] ) ) {
			$categories = explode( ',', $attr['include_category'] );
			self::recursive_category( $categories, $include_category );
			$args['category__in'] = $include_category;
		}

		if ( ! empty( $attr['exclude_category'] ) ) {
			$categories = explode( ',', $attr['exclude_category'] );
			self::recursive_category( $categories, $exclude_category );
			$args['category__not_in'] = $exclude_category;
		}

		if ( ! empty( $attr['include_author'] ) ) {
			if ( is_author() && defined( 'COAUTHORS_PLUS_VERSION' ) ) {
				add_action( 'parse_query', 'set_author_query' );
				$args['author'] = $attr['include_author'];
			} else {
				$args['author__in'] = explode( ',', $attr['include_author'] );
			}
		}

		if ( ! empty( $attr['include_tag'] ) ) {
			$args['tag__in'] = explode( ',', $attr['include_tag'] );
		}

		if ( ! empty( $attr['exclude_tag'] ) ) {
			$args['tag__not_in'] = explode( ',', $attr['exclude_tag'] );
		}

		// order.
		if ( isset( $attr['sort_by'] ) ) {
			if ( 'latest' === $attr['sort_by'] ) {
				$args['orderby'] = 'date';
				$args['order']   = 'DESC';
			}

			if ( 'latest_modified' === $attr['sort_by'] ) {
				$args['orderby'] = 'modified';
				$args['order']   = 'DESC';
			}

			if ( 'oldest' === $attr['sort_by'] ) {
				$args['orderby'] = 'date';
				$args['order']   = 'ASC';
			}

			if ( 'oldest_modified' === $attr['sort_by'] ) {
				$args['orderby'] = 'modified';
				$args['order']   = 'ASC';
			}

			if ( 'alphabet_asc' === $attr['sort_by'] ) {
				$args['orderby'] = 'title';
				$args['order']   = 'ASC';
			}

			if ( 'alphabet_desc' === $attr['sort_by'] ) {
				$args['orderby'] = 'title';
				$args['order']   = 'DESC';
			}

			if ( 'random' === $attr['sort_by'] ) {
				$args['orderby'] = 'rand';
			}

			if ( 'random_week' === $attr['sort_by'] ) {
				$args['orderby']    = 'rand';
				$args['date_query'] = array(
					array(
						'after' => '1 week ago',
					),
				);
			}

			if ( 'random_month' === $attr['sort_by'] ) {
				$args['orderby']    = 'rand';
				$args['date_query'] = array(
					array(
						'after' => '1 month ago',
					),
				);
			}

			if ( 'most_comment' === $attr['sort_by'] ) {
				$args['orderby'] = array(
					'comment_count' => 'DESC',
					'ID'            => 'ASC',
				);
			}

			if ( 'post__in' === $attr['sort_by'] ) {
				$args['orderby'] = 'post__in';
			}
		}

		// TODO : fix kalau hanya lihat post.
		if ( isset( $attr['content_type'] ) ) {
			if ( 'post' === $attr['content_type'] ) {
				add_filter( 'posts_join', array( __CLASS__, 'join_only_post' ) );
				add_filter( 'posts_where', array( __CLASS__, 'where_only_post' ) );
			}
		}

		// search.
		if ( isset( $attr['s'] ) ) {
			$args['s'] = $attr['s'];
		}

		// date.
		if ( isset( $attr['date_query'] ) ) {
			$args['date_query'] = $attr['date_query'];
		}

		if ( class_exists( 'Polylang' ) ) {
			if ( isset( $attr['lang'] ) ) {
				$args['lang'] = $attr['lang'];
			}
		}

		// co author guest author.
		if ( class_exists( 'CoAuthors_Plus' ) && ! empty( $args['author__in'] ) ) {
			global $coauthors_plus;
			$guest = $coauthors_plus->guest_authors->get_guest_author_by( 'ID', $args['author__in'][0] );
			if ( $guest ) {
				$args['author_name'] = $guest->user_nicename;
				unset( $args['author__in'] );
			}
		}

		$args = apply_filters( 'gvnews_default_query_args', $args, $attr );

		// Query.
		$query = new \WP_Query( $args );

		if ( ! empty( $attr['include_post'] ) && ! $included_only ) {
			$args['orderby']  = 'post__in';
			$args['post__in'] = explode( ',', $attr['include_post'] );
			$unset            = array(
				'category__not_in',
				'tag__not_in',
				'date_query',
				'tax_query',
				'meta_query',
				'lang',
			);

			if ( ! wp_doing_ajax() ) {
				$unset[] = 'category__in';
				$unset[] = 'author__in';
				$unset[] = 'tag__in';
			}

			foreach ( $query->posts as $post ) {
				$args['post__in'][] = $post->ID;
			}

			foreach ( $unset as $remove ) {
				unset( $args[ $remove ] );
			}

			$query = new \WP_Query( $args );
		}

		foreach ( $query->posts as $post ) {
			$result[] = $post;
		}

		wp_reset_postdata();

		if ( isset( $attr['content_type'] ) && 'post' === $attr['content_type'] ) {
			gvnews_remove_filters( 'posts_join', array( __CLASS__, 'join_only_post' ) );
			gvnews_remove_filters( 'posts_where', array( __CLASS__, 'where_only_post' ) );
		}

		return array(
			'result'     => $result,
			'next'       => self::has_next_page( $query->found_posts, $args['paged'], $args['offset'], $attr['number_post'], $attr['pagination_number_post'] ),
			'prev'       => self::has_prev_page( $args['paged'] ),
			'total_page' => self::count_total_page( $query->found_posts, $args['paged'], $args['offset'], $attr['number_post'], $attr['pagination_number_post'] ),
		);
	}

	/**
	 * Method join_only_post
	 *
	 * @param string $clause clause.
	 *
	 * @return string
	 */
	public static function join_only_post( $clause = '' ) {
		return $clause;
	}

	/**
	 * Method where_only_post
	 *
	 * @param string $clause clause.
	 *
	 * @return string
	 */
	public static function where_only_post( $clause = '' ) {
		global $wpdb;

		$enable_review_key   = 'enable_review';
		$enable_review_value = '1';
		$post_type           = 'post';
		$post_status         = 'publish';

		$clause .=
		$wpdb->prepare(
			"AND {$wpdb->posts}.ID NOT IN (
                SELECT {$wpdb->posts}.ID
                    FROM {$wpdb->posts}
                    INNER JOIN {$wpdb->postmeta}
                    ON  {$wpdb->posts}.ID = {$wpdb->postmeta}.post_id
                    WHERE
                    {$wpdb->postmeta}.meta_key = %s                    
                    AND {$wpdb->postmeta}.meta_value = %s
                    AND {$wpdb->posts}.post_type = %s
                AND {$wpdb->posts}.post_status = %s
            )",
			$enable_review_key,
			$enable_review_value,
			$post_type,
			$post_status
		);

		return $clause;
	}


	/**
	 * Gutenverse News View Counter Query
	 *
	 * @param array $attr attributes.
	 *
	 * @return array
	 */
	private static function custom_query( $attr ) {
		return array(
			'result'     => array(),
			'next'       => false,
			'prev'       => false,
			'total_page' => 1,
		);
	}

	/**
	 * Method recursive_category
	 *
	 * @param $categories $categories array.
	 * @param result     $result array.
	 *
	 * @return void
	 */
	private static function recursive_category( $categories, &$result ) {
		foreach ( $categories as $category ) {
			if ( ! in_array( $category, $result, true ) ) {
				$result[] = $category;
				$children = array();

				if ( ! empty( $children ) ) {
					$child_id = array();
					foreach ( $children as $child ) {
						$child_id[] = $child->term_id;
					}
					self::recursive_category( $child_id, $result );
				}
			}
		}
	}

	/**
	 * Calculate Offset
	 *
	 * @param integer $paged paged.
	 * @param integer $offset offset.
	 * @param integer $number_post number post.
	 * @param integer $number_post_ajax number post ajax.
	 *
	 * @return int
	 */
	private static function calculate_offset( $paged, $offset, $number_post, $number_post_ajax ) {
		$new_offset = 0;

		$offset = (int) ( isset( $offset['size'] ) ? $offset['size'] : $offset );

		if ( 1 === $paged || '1' === $paged ) {
			$new_offset = $offset;
		}
		if ( 2 == $paged || '2' == $paged ) {
			$new_offset = $number_post + $offset;
		}
		if ( $paged >= 3 ) {
			$new_offset = $number_post + $offset + ( $number_post_ajax * ( $paged - 2 ) );
		}

		return $new_offset;
	}

	/**
	 * Check if we have next page
	 *
	 * @param int $total total.
	 * @param int $curpage current page.
	 * @param int $offset offset.
	 * @param int $perpage perpage.
	 * @param int $perpage_ajax perpage ajax.
	 *
	 * @return bool
	 */
	private static function has_next_page( $total, $curpage = 1, $offset = 0, $perpage = 0, $perpage_ajax = 0 ) {
		if ( 1 === $curpage || '1' === $curpage ) {
			return (int) $total > (int) $offset + (int) $perpage;
		}

		if ( $curpage > 1 ) {
			return (int) $total > (int) $offset + (int) $perpage_ajax;
		}

		return false;
	}

	/**
	 * Check if we have previous page
	 *
	 * @param int $curpage current page.
	 *
	 * @return bool
	 */
	private static function has_prev_page( $curpage = 1 ) {
		return $curpage <= 1 ? false : true;
	}

	/**
	 * Get total count of total page
	 *
	 * @param int $total total.
	 * @param int $curpage current page.
	 * @param int $offset offset.
	 * @param int $perpage per page.
	 * @param int $perpage_ajax per page ajax.
	 *
	 * @return int
	 */
	private static function count_total_page( $total, $curpage = 1, $offset = 0, $perpage = 0, $perpage_ajax = 0 ) {
		$remain = (int) $total - ( (int) $offset + (int) $perpage );

		if ( $remain > 0 ) {
			while ( $remain > 0 ) {
				$remain  -= $perpage_ajax;
				++$curpage;
			}
		}

		return $curpage;
	}
}
