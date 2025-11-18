<?php
/**
 * Frontend Script Class
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS;

use Gutenverse\Framework\Init;

/**
 * Class Frontend Script
 *
 * @package gutenverse-news
 */
class Frontend_Assets {

	/**
	 * News Block Data
	 *
	 * @var array
	 */
	protected $news_block_data = array();

	/**
	 * Check if Bypass
	 *
	 * @var boolean
	 */
	protected $is_bypass = false;

	/**
	 * Get file name
	 *
	 * @var string
	 */
	protected $file_name = '';

	/**
	 * News Block File Data
	 *
	 * @var array
	 */
	protected $news_file = array();

	/**
	 * Init constructor.
	 */
	public function __construct() {
		add_filter( 'gutenverse_bypass_generate_style', array( $this, 'bypass_generate_css' ), 20, 2 );
		add_action( 'gutenverse_loop_blocks', array( $this, 'loop_blocks' ), null, 2 );
		add_action( 'gutenverse_after_style_loop_blocks', array( $this, 'get_blocks' ), null );

		// Modular Script.
		add_filter( 'gutenverse_include_frontend', array( $this, 'load_conditional_scripts' ) );
		add_filter( 'gutenverse_include_frontend', array( $this, 'load_conditional_styles' ) );
	}

	/**
	 * Load the scripts
	 */
	public function load_conditional_scripts() {
		wp_register_script(
			'gutenverse-frontend-blocks-script',
			GUTENVERSE_NEWS_URL . '/assets/js/frontend/news-module.js',
			array( 'gutenverse-frontend-event' ),
			GUTENVERSE_NEWS_VERSION,
			true
		);

		wp_localize_script(
			'gutenverse-frontend-blocks-script',
			'GVNewsConfig',
			$this->gvnews_config()
		);

		wp_register_script(
			'gutenverse-tinyslider',
			GUTENVERSE_NEWS_URL . '/assets/js/frontend/tiny-slider.js',
			array(),
			GUTENVERSE_NEWS_VERSION,
			true
		);

		wp_register_script(
			'gutenverse-frontend-hero-slider-script',
			GUTENVERSE_NEWS_URL . '/assets/js/frontend/hero-slider.js',
			array( 'gutenverse-frontend-event', 'gutenverse-tinyslider' ),
			GUTENVERSE_NEWS_VERSION,
			true
		);

		wp_register_script(
			'gutenverse-frontend-carousel-slider-script',
			GUTENVERSE_NEWS_URL . '/assets/js/frontend/carousel-slider.js',
			array( 'gutenverse-frontend-event', 'gutenverse-tinyslider' ),
			GUTENVERSE_NEWS_VERSION,
			true
		);

		wp_register_script(
			'gutenverse-frontend-slider-script',
			GUTENVERSE_NEWS_URL . '/assets/js/frontend/slider-module.js',
			array( 'gutenverse-frontend-event', 'gutenverse-tinyslider' ),
			GUTENVERSE_NEWS_VERSION,
			true
		);

		wp_register_script(
			'gutenverse-frontend-newsticker-script',
			GUTENVERSE_NEWS_URL . '/assets/js/frontend/newsticker-module.js',
			array( 'gutenverse-frontend-event' ),
			GUTENVERSE_NEWS_VERSION,
			true
		);

		wp_register_script(
			'gvnews-deprecated-blocks',
			GUTENVERSE_NEWS_URL . '/assets/js/deprecated-block.js',
			array( 'wp-api-fetch' ),
			GUTENVERSE_NEWS_VERSION,
			true
		);

		wp_localize_script(
			'gvnews-deprecated-blocks',
			'GVNwsDeprecated',
			array(
				'isPro'     => gutenverse_pro_active(),
				'dismissed' => get_transient( 'deprecated_gutenverse_news_dismissed' ),
				'apiNonce'  => wp_create_nonce( 'gvnews_dismiss_notice' ),
			)
		);
	}

	/**
	 * Load the styles
	 */
	public function load_conditional_styles() {
		/** Register Block / Module */
		wp_register_style(
			'gutenverse-frontend-blocks-style',
			GUTENVERSE_NEWS_URL . '/assets/css/blocks-styles.css',
			array(),
			GUTENVERSE_NEWS_VERSION
		);

		/** Register Post Block */
		$modules = array(
			'post-author',
			'post-breadcrumb',
			'post-comment',
			'post-featured-image',
			'post-meta',
			'post-prev-next',
			'post-related',
			'post-tag',
			'post-title',
		);

		foreach ( $modules as $module ) {
			wp_register_style(
				'gutenverse-frontend-' . $module . '-style',
				GUTENVERSE_NEWS_URL . '/assets/css/frontend/' . $module . '.css',
				null,
				GUTENVERSE_NEWS_VERSION
			);
		}
	}


	/**
	 * Loop Block.
	 */
	public function get_blocks() {
		if ( $this->is_bypass ) {
			$cache           = Init::instance()->style_cache;
			$validation_data = $this->news_block_data;
			if ( $this->news_block_data ) {
				$cache->create_cache_file( $this->file_name, wp_json_encode( $validation_data, true ) );
			}
			$this->news_file[]     = $this->file_name;
			$this->news_block_data = array();
			$this->is_bypass       = false;
		}
	}

	/**
	 * Loop Block.
	 *
	 * @param array  $block Array of Blocks.
	 * @param string $style $style content.
	 */
	public function loop_blocks( $block, &$style ) {
		$this->get_news_block_data( $block );
	}

	/**
	 * Loop Block.
	 *
	 *  @param array $block Block Array.
	 */
	public function get_news_block_data( $block ) {
		if ( ! empty( $block['blockName'] ) && strpos( $block['blockName'], 'gutenverse/news' ) !== false ) {
			$this->news_block_data[] = $block['blockName'];
		}
	}

	/**
	 * Check if we going to by pass css generation.
	 *
	 * @param boolean $flag Flag.
	 * @param string  $name Name of file.
	 *
	 * @return bool
	 */
	public function bypass_generate_css( $flag, $name ) {
		if ( 'direct' !== apply_filters( 'gutenverse_frontend_render_mechanism', 'direct' ) ) {
			$cache    = Init::instance()->style_cache;
			$cache_id = $cache->get_style_cache_id();
			$filename = $name . '-news-script-' . $cache_id . '.json';
			if ( ! $cache->is_file_exist( $filename ) ) {
				$this->file_name       = $filename;
				$this->is_bypass       = true;
				$this->news_block_data = array();
				return false;
			} else {
				$this->news_file[] = $filename;
			}
		}

		return $flag;
	}

	/**
	 * Method load_block_script
	 *
	 * @param array $block_script_data array block names.
	 * @param array $block_names array block names.
	 * @return boolean
	 */
	public function load_block_script( $block_script_data = array(), $block_names = array() ) {
		return ! empty( array_intersect( $block_script_data, $block_names ) );
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
