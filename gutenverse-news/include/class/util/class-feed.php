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
	 * RSS Feed atribute
	 *
	 * @var array
	 */
	public $attr;

	/**
	 * RSS Feed Post ID
	 *
	 * @var string
	 */
	public $ID;

	/**
	 * RSS Feed Title
	 *
	 * @var string
	 */
	public $title;

	/**
	 * RSS Feed Permalink
	 *
	 * @var string
	 */
	public $permalink;

	/**
	 * RSS Feed Description
	 *
	 * @var string
	 */
	public $description;

	/**
	 * RSS Feed Post Author Name
	 *
	 * @var string
	 */
	public $post_author_name;

	/**
	 * RSS Feed Post Author  URL
	 *
	 * @var string
	 */
	public $post_author_url;

	/**
	 * RSS Feed Post Published Date
	 *
	 * @var integer
	 */
	public $publish_date;

	/**
	 * RSS Feed Post Update Date
	 *
	 * @var integer||null
	 */
	public $update_date;

	/**
	 * RSS Feed Post Update Date
	 *
	 * @var integer
	 */
	public $featured;

	/**
	 * Thumbnail URL
	 *
	 * @var strng
	 */
	public $thumbnail_url;

	/**
	 * RSS Feed Filter
	 *
	 * @var string
	 */
	public $filter;

	/**
	 * Method __construct
	 *
	 * @param \SimplePie\Item|object $feed_object feed object.
	 * @param array                  $attr        attributes.
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
		$this->post_author_url  = isset( $this->permalink ) ? $this->permalink : '#';
		$this->publish_date     = $feed_object->get_date( 'U' );
		$this->update_date      = $feed_object->get_updated_date( 'U' );
		$this->featured         = $attr['thumbnail'] ? $this->thumbnail( $feed_object ) : '';
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
	 * @param \SimplePie\Item|object $feed_object Feed Object.
	 *
	 * @return html|string
	 */
	private function thumbnail( $feed_object ) {
		$image_thumnail = $feed_object->get_thumbnail();

		if ( is_array( $image_thumnail ) ) {
			$image = $image_thumnail['url'];
		} else {
			$enclosure = $feed_object->get_enclosure();

			if ( is_object( $enclosure ) && ! empty( $enclosure->link ) && $this->is_image_link( $enclosure ) ) {
				$image = $enclosure->link;
			} else {
				$first_image = $this->get_first_image_url( $feed_object->get_content() );

				$image = ! empty( $first_image ) ? $first_image : false;
			}
		}

		$this->thumbnail_url = $image;

		if ( isset( $this->attr['thumbnail_size'] ) && empty( $image ) ) {
			switch ( $this->attr['thumbnail_size'] ) {
				case '1':
					$thumbnail_size = 'gvnews-120x86';
					break;
				case '3':
				case '2':
				default:
					$thumbnail_size = 'gvnews-350x250';
					break;
			}
			$this->featured = $this->get_thumbnail( $thumbnail_size );
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
			$attachment_image    = wp_get_attachment_image( $fallimage, $size );
			$this->thumbnail_url = wp_get_attachment_url( $fallimage );
			return '<div class="thumbnail-container size-' . esc_attr( $image_size['dimension'] ) . ' ">' . ( $attachment_image ? $attachment_image : $this->featured ) . '<div class="gvnews-thumb-overlay"></div></div>';
		}

		return '<div class="thumbnail-container size-' . esc_attr( $image_size['dimension'] ) . ' ">' . ( $this->featured ) . '<div class="gvnews-thumb-overlay"></div></div>';
	}

	/**
	 * Get first image from RSS feed content if the content not provide the post thumbnial from enclosure tag.
	 *
	 * @since x.x.x
	 *
	 * @param html|string $html an string that contain post content.
	 */
	private function get_first_image_url( $html ) {
		if ( ! empty( $html ) && preg_match( '/<img.+?src="(.+?)"/', $html, $matches ) ) {
			return $matches[1];
		}

		return false;
	}

	/**
	 * Check if enclosure link type is image
	 *
	 * @since x.x.x
	 *
	 * @param object $enclosure enclusure content from RSS Feeds items.
	 */
	private function is_image_link( $enclosure ) {
		if ( isset( $enclosure->type ) && strpos( $enclosure->type, 'image/' ) === 0 ) {
			return true;
		}

		$img_extension = array( 'jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg' );
		$path          = wp_parse_url( $enclosure->link, PHP_URL_PATH );
		$extension     = strtolower( pathinfo( $path, PATHINFO_EXTENSION ) );

		if ( isset( $extension ) && in_array( $extension, $img_extension ) ) {
			return true;
		} else {
			$headers = get_headers( $enclosure->link, 1 );

			if ( isset( $headers['Content-Type'] ) ) {
				if ( strpos( $headers['Content-Type'], 'image/' ) === 0 ) {
					return true;
				}
			}
		}

		return false;
	}

	/**
	 * Check if need to render thumbnail or not.
	 *
	 * @return boolean
	 */
	public function is_render_thumb() {
		return ! empty( $this->featured ) ? true : $this->attr['fallback'];
	}
}
