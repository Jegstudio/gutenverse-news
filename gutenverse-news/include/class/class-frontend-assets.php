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
		$depen = array( 'jquery' );
		if ( $this->load_block_script( array( 'gvnews/block-32', 'gvnews/block-33', 'gvnews/block-34' ) ) ) {
			wp_register_script( 'gvnews-isotope', GUTENVERSE_NEWS_URL . '/assets/js/isotope.js', array(), GUTENVERSE_NEWS_VERSION, true );
			wp_enqueue_script( 'gvnews-isotope' );
			$depen = array_merge( $depen, array( 'gvnews-isotope' ) );
		}

		if ( $this->load_block_script( array( 'gvnews/news-ticker' ) ) ) {
			$helper = include GUTENVERSE_NEWS_DIR . 'lib/dependencies/newsticker.asset.php';
			wp_register_script( 'gvnews-newsticker', GUTENVERSE_NEWS_URL . '/assets/js/newsticker.js', array(), GUTENVERSE_NEWS_VERSION, true );
			wp_enqueue_script( 'gvnews-newsticker' );
			$depen = array_merge( array_merge( $depen, $helper['dependencies'] ), array( 'gvnews-newsticker' ) );
		}

		if ( $this->load_block_script(
			array(
				'gvnews/slider-1',
				'gvnews/slider-2',
				'gvnews/slider-3',
				'gvnews/slider-4',
				'gvnews/slider-5',
				'gvnews/slider-6',
				'gvnews/slider-7',
				'gvnews/slider-8',
				'gvnews/slider-9',
				'gvnews/carousel-1',
				'gvnews/carousel-2',
				'gvnews/carousel-3',
				'gvnews/hero-1',
				'gvnews/hero-2',
				'gvnews/hero-3',
				'gvnews/hero-4',
				'gvnews/hero-5',
				'gvnews/hero-6',
				'gvnews/hero-7',
				'gvnews/hero-8',
				'gvnews/hero-9',
				'gvnews/hero-10',
				'gvnews/hero-11',
				'gvnews/hero-12',
				'gvnews/hero-13',
				'gvnews/hero-14',
				'gvnews/hero-skew',
			)
		) ) {
			$helper = include GUTENVERSE_NEWS_DIR . 'lib/dependencies/tinyslider.asset.php';
			wp_register_script( 'gvnews-tinyslider', GUTENVERSE_NEWS_URL . '/assets/js/tinyslider.js', array(), GUTENVERSE_NEWS_VERSION, true );
			wp_enqueue_script( 'gvnews-tinyslider' );
			$depen = array_merge( array_merge( $depen, $helper['dependencies'] ), array( 'gvnews-tinyslider' ) );
		}

		if ( $this->load_block_script( array( 'gvnews/slider-1', 'gvnews/slider-2', 'gvnews/slider-3', 'gvnews/slider-4', 'gvnews/slider-5', 'gvnews/slider-6', 'gvnews/slider-7', 'gvnews/slider-8', 'gvnews/slider-9' ) ) ) {
			$helper = include GUTENVERSE_NEWS_DIR . 'lib/dependencies/slider.asset.php';
			wp_register_script( 'gvnews-slider', GUTENVERSE_NEWS_URL . '/assets/js/slider.js', array( 'gvnews-tinyslider', 'gvnews-helper-script' ), GUTENVERSE_NEWS_VERSION, true );
			wp_enqueue_script( 'gvnews-slider' );
		}

		if ( $this->load_block_script( array( 'gvnews/carousel-1', 'gvnews/carousel-2', 'gvnews/carousel-3' ) ) ) {
			$helper = include GUTENVERSE_NEWS_DIR . 'lib/dependencies/carousel.asset.php';
			wp_register_script( 'gvnews-carousel', GUTENVERSE_NEWS_URL . '/assets/js/carousel.js', array( 'gvnews-tinyslider', 'gvnews-helper-script' ), GUTENVERSE_NEWS_VERSION, true );
			wp_enqueue_script( 'gvnews-carousel' );
		}
		if ( $this->load_block_script(
			array(
				'gvnews/hero-1',
				'gvnews/hero-2',
				'gvnews/hero-3',
				'gvnews/hero-4',
				'gvnews/hero-5',
				'gvnews/hero-6',
				'gvnews/hero-7',
				'gvnews/hero-8',
				'gvnews/hero-9',
				'gvnews/hero-10',
				'gvnews/hero-11',
				'gvnews/hero-12',
				'gvnews/hero-13',
				'gvnews/hero-14',
				'gvnews/hero-skew',
			)
		) ) {
			$helper = include GUTENVERSE_NEWS_DIR . 'lib/dependencies/hero.asset.php';
			wp_register_script( 'gvnews-hero', GUTENVERSE_NEWS_URL . '/assets/js/hero.js', array( 'gvnews-tinyslider', 'gvnews-helper-script' ), GUTENVERSE_NEWS_VERSION, true );
			wp_enqueue_script( 'gvnews-hero' );
		}

		$helper = include GUTENVERSE_NEWS_DIR . 'lib/dependencies/helper.asset.php';
		wp_register_script( 'gvnews-helper-script', GUTENVERSE_NEWS_URL . '/assets/js/helper.js', array_merge( $helper['dependencies'], $depen ), GUTENVERSE_NEWS_VERSION, true );
		wp_localize_script( 'gvnews-helper-script', 'GVNewsConfig', $this->gvnews_config() );
		wp_enqueue_script( 'imagesloaded' );
		wp_enqueue_script( 'gvnews-helper-script' );
	}

	/**
	 * Method load_block_script
	 *
	 * @param array $block_names array block names.
	 * @return boolean
	 */
	public function load_block_script( $block_names = array() ) {
		foreach ( $block_names as $block_name ) {
			if ( has_block( $block_name ) ) {
				return true;
			}
		}
		return false;
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
