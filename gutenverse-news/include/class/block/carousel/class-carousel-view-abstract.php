<?php
/**
 * Carousel View Abstract
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block\Carousel;

use GUTENVERSE\NEWS\Block\Block_View_Abstract;

/**
 * Carousel_View_Abstract
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
abstract class Carousel_View_Abstract extends Block_View_Abstract {

	/**
	 * Method render_module
	 *
	 * @param array  $attr         attribute.
	 * @param string $column_class column class.
	 *
	 * @return string
	 */
	public function render_module( $attr, $column_class ) {
		$attr['pagination_number_post'] = 1;
		$results                        = $this->build_query( $attr );

		return $this->render_element( $results['result'], $attr );
	}

	/**
	 * Method main_custom_image_size
	 *
	 * @param mixed $size size.
	 * @return mixed
	 */
	public function main_custom_image_size( $size ) {
		$size = ! empty( $this->attribute['renderedImageSizeMain'] ) && 'default' !== $this->attribute['renderedImageSizeMain'] ? $this->attribute['renderedImageSizeMain'] : $size;
		return $size;
	}

	/**
	 * Method render_element
	 *
	 * @param array $result result.
	 * @param array $attr   attribute.
	 *
	 * @return string
	 */
	abstract public function render_element( $result, $attr );
}
