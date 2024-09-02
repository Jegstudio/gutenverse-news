<?php
/**
 * Helper Functionality
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-news
 */

if ( ! function_exists( 'gvnews_get_view_class_from_shortcode' ) ) {
	/**
	 * Method gvnews_get_view_class_from_shortcode
	 *
	 * @param string $class class.
	 *
	 * @return string
	 */
	function gvnews_get_view_class_from_shortcode( $class ) {
		$explode_class = explode( '\\', $class );
		return apply_filters( 'gvnews_get_view_class_from_shortcode', $class, end( $explode_class ) );
	}
}

if ( ! function_exists( 'gvnews_get_author_name' ) ) {
	/**
	 * Method gvnews_get_author_name
	 *
	 * @param string $author_id author id.
	 *
	 * @return string
	 */
	function gvnews_get_author_name( $author_id = '' ) {
		return get_the_author_meta( 'display_name', $author_id );
	}
}

if ( ! function_exists( 'gvnews_get_shortcode_name_from_view' ) ) {
	/**
	 * Method gvnews_get_shortcode_name_from_view
	 *
	 * @param string $class class.
	 *
	 * @return string
	 */
	function gvnews_get_shortcode_name_from_view( $class ) {
		$mod = explode( '\\', $class );

		if ( isset( $mod[4] ) ) {
			$module = $mod[4];
		} else {
			$module = $class;
		}

		$module = strtolower( $module );

		return apply_filters( 'gvnews_get_shortcode_name_from_view', $module, $class );
	}
}

/**
 * Post Class
 */
if ( ! function_exists( 'gvnews_post_class' ) ) {
	/**
	 * Method gvnews_post_class
	 *
	 * @param string       $class class.
	 * @param integer|null $post_id post id.
	 *
	 * @return string
	 */
	function gvnews_post_class( $class = '', $post_id = null ) {
		$post_type = get_post_type( $post_id );
		// Post Format.
		if ( $post_type && post_type_supports( $post_type, 'post-formats' ) ) {
			$post_format = get_post_format( $post_id );

			if ( $post_format && ! is_wp_error( $post_format ) ) {
				$class .= ' format-' . esc_attr( $post_format );
			} else {
				$class .= ' format-standard';
			}
		}

		return 'class="' . $class . '"';
	}
}

/**
 * Gvnews paging navigation.
 *
 * @return array|string
 */
