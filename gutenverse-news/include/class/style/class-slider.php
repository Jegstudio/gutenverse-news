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
				'positioning' => ".{$this->element_id}.gvnews-block.gvnews-block-wrapper",
				'animation'   => null,
				'advance'     => ".{$this->element_id} .gvnews_slider_wrapper",
			)
		);
	}

	/**
	 * Generate style base on attribute.
	 */
	public function generate() {

		$this->navigation_button_style();
		$this->slider_1_style();
		$this->dot_style();
		$this->no_content_style();
		// $this->slider_3_style();

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

		if ( isset( $this->attrs['categoryButtonTypography'] ) ) {
			$selector = 'GUTENVERSE\\NEWS\\Block\\Slider\\Slider_8' === $this->attrs['gvnewsModule'] ? '.gvnews_slider_type_8 .gvnews_post_category a' : '.gvnews_slide_caption .gvnews_post_category a';

			$this->inject_typography(
				array(
					'selector' => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} {$selector}",
					'value'    => $this->attrs['categoryButtonTypography'],
				)
			);
		}

		if ( isset( $this->attrs['categoryButtonPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_post_category a",
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
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_post_category",
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
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_post_category a",
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
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_post_category a:hover",
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
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_post_category a",
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
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_post_category a:hover",
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
				".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_post_category a"
			);
		}

		if ( isset( $this->attrs['categoryButtonBorderHover'] ) ) {
			$this->handle_border(
				'categoryButtonBorderHover',
				".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_post_category a:hover"
			);
		}

		if ( isset( $this->attrs['categoryButtonBoxShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_post_category a",
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
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_post_category a:hover",
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

		if ( isset( $this->attrs['readmoreButtonColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_type_7 .gvnews_readmore:before",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background' );
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

		if ( isset( $this->attrs['readmoreButtonColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_type_7 .gvnews_readmore:hover:before",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background' );
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
		$this->generate_design_style();
		if ( empty( $this->attrs['showMeta'] ) || ( isset( $this->attrs['showMeta'] ) && $this->attrs['showMeta'] ) ) {
			$this->generate_meta_style();
		}
	}

	// === PRIVATE FUNCTIONS ===

	/**
	 * Generate design style.
	 */
	private function generate_design_style() {
		if ( isset( $this->attrs['typography'] ) ) {

			$selector = 'GUTENVERSE\\NEWS\\Block\\Slider\\Slider_8' === $this->attrs['gvnewsModule'] ? '.gvnews_slider_type_8 .gvnews_post_title' : '.gvnews_slider_wrapper .gvnews_slide_caption .gvnews_post_title';
			$this->inject_typography(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} {$selector}",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['typography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['secondTitleTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_wrapper .gvnews_pl_sm .gvnews_post_title",
					'property'       => function ( $value ) {
					},
					'value'          => $this->attrs['secondTitleTypography'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['titleColor'] ) ) {

			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_wrapper .gvnews_post_title a",
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
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_wrapper .gvnews_post_title a:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['titleColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['lineThick'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id}.gvnews-slider-6 .gvnews_slider_wrapper .gvnews_post_title:before",
					'property'       => function ( $value ) {
						return "border-width: {$value}px;";
					},
					'value'          => $this->attrs['lineThick'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['hideTitleStyling'] ) && $this->attrs['hideTitleStyling'] ) { // For Slider 4.
			$this->inject_style(
				array(
					'selector'       => ".gvnews-slider-4.{$this->element_id} .gvnews_slider_type_4_wrapper.gvnews_slider_wrapper .gvnews_slider_type_4 .tns-slide-active .gvnews_slide_caption:before,
										.gvnews-slider-4.{$this->element_id} .gvnews_slider_type_4_wrapper.gvnews_slider_wrapper .gvnews_slider_type_4 .tns-slide-active .gvnews_slide_caption:after",
					'property'       => function ( $value ) {
						return 'content: none;';
					},
					'value'          => $this->attrs['hideTitleStyling'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['secondTitleColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_slider_type_9_thumb .gvnews_post_title a",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['secondTitleColor'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['typographyContent'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} .gvnews_slider .gvnews_slide_caption .gvnews_post_excerpt",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['typographyContent'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['excerptMetaGap'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_slider .gvnews_slide_caption .gvnews_post_meta",
					'property'       => function ( $value ) {
						return "margin-top:	{$value}px";
					},
					'value'          => $this->attrs['excerptMetaGap'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['excerptColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_slider .gvnews_slide_caption .gvnews_post_excerpt",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['excerptColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['containerPadding'] ) ) {
			$selector = 'GUTENVERSE\NEWS\Block\Slider\Slider_8' === $this->attrs['gvnewsModule'] ? '.gvnews_slider .gvnews_item_caption' : '.gvnews_slider .gvnews_slide_caption';
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} {$selector}",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['containerPadding'],
					'device_control' => true,
				)
			);
		}

		$this->generate_container_width();
	}

	/**
	 * Generate container width style.
	 */
	private function generate_container_width() {
		if ( isset( $this->attrs['containerWidth'] ) ) {
			switch ( $this->attrs['gvnewsModule'] ) {
				case 'GUTENVERSE\\NEWS\\Block\\Slider\\Slider_1':
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id} .gvnews_slider .gvnews_slide_caption .gvnews_caption_container",
							'property'       => function ( $value ) {
								return "width: {$value}%;";
							},
							'value'          => $this->attrs['containerWidth'],
							'device_control' => true,
						)
					);
					break;
				case 'GUTENVERSE\\NEWS\\Block\\Slider\\Slider_4':
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id} .gvnews_slider .gvnews_slide_caption",
							'property'       => function ( $value ) {
								return "width: {$value}%; max-width:unset;";
							},
							'value'          => $this->attrs['containerWidth'],
							'device_control' => true,
						)
					);
					break;

				default:
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id} .gvnews_slider .gvnews_slide_caption",
							'property'       => function ( $value ) {
								return "width: {$value}%;";
							},
							'value'          => $this->attrs['containerWidth'],
							'device_control' => true,
						)
					);
					break;
			}
		}
	}

	/**
	 * Generate style block meta style.
	 */
	private function generate_meta_style() {
		if ( isset( $this->attrs['typographyMeta'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_wrapper .gvnews_post_meta",
					'property'       => function ( $value ) {
					},
					'value'          => $this->attrs['typographyMeta'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['typographyMetaAuthor'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slide_caption .gvnews_meta_author a",
					'property'       => function ( $value ) {
					},
					'value'          => $this->attrs['typographyMetaAuthor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['metaColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_wrapper .gvnews_post_meta , .gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_post_meta .gvnews_meta_author .by , .gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_wrapper .gvnews_post_meta .gvnews_meta_date a",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['metaColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['metaColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_wrapper .gvnews_post_meta .gvnews_meta_date a:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['metaColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['metaIconColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_post_meta .fa ,.gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_post_meta .far , .gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_post_meta .fas, .gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_post_meta svg",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['metaIconColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['metaIconColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_post_meta>*:hover .fa ,.gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_post_meta>*:hover .far , .gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_post_meta>*:hover .fas, .gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_post_meta>*:hover svg",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['metaIconColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['metaAuthorColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slide_caption .gvnews_meta_author a",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['metaAuthorColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['metaAuthorColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slide_caption .gvnews_meta_author a:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['metaAuthorColorHover'],
					'device_control' => false,
				)
			);
		}
	}

	/**
	 * Generate Style for navigation button
	 */
	private function navigation_button_style() {
		if ( isset( $this->attrs['buttonTextTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_wrapper .tns-controls button span,
										.gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_type_7 .gvnews_block_nav a span",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['buttonTextTypography'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['hideNavigationButton'] ) && $this->attrs['hideNavigationButton'] ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_wrapper .tns-controls",
					'property'       => function ( $value ) {
						return 'display: none !important;';
					},
					'value'          => $this->attrs['hideNavigationButton'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['alwaysShowNavigationButton'] ) && $this->attrs['alwaysShowNavigationButton'] ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_wrapper .tns-controls,
										.gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_wrapper .tns-controls button",
					'property'       => function ( $value ) {
						return 'opacity: 1 !important;';
					},
					'value'          => $this->attrs['alwaysShowNavigationButton'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['buttonPosition'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_wrapper .tns-controls button.tns-next",
					'property'       => function ( $value ) {
						return "right: {$value}px;";
					},
					'value'          => $this->attrs['buttonPosition'],
					'device_control' => true,
				)
			);
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_wrapper .tns-controls button.tns-prev",
					'property'       => function ( $value ) {
						return "left: {$value}px;";
					},
					'value'          => $this->attrs['buttonPosition'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['transitionShow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_wrapper .tns-controls button,
										.gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_wrapper .tns-controls,
										.gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_type_7 .gvnews_block_nav a",
					'property'       => function ( $value ) {
						return "transition: opacity {$value}ms;";
					},
					'value'          => $this->attrs['transitionShow'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['gapBetweenButton'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_wrapper .tns-controls",
					'property'       => function ( $value ) {
						return "gap: {$value}px;";
					},
					'value'          => $this->attrs['gapBetweenButton'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['iconSize'] ) && ! empty( $this->attrs['iconSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_wrapper .tns-controls button,
									.gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_type_7 .gvnews_block_nav a",
					'property'       => function ( $value ) {
						return "font-size: {$value}px; height: fit-content; width: fit-content;";
					},
					'value'          => $this->attrs['iconSize'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['buttonHeight'] ) && ! empty( $this->attrs['buttonHeight'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_wrapper .tns-controls button.tns-next,
									.gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_wrapper .tns-controls button.tns-prev,
									.gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_type_7 .gvnews_block_nav a",
					'property'       => function ( $value ) {
						return "height: {$value}px;";
					},
					'value'          => $this->attrs['buttonHeight'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['buttonWidth'] ) && ! empty( $this->attrs['buttonWidth'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_wrapper .tns-controls button.tns-next,
									.gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_wrapper .tns-controls button.tns-prev,
									.gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_type_7 .gvnews_block_nav a",
					'property'       => function ( $value ) {
						return "width: {$value}px;";
					},
					'value'          => $this->attrs['buttonWidth'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['buttonGap'] ) && ! empty( $this->attrs['buttonGap'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_wrapper .tns-controls button,
									.gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_type_7 .gvnews_block_nav a",
					'property'       => function ( $value ) {
						return "gap: {$value}px;";
					},
					'value'          => $this->attrs['buttonGap'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['buttonPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_wrapper .tns-controls button,
									.gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_type_7 .gvnews_block_nav a",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['buttonPadding'],
					'device_control' => true,
				)
			);
		}

		// BUTTON.
		if ( isset( $this->attrs['buttonColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_wrapper .tns-controls button i,
									.gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_wrapper .tns-controls button svg,
									.gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_type_7 .gvnews_block_nav a i,
									.gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_type_7 .gvnews_block_nav a svg",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['buttonColor'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['buttonColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_wrapper .tns-controls button:hover i,
									.gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_wrapper .tns-controls button:hover svg,
									.gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_type_7 .gvnews_block_nav a:hover i,
									.gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_type_7 .gvnews_block_nav a:hover svg",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['buttonColorHover'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['textColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_wrapper .tns-controls button span,
									.gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_type_7 .gvnews_block_nav a span",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['textColor'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['textColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_wrapper .tns-controls button:hover span,
									.gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_type_7 .gvnews_block_nav a:hover span",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['textColorHover'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['buttonBgColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_wrapper .tns-controls button,
									.gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_type_7 .gvnews_block_nav a",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['buttonBgColor'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['buttonBgColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_wrapper .tns-controls button:hover,
									.gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_type_7 .gvnews_block_nav a:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['buttonBgColorHover'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['borderButton'] ) ) {
			$this->handle_border(
				'borderButton',
				".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_wrapper .tns-controls button,
				.gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_type_7 .gvnews_block_nav a"
			);
		}
		if ( isset( $this->attrs['borderButtonHover'] ) ) {
			$this->handle_border(
				'borderButtonHover',
				".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_wrapper .tns-controls button:hover,
				.gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_type_7 .gvnews_block_nav a:hover"
			);
		}

		if ( isset( $this->attrs['borderResponsiveButton'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_wrapper .tns-controls button,
										.gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_type_7 .gvnews_block_nav a",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['borderResponsiveButton'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}
		if ( isset( $this->attrs['borderResponsiveButtonHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_wrapper .tns-controls button:hover,
										.gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_type_7 .gvnews_block_nav a:hover",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['borderResponsiveButtonHover'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}
	}

	/**
	 * Generate Style for slider-1
	 *
	 * @return void
	 */
	private function slider_1_style() {
		if ( ! stristr( $this->attrs['gvnewsModule'], 'Slider_1' ) ) {
			return;
		}

		if ( isset( $this->attrs['nextButtonColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .tns-controls .tns-next",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['nextButtonColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['nextButtonColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .tns-controls .tns-next:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['nextButtonColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['prevButtonColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .tns-controls .tns-prev",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['prevButtonColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['prevButtonColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .tns-controls .tns-prev:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['prevButtonColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['nextIconSize'] ) && ! empty( $this->attrs['nextIconSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .tns-controls .tns-next",
					'property'       => function ( $value ) {
						return "font-size: {$value}px; height: fit-content; width: fit-content;";
					},
					'value'          => $this->attrs['nextIconSize'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['nextButtonHeight'] ) && ! empty( $this->attrs['nextButtonHeight'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .tns-controls .tns-next",
					'property'       => function ( $value ) {
						return "height: {$value}px;";
					},
					'value'          => $this->attrs['nextButtonHeight'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['nextButtonWidth'] ) && ! empty( $this->attrs['nextButtonWidth'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .tns-controls .tns-next",
					'property'       => function ( $value ) {
						return "width: {$value}px;";
					},
					'value'          => $this->attrs['nextButtonWidth'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['prevIconSize'] ) && ! empty( $this->attrs['prevIconSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .tns-controls .tns-prev",
					'property'       => function ( $value ) {
						return "font-size: {$value}px; height: fit-content; width: fit-content;";
					},
					'value'          => $this->attrs['prevIconSize'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['prevButtonHeight'] ) && ! empty( $this->attrs['prevButtonHeight'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .tns-controls .tns-prev",
					'property'       => function ( $value ) {
						return "height: {$value}px;";
					},
					'value'          => $this->attrs['prevButtonHeight'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['prevButtonWidth'] ) && ! empty( $this->attrs['prevButtonWidth'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .tns-controls .tns-prev",
					'property'       => function ( $value ) {
						return "width: {$value}px;";
					},
					'value'          => $this->attrs['prevButtonWidth'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['nextButtonPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .tns-controls .tns-next",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['nextButtonPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['prevButtonPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .tns-controls .tns-prev",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['prevButtonPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['nextButtonBgColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .tns-controls .tns-next",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['nextButtonBgColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['prevButtonBgColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .tns-controls .tns-prev",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['prevButtonBgColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['nextButtonBgColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .tns-controls .tns-next:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['nextButtonBgColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['prevButtonBgColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .tns-controls .tns-prev:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['prevButtonBgColorHover'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['hideImageNavigation'] ) && $this->attrs['hideImageNavigation'] ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} #tns2-mw.tns-ovh",
					'property'       => function ( $value ) {
						return 'display: none !important;';
					},
					'value'          => $this->attrs['hideImageNavigation'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['tootlipColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_thumbnail_wrapper .tns-ovh",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['tootlipColor'],
					'device_control' => false,
				)
			);
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_wrapper .gvnews_slider_thumbnail .tns-slide-active.current .gvnews_slide_thumbnail_item:before",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'border-top-color' );
					},
					'value'          => $this->attrs['tootlipColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['hideImageNavigation'] ) && $this->attrs['hideImageNavigation'] ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_wrapper .gvnews_slider_thumbnail_wrapper",
					'property'       => function ( $value ) {
						return 'display:none;';
					},
					'value'          => $this->attrs['hideImageNavigation'],
					'device_control' => false,
				)
			);
		}
	}

	/**
	 * Generate slider 2 style.
	 */
	private function dot_style() {
		if ( isset( $this->attrs['alwaysShowDot'] ) && $this->attrs['alwaysShowDot'] ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_wrapper .tns-nav",
					'property'       => function ( $value ) {
						return 'opacity: 1 !important;';
					},
					'value'          => $this->attrs['alwaysShowDot'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['hideDot'] ) && $this->attrs['hideDot'] ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_wrapper .tns-nav",
					'property'       => function ( $value ) {
						return 'opacity: 0 !important;';
					},
					'value'          => $this->attrs['hideDot'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['dotGap'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_wrapper .tns-nav",
					'property'       => function ( $value ) {
						return "gap: {$value}px;";
					},
					'value'          => $this->attrs['dotGap'],
					'device_control' => true,
				)
			);
		}

		// Dot Normal.
		if ( isset( $this->attrs['dotNormalColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_wrapper .tns-nav button",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['dotNormalColor'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['dotBorderNormalColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_wrapper .tns-nav button",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'border-color' );
					},
					'value'          => $this->attrs['dotBorderNormalColor'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['dotNormalSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_wrapper .tns-nav button",
					'property'       => function ( $value ) {
						return "width: {$value}px; height: {$value}px; border-radius: 100%;";
					},
					'value'          => $this->attrs['dotNormalSize'],
					'device_control' => true,
				)
			);
		}

		// Dot Hover.
		if ( isset( $this->attrs['dotHoverColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_wrapper .tns-nav button:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['dotHoverColor'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['dotBorderHoverColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_wrapper .tns-nav button:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'border-color' );
					},
					'value'          => $this->attrs['dotBorderHoverColor'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['dotHoverSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_wrapper .tns-nav button:hover",
					'property'       => function ( $value ) {
						return "width: {$value}px; height: {$value}px; border-radius: 100%;";
					},
					'value'          => $this->attrs['dotHoverSize'],
					'device_control' => true,
				)
			);
		}

		// Active.
		if ( isset( $this->attrs['dotActiveColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_wrapper .tns-nav button.tns-active",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['dotActiveColor'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['dotBorderActiveColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_wrapper .tns-nav button.tns-active",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'border-color' );
					},
					'value'          => $this->attrs['dotBorderActiveColor'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['dotActiveSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_wrapper .tns-nav button.tns-active",
					'property'       => function ( $value ) {
						return "width: {$value}px; height: {$value}px; border-radius: 100%;";
					},
					'value'          => $this->attrs['dotActiveSize'],
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

	/**
	 * TODO
	 * Generate slider 3 style.
	 */
	// private function slider_3_style() {
	// if ( ! stristr( $this->attrs['gvnewsModule'], 'Slider_3' ) ) {
	// return;
	// }

	// if ( isset( $this->attrs['gapItem'] ) ) {
	// $this->inject_style(
	// array(
	// 'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_type_3_wrapper .tns-inner .gvnews_slider_type_3 .tns-item",
	// 'property'       => function ( $value ) {
	// return "padding-right: {$value}px !important;";
	// },
	// 'value'          => $this->attrs['gapItem'],
	// 'device_control' => true,
	// )
	// );
	// }

	// if ( isset( $this->attrs['itemWidth'] ) ) {
	// $this->inject_style(
	// array(
	// 'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_type_3_wrapper .tns-inner .gvnews_slider_type_3 .tns-item",
	// 'property'       => function ( $value ) {
	// return $this->handle_unit_point( $value, 'width', true );
	// },
	// 'value'          => $this->attrs['itemWidth'],
	// 'device_control' => true,
	// )
	// );
	// }
	// }
}
