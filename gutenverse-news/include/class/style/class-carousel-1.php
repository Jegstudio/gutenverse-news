<?php
/**
 * Module 7
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Style;

/**
 * Carousel 1 additional Styling.
 *
 * @package gutenverse-news
 */
class Carousel_1 extends Carousel {

    /**
	 * Generate carousel navigation style.
	 */
	protected function generate_navigation_style() {
		$controls_selector  = ".{$this->element_id} .tns-outer .tns-controls";
		$separator_selector = ".gvnews_postblock_carousel_1.with-nav-separator .tns-outer .tns-controls:before, .gvnews_postblock_carousel_1.with-nav-separator .tns-outer .tns-controls:after";

		if ( isset( $this->attrs['navigationWrapperMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $controls_selector,
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['navigationWrapperMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['navigationWrapperAlign'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $controls_selector,
					'property'       => function ( $value ) {
						return "justify-content: {$value};";
					},
					'value'          => $this->attrs['navigationWrapperAlign'],
					'device_control' => true,
				)
			);
			$this->inject_style(
				array(
					'selector'       => "{$controls_selector}:before",
					'property'       => function ( $value ) {
						$display = 'block';
						if ( $value === 'start' || $value === 'space-between' ) {
							$display = 'none';
						}
						return "display: {$display};";
					},
					'value'          => $this->attrs['navigationWrapperAlign'],
					'device_control' => true,
				)
			);
			$this->inject_style(
				array(
					'selector'       => "{$controls_selector}:after",
					'property'       => function ( $value ) {
						$display = 'block';
						if ( $value === 'end' || $value === 'space-between' ) {
							$display = 'none';
						}
						return "display: {$display};";
					},
					'value'          => $this->attrs['navigationWrapperAlign'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['navigationBtnGap'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $controls_selector,
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'gap' );
					},
					'value'          => $this->attrs['navigationBtnGap'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['navigationSeparatorStyle'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $separator_selector,
					'property'       => function ( $value ) {
						return "border-bottom-style: {$value};";
					},
					'value'          => $this->attrs['navigationSeparatorStyle'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['navigationSeparatorColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $separator_selector,
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'border-bottom-color' );
					},
					'value'          => $this->attrs['navigationSeparatorColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['navigationSeparatorWidth'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $separator_selector,
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'border-bottom-width' );
					},
					'value'          => $this->attrs['navigationSeparatorWidth'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['navigationBtnIconSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "{$controls_selector} button .gutenverse-icon-svg svg",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'font-size' );
					},
					'value'          => $this->attrs['navigationBtnIconSize'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['navigationBtnWidth'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "{$controls_selector} button",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'width' );
					},
					'value'          => $this->attrs['navigationBtnWidth'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['navigationBtnHeight'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "{$controls_selector} button",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'height' );
					},
					'value'          => $this->attrs['navigationBtnHeight'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['navigationBtnColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "{$controls_selector} button",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['navigationBtnColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['navigationBtnBgColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "{$controls_selector} button",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['navigationBtnBgColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['navigationBtnBorderResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "{$controls_selector} button",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['navigationBtnBorderResponsive'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['navigationBtnBoxShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "{$controls_selector} button",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['navigationBtnBoxShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['navigationBtnColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "{$controls_selector} button:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['navigationBtnColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['navigationBtnBgColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "{$controls_selector} button:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['navigationBtnBgColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['navigationBtnBorderResponsiveHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "{$controls_selector} button:hover",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['navigationBtnBorderResponsiveHover'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['navigationBtnBoxShadowHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "{$controls_selector} button:hover",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['navigationBtnBoxShadowHover'],
					'device_control' => false,
				)
			);
		}
	}
}