if ( ! function_exists( 'gvnews_paging_navigation' ) ) {
	/**
	 * Method gvnews_paging_navigation
	 *
	 * @param array   $args args.
	 * @param boolean $total_page total page.
	 * @param string  $column_class cloumn class.
	 *
	 * @return string
	 */
	function gvnews_paging_navigation( $args, $total_page = false, $column_class = '' ) {
		global $wp_query, $wp_rewrite;

		// Setting up default values based on the current URL.
		$pagenum_link = html_entity_decode( get_pagenum_link() );
		$url_parts    = explode( '?', $pagenum_link );

		// Get max pages and current page out of the current query, if available.
		$total   = isset( $wp_query->max_num_pages ) ? $wp_query->max_num_pages : 1;
		$total   = $total_page ? $total_page : $total;
		$current = gvnews_get_post_current_page();

		// Append the format placeholder to the base URL.
		$pagenum_link = trailingslashit( $url_parts[0] ) . '%_%';

		// URL base depends on permalink settings.
		$format  = $wp_rewrite->using_index_permalinks() && ! strpos( $pagenum_link, 'index.php' ) ? 'index.php/' : '';
		$format .= $wp_rewrite->using_permalinks() ? user_trailingslashit( $wp_rewrite->pagination_base . '/%#%', 'paged' ) : '?paged=%#%';

		$defaults = array(
			'base'               => $pagenum_link,
			'format'             => $format,
			'total'              => $total,
			'current'            => $current,
			'show_all'           => false,
			'prev_next'          => true,
			'prev_text'          => esc_html__( 'Previous', 'gutenverse-news' ),
			'next_text'          => esc_html__( 'Next', 'gutenverse-news' ),
			'end_size'           => 1,
			'mid_size'           => 1,
			'type'               => 'plain',
			'add_args'           => array(), // array of query args to add.
			'add_fragment'       => '',
			'before_page_number' => '',
			'after_page_number'  => '',
		);

		$args = wp_parse_args( $args, $defaults );

		if ( ! is_array( $args['add_args'] ) ) {
			$args['add_args'] = array();
		}

		// Merge additional query vars found in the original URL into 'add_args' array.
		if ( isset( $url_parts[1] ) ) {
			// Find the format argument.
			$format_args  = array();
			$url_query_args = array();
			$format       = explode( '?', str_replace( '%_%', $args['format'], $args['base'] ) );
			$format_query = isset( $format[1] ) ? $format[1] : '';
			wp_parse_str( $format_query, $format_args );

			// Find the query args of the requested URL.
			wp_parse_str( $url_parts[1], $url_query_args );

			// Remove the format argument from the array of query arguments, to avoid overwriting custom format.
			foreach ( $format_args as $format_arg => $format_arg_value ) {
				unset( $url_query_args[ $format_arg ] );
			}

			$args['add_args'] = array_merge( $args['add_args'], urlencode_deep( $url_query_args ) );
		}

		// Who knows what else people pass in $args.
		$total = (int) $args['total'];
		if ( $total < 2 ) {
			return;
		}
		$current  = (int) $args['current'];
		$end_size = (int) $args['end_size']; // Out of bounds?  Make it the default.
		if ( $end_size < 1 ) {
			$end_size = 1;
		}
		$mid_size = (int) $args['mid_size'];
		if ( $mid_size < 0 ) {
			$mid_size = 2;
		}
		$add_args   = $args['add_args'];
		$r          = '';
		$page_links = array();
		$dots       = false;

		if ( $args['prev_next'] && $current && 1 < $current ) :
			$link = str_replace( '%_%', 2 == $current ? '' : $args['format'], $args['base'] );
			$link = str_replace( '%#%', $current - 1, $link );
			if ( $add_args ) {
				$link = add_query_arg( $add_args, $link );
			}
			$link .= $args['add_fragment'];

			/**
			 * Filters the paginated links for the given archive pages.
			 *
			 * @param string $link The paginated link URL.
			 *
			 * @since 3.0.0
			 */
			$page_links[] = '<a class="page_nav prev" data-id="' . ( $current - 1 ) . '" href="' . esc_url( apply_filters( 'paginate_links', $link ) ) . '"><span class="navtext">' . $args['prev_text'] . '</span></a>';
		endif;
		for ( $n = 1; $n <= $total; $n++ ) :
			if ( $n == $current ) :
				$page_links[] = "<span class='page_number active'>" . $args['before_page_number'] . number_format_i18n( $n ) . $args['after_page_number'] . '</span>';
				$dots         = true;
			elseif ( $args['show_all'] || ( $n <= $end_size || ( $current && $n >= $current - $mid_size && $n <= $current + $mid_size ) || $n > $total - $end_size ) ) :
				$link = str_replace( '%_%', 1 == $n ? '' : $args['format'], $args['base'] );
				$link = str_replace( '%#%', $n, $link );
				if ( $add_args ) {
					$link = add_query_arg( $add_args, $link );
				}
				$link .= $args['add_fragment'];

				/** This filter is documented in wp-includes/general-template.php */
				$page_links[] = "<a class='page_number' data-id='{$n}' href='" . esc_url( apply_filters( 'paginate_links', $link ) ) . "'>" . $args['before_page_number'] . number_format_i18n( $n ) . $args['after_page_number'] . '</a>';
				$dots         = true;
			elseif ( $dots && ! $args['show_all'] ) :
				$page_links[] = '<span class="page_number dots">' . __( '&hellip;', 'gutenverse-news' ) . '</span>';
				$dots         = false;
			endif;
		endfor;
		if ( $args['prev_next'] && $current && ( $current < $total || -1 == $total ) ) :
			$link = str_replace( '%_%', $args['format'], $args['base'] );
			$link = str_replace( '%#%', $current + 1, $link );
			if ( $add_args ) {
				$link = add_query_arg( $add_args, $link );
			}
			$link .= $args['add_fragment'];

			/** This filter is documented in wp-includes/general-template.php */
			$page_links[] = '<a class="page_nav next" data-id="' . ( $current + 1 ) . '" href="' . esc_url( apply_filters( 'paginate_links', $link ) ) . '"><span class="navtext">' . $args['next_text'] . '</span></a>';
		endif;

		switch ( $args['type'] ) {
			case 'array':
				return $page_links;

			case 'list':
				$r .= "<ul class='page-numbers'>\n\t<li>";
				$r .= join( "</li>\n\t<li>", $page_links );
				$r .= "</li>\n</ul>\n";
				break;

			default:
				$nav_class = 'gvnews_page' . $args['pagination_mode'];
				$nav_align = 'gvnews_align' . $args['pagination_align'];
				$nav_text  = $args['pagination_navtext'] ? '' : 'no_navtext';
				$nav_info  = $args['pagination_pageinfo'] ? '' : 'no_pageinfo';
				/* translators: %1s and %2$s represents page number */
				$paging_text = sprintf( esc_html__( 'Page %1$s of %2$s', 'gutenverse-news' ), $current, $total );

				$r = join( "\n", $page_links );
				$r = "<div class=\"gvnews_navigation gvnews_pagination {$column_class} {$nav_class} {$nav_align} {$nav_text} {$nav_info}\">
                    <span class=\"page_info\">{$paging_text}</span>
                    {$r}
                </div>";
				break;
		}

		return $r;
	}
}

/**
 * Edit Post
 */
if ( ! function_exists( 'gvnews_edit_post' ) ) {
	/**
	 * Method gvnews_edit_post
	 *
	 * @param integer $id id.
	 * @param string  $position position.
	 * @param string  $type type.
	 *
	 * @return string|boolean
	 */
	function gvnews_edit_post( $id, $position = 'left', $type = 'post' ) {
		if ( current_user_can( 'edit_posts' ) ) {
			$text = '';
			$url  = '#';
			switch ( $type ) {
				case 'post':
					$text = esc_html__( 'edit post', 'gutenverse-news' );
					$url  = get_edit_post_link( $id );
					break;
				case 'playlist':
					$text = esc_html__( 'edit playlist', 'gutenverse-news' );
					$url  = get_permalink( $id );
					break;
				case 'podcast':
					$text = esc_html__( 'edit podcast', 'gutenverse-news' );
					$url  = get_edit_term_link( $id );
					break;
				case 'category':
					$text = esc_html__( 'edit category', 'gutenverse-news' );
					$url  = get_edit_term_link( $id );
					break;
			}

			$wrapper_classes = gvnews_build_html_classes(
				array(
					'gvnews-edit-post',
					esc_attr( $position ),
				)
			);

			return "<a class=\"{$wrapper_classes}\" href=\"" . esc_url( $url ) . "\" target=\"_blank\">
                        <i class=\"fa fa-pencil\"></i>
                        <span>{$text}</span>
                    </a>";
		}

		return false;
	}
}

