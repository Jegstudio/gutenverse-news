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

		if ( defined( 'GUTENVERSE_THEMES_BUILDER' ) && is_archive() ) {
			remove_all_filters( 'the_content' ); /* TODO: this is hot fix for fixing the conflix with pattern wrapper block */
		}
		if ( $attr['first_page'] && gvnews_get_post_current_page() > 1 ) {
			return false;
		}
		$name = 'GUTENVERSE\NEWS\Block\Module\Module_' . $attr['block_type'];

		if ( method_exists( $name, 'get_instance' ) ) {
			/**
			 * Call get_instance from object with parent: Block_View_Abstract, ex: Module_3.
			 *
			 * @var  \GUTENVERSE\NEWS\Block\Block_View_Abstract
			 */
			$instance = call_user_func( array( $name, 'get_instance' ) );
			$instance->set_attribute( $attr );
		}
		$result = $this->get_result( $attr, $attr['number_post'] );

		$attr['pagination_mode'] = 'disable';
		$attr['results']         = $result;

		return $instance->build_module( $attr );
	}
}
