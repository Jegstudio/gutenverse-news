<?php
/**
 * Hero
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
class Hero extends StyleAbstract {


	/**
	 * Constructor
	 *
	 * @param array  $attrs Attribute.
	 * @param string $name Name.
	 */
	public function __construct( $attrs, $name = false ) {
		parent::__construct( $attrs, $name );

		$this->set_feature(
			array(
				'border'  => array(
					'normal' => ".{$this->element_id}.gvnews-block.gvnews-block-wrapper .gvnews_heroblock",
					'hover'  => ".{$this->element_id}.gvnews-block.gvnews-block-wrapper .gvnews_heroblock:hover",
				),
				'advance' => ".{$this->element_id}.gvnews-block.gvnews-block-wrapper .gvnews_heroblock",
			)
		);
	}

	/**
	 * Generate style base on attribute.
	 */
	public function generate() {

		if ( isset( $this->attrs['heroItemOverlay'] ) ) {
			foreach ( $this->attrs['heroItemOverlay'] as $key => $overlay ) {
				if ( $overlay['overlayEnable'] && isset( $overlay['OverlayGradient'] ) ) {
					$this->handle_background( ".{$this->element_id} .gvnews_hero_item_" . $key + 1 . ' .gvnews_thumb a > div:' . ( ( '5' === $this->attrs['heroStyle'] ) ? 'after' : 'before' ), $overlay['OverlayGradient'] );
				}
			}
		}

		if ( isset( $this->attrs['heroMargin'] ) ) {
			$this->inject_style(
				$this->inject_style(
					array(
						'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_heroblock_wrapper",
						'property'       => function ( $value ) {
							return "margin: 0 0 -{$value}px -{$value}px;";
						},
						'value'          => $this->attrs['heroMargin'],
						'device_control' => false,
					)
				)
			);
			$this->inject_style(
				$this->inject_style(
					array(
						'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} article.gvnews_post",
						'property'       => function ( $value ) {
							return "padding: 0 0 {$value}px {$value}px;";
						},
						'value'          => $this->attrs['heroMargin'],
						'device_control' => false,
					)
				)
			);
		}

		if ( isset( $this->attrs['boxShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.gvnews-block.gvnews-block-wrapper .gvnews_heroblock",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['boxShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['boxShadowHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.gvnews-block.gvnews-block-wrapper .gvnews_heroblock",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['boxShadowHover'],
					'device_control' => false,
				)
			);
		}
		if ( ! empty( $this->attrs['heightDesktop'] ) ) {
			$height = $this->attrs['heightDesktop'];
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_heroblock .gvnews_hero_wrapper .gvnews_heroblock_wrapper",
					'value'          => "height: {$height}px; ",
					'custom'         => '@media only screen and (min-width: 1025px)',
					'device_control' => false,
				)
			);
		}

		if ( ! empty( $this->attrs['height1024'] ) ) {
			$height = $this->attrs['height1024'];
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_heroblock .gvnews_hero_wrapper .gvnews_heroblock_wrapper",
					'value'          => "height: {$height}px; ",
					'custom'         => '@media only screen and (max-width: 1024px) and (min-width: 769px)',
					'device_control' => false,
				)
			);
		}

		if ( ! empty( $this->attrs['height768'] ) ) {
			$height = $this->attrs['height768'];
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_heroblock .gvnews_hero_wrapper .gvnews_heroblock_wrapper",
					'value'          => "height: {$height}px; ",
					'custom'         => '@media only screen and (max-width: 768px) and (min-width: 668px)',
					'device_control' => false,
				)
			);
		}

		if ( ! empty( $this->attrs['height667'] ) ) {
			$height = $this->attrs['height667'];
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_heroblock .gvnews_hero_wrapper .gvnews_heroblock_wrapper",
					'value'          => "height: {$height}px; ",
					'custom'         => '@media only screen and (max-width: 667px) and (min-width: 569px)',
					'device_control' => false,
				)
			);
		}

		if ( ! empty( $this->attrs['height568'] ) ) {
			$height = $this->attrs['height568'];
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_heroblock .gvnews_hero_wrapper .gvnews_heroblock_wrapper",
					'value'          => "height: {$height}px; ",
					'custom'         => '@media only screen and (max-width: 568px) and (min-width: 481px)',
					'device_control' => false,
				)
			);
		}

		if ( ! empty( $this->attrs['height480'] ) ) {
			$height = $this->attrs['height480'];
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_heroblock .gvnews_hero_wrapper .gvnews_heroblock_wrapper",
					'value'          => "height: {$height}px; ",
					'custom'         => '@media only screen and (max-width: 480px)',
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['categoryButtonTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector' => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_post_category a",
					'value'    => $this->attrs['categoryButtonTypography'],
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
					'selector' => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_post_excerpt .gvnews_readmore",
					'value'    => $this->attrs['readmoreButtonTypography'],
				)
			);
		}

		if ( isset( $this->attrs['readmoreButtonBackground'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_post_excerpt .gvnews_readmore",
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
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_post_excerpt .gvnews_readmore:hover",
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
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_post_excerpt .gvnews_readmore",
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
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_post_excerpt .gvnews_readmore:hover",
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
				".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_post_excerpt .gvnews_readmore"
			);
		}

		if ( isset( $this->attrs['readmoreButtonBorderHover'] ) ) {
			$this->handle_border(
				'readmoreButtonBorderHover',
				".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_post_excerpt .gvnews_readmore:hover"
			);
		}

		if ( isset( $this->attrs['readmoreButtonBoxShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_post_excerpt .gvnews_readmore",
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
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_post_excerpt .gvnews_readmore:hover",
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

	/**
	 * Generate design style.
	 */
	private function generate_design_style() {
		if ( isset( $this->attrs['typography'] ) ) {
				$this->inject_typography(
					array(
						'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_heroblock .gvnews_post_title a",
						'property'       => function ( $value ) {},
						'value'          => $this->attrs['typography'],
						'device_control' => false,
					)
				);
		}

		if ( isset( $this->attrs['secondTitleTypography'] ) ) {
			$selector = isset( $this->attrs['selectorSecondTitleTypography'] ) ? $this->attrs['selectorSecondTitleTypography'] : '.gvnews_heroblock .gvnews_post:not(.gvnews_hero_item_1) .gvnews_post_title a';

			$this->inject_typography(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} {$selector}",
					'property'       => function ( $value ) {
					},
					'value'          => $this->attrs['secondTitleTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['thridTitleTypography'] ) ) {
			$selector = isset( $this->attrs['selectorThridTitleTypography'] ) ? $this->attrs['selectorThridTitleTypography'] : '.gvnews_heroblock .gvnews_post:not(.gvnews_hero_item_1, .gvnews_hero_item_2) .gvnews_post_title a';

			$this->inject_typography(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} {$selector}",
					'property'       => function ( $value ) {
					},
					'value'          => $this->attrs['thridTitleTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['titleColor'] ) ) {

			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_heroblock .gvnews_post_title a",
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
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_heroblock .gvnews_post_title a:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['titleColorHover'],
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
	}

	/**
	 * Generate style block meta style.
	 */
	private function generate_meta_style() {
		if ( isset( $this->attrs['typographyMeta'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_heroblock .gvnews_post_meta>div ,.gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_post_meta .gvnews_meta_author .by",
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
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_heroblock .gvnews_post_meta>div ,.gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_post_meta .gvnews_meta_author .by , .gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_heroblock .gvnews_post_meta a",
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
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_heroblock .gvnews_post_meta a:hover",
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
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_post_meta .far ",
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
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_heroblock .gvnews_post_meta a:hover .far",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['metaIconColorHover'],
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

		if ( isset( $this->attrs['metaAuthorColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_heroblock .gvnews_meta_author a",
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
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_heroblock .gvnews_meta_author a:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['metaAuthorColorHover'],
					'device_control' => false,
				)
			);
		}
	}
}