if ( ! function_exists( 'gvnews_print_translation' ) ) {
	/**
	 * Method gvnews_print_translation
	 *
	 * @param string $string string.
	 * @param string $domain domain.
	 * @param string $name name.
	 *
	 * @return void
	 */
	function gvnews_print_translation( $string, $domain, $name ) {
		do_action( 'gvnews_print_translation', $string, $domain, $name );
	}
}

if ( ! function_exists( 'gvnews_get_primary_category' ) ) {
	/**
	 * Get primary category ceremony
	 *
	 * @param string $post_id post id.
	 *
	 * @return mixed|void
	 */
	function gvnews_get_primary_category( $post_id ) {
		$category_id = null;

		if ( 'post' === get_post_type( $post_id ) ) {
			$categories = array_slice( get_the_category( $post_id ), 0, 1 );
			if ( empty( $categories ) ) {
				return null;
			}

			$category    = array_shift( $categories );
			$category_id = $category->term_id;
		}

		return apply_filters( 'gvnews_primary_category', $category_id, $post_id );
	}
}

/**
 * Generate header unique style
 */
if ( ! function_exists( 'gvnews_header_styling' ) ) {
	/**
	 * Method gvnews_header_styling
	 *
	 * @param array  $attr attribute.
	 * @param string $unique_class unique class.
	 *
	 * @return string
	 */
	function gvnews_header_styling( $attr, $unique_class ) {
		$type  = isset( $attr['header_type'] ) ? $attr['header_type'] : 'heading_1';
		$style = '';

		switch ( $type ) {
			case 'heading_1':
				if ( isset( $attr['header_background'] ) && ! empty( $attr['header_background'] ) ) {
					$style .= ".{$unique_class}.gvnews_block_heading_1 .gvnews_block_title span { background: {$attr['header_background']}; }";
				}

				if ( isset( $attr['header_text_color'] ) && ! empty( $attr['header_text_color'] ) ) {
					$style .= ".{$unique_class}.gvnews_block_heading_1 .gvnews_block_title span, .{$unique_class}.gvnews_block_heading_1 .gvnews_block_title i { color: {$attr['header_text_color']}; }";
				}

				if ( isset( $attr['header_line_color'] ) && ! empty( $attr['header_line_color'] ) ) {
					$style .= ".{$unique_class}.gvnews_block_heading_1 { border-color: {$attr['header_line_color']}; }";
				}

				break;
			case 'heading_2':
				if ( isset( $attr['header_background'] ) && ! empty( $attr['header_background'] ) ) {
					$style .= ".{$unique_class}.gvnews_block_heading_2 .gvnews_block_title span { background: {$attr['header_background']}; }";
				}

				if ( isset( $attr['header_text_color'] ) && ! empty( $attr['header_text_color'] ) ) {
					$style .= ".{$unique_class}.gvnews_block_heading_2 .gvnews_block_title span, .{$unique_class}.gvnews_block_heading_2 .gvnews_block_title i { color: {$attr['header_text_color']}; }";
				}

				if ( isset( $attr['header_secondary_background'] ) && ! empty( $attr['header_secondary_background'] ) ) {
					$style .= ".{$unique_class}.gvnews_block_heading_2 { background-color: {$attr['header_secondary_background']}; }";
				}

				break;
			case 'heading_3':
				if ( isset( $attr['header_background'] ) && ! empty( $attr['header_background'] ) ) {
					$style .= ".{$unique_class}.gvnews_block_heading_3 { background: {$attr['header_background']}; }";
				}

				if ( isset( $attr['header_text_color'] ) && ! empty( $attr['header_text_color'] ) ) {
					$style .= ".{$unique_class}.gvnews_block_heading_3 .gvnews_block_title span, .{$unique_class}.gvnews_block_heading_3 .gvnews_block_title i { color: {$attr['header_text_color']}; }";
				}

				break;
			case 'heading_4':
				if ( isset( $attr['header_background'] ) && ! empty( $attr['header_background'] ) ) {
					$style .= ".{$unique_class}.gvnews_block_heading_4 .gvnews_block_title span { background: {$attr['header_background']}; }";
				}

				if ( isset( $attr['header_text_color'] ) && ! empty( $attr['header_text_color'] ) ) {
					$style .= ".{$unique_class}.gvnews_block_heading_4 .gvnews_block_title span, .{$unique_class}.gvnews_block_heading_4 .gvnews_block_title i { color: {$attr['header_text_color']}; }";
				}

				break;
			case 'heading_5':
				if ( isset( $attr['header_background'] ) && ! empty( $attr['header_background'] ) ) {
					$style .= ".{$unique_class}.gvnews_block_heading_5 .gvnews_block_title span, .{$unique_class}.gvnews_block_heading_5 .gvnews_subcat { background: {$attr['header_background']}; }";
				}

				if ( isset( $attr['header_text_color'] ) && ! empty( $attr['header_text_color'] ) ) {
					$style .= ".{$unique_class}.gvnews_block_heading_5 .gvnews_block_title span, .{$unique_class}.gvnews_block_heading_5 .gvnews_block_title i { color: {$attr['header_text_color']}; }";
				}

				if ( isset( $attr['header_line_color'] ) && ! empty( $attr['header_line_color'] ) ) {
					$style .= ".{$unique_class}.gvnews_block_heading_5:before { border-color: {$attr['header_line_color']}; }";
				}

				break;
			case 'heading_6':
				if ( isset( $attr['header_text_color'] ) && ! empty( $attr['header_text_color'] ) ) {
					$style .= ".{$unique_class}.gvnews_block_heading_6 .gvnews_block_title span, .{$unique_class}.gvnews_block_heading_6 .gvnews_block_title i { color: {$attr['header_text_color']}; }";
				}

				if ( isset( $attr['header_line_color'] ) && ! empty( $attr['header_line_color'] ) ) {
					$style .= ".{$unique_class}.gvnews_block_heading_6 { border-color: {$attr['header_line_color']}; }";
				}

				if ( isset( $attr['header_accent_color'] ) && ! empty( $attr['header_accent_color'] ) ) {
					$style .= ".{$unique_class}.gvnews_block_heading_6:after { background-color: {$attr['header_accent_color']}; }";
				}

				break;
			case 'heading_7':
				if ( isset( $attr['header_text_color'] ) && ! empty( $attr['header_text_color'] ) ) {
					$style .= ".{$unique_class}.gvnews_block_heading_7 .gvnews_block_title span, .{$unique_class}.gvnews_block_heading_7 .gvnews_block_title i { color: {$attr['header_text_color']}; }";
				}

				if ( isset( $attr['header_accent_color'] ) && ! empty( $attr['header_accent_color'] ) ) {
					$style .= ".{$unique_class}.gvnews_block_heading_7 .gvnews_block_title span { border-color: {$attr['header_accent_color']}; }";
				}

				break;
			case 'heading_8':
				if ( isset( $attr['header_text_color'] ) && ! empty( $attr['header_text_color'] ) ) {
					$style .= ".{$unique_class}.gvnews_block_heading_8 .gvnews_block_title span, .{$unique_class}.gvnews_block_heading_8 .gvnews_block_title i { color: {$attr['header_text_color']}; }";
				}
				break;
			case 'heading_9':
				if ( isset( $attr['header_text_color'] ) && ! empty( $attr['header_text_color'] ) ) {
					$style .= ".{$unique_class}.gvnews_block_heading_9 .gvnews_block_title span, .{$unique_class}.gvnews_block_heading_9 .gvnews_block_title i { color: {$attr['header_text_color']}; }";
				}

				if ( isset( $attr['header_line_color'] ) && ! empty( $attr['header_line_color'] ) ) {
					$style .= ".{$unique_class}.gvnews_block_heading_9 { border-color: {$attr['header_line_color']}; }";
				}
				break;
		}

		return $style;
	}
}

