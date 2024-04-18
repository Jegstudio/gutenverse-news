<?php
/**
 * Image
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Util\Image;

/**
 * Image
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Image {


	/**
	 * Instance
	 *
	 * @var Image
	 */
	private static $instance;

	/**
	 * Image Size
	 *
	 * @var array
	 */
	private $image_size = array();

	/**
	 * Prefix
	 *
	 * @var string
	 */
	private $prefix = 'gvnews-';

	/**
	 *  Get instance
	 *
	 * @return Image
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
		$this->setup_image_size();

		add_action( 'wp_loaded', array( $this, 'image_hook' ) );

		add_action( 'after_setup_theme', array( $this, 'generate_image' ), 99 );
	}

	/**
	 * Method generate_image
	 *
	 * @return void
	 */
	public function generate_image() {
		add_action( 'init', array( $this, 'add_image_size' ) );
	}

	/**
	 * Method image_hook
	 *
	 * @return void
	 */
	public function image_hook() {

		$image = Image_Normal_Load::get_instance();

		add_filter( 'gvnews_image_thumbnail', array( $image, 'image_thumbnail' ), null, 2 );
		add_filter( 'gvnews_image_thumbnail_unwrap', array( $image, 'image_thumbnail_unwrap' ), null, 2 );
		add_filter( 'gvnews_image_lazy_owl', array( $image, 'owl_lazy_image' ), null, 2 );
		add_filter( 'gvnews_single_image_lazy_owl', array( $image, 'owl_lazy_single_image' ), null, 2 );

		add_filter( 'gvnews_single_image_unwrap', array( $image, 'single_image_unwrap' ), null, 2 );
		add_filter( 'gvnews_single_image_owl', array( $image, 'owl_single_image' ), null, 2 );

		add_filter( 'gvnews_single_image', array( $image, 'single_image' ), null, 3 );
		add_filter( 'image_size_names_choose', array( $this, 'custom_size' ) );
	}

	/**
	 * Method custom_size
	 *
	 * @param array $sizes sizes.
	 *
	 * @return array
	 */
	public function custom_size( $sizes ) {
		$this->setup_image_size();
		foreach ( $this->image_size as $key => $size ) {
			$sizes[ $key ] = esc_html__( 'Custom Size', 'gutenverse-news' );
		}
		return $sizes;
	}

	/**
	 * Method get_image_size
	 *
	 * @param string $size size.
	 *
	 * @return string
	 */
	public function get_image_size( $size ) {
		return $this->image_size[ $size ];
	}

	/**
	 * Method setup_image_size
	 *
	 * @return void
	 */
	public function setup_image_size() {
		$this->image_size = array(
			// dimension : 0.5.
			$this->prefix . '360x180'       => array(
				'width'     => 360,
				'height'    => 180,
				'crop'      => true,
				'dimension' => 500,
			),
			$this->prefix . '750x375'       => array(
				'width'     => 750,
				'height'    => 375,
				'crop'      => true,
				'dimension' => 500,
			),
			$this->prefix . '1140x570'      => array(
				'width'     => 1140,
				'height'    => 570,
				'crop'      => true,
				'dimension' => 500,
			),

			// dimension : 0.715.
			$this->prefix . '120x86'        => array(
				'width'     => 120,
				'height'    => 86,
				'crop'      => true,
				'dimension' => 715,
			),
			$this->prefix . '350x250'       => array(
				'width'     => 350,
				'height'    => 250,
				'crop'      => true,
				'dimension' => 715,
			),
			$this->prefix . '750x536'       => array(
				'width'     => 750,
				'height'    => 536,
				'crop'      => true,
				'dimension' => 715,
			),
			$this->prefix . '1140x815'      => array(
				'width'     => 1140,
				'height'    => 815,
				'crop'      => true,
				'dimension' => 715,
			),

			// dimension.
			$this->prefix . '360x504'       => array(
				'width'     => 360,
				'height'    => 504,
				'crop'      => true,
				'dimension' => 1400,
			),

			// dimension 1.
			$this->prefix . '75x75'         => array(
				'width'     => 75,
				'height'    => 75,
				'crop'      => true,
				'dimension' => 1000,
			),
			$this->prefix . '350x350'       => array(
				'width'     => 350,
				'height'    => 350,
				'crop'      => true,
				'dimension' => 1000,
			),

			// featured post.
			$this->prefix . 'featured-750'  => array(
				'width'     => 750,
				'height'    => 0,
				'crop'      => true,
				'dimension' => 1000,
			),
			$this->prefix . 'featured-1140' => array(
				'width'     => 1140,
				'height'    => 0,
				'crop'      => true,
				'dimension' => 1000,
			),
		);
	}

	/**
	 * Method add_image_size
	 *
	 * @return void
	 */
	public function add_image_size() {
		foreach ( $this->image_size as $id => $image ) {
			add_image_size( $id, $image['width'], $image['height'], $image['crop'] );
		}
	}


	/**
	 * Parse image size.
	 *
	 * @param string $string string.
	 *
	 * @return array
	 */
	public function parse_size( $string ) {
		$size = array();

		if ( ! is_array( $string ) && substr( $string, 0, strlen( $this->prefix ) ) === $this->prefix ) {
			$string = substr( $string, strlen( $this->prefix ) );
			$array  = explode( 'x', $string );

			foreach ( $array as $key => $value ) {
				$value = absint( trim( $value ) );

				if ( ! $value ) {
					continue;
				}

				if ( 0 === $key ) {
					$size['width'] = $value;
				}

				if ( 1 === $key ) {
					$size['height'] = $value;
				}
			}
		} else {
			return $string;
		}

		return $size;
	}


	/**
	 * Create a new image by cropping the original image based on given size.
	 *
	 * @since  1.0.0
	 * @access public
	 * @param  integer $id     id.
	 * @param  integer $width  width.
	 * @param  integer $height height.
	 * @param  boolean $crop   crop.
	 * @return array
	 */
	public function make_image( $id, $width, $height = 999999, $crop = false ) {
		$image  = get_attached_file( $id );
		$editor = wp_get_image_editor( $image );

		if ( ! is_wp_error( $editor ) ) {
			$editor->resize( $width, $height, $crop );
			$editor->set_quality( 100 );

			$filename = $editor->generate_filename();

			return $editor->save( $filename );
		}
	}
}
