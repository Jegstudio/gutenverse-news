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
		add_action( 'enqueue_block_assets', array( $this, 'enqueue_assets' ) );
		add_action( 'gutenverse_include_block', array( $this, 'enqueue_scripts' ) );
	}

	/**
	 * Enqueue editor assets
	 */
	public function enqueue_assets() {
		wp_enqueue_style(
			'gvnews-icon-backend',
			GUTENVERSE_NEWS_URL . '/assets/fonts/jegicon/jegicon.css',
			null,
			GUTENVERSE_NEWS_VERSION
		);
	}

	/**
	 * Enqueue scripts
	 */
	public function enqueue_scripts() {
		wp_enqueue_style(
			'gvnews-gutenverse-editor-style',
			GUTENVERSE_NEWS_URL . '/assets/css/blocks-styles.css',
			array( 'gvnews-icon-backend' ),
			GUTENVERSE_NEWS_VERSION,
		);

		$backend = include GUTENVERSE_NEWS_DIR . '/lib/dependencies/backend.asset.php';
		wp_enqueue_script( 'gvnews-backend-script', GUTENVERSE_NEWS_URL . '/assets/js/backend.js', $backend['dependencies'], GUTENVERSE_NEWS_VERSION, true );

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
		$config['moduleOption']    = $this->get_module_option();

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

	/**
	 * Get module options.
	 *
	 * @return array
	 */
	public function get_module_option() {
		$data = array(
			'string' => array(
				'read_more'  => esc_html__( 'Read more', 'gutenverse-news' ),
				'next'       => esc_html__( 'Next', 'gutenverse-news' ),
				'previous'   => esc_html__( 'Previous', 'gutenverse-news' ),
				'load_more'  => esc_html__( 'Load More', 'gutenverse-news' ),
				'by'         => esc_html__( 'by', 'gutenverse-news' ),
				'no_content' => esc_html__( 'No Content Available', 'gutenverse-news' ),
			),
			'option' => array(
				'meta_show'    => true,
				'meta_comment' => true,
				'meta_author'  => true,
				'meta_rating'  => true,
				'meta_date'    => true,
				'meta_views'   => true,
				'date_format'  => get_option( 'date_format' ),
				'date_module'  => get_option( 'date_format' ),
				'date_type'    => 'published', /* publish |  modified | both */
				'post_count'   => wp_count_posts(),
			),
		);
		return apply_filters( 'gvnews_module_options', $data );
	}
}
