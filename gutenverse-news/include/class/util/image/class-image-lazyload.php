<?php
/**
 * Image lazyload
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Util\Image;

/**
 * Image_Lazyload
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Image_Lazyload implements Image_Interface {

	/**
	 * Instance
	 *
	 * @var ImageLazyLoad
	 */
	private static $instance;

	/**
	 * Expande range
	 *
	 * @var int
	 */
	private $expand_range = 700;

	/**
	 * Get Instance
	 *
	 * @return ImageLazyLoad
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
	 * @param string $id   id.
	 * @param string $size size.
	 *
	 * @return string
	 */
	public function single_image_unwrap( $id, $size ) {
		add_filter( 'wp_get_attachment_image_attributes', array( $this, 'lazy_load_image' ), 10, 2 );

		$image_size = wp_get_attachment_image_src( $id, $size );
		$image      = get_post( $id );
		$percentage = round( $image_size[2] / $image_size[1] * 100, 3 );

		$thumbnail  = '<div class="thumbnail-container animate-lazy" style="padding-bottom:' . $percentage . '%">';
		$thumbnail .= wp_get_attachment_image( $id, $size );
		$thumbnail .= '</div>';

		if ( ! empty( $image->post_excerpt ) ) {
			$thumbnail .= '<p class="wp-caption-text">' . $image->post_excerpt . '</p>';
		}

		gvnews_remove_filters( 'wp_get_attachment_image_attributes', array( $this, 'lazy_load_image' ), 10 );

		return $thumbnail;
	}

		/**
		 * Image Thumbnail unwrap
		 *
		 * @param string $id   id.
		 * @param string $size size.
		 *
		 * @return string
		 */
	public function image_thumbnail_unwrap( $id, $size ) {
		add_filter( 'wp_get_attachment_image_attributes', array( $this, 'lazy_load_image' ), 10, 2 );

		$post_thumbnail_id = get_post_thumbnail_id( $id );
		$image_size        = wp_get_attachment_image_src( $post_thumbnail_id, $size );
		$image             = get_post( $post_thumbnail_id );
		$percentage        = ! empty( $image_size[1] ) ? round( $image_size[2] / $image_size[1] * 100, 3 ) : '';

		$thumbnail  = '<div class="thumbnail-container animate-lazy" style="padding-bottom:' . $percentage . '%">';
		$thumbnail .= get_the_post_thumbnail( $id, $size );
		$thumbnail .= '</div>';

		if ( ! empty( $image->post_excerpt ) ) {
			$thumbnail .= '<p class="wp-caption-text">' . $image->post_excerpt . '</p>';
		}

		gvnews_remove_filters( 'wp_get_attachment_image_attributes', array( $this, 'lazy_load_image' ), 10 );

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
		$image_size = Image::get_instance()->get_image_size( $size );

		add_filter( 'wp_get_attachment_image_attributes', array( $this, 'lazy_load_image' ), 10, 2 );

		$additional_class = '';
		if ( ! has_post_thumbnail( $id ) ) {
			$additional_class = 'no_thumbnail';
		}

		$thumbnail = '<div class="thumbnail-container animate-lazy ' . esc_attr( $additional_class ) . ' size-' . esc_attr( $image_size['dimension'] ) . ' ">';

		$thumbnail .= get_the_post_thumbnail( $id, $size );
		$thumbnail .= '</div>';

		gvnews_remove_filters( 'wp_get_attachment_image_attributes', array( $this, 'lazy_load_image' ), 10 );

		return $thumbnail;
	}

		/**
		 * Owl single image
		 *
		 * @param string $id   id.
		 * @param string $size size.
		 *
		 * @return string
		 */
	public function owl_single_image( $id, $size ) {
		$image_size = Image::get_instance()->get_image_size( $size );

		$thumbnail  = '<div class="thumbnail-container size-' . esc_attr( $image_size['dimension'] ) . ' ">';
		$thumbnail .= wp_get_attachment_image( $id, $size );
		$thumbnail .= '</div>';

		return $thumbnail;
	}

	/**
	 * Owl lazy single image
	 *
	 * @param string $id   id.
	 * @param string $size size.
	 *
	 * @return string
	 */
	public function owl_lazy_single_image( $id, $size ) {
		$image_size = Image::get_instance()->get_image_size( $size );

		add_filter( 'wp_get_attachment_image_attributes', array( $this, 'owl_lazy_attr' ), 10, 2 );

		$thumbnail  = '<div class="thumbnail-container size-' . esc_attr( $image_size['dimension'] ) . ' ">';
		$thumbnail .= wp_get_attachment_image( $id, $size );
		$thumbnail .= '</div>';

		gvnews_remove_filters( 'wp_get_attachment_image_attributes', array( $this, 'owl_lazy_attr' ), 10 );

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
		$image_size = Image::get_instance()->get_image_size( $size );
		add_filter( 'wp_get_attachment_image_attributes', array( $this, 'owl_lazy_attr' ), 10, 2 );

		$thumbnail  = '<div class="thumbnail-container size-' . esc_attr( $image_size['dimension'] ) . ' ">';
		$thumbnail .= get_the_post_thumbnail( $id, $size );
		$thumbnail .= '</div>';

		gvnews_remove_filters( 'wp_get_attachment_image_attributes', array( $this, 'owl_lazy_attr' ), 10 );

		return $thumbnail;
	}

	/**
	 * Single image
	 *
	 * @param string $img_src image source.
	 * @param string $img_title image title.
	 * @param string $img_size image size.
	 *
	 * @return string
	 */
	public function single_image( $img_src, $img_title, $img_size ) {
		$img_tag = "<img class='lazyload' src='" . apply_filters( 'gvnews_empty_image', '' ) . "' data-expand='" . $this->expand_range . "' alt='" . esc_attr( $img_title ) . "' data-src='" . esc_url( $img_src ) . "' title='" . $img_title . "'>";

		if ( $img_size ) {
			return "<div class='thumbnail-container animate-lazy size-" . esc_attr( $img_size ) . "'>{$img_tag}</div>";
		} else {
			return $img_tag;
		}
	}

	/**
	 * Lazy load image
	 *
	 * @param array  $attr  attribute attribute.
	 * @param object $image image image.
	 *
	 * @return mixed
	 */
	public function lazy_load_image( $attr, $image ) {
		$attr['class']       = $attr['class'] . ' lazyload';
		$attr['data-src']    = $attr['src'];
		$attr['data-srcset'] = isset( $attr['srcset'] ) ? $attr['srcset'] : '';
		$attr['data-sizes']  = 'auto';
		$attr['data-expand'] = $this->expand_range;
		$attr['src']         = apply_filters( 'gvnews_empty_image', '' );

		if ( empty( $attr['alt'] ) && ! empty( $image->post_parent ) ) {
			$attr['alt'] = wp_strip_all_tags( get_the_title( $image->post_parent ) );
		}

		// Need to fix issues on ajax request image not showing.
		if ( wp_doing_ajax() ) {
			$attr['data-animate'] = 0;
		}

		unset( $attr['srcset'] );

		return $attr;
	}

	/**
	 * Owl lazy attribute
	 *
	 * @param array  $attr   id.
	 * @param object $image size.
	 *
	 * @return string
	 */
	public function owl_lazy_attr( $attr, $image ) {
		$attr['class']    = $attr['class'] . ' owl-lazy lazyload';
		$attr['data-src'] = $attr['src'];
		$attr['src']      = apply_filters( 'gvnews_empty_image', '' );

		if ( empty( $attr['alt'] ) && ! empty( $image->post_parent ) ) {
			$attr['alt'] = wp_strip_all_tags( get_the_title( $image->post_parent ) );
		}

		unset( $attr['srcset'] );

		return $attr;
	}
}
