<?php
/**
 * Single post
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Util\Single;

use GUTENVERSE\NEWS\Util\Image\Image_Normal_Load;

/**
 * Single_Post
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Single_Post {

	/**
	 * Instance
	 *
	 * @var self
	 */
	private static $instance;

	/**
	 * Post id
	 *
	 * @var \WP_Post
	 */
	private $post_id;

	/**
	 * Single post
	 *
	 * @return self
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
		$this->post_id = get_the_ID();
	}

	/**
	 * Method set_post_id
	 *
	 * @param integer $post_id post id.
	 *
	 * @return object
	 */
	public function set_post_id( $post_id ) {
		$this->post_id = $post_id;

		return $this;
	}


	/**
	 * Method post_date_format
	 *
	 * @param array $post post.
	 *
	 * @return string
	 */
	public function post_date_format( $post ) {
		$date_format = $this->get_date_format();

		if ( 'ago' === $date_format ) {
			return gvnews_ago_time( human_time_diff( get_the_time( 'U', $post ), current_time( 'timestamp' ) ) );
		} elseif ( 'default' === $date_format ) {
			return gvnews_get_post_date( '', $post );
		} elseif ( $date_format ) {
			return gvnews_get_post_date( $date_format, $post );
		}

		return gvnews_get_post_date( '', $post );
	}

	/**
	 * Method set_global_content_width
	 *
	 * @param integer $layout layout.
	 *
	 * @return void
	 */
	public function set_global_content_width( $layout ) {
		global $content_width;
		switch ( $layout ) {
			case 8:
				$content_width = 790;
				break;

			case 6:
				$content_width = 585;
				break;

			case 9:
				$content_width = 877.5;
				break;

			case 12:
				$content_width = 1150;
				break;

			default:
				$content_width = 768;
				break;
		}
	}

	/**
	 * Method get_date_format
	 *
	 * @return string
	 */
	public function get_date_format() {
		return apply_filters( 'gvnews_single_post_date_format_custom', 'default', $this->post_id );
	}


	/**
	 * Method render_post_tag
	 *
	 * @return void
	 */
	public function render_post_tag() {
		echo wp_kses( '<span>' . esc_html__( 'Tags:', 'gutenverse-news' ) . '</span> ' . get_the_tag_list( '', '', '' ), wp_kses_allowed_html() );
	}

	/**
	 * Method get_featured_post_image_size
	 *
	 * @param string $size size.
	 *
	 * @return string
	 */
	public function get_featured_post_image_size( $size ) {
		switch ( $size ) {
			case 'no-crop':
				$image_size = 'gvnews-featured-750';
				break;
			case 'crop-500':
				$image_size = 'gvnews-750x375';
				break;
			case 'crop-715':
				$image_size = 'gvnews-750x536';
				break;
			default:
				$image_size = 'gvnews-750x375';
		}

		return $image_size;
	}

	/**
	 * Method get_single_thumbnail_size
	 *
	 * @return string
	 */
	public function get_single_thumbnail_size() {
		return $this->get_featured_post_image_size( 'crop-500' );
	}

	/**
	 * Method get_gallery_thumbnail_size
	 *
	 * @return string
	 */
	public function get_gallery_thumbnail_size() {
		$image_size = apply_filters( 'gvnews_metabox_override_value', 'crop-500', 'image_size' );
		return $this->get_featured_post_image_size( $image_size );
	}

	/**
	 * Method feature_post_1
	 *
	 * @param string|null $image_size image size.
	 * @param string|null $gallery_size gallery size.
	 * @param integer     $id           id id.
	 * @param class       $class        class class.
	 *
	 * @return void
	 */
	public function feature_post_1( $image_size = null, $gallery_size = null, $id = null, $class = null ) {
		$format = get_post_format();

		switch ( $format ) {
			case 'gallery':
				if ( is_null( $gallery_size ) ) {
					$gallery_size = $this->get_gallery_thumbnail_size();
				}
				$output = $this->featured_gallery( $gallery_size, $id, $class );
				break;
			case 'video':
				$output = "<div {$id} class='jeg_feature_video_wrapper {$class}'>" . $this->featured_video( $image_size, $id, $class ) . '</div>';
				break;
			default:
				if ( is_null( $image_size ) ) {
					$image_size = $this->get_single_thumbnail_size();
				}
				$output = $this->featured_image( $image_size, $id, $class );
				break;
		}

		echo wp_kses( $output, wp_kses_allowed_html() );
	}

	/**
	 * Method featured_image
	 *
	 * @param string  $size  size.
	 * @param integer $id    id.
	 * @param class   $class class.
	 *
	 * @return string
	 */
	public function featured_image( $size, $id = null, $class = null ) {
		$output = "<div {$id} class=\"gvnews_featured featured_image {$class}\">";

		$image_src = $this->get_featured_image_src( 'full' );

		if ( has_post_thumbnail() ) {
			$output .= \GUTENVERSE\NEWS\Util\Image\Image_Normal_Load::get_instance()->image_thumbnail_unwrap( $this->post_id, $size );
		}

		$output .= '</div>';

		return $output;
	}


	/**
	 * Method get_featured_image_src
	 *
	 * @param string $size size.
	 *
	 * @return boolean
	 */
	public function get_featured_image_src( $size ) {
		$post_thumbnail_id = get_post_thumbnail_id( $this->post_id );
		$image             = wp_get_attachment_image_src( $post_thumbnail_id, $size );

		return isset( $image[0] ) ? $image[0] : false;
	}

	/**
	 * Method recursive_category
	 *
	 * @param array $categories categories.
	 * @param array $result result.
	 *
	 * @return void
	 */
	public function recursive_category( $categories, &$result ) {
		foreach ( $categories as $category ) {
			$result[] = $category;
			$children = get_categories( array( 'parent' => $category->term_id ) );

			if ( ! empty( $children ) ) {
				$this->recursive_category( $children, $result );
			}
		}
	}

	/**
	 * Featured Gallery method
	 *
	 * @param mixed $size size.
	 * @param mixed $id id.
	 * @param mixed $additional_class class.
	 * @return mixed
	 */
	public function featured_gallery( $size, $id = null, $additional_class = null ) {
		$dimension = gvnews_get_image_dimension_by_name( $size );
		$output    = '';
		$images    = apply_filters( 'gvnews_metabox_value', false, 'gallery', $id );
		$content   = '';
		if ( $images ) {
			foreach ( $images as $key => $item ) {
				if ( 0 === count( $item['image'] ) ) {
					continue;
				}
				$image    = $item['image'];
				$image_id = $image['id'];
				$image    = wp_get_attachment_image_src( $image_id, 'full' );

				$content .= '<a>' .
								apply_filters( 'gvnews_single_image_lazy_owl', $image_id, $size ) .
							'</a>';
			}

			$output = '<div class="gvnews_featured thumbnail-container gvnews_owlslider size-' . $dimension . ' ' . $additional_class . '">
							<div class="featured_gallery">'
							. $content .
							'</div>
						</div>';
		}
		if ( ! is_admin() && '' !== $content ) {
			wp_enqueue_script( 'gvnews-featured-gallery', GUTENVERSE_NEWS_URL . '/assets/js/featured-gallery.js', array(), GUTENVERSE_NEWS_VERSION, true );
		}

		return apply_filters( 'gvnews_featured_gallery', $output, $this->post_id );
	}

	/**
	 * Featured Video
	 *
	 * @param string $image_size image size.
	 * @param int    $id id.
	 * @param mixed  $class class.
	 * @return string
	 */
	public function featured_video( $image_size = null, $id = null, $class = null ) {
		// $following = defined( 'JNEWS_AUTOLOAD_POST' ) ? false : get_theme_mod( 'jnews_single_following_video', false );
		// $position  = get_theme_mod( 'jnews_single_following_video_position', 'top_right' );
		$following = false;
		$position  = 'top_right';
		$video_url = apply_filters( 'gvnews_metabox_value', '', 'video', $id );
		// if ( class_exists( '\JNews\Paywall\Truncater\Truncater' ) ) {
		// 	if ( \JNews\Paywall\Truncater\Truncater::instance()->check_status() ) {
		// 		if ( jeg_metabox( 'jnews_paywall_metabox.enable_preview_video', false, $this->post_id ) ) {
		// 			$video_url = jeg_metabox( 'jnews_paywall_metabox.video_preview_url', '', $this->post_id );
		// 		} elseif ( get_theme_mod( 'jpw_block_video_content', false ) ) {
		// 			if ( null === $image_size ) {
		// 				$image_size = $this->get_single_thumbnail_size();
		// 			}
		// 			return $this->featured_image( $image_size, $id, $class );
		// 		}
		// 	}
		// }
		$video_format = strtolower( pathinfo( $video_url, PATHINFO_EXTENSION ) );
		$featured_img = gvnews_get_image_src( get_post_thumbnail_id( $this->post_id ), 'gvnews-featured-750' );

		$video_type   = gvnews_check_video_type( $video_url );
		$allowed_type = array( 'youtube', 'vimeo', 'dailymotion' );

		if ( '' === $video_url ) {
			$content = '<div class="gvnews_video_container" style="display: none;"></div>';
		} elseif ( in_array( $video_type, $allowed_type, true ) ) {
			$content =
				'<div
					data-src="' . esc_url( $video_url ) . '"
					data-type="' . esc_attr( $video_type ) . '"
					data-repeat="false"
					data-autoplay="false"
					class="' . esc_attr( $video_type ) . '-class clearfix"
				>
					<div class="gvnews_video_container"></div>
				</div>';
		} elseif ( 'mp4' === $video_format ) {
			$content =
				'<div class="gvnews_video_container">
					<video
						width="640"
						height="360"
						style="width: 100%; height: 100%;"
						poster="' . esc_attr( $featured_img ) . '"
						controls preload="none"
					>
						<source type="video/mp4" src="' . esc_url( $video_url ) . '">
					</video>
				</div>';
		} elseif ( wp_oembed_get( $video_url ) ) {
			$content = '<div class="gvnews_video_container">' . wp_oembed_get( $video_url ) . '</div>';
		} else {
			$content = '<div class="gvnews_video_container">' . $video_url . '</div>';
		}

		$output = '<div class="gvnews_featured featured_video ' . $position . ' " data-following="' . $following . '" data-position="' . $position . '">
						<div class="gvnews_featured_video_wrapper">'
							. $content .
							'<div class="floating_close"></div>
						</div>
					</div>';
		if ( ! is_admin() && '' !== $video_url ) {
			wp_enqueue_script( 'gvnews-featured-video', GUTENVERSE_NEWS_URL . '/assets/js/featured-video.js', array(), GUTENVERSE_NEWS_VERSION, true );
		}

		return apply_filters( 'gvnews_featured_video', $output, $this->post_id );
	}
}
