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
use GUTENVERSE\NEWS\Util\Svg_Icons;
use GUTENVERSE\NEWS\Util\Options;

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
		'meta_review'  => false,
	);

	/**
	 * Post title tag.
	 *
	 * @var string
	 */
	protected $post_title_tag = 'h3';

	/**
	 * Additional class
	 *
	 * @var string
	 */
	protected $additional_class = '';

	/**
	 * Manager
	 *
	 * @var Options
	 */
	protected $block_options;

	/**
	 * Post format icon
	 *
	 * @var array
	 */
	private $post_format_icon = array();

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
	 * Get overlay icon
	 *
	 * @param int $post_id post id.
	 *
	 * @return string
	 */
	public function get_overlay_icon( $post_id ) {
		if ( ! $this->post_format_icon['show'] ) {
			return array(
				'with_overlay_icon' => '',
				'overlay_icon'      => '',
			);
		}
		return apply_filters(
			'gvnews_thumb_overlay_icon',
			array(
				'with_overlay_icon' => '',
				'overlay_icon'      => '',
			),
			$post_id,
			$this->post_format_icon
		);
	}

	/**
	 * ModuleViewAbstract constructor.
	 */
	protected function __construct() {
		$bwoah               = gvnews_get_shortcode_name_from_view( get_class( $this ) );
		$this->class_name    = $bwoah;
		$this->manager       = Block_Manager::get_instance();
		$this->block_options = Options::get_instance();
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
	 * @param bool    $force_lazy_load force lazy load.
	 *
	 * @return mixed|string
	 */
	public function get_thumbnail( $post_id, $size, $force_lazy_load = false ) {
		/* need to lazy load the hidden element like some of carousel items that not visible on first time load */
		if ( $force_lazy_load ) {
			return Image_Normal_Load::get_instance()->image_thumbnail( $post_id, $size, 'lazy' );
		}
		return Image_Normal_Load::get_instance()->image_thumbnail( $post_id, $size, $this->attribute['image_load'], $this->attribute['fetch_priority_high'] );
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
				$category = '<a aria-label="' . esc_attr( $category->name ) . '" href="' . esc_url( get_category_link( $cat_id ) ) . "\" {$class}>" . esc_attr( $category->name ) . '</a>';
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
			$output .= '<div class="gvnews_post_meta type-1">';
			$output .= apply_filters( 'gvnews_meta', '', $post, $this->meta_settings );
			$output .= $this->get_meta_author( $post, $avatar );
			$output .= $this->get_meta_date( $post, $feed );
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
			$output .= '<div class="gvnews_post_meta type-2">';
			$output .= apply_filters( 'gvnews_meta', '', $post, $this->meta_settings );
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
			$output .= '<div class="gvnews_post_meta type-3">';
			$output .= apply_filters( 'gvnews_meta', '', $post, $this->meta_settings );
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
		$this->attribute      = wp_parse_args( $attr, $this->options );
		$meta_settings        = isset( $attr['meta_settings'] ) ? $attr['meta_settings'] : array();
		$this->meta_settings  = array_merge(
			$this->meta_settings,
			$meta_settings
		);
		$this->post_title_tag = isset( $attr['post_title_html_tag'] ) ? $attr['post_title_html_tag'] : 'h3';

		$this->post_format_icon = array(
			'show'    => isset( $attr['show_post_format_icon'] ) ? $attr['show_post_format_icon'] : false,
			'gallery' => array(
				'icon' => isset( $attr['gallery_format_icon'] ) ? $attr['gallery_format_icon'] : '',
				'type' => isset( $attr['gallery_format_icon_type'] ) ? $attr['gallery_format_icon_type'] : 'icon',
				'svg'  => isset( $attr['gallery_format_icon_svg'] ) ? $attr['gallery_format_icon_svg'] : '',
			),
			'video'   => array(
				'icon' => isset( $attr['video_format_icon'] ) ? $attr['video_format_icon'] : '',
				'type' => isset( $attr['video_format_icon_type'] ) ? $attr['video_format_icon_type'] : 'icon',
				'svg'  => isset( $attr['video_format_icon_svg'] ) ? $attr['video_format_icon_svg'] : '',
			),
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
		$this->attribute      = $attr;
		$meta_settings        = isset( $attr['meta_settings'] ) ? $attr['meta_settings'] : array();
		$this->meta_settings  = array_merge(
			$this->meta_settings,
			$meta_settings
		);
		$this->post_title_tag = isset( $attr['post_title_html_tag'] ) ? $attr['post_title_html_tag'] : 'h3';

		$this->post_format_icon = array(
			'show'    => isset( $attr['show_post_format_icon'] ) ? $attr['show_post_format_icon'] : false,
			'gallery' => array(
				'icon' => isset( $attr['gallery_format_icon'] ) ? $attr['gallery_format_icon'] : '',
				'type' => isset( $attr['gallery_format_icon_type'] ) ? $attr['gallery_format_icon_type'] : 'icon',
				'svg'  => isset( $attr['gallery_format_icon_svg'] ) ? $attr['gallery_format_icon_svg'] : '',
			),
			'video'   => array(
				'icon' => isset( $attr['video_format_icon'] ) ? $attr['video_format_icon'] : '',
				'type' => isset( $attr['video_format_icon_type'] ) ? $attr['video_format_icon_type'] : 'icon',
				'svg'  => isset( $attr['video_format_icon_svg'] ) ? $attr['video_format_icon_svg'] : '',
			),
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
	 * @param boolean $feed is feed.
	 * @return string
	 */
	public function get_meta_date( $post, $feed = false ) {
		$custom_date = $feed ? $post->publish_date : null;
		$permalink   = $feed ? $post->permalink : get_the_permalink( $post );

		if ( $this->meta_settings['meta_date'] && 'false' !== $this->meta_settings['meta_date'] ) {
			$icon = Svg_Icons::render_svg_icon( 'far fa-clock' );
			return '<div class="gvnews_meta_date"><a aria-label="' . esc_attr( $this->format_date( $post, $custom_date ) ) . '" href="' . esc_url( $permalink ) . '">' . $icon . ' ' . esc_attr( $this->format_date( $post, $custom_date ) ) . '</a></div>';
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
			$icon    = Svg_Icons::render_svg_icon( 'far fa-comment' );
			return '<div class="gvnews_meta_comment"><a aria-label="' . esc_attr__( 'Comments', 'gutenverse-news' ) . '" href="' . esc_attr( gvnews_get_respond_link( $post->ID ) ) . '" >' . $icon . ' ' . esc_attr( $comment ) . ' </a></div>';
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
			$author = isset( $post->post_author ) ? $post->post_author : 'rss_post';
			if ( $avatar ) {
				$is_rss      = gvnews_get_rss_post_id( $author );
				$author_url  = $is_rss ? ( isset( $post->post_author_url ) ? $post->post_author_url : '' ) : get_author_posts_url( $author );
				$author_name = $is_rss ? $post->post_author_name : get_the_author_meta( 'display_name', $author );
				if ( empty( $author_name ) ) {
					return '';
				}
				$author_avatar = ( $is_rss ? false : $avatar ) ?
					'<div class="gvnews_author_avatar">
						' . get_avatar( get_the_author_meta( 'ID', $post->post_author ), 80, null, get_the_author_meta( 'display_name', $post->post_author ) ) . '
					</div>' : '';
				return '<div class="gvnews_meta_author">' . $author_avatar . '<span class="by">' . esc_html__( 'by', 'gutenverse-news' ) . '</span> <a aria-label="' . esc_attr( $author_name ) . '" href="' . esc_url( $author_url ) . '">' . esc_attr( $author_name ) . '</a></div>';
			} else {
				$author_url  = gvnews_get_rss_post_id( $author ) ? $post->post_author_url : get_author_posts_url( $author );
				$author_name = gvnews_get_rss_post_id( $author ) ? $post->post_author_name : get_the_author_meta( 'display_name', $author );
				if ( empty( $author_name ) ) {
					return '';
				}
				return '<div class="gvnews_meta_author"><span class="by">' . esc_html__( 'by', 'gutenverse-news' ) . '</span> <a aria-label="' . esc_attr( $author_name ) . '" href="' . esc_attr( $author_url ) . '">' . esc_attr( $author_name ) . '</a></div>';
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
		if ( 'svg' === $type ) {
			if ( ! empty( $svg ) ) {
				// phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_decode
				$svg_data = base64_decode( $svg );
				return '<div class="gutenverse-icon-svg">' . $svg_data . '</div>';
			}
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
