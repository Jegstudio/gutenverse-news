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
		if ( $this->load_block_script(
			array(
				'gutenverse/news-block-32',
				'gutenverse/news-block-33',
				'gutenverse/news-block-34',
			)
		) ) {
			wp_register_script( 'gvnews-isotope', GUTENVERSE_NEWS_URL . '/assets/js/isotope.js', array(), GUTENVERSE_NEWS_VERSION, true );
			wp_enqueue_script( 'gvnews-isotope' );
			$depen = array_merge( $depen, array( 'gvnews-isotope' ) );
		}

		if ( $this->load_block_script(
			array(
				'gutenverse/news-news-ticker',
			)
		) ) {
			$helper = include GUTENVERSE_NEWS_DIR . 'lib/dependencies/newsticker.asset.php';
			wp_register_script( 'gvnews-newsticker', GUTENVERSE_NEWS_URL . '/assets/js/newsticker.js', array(), GUTENVERSE_NEWS_VERSION, true );
			wp_enqueue_script( 'gvnews-newsticker' );
			$depen = array_merge( array_merge( $depen, $helper['dependencies'] ), array( 'gvnews-newsticker' ) );
		}

		if ( $this->load_block_script(
			array(
				'gutenverse/news-slider-1',
				'gutenverse/news-slider-2',
				'gutenverse/news-slider-3',
				'gutenverse/news-slider-4',
				'gutenverse/news-slider-5',
				'gutenverse/news-slider-6',
				'gutenverse/news-slider-7',
				'gutenverse/news-slider-8',
				'gutenverse/news-slider-9',
				'gutenverse/news-carousel-1',
				'gutenverse/news-carousel-2',
				'gutenverse/news-carousel-3',
				'gutenverse/news-hero-1',
				'gutenverse/news-hero-2',
				'gutenverse/news-hero-3',
				'gutenverse/news-hero-4',
				'gutenverse/news-hero-5',
				'gutenverse/news-hero-6',
				'gutenverse/news-hero-7',
				'gutenverse/news-hero-8',
				'gutenverse/news-hero-9',
				'gutenverse/news-hero-10',
				'gutenverse/news-hero-11',
				'gutenverse/news-hero-12',
				'gutenverse/news-hero-13',
				'gutenverse/news-hero-14',
				'gutenverse/news-hero-skew',
			)
		) ) {
			$helper = include GUTENVERSE_NEWS_DIR . 'lib/dependencies/tinyslider.asset.php';
			wp_register_script( 'gvnews-tinyslider', GUTENVERSE_NEWS_URL . '/assets/js/tinyslider.js', array(), GUTENVERSE_NEWS_VERSION, true );
			wp_enqueue_script( 'gvnews-tinyslider' );
			$depen = array_merge( array_merge( $depen, $helper['dependencies'] ), array( 'gvnews-tinyslider' ) );
		}

		if ( $this->load_block_script(
			array(
				'gutenverse/news-slider-1',
				'gutenverse/news-slider-2',
				'gutenverse/news-slider-3',
				'gutenverse/news-slider-4',
				'gutenverse/news-slider-5',
				'gutenverse/news-slider-6',
				'gutenverse/news-slider-7',
				'gutenverse/news-slider-8',
				'gutenverse/news-slider-9',
			)
		) ) {
			$helper = include GUTENVERSE_NEWS_DIR . 'lib/dependencies/slider.asset.php';
			wp_register_script( 'gvnews-slider', GUTENVERSE_NEWS_URL . '/assets/js/slider.js', array( 'gvnews-tinyslider', 'gvnews-helper-script' ), GUTENVERSE_NEWS_VERSION, true );
			wp_enqueue_script( 'gvnews-slider' );
		}

		if ( $this->load_block_script(
			array(
				'gutenverse/news-carousel-1',
				'gutenverse/news-carousel-2',
				'gutenverse/news-carousel-3',
			)
		) ) {
			$helper = include GUTENVERSE_NEWS_DIR . 'lib/dependencies/carousel.asset.php';
			wp_register_script( 'gvnews-carousel', GUTENVERSE_NEWS_URL . '/assets/js/carousel.js', array( 'gvnews-tinyslider', 'gvnews-helper-script' ), GUTENVERSE_NEWS_VERSION, true );
			wp_enqueue_script( 'gvnews-carousel' );
		}
		if ( $this->load_block_script(
			array(
				'gutenverse/news-hero-1',
				'gutenverse/news-hero-2',
				'gutenverse/news-hero-3',
				'gutenverse/news-hero-4',
				'gutenverse/news-hero-5',
				'gutenverse/news-hero-6',
				'gutenverse/news-hero-7',
				'gutenverse/news-hero-8',
				'gutenverse/news-hero-9',
				'gutenverse/news-hero-10',
				'gutenverse/news-hero-11',
				'gutenverse/news-hero-12',
				'gutenverse/news-hero-13',
				'gutenverse/news-hero-14',
				'gutenverse/news-hero-skew',
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
