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
	 * Constructor
	 *
	 * @param array       $attrs Attribute.
	 * @param string|bool $name Name.
	 */
	public function __construct( $attrs, $name = false ) {
		parent::__construct( $attrs, $name );

		$this->set_feature(
			array(
				'background' => array(
					'normal' => ".gvnews-block-wrapper.{$this->element_id} .gvnews_postblock",
					'hover'  => ".gvnews-block-wrapper.{$this->element_id} .gvnews_postblock:hover",
				),
				'border'     => array(
					'normal' => ".{$this->element_id}.gvnews-block.gvnews-block-wrapper .gvnews_postblock",
					'hover'  => ".{$this->element_id}.gvnews-block.gvnews-block-wrapper .gvnews_postblock:hover",
				),
				'advance'    => ".gvnews-block-wrapper.{$this->element_id} .gvnews_postblock",

			)
		);
	}

	/**
	 * Generate style base on attribute.
	 */
	public function generate() {
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
					'selector'       => ".{$this->element_id} .gvnews_post_title a",
					'property'       => function ( $value ) {
					},
					'value'          => $this->attrs['typography'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['typographyMeta'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} .gvnews_post_meta>div",
					'property'       => function ( $value ) {
					},
					'value'          => $this->attrs['typographyMeta'],
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
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_postblock .gvnews_meta_author a, .{$this->element_id} .gvnews_postblock .gvnews_post_title a:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['aHover'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['metaColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_post_meta",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['metaColor'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['titleColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}  .gvnews_post_title a",
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

		if ( isset( $this->attrs['paginationMode'] ) ) {
			if ( 'disable' !== $this->attrs['paginationMode'] && '' !== $this->attrs['paginationMode'] ) {
				$this->generate_pagination_style();
			}
		}

		do_action( 'gvnews_module_style', $this );

	}
	/**
	 * Generate style block pagination style.
	 */
	public function generate_pagination_style() {
		if ( isset( $this->attrs['paginationWrapperMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_block_navigation",
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
					'selector'       => ".{$this->element_id} .gvnews_block_navigation .gvnews_block_nav i",
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
						'selector'       => ".{$this->element_id} .gvnews_block_navigation .gvnews_block_nav.showtext .next i",
						'property'       => function ( $value ) {
							return $this->handle_unit_point( $value, 'margin-left' );
						},
						'value'          => $this->attrs['paginationBtnIconSpacing'],
						'device_control' => true,
					)
				);
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .gvnews_block_navigation .gvnews_block_nav.showtext .prev i",
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
}
