<?php
/**
 * Ajax
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS;

use GUTENVERSE\NEWS\Block\Module\Module_View_Abstract;

/**
 * Ajax
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Ajax {


	/**
	 * Endpoint
	 *
	 * @var string
	 */
	private $endpoint = 'ajax-request';

	/**
	 * Module ajax prefix
	 *
	 * @var string
	 */
	private $module_ajax_prefix = 'gvnews_module_ajax_';


	/**
	 * Method __construct
	 *
	 * @return void
	 */
	public function __construct() {
		add_action( 'wp', array( $this, 'ajax_parse_request' ) );
		add_filter( 'query_vars', array( $this, 'ajax_query_vars' ) );
	}


	/**
	 * Method ajax_query_vars
	 *
	 * @param array $vars variables.
	 *
	 * @return boolean
	 */
	public function ajax_query_vars( $vars ) {
		$vars[] = $this->endpoint;
		$vars[] = 'action';

		return $vars;
	}

	/**
	 * Method is_doing_ajax
	 *
	 * @return boolean
	 */
	public function is_doing_ajax() {
		return true;
	}

	/**
	 * Method ajax_parse_request
	 *
	 * @param object $wp wp.
	 *
	 * @return void
	 */
	public function ajax_parse_request( $wp ) {

		if ( array_key_exists( $this->endpoint, $wp->query_vars ) ) {
			// need to flag this request is ajax request.
			add_filter( 'wp_doing_ajax', array( $this, 'is_doing_ajax' ) );

			$action = $wp->query_vars['action'];

			switch ( $action ) {
				case 'gvnews_ajax_comment':
					// ajax comment.
					if ( isset( $_REQUEST['post_id'] ) && isset( $_REQUEST['post_type'] ) ) {
						query_posts(
							array(
								'p'            => (int) sanitize_text_field( wp_unslash( $_REQUEST['post_id'] ) ),
								'post_type'    => sanitize_text_field( wp_unslash( $_REQUEST['post_type'] ) ),
								'withcomments' => 1,
								'feed'         => 1,
							)
						);

						while ( have_posts() ) :
							the_post();
							global $post;
							setup_postdata( $post );
							get_template_part( 'fragment/comments' );
						endwhile;

						wp_reset_query();
						break;
					}
			}

			// Module Ajax.
			$module_prefix = $this->module_ajax_prefix;
			if ( 0 === strpos( $action, $module_prefix ) ) {
				$module_name = str_replace( $module_prefix, '', $action );
				$path = str_replace("module_", "block_", $module_name);

				$module_file  = file_get_contents( GUTENVERSE_NEWS_DIR . 'block/' . str_replace( '_', '-', $path ) . '/block.json' );
				$module_data  = json_decode( $module_file, true );
				$module_class = gvnews_get_view_class_from_shortcode( $module_data['attributes']['gvnewsModule']['default'] );

				$this->module_ajax( $module_class );
			}

			do_action( 'gvnews_ajax_' . $action );

			exit;
		}
	}

	/**
	 * Method module_ajax
	 *
	 * @param $module_class $module_class module class.
	 *
	 * @return void
	 */
	public function module_ajax( $module_class ) {
		/**
		* Call module class
		*
		* @var ModuleViewAbstract $instance
		*/
		$instance = call_user_func( array( $module_class, 'get_instance' ) );

		if ( $instance instanceof Module_View_Abstract ) {
			$instance->ajax_request();
		}
	}

	/**
	 * Method ajax_url
	 *
	 * @return string
	 */
	public function ajax_url() {
		return add_query_arg( array( $this->endpoint => 'gvnews' ), esc_url( gvnews_home_url_multilang( '/', 'relative' ) ) );
	}
}
