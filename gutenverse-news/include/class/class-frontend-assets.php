<?php
/**
 * Frontend Script Class
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS;

/**
 * Class Frontend Script
 *
 * @package gutenverse-news
 */
class Frontend_Assets {


	/**
	 * Init constructor.
	 */
	public function __construct() {
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_frontend_scripts' ), 99 );
	}

	/**
	 * Frontend Script
	 */
	public function enqueue_frontend_scripts() {
		$this->frontend_styles();
		$this->frontend_scripts();
	}

	/**
	 * Method frontend_styles
	 *
	 * @return void
	 */
	public function frontend_styles() {
		wp_enqueue_style(
			'gvnews-block-frontend-style',
			GUTENVERSE_NEWS_URL . '/assets/css/blocks-styles.css',
			array(),
			GUTENVERSE_NEWS_VERSION
		);

		wp_enqueue_style(
			'gvnews-icon',
			GUTENVERSE_NEWS_URL . '/assets/fonts/jegicon/jegicon.css',
			array(),
			GUTENVERSE_NEWS_VERSION
		);

		wp_enqueue_style(
			'gvnews-icon-webfont',
			GUTENVERSE_NEWS_URL . '/assets/fonts/jegicon/fonts/jegicon.woff',
			array(),
			GUTENVERSE_NEWS_VERSION
		);
	}

	/**
	 * Method frontend_scripts
	 *
	 * @return void
	 */
	public function frontend_scripts() {
		$helper = include GUTENVERSE_NEWS_DIR . 'lib/dependencies/helper.asset.php';
		wp_register_script( 'gvnews-isotope', GUTENVERSE_NEWS_URL . '/assets/js/isotope.js', array(), GUTENVERSE_NEWS_VERSION, true );
		wp_register_script( 'gvnews-helper-script', GUTENVERSE_NEWS_URL . '/assets/js/helper.js', array_merge( $helper['dependencies'], array( 'jquery', 'gvnews-isotope' ) ), GUTENVERSE_NEWS_VERSION, true );
		wp_localize_script( 'gvnews-helper-script', 'GVNewsConfig', $this->gvnews_config() );
		wp_enqueue_script( 'imagesloaded' );
		wp_enqueue_script( 'gvnews-isotope' );
		wp_enqueue_script( 'gvnews-helper-script' );
	}

	/**
	 * Config
	 *
	 * @return array
	 */
	public function gvnews_config() {
		$config = array(
			'live_search'   => true,
			'ajax_url'      => add_query_arg( array( 'ajax-request' => 'gvnews' ) ),
			'module_prefix' => 'gvnews_module_ajax_',
		);
		return $config;
	}
}
