<?php
/**
 * Editor Assets class
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse
 */

namespace GUTENVERSE\NEWS;

use GUTENVERSE\NEWS\Util\Image\Image;

/**
 * Class Editor Assets
 *
 * @package gutenverse-news
 */
class Editor_Assets {

	/**
	 * Init constructor.
	 */
	public function __construct() {
		add_filter( 'gutenverse_block_config', array( $this, 'block_config' ) );
		add_action( 'gutenverse_include_block', array( $this, 'enqueue_scripts' ) );
		add_action( 'gutenverse_include_block', array( $this, 'enqueue_style' ) );
	}

	/**
	 * Enqueue style.
	 */
	public function enqueue_style() {
		wp_enqueue_style(
			'gvnews-gutenverse-editor-style',
			GUTENVERSE_NEWS_URL . '/assets/css/frontend/blocks-trim.css',
			array(),
			GUTENVERSE_NEWS_VERSION
		);

		wp_enqueue_style(
			'gvnews-gutenverse-editor-blocks-style',
			GUTENVERSE_NEWS_URL . '/assets/css/blocks-editor-styles.css',
			array(),
			GUTENVERSE_NEWS_VERSION
		);
	}

	/**
	 * Enqueue scripts.
	 */
	public function enqueue_scripts() {
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

		$block   = ( include GUTENVERSE_NEWS_DIR . '/lib/dependencies/blocks.asset.php' )['dependencies'];
		$block[] = 'gutenverse-news-frontend-hero-slider-script';
		$block[] = 'gutenverse-news-frontend-carousel-slider-script';
		$block[] = 'gutenverse-news-frontend-slider-script';
		$block[] = 'gutenverse-news-frontend-newsticker-script';

		wp_enqueue_script(
			'gutenverse-news-blocks',
			GUTENVERSE_NEWS_URL . '/assets/js/blocks.js',
			$block,
			GUTENVERSE_NEWS_VERSION,
			true
		);
		wp_localize_script( 'gutenverse-news-blocks', 'GVNewsConfig', $this->gvnews_config() );

		wp_set_script_translations(
			'gutenverse-news-blocks',
			'gutenverse-news',
			GUTENVERSE_NEWS_LANG_DIR
		);
		wp_enqueue_script( 'gvnews-deprecated-blocks', GUTENVERSE_NEWS_URL . '/assets/js/deprecated-block.js', array( 'gutenverse-news-blocks', 'wp-data', 'wp-dom-ready', 'wp-notices' ), GUTENVERSE_NEWS_VERSION, true );
		wp_localize_script(
			'gvnews-deprecated-blocks',
			'GVNwsDeprecated',
			array(
				'isPro'     => gutenverse_pro_active(),
				'dismissed' => get_transient( 'deprecated_gutenverse_news_dismissed' ),
				'apiNonce'  => wp_create_nonce( 'gvnews_dismiss_notice' ),
			)
		);
		do_action( 'gvnews_after_editor_assets' );
	}

	/**
	 * Config
	 *
	 * @return array
	 */
	public function gvnews_config() {
		$config['imgDir']          = GUTENVERSE_NEWS_URL . '/assets/img';
		$config['assetsDir']       = GUTENVERSE_NEWS_URL . '/assets';
		$config['gvnews_ajax_url'] = esc_url_raw( add_query_arg( array( 'ajax-request' => 'gvnews' ), esc_url( gvnews_home_url_multilang( '/', 'relative' ) ) ) );
		$config['moduleOption']    = $this->get_module_option();
		$config['gutenversePro']   = gutenverse_pro_active();
		$config['imageSizes']      = Image::get_instance()->get_image_sizes();

		return apply_filters( 'gvnews_editor_config', $config );
	}

	/**
	 * Editor config
	 *
	 * @param array $config Config.
	 */
	public function block_config( $config ) {

		$config['pluginVersions'][ GUTENVERSE_NEWS ] = array(
			'name'           => GUTENVERSE_NEWS_NAME,
			'version'        => GUTENVERSE_NEWS_VERSION,
			'currentNotice'  => GUTENVERSE_NEWS_NOTICE_VERSION,
			'noticeVersions' => array( '1.0.0' ),
		);

		return $config;
	}

	/**
	 * Get module options.
	 *
	 * @return array
	 */
	public function get_module_option() {

		$data                = gvnews_get_option( 'block_settings', array() );
		$data['post_count']  = wp_count_posts();
		$data['date_format'] = get_option( 'date_format' );
		$data['date_module'] = get_option( 'date_format' );
		return apply_filters( 'gvnews_module_options', $data );
	}
}
