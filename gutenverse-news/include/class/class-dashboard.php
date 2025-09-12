<?php
/**
 * Dashboard class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse
 */

namespace GUTENVERSE\NEWS;

/**
 * Class Dashboard
 *
 * @package gutenverse-news
 */
class Dashboard {
	/**
	 * Init constructor.
	 */
	public function __construct() {
		add_filter( 'gutenverse_dashboard_config', array( $this, 'dashboard_config' ) );
		add_filter( 'gutenverse_include_dashboard', array( $this, 'enqueue_scripts' ) );
		add_filter( 'gutenverse_settings_data', array( $this, 'merge_settings_data' ) );
	}

	/**
	 * Dashboard scripts.
	 */
	public function enqueue_scripts() {
		wp_enqueue_script( 'gutenverse-frontend-event' );

		$include = ( include GUTENVERSE_NEWS_DIR . '/lib/dependencies/blocks.asset.php' )['dependencies'];

		wp_enqueue_script(
			'gutenverse-news-blocks',
			GUTENVERSE_NEWS_URL . '/assets/js/blocks.js',
			$include,
			GUTENVERSE_NEWS_VERSION,
			true
		);
		$include = ( include GUTENVERSE_NEWS_DIR . '/lib/dependencies/dashboard.asset.php' )['dependencies'];
		wp_enqueue_script(
			'gutenverse-news-dashboard',
			GUTENVERSE_NEWS_URL . '/assets/js/dashboard.js',
			$include,
			GUTENVERSE_NEWS_VERSION,
			true
		);
		wp_localize_script( 'gutenverse-news-blocks', 'GVNewsConfig', $this->gvnews_config() );

		wp_enqueue_style(
			'gutenverse-news-dashboard',
			GUTENVERSE_NEWS_URL . '/assets/css/update-notice.css',
			array(),
			GUTENVERSE_NEWS_VERSION
		);
	}

	/**
	 * Config
	 *
	 * @return array
	 */
	public function gvnews_config() {
		$config['gutenversePro'] = gutenverse_pro_active();
		return $config;
	}


	/**
	 * Editor config
	 *
	 * @param array $config Config.
	 */
	public function dashboard_config( $config ) {
		$config['gutenverseNewsssetURL']             = GUTENVERSE_NEWS_URL . '/assets/';
		$config['pluginVersions'][ GUTENVERSE_NEWS ] = array(
			'name'           => GUTENVERSE_NEWS_NAME,
			'version'        => GUTENVERSE_NEWS_VERSION,
			'currentNotice'  => GUTENVERSE_NEWS_NOTICE_VERSION,
			'noticeVersions' => array( '3.0.0' ),
		);

		return $config;
	}

	/**
	 * Merge Gutenverse Settings with additional setting from Gutenvers News.
	 *
	 * @param array $settings Gutenverse Settings.
	 * @return array
	 */
	public function merge_settings_data( $settings ) {
		return array_merge(
			$settings,
			array( 'gvnews_settings' => get_option( 'gvnews_settings', array() ) )
		);
	}
}