if ( ! function_exists( 'gvnews_normalize_duration' ) ) {
	/**
	 * Gvnews normalize duration.
	 *
	 * @param string $duration durattion.
	 *
	 * @return false|string
	 */
	function gvnews_normalize_duration( $duration ) {
		$string = '00:00:00';

		for ( $i = ( strlen( $string ) - 4 ); $i > 0; $i-- ) {
			$comparator = substr( $string, 0, $i );
			if ( strpos( $duration, $comparator ) === 0 ) {
				break;
			}
		}

		return substr( $duration, $i );
	}
}

/**
 * Check if BuddyPress Installed and active.
 */
if ( ! function_exists( 'gvnews_is_bp_active' ) ) {
	/**
	 * Gvnews is bp active.
	 *
	 * @return bool boolean.
	 */
	function gvnews_is_bp_active() {
		if ( function_exists( 'bp_is_active' ) ) {
			return true;
		}

		return false;
	}
}

/**
 * Polylang Integration
 */
if ( ! function_exists( 'gvnews_translate_polylang' ) ) {
	/**
	 * Method gvnews_translate_polylang
	 *
	 * @param string $text text.
	 *
	 * @return string
	 */
	function gvnews_translate_polylang( $text ) {
		return apply_filters( 'gvnews_translate_polylang', $text );
	}
}

/**
 * START RSS Element Section
 */

if ( ! function_exists( 'gvnews_get_rss_post_id' ) ) {
	/**
	 * Method gvnews_get_rss_post_id
	 *
	 * @param string $post_id post id.
	 *
	 * @return string
	 */
	function gvnews_get_rss_post_id( $post_id = 'rss_post' ) {
		$rss_post = 'rss_post';
		return 'rss_post' === $post_id ? $rss_post : $post_id === $rss_post;
	}
}

/**
 * Format Number
 *
 * @param $total
 *
 * @return string
 */
if ( ! function_exists( 'gvnews_number_format' ) ) {
	/**
	 * Method gvnews_number_format
	 *
	 * @param integer $total total.
	 *
	 * @return integer
	 */
	function gvnews_number_format( $total ) {
		if ( $total > 1000000 ) {
			$total = round( $total / 1000000, 1 ) . 'M';
		} elseif ( $total > 1000 ) {
			$total = round( $total / 1000, 1 ) . 'k';
		}

		return $total;
	}
}

