<?php
/**
 * Cache
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Util;

/**
 * Options
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Options {

	/**
	 * Instance
	 *
	 * @var Options
	 */
	private static $instance;
	/**
	 * All gutenverse News Options.
	 *
	 * @var array
	 */
	public $options;

	/**
	 * Module Options
	 *
	 * @var array|false
	 */
	public $module_options = false;

	/**
	 * Gutenverse News Options Class.
	 *
	 * @return Options
	 */
	public static function get_instance() {
		if ( null === static::$instance ) {
			static::$instance = new static();
		}
		return static::$instance;
	}


	/**
	 * Options class cunstructor.
	 */
	public function __construct() {
		$this->options = get_option( 'gvnews_settings', array() );
	}

	/**
	 * Set global block options.
	 *
	 * @return void
	 */
	private function set_module_options() {
		$this->module_options = isset( $this->options['block_settings'] ) ? $this->options['block_settings'] : array();
	}


	/**
	 * Get global blocks option
	 *
	 * @param string         $key option key.
	 * @param string|boolean $def default value.
	 * @return string|boolean option value.
	 */
	public function get_block_option( $key, $def ) {
		if ( ! $this->module_options ) {
			$this->set_module_options();
		}
		return ( isset( $this->module_options[ $key ] ) ) ? $this->module_options[ $key ] : $def;
	}
}
