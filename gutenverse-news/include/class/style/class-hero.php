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

		$this->hero_14_style();
		$this->title_meta_style();
		$this->generate_design_style();

		if ( isset( $this->attrs['heroItemOverlay'] ) && ( ! stristr( $this->attrs['gvnewsModule'], 'Hero_14' ) ) ) {
			foreach ( $this->attrs['heroItemOverlay'] as $key => $local_attr ) {
				if ( $local_attr['overlayEnable'] && isset( $local_attr['OverlayGradient'] ) ) {
					$this->handle_background( ".{$this->element_id} .gvnews_hero_item_" . $key + 1 . ' .gvnews_thumb a > div:' . ( ( '5' === $this->attrs['heroStyle'] ) ? 'after' : 'before' ), $local_attr['OverlayGradient'] );
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
					'property'       => 'direct',
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
					'property'       => 'direct',
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
					'property'       => 'direct',
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
					'property'       => 'direct',
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
					'property'       => 'direct',
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
					'property'       => 'direct',
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

		if ( empty( $this->attrs['showMeta'] ) || ( isset( $this->attrs['showMeta'] ) && $this->attrs['showMeta'] ) ) {
				$this->generate_meta_style();
		}
	}

	/**
	 * Generate design style.
	 */
	private function generate_design_style() {
		$selector  = ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_heroblock .gvnews_post";
		$selector2 = isset( $this->attrs['selectorSecondTitleTypography'] ) ? $this->attrs['selectorSecondTitleTypography'] : '.gvnews_heroblock .gvnews_post:not(.gvnews_hero_item_1)';
		$selector3 = isset( $this->attrs['selectorThridTitleTypography'] ) ? $this->attrs['selectorThridTitleTypography'] : '.gvnews_heroblock .gvnews_post:not(.gvnews_hero_item_1, .gvnews_hero_item_2)';
		if ( isset( $this->attrs['typography'] ) ) {
				$this->inject_typography(
					array(
						'selector'       => $selector . ' .gvnews_post_title',
						'property'       => function ( $value ) {},
						'value'          => $this->attrs['typography'],
						'device_control' => false,
					)
				);
		}

		if ( isset( $this->attrs['secondTitleTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} {$selector2} .gvnews_post_title",
					'property'       => function ( $value ) {
					},
					'value'          => $this->attrs['secondTitleTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['thridTitleTypography'] ) ) {

			$this->inject_typography(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} {$selector3} .gvnews_post_title",
					'property'       => function ( $value ) {
					},
					'value'          => $this->attrs['thridTitleTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['borderItem'] ) ) {
			$this->handle_border(
				'borderItem',
				$selector
			);
		}
		if ( isset( $this->attrs['borderItemSecond'] ) ) {
			$this->handle_border(
				'borderItemSecond',
				".gvnews-block.gvnews-block-wrapper.{$this->element_id} {$selector2}"
			);
		}
		if ( isset( $this->attrs['borderItemThird'] ) ) {
			$this->handle_border(
				'borderItemThird',
				".gvnews-block.gvnews-block-wrapper.{$this->element_id} {$selector3}"
			);
		}

		if ( isset( $this->attrs['borderResponsiveItem'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $selector,
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['borderResponsiveItem'],
					'device_control' => true,
					'skip_device'    => isset( $this->attrs['borderResponsiveItem'] ) ? array(
						'Desktop',
					) : null,
				)
			);
		}
		if ( isset( $this->attrs['borderResponsiveItemSecond'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} {$selector2}",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['borderResponsiveItemSecond'],
					'device_control' => true,
					'skip_device'    => isset( $this->attrs['borderResponsiveItemSecond'] ) ? array(
						'Desktop',
					) : null,
				)
			);
		}
		if ( isset( $this->attrs['borderResponsiveItemThird'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} {$selector3}",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['borderResponsiveItemThird'],
					'device_control' => true,
					'skip_device'    => isset( $this->attrs['borderResponsiveItemThird'] ) ? array(
						'Desktop',
					) : null,
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

	/**
	 * Additional style for hero 14
	 *
	 * @return void
	 */
	private function hero_14_style() {
		if ( ! stristr( $this->attrs['gvnewsModule'], 'Hero_14' ) ) {
			return;
		}

		$positions = array( 'Left', 'Center', 'Right' );
		foreach ( $positions as $position ) {
			$position_class = strtolower( $position );
			$parent_class   = ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .{$position_class} .gvnews_postblock_content";
			if ( isset( $this->attrs[ 'titleTypography' . $position ] ) ) {
				$this->inject_typography(
					array(
						'selector'       => $parent_class . ' .gvnews_post_title',
						'property'       => function ( $value ) {},
						'value'          => $this->attrs[ 'titleTypography' . $position ],
						'device_control' => false,
					)
				);
			}
			if ( isset( $this->attrs[ 'metaTypography' . $position ] ) ) {
				$this->inject_typography(
					array(
						'selector'       => $parent_class . ' .gvnews_post_meta',
						'property'       => function ( $value ) {},
						'value'          => $this->attrs[ 'metaTypography' . $position ],
						'device_control' => false,
					)
				);
			}
			if ( isset( $this->attrs[ 'titleColor' . $position ] ) ) {
				$this->inject_style(
					array(
						'selector'       => $parent_class . ' .gvnews_post_title a',
						'property'       => function ( $value ) {
							return $this->handle_color( $value, 'color' );
						},
						'value'          => $this->attrs[ 'titleColor' . $position ],
						'device_control' => false,
					)
				);
			}
			if ( isset( $this->attrs[ 'titleColorHover' . $position ] ) ) {
				$this->inject_style(
					array(
						'selector'       => $parent_class . ' .gvnews_post_title:hover a',
						'property'       => function ( $value ) {
							return $this->handle_color( $value, 'color' );
						},
						'value'          => $this->attrs[ 'titleColorHover' . $position ],
						'device_control' => false,
					)
				);
			}
			if ( isset( $this->attrs[ 'metaColor' . $position ] ) ) {
				$this->inject_style(
					array(
						'selector'       => $parent_class . ' .gvnews_post_meta a',
						'property'       => function ( $value ) {
							return $this->handle_color( $value, 'color' );
						},
						'value'          => $this->attrs[ 'metaColor' . $position ],
						'device_control' => false,
					)
				);
			}
			if ( isset( $this->attrs[ 'excerptColor' . $position ] ) ) {
				$this->inject_style(
					array(
						'selector'       => $parent_class . ' .gvnews_post_excerpt p',
						'property'       => function ( $value ) {
							return $this->handle_color( $value, 'color' );
						},
						'value'          => $this->attrs[ 'excerptColor' . $position ],
						'device_control' => false,
					)
				);
			}
		}
	}

	/**
	 * Style for Title, meta, and excerpt.
	 *
	 * @return void
	 */
	private function title_meta_style() {
		if ( stristr( $this->attrs['gvnewsModule'], 'Hero_14' ) ) { // Not for hero 14.
			return;
		}
		$parent_class = ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_heroblock_wrapper";
		if ( isset( $this->attrs['titleTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => $parent_class . ' .gvnews_post_title',
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['titleTypography'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['metaTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => $parent_class . ' .gvnews_post_meta',
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['metaTypography'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['titleColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $parent_class . ' .gvnews_post_title a',
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
					'selector'       => $parent_class . ' .gvnews_post_title:hover a',
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['titleColorHover'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['metaColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $parent_class . ' .gvnews_post_meta a',
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['metaColor'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['excerptColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $parent_class . ' .gvnews_post_excerpt p',
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['excerptColor'],
					'device_control' => false,
				)
			);
		}
	}
}
