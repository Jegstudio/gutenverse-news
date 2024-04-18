<?php
/**
 * Feed
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Util;

/**
 * Feed
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Feed {

	/**
	 * Method __construct
	 *
	 * @param object $feed_object feed object.
	 * @param array  $attr        attributes.
	 *
	 * @return void
	 */
	public function __construct( $feed_object, $attr ) {
		$this->attr             = $attr;
		$this->ID               = gvnews_get_rss_post_id();
		$this->title            = $feed_object->get_title();
		$this->permalink        = $feed_object->get_link();
		$this->description      = $this->excerpt( $feed_object->get_description(), isset( $attr['excerpt_length'] ) ? $attr['excerpt_length'] : 20 );
		$this->post_author_name = isset( $feed_object->get_author()->name ) ? $feed_object->get_author()->name : '';
		$this->publish_date     = $feed_object->get_date( 'U' );
		$this->update_date      = $feed_object->get_updated_date( 'U' );
		$this->featured         = isset( $attr['thumbnail'] ) ? $this->thumbnail( $feed_object->get_thumbnail() ) : '';
	}

	/**
	 * Method excerpt
	 *
	 * @param string $description description.
	 * @param array  $length      length.
	 *
	 * @return string
	 */
	private function excerpt( $description, $length ) {
		return wp_trim_words( $description, isset( $length['size'] ) ? $length['size'] : $length );
	}

	/**
	 * Method thumbnail
	 *
	 * @param string $image image.
	 *
	 * @return string
	 */
	private function thumbnail( $image ) {

		if ( is_array( $image ) ) {
			$image = $image['url'];
		}

		return $image ? '<img src="' . $image . '">' : '';
	}

	/**
	 * Method get_thumbnail
	 *
	 * @param string $size size.
	 *
	 * @return string
	 */
	public function get_thumbnail( $size ) {
		$image_size = \GUTENVERSE\NEWS\Util\Image\Image::get_instance()->get_image_size( $size );
		if ( isset( $this->attr['fallimage']['id'] ) ) {
			$fallimage = $this->attr['fallimage']['id'];
		} else {
			$fallimage = $this->attr['fallimage'];
		}
		if ( ! $this->featured && $this->attr['fallback'] ) {
			$attachment_image = wp_get_attachment_image( $fallimage, $size );
			return '<div class="thumbnail-container size-' . esc_attr( $image_size['dimension'] ) . ' ">' . ( $attachment_image ? $attachment_image : $this->featured ) . '</div>';
		}

		return $this->featured;
	}
}
