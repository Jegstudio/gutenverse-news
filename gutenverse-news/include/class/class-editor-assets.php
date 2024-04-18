<?php
/**
 * Editor Assets class
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse
 */

namespace GUTENVERSE\NEWS;

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
	}

	/**
	 * Enqueue scripts
	 */
	public function enqueue_scripts() {
		wp_enqueue_style(
			'gvnews-icon-webfont',
			GUTENVERSE_NEWS_URL . '/assets/fonts/jegicon/fonts/jegicon.woff',
			null,
			null
		);
		wp_enqueue_style(
			'gvnews-icon',
			GUTENVERSE_NEWS_URL . '/assets/fonts/jegicon/jegicon.css',
			null,
			GUTENVERSE_NEWS_VERSION
		);
		wp_enqueue_style(
			'gvnews-gutenverse-editor-style',
			GUTENVERSE_NEWS_URL . '/assets/css/blocks-styles.css',
			array( 'gvnews-icon-webfont', 'gvnews-icon' ),
			GUTENVERSE_NEWS_VERSION,
		);

		$helper = include GUTENVERSE_NEWS_DIR . '/lib/dependencies/helper.asset.php';
		wp_enqueue_script( 'gvnews-helper-script', GUTENVERSE_NEWS_URL . '/assets/js/helper.js', $helper['dependencies'], GUTENVERSE_NEWS_VERSION, true );

		$block = ( include GUTENVERSE_NEWS_DIR . '/lib/dependencies/blocks.asset.php' )['dependencies'];

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
	}

	/**
	 * Config
	 *
	 * @return array
	 */
	public function gvnews_config() {
		$config['imgDir']          = GUTENVERSE_NEWS_URL . '/assets/img';
		$config['gvnews_ajax_url'] = esc_url_raw( add_query_arg( array( 'ajax-request' => 'gvnews' ), esc_url( gvnews_home_url_multilang( '/', 'relative' ) ) ) );

		return $config;
	}

	/**
	 * Editor config
	 *
	 * @param array $config Config.
	 */
	public function block_config( $config ) {
		$config['gutenverseFormImgDir']              = GUTENVERSE_NEWS_URL . '/assets/img';
		$config['pluginVersions'][ GUTENVERSE_NEWS ] = array(
			'name'           => GUTENVERSE_NEWS_NAME,
			'version'        => GUTENVERSE_NEWS_VERSION,
			'currentNotice'  => GUTENVERSE_NEWS_NOTICE_VERSION,
			'noticeVersions' => array( '1.0.0' ),
		);

		return $config;
	}
}
