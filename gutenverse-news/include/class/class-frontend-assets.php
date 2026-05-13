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
	 * Get default attribute value from block.json
	 *
	 * @param string $block_name Block name (e.g. gutenverse/news-block-1)
	 * @param string $attr Attribute name
	 * @return mixed|null
	 */
	private function get_block_default_attr( $block_name, $attr ) {
		static $cache = array();

		$root = GUTENVERSE_NEWS_DIR;

		// normalize block folder name
		if ( 0 === strpos( $block_name, 'gutenverse/news-' ) ) {
			$slug = substr( $block_name, strlen( 'gutenverse/news-' ) );
		} else {
			$slug = $block_name;
		}

		$folder = $slug;
		if ( preg_match( '/^block-(\d+)$/', $slug, $m ) ) {
			$folder = 'block-' . sprintf( '%02d', intval( $m[1] ) );
		}

		$path = $root . '/block/' . $folder . '/block.json';
		if ( isset( $cache[ $path ] ) ) {
			$data = $cache[ $path ];
		} else {
			if ( file_exists( $path ) ) {
				$raw  = file_get_contents( $path );
				$data = json_decode( $raw, true );
			} else {
				$data = null;
			}
			$cache[ $path ] = $data;
		}

		if ( ! $data || empty( $data['attributes'] ) || empty( $data['attributes'][ $attr ] ) ) {
			return null;
		}

		$def = $data['attributes'][ $attr ];
		if ( is_array( $def ) && array_key_exists( 'default', $def ) ) {
			return $def['default'];
		}

		return null;
	}

	/**
	 * Check whether an attribute represents an icon (using value or block.json default)
	 *
	 * @param array       $attrs Attributes passed from block
	 * @param string      $block_name Block name
	 * @param string      $attrName Attribute name to check for value
	 * @param string|null $typeName Optional attribute name for icon type
	 * @return bool
	 */
	private function attr_has_icon( $attrs, $block_name, $attrName, $typeName = null ) {
		$value = array_key_exists( $attrName, $attrs ) ? $attrs[ $attrName ] : $this->get_block_default_attr( $block_name, $attrName );
		if ( empty( $value ) ) {
			return false;
		}
		if ( $typeName ) {
			$type = array_key_exists( $typeName, $attrs ) ? $attrs[ $typeName ] : $this->get_block_default_attr( $block_name, $typeName );
			if ( isset( $type ) && 'icon' !== $type ) {
				return false;
			}
		}
		return true;
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
			// Header-only blocks: check `icon` + optional `iconType`.
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
			case 'gutenverse/news-user-list':
			case 'gutenverse/news-header':
				if ( $this->attr_has_icon( $attrs, $block_name, 'icon', 'iconType' ) ) {
					$this->icon_conditional_load( $conditions );
				}
				break;

			// Blocks that may have both `listIcon` and `icon` (use defaults when missing)
			case 'gutenverse/news-block-1':
			case 'gutenverse/news-block-16':
			case 'gutenverse/news-block-24':
			case 'gutenverse/news-block-28':
			case 'gutenverse/news-post-related':
				if ( $this->attr_has_icon( $attrs, $block_name, 'listIcon', 'listIconType' ) ) {
					$this->icon_conditional_load( $conditions );
				}
				if ( $this->attr_has_icon( $attrs, $block_name, 'icon', 'iconType' ) ) {
					$this->icon_conditional_load( $conditions );
				}
				break;

			case 'gutenverse/news-slider-1':
			case 'gutenverse/news-slider-4':
			case 'gutenverse/news-slider-5':
			case 'gutenverse/news-slider-6':
			case 'gutenverse/news-slider-7':
			case 'gutenverse/news-slider-8':
				if ( $this->attr_has_icon( $attrs, $block_name, 'nextButtonIcon', 'nextButtonIconType' ) ) {
					$this->icon_conditional_load( $conditions );
				}
				if ( $this->attr_has_icon( $attrs, $block_name, 'prevButtonIcon', 'prevButtonIconType' ) ) {
					$this->icon_conditional_load( $conditions );
				}
				break;

			case 'gutenverse/news-news-ticker':
				if ( $this->attr_has_icon( $attrs, $block_name, 'icon', 'iconType' ) ) {
					$this->icon_conditional_load( $conditions );
				}
				if ( $this->attr_has_icon( $attrs, $block_name, 'nextIcon', 'nextIconType' ) ) {
					$this->icon_conditional_load( $conditions );
				}
				if ( $this->attr_has_icon( $attrs, $block_name, 'prevIcon', 'prevIconType' ) ) {
					$this->icon_conditional_load( $conditions );
				}
				break;

			default:
				// No icon-related defaults for other blocks.
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
		wp_register_style(
			'gvnews-deprecated-blocks',
			GUTENVERSE_NEWS_URL . '/assets/css/frontend/deprecated.css',
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
			'social-author-icon',
			'user-list',
			'header',
			'module',
			'pagination',
			'archive-pagination',
			'news-ticker',
		);

		foreach ( $modules as $module ) {
			$handle = 'gutenverse-news-frontend-' . $module . '-style';

			wp_register_style(
				$handle,
				GUTENVERSE_NEWS_URL . '/assets/css/frontend/' . $module . '.css',
				array( 'gutenverse-frontend-style' ),
				GUTENVERSE_NEWS_VERSION
			);

			wp_style_add_data(
				$handle,
				'path',
				GUTENVERSE_NEWS_DIR . '/assets/css/frontend/' . $module . '.css'
			);
		}

		/** Register Block / Module */
		wp_register_style(
			'gutenverse-news-frontend-blocks-style',
			GUTENVERSE_NEWS_URL . '/assets/css/frontend/blocks-trim.css',
			array( 'gutenverse-frontend-style' ),
			GUTENVERSE_NEWS_VERSION
		);

		wp_style_add_data(
			'gutenverse-news-frontend-blocks-style',
			'path',
			GUTENVERSE_NEWS_DIR . '/assets/css/frontend/blocks-trim.css'
		);

		wp_register_style(
			'gutenverse-news-frontend-slider-style',
			GUTENVERSE_NEWS_URL . '/assets/css/frontend/slider.css',
			array( 'gutenverse-news-frontend-blocks-style' ),
			GUTENVERSE_NEWS_VERSION
		);

		wp_style_add_data(
			'gutenverse-news-frontend-slider-style',
			'path',
			GUTENVERSE_NEWS_DIR . '/assets/css/frontend/slider.css'
		);

		wp_register_style(
			'gutenverse-news-frontend-hero-style',
			GUTENVERSE_NEWS_URL . '/assets/css/frontend/hero.css',
			array( 'gutenverse-news-frontend-blocks-style' ),
			GUTENVERSE_NEWS_VERSION
		);

		wp_style_add_data(
			'gutenverse-news-frontend-hero-style',
			'path',
			GUTENVERSE_NEWS_DIR . '/assets/css/frontend/hero.css'
		);

		wp_register_style(
			'gutenverse-news-frontend-carousel-style',
			GUTENVERSE_NEWS_URL . '/assets/css/frontend/carousel.css',
			array( 'gutenverse-news-frontend-blocks-style' ),
			GUTENVERSE_NEWS_VERSION
		);

		wp_style_add_data(
			'gutenverse-news-frontend-carousel-style',
			'path',
			GUTENVERSE_NEWS_DIR . '/assets/css/frontend/carousel.css'
		);

		wp_register_style(
			'gutenverse-news-frontend-all-module-style',
			GUTENVERSE_NEWS_URL . '/assets/css/frontend/module.css',
			array( 'gutenverse-news-frontend-blocks-style', 'gutenverse-news-frontend-header-style', 'gutenverse-news-frontend-pagination-style' ),
			GUTENVERSE_NEWS_VERSION
		);

		wp_style_add_data(
			'gutenverse-news-frontend-all-module-style',
			'path',
			GUTENVERSE_NEWS_DIR . '/assets/css/frontend/module.css'
		);

		$this->register_module_style_handler();
		$this->register_carousel_style_handler();
		$this->register_slider_style_handler();
		$this->register_hero_style_handler();
	}

		/**
		 * Register spesific slider style handler
		 */
	private function register_module_style_handler() {
		$hero_blocks = array(
			'block-01',
			'block-02',
			'block-03',
			'block-04',
			'block-05',
			'block-06',
			'block-07',
			'block-08',
			'block-09',
			'block-10',
			'block-11',
			'block-12',
			'block-13',
			'block-14',
			'block-15',
			'block-16',
			'block-17',
			'block-18',
			'block-19',
			'block-20',
			'block-21',
			'block-22',
			'block-23',
			'block-24',
			'block-25',
			'block-26',
			'block-27',
			'block-28',
			'block-29',
			'block-30',
			'block-32',
			'block-33',
			'block-34',
			'block-35',
			'block-36',
			'block-37',
			'block-38',
			'block-39',
		);
		foreach ( $hero_blocks as $block ) {
			$handle = 'gutenverse-news-frontend-' . $block . '-style';

			wp_register_style(
				$handle,
				GUTENVERSE_NEWS_URL . '/assets/css/frontend/' . $block . '.css',
				array( 'gutenverse-news-frontend-all-module-style' ),
				GUTENVERSE_NEWS_VERSION
			);

			wp_style_add_data(
				$handle,
				'path',
				GUTENVERSE_NEWS_DIR . '/assets/css/frontend/' . $block . '.css'
			);
		}
	}

	/**
	 * Register spesific slider style handler
	 */
	private function register_carousel_style_handler() {
		$hero_blocks = array(
			'carousel-1',
			'carousel-2',
			'carousel-3',
		);
		foreach ( $hero_blocks as $block ) {
			$handle = 'gutenverse-news-frontend-' . $block . '-style';

			wp_register_style(
				$handle,
				GUTENVERSE_NEWS_URL . '/assets/css/frontend/' . $block . '.css',
				array( 'gutenverse-news-frontend-carousel-style' ),
				GUTENVERSE_NEWS_VERSION
			);

			wp_style_add_data(
				$handle,
				'path',
				GUTENVERSE_NEWS_DIR . '/assets/css/frontend/' . $block . '.css'
			);
		}
	}

	/**
	 * Register spesific slider style handler
	 */
	private function register_hero_style_handler() {
		$hero_blocks = array(
			'hero-01',
			'hero-02',
			'hero-03',
			'hero-04',
			'hero-05',
			'hero-06',
			'hero-07',
			'hero-08',
			'hero-09',
			'hero-10',
			'hero-11',
			'hero-12',
			'hero-13',
			'hero-skew',
		);
		foreach ( $hero_blocks as $block ) {
			$handle = 'gutenverse-news-frontend-' . $block . '-style';

			wp_register_style(
				$handle,
				GUTENVERSE_NEWS_URL . '/assets/css/frontend/' . $block . '.css',
				array( 'gutenverse-news-frontend-hero-style' ),
				GUTENVERSE_NEWS_VERSION
			);

			wp_style_add_data(
				$handle,
				'path',
				GUTENVERSE_NEWS_DIR . '/assets/css/frontend/' . $block . '.css'
			);
		}

		wp_register_style(
			'gutenverse-news-frontend-hero-14-style',
			GUTENVERSE_NEWS_URL . '/assets/css/frontend/hero-14.css',
			array( 'gutenverse-news-frontend-all-module-style', 'gutenverse-news-frontend-hero-style' ),
			GUTENVERSE_NEWS_VERSION
		);

		wp_style_add_data(
			'gutenverse-news-frontend-hero-14-style',
			'path',
			GUTENVERSE_NEWS_DIR . '/assets/css/frontend/hero-14.css'
		);
	}


	/**
	 * Register spesific slider style handler
	 */
	private function register_slider_style_handler() {
		$slider_blocks = array(
			'slider-1',
			'slider-2',
			'slider-3',
			'slider-4',
			'slider-5',
			'slider-6',
			'slider-7',
			'slider-8',
			'slider-9',
		);
		foreach ( $slider_blocks as $block ) {
			$handle = 'gutenverse-news-frontend-' . $block . '-style';

			wp_register_style(
				$handle,
				GUTENVERSE_NEWS_URL . '/assets/css/frontend/' . $block . '.css',
				array( 'gutenverse-news-frontend-slider-style' ),
				GUTENVERSE_NEWS_VERSION
			);

			wp_style_add_data(
				$handle,
				'path',
				GUTENVERSE_NEWS_DIR . '/assets/css/frontend/' . $block . '.css'
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
