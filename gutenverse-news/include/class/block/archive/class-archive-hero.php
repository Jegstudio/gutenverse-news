<?php
/**
 * Archive Hero
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block\Archive;

/**
 * Archive_Hero
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Archive_Hero extends Archive_View_Abstract {

	/**
	 * Method render_module
	 *
	 * @param array  $attr         attribute.
	 * @param string $column_class column class..
	 *
	 * @return string
	 */
	public function render_module( $attr, $column_class ) {

		$name     = 'GUTENVERSE\NEWS\Block\Hero\Hero_' . $attr['hero_type'];
		$instance = null;
		if ( method_exists( $name, 'get_instance' ) ) {
			$instance = call_user_func( array( $name, 'get_instance' ) );
			$instance->set_attribute( $attr );
		}
		if ( $attr['first_page'] && gvnews_get_post_current_page() > 1 ) {
			$this->set_skipped_post( (int) $instance->get_number_post(), true );
			return false;
		}
		$result        = $this->get_result( $attr, $instance->get_number_post() );
		$column_class  = $this->get_module_column_class( $attr );
		$column_class .= ' ' . esc_attr( $this->get_vc_class_name() );

		return $instance->render_output( $result['result'], $attr, $column_class );
	}
}
