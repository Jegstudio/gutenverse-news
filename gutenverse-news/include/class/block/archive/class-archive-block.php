<?php
/**
 * Archive Block
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block\Archive;

/**
 * Archive_Block
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Archive_Block extends Archive_View_Abstract {

	/**
	 * Method render_module
	 *
	 * @param array  $attr         attribute.
	 * @param string $column_class column class..
	 *
	 * @return string
	 */
	public function render_module( $attr, $column_class ) {

		if ( $attr['first_page'] && gvnews_get_post_current_page() > 1 ) {
			return false;
		}
		$name     = 'GUTENVERSE\NEWS\Block\Module\Module_' . $attr['block_type'];
		$instance = null;
		if ( method_exists( $name, 'get_instance' ) ) {
			$instance = call_user_func( array( $name, 'get_instance' ) );
			$instance->set_attribute( $attr );
		}
		$result = $this->get_result( $attr, $attr['number_post'] );

		if ( ! empty( $result['result'] ) ) {
			$attr['pagination_mode'] = 'disable';
			$attr['results']         = $result;

			return $instance->build_module( $attr );
		}
	}
}
