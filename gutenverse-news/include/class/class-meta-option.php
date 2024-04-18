<?php
/**
 * Meta Option Class
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS;

use Gutenverse\Framework\Meta_Option as Meta;

/**
 * Class Meta Option
 *
 * @package gutenverse-news
 */
class Meta_Option {

	/**
	 * Constructor
	 */
	public function __construct() {
		add_action( 'gutenverse_check_update', array( $this, 'check_update' ) );
		add_action( 'gutenverse_initial_meta_option', array( $this, 'init_meta_option' ) );
	}


	/**
	 * Method init_meta_option
	 *
	 * @param array $options options.
	 *
	 * @return array
	 */
	public function init_meta_option( $options ) {
		$options['tracker'][ GUTENVERSE_NEWS ] = array(
			'install_time'    => time(),
			'current_version' => '0.0.0',
			'version_history' => array(),
			'upgrade_time'    => null,
		);

		return $options;
	}


	/**
	 * Method check_update
	 *
	 * @return void
	 */
	public function check_update() {
		$meta    = Meta::instance();
		$tracker = $meta->get_option( 'tracker', array() );

		if ( ! isset( $tracker[ GUTENVERSE_NEWS ] ) ) {
			$tracker = $this->set_tracker( $meta, $tracker );
		}

		$version = $tracker[ GUTENVERSE_NEWS ]['current_version'];

		if ( version_compare( $version, GUTENVERSE_NEWS_VERSION, '<' ) ) {
			$meta->upgrade_plugin( $version, GUTENVERSE_NEWS_VERSION, GUTENVERSE_NEWS );
		}
	}


	/**
	 * Method set_tracker
	 *
	 * @param $meta    $meta meta.
	 * @param $tracker $tracker tracker.
	 *
	 * @return array
	 */
	public function set_tracker( $meta, $tracker ) {
		$tracker[ GUTENVERSE_NEWS ] = array(
			'install_time'    => time(),
			'current_version' => GUTENVERSE_NEWS_VERSION,
			'version_history' => array(),
			'upgrade_time'    => null,
		);

		$meta->set_option( 'tracker', $tracker );

		return $tracker;
	}
}