if ( ! function_exists( 'gvnews_sanitize_by_pass' ) ) {
	/**
	 * Method gvnews_sanitize_by_pass
	 *
	 * @param mixed $value value.
	 *
	 * @return mixed
	 */
	function gvnews_sanitize_by_pass( $value ) {
		return $value;
	}
}

/**
 * Comment Number
 */
if ( ! function_exists( 'gvnews_get_comments_number' ) ) {
	/**
	 * Method gvnews_get_comments_number
	 *
	 * @param integer $post_id post id.
	 *
	 * @return string
	 */
	function gvnews_get_comments_number( $post_id = 0 ) {
		$comment         = GUTENVERSE\NEWS\Util\Comment_Number::get_instance();
		$comments_number = $comment->comments_number( $post_id );

		return apply_filters( 'gvnews_get_comments_number', $comments_number, $post_id );
	}
}


if ( ! function_exists( 'gvnews_get_respond_link' ) ) {
	/**
	 * Method gvnews_get_respond_link
	 *
	 * @param integer|null $post_id post id.
	 *
	 * @return string
	 */
	function gvnews_get_respond_link( $post_id = null ) {
		return get_the_permalink( $post_id ) . '#respond';
	}
}

/**
 * Sanitize output with allowed html
 *
 * @param $value
 *
 * @return string
 */
if ( ! function_exists( 'gvnews_sanitize_output' ) ) {
	/**
	 * Method gvnews_sanitize_output
	 *
	 * @param mixed $value value.
	 *
	 * @return mixed
	 */
	function gvnews_sanitize_output( $value ) {
		return $value;
	}
}

if ( ! function_exists( 'gvnews_ago_time' ) ) {
	/**
	 * Method gvnews_ago_time
	 *
	 * @param string $time time.
	 *
	 * @return string
	 */
	function gvnews_ago_time( $time ) {
		return esc_html(
			sprintf(
				/* translators: %s represents a time duration, e.g., "2 hours ago" */
				esc_html__( '%s ago', 'gutenverse-news' ),
				$time
			)
		);
	}
}

if ( ! function_exists( 'gvnews_the_author_link' ) ) {
	/**
	 * Method gvnews_the_author_link
	 *
	 * @param string|null $author author.
	 * @param boolean     $print print.
	 *
	 * @return string
	 */
	function gvnews_the_author_link( $author = null, $print = true ) {
		if ( $print ) {
			printf(
				'<a href="%1$s">%2$s</a>',
				esc_url( get_author_posts_url( get_the_author_meta( 'ID', $author ) ) ),
				esc_html( get_the_author_meta( 'display_name', $author ) )
			);
		} else {
			return sprintf(
				'<a href="%1$s">%2$s</a>',
				esc_url( get_author_posts_url( get_the_author_meta( 'ID', $author ) ) ),
				esc_html( get_the_author_meta( 'display_name', $author ) )
			);
		}
	}
}

/**
 * Get single post current page
 *
 * @return mixed
 */
if ( ! function_exists( 'gvnews_get_post_current_page' ) ) {
	/**
	 * Method gvnews_get_post_current_page
	 *
	 * @return integer
	 */
	function gvnews_get_post_current_page() {
		$page  = get_query_var( 'page' ) ? get_query_var( 'page' ) : 1;
		$paged = get_query_var( 'paged' ) ? get_query_var( 'paged' ) : 1;

		return max( $page, $paged );
	}
}

add_filter( 'gvnews_empty_image', 'gvnews_default_empty_image' );

if ( ! function_exists( 'gvnews_default_empty_image' ) ) {
	/**
	 * Method gvnews_default_empty_image
	 *
	 * @param string $image image.
	 *
	 * @return string
	 */
	function gvnews_default_empty_image( $image ) {
		return GUTENVERSE_NEWS_URL . '/assets/img/gvnews-empty.png';
	}
}

if ( ! function_exists( 'gvnews_home_url_multilang' ) ) {

	/**
	 * Method gvnews_home_url_multilang
	 *
	 * @param string      $path path.
	 * @param string|null $scheme scheme.
	 *
	 * @return string
	 */
	function gvnews_home_url_multilang( $path = '', $scheme = null ) {
		if ( function_exists( 'pll_current_language' ) ) {
			if ( isset( $path[0] ) && '/' !== $path[0] ) {
				$path = '/' . $path;
			}

			$polylang_setting = get_option( 'polylang', array() );
			$default_lang     = $polylang_setting['default_lang'];
			$current_lang     = pll_current_language();

			if ( isset( $polylang_setting['hide_default'] ) && $polylang_setting['hide_default'] ) {
				if ( $default_lang === $current_lang ) {
					return home_url( $path, $scheme );
				}
			}

			return home_url( $current_lang . $path, $scheme );
		}
		return home_url( $path, $scheme );
	}
}

if ( ! function_exists( 'gvnews_get_module_instance' ) ) {
	/**
	 * Method gvnews_get_module_instance
	 *
	 * @param string $name name.
	 *
	 * @return class|null
	 */
	function gvnews_get_module_instance( $name ) {
		do_action( 'gvnews_build_shortcode_' . strtolower( $name ) );

		if ( method_exists( $name, 'get_instance' ) ) {
			return call_user_func( array( $name, 'get_instance' ) );
		}
		return null;
	}
}

/* Start Social Share Global Fucntion */
/**
 * Share Top Bar
 */
add_action( 'gvnews_share_top_bar', 'gvnews_share_top_bar' );

