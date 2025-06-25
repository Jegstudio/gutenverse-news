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
				$this->handle_gradient_with_angle(
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
