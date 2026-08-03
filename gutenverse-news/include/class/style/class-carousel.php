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
				'border'      => array(
					'normal' => ".{$this->element_id} .gvnews_postblock",
					'hover'  => ".{$this->element_id} .gvnews_postblock:hover",
				),
				'animation'   => null,
				'advance'     => ".{$this->element_id} .gvnews_postblock",
				'positioning' => ".{$this->element_id}.gvnews-block.gvnews-block-wrapper",
			)
		);
	}

	/**
	 * Generate style base on attribute.
	 */
	public function generate() {
		$this->generate_design_style();
		if ( empty( $this->attrs['showMeta'] ) || ( isset( $this->attrs['showMeta'] ) && $this->attrs['showMeta'] ) ) {
				$this->generate_meta_style();
		}
		if ( isset( $this->attrs['showNav'] ) && $this->attrs['showNav'] ) {
			$this->generate_navigation_style();
		}

		if ( isset( $this->attrs['gvnewsModule'] ) && 'GUTENVERSE\\NEWS\\Block\\Carousel\\Carousel_2' === $this->attrs['gvnewsModule'] ) {
			$this->generate_category_label_style();
			$this->generate_overlay_hover_style();
		}
		$this->generate_thumbnail_style();
		$this->no_content_style();
		do_action( 'gvnews_carousel_style', $this );
	}

	/**
	 * Generate overlay hover style for carousel 2.
	 */
	private function generate_overlay_hover_style() {
		if ( isset( $this->attrs['overlayBackgroundHover'] ) ) {
			$this->handle_background( ".{$this->element_id} .gvnews_postblock_carousel_2 .tns-item:hover .gvnews_thumb:before", $this->attrs['overlayBackgroundHover'] );
		}

		if ( isset( $this->attrs['overlayOpacityHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_postblock_carousel_2 .tns-item:hover .gvnews_thumb:before",
					'property'       => function ( $value ) {
						return "opacity: {$value};";
					},
					'value'          => $this->attrs['overlayOpacityHover'],
					'device_control' => true,
				)
			);
		}
	}


	/**
	 * Generate design style.
	 */
	private function generate_design_style() {
		if ( isset( $this->attrs['typography'] ) ) {
				$this->inject_typography(
					array(
						'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_carousel_post .gvnews_post .gvnews_post_title",
						'property'       => function ( $value ) {},
						'value'          => $this->attrs['typography'],
						'device_control' => false,
					)
				);
		}

		if ( isset( $this->attrs['titleColor'] ) ) {

			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_carousel_post .gvnews_post_title a",
					'property'       => function ( $value ) {
								return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['titleColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['titleColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_carousel_post .gvnews_post_title a:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['titleColorHover'],
					'device_control' => false,
				)
			);
		}
	}

	/**
	 * Generate block meta style.
	 */
	private function generate_meta_style() {
		if ( isset( $this->attrs['typographyMeta'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_post_wrapper .gvnews_meta_date",
					'property'       => function ( $value ) {
					},
					'value'          => $this->attrs['typographyMeta'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['metaColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_post_wrapper .gvnews_meta_date a",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['metaColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['metaIconColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_post_wrapper .gvnews_meta_date .far, .gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_post_wrapper .gvnews_meta_date svg",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['metaIconColor'],
					'device_control' => false,
				)
			);
		}
	}

	/**
	 * Generate carousel navigation style.
	 */
	private function generate_navigation_style() {
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

	/**
	 * Generate category label style.
	 */
	private function generate_category_label_style() {
		if ( isset( $this->attrs['categoryButtonTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector' => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_post .gvnews_post_category a",
					'value'    => $this->attrs['categoryButtonTypography'],
				)
			);
		}

		if ( isset( $this->attrs['categoryButtonPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_post .gvnews_post_category a",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['categoryButtonPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['categoryButtonMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_post .gvnews_post_category",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['categoryButtonMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['categoryButtonBackground'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_post .gvnews_post_category a",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['categoryButtonBackground'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['categoryButtonBackgroundHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_post .gvnews_post_category a:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['categoryButtonBackgroundHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['categoryButtonColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_post .gvnews_post_category a",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['categoryButtonColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['categoryButtonColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_post .gvnews_post_category a:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['categoryButtonColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['categoryButtonBorder'] ) ) {
			$this->handle_border(
				'categoryButtonBorder',
				".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_post .gvnews_post_category a"
			);
		}

		if ( isset( $this->attrs['categoryButtonBorderHover'] ) ) {
			$this->handle_border(
				'categoryButtonBorderHover',
				".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_post .gvnews_post_category a:hover"
			);
		}

		if ( isset( $this->attrs['categoryButtonBoxShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_post .gvnews_post_category a",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['categoryButtonBoxShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['categoryButtonBoxShadowHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_post .gvnews_post_category a:hover",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['categoryButtonBoxShadowHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['readmoreButtonTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector' => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_readmore",
					'value'    => $this->attrs['readmoreButtonTypography'],
				)
			);
		}

		if ( isset( $this->attrs['readmoreButtonBackground'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_readmore",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['readmoreButtonBackground'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['readmoreButtonBackgroundHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_readmore:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['readmoreButtonBackgroundHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['readmoreButtonColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_readmore",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['readmoreButtonColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['readmoreButtonColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_readmore:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['readmoreButtonColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['readmoreButtonBorder'] ) ) {
			$this->handle_border(
				'readmoreButtonBorder',
				".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_readmore"
			);
		}

		if ( isset( $this->attrs['readmoreButtonBorderHover'] ) ) {
			$this->handle_border(
				'readmoreButtonBorderHover',
				".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_readmore:hover"
			);
		}

		if ( isset( $this->attrs['readmoreButtonBoxShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_readmore",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['readmoreButtonBoxShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['readmoreButtonBoxShadowHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_readmore:hover",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['readmoreButtonBoxShadowHover'],
					'device_control' => false,
				)
			);
		}
	}

	/**
	 * Generate style block thumbnail style.
	 *
	 * @return void
	 */
	private function generate_thumbnail_style() {
		$selector = ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .gvnews_thumb";
		if ( isset( $this->attrs['borderMainThumbnail'] ) ) {
			$this->handle_border( 'borderMainThumbnail', $selector );
		}
		if ( isset( $this->attrs['borderResponsiveMainThumbnail'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $selector,
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['borderResponsiveMainThumbnail'],
					'device_control' => true,
					'skip_device'    => isset( $this->attrs['border'] ) ? array(
						'Desktop',
					) : null,
				)
			);
		}

		$overlay_selector = 'GUTENVERSE\\NEWS\\Block\\Carousel\\Carousel_2' === $this->attrs['gvnewsModule'] ? ".{$this->element_id} .gvnews_postblock_carousel_2 .gvnews_thumb:before" : ".{$this->element_id} .gvnews_postblock .gvnews_post .gvnews_thumb .gvnews-thumb-overlay";
		if ( isset( $this->attrs['overlayBackground'] ) ) {
			$this->handle_background( $overlay_selector, $this->attrs['overlayBackground'] );
		}

		if ( isset( $this->attrs['overlayOpacity'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $overlay_selector,
					'property'       => function ( $value ) {
						return "opacity: {$value};";
					},
					'value'          => $this->attrs['overlayOpacity'],
					'device_control' => true,
				)
			);
		}
	}

	private function no_content_style() {
		if ( isset( $this->attrs['noContentTextAlign'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_empty_module",
					'property'       => function ( $value ) {
						return "text-align: {$value};";
					},
					'value'          => $this->attrs['noContentTextAlign'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['noContentTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} .gvnews_empty_module",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['noContentTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['noContentColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_empty_module",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['noContentColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['noContentBackground'] ) ) {
			$this->handle_background( ".{$this->element_id} .gvnews_empty_module", $this->attrs['noContentBackground'] );
		}

		if ( isset( $this->attrs['noContentBorder'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_empty_module",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['noContentBorder'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['noContentPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_empty_module",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['noContentPadding'],
					'device_control' => true,
				)
			);
		}
	}
}
