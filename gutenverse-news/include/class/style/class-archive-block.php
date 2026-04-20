<?php
/**
 * Archive Hero
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
class Archive_Block extends StyleAbstract {


	/**
	 * Block Name
	 *
	 * @var string
	 */
	protected $name;


	/**
	 * Method __construct
	 *
	 * @param array   $attrs attribute.
	 * @param boolean $name  name.
	 *
	 * @return void
	 */
	public function __construct( $attrs, $name = false ) {
		$this->name = $name;
		parent::__construct( $attrs, $name );

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
		$this->generate_thumbnail_style();
		$this->generate_thumbnail_overlay_style();
		$this->generate_content_container_style();
		$this->title_container_style();
		$this->no_content_style();
		if ( ! in_array( $this->attrs['blockType'], array( '3', '4', '7', '10', '25' ) ) ) {
			$this->generate_category_label_style();
		}

		if ( empty( $this->attrs['showMeta'] ) || ( isset( $this->attrs['showMeta'] ) && $this->attrs['showMeta'] ) ) {
			$this->generate_meta_style();
		}
		$this->other_style();
		$this->post_item_style();
		$this->generate_card_style();
	}

	/**
	 * Generate post item style
	 */
	private function post_item_style() {
		$with_grid    = array( '8', '9', '11', '13', '14', '15', '16', '17', '19', '20', '21', '22', '23', '24', '27', '36', '37', '39' );
		$with_masnory = array( '32', '33', '34', '35' );

		if ( in_array( $this->attrs['blockType'], $with_grid ) ) {
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
		} elseif ( in_array( $this->attrs['blockType'], $with_masnory ) ) {
			if ( isset( $this->attrs['rowItemGap'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .gvnews_postblock .gvnews_posts_masonry .gvnews_posts.shuffle .gvnews_post:not(:last-of-type)",
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

			if ( isset( $this->attrs['gutterWidth'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}",
						'property'       => function ( $value ) {
							return "--gvnews-gutter-width: {$value}px;";
						},
						'value'          => $this->attrs['gutterWidth'],
						'device_control' => true,
					)
				);

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

	/**
	 * Generate style block thumbnail style.
	 *
	 * @return void
	 */
	private function generate_thumbnail_style() {
		if ( $this->attrs['mainClass'] ) {
			$selector = ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .{$this->attrs['mainClass']} .thumbnail-container,
						.gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .{$this->attrs['mainClass']} .gvnews_thumb::before
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
	}

	/**
	 * Generate style block thumbnail style.
	 *
	 * @return void
	 */
	private function generate_thumbnail_overlay_style() {
		if ( $this->attrs['mainClass'] ) {
			$selector = ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .{$this->attrs['mainClass']} .gvnews-thumb-overlay";
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

		if ( isset( $this->attrs['overlayIconSizeMain'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .gvnews_post .gvnews-thumb-overlay-icon",
						'property'       => function ( $value ) {
							return "font-size: {$value}px;";
						},
						'value'          => $this->attrs['overlayIconSizeMain'],
						'device_control' => true,
					)
				);
		}
		if ( isset( $this->attrs['overlayIconColorMain'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .gvnews_post .gvnews-thumb-overlay-icon",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['overlayIconColorMain'],
					'device_control' => false,
				)
			);
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
										.{$this->element_id} .gvnews_postblock .{$this->attrs['mainClass']} .gvnews_postblock_content,
										.{$this->element_id} .gvnews_postblock .{$this->attrs['mainClass']} .gvnews_postblock_heading",
					'property'       => function ( $value ) {
						return "text-align: {$value};";
					},
					'value'          => $this->attrs['contentAlign'],
					'device_control' => true,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_postblock .{$this->attrs['mainClass']} .gvnews_postblock_content   .gvnews_post_meta",
					'property'       => function ( $value ) {
						return "justify-content: {$this->handle_align_reverse($value)};";
					},
					'value'          => $this->attrs['contentAlign'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['contentAlignVertical'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_postblock .{$this->attrs['mainClass']}",
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
						'selector'       => ".{$this->element_id} .gvnews_postblock .{$this->attrs['mainClass']} .gvnews_postblock_content  ",
						'property'       => function ( $value ) {
							return 'background: initial;';
						},
						'value'          => $this->attrs['contentContainerBackground'],
						'device_control' => false,
					)
				);
			}
			$this->handle_background(
				".{$this->element_id} .gvnews_postblock .{$this->attrs['mainClass']} .gvnews_postblock_content  ",
				$this->attrs['contentContainerBackground']
			);
		}

		if ( isset( $this->attrs['contentMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_postblock .{$this->attrs['mainClass']} .gvnews_postblock_content  ",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['contentMargin'],
					'device_control' => true,
				)
			);
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_postblock .{$this->attrs['mainClass']}",
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
					'selector'       => ".{$this->element_id} .gvnews_postblock .{$this->attrs['mainClass']} .gvnews_postblock_content  ",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['contentPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['contentBorder'] ) ) {
			$this->handle_border( 'contentBorder', ".{$this->element_id} .gvnews_postblock .{$this->attrs['mainClass']} .gvnews_postblock_content  " );
		}

		if ( isset( $this->attrs['contentBorderResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_postblock .{$this->attrs['mainClass']} .gvnews_postblock_content  ",
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
					'selector'       => ".{$this->element_id} .gvnews_postblock .{$this->attrs['mainClass']} .gvnews_postblock_content  ",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['contentContainerShadow'],
					'device_control' => false,
				)
			);
		}
	}
	/**
	 * Title Container Style
	 */
	private function title_container_style() {
		if ( '7' === $this->attrs['blockType'] ) {
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

	/**
	 * Generate style block no content style.
	 */
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
	}

	/**
	 * Generate block meta style.
	 */
	private function generate_meta_style() {
		if ( isset( $this->attrs['metaTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .gvnews_post_meta>div ,.gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .gvnews_meta_author .by",
					'property'       => function ( $value ) {
					},
					'value'          => $this->attrs['metaTypography'],
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
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .gvnews_post_meta .fa,
										.gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .gvnews_post_meta .far,
										.gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .gvnews_post_meta .fas,
										.gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .gvnews_post_meta svg",
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
	 * Generate Other style
	 */
	private function other_style() {
		if ( isset( $this->attrs['titleTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .gvnews_post .gvnews_post_title",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['titleTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['secondTitleTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_posts .gvnews_pl_md_1 .gvnews_post_title a",
					'property'       => function ( $value ) {
					},
					'value'          => $this->attrs['secondTitleTypography'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['contentTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .gvnews_post_excerpt p,.gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_post_excerpt .gvnews_readmore",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['contentTypography'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['readmoreButtonTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector' => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .gvnews_post_excerpt .gvnews_readmore",
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
		if ( isset( $this->attrs['aHover'] ) ) {
			$selector = '14' === $this->attrs['blockType'] ? '.gvnews_posts .gvnews_pl_md_1 .gvnews_post_title a' : '.gvnews_postblock .gvnews_post_title a';
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
			$selector = '14' === $this->attrs['blockType'] ? '.gvnews_posts .gvnews_pl_md_1 .gvnews_post_title a' : '.gvnews_post_title a';
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
	}

	/**
	 * Generate style block card style.
	 *
	 * @return void
	 */
	private function generate_card_style() {
		if ( '7' !== $this->attrs['blockType'] || ( isset( $this->attrs['cardUseBorder'] ) && $this->attrs['cardUseBorder'] ) ) {
			if ( isset( $this->attrs['cardBorder'] ) ) {
				$this->handle_border( 'cardBorder', ".{$this->element_id} .gvnews_postblock .gvnews_post:not(.gvnews_pl_xs_2)" );
			}
			if ( isset( $this->attrs['cardBorderResponsive'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .gvnews_postblock .gvnews_post:not(.gvnews_pl_xs_2)",
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
		} else {
			if ( isset( $this->attrs['cardLineColor'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .gvnews_postblock .gvnews_pl_lg_6:not(:last-of-type)",
						'property'       => function ( $value ) {
							return $this->handle_color( $value, 'border-color' );
						},
						'value'          => $this->attrs['cardLineColor'],
						'device_control' => false,
					)
				);
			}

			if ( isset( $this->attrs['cardLineThick'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .gvnews_postblock .gvnews_pl_lg_6:not(:last-of-type)",
						'property'       => function ( $value ) {
							return "border-width: {$value}px;";
						},
						'value'          => $this->attrs['cardLineThick'],
						'device_control' => true,
					)
				);
			}
		}

		if ( isset( $this->attrs['cardPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_postblock .gvnews_post:not(.gvnews_pl_xs_2)",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['cardPadding'],
					'device_control' => true,
				)
			);
		}
	}
}
