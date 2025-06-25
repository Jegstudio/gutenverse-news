<?php
/**
 * Slider
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
class Slider extends StyleAbstract {


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
				'border'      => array(
					'normal' => ".{$this->element_id} .gvnews_slider_wrapper",
					'hover'  => ".{$this->element_id} .gvnews_slider_wrapper:hover",
				),
				'positioning' => null,
				'animation'   => null,
				'advance'     => ".{$this->element_id} .gvnews_slider_wrapper",
			)
		);
	}

	/**
	 * Creating custom handle background to handle old values because format is changed
	 *
	 * @param string $selector .
	 * @param object $background .
	 */
	public function custom_handle_gradient( $selector, $background ) {
		$this->inject_style(
			array(
				'selector'       => $selector,
				'property'       => function ( $value ) {
					$gradient_color        = $value['gradientColor'];
					$gradient_type         = $value['gradientType'];
					$gradient_angle        = $value['gradientAngle'];
					$gradient_radial       = $value['gradientRadial'];

					if ( ! empty( $gradient_color ) ) {
						$colors = array();

						foreach ( $gradient_color as $gradient ) {
							$offset  = $gradient['offset'] * 100;
							$colors[] = "{$gradient['color']} {$offset}%";
						}

						$colors = join( ',', $colors );

						if ( 'radial' === $gradient_type ) {
							return "background: radial-gradient(at {$gradient_radial}, {$colors});";
						} else {
							return "background: linear-gradient({$gradient_angle}deg, {$colors});";
						}
					}
				},
				'value'          => array(
					'gradientColor'       => isset( $background['gradientColor'] ) ? $background['gradientColor'] : null,
					'gradientPosition'    => isset( $background['gradientPosition'] ) ? $background['gradientPosition'] : 0,
					'gradientEndColor'    => isset( $background['gradientEndColor'] ) ? $background['gradientEndColor'] : null,
					'gradientEndPosition' => isset( $background['gradientEndPosition'] ) ? $background['gradientEndPosition'] : 100,
					'gradientType'        => isset( $background['gradientType'] ) ? $background['gradientType'] : 'linear',
					'gradientAngle'       => isset( $background['gradientAngle'] ) ? $background['gradientAngle'] : 180,
					'gradientRadial'      => isset( $background['gradientRadial'] ) ? $background['gradientRadial'] : 'center center',
				),
				'device_control' => false,
			)
		);
	}

	/**
	 * Generate style base on attribute.
	 */
	public function generate() {
		if ( stristr( $this->attrs['gvnewsModule'], 'Slider_Overlay' ) ) {
			if ( isset( $this->attrs['overrideOverlay'] ) && 'gradient' === $this->attrs['overlayOption'] ) {
				$this->handle_background( ".{$this->element_id} .gvnews_overlay_slider_wrapper:before", $this->attrs['overrideOverlay'] );
			}
		}

		if ( isset( $this->attrs['hasOverlay'] ) && $this->attrs['hasOverlay'] ) {

			if ( isset( $this->attrs['overrideOverlay'] ) && $this->attrs['isOverrideOverlay'] && ( 'gradient' === $this->attrs['overlayOption'] ) ) {
				$this->custom_handle_gradient(
					".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slide_item:before",
					$this->attrs['overrideOverlay']
				);
			}
			if ( isset( $this->attrs['normalOverlay'] ) && ( 'normal' === $this->attrs['overlayOption'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slide_item:before",
						'property'       => function ( $value ) {
							return $this->handle_color( $value, 'background-color' );
						},
						'value'          => $this->attrs['normalOverlay'],
						'device_control' => false,
					)
				);
			}
		}
	}
}
