<?php
/**
 * Block view abstract
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block;

use GUTENVERSE\NEWS\Util\Image\Image_Normal_Load;

/**
 * Block_View_Abstract
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
abstract class Block_View_Abstract {

	/**
	 * Instance
	 *
	 * @var array
	 */
	protected static $instance;

	/**
	 * Option Field
	 *
	 * @var array
	 */
	protected $options;

	/**
	 * Unique id
	 *
	 * @var string
	 */
	protected $unique_id;

	/**
	 * Array of attribute
	 *
	 * @var array
	 */
	protected $attribute;

	/**
	 * Manager
	 *
	 * @var Block_Manager
	 */
	protected $manager;

	/**
	 * Class name
	 *
	 * @var string
	 */
	protected $class_name;

	/**
	 * Option class
	 *
	 * @var ModuleOptionAbstract
	 */
	protected $option_class;

	/**
	 * Content
	 *
	 * @var String
	 */
	protected $content;

	/**
	 * Meta settings.
	 *
	 * @var array
	 */
	protected $meta_settings = array(
		'show_meta'    => true,
		'meta_date'    => true,
		'meta_author'  => true,
		'meta_comment' => true,
	);

	/**
	 * Get instance
	 *
	 * @return ModuleViewAbstract
	 * @var    $manager
	 */
	public static function get_instance() {
		$class = get_called_class();
		if ( ! isset( self::$instance[ $class ] ) ) {
			self::$instance[ $class ] = new $class();
		}

		return self::$instance[ $class ];
	}

	/**
	 * ModuleViewAbstract constructor.
	 */
	protected function __construct() {
		$bwoah            = gvnews_get_shortcode_name_from_view( get_class( $this ) );
		$this->class_name = $bwoah;
		$this->manager    = Block_Manager::get_instance();
	}

	/**
	 * Method set_options
	 *
	 * @return void
	 */
	private function set_options() {
		$options = $this->option_class->get_options();

		foreach ( $options as $option ) {
			$this->options[ $option['param_name'] ] = isset( $option['std'] ) ? $option['std'] : '';
		}
	}

	/**
	 * Method compatible_column
	 *
	 * @return string
	 */
	private function compatible_column() {
		return $this->option_class->compatible_column();
	}

	/**
	 * Method color_scheme
	 *
	 * @return string
	 */
	public function color_scheme() {
		return $this->attribute['scheme'];
	}

	/**
	 * Method get_vc_class_name
	 *
	 * @return string
	 */
	public function get_vc_class_name() {
		$class_name = null;

		if ( isset( $this->attribute['css'] ) ) {
			$css_exploded = explode( '{', $this->attribute['css'] );
			$class        = $css_exploded[0];
			$class_name   = substr( $class, 1 );
		}

		if ( isset( $this->attribute['boxed'] ) && $this->attribute['boxed'] ) {
			$class_name .= ' gvnews_pb_boxed';
		}
		if ( isset( $this->attribute['boxed_shadow'] ) && $this->attribute['boxed_shadow'] ) {
			$class_name .= ' gvnews_pb_boxed_shadow';
		}

		return $class_name;
	}

	/**
	 * Method is_compatible_widget
	 *
	 * @return bool
	 */
	public function is_compatible_widget() {
		$column = $this->compatible_column();
		return in_array( 4, $column, true ) ? true : false;
	}

	/**
	 * Get module column class
	 *
	 * @param array $attr attributes.
	 *
	 * @return string
	 */
	public function get_module_column_class( $attr ) {
		if ( isset( $attr['column_width'] ) && 'auto' !== $attr['column_width'] ) {
			switch ( $attr['column_width'] ) {
				case 4:
					$class_name = 'gvnews_col_1o3';
					break;
				case 8:
					$class_name = 'gvnews_col_2o3';
					break;
				case 12:
					$class_name = 'gvnews_col_3o3';
					break;
				default:
					$class_name = 'gvnews_col_3o3';
			}

			return $class_name;
		}
		return $this->manager->get_column_class();
	}

	/**
	 * Call from VC to build Module
	 *
	 * @param array       $attr    attributes.
	 * @param object|null $content content.
	 *
	 * @return string
	 */
	public function build_module( $attr, $content = null ) {
		$this->content = $content;
		$this->generate_unique_id();
		$attr = $this->get_attribute( $attr );
		$this->load_vc_icon_elements( $attr );

		$column_class = $this->get_module_column_class( $attr );
		$column_class = apply_filters( 'gvnews_custom_module_column_class', $column_class );
		$output       = $this->render_module( $attr, $column_class );

		if ( ! $this->is_column_compatible() && ( current_user_can( 'edit_posts' ) || current_user_can( 'activate_plugins' ) ) ) {
			$output = $output . $this->render_uncompatible();
		}

		do_action( $this->class_name );

		return $output;
	}

	/**
	 * Load vc icon elements
	 *
	 * @param array $attr attributes.
	 */
	public function load_vc_icon_elements( $attr ) {
		if ( function_exists( 'vc_icon_element_fonts_enqueue' ) ) {
			$flag        = false;
			$params_icon = array(
				'header_icon'          => isset( $attr['header_icon'] ) ? $attr['header_icon'] : '',
				'button_download_icon' => isset( $attr['button_download_icon'] ) ? $attr['button_download_icon'] : '',
				'button_icon'          => isset( $attr['button_icon'] ) ? $attr['button_icon'] : '',
				'icon'                 => isset( $attr['icon'] ) ? $attr['icon'] : '',
				'newsticker_icon'      => isset( $attr['newsticker_icon'] ) ? $attr['newsticker_icon'] : '',
			);

			foreach ( $params_icon as $key => $value ) {
				if ( ! $flag ) {
					if ( ! empty( $value ) && is_string( $value ) ) {
						$class = explode( ' ', $value );
						if ( 'fa' !== $class[0] ) {
							$flag = true;
						}
					}
				} else {
					break;
				}
			}
			if ( $flag ) {
				vc_icon_element_fonts_enqueue( 'fontawesome' );
			}
		}
	}

	/**
	 * Render if module is not compatible
	 *
	 * @return string
	 */
	public function render_uncompatible() {
		$compatible = $this->compatible_column();
		$column     = $this->manager->get_current_width();
		/* translators: %1s represents column and %2$s represents width */
		$text    = wp_kses( sprintf( __( 'This module works best for column <strong>%1$s</strong> ( current column width <strong>%2$s</strong> ). This warning will only show if you login as Admin.', 'gutenverse-news' ), implode( ', ', $compatible ), $column ), wp_kses_allowed_html() );
		$element =
			'<div class="alert alert-error alert-compatibility">
                <strong>' . esc_html__( 'Optimal Column', 'gutenverse-news' ) . "</strong> {$text}
            </div>";

		return $element;
	}

	/**
	 * Check if column is not compatible
	 *
	 * @return bool
	 */
	public function is_column_compatible() {
		return true;
	}

	/**
	 * Get post id
	 *
	 * @return int
	 */
	public function get_post_id() {
		global $wp_query;
		return isset( $wp_query->post ) ? $wp_query->post->ID : null;
	}

	/**
	 * Generate Unique ID For Module
	 */
	public function generate_unique_id() {
		$this->unique_id = 'gvnews_module_' . $this->get_post_id() . '_' . $this->manager->get_module_count() . '_' . uniqid();
		// need to increase module count.
		$this->manager->increase_module_count();
	}

	/**
	 * Get Unique ID
	 */
	public function get_unique_id() {
		return $this->unique_id;
	}

	/**
	 * Render VC shortcode
	 *
	 * @param array  $attr attribute.
	 * @param string $content content.
	 *
	 * @return mixed
	 */
	public function render_shortcode( $attr, $content ) {
		return $this->build_module( $attr, $content );
	}

	/**
	 * Get thumbnail
	 *
	 * @param integer $post_id post id.
	 * @param string  $size size.
	 *
	 * @return mixed|string
	 */
	public function get_thumbnail( $post_id, $size ) {
		if (
			isset( $this->attribute['force_normal_image_load'] )
			&& ( 'true' === $this->attribute['force_normal_image_load']
				|| 'yes' === $this->attribute['force_normal_image_load'] )
		) {
			return Image_Normal_Load::get_instance()->image_thumbnail( $post_id, $size );
		}
		return apply_filters( 'gvnews_image_thumbnail', $post_id, $size );
	}

	/**
	 * Render primary category
	 *
	 * @param integer $post_id post id.
	 *
	 * @return mixed|string
	 */
	public function get_primary_category( $post_id ) {
		$cat_id   = gvnews_get_primary_category( $post_id );
		$category = '';

		if ( $cat_id ) {
			$category = get_category( $cat_id );
			if ( $category && ( isset( $category->slug ) && isset( $category->name ) ) ) {
				$class    = 'class="category-' . esc_attr( $category->slug ) . '"';
				$category = '<a href="' . esc_url( get_category_link( $cat_id ) ) . "\" {$class}>" . esc_attr( $category->name ) . '</a>';
			}
		}

		return $category;
	}

	/**
	 * Method except_more
	 *
	 * @return string
	 */
	public function excerpt_more() {
		return isset( $this->attribute['excerpt_ellipsis'] ) ? $this->attribute['excerpt_ellipsis'] : ' ...';
	}

	/**
	 * Method excerpt_length
	 *
	 * @return integer
	 */
	public function excerpt_length() {
		if ( isset( $this->attribute['excerpt_length'] ) ) {
			if ( isset( $this->attribute['excerpt_length']['size'] ) && is_numeric( $this->attribute['excerpt_length']['size'] ) ) {
				return $this->attribute['excerpt_length']['size'];
			}

			return $this->attribute['excerpt_length'];
		}
		return 20;
	}

	/**
	 * Method format_date
	 *
	 * @param string $post        $post description.
	 * @param string $custom_date $custom_date custom date.
	 *
	 * @return string
	 */
	public function format_date( $post, $custom_date = null ) {
		if ( isset( $this->attribute['date_format'] ) ) {
			$date_format = $this->attribute['date_format'];

			if ( 'ago' === $date_format ) {
				return gvnews_ago_time( human_time_diff( $custom_date ? $custom_date : get_the_time( 'U', $post ), current_time( 'timestamp' ) ) );
			} elseif ( 'custom' === $date_format ) {
				return gvnews_get_post_date( $this->attribute['date_format_custom'], $post );
			} elseif ( $date_format ) {
				return gvnews_get_post_date( '', $post );
			}
		}

		return gvnews_get_post_date( '', $post );
	}

	/**
	 * Method get_excerpt
	 *
	 * @param object $post post.
	 *
	 * @return string
	 */
	protected function get_excerpt( $post ) {
		$excerpt = $post->post_excerpt;

		if ( empty( $excerpt ) ) {
			$excerpt = $post->post_content;
		}

		$excerpt = preg_replace( '/\[[^\]]+\]/', '', $excerpt );
		$excerpt = wp_trim_words( $excerpt, $this->excerpt_length(), $this->excerpt_more() );

		return apply_filters( 'gvnews_module_excerpt', $excerpt, $post->ID, $this->excerpt_length(), $this->excerpt_more() );
	}

	/**
	 * Method collect_post_id
	 *
	 * @param array $content content.
	 *
	 * @return array
	 */
	protected function collect_post_id( $content ) {
		$post_ids = array();
		foreach ( $content['result'] as $result ) {
			$post_ids[] = $result->ID;
		}

		return $post_ids;
	}

	/**
	 * Build query
	 *
	 * @param array $attr attributes.
	 *
	 * @return array
	 */
	protected function build_query( $attr ) {
		if ( isset( $attr['unique_content'] ) && 'disable' !== $attr['unique_content'] ) {
			$exclude_post         = ! empty( $attr['exclude_post'] ) ? explode( ',', $attr['exclude_post'] ) : array();
			$attr['exclude_post'] = implode( ',', array_merge( $this->manager->get_unique_article( $attr['unique_content'] ), $exclude_post ) );

			// we need to alter attribute here...
			$this->set_attribute( $attr );
		}

		$result = Block_Query::do_query( $attr );

		if ( isset( $attr['unique_content'] ) && 'disable' !== $attr['unique_content'] ) {
			$this->manager->add_unique_article( $attr['unique_content'], $this->collect_post_id( $result ) );
		}

		return $result;
	}

	/**
	 * Post meta 1
	 *
	 * @param object  $post   post.
	 * @param boolean $avatar avatar.
	 * @param boolean $feed feed.
	 *
	 * @return string
	 */
	public function post_meta_1( $post, $avatar = false, $feed = false ) {
		$output = '';
		if ( $this->meta_settings['show_meta'] && 'false' !== $this->meta_settings['show_meta'] ) {
			$output .= '<div class="gvnews_post_meta">';
			$output .= $this->get_meta_author( $post, $avatar );
			$output .= $this->get_meta_date( $post );
			$output .= ! $feed ? $this->get_meta_comment( $post ) : '';
			$output .= '</div>';

		}
		return $output;
	}

	/**
	 * Post Meta Type 2
	 *
	 * @param integer $post post.
	 *
	 * @return string
	 */
	public function post_meta_2( $post ) {
		$output = '';
		if ( $this->meta_settings['show_meta'] && 'false' !== $this->meta_settings['show_meta'] ) {
			$output .= '<div class="gvnews_post_meta">';
			$output .= $this->get_meta_date( $post );
			$output .= '</div>';
		}
		return $output;
	}

	/**
	 * Post meta type 3
	 *
	 * @param object $post post.
	 *
	 * @return string
	 */
	public function post_meta_3( $post ) {
		$output = '';
		if ( $this->meta_settings['show_meta'] && 'false' !== $this->meta_settings['show_meta'] ) {
			$output .= '<div class="gvnews_post_meta">';
			$output .= $this->get_meta_author( $post, false );
			$output .= $this->get_meta_date( $post );
			$output .= '</div>';
		}
		return $output;
	}

	/**
	 * Get attribute
	 *
	 * @param array $attr attribute.
	 *
	 * @return array
	 */
	public function get_attribute( $attr ) {
		$this->attribute     = wp_parse_args( $attr, $this->options );
		$meta_settings       = isset( $attr['meta_settings'] ) ? $attr['meta_settings'] : array();
		$this->meta_settings = array_merge(
			$this->meta_settings,
			$meta_settings
		);
		return $this->attribute;
	}

	/**
	 * Method set_attribute
	 *
	 * @param array $attr attribute.
	 *
	 * @return void
	 */
	public function set_attribute( $attr ) {
		$this->attribute     = $attr;
		$meta_settings       = isset( $attr['meta_settings'] ) ? $attr['meta_settings'] : array();
		$this->meta_settings = array_merge(
			$this->meta_settings,
			$meta_settings
		);
	}

	/**
	 * Empty Content
	 *
	 * @return string
	 */
	public function empty_content() {
		return "<div class='gvnews_empty_module'>" . esc_html__( 'No Content Available', 'gutenverse-news' ) . '</div>';
	}

	/**
	 * Method element_id
	 *
	 * @param $attr $attr attribute.
	 *
	 * @return string|null
	 */
	public function element_id( $attr ) {
		return isset( $attr['el_id'] ) && ! empty( $attr['el_id'] ) ? "id='{$attr['el_id']}'" : null;
	}

	/**
	 * Method content_template
	 *
	 * @return void
	 */
	public function content_template() {
	}

	/**
	 * Get post meta date.
	 *
	 * @param object $post WP Post objcet.
	 * @return string
	 */
	public function get_meta_date( $post ) {
		if ( $this->meta_settings['meta_date'] && 'false' !== $this->meta_settings['meta_date'] ) {
			$icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. --><path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"></path></svg>';
			$icon = $this->render_icon( 'svg', '', base64_encode( $icon ) );
			return '<div class="gvnews_meta_date"><a href="' . esc_url( get_the_permalink( $post ) ) . '">' . $icon . ' ' . esc_attr( $this->format_date( $post ) ) . '</a></div>';
		}
		return '';
	}

	/**
	 * Get post meta comment.
	 *
	 * @param object $post WP Post objcet.
	 * @return string
	 */
	public function get_meta_comment( $post ) {
		if ( $this->meta_settings['meta_comment'] && 'false' !== $this->meta_settings['meta_comment'] ) {
			$comment = gvnews_get_comments_number( $post->ID );
			$icon    = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. --><path d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9c.1-.2 .2-.3 .3-.5z"></path></svg>';
			$icon    = $this->render_icon( 'svg', '', base64_encode( $icon ) );
			return '<div class="gvnews_meta_comment"><a href="' . esc_attr( gvnews_get_respond_link( $post->ID ) ) . '" >' . $icon . ' ' . esc_attr( $comment ) . ' </a></div>';
		}
		return '';
	}



	/**
	 * Get post meta author.
	 *
	 * @param object  $post WP Post objcet.
	 * @param boolean $avatar Show user avatar condition.
	 * @return string
	 */
	public function get_meta_author( $post, $avatar = false ) {
		if ( $this->meta_settings['meta_author'] && 'false' !== $this->meta_settings['meta_author'] ) {
			if ( $avatar ) {
				$author        = isset( $post->post_author ) ? $post->post_author : 'rss_post';
				$is_rss        = gvnews_get_rss_post_id( $author );
				$author_url    = $is_rss ? ( isset( $post->post_author_url ) ? $post->post_author_url : '' ) : get_author_posts_url( $author );
				$author_name   = $is_rss ? $post->post_author_name : get_the_author_meta( 'display_name', $author );
				$author_avatar = ( $is_rss ? false : $avatar ) ?
					'<div class="gvnews_author_avatar">
						' . get_avatar( get_the_author_meta( 'ID', $post->post_author ), 80, null, get_the_author_meta( 'display_name', $post->post_author ) ) . '
					</div>' : '';
				return '<div class="gvnews_meta_author">' . $author_avatar . '<span class="by">' . esc_html__( 'by', 'gutenverse-news' ) . '</span> <a href="' . esc_url( $author_url ) . '">' . esc_attr( $author_name ) . '</a></div>';
			} else {
				$author      = $post->post_author;
				$author_url  = gvnews_get_rss_post_id( $author ) ? $post->post_author_url : get_author_posts_url( $author );
				$author_name = gvnews_get_rss_post_id( $author ) ? $post->post_author_name : get_the_author_meta( 'display_name', $author );
				return '<div class="gvnews_meta_author"><span class="by">' . esc_html__( 'by', 'gutenverse-news' ) . '</span> <a href="' . esc_attr( $author_url ) . '">' . esc_attr( $author_name ) . '</a></div>';
			}
		}
		return '';
	}

	/**
	 * Render Icon
	 *
	 * @param string $type Icon type.
	 * @param string $icon Icon class.
	 * @param string $svg  SVG data.
	 *
	 * @return string
	 */
	public function render_icon( $type, $icon, $svg ) {
		if ( 'svg' === $type && ! empty( $svg ) ) {
			// phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_decode
			$svg_data = base64_decode( $svg );
			return '<div class="gutenverse-icon-svg">' . $svg_data . '</div>';
		} elseif ( ! empty( $icon ) ) {
			return '<i aria-hidden="true" class="' . esc_attr( $icon ) . '"></i>';
		}

		return null;
	}

	/**
	 * Method render_module
	 *
	 * @param array  $attr         attribute.
	 * @param string $column_class column class..
	 *
	 * @return string
	 */
	abstract public function render_module( $attr, $column_class );
}
