<?php
/**
 * Blocks
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Style;

use GUTENVERSE\NEWS\Style\StyleAbstract;

/**
 * Class Init
 *
 * @package Gutenverse
 */
class Carousel extends StyleAbstract {

	/**
	 * Constructor
	 *
	 * @param array       $attrs Attribute.
	 * @param string|bool $name Name.
	 */
	public function __construct( $attrs, $name = false ) {
		parent::__construct( $attrs, $name );

		$this->set_feature(
			array(
				'background'  => null,
				'border'      => null,
				'positioning' => null,
				'animation'   => null,
				'advance'     => null,
			)
		);
	}

	/**
	 * Generate style base on attribute.
	 */
	public function generate() {
		if ( isset( $this->attrs['border'] ) ) {
			if ( $this->attrs['border'] ) {
				$selectorbx = array(
					'normal' => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} ",
					'hover'  => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} ",
				);
				$this->feature_border( $selectorbx );
			}
		}
	}
}
