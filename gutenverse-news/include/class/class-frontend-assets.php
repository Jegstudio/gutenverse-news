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
	 * @param array $attrs Attributes passed from block
	 * @param string $block_name Block name
	 * @param string $attrName Attribute name to check for value
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
			'gutenverse-news-frontend-featured-video-script',
			GUTENVERSE_NEWS_URL . '/assets/js/frontend/featured-video.js',
			array( 'gutenverse-frontend-event' ),
			GUTENVERSE_NEWS_VERSION,
			true
		);

		wp_register_script(
			'gutenverse-news-frontend-featured-gallery-script',
			GUTENVERSE_NEWS_URL . '/assets/js/frontend/featured-gallery.js',
			array( 'gutenverse-frontend-event', 'gutenverse-tinyslider' ),
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
		do_action( 'gvnews_after_frontend_script' );
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
			'social-author-icon',
			'user-list',
		);

		foreach ( $modules as $module ) {
			wp_register_style(
				'gutenverse-news-frontend-' . $module . '-style',
				GUTENVERSE_NEWS_URL . '/assets/css/frontend/' . $module . '.css',
				array(),
				GUTENVERSE_NEWS_VERSION
			);
		}

		do_action( 'gvnews_after_frontend_styles' );
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
			'postid'        => get_the_ID(),
		);
		return apply_filters( 'gvnews_frontend_config', $config );
	}
}
