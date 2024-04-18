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
			'noticeVersions' => array( '1.0.0' ),
		);

		return $config;
	}
}
