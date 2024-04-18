<?php
/**
 * Single post
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Util\Single;

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
	 * @var SinglePost
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
	 * @return SinglePost
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
		if ( null === $image_size ) {
			$image_size = $this->get_single_thumbnail_size();
		}
		$output = $this->featured_image( $image_size, $id, $class );

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
}
