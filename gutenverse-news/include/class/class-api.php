<?php
/**
 * Api
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS;

use GUTENVERSE\NEWS\Util\Module_Query;
use GUTENVERSE\NEWS\Util\Cache;

/**
 * Class Api
 *
 * @package gutenverse-news
 */
class Api {

	/**
	 * Endpoint Path
	 *
	 * @var string
	 */
	const ENDPOINT = 'gvnews-client/v1';

	/**
	 * Blocks constructor.
	 */
	public function __construct() {
		$this->register_routes();
	}

	/**
	 * Register Gutenverse News APIs
	 */
	private function register_routes() {
		register_rest_route(
			self::ENDPOINT,
			'module-option',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'module_option' ),
				'permission_callback' => 'gutenverse_permission_check_author',
			)
		);
		register_rest_route(
			self::ENDPOINT,
			'get-role',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'get_role' ),
				'permission_callback' => 'gutenverse_permission_check_author',
			)
		);
		register_rest_route(
			self::ENDPOINT,
			'get-post',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'get_post' ),
				'permission_callback' => 'gutenverse_permission_check_author',
			)
		);
		register_rest_route(
			self::ENDPOINT,
			'get-posts-archive',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'get_posts_archive' ),
				'permission_callback' => 'gutenverse_permission_check_author',
			)
		);
		register_rest_route(
			self::ENDPOINT,
			'get-author',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'get_author' ),
				'permission_callback' => 'gutenverse_permission_check_author',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'php-function-caller',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'php_function_caller' ),
				'permission_callback' => 'gutenverse_permission_check_author',
			)
		);
		register_rest_route(
			self::ENDPOINT,
			'get-breadcrumb',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'get_breadcrumb' ),
				'permission_callback' => 'gutenverse_permission_check_author',
			)
		);
		register_rest_route(
			self::ENDPOINT,
			'get-subtitle',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'get_subtitle' ),
				'permission_callback' => 'gutenverse_permission_check_author',
			)
		);
		register_rest_route(
			self::ENDPOINT,
			'get-post-author',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'get_post_author' ),
				'permission_callback' => 'gutenverse_permission_check_author',
			)
		);
		register_rest_route(
			self::ENDPOINT,
			'get-post-prev-next',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'get_post_prev_next' ),
				'permission_callback' => 'gutenverse_permission_check_author',
			)
		);
		register_rest_route(
			self::ENDPOINT,
			'get-post-meta-element',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'get_post_meta_element' ),
				'permission_callback' => 'gutenverse_permission_check_author',
			)
		);
		register_rest_route(
			self::ENDPOINT,
			'get-rss-data',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'get_rss_data' ),
				'permission_callback' => 'gutenverse_permission_check_author',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'downgradePlugin',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'downgrade_plugin' ),
				'permission_callback' => array( $this, 'permission_install_plugin' ),
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'dismissNotice',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'dismiss_notice' ),
				'permission_callback' => array( $this, 'edit_pages' ),
			)
		);
	}

	/**
	 * Downgrade plugin handle.
	 *
	 * @param object $request request.
	 *
	 *  @return \WP_REST_Response
	 *
	 *  @throws \Exception Request error message.
	 */
	public function downgrade_plugin( $request ) {
		$nonce               = $request->get_param( 'nonce' );
		$disable_auto_update = $request->get_param( 'disableAutoUpdate' );
		try {
			if ( ! wp_verify_nonce( $nonce, 'gvnews_downgrade' ) ) {
				throw new \Exception( esc_html__( 'Faild when vertify request nonce.', 'gutenverse-news' ) );
			}

			$slug     = 'gutenverse-news';
			$file_url = 'https://downloads.wordpress.org/plugin/gutenverse-news.2.0.1.zip';
			include_once ABSPATH . 'wp-admin/includes/file.php';
			include_once ABSPATH . 'wp-admin/includes/plugin.php';
			include_once ABSPATH . 'wp-admin/includes/class-wp-upgrader.php';

			$plugin_dir  = WP_PLUGIN_DIR . '/' . $slug;
			$plugin_file = $slug . '/' . $slug . '.php';

			/* Deactive Plugin */
			$active_plugins = get_option( 'active_plugins' );
			foreach ( $active_plugins as $plugin ) {
				if ( strpos( $plugin, $slug . '/' ) === 0 ) {
					$plugin_file = $plugin;
					deactivate_plugins( $plugin );
					break;
				}
			}

			/* Remove current plugin file. */
			if ( is_dir( $plugin_dir ) ) {
				global $wp_filesystem;
				WP_Filesystem();
				$wp_filesystem->delete( $plugin_dir, true );
			} else {
				throw new \Exception( __( 'Gutenverse News plugin directory not found', 'gutenverse-news' ) );
			}

			/* Download old version pluign zip */
			$tmp_file = download_url( $file_url );
			if ( is_wp_error( $tmp_file ) ) {
				throw new \Exception( __( 'Faild when trying to download Gutenverse News plugin.', 'gutenverse-news' ) );
			}

			/* Extract plugin file */
			$result = unzip_file( $tmp_file, WP_PLUGIN_DIR );
			wp_delete_file( $tmp_file );

			if ( is_wp_error( $result ) ) {
				throw new \Exception( __( 'Faild to extract plugin file.', 'gutenverse-news' ) );
			}

			/* Activate old versuin plugin */
			$activation_result = activate_plugin( $plugin_file );

			if ( is_wp_error( $activation_result ) ) {
				throw new \Exception( 'Plugin extracted, but failed to activate: ' . $activation_result->get_error_message() );
			}

			/* Deactive auto update if needed */
			if ( $disable_auto_update ) {
				$auto_updates = get_site_option( 'auto_update_plugins', array() );
				$filtered     = array_filter(
					$auto_updates,
					function ( $item ) use ( $plugin_file ) {
						return $item !== $plugin_file;
					}
				);
				if ( $filtered !== $auto_updates ) {
					update_site_option( 'auto_update_plugins', array_values( $filtered ) );
				}
			}
		} catch ( \Exception $e ) {
			return $this->response_error( $e->getMessage() );
		}

		return $this->response_success( __( 'Downgrade Gutenverse News plugin success.', 'gutenverse-news' ) );
	}

	/**
	 * Downgrade plugin handle.
	 *
	 * @param object $request request.
	 *
	 *  @return \WP_REST_Response
	 *
	 *  @throws \Exception Request error message.
	 */
	public function dismiss_notice( $request ) {
		$nonce = sanitize_text_field( $request->get_param( 'nonce' ) );
		if ( ! wp_verify_nonce( $nonce, 'gvnews_dismiss_notice' ) ) {
			return $this->response_error( esc_html__( 'Faild when vertify request nonce.', 'gutenverse-news' ) );
		}
		$notice = sanitize_text_field( $request->get_param( 'notice' ) );

		if ( 'deprecated_gutenverse_news' === $notice ) {
			set_transient( 'deprecated_gutenverse_news_dismissed', 'dismissed', DAY_IN_SECONDS );
		}
		return $this->response_success( 'sucess' );
	}


	/**
	 * Method get_rss_data
	 *
	 * @param object $request request.
	 *
	 * @return JSON
	 */
	public function get_rss_data( $request ) {
		$attr   = $request->get_param( 'attr' );
		$feed   = fetch_feed( $attr['feedurl'] );
		$result = array();
		if ( ! is_wp_error( $feed ) ) {
			$posts = $feed->get_items( 0, $attr['numberPost'] );
			foreach ( $posts as $post ) {
				$construct = new \GUTENVERSE\NEWS\Util\Feed( $post, $attr );
				$data      = array(
					'title'     => $construct->title,
					'permalink' => $construct->permalink,
					'date'      => array(
						'published' => isset( $construct->publish_date ) ? $construct->publish_date : '',
						'modified'  => isset( $construct->update_date ) ? $construct->publish_date : '',
					),
					'excerpt'   => $construct->description,
				);

				if ( ! empty( $construct->thumbnail_url ) ) {
					$data['thumbnail']['url'] = esc_url( $construct->thumbnail_url );
				}

				if ( ! empty( $construct->post_author_name ) ) {
					$data['author']['name'] = $construct->post_author_name;
				}

				$result[] = $data;
			}
		}
		return wp_json_encode( $result );
	}


	/**
	 * Method get_post_meta_element
	 *
	 * @param object $request request.
	 *
	 * @return JSON
	 */
	public function get_post_meta_element( $request ) {
		$attr    = $request->get_param( 'attr' );
		$authors = array();

		if ( is_array( $attr['author'] ) ) {
			$data = array();

			foreach ( $attr['author'] as $author ) {
				$user = get_user_by( 'ID', $author );

				if ( isset( $user->ID ) ) {
					if ( get_user_meta( $user->ID, 'first_name', true ) || get_user_meta( $user->ID, 'last_name', true ) ) {
						$name = get_user_meta( $user->ID, 'first_name', true ) . ' ' . get_user_meta( $user->ID, 'last_name', true );
					} else {
						$name = get_the_author_meta( 'display_name', $user->ID );
					}
					$authors[] = array(
						'ID'     => $user->ID,
						'name'   => $name,
						'avatar' => get_avatar_url( $user->ID, 80 ),
						'role'   => ! empty( $user->roles ) ? $user->roles[0] : '',
					);
				}
			}
		}

		$data = array(
			'authors'       => $authors,
			'date'          => isset( $attr['post_date'] ) ? Util::post_date_format( $attr['id'], strtotime( $attr['post_date'] ) ) : '',
			'commentNumber' => Util::gvnews_get_comments_number( $attr['id'] ),
		);

		return wp_json_encode( $data );
	}


	/**
	 * Method get_post_prev_next
	 *
	 * @param object $request request.
	 *
	 * @return JSON
	 */
	public function get_post_prev_next( $request ) {
		$id   = $request->get_param( 'id' );
		$data = array();

		$post          = get_post( $id );
		$previous_post = get_adjacent_post( false, '', true ); // Get the previous post object.

		if ( $previous_post ) {
			$previous_post_id    = $id; // Get the previous post ID.
			$previous_post_link  = get_permalink( $previous_post_id ); // Get the previous post permalink.
			$previous_post_title = get_the_title( $previous_post_id ); // Get the previous post title.

			$data['previous'] = array(
				'url'   => $previous_post_link,
				'title' => $previous_post_title,
			);
		}

		$next_post = get_adjacent_post( false, '', false ); // Get the next post object.

		if ( $next_post ) {
			$next_post_id    = $next_post->ID; // Get the next post ID.
			$next_post_link  = get_permalink( $next_post_id ); // Get the next post permalink.
			$next_post_title = get_the_title( $next_post_id ); // Get the next post title.

			$data['next'] = array(
				'url'   => $next_post_link,
				'title' => $next_post_title,
			);
		}

		return wp_json_encode( $data );
	}

	/**
	 * Method get_post_author
	 *
	 * @param object $request request.
	 *
	 * @return JSON
	 */
	public function get_post_author( $request ) {
		$attr         = $request->get_param( 'attr' );
		$social_array = $this->declare_socials();
		if ( is_array( $attr['author'] ) ) {
			$data = array();
			foreach ( $attr['author'] as $author ) {
				if ( is_array( $author ) ) {
					$user = get_user_by( 'login', $author['value'] );

					if ( isset( $user->ID ) ) {
						foreach ( $social_array as $key => $value ) {
							if ( get_the_author_meta( $key, $user->ID ) ) {
									$meta[] = array(
										'key'   => get_the_author_meta( $key, $user->ID ),
										'value' => $value,
									);
							}
						}
						if ( get_user_meta( $user->ID, 'first_name', true ) || get_user_meta( $user->ID, 'last_name', true ) ) {
							$name = get_user_meta( $user->ID, 'first_name', true ) . ' ' . get_user_meta( $user->ID, 'last_name', true );
						} else {
							$name = get_the_author_meta( 'display_name', $user->ID );
						}
						$data[] = array(
							'ID'     => $user->ID,
							'name'   => $name,
							'avatar' => get_avatar_url( $user->ID, 80 ),
							'role'   => $user->roles[0],
							'desc'   => get_the_author_meta( 'description', $user->ID ),
							'meta'   => $meta,
						);
					}
				}
			}
		}
		return wp_json_encode( $data );
	}

	/**
	 * Method get_subtitle
	 *
	 * @param object $request request.
	 *
	 * @return string
	 */
	public function get_subtitle( $request ) {
		$attributes = $request->get_param( 'attr' );
		return ( new \GUTENVERSE\NEWS\Block\Post_Breadcrumb() )->call_breadcrumb( $attributes['id'] );
	}


	/**
	 * Method get_breadcrumb
	 *
	 * @param object $request request.
	 *
	 * @return string
	 */
	public function get_breadcrumb( $request ) {
		$attributes = $request->get_param( 'attr' );
		return ( new \GUTENVERSE\NEWS\Block\Post_Breadcrumb() )->call_breadcrumb( $attributes['id'] );
	}


	/**
	 * Method module_option
	 *
	 * @return JSON
	 */
	public function module_option() {

		$args = array(
			'post_type'      => 'post',
			'post_status'    => 'publish',
			'posts_per_page' => -1,
			'tax_query'      => array(
				array(
					'taxonomy' => 'post_format',
					'field'    => 'slug',
					'terms'    => array(
						'post-format-video',
					),
					'operator' => 'IN',
				),
			),
		);

		$query = new \WP_Query( $args );

		$video_count = (int) $query->post_count;

		$data                           = array();
		$data['string']['read_more']    = esc_html__( 'Read more', 'gutenverse-news' );
		$data['string']['next']         = esc_html__( 'Next', 'gutenverse-news' );
		$data['string']['previous']     = esc_html__( 'Previous', 'gutenverse-news' );
		$data['string']['load_more']    = esc_html__( 'Load More', 'gutenverse-news' );
		$data['string']['by']           = esc_html__( 'by', 'gutenverse-news' );
		$data['string']['no_content']   = esc_html__( 'No Content Available', 'gutenverse-news' );
		$data['option']['meta_show']    = true;
		$data['option']['meta_comment'] = true;
		$data['option']['meta_author']  = true;
		$data['option']['meta_rating']  = true;
		$data['option']['meta_date']    = true;
		$data['option']['meta_views']   = true;
		$data['option']['meta_comment'] = true;
		$data['option']['date_format']  = get_option( 'date_format' );
		$data['option']['date_module']  = get_option( 'date_format' );
		$data['option']['date_type']    = 'published';
		$data['option']['post_count']   = wp_count_posts();
		$data['option']['video_count']  = $video_count;

		return wp_json_encode( apply_filters( 'gvnews_module_options', $data ) );
	}


	/**
	 * Method get_role
	 *
	 * @param object $request request.
	 *
	 * @return JSON
	 */
	public function get_role( $request ) {
		$search         = $request->get_param( 'search' );
		$roles          = array();
		$editable_roles = $this->get_editable_roles();
		foreach ( $editable_roles as $role => $details ) {
			$sub['role'] = esc_attr( $role );
			$sub['name'] = translate_user_role( $details['name'] );
			if ( ! $search || preg_match( '/' . $search . '/i', $sub['name'] ) ) {
				$roles[] = $sub;
			}
		}

		return wp_json_encode( $roles );
	}

	/**
	 * Method get_editable_roles
	 *
	 * @return array
	 */
	public function get_editable_roles() {
		global $wp_roles;
		if ( ! isset( $wp_roles ) ) {
			$roles = new \WP_Roles();
		} else {
			$roles = $wp_roles;
		}
		$all_roles      = $roles->roles;
		$editable_roles = apply_filters( 'editable_roles', $all_roles );
		return $editable_roles;
	}


	/**
	 * Method get_author
	 *
	 * @param array $attributes attributes.
	 *
	 * @return JSON
	 */
	public function get_author( $attributes ) {
		$data         = array();
		$users        = get_users();
		$social_array = $this->declare_socials();
		$name         = '';
		foreach ( $users as $user ) {
			$meta = false;
			foreach ( $social_array as $key => $value ) {
				if ( get_the_author_meta( $key, $user->ID ) ) {
					$meta[] = array(
						'key'   => get_the_author_meta( $key, $user->ID ),
						'value' => $value,
					);
				}
			}
			if ( get_user_meta( $user->ID, 'first_name', true ) || get_user_meta( $user->ID, 'last_name', true ) ) {
				$name = get_user_meta( $user->ID, 'first_name', true ) . ' ' . get_user_meta( $user->ID, 'last_name', true );
			} else {
				$name = get_the_author_meta( 'display_name', $user->ID );
			}
			$data['users'][] = array(
				'ID'     => $user->ID,
				'name'   => $name,
				'avatar' => get_avatar( $user->ID, 500 ),
				'role'   => $user->roles[0],
				'desc'   => get_the_author_meta( 'description', $user->ID ),
				'meta'   => $meta,
			);
		}

		return wp_json_encode( $data );
	}


	/**
	 * Method get_post
	 *
	 * @param Object $attributes attributes.
	 *
	 * @return JSOn
	 */
	public function get_post( $attributes ) {
		$attributes = $attributes->get_param( 'attr' );
		$inclpost   = '';
		$exclpost   = '';
		$inclcat    = '';
		$exclcat    = '';
		$incltag    = '';
		$excltag    = '';
		$inclaut    = '';

		if ( isset( $attributes['includePost'] ) ) {
			foreach ( $attributes['includePost'] as $cat ) {
				if ( '' === $inclpost ) {
					$inclpost = $cat['value'];
				} else {
					$inclpost .= ',' . $cat['value'];
				}
			}
		}

		if ( isset( $attributes['excludePost'] ) ) {
			foreach ( $attributes['excludePost'] as $cat ) {
				if ( '' === $exclpost ) {
					$exclpost = $cat['value'];
				} else {
					$exclpost .= ',' . $cat['value'];
				}
			}
		}

		if ( isset( $attributes['includeCategory'] ) ) {
			foreach ( $attributes['includeCategory'] as $cat ) {
				if ( '' === $inclcat ) {
					$inclcat = $cat['value'];
				} else {
					$inclcat .= ',' . $cat['value'];
				}
			}
		}

		if ( isset( $attributes['excludeCategory'] ) ) {
			foreach ( $attributes['excludeCategory'] as $cat ) {
				if ( '' === $exclcat ) {
					$exclcat = $cat['value'];
				} else {
					$exclcat .= ',' . $cat['value'];
				}
			}
		}

		if ( isset( $attributes['includeTag'] ) ) {
			foreach ( $attributes['includeTag'] as $cat ) {
				if ( '' === $incltag ) {
					$incltag = $cat['value'];
				} else {
					$incltag .= ',' . $cat['value'];
				}
			}
		}

		if ( isset( $attributes['excludeTag'] ) ) {
			foreach ( $attributes['excludeTag'] as $cat ) {
				if ( '' === $excltag ) {
					$excltag = $cat['value'];
				} else {
					$excltag .= ',' . $cat['value'];
				}
			}
		}

		if ( isset( $attributes['includeAuthor'] ) ) {
			foreach ( $attributes['includeAuthor'] as $cat ) {
				if ( '' === $inclaut ) {
					$inclaut = $cat['value'];
				} else {
					$inclaut .= ',' . $cat['value'];
				}
			}
		}

		$attr = array(
			'post_type'        => sanitize_text_field( $attributes['postType'] ),
			'content_type'     => sanitize_text_field( $attributes['contentType'] ),
			'number_post'      => sanitize_text_field( $attributes['numberPost'] ),
			'post_offset'      => 0,
			'include_post'     => sanitize_text_field( $inclpost ),
			'included_only'    => isset( $attributes['includeOnly'] ) ? sanitize_text_field( $attributes['includeOnly'] ) : '',
			'exclude_post'     => sanitize_text_field( $exclpost ),
			'include_category' => sanitize_text_field( $inclcat ),
			'exclude_category' => sanitize_text_field( $exclcat ),
			'include_author'   => sanitize_text_field( $inclaut ),
			'include_tag'      => sanitize_text_field( $incltag ),
			'exclude_tag'      => sanitize_text_field( $excltag ),
			'sort_by'          => isset( $attributes['sortBy'] ) ? sanitize_text_field( $attributes['sortBy'] ) : '',
			'share'            => isset( $attributes['share'] ) ? sanitize_text_field( $attributes['share'] ) : 'block',
		);

		if ( isset( $attributes['paginationPost'] ) ) {
			$attr['pagination_number_post'] = sanitize_text_field( $attributes['paginationPost'] );
		}

		if ( isset( $attributes['page'] ) ) {
			$attr['paged'] = sanitize_text_field( $attributes['page'] );
		}

		if ( isset( $attributes['paginationMode'] ) ) {
			$attr['pagination_mode'] = sanitize_text_field( $attributes['paginationMode'] );
		}

		if ( isset( $attributes['postOffset'] ) ) {
			$attr['post_offset'] = sanitize_text_field( $attributes['postOffset'] );
		}

		$result = Module_Query::do_query( $attr );

		$advanced_response = false;
		if ( isset( $attributes['advancedResponse'] ) ) {
			$advanced_response = isset( $attributes['advancedResponse'] );
		}

		$data = $advanced_response ? array(
			'result'     => array(),
			'next'       => $result['next'] ?? false,
			'prev'       => $result['prev'] ?? false,
			'total_page' => $result['total_page'] ?? 1,
		) : array();

		foreach ( $result['result'] as $post ) {
			$cat_id   = gvnews_get_primary_category( $post->ID );
			$category = '';

			if ( $cat_id ) {
				$category = get_category( $cat_id );
				if ( $category && isset( $category->name ) ) {
					$category = $category->name;
				}
			}
			$excerpt = '';
			$excerpt = $post->post_excerpt;
			if ( empty( $excerpt ) ) {
				$excerpt = $post->post_content;
			}

			$post_thumbnail_id = get_post_thumbnail_id( $post->ID );
			$image_size        = wp_get_attachment_image_src( $post_thumbnail_id, 'gvnews-350x350' );
			$padding           = ! empty( $image_size[1] ) ? round( $image_size[2] / $image_size[1] * 100, 3 ) : '';
			$excerpt           = preg_replace( '/\[[^\]]+\]/', '', $excerpt );
			$excerpt           = wp_trim_words( $excerpt, 200, null );

			$final_data = array(
				'id'        => $post->ID,
				'title'     => html_entity_decode( get_the_title( $post->ID ) ),
				'thumbnail' => array(
					'id'      => get_post_thumbnail_id( $post->ID ),
					'url'     => get_the_post_thumbnail_url( $post->ID ),
					'padding' => $padding,
				),
				'category'  => array(
					'id'   => $cat_id,
					'name' => $category,
				),
				'date'      => array(
					'published' => get_post_timestamp( $post->ID, 'date' ),
					'modified'  => get_post_timestamp( $post->ID, 'modified' ),
				),
				'excerpt'   => $excerpt,
				'author'    => array(
					'id'     => $post->post_author,
					'name'   => get_the_author_meta( 'display_name', $post->post_author ),
					'avatar' => get_avatar_url( $post->post_author, array( 'size' => 75 ) ),
				),
				'comment'   => get_comments_number( $post->ID ),
			);

			if ( $advanced_response ) {
				$data['result'][] = $final_data;
			} else {
				$data[] = $final_data;
			}
		}

		return wp_json_encode( $data );
	}

	/**
	 * Get Posts in Archive
	 *
	 * @param \WP_REST_Request $request Core class used to implement a REST request object.
	 *
	 * @return JSON
	 */
	public function get_posts_archive( $request ) {
		$attr       = $request->get_param( 'attr' );
		$args       = array(
			'orderby' => 'count',
			'order'   => 'DESC',
			'number'  => 1,
		);
		$categories = get_categories( $args );
		$category   = $categories[0];

		$post_per_page                  = get_option( 'posts_per_page' );
		$attr['include_category']       = sanitize_text_field( $category->term_id );
		$attr['sort_by']                = 'latest';
		$attr['post_type']              = 'post';
		$attr['post_offset']            = 0;
		$attr['pagination_number_post'] = sanitize_text_field( $post_per_page );
		$attr['paged']                  = sanitize_text_field( gvnews_get_post_current_page() );

		$result_query = Module_Query::do_query( $attr );

		if ( isset( $result_query['result'] ) ) {
			foreach ( $result_query['result'] as $post ) {
				$cat_id   = gvnews_get_primary_category( $post->ID );
				$category = '';

				if ( $cat_id ) {
					$category = get_category( $cat_id );
					if ( $category && isset( $category->name ) ) {
						$category = $category->name;
					}
				}
				$excerpt = '';
				$excerpt = $post->post_excerpt;
				if ( empty( $excerpt ) ) {
					$excerpt = $post->post_content;
				}

				$post_thumbnail_id = get_post_thumbnail_id( $post->ID );
				$image_size        = wp_get_attachment_image_src( $post_thumbnail_id, 'gvnews-350x350' );
				$padding           = ! empty( $image_size[1] ) ? round( $image_size[2] / $image_size[1] * 100, 3 ) : '';
				$excerpt           = preg_replace( '/\[[^\]]+\]/', '', $excerpt );
				$excerpt           = wp_trim_words( $excerpt, 200, null );

				$result[] = array(
					'id'        => $post->ID,
					'title'     => html_entity_decode( get_the_title( $post->ID ) ),
					'thumbnail' => array(
						'id'      => get_post_thumbnail_id( $post->ID ),
						'url'     => get_the_post_thumbnail_url( $post->ID ),
						'padding' => $padding,
					),
					'category'  => array(
						'id'   => $cat_id,
						'name' => $category,
					),
					'date'      => array(
						'published' => get_post_timestamp( $post->ID, 'date' ),
						'modified'  => get_post_timestamp( $post->ID, 'modified' ),
					),
					'excerpt'   => $excerpt,
					'author'    => array(
						'id'     => $post->post_author,
						'name'   => get_the_author_meta( 'display_name', $post->post_author ),
						'avatar' => get_avatar_url( $post->post_author, array( 'size' => 75 ) ),
					),
					'comment'   => get_comments_number( $post->ID ),

				);
			}
		}

		return wp_json_encode( $result );
	}

	/**
	 * Method declare_socials
	 *
	 * @return array
	 */
	public function declare_socials() {
		$social_array = array(
			'url'        => 'fa-globe',
			'facebook'   => 'fa-facebook-official',
			'twitter'    => 'fa-twitter',
			'linkedin'   => 'fa-linkedin',
			'pinterest'  => 'fa-pinterest',
			'behance'    => 'fa-behance',
			'github'     => 'fa-github',
			'flickr'     => 'fa-flickr',
			'tumblr'     => 'fa-tumblr',
			'dribbble'   => 'fa-dribbble',
			'soundcloud' => 'fa-soundcloud',
			'instagram'  => 'fa-instagram',
			'vimeo'      => 'fa-vimeo',
			'youtube'    => 'fa-youtube-play',
			'vk'         => 'fa-vk',
			'reddit'     => 'fa-reddit',
			'weibo'      => 'fa-weibo',
			'rss'        => 'fa-rss',
			'twitch'     => 'fa-twitch',
		);

		return $social_array;
	}

	/**
	 * Method php_function_caller
	 *
	 * @param array $attributes attributes.
	 *
	 * @return void
	 */
	public function php_function_caller( $attributes ) {
	}

	/**
	 * Check user permissions
	 *
	 * @return boolean
	 */
	public function permission_install_plugin() {
		return current_user_can( 'install_plugins' );
	}

	/**
	 * Check user permissions
	 *
	 * @return boolean
	 */
	public function edit_pages() {
		return current_user_can( 'edit_pages' );
	}

	/**
	 * Return error response
	 *
	 * @param string $message Error message.
	 *
	 * @return \WP_REST_Response
	 */
	public function response_error( $message ) {
		return new \WP_REST_Response(
			array(
				'message' => $message,
			),
			500
		);
	}

	/**
	 * Return success response
	 *
	 * @param array $args args.
	 *
	 * @return \WP_REST_Response
	 */
	public function response_success( $args ) {
		return new \WP_REST_Response( $args, 200 );
	}
}
