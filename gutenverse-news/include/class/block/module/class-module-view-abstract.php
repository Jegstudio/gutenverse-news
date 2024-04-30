<?php
/**
 * Module view abstract
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block\Module;

use GUTENVERSE\NEWS\Block\Block_View_Abstract;
use GUTENVERSE\NEWS\Util\Cache;

/**
 * Module_View_Abstract
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
abstract class Module_View_Abstract extends Block_View_Abstract {

	/**
	 * Method render_module
	 *
	 * @param array  $attr         attribute attribute.
	 * @param string $column_class column class. column class.
	 *
	 * @return string
	 */
	public function render_module( $attr, $column_class ) {
		$heading = $this->render_header( $attr );
		$name    = str_replace( 'module_', '', $this->class_name );
		$content = $this->render_output( $attr, $column_class );
		$script  = $this->render_script( $attr, $column_class );

		$wrapper_classes = gvnews_build_html_classes(
			array(
				'gvnews_postblock_' . esc_attr( $name ),
				'gvnews_postblock',
				'gvnews_module_hook',
				'gvnews_module_hook',
				'gvnews_pagination_' . esc_attr( $attr['pagination_mode'] ),
				$column_class,
				$this->unique_id,
				$this->get_vc_class_name(),
			)
		);

		$data_attr = gvnews_build_data_attr(
			array(
				'unique' => $this->unique_id,
			)
		);

		return '<div ' . esc_attr( $this->element_id( $attr ) ) . " class=\"{$wrapper_classes}\" {$data_attr}}\">
					{$heading}
					{$content}
					{$script}
				</div>";
	}

	/**
	 * Method render_module_out_call
	 *
	 * @param array  $result result.
	 * @param string $column_class column class. column class.
	 *
	 * @return string
	 */
	public function render_module_out_call( $result, $column_class ) {
		$name = str_replace( 'module_', '', $this->class_name );

		$content = ! empty( $result ) ? $this->render_column( $result, $column_class ) : $this->empty_content();

		$this->generate_unique_id();

		$wrapper_classes = gvnews_build_html_classes(
			array(
				'gvnews_postblock_' . esc_attr( $name ),
				'gvnews_postblock',
				esc_attr( $column_class ),
			)
		);

		return "<div class=\"{$wrapper_classes}\">
					<div class=\"gvnews_block_container\">
						{$content}
					</div>
				</div>";
	}

	/**
	 * Method get_content_before
	 *
	 * @param array $attr attribute attribute.
	 *
	 * @return string
	 */
	public function get_content_before( $attr ) {
		return apply_filters( 'gvnews_module_block_container_extend_before', '', $attr );
	}

	/**
	 * Method get_content_after
	 *
	 * @param array $attr attribute attribute.
	 *
	 * @return string
	 */
	public function get_content_after( $attr ) {
		return apply_filters( 'gvnews_module_block_container_extend_after', '', $attr );
	}

	/**
	 * Method get_navigation_before
	 *
	 * @param array $attr attribute attribute.
	 *
	 * @return string
	 */
	public function get_navigation_before( $attr ) {
		return apply_filters( 'gvnews_module_block_navigation_extend_before', '', $attr );
	}

	/**
	 * Method get_navigation_after
	 *
	 * @param array $attr attribute attribute.
	 *
	 * @return string
	 */
	public function get_navigation_after( $attr ) {
		return apply_filters( 'gvnews_module_block_navigation_extend_after', '', $attr );
	}

	/**
	 * Method get_current_page
	 *
	 * @return integer
	 */
	public function get_current_page() {
		$page  = get_query_var( 'page' ) ? get_query_var( 'page' ) : 1;
		$paged = get_query_var( 'paged' ) ? get_query_var( 'paged' ) : 1;

		return max( $page, $paged );
	}

	/**
	 * Render Navigation
	 *
	 * @param array      $attr attribute.
	 * @param bool|false $next       next.
	 * @param bool|false $prev       prev.
	 * @param int        $total_page total page.
	 *
	 * @return string
	 */
	public function render_navigation( $attr, $next = false, $prev = false, $total_page = 1 ) {
		$output           = '';
		$additional_class = $next || $prev ? '' : 'inactive';

		if ( 'nextprev' === $attr['pagination_mode'] ) {
			$next = $next ? '' : 'disabled';
			$prev = $prev ? '' : 'disabled';

			$prev_text = '<i class="fas fa-chevron-left"></i>';
			$next_text = '<i class="fas fa-chevron-right"></i>';

			if ( $attr['pagination_nextprev_showtext'] ) {
				$additional_class .= ' showtext';
				$prev_text         = '<i class="fas fa-chevron-left"></i> ' . esc_html__( 'Prev', 'gutenverse-news' );
				$next_text         = esc_html__( 'Next', 'gutenverse-news' ) . '  <i class="fas fa-chevron-right"></i>';
			}

			$output =
			'<div class="gvnews_block_nav ' . esc_attr( $additional_class ) . '">
                    <a href="#" class="prev ' . esc_attr( $prev ) . '" title="' . esc_html__( 'Previous', 'gutenverse-news' ) . "\">{$prev_text}</a>
                    <a href=\"#\" class=\"next " . esc_attr( $next ) . '" title="' . esc_html__( 'Next', 'gutenverse-news' ) . "\">{$next_text}</a>
                </div>";
		}

		if ( 'loadmore' === $attr['pagination_mode'] || 'scrollload' === $attr['pagination_mode'] ) {
			$next   = $next ? '' : 'disabled';
			$output =
			'<div class="gvnews_block_loadmore ' . esc_attr( $additional_class ) . "\">
                    <a href=\"#\" class='" . esc_attr( $next ) . "' data-load='" . esc_html__( 'Load More', 'gutenverse-news' ) . "' data-loading='" . esc_html__( 'Loading...', 'gutenverse-news' ) . "'> " . esc_html__( 'Load More', 'gutenverse-news' ) . '</a>
                </div>';
		}

		// this is only for default link method.
		if ( 'nav_1' === $attr['pagination_mode'] || 'nav_2' === $attr['pagination_mode'] || 'nav_3' === $attr['pagination_mode'] ) {
			if ( $total_page > 1 ) {
				$page   = $this->get_current_page();
				$output = $this->render_normal_navigation( $attr, $total_page, $page );
			}
		}

		return $output;
	}

	/**
	 * Render Normal Navigation
	 *
	 * @param array $args    arguments.
	 * @param int   $total   total.
	 * @param int   $current current.
	 *
	 * @return string
	 */
	public function render_normal_navigation( $args, $total, $current = 1 ) {
		global $wp_rewrite;

		// Setting up default values based on the current URL.
		$pagenum_link = html_entity_decode( get_pagenum_link() );
		$url_parts    = explode( '?', $pagenum_link );

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
			'prev_text'          => esc_html__( 'Prev', 'gutenverse-news' ),
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
			$format_args    = array();
			$url_query_args = array();
			$format         = explode( '?', str_replace( '%_%', $args['format'], $args['base'] ) );
			$format_query   = isset( $format[1] ) ? $format[1] : '';
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
			$page_links[] = '<a class="page_nav prev" href="' . esc_url( apply_filters( 'paginate_links', $link ) ) . '"><span class="navtext">' . esc_html( $args['prev_text'] ) . '</span></a>';
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

			/**
		* This filter is documented in wp-includes/general-template.php
*/
			$page_links[] = "<a class='page_number' href='" . esc_url( apply_filters( 'paginate_links', $link ) ) . "'>" . $args['before_page_number'] . number_format_i18n( $n ) . $args['after_page_number'] . '</a>';
			$dots         = true;
		elseif ( $dots && ! $args['show_all'] ) :
			$page_links[] = '<span class="page_number dots">&hellip;</span>';
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

			/**
		* This filter is documented in wp-includes/general-template.php
		*/
			$page_links[] = '<a class="page_nav next" href="' . esc_url( apply_filters( 'paginate_links', $link ) ) . '"><span class="navtext">' . esc_html( $args['next_text'] ) . '</span></a>';
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
				/* translators: %1s represents current page and %2$s represents total */
				$paging_text = sprintf( esc_html__( 'Page %1$s of %2$s', 'gutenverse-news' ), $current, $total );

				$navigation_classes = gvnews_build_html_classes(
					array(
						'gvnews_navigation',
						'gvnews_pagination',
						$nav_class,
						$nav_align,
						$nav_text,
						$nav_info,
					)
				);

				$r = join( "\n", $page_links );
				$r = "<div class=\"{$navigation_classes}\">
                <span class=\"page_info\">{$paging_text}</span>
                {$r}
            </div>";
				break;
		}

		return $r;
	}

	/**
	 * Get page link url
	 *
	 * @param integer $i index.
	 *
	 * @return string
	 */
	public function get_page_link_url( $i ) {
		global $wp_rewrite;
		$pagenum_link = html_entity_decode( get_pagenum_link() );
		$url          = '' == get_option( 'permalink_structure' ) ? add_query_arg( 'paged', $i, $pagenum_link ) : trailingslashit( $pagenum_link ) . user_trailingslashit( "$wp_rewrite->pagination_base/" . $i, 'single_paged' );
		return 1 === $i || '1' === $i ? $pagenum_link : $url;
	}

	/**
	 * Render header
	 *
	 * @param array $attr attribute.
	 *
	 * @return string
	 */
	public function render_header( $attr ) {
		if ( defined( 'POLYLANG_VERSION' ) ) {
			$attr['first_title']        = gvnews_translate_polylang( $attr['first_title'] );
			$attr['second_title']       = gvnews_translate_polylang( $attr['second_title'] );
			$attr['header_filter_text'] = gvnews_translate_polylang( $attr['header_filter_text'] );
		}

		// Heading.
		$subtitle      = ! empty( $attr['second_title'] ) ? "<strong>{$attr['second_title']}</strong>" : '';
		$header_class  = ! empty( $attr['header_type'] ) ? "gvnews_block_{$attr['header_type']}" : '';
		$heading_title = ( ! empty( $attr['first_title'] ) ? $attr['first_title'] : '' ) . $subtitle;

		if ( ! empty( $heading_title ) ) {
			$heading_icon  = empty( $attr['header_icon'] ) ? '' : "<i class='" . ( count( explode( ' ', $attr['header_icon'] ) ) !== 1 ? '' : 'fa ' ) . "{$attr['header_icon']}'></i>";
			$heading_title = "<span>{$heading_icon}{$attr['first_title']}{$subtitle}</span>";
			$heading_title = ! empty( $attr['url'] ) ? "<a href='{$attr['url']}'>{$heading_title}</a>" : $heading_title;
			$heading_title = "<h3 class=\"gvnews_block_title\">{$heading_title}</h3>";
		}

		// Sub Cat Filtering.
		$sub_cat = '';

		// filter category.
		if ( isset( $attr['header_filter_category'] ) ) {
			$categories = trim( $attr['header_filter_category'] );
			if ( ! empty( $categories ) ) {
				$categories = explode( ',', $categories );
				$categories = is_array( $categories ) ? $categories : array( $categories );

				// Need to cache category first.
				Cache::get_categories();

				foreach ( $categories as $category ) {
					$cat = get_category( trim( $category ) );
					if ( ! empty( $cat ) && ! is_wp_error( $cat ) ) {
						$sub_cat .= '<li><a class="subclass-filter" href="' . get_category_link( $cat->term_id ) . "\" data-type='category' data-id='{$cat->term_id}'>{$cat->name}</a></li>";
					}
				}
			}
		}

		// filter author.
		if ( isset( $attr['header_filter_author'] ) ) {
			$authors = trim( $attr['header_filter_author'] );
			if ( ! empty( $authors ) ) {
				$authors = explode( ',', $authors );
				$authors = is_array( $authors ) ? $authors : array( $authors );

				foreach ( $authors as $author ) {
					$author_id   = trim( $author );
					$author_url  = get_author_posts_url( $author_id );
					$author_name = get_the_author_meta( 'display_name', $author_id );
					$sub_cat    .= "<li><a class=\"subclass-filter\" href=\"{$author_url}\" data-type='author' data-id='{$author_id}'>{$author_name}</a></li>";
				}
			}
		}

		// filter tag.
		if ( isset( $attr['header_filter_tag'] ) ) {
			$tags = trim( $attr['header_filter_tag'] );
			if ( ! empty( $tags ) ) {
				$tags = explode( ',', $tags );
				$tags = is_array( $tags ) ? $tags : array( $tags );

				// Need to cache tag first.
				Cache::get_tags();

				foreach ( $tags as $tag ) {
					$tag_object = get_tag( trim( $tag ) );
					if ( $tag_object ) {
						$sub_cat .= '<li><a class="subclass-filter" href="' . get_tag_link( $tag_object->term_id ) . "\" data-type='tag' data-id='{$tag_object->term_id}'>{$tag_object->name}</a></li>";
					}
				}
			}
		}

		if ( ! empty( $sub_cat ) ) {
			$sub_cat = "<li><a class=\"subclass-filter current\" href=\"#\" data-type='all' data-id='0'>{$attr['header_filter_text']}</a></li>" . $sub_cat;
			$sub_cat =
			"<div class=\"gvnews_subcat\">
                    <ul class=\"gvnews_subcat_list\">
                        {$sub_cat}
                    </ul>
                </div>";
		}

		return empty( $heading_title ) && empty( $sub_cat ) ? '' :
		"<div class=\"gvnews_block_heading {$header_class} gvnews_subcat_right\">
                     {$heading_title}
                     {$sub_cat}
                 </div>";
	}

	/**
	 * Render script
	 *
	 * @param array  $attr         attribute.
	 * @param string $column_class column class..
	 *
	 * @return string
	 */
	public function render_script( $attr, $column_class ) {
		// need to retrieve attribute from source.
		$attr                 = $this->attribute;
		$attr['paged']        = 1;
		$attr['column_class'] = $column_class;
		$attr['class']        = $this->class_name;
		$attr['nonce']        = wp_create_nonce( 'gvnews-module-nonce' );
		$json_attr            = wp_json_encode( $attr );

		$output = "<script>var {$this->unique_id} = {$json_attr};</script>";

		return ! ( isset( $attr['ads_type'] ) && 'code' === $attr['ads_type'] ) ? $output :
		$output .= "<div class='hidden'>
								<textarea readonly class='gvnews_ad_code'>{$this->content}</textarea>
							</div>";
	}

	/**
	 * Handle Ajax Request for Module
	 */
	public function ajax_request() {
		if ( isset( $_REQUEST['data'] ) && isset( $_REQUEST['data']['attribute'] ) ) {
			if ( isset( $_REQUEST['data']['attribute'] ['nonce'] ) && wp_verify_nonce( sanitize_text_field( wp_unslash( $_REQUEST['data']['attribute'] ['nonce'] ) ), 'gvnews-module-nonce' ) ) {
				$attr = array(
					'filter'       => isset( $_REQUEST['data']['filter'] ) ? sanitize_text_field( wp_unslash( $_REQUEST['data']['filter'] ) ) : '',
					'filter_type'  => isset( $_REQUEST['data']['filter_type'] ) ? sanitize_text_field( wp_unslash( $_REQUEST['data']['filter_type'] ) ) : '',
					'current_page' => isset( $_REQUEST['data']['current_page'] ) ? sanitize_text_field( wp_unslash( $_REQUEST['data']['current_page'] ) ) : '',
					'attribute'    =>
					array(
						'first_title'                  => isset( $_REQUEST['data']['attribute']['first_title'] ) ? sanitize_text_field( wp_unslash( $_REQUEST['data']['attribute']['first_title'] ) ) : '',
						'second_title'                 => isset( $_REQUEST['data']['attribute']['second_title'] ) ? sanitize_text_field( wp_unslash( $_REQUEST['data']['attribute']['second_title'] ) ) : '',
						'url'                          => isset( $_REQUEST['data']['attribute']['url'] ) ? sanitize_url( wp_unslash( $_REQUEST['data']['attribute']['url'] ) ) : '',
						'header_type'                  => isset( $_REQUEST['data']['attribute']['header_type'] ) ? sanitize_text_field( wp_unslash( $_REQUEST['data']['attribute']['header_type'] ) ) : '',
						'header_icon'                  => isset( $_REQUEST['data']['attribute']['header_icon'] ) ? sanitize_text_field( wp_unslash( $_REQUEST['data']['attribute']['header_icon'] ) ) : '',
						'header_background'            => isset( $_REQUEST['data']['attribute']['header_background'] ) ? sanitize_text_field( wp_unslash( $_REQUEST['data']['attribute']['header_background'] ) ) : '',
						'header_secondary_background'  => isset( $_REQUEST['data']['attribute']['header_secondary_background'] ) ? sanitize_text_field( wp_unslash( $_REQUEST['data']['attribute']['header_secondary_background'] ) ) : '',
						'header_text_color'            => isset( $_REQUEST['data']['attribute']['header_text_color'] ) ? sanitize_text_field( wp_unslash( $_REQUEST['data']['attribute']['header_text_color'] ) ) : '',
						'header_line_color'            => isset( $_REQUEST['data']['attribute']['header_line_color'] ) ? sanitize_text_field( wp_unslash( $_REQUEST['data']['attribute']['header_line_color'] ) ) : '',
						'header_accent_color'          => isset( $_REQUEST['data']['attribute']['header_accent_color'] ) ? sanitize_text_field( wp_unslash( $_REQUEST['data']['attribute']['header_accent_color'] ) ) : '',
						'header_filter_category'       => isset( $_REQUEST['data']['attribute']['header_filter_category'] ) ? sanitize_text_field( wp_unslash( $_REQUEST['data']['attribute']['header_filter_category'] ) ) : '',
						'header_filter_author'         => isset( $_REQUEST['data']['attribute']['header_filter_author'] ) ? sanitize_text_field( wp_unslash( $_REQUEST['data']['attribute']['header_filter_author'] ) ) : '',
						'header_filter_tag'            => isset( $_REQUEST['data']['attribute']['header_filter_tag'] ) ? sanitize_text_field( wp_unslash( $_REQUEST['data']['attribute']['header_filter_tag'] ) ) : '',
						'header_filter_text'           => isset( $_REQUEST['data']['attribute']['header_filter_text'] ) ? sanitize_text_field( wp_unslash( $_REQUEST['data']['attribute']['header_filter_text'] ) ) : '',
						'post_type'                    => isset( $_REQUEST['data']['attribute']['post_type'] ) ? sanitize_text_field( wp_unslash( $_REQUEST['data']['attribute']['post_type'] ) ) : '',
						'content_type'                 => isset( $_REQUEST['data']['attribute']['content_type'] ) ? sanitize_text_field( wp_unslash( $_REQUEST['data']['attribute']['content_type'] ) ) : '',
						'number_post'                  => isset( $_REQUEST['data']['attribute']['number_post'] ) ? sanitize_text_field( wp_unslash( $_REQUEST['data']['attribute']['number_post'] ) ) : '',
						'post_offset'                  => isset( $_REQUEST['data']['attribute']['post_offset'] ) ? sanitize_text_field( wp_unslash( $_REQUEST['data']['attribute']['post_offset'] ) ) : '',
						'unique_content'               => isset( $_REQUEST['data']['attribute']['unique_content'] ) ? sanitize_text_field( wp_unslash( $_REQUEST['data']['attribute']['unique_content'] ) ) : '',
						'include_post'                 => isset( $_REQUEST['data']['attribute']['include_post'] ) ? sanitize_text_field( wp_unslash( $_REQUEST['data']['attribute']['include_post'] ) ) : '',
						'included_only'                => isset( $_REQUEST['data']['attribute']['included_only'] ) ? sanitize_text_field( wp_unslash( $_REQUEST['data']['attribute']['included_only'] ) ) : '',
						'exclude_post'                 => isset( $_REQUEST['data']['attribute']['exclude_post'] ) ? sanitize_text_field( wp_unslash( $_REQUEST['data']['attribute']['exclude_post'] ) ) : '',
						'include_category'             => isset( $_REQUEST['data']['attribute']['include_category'] ) ? sanitize_text_field( wp_unslash( $_REQUEST['data']['attribute']['include_category'] ) ) : '',
						'exclude_category'             => isset( $_REQUEST['data']['attribute']['exclude_category'] ) ? sanitize_text_field( wp_unslash( $_REQUEST['data']['attribute']['exclude_category'] ) ) : '',
						'include_author'               => isset( $_REQUEST['data']['attribute']['include_author'] ) ? sanitize_text_field( wp_unslash( $_REQUEST['data']['attribute']['include_author'] ) ) : '',
						'include_tag'                  => isset( $_REQUEST['data']['attribute']['include_tag'] ) ? sanitize_text_field( wp_unslash( $_REQUEST['data']['attribute']['include_tag'] ) ) : '',
						'exclude_tag'                  => isset( $_REQUEST['data']['attribute']['exclude_tag'] ) ? sanitize_text_field( wp_unslash( $_REQUEST['data']['attribute']['exclude_tag'] ) ) : '',
						'sort_by'                      => isset( $_REQUEST['data']['attribute']['sort_by'] ) ? sanitize_text_field( wp_unslash( $_REQUEST['data']['attribute']['sort_by'] ) ) : '',
						'date_format'                  => isset( $_REQUEST['data']['attribute']['date_format'] ) ? sanitize_text_field( wp_unslash( $_REQUEST['data']['attribute']['date_format'] ) ) : '',
						'date_format_custom'           => isset( $_REQUEST['data']['attribute']['date_format_custom'] ) ? sanitize_text_field( wp_unslash( $_REQUEST['data']['attribute']['date_format_custom'] ) ) : '',
						'excerpt_length'               => isset( $_REQUEST['data']['attribute']['excerpt_length'] ) ? sanitize_text_field( wp_unslash( $_REQUEST['data']['attribute']['excerpt_length'] ) ) : '',
						'excerpt_ellipsis'             => isset( $_REQUEST['data']['attribute']['excerpt_ellipsis'] ) ? sanitize_text_field( wp_unslash( $_REQUEST['data']['attribute']['excerpt_ellipsis'] ) ) : '',
						'force_normal_image_load'      => isset( $_REQUEST['data']['attribute']['force_normal_image_load'] ) ? sanitize_text_field( wp_unslash( $_REQUEST['data']['attribute']['force_normal_image_load'] ) ) : '',
						'pagination_mode'              => isset( $_REQUEST['data']['attribute']['pagination_mode'] ) ? sanitize_text_field( wp_unslash( $_REQUEST['data']['attribute']['pagination_mode'] ) ) : '',
						'pagination_nextprev_showtext' => isset( $_REQUEST['data']['attribute']['pagination_nextprev_showtext'] ) ? sanitize_text_field( wp_unslash( $_REQUEST['data']['attribute']['pagination_nextprev_showtext'] ) ) : '',
						'pagination_number_post'       => isset( $_REQUEST['data']['attribute']['pagination_number_post'] ) ? sanitize_text_field( wp_unslash( $_REQUEST['data']['attribute']['pagination_number_post'] ) ) : '',
						'pagination_scroll_limit'      => isset( $_REQUEST['data']['attribute']['pagination_scroll_limit'] ) ? sanitize_text_field( wp_unslash( $_REQUEST['data']['attribute']['pagination_scroll_limit'] ) ) : '',
						'boxed'                        => isset( $_REQUEST['data']['attribute']['boxed'] ) ? sanitize_text_field( wp_unslash( $_REQUEST['data']['attribute']['boxed'] ) ) : '',
						'boxed_shadow'                 => isset( $_REQUEST['data']['attribute']['boxed_shadow'] ) ? sanitize_text_field( wp_unslash( $_REQUEST['data']['attribute']['boxed_shadow'] ) ) : '',
						'el_id'                        => isset( $_REQUEST['data']['attribute']['el_id'] ) ? sanitize_text_field( wp_unslash( $_REQUEST['data']['attribute']['el_id'] ) ) : '',
						'el_class'                     => isset( $_REQUEST['data']['attribute']['el_class'] ) ? sanitize_text_field( wp_unslash( $_REQUEST['data']['attribute']['el_class'] ) ) : '',
						'scheme'                       => isset( $_REQUEST['data']['attribute']['scheme'] ) ? sanitize_text_field( wp_unslash( $_REQUEST['data']['attribute']['scheme'] ) ) : '',
						'column_width'                 => isset( $_REQUEST['data']['attribute']['column_width'] ) ? sanitize_text_field( wp_unslash( $_REQUEST['data']['attribute']['column_width'] ) ) : '',
						'title_color'                  => isset( $_REQUEST['data']['attribute']['title_color'] ) ? sanitize_text_field( wp_unslash( $_REQUEST['data']['attribute']['title_color'] ) ) : '',
						'accent_color'                 => isset( $_REQUEST['data']['attribute']['accent_color'] ) ? sanitize_text_field( wp_unslash( $_REQUEST['data']['attribute']['accent_color'] ) ) : '',
						'alt_color'                    => isset( $_REQUEST['data']['attribute']['alt_color'] ) ? sanitize_text_field( wp_unslash( $_REQUEST['data']['attribute']['alt_color'] ) ) : '',
						'excerpt_color'                => isset( $_REQUEST['data']['attribute']['excerpt_color'] ) ? sanitize_text_field( wp_unslash( $_REQUEST['data']['attribute']['excerpt_color'] ) ) : '',
						'css'                          => isset( $_REQUEST['data']['attribute']['css'] ) ? sanitize_text_field( wp_unslash( $_REQUEST['data']['attribute']['css'] ) ) : '',
						'compatible_column_notice'     => isset( $_REQUEST['data']['attribute']['compatible_column_notice'] ) ? sanitize_text_field( wp_unslash( $_REQUEST['data']['attribute']['compatible_column_notice'] ) ) : '',
						'show_date'                    => isset( $_REQUEST['data']['attribute']['show_date'] ) ? sanitize_text_field( wp_unslash( $_REQUEST['data']['attribute']['show_date'] ) ) : '',
						'short_code'                   => isset( $_REQUEST['data']['attribute']['short_code'] ) ? sanitize_text_field( wp_unslash( $_REQUEST['data']['attribute']['short_code'] ) ) : '',
						'paged'                        => isset( $_REQUEST['data']['attribute']['paged'] ) ? sanitize_text_field( wp_unslash( $_REQUEST['data']['attribute']['paged'] ) ) : '',
						'column_class'                 => isset( $_REQUEST['data']['attribute']['column_class'] ) ? sanitize_text_field( wp_unslash( $_REQUEST['data']['attribute']['column_class'] ) ) : '',
						'class'                        => isset( $_REQUEST['data']['attribute']['class'] ) ? sanitize_text_field( wp_unslash( $_REQUEST['data']['attribute']['class'] ) ) : '',
						'nonce'                        => wp_create_nonce( 'gvnews-module-nonce' ),
					),
				);

				$column_class = $attr['attribute']['column_class'];
				$query_param  = $this->build_ajax_query( $attr );
				$results      = $this->build_query( $query_param );
				$this->set_attribute( $attr['attribute'] );

				$content = $this->empty_content();
				if ( ! empty( $results['result'] ) ) {
					$content = $this->render_column( $results['result'], $column_class );
					if ( 'loadmore' === $attr['attribute']['pagination_mode'] || 'scrollload' === $attr['attribute']['pagination_mode'] ) {
						$content = 1 === $attr['current_page'] || '1' === $attr['current_page'] ? $this->render_column( $results['result'], $column_class ) : $this->render_column_alt( $results['result'], $column_class );
					}
				}

				wp_send_json(
					array(
						'content' => $content,
						'next'    => $results['next'],
						'prev'    => $results['prev'],
					)
				);
			}
		}
	}

	/**
	 * Build Ajax Query
	 *
	 * @param array $attr attribute.
	 *
	 * @return array
	 */
	public function build_ajax_query( $attr ) {
		$args          = $attr['attribute'];
		$args['paged'] = $attr['current_page'];

		if ( ! empty( $attr['filter_type'] ) && 'all' !== $attr['filter_type'] ) {
			switch ( $attr['filter_type'] ) {
				case 'category':
					$args['include_category'] = $attr['filter'];
					break;
				case 'author':
					$args['include_author'] = $attr['filter'];
					break;
				case 'tag':
						$args['include_tag'] = $attr['filter'];
					break;
			}

			$args['sort_by'] = 'latest';
			$args['paged']   = $attr['current_page'];
		}

		$args['number_post'] = $attr['attribute']['number_post'];

		$args['pagination_number_post'] = is_array( $attr['attribute']['pagination_number_post'] ) ? $attr['attribute']['pagination_number_post']['size'] : $attr['attribute']['pagination_number_post'];

		if ( class_exists( 'Polylang' ) ) {
			if ( isset( $attr['lang'] ) ) {
				$args['lang'] = $attr['lang'];
			}
		}

		return $args;
	}

	/**
	 * Method render_column
	 *
	 * @param string $result       result.
	 * @param array  $column_class column class.
	 *
	 * @return string
	 */
	abstract public function render_column( $result, $column_class );

	/**
	 * Method render_column_alt
	 *
	 * @param string $result       result.
	 * @param array  $column_class column class.
	 *
	 * @return string
	 */
	abstract public function render_column_alt( $result, $column_class );

	/**
	 * Method render_output
	 *
	 * @param string $attr       result.
	 * @param array  $column_class column class.
	 *
	 * @return string
	 */
	abstract public function render_output( $attr, $column_class );
}
