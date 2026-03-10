<?php
/**
 * Block
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
class Block extends StyleAbstract {

	/**
	 * Undocumented variable
	 *
	 * @var string|null
	 */
	private string|null $main_thumbnail_class = null;

	/**
	 * Undocumented variable
	 *
	 * @var string|null
	 */
	private string|null $second_thumbnail_class = null;

	/**
	 * Constructor
	 *
	 * @param array       $attrs Attribute.
	 * @param string|bool $name Name.
	 */
	public function __construct( $attrs, $name = false ) {
		parent::__construct( $attrs, $name );
		$this->set_class_thumbnail();

		$this->set_feature(
			array(
				'background'  => array(
					'normal' => ".gvnews-block-wrapper.{$this->element_id} .gvnews_postblock",
					'hover'  => ".gvnews-block-wrapper.{$this->element_id} .gvnews_postblock:hover",
				),
				'border'      => array(
					'normal' => ".{$this->element_id}.gvnews-block.gvnews-block-wrapper .gvnews_postblock",
					'hover'  => ".{$this->element_id}.gvnews-block.gvnews-block-wrapper .gvnews_postblock:hover",
				),
				'advance'     => ".gvnews-block-wrapper.{$this->element_id} .gvnews_postblock",
				'positioning' => ".{$this->element_id}.gvnews-block.gvnews-block-wrapper",
			)
		);
	}

	/**
	 * Generate style base on attribute.
	 */
	public function generate() {

		$this->generate_header_style();
		$this->generate_thumbnail_style();
		$this->generate_thumbnail_overlay_style();
		$this->generate_content_container_style();
		$this->title_container_style();
		$this->post_item_style();
		$this->no_content_style();
		$this->generate_card_style();

		if ( isset( $this->attrs['enableBoxed'] ) ) {
			if ( $this->attrs['enableBoxed'] ) {
				$selectorbx = array(
					'normal' => ".{$this->element_id} .gvnews_postblock",
					'hover'  => ".{$this->element_id} .gvnews_postblock:hover",
				);
				if ( isset( $this->attrs['background'] ) ) {
					$this->handle_background( $selectorbx['normal'], $this->attrs['background'] );
				}
				if ( isset( $this->attrs['backgroundHover'] ) ) {
					$this->handle_background( $selectorbx['hover'], $this->attrs['backgroundHover'] );
				}
			}
		}
		if ( isset( $this->attrs['typography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => $this->get_selector( 'selectorTitleTypography', '.gvnews_post .gvnews_post_title' ),
					'property'       => function ( $value ) {
					},
					'value'          => $this->attrs['typography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['secondTitleTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => $this->get_selector( 'selectorSecondTitleTypography', '.gvnews_pl_sm .gvnews_post_title' ),
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
					'selector'       => $this->get_selector( 'selectorThridTitleTypography', '.gvnews_pl_xs_2 .gvnews_post_title' ),
					'property'       => function ( $value ) {
					},
					'value'          => $this->attrs['thridTitleTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['typographyContent'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} .gvnews_post_excerpt p, .{$this->element_id} .gvnews_post_excerpt .gvnews_readmore",
					'property'       => function ( $value ) {
					},
					'value'          => $this->attrs['typographyContent'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['bgColor'] ) ) {
			if ( 'JNews_Block_30' === $this->attrs['gvnewsModule'] ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .gvnews_postblock .gvnews_post",
						'property'       => function ( $value ) {
							return $this->handle_color( $value, 'background' );
						},
						'value'          => $this->attrs['bgColor'],
						'device_control' => false,
					)
				);
			} elseif ( 'JNews_Block_32' === $this->attrs['gvnewsModule'] || 'JNews_Block_35' === $this->attrs['gvnewsModule'] ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .gvnews_postblock .box_wrap",
						'property'       => function ( $value ) {
							return $this->handle_color( $value, 'background' );
						},
						'value'          => $this->attrs['bgColor'],
						'device_control' => false,
					)
				);
			} elseif ( 'JNews_Block_38' === $this->attrs['gvnewsModule'] ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .gvnews_postblock .gvnews_post",
						'property'       => function ( $value ) {
							return $this->handle_color( $value, 'background-color' );
						},
						'value'          => $this->attrs['bgColor'],
						'device_control' => false,
					)
				);
			} else {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .gvnews_postblock_content, .{$this->element_id} .gvnews_postblock .gvnews_inner_post",
						'property'       => function ( $value ) {
							return $this->handle_color( $value, 'background' );
						},
						'value'          => $this->attrs['bgColor'],
						'device_control' => false,
					)
				);
			}
		}
		if ( isset( $this->attrs['bgColorRead'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_readmore",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background' );
					},
					'value'          => $this->attrs['bgColorRead'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['aHover'] ) ) {
			$selector = isset( $this->attrs['selectorTitleColor'] ) ? $this->attrs['selectorTitleColor'] : '.gvnews_postblock .gvnews_post_title a';

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_postblock .gvnews_meta_author a, .{$this->element_id} {$selector}:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['aHover'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['titleColor'] ) ) {
			$selector = isset( $this->attrs['selectorTitleColor'] ) ? $this->attrs['selectorTitleColor'] : '.gvnews_post_title a';

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}  {$selector}",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['titleColor'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['excerptColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}  .gvnews_post_excerpt",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['excerptColor'],
					'device_control' => false,
				)
			);
		}
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
					'selector'       => 'GUTENVERSE\\NEWS\\Block\\Module\\Module_3' === $this->attrs['gvnewsModule'] ? ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_post .gvnews_post_category span" : ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_post .gvnews_post_category",
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

		if ( isset( $this->attrs['readmoreButtonPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_readmore",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['readmoreButtonPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['readmoreButtonMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_readmore",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['readmoreButtonMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['paginationMode'] ) ) {
			if ( 'disable' !== $this->attrs['paginationMode'] && '' !== $this->attrs['paginationMode'] ) {
				$this->generate_pagination_style();
			}
		}

		if ( empty( $this->attrs['showMeta'] ) || ( isset( $this->attrs['showMeta'] ) && $this->attrs['showMeta'] ) ) {
			$this->generate_meta_style();
		}

		if ( isset( $this->attrs['listIconColor'] ) ) {
			$selector = isset( $this->attrs['selectorIconList'] ) ? $this->attrs['selectorIconList'] : '.gvnews_pl_xs_2>i, .gvnews_pl_xs_2>.gutenverse-icon-svg svg';
			$this->inject_style(
				array(
					'selector'       => $this->get_selector( 'selectorIconList', $selector ),
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['listIconColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['borderItem'] ) ) {
			$this->handle_border(
				'borderItem',
				".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .{$this->main_thumbnail_class}.gvnews_post"
			);
		}

		if ( isset( $this->attrs['borderItemResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .{$this->main_thumbnail_class}.gvnews_post",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['borderItemResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}
		do_action( 'gvnews_module_style', $this );
	}
	/**
	 * Generate style block no content style.
	 */
	private function no_content_style() {
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
	 * Generate style block post item style.
	 */
	public function post_item_style() {
		$post_item_grid = isset( $this->attrs['postItemGrid'] ) ? $this->attrs['postItemGrid'] : false;

		if ( $post_item_grid ) {

			if ( isset( $this->attrs['mainItemGap'] ) ) {
				$main_item_selector = isset( $this->attrs['mainItemSelector'] ) ? $this->attrs['mainItemSelector'] : '.gvnews_block_container > .gvnews_post';

				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} {$main_item_selector}",
						'property'       => function ( $value ) {
								return "margin-bottom: {$value}px;";
						},
						'value'          => $this->attrs['mainItemGap'],
						'device_control' => true,
					)
				);
			}

			if ( isset( $this->attrs['rowItemGap'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .gvnews_posts",
						'property'       => function ( $value ) {
							return "row-gap: {$value}px;";
						},
						'value'          => $this->attrs['rowItemGap'],
						'device_control' => true,
					)
				);

				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .gvnews_postblock .gvnews_block_navigation",
						'property'       => function ( $value ) {
							return "margin-top: {$value}px;";
						},
						'value'          => $this->attrs['rowItemGap'],
						'device_control' => true,
					)
				);
			}

			if ( isset( $this->attrs['columnItemGap'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .gvnews_posts",
						'property'       => function ( $value ) {
							return "column-gap: {$value}px;";
						},
						'value'          => $this->attrs['columnItemGap'],
						'device_control' => true,
					)
				);
			}

			if ( isset( $this->attrs['secondListSelector'] ) ) {
				$second_list_selector = isset( $this->attrs['secondListSelector'] ) ? $this->attrs['secondListSelector'] : 'gvnews_postblock .gvnews_posts .gvnews_postsmall:first-of-type';
				if ( isset( $this->attrs['rowItemGap'] ) ) {
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id} .gvnews_postblock_1 .gvnews_block_container",
							'property'       => function ( $value ) {
								return "gap: {$value}px;";
							},
							'value'          => $this->attrs['rowItemGap'],
							'device_control' => true,
						)
					);
				}

				if ( isset( $this->attrs['columnItemGapSecond'] ) ) {
					$this->inject_style(
						array(
							'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} {$second_list_selector}",
							'property'       => function ( $value ) {
								return "gap: {$value}px;";
							},
							'value'          => $this->attrs['columnItemGapSecond'],
							'device_control' => true,
						)
					);

				}

				$third_list_selector = isset( $this->attrs['thirdListSelector'] ) ? $this->attrs['thirdListSelector'] : 'gvnews_postblock .gvnews_posts .gvnews_postsmall:first-of-type';

				if ( isset( $this->attrs['columnItemGapThird'] ) ) {
					$this->inject_style(
						array(
							'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} {$third_list_selector}",
							'property'       => function ( $value ) {
								return "gap: {$value}px;";
							},
							'value'          => $this->attrs['columnItemGapThird'],
							'device_control' => true,
						)
					);

				}
			}
		} elseif ( isset( $this->attrs['rowItemGap'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .gvnews_posts .gvnews_post:not(:last-of-type)",
						'property'       => function ( $value ) {
							return "margin-bottom: {$value}px;";
						},
						'value'          => $this->attrs['rowItemGap'],
						'device_control' => true,
					)
				);

				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .gvnews_postblock .gvnews_block_navigation",
						'property'       => function ( $value ) {
							return "margin-top: {$value}px;";
						},
						'value'          => $this->attrs['rowItemGap'],
						'device_control' => true,
					)
				);
		}
	}

	// PRIVATE FUNCTION.

	/**
	 * Undocumented function
	 *
	 * @return void
	 */
	private function set_class_thumbnail() {
		$gvnews_module = ( 'GUTENVERSE\\NEWS\\Block\\Element\\Rss' !== $this->attrs['gvnewsModule'] ) ? $this->attrs['gvnewsModule']::get_instance() : \GUTENVERSE\NEWS\Block\Module\Module_3::get_instance();

		if ( isset( $gvnews_module->main_thumbnail_class ) ) {
			$this->main_thumbnail_class = $gvnews_module->main_thumbnail_class;
		}

		if ( isset( $gvnews_module->second_thumbnail_class ) ) {
			$this->second_thumbnail_class = $gvnews_module->second_thumbnail_class;
		}
	}

	/**
	 * Generate style block pagination style.
	 */
	private function generate_pagination_style() {
		if ( isset( $this->attrs['paginationWrapperMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .gvnews_block_navigation",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['paginationWrapperMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['paginationWrapperAlign'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_block_navigation .gvnews_block_nav, .gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_block_navigation .gvnews_block_loadmore",
					'property'       => function ( $value ) {
						return "justify-content: {$value};";
					},
					'value'          => $this->attrs['paginationWrapperAlign'],
					'device_control' => true,
				)
			);
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_block_navigation .gvnews_block_nav:before, .gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_block_navigation .gvnews_block_loadmore:before",
					'property'       => function ( $value ) {
						$result = '';
						if ( 'start' === $value || 'space-between' === $value ) {
							$result = 'none';
						} else {
							$result = 'block';
						}
						return "display: {$result};";
					},
					'value'          => $this->attrs['paginationWrapperAlign'],
					'device_control' => true,
				)
			);
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_block_navigation .gvnews_block_nav:after, .gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_block_navigation .gvnews_block_loadmore:after",
					'property'       => function ( $value ) {
						$result = '';
						if ( 'end' === $value || 'space-between' === $value ) {
							$result = 'none';
						} else {
							$result = 'block';
						}
						return "display: {$result};";
					},
					'value'          => $this->attrs['paginationWrapperAlign'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['paginationDisableSeparator'] ) ) {
			if ( $this->attrs['paginationDisableSeparator'] ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .gvnews_block_navigation .gvnews_block_nav:before, .{$this->element_id} .gvnews_block_navigation .gvnews_block_nav:after, .{$this->element_id} .gvnews_block_navigation .gvnews_block_loadmore:before, .{$this->element_id} .gvnews_block_navigation .gvnews_block_loadmore:after",
						'property'       => function () {
							return 'display: none !important;';
						},
						'value'          => $this->attrs['paginationDisableSeparator'],
						'device_control' => false,
					)
				);
			}
		}

		if ( isset( $this->attrs['showNavText'] ) && isset( $this->attrs['paginationMode'] ) ) {
			if ( $this->attrs['showNavText'] && 'nextprev' === $this->attrs['paginationMode'] && ! isset( $this->attrs['paginationWrapperAlign'] ) && ! isset( $this->attrs['paginationDisableSeparator'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_block_navigation .gvnews_block_nav, .gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_block_navigation .gvnews_block_loadmore",
						'property'       => function () {
							return 'justify-content: start;';
						},
						'value'          => 'start',
						'device_control' => true,
					)
				);
				$this->inject_style(
					array(
						'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_block_navigation .gvnews_block_nav:before, .gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_block_navigation .gvnews_block_loadmore:before",
						'property'       => function () {
							return 'display: none;';
						},
						'value'          => 'none',
						'device_control' => true,
					)
				);
				$this->inject_style(
					array(
						'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_block_navigation .gvnews_block_nav:after, .gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_block_navigation .gvnews_block_loadmore:after",
						'property'       => function () {
							return 'display: block;';
						},
						'value'          => 'block',
						'device_control' => true,
					)
				);
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .gvnews_block_navigation .gvnews_block_nav:before, .{$this->element_id} .gvnews_block_navigation .gvnews_block_nav:after, .{$this->element_id} .gvnews_block_navigation .gvnews_block_loadmore:before, .{$this->element_id} .gvnews_block_navigation .gvnews_block_loadmore:after",
						'property'       => function () {
							return 'display: none !important;';
						},
						'value'          => 'none',
						'device_control' => false,
					)
				);
			}
		}

		if ( isset( $this->attrs['paginationBtnTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id}.gvnews-block.gvnews-block-wrapper .gvnews_block_navigation a",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['paginationBtnTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['paginationBtnWidth'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_block_navigation .gvnews_block_loadmore a, .{$this->element_id} .gvnews_block_navigation .gvnews_block_nav a, .{$this->element_id} .gvnews_block_navigation .gvnews_block_nav.showtext a",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'width' );
					},
					'value'          => $this->attrs['paginationBtnWidth'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['paginationBtnIconSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_block_navigation .gvnews_block_nav i, .{$this->element_id} .gvnews_block_navigation .gvnews_block_nav .gutenverse-icon-svg svg",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'font-size' );
					},
					'value'          => $this->attrs['paginationBtnIconSize'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['paginationBtnHeight'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_block_navigation .gvnews_block_loadmore a, .{$this->element_id} .gvnews_block_navigation .gvnews_block_nav a",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'height' );
					},
					'value'          => $this->attrs['paginationBtnHeight'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['paginationBtnColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_block_navigation .gvnews_block_loadmore a, .{$this->element_id} .gvnews_block_navigation .gvnews_block_nav a:not(.disabled)",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['paginationBtnColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['paginationBtnHoverColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_block_navigation .gvnews_block_loadmore a:hover, .{$this->element_id} .gvnews_block_navigation .gvnews_block_nav a:not(.disabled):hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['paginationBtnHoverColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['paginationBtnDisableColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_block_navigation .gvnews_block_nav a.disabled",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['paginationBtnDisableColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['paginationBtnBackground'] ) ) {
			$this->handle_background( ".{$this->element_id} .gvnews_block_navigation .gvnews_block_loadmore a, .{$this->element_id} .gvnews_block_navigation .gvnews_block_nav a:not(.disabled)", $this->attrs['paginationBtnBackground'] );
		}

		if ( isset( $this->attrs['paginationBtnHoverBackground'] ) ) {
			$this->handle_background( ".{$this->element_id} .gvnews_block_navigation .gvnews_block_loadmore a:hover, .{$this->element_id} .gvnews_block_navigation .gvnews_block_nav a:not(.disabled):hover", $this->attrs['paginationBtnHoverBackground'] );
		}

		if ( isset( $this->attrs['paginationBtnDisableBackground'] ) ) {
			$this->handle_background( ".{$this->element_id} .gvnews_block_navigation .gvnews_block_nav a.disabled", $this->attrs['paginationBtnDisableBackground'] );
		}

		if ( isset( $this->attrs['paginationBtnBorder'] ) ) {
			$this->handle_border( 'paginationBtnBorder', ".{$this->element_id} .gvnews_block_navigation .gvnews_block_loadmore a, .{$this->element_id} .gvnews_pagination_nextprev .gvnews_block_navigation .gvnews_block_nav a" );
		}

		if ( isset( $this->attrs['paginationBtnHoverBorder'] ) ) {
			$this->handle_border( 'paginationBtnHoverBorder', ".{$this->element_id} .gvnews_block_navigation .gvnews_block_loadmore a:hover, .{$this->element_id} .gvnews_pagination_nextprev .gvnews_block_navigation .gvnews_block_nav a:hover" );
		}

		if ( isset( $this->attrs['paginationBtnDisableBorder'] ) ) {
			$this->handle_border( 'paginationBtnDisableBorder', ".{$this->element_id} .gvnews_pagination_nextprev .gvnews_block_navigation .gvnews_block_nav a.disabled" );
		}

		if ( isset( $this->attrs['paginationBtnBoxShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_block_navigation .gvnews_block_loadmore a, .{$this->element_id} .gvnews_block_navigation .gvnews_block_nav a:not(.disabled)",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['paginationBtnBoxShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['paginationBtnHoverBoxShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_block_navigation .gvnews_block_loadmore a:hover, .{$this->element_id} .gvnews_block_navigation .gvnews_block_nav a:not(.disabled):hover",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['paginationBtnHoverBoxShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['paginationBtnDisableBoxShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_block_navigation .gvnews_block_nav a.disabled",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['paginationBtnDisableBoxShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['paginationSeparatorStyle'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_block_navigation .gvnews_block_nav:before, .{$this->element_id} .gvnews_block_navigation .gvnews_block_nav:after, .{$this->element_id} .gvnews_block_navigation .gvnews_block_loadmore:before, .{$this->element_id} .gvnews_block_navigation .gvnews_block_loadmore:after",
					'property'       => function ( $value ) {
						return "border-bottom-style: {$value};";
					},
					'value'          => $this->attrs['paginationSeparatorStyle'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['paginationSeparatorColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_block_navigation .gvnews_block_nav:before, .{$this->element_id} .gvnews_block_navigation .gvnews_block_nav:after, .{$this->element_id} .gvnews_block_navigation .gvnews_block_loadmore:before, .{$this->element_id} .gvnews_block_navigation .gvnews_block_loadmore:after",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'border-bottom-color' );
					},
					'value'          => $this->attrs['paginationSeparatorColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['paginationSeparatorWidth'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_block_navigation .gvnews_block_nav:before, .{$this->element_id} .gvnews_block_navigation .gvnews_block_nav:after, .{$this->element_id} .gvnews_block_navigation .gvnews_block_loadmore:before, .{$this->element_id} .gvnews_block_navigation .gvnews_block_loadmore:after",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'border-bottom-width' );
					},
					'value'          => $this->attrs['paginationSeparatorWidth'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['paginationBtnGap'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_block_navigation .gvnews_block_nav, .{$this->element_id} .gvnews_block_navigation .gvnews_block_loadmore",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'gap' );
					},
					'value'          => $this->attrs['paginationBtnGap'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['paginationBtnDisableOpacity'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_block_navigation .gvnews_block_nav a.disabled",
					'property'       => function ( $value ) {
						return "opacity: {$value};";
					},
					'value'          => $this->attrs['paginationBtnDisableOpacity'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['paginationBtnIconSpacing'] ) && isset( $this->attrs['paginationMode'] ) && isset( $this->attrs['showNavText'] ) ) {
			if ( 'nextprev' === $this->attrs['paginationMode'] && $this->attrs['showNavText'] ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .gvnews_block_navigation .gvnews_block_nav.showtext .next i, .{$this->element_id} .gvnews_block_navigation .gvnews_block_nav.showtext .next svg",
						'property'       => function ( $value ) {
							return $this->handle_unit_point( $value, 'margin-left' );
						},
						'value'          => $this->attrs['paginationBtnIconSpacing'],
						'device_control' => true,
					)
				);
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .gvnews_block_navigation .gvnews_block_nav.showtext .prev i, .{$this->element_id} .gvnews_block_navigation .gvnews_block_nav.showtext .prev svg",
						'property'       => function ( $value ) {
							return $this->handle_unit_point( $value, 'margin-right' );
						},
						'value'          => $this->attrs['paginationBtnIconSpacing'],
						'device_control' => true,
					)
				);
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
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .gvnews_post_meta>div ,.gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .gvnews_meta_author .by",
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
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .gvnews_meta_author a",
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
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .gvnews_post_meta, .gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .gvnews_post_meta .by",
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
					'selector'       => '.gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .gvnews_post_meta>div:not(.gvnews_meta_author) a:hover',
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
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .gvnews_post_meta .fa ,.gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .gvnews_post_meta .far , .gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .gvnews_post_meta .fas, .gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .gvnews_post_meta svg",
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
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .gvnews_post_meta>div:hover .fa ,.gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .gvnews_post_meta>div:hover .far , .gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .gvnews_post_meta>div:hover .fas, .gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .gvnews_post_meta>div:hover svg",
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
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .gvnews_meta_author a",
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
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .gvnews_meta_author a:hover",
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
	 * Generate style block header style.
	 */
	private function generate_header_style() {

		$with_second_text   = isset( $this->attrs['headerType'] ) && in_array( $this->attrs['headerType'], array( 'heading_5', 'heading_6', 'heading_7', 'heading_8' ) );
		$with_header_filter = isset( $this->attrs['headerCategory'] ) || isset( $this->attrs['headerAuthor'] ) || isset( $this->attrs['headerTag'] );

		if ( isset( $this->attrs['headerTextTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_block_title span",
					'property'       => function ( $value ) {
					},
					'value'          => $this->attrs['headerTextTypography'],
					'device_control' => false,
				)
			);
		}
		if ( $with_second_text && isset( $this->attrs['headerSecondTextTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_block_title span strong",
					'property'       => function ( $value ) {
					},
					'value'          => $this->attrs['headerSecondTextTypography'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['headerFilterTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_subcat_list>li>a",
					'property'       => function ( $value ) {
					},
					'value'          => $this->attrs['headerFilterTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['headerTextColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_block_title span",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['headerTextColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['headerSecondTextColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_block_title span strong",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['headerSecondTextColor'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['headerBackgroundColor'] ) ) {
			if ( 'heading_1' === $this->attrs['headerType'] || 'heading_2' === $this->attrs['headerType'] || 'heading_4' === $this->attrs['headerType'] || 'heading_5' === $this->attrs['headerType'] ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .gvnews_block_{$this->attrs['headerType']} .gvnews_block_title span",
						'property'       => function ( $value ) {
							return $this->handle_color( $value, 'background' );
						},
						'value'          => $this->attrs['headerBackgroundColor'],
						'device_control' => false,
					)
				);
			}
		}
		if ( isset( $this->attrs['headerBackgroundColor2'] ) ) {
			if ( 'heading_3' === $this->attrs['headerType'] ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .gvnews_block_heading_3",
						'property'       => function ( $value ) {
							return $this->handle_color( $value, 'background' );
						},
						'value'          => $this->attrs['headerBackgroundColor2'],
						'device_control' => false,
					)
				);
			}
		}
		if ( isset( $this->attrs['headerSecondColor'] ) ) {
			if ( 'heading_2' === $this->attrs['headerType'] ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .gvnews_block_{$this->attrs['headerType']}",
						'property'       => function ( $value ) {
							return $this->handle_color( $value, 'background' );
						},
						'value'          => $this->attrs['headerSecondColor'],
						'device_control' => false,
					)
				);
			}
		}
		if ( isset( $this->attrs['headerLineColor'] ) ) {
			if ( 'heading_1' === $this->attrs['headerType'] || 'heading_6' === $this->attrs['headerType'] || 'heading_9' === $this->attrs['headerType'] ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .gvnews_block_{$this->attrs['headerType']}",
						'property'       => function ( $value ) {
							return $this->handle_color( $value, 'border-color' );
						},
						'value'          => $this->attrs['headerLineColor'],
						'device_control' => false,
					)
				);
			}
		}
		if ( isset( $this->attrs['headerLineColor2'] ) ) {
			if ( 'heading_5' === $this->attrs['headerType'] ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .gvnews_block_{$this->attrs['headerType']}:before",
						'property'       => function ( $value ) {
							return $this->handle_color( $value, 'border-color' );
						},
						'value'          => $this->attrs['headerLineColor2'],
						'device_control' => false,
					)
				);
			}
		}
		if ( isset( $this->attrs['headerAccentColor'] ) ) {
			if ( 'heading_6' === $this->attrs['headerType'] ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .gvnews_block_{$this->attrs['headerType']}:after",
						'property'       => function ( $value ) {
							return $this->handle_color( $value, 'background-color' );
						},
						'value'          => $this->attrs['headerAccentColor'],
						'device_control' => false,
					)
				);
			}
		}
		if ( isset( $this->attrs['headerAccentColor2'] ) ) {
			if ( 'heading_7' === $this->attrs['headerType'] ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .gvnews_block_{$this->attrs['headerType']} .gvnews_block_title span",
						'property'       => function ( $value ) {
							return $this->handle_color( $value, 'border-color' );
						},
						'value'          => $this->attrs['headerAccentColor2'],
						'device_control' => false,
					)
				);
			}
		}

		if ( isset( $this->attrs['headerHeight'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_block_heading .gvnews_block_title span , .{$this->element_id} .gvnews_block_heading",
					'property'       => function ( $value ) {
						return "height: {$value}px;";
					},
					'value'          => $this->attrs['headerHeight'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['headerTitlePadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_block_heading .gvnews_block_title span",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['headerTitlePadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['headerMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_block_heading",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['headerMargin'],
					'device_control' => true,
				)
			);
		}

		if ( $with_header_filter ) {
			if ( isset( $this->attrs['headerFilterColor'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_subcat_list>li>a:not(.current)",
						'property'       => function ( $value ) {
							return $this->handle_color( $value, 'color' );
						},
						'value'          => $this->attrs['headerFilterColor'],
						'device_control' => false,
					)
				);
			}
			if ( isset( $this->attrs['headerFilterColorActive'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_subcat_list>li>a.current",
						'property'       => function ( $value ) {
							return $this->handle_color( $value, 'color' );
						},
						'value'          => $this->attrs['headerFilterColorActive'],
						'device_control' => false,
					)
				);
			}

			if ( isset( $this->attrs['headerFilterColorHover'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_subcat_list>li>a:hover",
						'property'       => function ( $value ) {
							return $this->handle_color( $value, 'color' );
						},
						'value'          => $this->attrs['headerFilterColorHover'],
						'device_control' => false,
					)
				);
			}

			if ( isset( $this->attrs['headerTitlePadding'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_block_heading .gvnews_subcat",
						'property'       => function ( $value ) {
							return $this->handle_dimension( $value, 'padding' );
						},
						'value'          => $this->attrs['headerTitlePadding'],
						'device_control' => true,
					)
				);
			}
			$this->dropdown_header_filter_style();
		}

		switch ( $this->attrs['headerType'] ) {
			case 'heading_1':
				if ( isset( $this->attrs['headerLineThick'] ) ) {
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id} .gvnews_block_heading_1",
							'property'       => function ( $value ) {
								return "border-bottom-width: {$value}px;";
							},
							'value'          => $this->attrs['headerLineThick'],
							'device_control' => true,
						)
					);
				}
				break;

			case 'heading_3':
				if ( $with_header_filter && isset( $this->attrs['headerFilterLineColor'] ) ) {
					$this->inject_style(
						array(
							'selector' => ".{$this->element_id} .gvnews_block_heading_3 .gvnews_subcat_list li a.current",
							'property' => function ( $value ) {
								return $this->handle_color( $value, 'border-color' );
							},
							'value'    => $this->attrs['headerFilterLineColor'],
						)
					);
				}
				break;

			case 'heading_5':
				if ( isset( $this->attrs['headerLineThick'] ) ) {
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id} .gvnews_block_heading_5 .line",
							'property'       => function ( $value ) {
								return "border-bottom-width: {$value}px;";
							},
							'value'          => $this->attrs['headerLineThick'],
							'device_control' => true,
						)
					);
				}
				break;

			case 'heading_6':
				if ( isset( $this->attrs['headerLineThick'] ) ) {
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id} .gvnews_block_heading_6",
							'property'       => function ( $value ) {
								return "border-bottom-width: {$value}px;";
							},
							'value'          => $this->attrs['headerLineThick'],
							'device_control' => true,
						)
					);

					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id} .gvnews_block_heading_6:after",
							'property'       => function ( $value ) {
								return "height: {$value}px;";
							},
							'value'          => $this->attrs['headerLineThick'],
							'device_control' => true,
						)
					);

					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id} .gvnews_block_heading_6:after",
							'property'       => function ( $value ) {
								return "bottom: -{$value}px;";
							},
							'value'          => $this->attrs['headerLineThick'],
							'device_control' => true,
						)
					);
				}

				break;

			case 'heading_7':
				if ( isset( $this->attrs['headerLineThick'] ) ) {
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id} .gvnews_block_heading_7 .gvnews_block_title span",
							'property'       => function ( $value ) {
								return "border-bottom-width: {$value}px;";
							},
							'value'          => $this->attrs['headerLineThick'],
							'device_control' => true,
						)
					);
				}
				break;

			case 'heading_9':
				if ( isset( $this->attrs['headerLineThick'] ) ) {
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id} .gvnews_block_heading_9",
							'property'       => function ( $value ) {
								return "border-bottom-width: {$value}px;";
							},
							'value'          => $this->attrs['headerLineThick'],
							'device_control' => true,
						)
					);
				}

				if ( isset( $this->attrs['headerLineThick2'] ) ) {
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id} .gvnews_block_heading_9",
							'property'       => function ( $value ) {
								return "border-top-width: {$value}px;";
							},
							'value'          => $this->attrs['headerLineThick2'],
							'device_control' => true,
						)
					);
				}
				break;

			default:
				break;
		}
	}

	/**
	 * Generate style block thumbnail style.
	 *
	 * @return void
	 */
	private function generate_thumbnail_style() {
		if ( $this->main_thumbnail_class ) {
			$selector = ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .{$this->main_thumbnail_class} .thumbnail-container,
						.gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .{$this->main_thumbnail_class} .gvnews_thumb::before
						";
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
		}

		if ( $this->second_thumbnail_class ) {
			$selector = ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .{$this->second_thumbnail_class} .thumbnail-container";
			if ( isset( $this->attrs['borderSecondThumbnail'] ) ) {
				$this->handle_border(
					'borderSecondThumbnail',
					"{$selector}, .gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .{$this->second_thumbnail_class} .gvnews-thumb-overlay"
				);
			}
			if ( isset( $this->attrs['borderResponsiveSecondThumbnail'] ) ) {
				$this->inject_style(
					array(
						'selector'       => "{$selector}, .gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .{$this->second_thumbnail_class} .gvnews-thumb-overlay",
						'property'       => function ( $value ) {
							return $this->handle_border_responsive( $value );
						},
						'value'          => $this->attrs['borderResponsiveSecondThumbnail'],
						'device_control' => true,
						'skip_device'    => isset( $this->attrs['border'] ) ? array(
							'Desktop',
						) : null,
					)
				);
			}
		}
	}

	/**
	 * Generate style block thumbnail style.
	 *
	 * @return void
	 */
	private function generate_thumbnail_overlay_style() {
		if ( $this->main_thumbnail_class ) {
			$selector = ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .{$this->main_thumbnail_class} .gvnews-thumb-overlay";
			if ( isset( $this->attrs['overlayBackgroundMain'] ) ) {
				$this->handle_background( $selector, $this->attrs['overlayBackgroundMain'] );
			}
			if ( isset( $this->attrs['overlayOpacityMain'] ) ) {
				$this->inject_style(
					array(
						'selector'       => $selector,
						'property'       => function ( $value ) {
							return "opacity: {$value};";
						},
						'value'          => $this->attrs['overlayOpacityMain'],
						'device_control' => false,
					)
				);
			}
		}

		if ( $this->second_thumbnail_class ) {
			$selector = ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .{$this->second_thumbnail_class} .gvnews-thumb-overlay";
			if ( isset( $this->attrs['overlayBackgroundSecond'] ) ) {
				$this->handle_background( $selector, $this->attrs['overlayBackgroundSecond'] );
			}
			if ( isset( $this->attrs['overlayOpacitySecond'] ) ) {
				$this->inject_style(
					array(
						'selector'       => $selector,
						'property'       => function ( $value ) {
							return "opacity: {$value};";
						},
						'value'          => $this->attrs['overlayOpacitySecond'],
						'device_control' => false,
					)
				);
			}
		}
	}

	/**
	 * Generate content_container style.
	 *
	 * @return void
	 */
	private function generate_content_container_style() {
		if ( isset( $this->attrs['contentAlign'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "
										.{$this->element_id} .gvnews_postblock .{$this->main_thumbnail_class} .gvnews_postblock_content,
										.{$this->element_id} .gvnews_postblock .{$this->main_thumbnail_class} .gvnews_postblock_heading",
					'property'       => function ( $value ) {
						return "text-align: {$value};";
					},
					'value'          => $this->attrs['contentAlign'],
					'device_control' => true,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_postblock .{$this->main_thumbnail_class} .gvnews_postblock_content   .gvnews_post_meta",
					'property'       => function ( $value ) {
						return "justify-content: {$this->handle_align_reverse( $value )};";
					},
					'value'          => $this->attrs['contentAlign'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['contentAlignVertical'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_postblock .{$this->main_thumbnail_class}",
					'property'       => function ( $value ) {
						return "align-items: {$value};";
					},
					'value'          => $this->attrs['contentAlignVertical'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['contentContainerBackground'] ) ) {
			if ( isset( $this->attrs['contentContainerBackground']['color'] ) || isset( $this->attrs['contentContainerBackground']['gradient'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .gvnews_postblock .{$this->main_thumbnail_class} .gvnews_postblock_content  ",
						'property'       => function ( $value ) {
							return 'background: initial;';
						},
						'value'          => $this->attrs['contentContainerBackground'],
						'device_control' => false,
					)
				);
			}
			$this->handle_background(
				".{$this->element_id} .gvnews_postblock .{$this->main_thumbnail_class} .gvnews_postblock_content  ",
				$this->attrs['contentContainerBackground']
			);
		}

		if ( isset( $this->attrs['contentMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_postblock .{$this->main_thumbnail_class} .gvnews_postblock_content  ",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['contentMargin'],
					'device_control' => true,
				)
			);
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_postblock .{$this->main_thumbnail_class}",
					'property'       => function ( $value ) {
						return 'column-gap: initial;';
					},
					'value'          => $this->attrs['contentMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['contentPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_postblock .{$this->main_thumbnail_class} .gvnews_postblock_content  ",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['contentPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['contentBorder'] ) ) {
			$this->handle_border( 'contentBorder', ".{$this->element_id} .gvnews_postblock .{$this->main_thumbnail_class} .gvnews_postblock_content  " );
		}

		if ( isset( $this->attrs['contentBorderResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_postblock .{$this->main_thumbnail_class} .gvnews_postblock_content  ",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['contentBorderResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['contentContainerShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_postblock .{$this->main_thumbnail_class} .gvnews_postblock_content  ",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['contentContainerShadow'],
					'device_control' => false,
				)
			);
		}

		// Second Content Container.
		if ( isset( $this->attrs['contentAlignSecond'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_postblock .{$this->second_thumbnail_class} .gvnews_postblock_content  ",
					'property'       => function ( $value ) {
						return "text-align: {$value};";
					},
					'value'          => $this->attrs['contentAlignSecond'],
					'device_control' => true,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_postblock .{$this->second_thumbnail_class} .gvnews_postblock_content   .gvnews_post_meta",
					'property'       => function ( $value ) {
						return "justify-content: {$this->handle_align_reverse( $value )};";
					},
					'value'          => $this->attrs['contentAlignSecond'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['contentAlignVerticalSecond'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_postblock .{$this->second_thumbnail_class}",
					'property'       => function ( $value ) {
						return "align-items: {$value};";
					},
					'value'          => $this->attrs['contentAlignVerticalSecond'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['contentContainerBackgroundSecond'] ) ) {
			if ( isset( $this->attrs['contentContainerBackgroundSecond']['color'] ) || isset( $this->attrs['contentContainerBackgroundSecond']['gradient'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .gvnews_postblock .{$this->second_thumbnail_class} .gvnews_postblock_content  ",
						'property'       => function ( $value ) {
							return 'background: initial;';
						},
						'value'          => $this->attrs['contentContainerBackgroundSecond'],
						'device_control' => false,
					)
				);
			}
			$this->handle_background( ".{$this->element_id} .gvnews_postblock .{$this->second_thumbnail_class} .gvnews_postblock_content  ", $this->attrs['contentContainerBackgroundSecond'] );
		}

		if ( isset( $this->attrs['contentMarginSecond'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_postblock .{$this->second_thumbnail_class} .gvnews_postblock_content  ",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['contentMarginSecond'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['contentPaddingSecond'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_postblock .{$this->second_thumbnail_class} .gvnews_postblock_content  ",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['contentPaddingSecond'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['contentBorderSecond'] ) ) {
			$this->handle_border( 'contentBorderSecond', ".{$this->element_id} .gvnews_postblock .{$this->second_thumbnail_class} .gvnews_postblock_content  " );
		}

		if ( isset( $this->attrs['contentBorderResponsiveSecond'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_postblock .{$this->second_thumbnail_class} .gvnews_postblock_content  ",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['contentBorderResponsiveSecond'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['contentContainerShadowSecond'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_postblock .{$this->second_thumbnail_class} .gvnews_postblock_content  ",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['contentContainerShadowSecond'],
					'device_control' => false,
				)
			);
		}
	}

	/**
	 * Generate card style.
	 */
	protected function generate_card_style() {
		$str                   = explode( '\\', $this->attrs['gvnewsModule'] );
		$gvnews_module         = end( $str );
		$modules_with_box_wrap = array(
			'Module_32',
			'Module_33',
			'Module_34',
			'Module_35',
			'Module_36',
			'Module_37',
			'Module_39',
		);
		$selector              = in_array( $gvnews_module, $modules_with_box_wrap, true )
			? ".{$this->element_id} .gvnews_postblock .gvnews_post .box_wrap"
			: ".{$this->element_id} .gvnews_postblock .gvnews_post:not(.gvnews_pl_xs_2)";
		// Main Class.
		if ( isset( $this->attrs['cardBorder'] ) ) {
			$this->handle_border( 'cardBorder', $selector );
		}
		if ( isset( $this->attrs['cardBorderResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $selector,
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['cardBorderResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}
		if ( isset( $this->attrs['cardPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $selector,
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['cardPadding'],
					'device_control' => true,
				)
			);
		}
	}

	private function get_selector( $selector, $def ) {
		$base = ".gvnews-block.gvnews-block-wrapper.{$this->element_id}";
		$raw  = isset( $this->attrs[ $selector ] ) ? $this->attrs[ $selector ] : $def;

		// If raw is an array, prefix each item
		if ( is_array( $raw ) ) {
			$parts = array_map(
				function ( $p ) use ( $base ) {
					return trim( $base . ' ' . $p );
				},
				$raw
			);

			return implode( ', ', $parts );
		}

		// Split by comma, trim and prefix each selector with base
		$parts = array_map( 'trim', explode( ',', $raw ) );
		$parts = array_map(
			function ( $p ) use ( $base ) {
				return "{$base} {$p}";
			},
			$parts
		);

		return implode( ', ', $parts );
	}

	private function dropdown_header_filter_style() {
		if ( isset( $this->attrs['filterDowndownTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector' => ".{$this->element_id} .gvnews_subcat .okayNav__nav--invisible .subclass-filter",
					'value'    => $this->attrs['filterDowndownTypography'],
				)
			);
		}

		if ( isset( $this->attrs['filterDowndownWrapperBackground'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_subcat .okayNav__nav--invisible",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background' );
					},
					'value'          => $this->attrs['filterDowndownWrapperBackground'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['filterDropdownItemPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_subcat .okayNav__nav--invisible .subclass-filter",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['filterDropdownItemPadding'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['filterDropdownWrapperPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_subcat .okayNav__nav--invisible",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['filterDropdownWrapperPadding'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['filterDropdownWrapperBorder'] ) ) {
			$this->handle_border(
				'filterDropdownWrapperBorder',
				".{$this->element_id} .gvnews_subcat .okayNav__nav--invisible"
			);
		}

		if ( isset( $this->attrs['filterDropdownBoxShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_subcat .okayNav__nav--invisible",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['filterDropdownBoxShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['filterDowndownColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_subcat .okayNav__nav--invisible .subclass-filter",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['filterDowndownColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['filterDowndownColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_subcat .okayNav__nav--invisible .subclass-filter:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['filterDowndownColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['filterDowndownColorActive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_subcat .okayNav__nav--invisible .subclass-filter.current",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['filterDowndownColorActive'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['filterDowndownItemBackground'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_subcat .okayNav__nav--invisible .subclass-filter",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background' );
					},
					'value'          => $this->attrs['filterDowndownItemBackground'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['filterDowndownItemBackgroundHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_subcat .okayNav__nav--invisible .subclass-filter:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background' );
					},
					'value'          => $this->attrs['filterDowndownItemBackgroundHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['filterDowndownItemBackgroundActive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_subcat .okayNav__nav--invisible .subclass-filter.current",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background' );
					},
					'value'          => $this->attrs['filterDowndownItemBackgroundActive'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['filterDropdownToogleColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_subcat .okayNav__menu-toggle span",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background' );
					},
					'value'          => $this->attrs['filterDropdownToogleColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['filterDropdownToogleColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_subcat .okayNav__menu-toggle:hover span",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background' );
					},
					'value'          => $this->attrs['filterDropdownToogleColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['filterDropdownToogleColorActive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_subcat .okayNav__menu-toggle.icon--active span",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background' );
					},
					'value'          => $this->attrs['filterDropdownToogleColorActive'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['filterDropdownItemBorder'] ) ) {
			$this->handle_border(
				'filterDropdownItemBorder',
				".{$this->element_id} .gvnews_subcat .okayNav__nav--invisible .subclass-filter"
			);
		}

		if ( isset( $this->attrs['filterDropdownItemBorderHover'] ) ) {
			$this->handle_border(
				'filterDropdownItemBorderHover',
				".{$this->element_id} .gvnews_subcat .okayNav__nav--invisible .subclass-filter:hover"
			);
		}

		if ( isset( $this->attrs['filterDropdownItemBorderActive'] ) ) {
			$this->handle_border(
				'filterDropdownItemBorderActive',
				".{$this->element_id} .gvnews_subcat .okayNav__nav--invisible .subclass-filter.current"
			);
		}
	}

	/**
	 * Title Container Style
	 */
	private function title_container_style() {
		if ( 'GUTENVERSE\\NEWS\\Block\\Module\\Module_7' === $this->attrs['gvnewsModule'] ) {
			$selector = ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock_7.gvnews_postblock .gvnews_post_title";
			if ( isset( $this->attrs['titleContainerAlign'] ) ) {
				$this->inject_style(
					array(
						'selector'       => $selector,
						'property'       => function ( $value ) {
							return "text-align: {$value};";
						},
						'value'          => $this->attrs['titleContainerAlign'],
						'device_control' => true,
					)
				);
			}

			if ( isset( $this->attrs['titleContainerBackground'] ) ) {
				$this->handle_background(
					$selector,
					$this->attrs['titleContainerBackground'],
				);
			}

			if ( isset( $this->attrs['titleContainerMargin'] ) ) {
				$this->inject_style(
					array(
						'selector'       => $selector,
						'property'       => function ( $value ) {
							return $this->handle_dimension( $value, 'margin' );
						},
						'value'          => $this->attrs['titleContainerMargin'],
						'device_control' => true,
					)
				);
			}

			if ( isset( $this->attrs['titleContainerPadding'] ) ) {
				$this->inject_style(
					array(
						'selector'       => $selector,
						'property'       => function ( $value ) {
							return $this->handle_dimension( $value, 'padding' );
						},
						'value'          => $this->attrs['titleContainerPadding'],
						'device_control' => true,
					)
				);
			}
		}
	}
}
