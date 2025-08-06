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
	 * Hold instance of Meta Option
	 *
	 * @var Meta_Option
	 */
	public $meta_option;



	/**
	 * Hold instance of Meta Option
	 *
	 * @var Downgrade_Plugin
	 */
	public $downgrade_plugin;




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
			defined( 'GUTENVERSE_FRAMEWORK_URL_PATH' ) || define( 'GUTENVERSE_FRAMEWORK_URL_PATH', plugins_url( GUTENVERSE_NEWS ) . '/lib/framework' );
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
		$this->frontend_assets  = new Frontend_Assets();
		$this->editor_assets    = new Editor_Assets();
		$this->style_generator  = new Style_Generator();
		$this->util             = new Util();
		$this->blocks           = new Blocks();
		$this->ajax             = new Ajax();
		$this->dashboard        = new Dashboard();
		$this->image            = Image::get_instance();
		$this->meta_option      = new Meta_Option();
		$this->downgrade_plugin = new Downgrade_Plugin();
	}

	/**
	 * Method init_hook
	 *
	 * @return void
	 */
	public function init_hook() {
		add_action( 'rest_api_init', array( $this, 'init_api' ) );
		add_action( 'wp_footer', array( $this, 'add_deprecated_popup' ) );
		add_action( 'admin_footer', array( $this, 'add_admin_deprecated_popup' ) );
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

	/**
	 * Add popup content if user login as admin/editor and Deprecated block exist on page.
	 *
	 * @return void
	 */
	public function add_deprecated_popup() {
		if ( ! apply_filters( 'gvnews_print_deprecated_popup', false ) ) {
			return;
		}
		$post_id = get_the_ID();
		if ( empty( $post_id ) ) {
			return;
		}

		$edit_url      = get_edit_post_link( $post_id );
		$downgrade_url = add_query_arg(
			array(
				'action' => 'gutenverse-news-downgrade-wizard',
				'nonce'  => wp_create_nonce( 'gutenverse-news-downgrade-wizard' ),
			),
			admin_url( 'admin.php' )
		);

		wp_enqueue_style(
			'gutenverse-roboto-font',
			GUTENVERSE_FRAMEWORK_URL_PATH . '/assets/fonts/roboto/roboto.css',
			array(),
			GUTENVERSE_FRAMEWORK_VERSION
		);
		?>
			<div id="gvnews-deprecated-popup" class="gvnews-deprecated-modal">
				<div class="gvnews-deprecated-backdrop">
					<div class="gvnews-deprecated-box">
						<button id="gvnews-popup-close" class="gvnews-popup-close">
							<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
								
							<path d="M8.93996 7.9998L11.8066 5.1398C11.9322 5.01426 12.0027 4.844 12.0027 4.66646C12.0027 4.48893 11.9322 4.31867 11.8066 4.19313C11.6811 4.0676 11.5108 3.99707 11.3333 3.99707C11.1558 3.99707 10.9855 4.0676 10.86 4.19313L7.99996 7.0598L5.13996 4.19313C5.01442 4.0676 4.84416 3.99707 4.66663 3.99707C4.48909 3.99707 4.31883 4.0676 4.19329 4.19313C4.06776 4.31867 3.99723 4.48893 3.99723 4.66646C3.99723 4.844 4.06776 5.01426 4.19329 5.1398L7.05996 7.9998L4.19329 10.8598C4.13081 10.9218 4.08121 10.9955 4.04737 11.0767C4.01352 11.158 3.99609 11.2451 3.99609 11.3331C3.99609 11.4211 4.01352 11.5083 4.04737 11.5895C4.08121 11.6708 4.13081 11.7445 4.19329 11.8065C4.25527 11.869 4.329 11.9185 4.41024 11.9524C4.49148 11.9862 4.57862 12.0037 4.66663 12.0037C4.75463 12.0037 4.84177 11.9862 4.92301 11.9524C5.00425 11.9185 5.07798 11.869 5.13996 11.8065L7.99996 8.9398L10.86 11.8065C10.9219 11.869 10.9957 11.9185 11.0769 11.9524C11.1581 11.9862 11.2453 12.0037 11.3333 12.0037C11.4213 12.0037 11.5084 11.9862 11.5897 11.9524C11.6709 11.9185 11.7447 11.869 11.8066 11.8065C11.8691 11.7445 11.9187 11.6708 11.9526 11.5895C11.9864 11.5083 12.0038 11.4211 12.0038 11.3331C12.0038 11.2451 11.9864 11.158 11.9526 11.0767C11.9187 10.9955 11.8691 10.9218 11.8066 10.8598L8.93996 7.9998Z" fill="#787C82"/>
							</svg>

						</button>	
							<div class="gvnews-deprecated-text">
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M23.413 21.5761L12.7246 1.61772C12.6512 1.49036 12.5456 1.38457 12.4184 1.31102C12.2911 1.23746 12.1468 1.19873 11.9998 1.19873C11.8528 1.19873 11.7084 1.23746 11.5812 1.31102C11.454 1.38457 11.3483 1.49036 11.275 1.61772L0.587794 21.5761C0.517085 21.7007 0.480414 21.8417 0.481467 21.9849C0.482521 22.1282 0.521261 22.2686 0.593794 22.3921C0.743794 22.6453 1.01619 22.8001 1.31139 22.8001H22.6882C22.8328 22.7996 22.9748 22.7618 23.1006 22.6903C23.2263 22.6189 23.3314 22.5161 23.4058 22.3921C23.4785 22.2687 23.5175 22.1283 23.5187 21.9851C23.52 21.8418 23.4835 21.7008 23.413 21.5761ZM13.1998 20.4001H10.7998V18.0001H13.1998V20.4001ZM13.1998 16.2001H10.7998V8.40012H13.1998V16.2001Z" fill="#EEBC0D"/>
									</svg>
								<h2>Some blocks in this page are deprecated.</h2>
								<p>We’ve detected one or more blocks on this page that are no longer supported in the latest version of <b>Gutenverse News.</b></p>
								<p>To keep your page working properly, you have two options:</p>
								<ul>
									<li>Replace deprecated blocks with supported ones.</li>
									<li>Or switch back to version 2.0.1 to continue using them.</li>
								</ul>
								<p>We recommend updating your blocks for future compatibility.</p>
								<div class="gvnews-deprecated-actions">
									<a href="<?php echo $edit_url; ?>" class="gvnews-btn gvnews-replace-btn">Replace Blocks</a>
									<a href="<?php echo $downgrade_url; ?>" class="gvnews-btn gvnews-dwongrade-btn">Switch to Version 2.0.1</a>
								</div>
							</div>
					</div>
				</div>
			</div>
		<?php
	}

	/**
	 * Add deprecated popup on block editor page.
	 *
	 * @return void
	 */
	public function add_admin_deprecated_popup() {
		if ( ! gutenverse_is_block_editor() ) {
			return;
		}

		$downgrade_url = add_query_arg(
			array(
				'action' => 'gutenverse-news-downgrade-wizard',
				'nonce'  => wp_create_nonce( 'gutenverse-news-downgrade-wizard' ),
			),
			admin_url( 'admin.php' )
		);

		?>
			<div id="gvnews-deprecated-popup" class="gvnews-deprecated-modal">
				<div class="gvnews-deprecated-backdrop">
					<div class="gvnews-deprecated-box">
						<button id="gvnews-popup-close" class="gvnews-popup-close">
							<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
								
							<path d="M8.93996 7.9998L11.8066 5.1398C11.9322 5.01426 12.0027 4.844 12.0027 4.66646C12.0027 4.48893 11.9322 4.31867 11.8066 4.19313C11.6811 4.0676 11.5108 3.99707 11.3333 3.99707C11.1558 3.99707 10.9855 4.0676 10.86 4.19313L7.99996 7.0598L5.13996 4.19313C5.01442 4.0676 4.84416 3.99707 4.66663 3.99707C4.48909 3.99707 4.31883 4.0676 4.19329 4.19313C4.06776 4.31867 3.99723 4.48893 3.99723 4.66646C3.99723 4.844 4.06776 5.01426 4.19329 5.1398L7.05996 7.9998L4.19329 10.8598C4.13081 10.9218 4.08121 10.9955 4.04737 11.0767C4.01352 11.158 3.99609 11.2451 3.99609 11.3331C3.99609 11.4211 4.01352 11.5083 4.04737 11.5895C4.08121 11.6708 4.13081 11.7445 4.19329 11.8065C4.25527 11.869 4.329 11.9185 4.41024 11.9524C4.49148 11.9862 4.57862 12.0037 4.66663 12.0037C4.75463 12.0037 4.84177 11.9862 4.92301 11.9524C5.00425 11.9185 5.07798 11.869 5.13996 11.8065L7.99996 8.9398L10.86 11.8065C10.9219 11.869 10.9957 11.9185 11.0769 11.9524C11.1581 11.9862 11.2453 12.0037 11.3333 12.0037C11.4213 12.0037 11.5084 11.9862 11.5897 11.9524C11.6709 11.9185 11.7447 11.869 11.8066 11.8065C11.8691 11.7445 11.9187 11.6708 11.9526 11.5895C11.9864 11.5083 12.0038 11.4211 12.0038 11.3331C12.0038 11.2451 11.9864 11.158 11.9526 11.0767C11.9187 10.9955 11.8691 10.9218 11.8066 10.8598L8.93996 7.9998Z" fill="#787C82"/>
							</svg>

						</button>	
							<div class="gvnews-deprecated-text">
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M23.413 21.5761L12.7246 1.61772C12.6512 1.49036 12.5456 1.38457 12.4184 1.31102C12.2911 1.23746 12.1468 1.19873 11.9998 1.19873C11.8528 1.19873 11.7084 1.23746 11.5812 1.31102C11.454 1.38457 11.3483 1.49036 11.275 1.61772L0.587794 21.5761C0.517085 21.7007 0.480414 21.8417 0.481467 21.9849C0.482521 22.1282 0.521261 22.2686 0.593794 22.3921C0.743794 22.6453 1.01619 22.8001 1.31139 22.8001H22.6882C22.8328 22.7996 22.9748 22.7618 23.1006 22.6903C23.2263 22.6189 23.3314 22.5161 23.4058 22.3921C23.4785 22.2687 23.5175 22.1283 23.5187 21.9851C23.52 21.8418 23.4835 21.7008 23.413 21.5761ZM13.1998 20.4001H10.7998V18.0001H13.1998V20.4001ZM13.1998 16.2001H10.7998V8.40012H13.1998V16.2001Z" fill="#EEBC0D"/>
									</svg>

								<div class="blocks-deprecated-text">
									<h2>Some blocks in this page are deprecated.</h2>
								<p>We’ve detected one or more blocks on this page that are no longer supported in the latest version of <b>Gutenverse News.</b></p>
								<p>To keep your page working properly, you have two options:</p>
								<ul>
									<li>Replace deprecated blocks with supported ones.</li>
									<li>Or switch back to version 2.0.1 to continue using them.</li>
								</ul>
								<p>We recommend updating your blocks for future compatibility.</p>
								</div>

								<div class="options-deprecated-text">
									<h2>This option is already deprecated.</h2>
									<p>Please use other option that not dperecated, or switch back to version 2.0.1 to continue using them.</p>
									<p>We recommend you to only use the supported option.</p>
								</div>
								
								<div class="gvnews-deprecated-actions">
									<a href="<?php echo $downgrade_url; ?>" class="gvnews-btn gvnews-dwongrade-btn">Switch to Version 2.0.1</a>
								</div>
							</div>
					</div>
				</div>
			</div>
		<?php
	}
}
