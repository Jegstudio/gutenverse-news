<?php
/**
 * Init
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use GUTENVERSE\NEWS\Util\Image\Image;

/**
 * Class Gutenverse News Init
 */
class Init {

	/**
	 * Instance of Init
	 *
	 * @var Init
	 */
	private static $instance;

	/**
	 * Hold instance of Blocks
	 *
	 * @var Blocks
	 */
	public $blocks;

	/**
	 * Hold instance of Editor_assets
	 *
	 * @var Editor_assets
	 */
	public $editor_assets;

	/**
	 * Hold instance of dashboard
	 *
	 * @var Dashboard
	 */
	public $dashboard;


	/**
	 * Hold instance of Frontend_assets
	 *
	 * @var Frontend_assets
	 */
	public $frontend_assets;

	/**
	 * Hold instance of Style_generator
	 *
	 * @var Style_generator
	 */
	public $style_generator;

	/**
	 * Hold instance of Image
	 *
	 * @var Image
	 */
	public $image;

	/**
	 * Hold instance of Utils
	 *
	 * @var Util
	 */
	public $util;

	/**
	 * Hold instance of Utils
	 *
	 * @var Util
	 */
	public $metabox;

	/**
	 * Hold instance of Utils
	 *
	 * @var Util
	 */
	public $ajax;



	/**
	 * Disable object cloning.
	 */
	public function __clone() {
	}

	/**
	 * Disable unserializing of the class.
	 */
	public function __wakeup() {
	}

	/**
	 * Instance of Init Gutenverse News
	 *
	 * @return Init
	 */
	public static function instance() {
		if ( ! isset( self::$instance ) && ! ( self::$instance instanceof Init ) ) {
			self::$instance = new Init();
		}
		return self::$instance;
	}


	/**
	 * Method __construct
	 *
	 * @return void
	 */
	private function __construct() {
		$this->init_hook();
		$this->register_framework();
		add_action( 'plugins_loaded', array( $this, 'plugin_loaded' ) );
		add_action( 'plugins_loaded', array( $this, 'framework_loaded' ), 99 );
		add_filter( 'gutenverse_companion_plugin_list', array( $this, 'plugin_name' ) );
		register_activation_hook( GUTENVERSE_NEWS_FILE, array( $this, 'set_activation_transient' ) );
	}

	/**
	 * Set Activation Transient
	 */
	public function set_activation_transient() {
		set_transient( 'gutenverse_redirect', 1, 30 );
	}

	/**
	 * Register Plugin name.
	 *
	 * @param array $list .
	 */
	public function plugin_name( $list ) {
		$list[] = GUTENVERSE_NEWS_NAME;

		return $list;
	}

	/**
	 * Only load when framework already loaded.
	 */
	public function framework_loaded() {
		$this->init_instance();
		$this->load_textdomain();
	}

	/**
	 * Method register_framework
	 *
	 * @return void
	 */
	public function register_framework() {
		require_once GUTENVERSE_NEWS_DIR . 'lib/framework/init.php';
		$init = \Gutenverse_Initialize_Framework::instance();

		$framework_file    = GUTENVERSE_NEWS_DIR . 'lib/framework/bootstrap.php';
		$framework_version = $init->get_framework_version( $framework_file );
		$init->register_version( GUTENVERSE_NEWS, $framework_version );
	}

	/**
	 * Check if we can load framework.
	 *
	 * @return boolean
	 */
	public function can_load_framework() {
		require_once GUTENVERSE_NEWS_DIR . 'lib/framework/init.php';
		$init = \Gutenverse_Initialize_Framework::instance();

		return $init->can_load_version( GUTENVERSE_NEWS );
	}


	/**
	 * Method plugin_loaded
	 *
	 * @return void
	 */
	public function plugin_loaded() {
		require_once GUTENVERSE_NEWS_DIR . 'lib/framework/init.php';
		$init = \Gutenverse_Initialize_Framework::instance();
		if ( $init->check_compatibility() ) {
			$this->init_framework();
		}
	}


	/**
	 * Method init_framework
	 *
	 * @return void
	 */
	public function init_framework() {
		if ( $this->can_load_framework() ) {
			require_once GUTENVERSE_NEWS_DIR . 'lib/framework/bootstrap.php';
		}
	}


	/**
	 * Method init_instance
	 *
	 * @return void
	 */
	public function init_instance() {
		include_once ABSPATH . 'wp-admin/includes/plugin.php';
		$this->frontend_assets = new Frontend_Assets();
		$this->editor_assets   = new Editor_Assets();
		$this->style_generator = new Style_Generator();
		$this->util            = new Util();
		$this->blocks          = new Blocks();
		$this->ajax            = new Ajax();
		$this->dashboard       = new Dashboard();
		$this->image           = Image::get_instance();
	}

	/**
	 * Method init_hook
	 *
	 * @return void
	 */
	public function init_hook() {
		add_action( 'rest_api_init', array( $this, 'init_api' ) );
	}

	/**
	 * Method init_api
	 *
	 * @return void
	 */
	public function init_api() {
		new Api();
	}

	/**
	 * Method load_textdomain
	 *
	 * @return void
	 */
	public function load_textdomain() {
		add_action( 'rest_api_init', array( $this, 'init_api' ) );
		load_plugin_textdomain( 'gutenverse-news', false, GUTENVERSE_NEWS_LANG_DIR );
	}
}
