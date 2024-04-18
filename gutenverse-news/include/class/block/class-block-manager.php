<?php
/**
 * Block manager
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block;

/**
 * Block_Manager
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Block_Manager {

	/**
	 * Instance
	 *
	 * @var ModuleManager
	 */
	private static $instance;

	/**
	 * Absolute width of element
	 *
	 * @var array
	 */
	private $width = array();

	/**
	 * Module
	 *
	 * @var array
	 */
	private $module = array();

	/**
	 * Overlay slider rendered Flag
	 *
	 * @var bool
	 */
	private $overlay_slider = false;

	/**
	 * Module Counter for each element
	 *
	 * @var int
	 */
	private $module_count = 0;

	/**
	 * Unique article container
	 *
	 * @var array
	 */
	private $unique_article = array();

	/**
	 * Modules
	 *
	 * @var array
	 */
	private $module_array = array();

	/**
	 * Get instance
	 *
	 * @return ModuleManager
	 */
	public static function get_instance() {
		if ( null === static::$instance ) {
			static::$instance = new static();
		}
		return static::$instance;
	}

	/**
	 * Get file path
	 *
	 * @param string $filename file name.
	 *
	 * @return string
	 */
	public static function get_file_path( $filename ) {
		return get_parent_theme_file_path() . '/assets/img/.' . $filename;
	}


	/**
	 * Method is_overlay_slider_rendered
	 *
	 * @return bool
	 */
	public function is_overlay_slider_rendered() {
		return $this->overlay_slider;
	}

	/**
	 * Method overlay_slider_rendered
	 *
	 * @return void
	 */
	public function overlay_slider_rendered() {
		$this->overlay_slider = true;
	}

	/**
	 * Calculate width
	 *
	 * @param string $width width.
	 *
	 * @return float float
	 */
	public function calculate_width( $width ) {
		$explode = explode( '/', $width );
		if ( ! empty( $explode ) ) {
			$part_x = (int) $explode[0];
			$part_y = (int) $explode[1];
			if ( $part_x > 0 && $part_y > 0 ) {
				$value = ceil( $part_x / $part_y * 12 );
				if ( $value > 0 && $value <= 12 ) {
					$width = $value;
				}
			}
		}

		return $width;
	}

	/**
	 * Register Width
	 *
	 * @param string $width width.
	 */
	public function register_width( $width ) {
		$width         = $this->calculate_width( $width );
		$this->width[] = $width;
	}

	/**
	 * Reset Width
	 */
	public function reset_width() {
		array_pop( $this->width );
	}

	/**
	 * Get current width
	 *
	 * @return float
	 */
	public function get_current_width() {
		if ( ! empty( $this->width ) ) {
			$current_width = 12;

			foreach ( $this->width as $width ) {
				$current_width = $width / 12 * $current_width;
			}

			return ceil( $current_width );
		}

		// Default Width.
		if ( isset( $_REQUEST['colwidth'] ) ) {
			return sanitize_text_field( wp_unslash( $_REQUEST['colwidth'] ) );
		}

		return 12;
	}

	/**
	 * Set width
	 *
	 * @param string $width width.
	 */
	public function set_width( $width ) {
		$this->width = $width;
	}

	/**
	 * Force set width
	 *
	 * @param string $width width.
	 */
	public function force_set_width( $width ) {
		$this->set_width( array( $width ) );
	}

	/**
	 * Get column class
	 *
	 * @return string
	 */
	public function get_column_class() {
		$class_name = 'gvnews_col_1o3';
		$width      = $this->get_current_width();

		if ( $width >= 6 && $width <= 8 ) {
			$class_name = 'gvnews_col_2o3';
		} elseif ( $width > 8 && $width <= 12 ) {
			$class_name = 'gvnews_col_3o3';
		}

		return $class_name;
	}

	/**
	 * Increase Module Count
	 */
	public function increase_module_count() {
		++$this->module_count;
	}

	/**
	 * Get module count
	 *
	 * @return int
	 */
	public function get_module_count() {
		return $this->module_count;
	}

	/**
	 * Push unique article to array
	 *
	 * @param string $group  group.
	 * @param string $unique unique.
	 */
	public function add_unique_article( $group, $unique ) {
		if ( ! isset( $this->unique_article[ $group ] ) ) {
			$this->unique_article[ $group ] = array();
		}

		if ( is_array( $unique ) ) {
			$this->unique_article[ $group ] = array_merge( $this->unique_article[ $group ], $unique );
		} else {
			$this->unique_article[ $group ][] = $unique;
		}
	}

	/**
	 * Get unique article
	 *
	 * @param string $group group.
	 *
	 * @return array
	 */
	public function get_unique_article( $group ) {
		return isset( $this->unique_article[ $group ] ) ? $this->unique_article[ $group ] : array();
	}
}
