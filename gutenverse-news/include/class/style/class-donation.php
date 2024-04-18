<?php
/**
 * Donation
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
class Donation extends StyleAbstract {


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
		if ( isset( $this->attrs['btnTextColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} a.btn.jpwt-donation-submit",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['btnTextColor'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['btnColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} a.btn.jpwt-donation-submit",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background' );
					},
					'value'          => $this->attrs['btnColor'],
					'device_control' => false,
				)
			);
		}
	}
}