if ( ! function_exists( 'gvnews_share_top_bar' ) ) {
	/**
	 * Method gvnews_share_top_bar
	 *
	 * @param integer $post_id post id.
	 *
	 * @return void
	 */
	function gvnews_share_top_bar( $post_id ) {
		$share_bar = GUTENVERSE\NEWS\Util\SocialShare\Share_Bar::get_instance();
		$share_bar->set_post_id( $post_id );
		$share_bar->top_share();
	}
}
/* End Social Share Global Fucntion */

/**
 * Encode URL by Post ID
 *
 * @param $post_id
 *
 * @return string
 */
if ( ! function_exists( 'gvnews_encode_url' ) ) {
	/**
	 * Method gvnews_encode_url
	 *
	 * @param integer $post_id post id.
	 *
	 * @return string
	 */
	function gvnews_encode_url( $post_id ) {
		$url = get_permalink( $post_id );

		return urlencode( $url );
	}
}

/**
 * Remove Filters
 *
 * @param $post_id
 *
 * @return string
 */
if ( ! function_exists( 'gvnews_remove_filters' ) ) {
	/**
	 * Method gvnews_remove_filters
	 *
	 * @param string  $tag tag.
	 * @param func    $function_to_remove function to remove.
	 * @param integer $priority priority.
	 *
	 * @return void
	 */
	function gvnews_remove_filters( $tag, $function_to_remove, $priority = 10 ) {
		remove_filter( $tag, $function_to_remove, $priority );
	}
}

/**
 * Get Post Date
 *
 * @param $post_id
 *
 * @return string
 */
if ( ! function_exists( 'gvnews_get_post_date' ) ) {
	/**
	 * Method gvnews_get_post_date
	 *
	 * @param string      $format format.
	 * @param object|null $post post.
	 *
	 * @return string
	 */
	function gvnews_get_post_date( $format = '', $post = null ) {
		$publish_date                = isset( $post->publish_date ) ? gmdate( $format ? $format : 'Y-m-d', $post->publish_date ) : get_the_date( $format, $post );
		$modified_date               = isset( $post->update_date ) ? gmdate( $format ? $format : 'Y-m-d', $post->update_date ) : get_the_modified_date( $format, $post );
		$publish_date_number_format  = isset( $post->publish_date ) ? gmdate( 'Y-m-d', $post->publish_date ) : get_the_date( 'Y-m-d', $post );
		$modified_date_number_format = isset( $post->update_date ) ? gmdate( 'Y-m-d', $post->update_date ) : get_the_modified_date( 'Y-m-d', $post );

		return $publish_date;
	}
}

/* Start Post Meta Global Fucntion */
if ( ! function_exists( 'gvnews_get_meta' ) ) {
	/**
	 * Method gvnews_get_meta
	 *
	 * @param integer $id id.
	 * @param string  $meta_name meta name.
	 * @param integer $default default.
	 *
	 * @return string
	 */
	function gvnews_get_meta( $id, $meta_name, $default = false ) {
		if ( strpos( $meta_name, '.' ) !== false ) {
			$meta_key = explode( '.', $meta_name );
			$meta     = get_post_meta( $id, $meta_key[0], true );
			return isset( $meta_key[1] ) && isset( $meta[ $meta_key[1] ] ) ? ( new \GUTENVERSE\NEWS\Metabox\Metabox() )->parse_meta_value( $meta_key[0], $meta_key[1], $meta[ $meta_key[1] ] ) : $default;

		} else {
			return get_post_meta( $id, $meta_name, true );
		}
	}
}
/* End Post Meta Global Fucntion */

/**
 * Call Native Breadcrumb
 *
 * @return mixed|void
 */
if ( ! function_exists( 'gvnews_native_breadcrumb' ) ) {
	/**
	 * Method gvnews_native_breadcrumb
	 *
	 * @return string
	 */
	function gvnews_native_breadcrumb() {
		return apply_filters( 'gvnews_breadcrumb', '' );
	}
}

if ( ! function_exists( 'gvnews_build_data_attr' ) ) {
	/**
	 * Method gvnews_build_data_attr
	 *
	 * @param array $data_list data list.
	 *
	 * @return string
	 */
	function gvnews_build_data_attr( $data_list ) {
		$data = '';
		foreach ( $data_list as $key => $value ) {
			$data = $data . ' data-' . $key . '="' . $value . '"';
		}

		return $data;
	}
}

if ( ! function_exists( 'gvnews_build_html_classes' ) ) {
	/**
	 * Method gvnews_build_html_classes
	 *
	 * @param array $classes_list classes list.
	 *
	 * @return string
	 */
	function gvnews_build_html_classes( $classes_list ) {
		$classes = '';
		foreach ( $classes_list as $class ) {
			$classes = $classes . ' ' . $class;
		}
		return $classes;
	}
}

