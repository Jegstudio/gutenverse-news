<?php
/**
 * Image normal load
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Util\Image;

/**
 * Image_Normal_Load
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Image_Normal_Load implements Image_Interface {

	/**
	 * Instance
	 *
	 * @var ImageNormalLoad
	 */
	private static $instance;

	/**
	 * Get instance
	 *
	 * @return ImageNormalLoad
	 */
	public static function get_instance() {
		if ( null === static::$instance ) {
			static::$instance = new static();
		}

		return static::$instance;
	}

	/**
	 * Single image unwrap
	 *
	 *  @param string $id   id.
	 * @param string $size size.
	 *
	 * @return string
	 */
	public function single_image_unwrap( $id, $size ) {
		add_filter( 'wp_lazy_loading_enabled', '__return_false' );
		add_filter( 'wp_get_attachment_image_attributes', array( $this, 'normal_load_image' ), 10, 2 );

		$image_size = wp_get_attachment_image_src( $id, $size );
		$image      = get_post( $id );
		$percentage = round( $image_size[2] / $image_size[1] * 100, 3 );

		$thumbnail  = '<div class="thumbnail-container" style="padding-bottom:' . $percentage . '%">';
		$thumbnail .= wp_get_attachment_image( $id, $size );
		$thumbnail .= '</div>';

		if ( ! empty( $image->post_excerpt ) ) {
			$thumbnail .= '<p class="wp-caption-text">' . $image->post_excerpt . '</p>';
		}

		gvnews_remove_filters( 'wp_get_attachment_image_attributes', array( $this, 'normal_load_image' ), 10 );
		gvnews_remove_filters( 'wp_lazy_loading_enabled', '__return_false' );

		return $thumbnail;
	}

	/**
	 * Image thumbnail unwrap
	 *
	 * @param string $id   id.
	 * @param string $size size.
	 *
	 * @return string
	 */
	public function image_thumbnail_unwrap( $id, $size ) {
		add_filter( 'wp_lazy_loading_enabled', '__return_false' );
		add_filter( 'wp_get_attachment_image_attributes', array( $this, 'normal_load_image' ), 10, 2 );

		$post_thumbnail_id = get_post_thumbnail_id( $id );
		$image_size        = wp_get_attachment_image_src( $post_thumbnail_id, $size );
		$image             = get_post( $post_thumbnail_id );

		if ( $image_size[1] > 0 ) {
			$percentage = round( $image_size[2] / $image_size[1] * 100, 3 );
		} else {
			$percentage = $image_size[2];
		}

		$thumbnail  = '<div class="thumbnail-container" style="padding-bottom:' . $percentage . '%">';
		$thumbnail .= get_the_post_thumbnail( $id, $size );
		$thumbnail .= '</div>';

		if ( ! empty( $image->post_excerpt ) ) {
			$thumbnail .= '<p class="wp-caption-text">' . $image->post_excerpt . '</p>';
		}

		gvnews_remove_filters( 'wp_get_attachment_image_attributes', array( $this, 'normal_load_image' ), 10 );
		gvnews_remove_filters( 'wp_lazy_loading_enabled', '__return_false' );

		return $thumbnail;
	}

	/**
	 * Image thumbnail
	 *
	 * @param string $id   id.
	 * @param string $size size.
	 *
	 * @return string
	 */
	public function image_thumbnail( $id, $size ) {
		add_filter( 'wp_lazy_loading_enabled', '__return_false' );
		add_filter( 'wp_get_attachment_image_attributes', array( $this, 'normal_load_image' ), 10, 2 );

		$image_size = Image::get_instance()->get_image_size( $size );

		$additional_class = '';
		if ( ! has_post_thumbnail( $id ) ) {
			$additional_class = 'no_thumbnail';
		}

		$thumbnail  = '<div class="thumbnail-container ' . esc_attr( $additional_class ) . ' size-' . esc_attr( $image_size['dimension'] ) . ' ">';
		$thumbnail .= get_the_post_thumbnail( $id, $size );
		$thumbnail .= '</div>';

		gvnews_remove_filters( 'wp_get_attachment_image_attributes', array( $this, 'normal_load_image' ), 10 );
		gvnews_remove_filters( 'wp_lazy_loading_enabled', '__return_false' );

		return $thumbnail;
	}

	/**
	 *  Owl single image
	 *
	 * @param string $id   id.
	 * @param string $size size.
	 *
	 * @return string
	 */
	public function owl_single_image( $id, $size ) {
		add_filter( 'wp_lazy_loading_enabled', '__return_false' );
		add_filter( 'wp_get_attachment_image_attributes', array( $this, 'normal_load_image' ), 10, 2 );

		$image_size = Image::get_instance()->get_image_size( $size );

		$thumbnail  = '<div class="thumbnail-container size-' . esc_attr( $image_size['dimension'] ) . ' ">';
		$thumbnail .= wp_get_attachment_image( $id, $size );
		$thumbnail .= '</div>';

		gvnews_remove_filters( 'wp_get_attachment_image_attributes', array( $this, 'normal_load_image' ), 10 );
		gvnews_remove_filters( 'wp_lazy_loading_enabled', '__return_false' );

		return $thumbnail;
	}

	/**
	 * Owl Lazy single image.
	 *
	 * @param string $id   id.
	 * @param string $size size.
	 *
	 * @return string
	 */
	public function owl_lazy_single_image( $id, $size ) {
		add_filter( 'wp_lazy_loading_enabled', '__return_false' );
		add_filter( 'wp_get_attachment_image_attributes', array( $this, 'normal_load_image' ), 10, 2 );

		$image_size = Image::get_instance()->get_image_size( $size );

		$thumbnail  = '<div class="thumbnail-container size-' . esc_attr( $image_size['dimension'] ) . ' ">';
		$thumbnail .= wp_get_attachment_image( $id, $size );
		$thumbnail .= '</div>';

		gvnews_remove_filters( 'wp_get_attachment_image_attributes', array( $this, 'normal_load_image' ), 10 );
		gvnews_remove_filters( 'wp_lazy_loading_enabled', '__return_false' );

		return $thumbnail;
	}

	/**
	 * Owl lazy image
	 *
	 * @param string $id   id.
	 * @param string $size size.
	 *
	 * @return string
	 */
	public function owl_lazy_image( $id, $size ) {
		add_filter( 'wp_lazy_loading_enabled', '__return_false' );
		add_filter( 'wp_get_attachment_image_attributes', array( $this, 'normal_load_image' ), 10, 2 );

		$image_size = Image::get_instance()->get_image_size( $size );

		$thumbnail  = '<div class="thumbnail-container size-' . esc_attr( $image_size['dimension'] ) . ' ">';
		$thumbnail .= get_the_post_thumbnail( $id, $size );
		$thumbnail .= '</div>';

		gvnews_remove_filters( 'wp_get_attachment_image_attributes', array( $this, 'normal_load_image' ), 10 );
		gvnews_remove_filters( 'wp_lazy_loading_enabled', '__return_false' );

		return $thumbnail;
	}

	/**
	 * Single image
	 *
	 * @param string $img_src   image source.
	 * @param string $img_title image title.
	 * @param string $img_size  image size.
	 *
	 * @return string
	 */
	public function single_image( $img_src, $img_title, $img_size ) {
		$img_tag = "<img src='" . esc_url( $img_src ) . "' alt='" . esc_attr( $img_title ) . "' title='" . $img_title . "'>";

		if ( $img_size ) {
			return "<div class='thumbnail-container size-" . esc_attr( $img_size ) . "'>{$img_tag}</div>";
		} else {
			return $img_tag;
		}
	}

	/**
	 * Method normal_load_image
	 *
	 * @param array  $attr attribute.
	 * @param object $image image.
	 *
	 * @return array
	 */
	public function normal_load_image( $attr, $image ) {
		if ( empty( $attr['alt'] ) && ! empty( $image->post_excerpt ) ) {
			$attr['alt'] = wp_strip_all_tags( $image->post_excerpt );
		}

		if ( isset( $attr['loading'] ) ) {
			unset( $attr['loading'] );
		}

		return $attr;
	}
}
