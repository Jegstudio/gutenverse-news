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
	 * Init constructor.
	 */
	public function __construct() {
		// Modular Script.
		add_filter( 'gutenverse_include_frontend', array( $this, 'load_conditional_scripts' ) );
		add_filter( 'gutenverse_include_frontend', array( $this, 'load_conditional_styles' ) );
		add_filter( 'gutenverse_conditional_script_attributes', array( $this, 'font_icon_conditional_load' ), null, 3 );
	}

	/**
	 * Icon conditional load
	 *
	 * @param mixed $conditions The value from the attributes array.
	 */
	private function icon_conditional_load( &$conditions ) {
		$conditions[] = array(
			'style' => 'fontawesome-gutenverse',
		);

		$conditions[] = array(
			'style' => 'gutenverse-iconlist',
		);

		return $conditions;
	}

	/**
	 * Conditional load font icon
	 *
	 * @param mixed  $conditions The value from the attributes array.
	 * @param string $attrs The comparison operator (e.g., '===', '!==').
	 * @param mixed  $block_name The value to compare against.
	 */
	public function font_icon_conditional_load( $conditions, $attrs, $block_name ) {
		switch ( $block_name ) {
			case 'gutenverse/news-block-1':
				// Check list icon.
				if ( ! isset( $attrs['listIconType'] ) || 'icon' === $attrs['listIconType'] ) {
					$this->icon_conditional_load( $conditions );
				}

				// Check header icon.
				if ( ! empty( $attrs['header_icon'] ) || ! empty( $attrs['icon'] ) ) {
					if ( ! isset( $attrs['iconType'] ) || 'icon' === $attrs['iconType'] ) {
						$this->icon_conditional_load( $conditions );
					}
				}
				break;

			case 'gutenverse/news-block-2':
			case 'gutenverse/news-block-3':
			case 'gutenverse/news-block-4':
			case 'gutenverse/news-block-5':
			case 'gutenverse/news-block-6':
			case 'gutenverse/news-block-7':
			case 'gutenverse/news-block-8':
			case 'gutenverse/news-block-9':
			case 'gutenverse/news-block-10':
			case 'gutenverse/news-block-11':
			case 'gutenverse/news-block-12':
			case 'gutenverse/news-block-13':
			case 'gutenverse/news-block-14':
			case 'gutenverse/news-block-15':
			case 'gutenverse/news-block-17':
			case 'gutenverse/news-block-18':
			case 'gutenverse/news-block-19':
			case 'gutenverse/news-block-20':
			case 'gutenverse/news-block-21':
			case 'gutenverse/news-block-22':
			case 'gutenverse/news-block-23':
			case 'gutenverse/news-block-25':
			case 'gutenverse/news-block-26':
			case 'gutenverse/news-block-27':
			case 'gutenverse/news-block-29':
			case 'gutenverse/news-block-30':
			case 'gutenverse/news-block-31':
			case 'gutenverse/news-block-32':
			case 'gutenverse/news-block-33':
			case 'gutenverse/news-block-34':
			case 'gutenverse/news-block-35':
			case 'gutenverse/news-block-36':
			case 'gutenverse/news-block-37':
			case 'gutenverse/news-block-38':
			case 'gutenverse/news-block-39':
				// Check header icon.
				if ( ! empty( $attrs['header_icon'] ) || ! empty( $attrs['icon'] ) ) {
					if ( ! isset( $attrs['iconType'] ) || 'icon' === $attrs['iconType'] ) {
						$this->icon_conditional_load( $conditions );
					}
				}
				break;

			case 'gutenverse/news-block-16':
			case 'gutenverse/news-block-24':
			case 'gutenverse/news-block-28':
				// Check list icon.
				if ( ! isset( $attrs['listIconType'] ) || 'icon' === $attrs['listIconType'] ) {
					$this->icon_conditional_load( $conditions );
				}
				break;

			case 'gutenverse/post-related':
				// Check list icon.
				if ( ! isset( $attrs['listIconType'] ) || 'icon' === $attrs['listIconType'] ) {
					$this->icon_conditional_load( $conditions );
				}
				break;

			case 'gutenverse/user-list':
				// Check header icon.
				if ( ! empty( $attrs['icon'] ) ) {
					if ( ! isset( $attrs['iconType'] ) || 'icon' === $attrs['iconType'] ) {
						$this->icon_conditional_load( $conditions );
					}
				}
				break;

			case 'gutenverse/header':
				// Check header icon.
				if ( ! empty( $attrs['icon'] ) ) {
					if ( ! isset( $attrs['iconType'] ) || 'icon' === $attrs['iconType'] ) {
						$this->icon_conditional_load( $conditions );
					}
				}
				break;

			case 'gutenverse/news-ticker':
				// Check main icon.
				if ( ! empty( $attrs['icon'] ) ) {
					if ( ! isset( $attrs['iconType'] ) || 'icon' === $attrs['iconType'] ) {
						$this->icon_conditional_load( $conditions );
					}
				}

				// Check next button icon.
				if ( ! isset( $attrs['nextIconType'] ) || 'icon' === $attrs['nextIconType'] ) {
					$this->icon_conditional_load( $conditions );
				}

				// Check prev button icon.
				if ( ! isset( $attrs['prevIconType'] ) || 'icon' === $attrs['prevIconType'] ) {
					$this->icon_conditional_load( $conditions );
				}
				break;
		}

		return $conditions;
	}

	/**
	 * Load the scripts
	 */
	public function load_conditional_scripts() {
		wp_register_script(
			'gutenverse-news-frontend-blocks-script',
			GUTENVERSE_NEWS_URL . '/assets/js/frontend/news-module.js',
			array( 'gutenverse-frontend-event' ),
			GUTENVERSE_NEWS_VERSION,
			true
		);

		wp_localize_script(
			'gutenverse-news-frontend-blocks-script',
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
			'gutenverse-news-frontend-hero-slider-script',
			GUTENVERSE_NEWS_URL . '/assets/js/frontend/hero-slider.js',
			array( 'gutenverse-frontend-event', 'gutenverse-tinyslider' ),
			GUTENVERSE_NEWS_VERSION,
			true
		);

		wp_register_script(
			'gutenverse-news-frontend-carousel-slider-script',
			GUTENVERSE_NEWS_URL . '/assets/js/frontend/carousel-slider.js',
			array( 'gutenverse-frontend-event', 'gutenverse-tinyslider' ),
			GUTENVERSE_NEWS_VERSION,
			true
		);

		wp_register_script(
			'gutenverse-news-frontend-slider-script',
			GUTENVERSE_NEWS_URL . '/assets/js/frontend/slider-module.js',
			array( 'gutenverse-frontend-event', 'gutenverse-tinyslider' ),
			GUTENVERSE_NEWS_VERSION,
			true
		);

		wp_register_script(
			'gutenverse-news-frontend-newsticker-script',
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
			'gutenverse-news-frontend-blocks-style',
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
				'gutenverse-news-frontend-' . $module . '-style',
				GUTENVERSE_NEWS_URL . '/assets/css/frontend/' . $module . '.css',
				null,
				GUTENVERSE_NEWS_VERSION
			);
		}
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