if ( ! function_exists( 'gvnews_allowed_html' ) ) {

	add_filter( 'wp_kses_allowed_html', 'gvnews_allowed_html', 99 );


	/**
	 * Method gvnews_allowed_html
	 *
	 * @param array $allowedtags allowed tags.
	 *
	 * @return array
	 */
	function gvnews_allowed_html( $allowedtags = array() ) {
		$allowedtags['img'] = array_merge(
			isset( $allowedtags['img'] ) ? $allowedtags['img'] : array(),
			array(
				'loading'  => true,
				'id'       => true,
				'decoding' => true,
				'sizes'    => true,
				'width'    => true,
				'height'   => true,
				'src'      => true,
				'alt'      => true,
				'style'    => true,
				'class'    => true,
			)
		);

		$allowedtags['span'] = array_merge(
			isset( $allowedtags['span'] ) ? $allowedtags['span'] : array(),
			array(
				'rel' => true,
			)
		);

		$allowedtags['a'] = array_merge(
			isset( $allowedtags['a'] ) ? $allowedtags['a'] : array(),
			array(
				'aria-label'    => true,
				'rel'           => true,
				'data-*'        => true,
				'aria-expanded' => true,
				'aria-controls' => true,
			)
		);

		$allowedtags['i'] = array_merge(
			isset( $allowedtags['i'] ) ? $allowedtags['i'] : array(),
			array(
				'aria-hidden' => true,
				'class'       => true,
			)
		);

		$allowedtags['link'] = array_merge(
			isset( $allowedtags['link'] ) ? $allowedtags['link'] : array(),
			array(
				'rel'  => true,
				'href' => true,
			)
		);

		$allowedtags['legend'] = array_merge(
			isset( $allowedtags['legend'] ) ? $allowedtags['legend'] : array(),
			array(
				'id'    => true,
				'class' => true,
			)
		);

		$allowedtags['form'] = array_merge(
			isset( $allowedtags['form'] ) ? $allowedtags['form'] : array(),
			array(
				'method'       => true,
				'id'           => true,
				'class'        => true,
				'role'         => true,
				'action'       => true,
				'data-*'       => true,
				'autocomplete' => true,
			)
		);

		$allowedtags['fieldset'] = array_merge(
			isset( $allowedtags['fieldset'] ) ? $allowedtags['fieldset'] : array(),
			array(
				'id'    => true,
				'class' => true,
			)
		);

		$allowedtags['input'] = array_merge(
			isset( $allowedtags['input'] ) ? $allowedtags['input'] : array(),
			array(
				'type'         => true,
				'name'         => true,
				'id'           => true,
				'class'        => true,
				'placeholder'  => true,
				'required'     => true,
				'value'        => true,
				'step'         => true,
				'min'          => true,
				'max'          => true,
				'title'        => true,
				'size'         => true,
				'inputmode'    => true,
				'autocomplete' => true,
			)
		);

		$allowedtags['label'] = array_merge(
			isset( $allowedtags['label'] ) ? $allowedtags['label'] : array(),
			array(
				'id'    => true,
				'class' => true,
				'for'   => true,
			)
		);

		$allowedtags['canvas'] = array_merge(
			isset( $allowedtags['canvas'] ) ? $allowedtags['canvas'] : array(),
			array(
				'height' => true,
				'width'  => true,
				'id'     => true,
				'class'  => true,
			)
		);

		$allowedtags['div'] = array_merge(
			isset( $allowedtags['div'] ) ? $allowedtags['div'] : array(),
			array(
				'style'    => true,
				'data-*'   => true,
				'tabindex' => true,
				'class'    => true,
			)
		);

		$allowedtags['linearGradient'] = array_merge(
			isset( $allowedtags['linearGradient'] ) ? $allowedtags['linearGradient'] : array(),
			array(
				'gradientUnits'     => true,
				'gradientTransform' => true,
				'href'              => true,
				'spreadMethod'      => true,
				'x1'                => true,
				'x2'                => true,
				'y1'                => true,
				'y2'                => true,
				'id'                => true,
				'class'             => true,
				'style'             => true,
			)
		);

		$allowedtags['stop'] = array_merge(
			isset( $allowedtags['stop'] ) ? $allowedtags['stop'] : array(),
			array(
				'offset' => true,
			)
		);

		$allowedtags['svg'] = array_merge(
			isset( $allowedtags['svg'] ) ? $allowedtags['svg'] : array(),
			array(
				'id'                  => true,
				'xmlns'               => true,
				'viewbox'             => true,
				'preserveaspectratio' => true,
			)
		);

		$allowedtags['path'] = array_merge(
			isset( $allowedtags['path'] ) ? $allowedtags['path'] : array(),
			array(
				'd'                   => true,
				'pathLength'          => true,
				'id'                  => true,
				'tabindex'            => true,
				'class'               => true,
				'style'               => true,
				'requiredExtensions'  => true,
				'systemLanguage'      => true,
				'clip-path'           => true,
				'clip-rule'           => true,
				'color'               => true,
				'color-interpolation' => true,
				'color-rendering'     => true,
				'cursor'              => true,
				'display'             => true,
				'fill'                => true,
				'fill-opacity'        => true,
				'fill-rule'           => true,
				'filter'              => true,
				'mask'                => true,
				'opacity'             => true,
				'pointer-events'      => true,
				' shape-rendering'    => true,
				'stroke'              => true,
				'stroke-dasharray'    => true,
				'stroke-dashoffset'   => true,
				'stroke-linecap'      => true,
				'stroke-linejoin'     => true,
				'stroke-miterlimit'   => true,
				'stroke-opacity'      => true,
				'stroke-width'        => true,
				'transform'           => true,
				'vector-effect'       => true,
				'visibility'          => true,
			)
		);

		$allowedtags['select'] = array_merge(
			isset( $allowedtags['select'] ) ? $allowedtags['select'] : array(),
			array(
				'id'     => true,
				'class'  => true,
				'name'   => true,
				'value'  => true,
				'data-*' => true,
			)
		);

		$allowedtags['option'] = array_merge(
			isset( $allowedtags['option'] ) ? $allowedtags['option'] : array(),
			array(
				'id'    => true,
				'class' => true,
				'value' => true,
			)
		);

		$allowedtags['template'] = array_merge(
			isset( $allowedtags['template'] ) ? $allowedtags['template'] : array(),
			array(
				'id'    => true,
				'class' => true,
			)
		);

		$allowedtags['p'] = array_merge(
			isset( $allowedtags['p'] ) ? $allowedtags['p'] : array(),
			array(
				'id'    => true,
				'class' => true,
			)
		);

		$allowedtags['table'] = array_merge(
			isset( $allowedtags['table'] ) ? $allowedtags['table'] : array(),
			array(
				'id'          => true,
				'class'       => true,
				'cellspacing' => true,
				'data-*'      => true,
			)
		);

		$allowedtags['thead'] = array_merge(
			isset( $allowedtags['thead'] ) ? $allowedtags['thead'] : array(),
			array(
				'id'     => true,
				'class'  => true,
				'data-*' => true,
			)
		);

		$allowedtags['th'] = array_merge(
			isset( $allowedtags['th'] ) ? $allowedtags['th'] : array(),
			array(
				'id'      => true,
				'class'   => true,
				'data-*'  => true,
				'colspan' => true,
			)
		);

		$allowedtags['tbody'] = array_merge(
			isset( $allowedtags['tbody'] ) ? $allowedtags['tbody'] : array(),
			array(
				'id'     => true,
				'class'  => true,
				'data-*' => true,
			)
		);

		$allowedtags['tr'] = array_merge(
			isset( $allowedtags['tr'] ) ? $allowedtags['tr'] : array(),
			array(
				'id'     => true,
				'class'  => true,
				'data-*' => true,
			)
		);

		$allowedtags['td'] = array_merge(
			isset( $allowedtags['td'] ) ? $allowedtags['td'] : array(),
			array(
				'id'      => true,
				'class'   => true,
				'data-*'  => true,
				'colspan' => true,
			)
		);

		$allowedtags['button'] = array_merge(
			isset( $allowedtags['button'] ) ? $allowedtags['button'] : array(),
			array(
				'id'    => true,
				'class' => true,
				'type'  => true,
				'name'  => true,
				'value' => true,
			)
		);

		$allowedtags['header'] = array_merge(
			isset( $allowedtags['header'] ) ? $allowedtags['header'] : array(),
			array(
				'id'    => true,
				'class' => true,
			)
		);

		$allowedtags['address'] = array_merge(
			isset( $allowedtags['address'] ) ? $allowedtags['address'] : array(),
			array(
				'id'    => true,
				'class' => true,
			)
		);

		$allowedtags['nav'] = array_merge(
			isset( $allowedtags['nav'] ) ? $allowedtags['nav'] : array(),
			array(
				'id'    => true,
				'class' => true,
			)
		);

		$allowedtags['ul'] = array_merge(
			isset( $allowedtags['ul'] ) ? $allowedtags['ul'] : array(),
			array(
				'id'    => true,
				'class' => true,
			)
		);

		$allowedtags['li'] = array_merge(
			isset( $allowedtags['li'] ) ? $allowedtags['li'] : array(),
			array(
				'id'    => true,
				'class' => true,
			)
		);

		$allowedtags['h1'] = array_merge(
			isset( $allowedtags['h1'] ) ? $allowedtags['h1'] : array(),
			array(
				'id'    => true,
				'class' => true,
			)
		);

		$allowedtags['h2'] = array_merge(
			isset( $allowedtags['h2'] ) ? $allowedtags['h2'] : array(),
			array(
				'id'    => true,
				'class' => true,
			)
		);

		$allowedtags['h3'] = array_merge(
			isset( $allowedtags['h3'] ) ? $allowedtags['h3'] : array(),
			array(
				'id'    => true,
				'class' => true,
			)
		);

		$allowedtags['h4'] = array_merge(
			isset( $allowedtags['h4'] ) ? $allowedtags['h4'] : array(),
			array(
				'id'    => true,
				'class' => true,
			)
		);

		$allowedtags['h5'] = array_merge(
			isset( $allowedtags['h5'] ) ? $allowedtags['h5'] : array(),
			array(
				'id'    => true,
				'class' => true,
			)
		);

		$allowedtags['h6'] = array_merge(
			isset( $allowedtags['h6'] ) ? $allowedtags['h6'] : array(),
			array(
				'id'    => true,
				'class' => true,
			)
		);

		$allowedtags['del'] = array_merge(
			isset( $allowedtags['del'] ) ? $allowedtags['del'] : array(),
			array(
				'aria-hidden' => true,
			)
		);

		$allowedtags['script'] = array_merge(
			isset( $allowedtags['script'] ) ? $allowedtags['script'] : array(),
			array(
				'id'    => true,
				'class' => true,
				'type'  => true,
			)
		);

		$allowedtags['ins']   = array_merge( isset( $allowedtags['ins'] ) ? $allowedtags['ins'] : array(), array() );
		$allowedtags['style'] = array_merge( isset( $allowedtags['style'] ) ? $allowedtags['style'] : array(), array() );
		$allowedtags['bdi']   = array_merge( isset( $allowedtags['bdi'] ) ? $allowedtags['bdi'] : array(), array() );

		return $allowedtags;
	}
}
