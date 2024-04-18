<?php
/**
 * Image background load
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Util\Image;

/**
 * Image_Background_Load
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Image_Background_Load implements Image_Interface {


	/**
	 * Instance
	 *
	 * @var ImageBackgroundLoad
	 */
	private static $instance;

	/**
	 * Expand renage
	 *
	 * @var int
	 */
	private $expand_range = 700;

	/**
	 * Get instance
	 *
	 * @return ImageBackgroundLoad
	 */
	public static function get_instance() {
		if ( null === static::$instance ) {
			static::$instance = new static();
		}
		return static::$instance;
	}

	/**
	 * Check if image is a GIF file
	 *
	 * @param string $image_src image source.
	 *
	 * @return bool
	 */
	public function is_gif_file( $image_src ) {
		$filetype = wp_check_filetype( $image_src );
		return 'gif' === $filetype['ext'];
	}

	/**
	 * Get image url
	 *
	 * @param string $image_id image id.
	 * @param string $size     size.
	 *
	 * @return string
	 */
	public function get_image_url( $image_id, $size ) {
		$image = wp_get_attachment_image_src( $image_id, $size );
		$image = isset( $image[0] ) ? $image[0] : '';

		if ( $this->is_gif_file( $image ) ) {
			$image = wp_get_attachment_image_src( $image_id, 'full' );
			$image = isset( $image[0] ) ? $image[0] : '';
		}

		return $image;
	}

	/**
	 * Method alt_text
	 *
	 * @param string $id id.
	 *
	 * @return string
	 */
	public function alt_text( $id ) {
		$image = get_post( $id );

		if ( $image ) {
			$image_alt = get_post_meta( $image->ID, '_wp_attachment_image_alt', true );

			if ( empty( $image_alt ) && ! empty( $image->post_parent ) ) {
				$image_alt = wp_strip_all_tags( get_the_title( $image->post_parent ) );
			}

			return 'title="' . $image_alt . '"';
		} else {
			return '';
		}
	}

	/**
	 * Method single_hero_image
	 *
	 * @param string $id id.
	 * @param string $size size.
	 * @param bool   $prioritize prioritize.
	 *
	 * @return string
	 */
	public function single_hero_image( $id, $size, $prioritize = false ) {
		$post_thumbnail_id = get_post_thumbnail_id( $id );
		$image             = $this->get_image_url( $post_thumbnail_id, $size );

		$hidden_image = $prioritize ? '<img class="thumbnail-prioritize" src="' . esc_url( $image ) . '" style="display: none" >' : '';

		$thumbnail = '<div class="thumbnail-container thumbnail-background" data-src="' . esc_url( $image ) . '" >
                        <div class="lazyloaded" data-src="' . esc_url( $image ) . "\" style=\"background-image: url($image)\">{$hidden_image}</div>
                    </div>";

		return $thumbnail;
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
		$image_src  = wp_get_attachment_image_src( $id, $size );
		$percentage = round( $image_src[2] / $image_src[1] * 100, 3 );
		$image_url  = $this->get_image_url( $id, $size );

		$thumbnail = '<div class="thumbnail-container animate-lazy thumbnail-background" style="padding-bottom:' . $percentage . "%;\">
                        <div class=\"lazyload\" {$this->alt_text($id)} data-bgset=\"" . esc_url( $image_url ) . "\" data-expand='" . esc_attr( $this->expand_range ) . "'></div>
                      </div>";

		$image = get_post( $id );
		if ( ! empty( $image->post_excerpt ) ) {
			$thumbnail .= '<p class="wp-caption-text">' . $image->post_excerpt . '</p>';
		}

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
		$post_thumbnail_id = get_post_thumbnail_id( $id );
		return $this->single_image_unwrap( $post_thumbnail_id, $size );
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

		$additional_class  = '';
		$image             = '';
		$post_thumbnail_id = '';

		if ( ! has_post_thumbnail( $id ) ) {
			$additional_class = 'no_thumbnail';
		} else {
			$post_thumbnail_id = get_post_thumbnail_id( $id );
			$image             = $this->get_image_url( $post_thumbnail_id, $size );
		}

		$thumbnail = '<div class="thumbnail-container animate-lazy thumbnail-background ' . esc_attr( $additional_class ) . ' size-' . esc_attr( $image_size['dimension'] ) . "\">
                        <div class=\"lazyload\" {$this->alt_text($post_thumbnail_id)} data-bgset=\"$image\" data-expand='" . esc_attr( $this->expand_range ) . "'></div>
                      </div>";

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

		$image     = $this->get_image_url( $id, $size );
		$thumbnail = '<div class="thumbnail-container animate-lazy thumbnail-background size-' . esc_attr( $image_size['dimension'] ) . "\">
                        <div class=\"lazyload\" {$this->alt_text($id)} data-bgset=\"" . esc_url( $image ) . "\" data-expand='" . esc_attr( $this->expand_range ) . "'></div>
                     </div>";

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
		$image           = get_post( $id );
		$image_size      = wp_get_attachment_metadata( $id );
		$image_dimension = Image::get_instance()->get_image_size( $size );
		$image_url       = $this->get_image_url( $id, $size );
		if ( ! is_array( $image_size ) ) {
			$image_size = array(
				'width'  => '',
				'height' => '',
			);
		}

		$thumbnail = '<div class="thumbnail-container animate-lazy thumbnail-background size-' . esc_attr( $image_dimension['dimension'] ) . "\">
                        <div class=\"lazyload\" {$this->alt_text($id)} data-bgset=\"" . esc_url( $image_url ) . "\" data-expand='" . esc_attr( $this->expand_range ) . "' data-full-width=\"{$image_size['width']}\" data-full-height=\"{$image_size['height']}\" alt=\"{$image->post_excerpt}\"></div>
                      </div>";

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

		$additional_class = '';
		$image = '';
		$post_thumbnail_id = '';

		if ( ! has_post_thumbnail( $id ) ) {
			$additional_class = 'no_thumbnail';
		} else {
			$post_thumbnail_id = get_post_thumbnail_id( $id );
			$image             = $this->get_image_url( $post_thumbnail_id, $size );
		}

		$thumbnail = '<div class="thumbnail-container animate-lazy thumbnail-background size-' . esc_attr( $image_size['dimension'] ) . ' ' . esc_attr( $additional_class ) . "\">
                        <div class=\"lazyload\" {$this->alt_text($post_thumbnail_id)} data-bgset=\"" . esc_url( $image ) . "\" data-expand='" . esc_attr( $this->expand_range ) . "'></div>
                      </div>";

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
		if ( $img_size ) {
			return "<div class='thumbnail-container animate-lazy thumbnail-background size-" . esc_attr( $img_size ) . "'>
                        <div class=\"lazyload\" data-bgset=\"" . esc_url( $img_src ) . '"></div>
                    </div>';
		} else {
			return "<img src='" . esc_url( $img_src ) . "' alt='" . esc_attr( $img_title ) . "' title='" . $img_title . "'>";
		}
	}
}
