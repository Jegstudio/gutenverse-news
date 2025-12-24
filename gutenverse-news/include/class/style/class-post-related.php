<?php
/**
 * Post Title
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Init
 *
 * @package Gutenverse
 */
class Post_Related extends Style_Abstract {

	/**
	 * Block Directory
	 *
	 * @var string
	 */
	protected $block_dir = GUTENVERSE_NEWS_DIR . '/block/';

	/**
	 * Block Name
	 *
	 * @var array
	 */
	protected $name = 'post-related';

	/**
	 * Constructor
	 *
	 * @param array $attrs Attribute.
	 * @param bool  $name name.
	 *
	 * @return void
	 */
	public function __construct( $attrs, $name = false ) {
		parent::__construct( $attrs, $name );

		$this->set_feature(
			array(
				'background'  => null,
				'border'      => null,
				'positioning' => null,
				'animation'   => null,
				'advance'     => null,
				'mask'        => null,
			)
		);
	}

	/**
	 * Generate style base on attribute.
	 */
	public function generate() {
		$this->generate_header_style();
		$this->generate_design_style();
		$this->generate_category_label_style();
		$this->no_content_style();
		$this->generate_thumbnail_style();
		$this->generate_thumbnail_overlay_style();
		$this->generate_content_container_style();
		$this->generate_card_style();

		if ( empty( $this->attrs['showMeta'] ) || ( isset( $this->attrs['showMeta'] ) && $this->attrs['showMeta'] ) ) {
			$this->generate_meta_style();
		}

		if ( empty( $this->attrs['readmoreButtonDisabled'] ) || ( isset( $this->attrs['readmoreButtonDisabled'] ) && ! $this->attrs['readmoreButtonDisabled'] ) ) {
			$this->generate_read_more_style();
		}

		if ( isset( $this->attrs['paginationMode'] ) ) {
			if ( 'disable' !== $this->attrs['paginationMode'] && '' !== $this->attrs['paginationMode'] ) {
				$this->generate_pagination_style();
			}
		}
	}
	/**
	 * Generate style for design panel.
	 */
	private function generate_design_style() {
		if ( isset( $this->attrs['typography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_post .gvnews_post_title",
					'property'       => function ( $value ) {
					},
					'value'          => $this->attrs['typography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['secondTitleTypography'] ) ) {
			$selector = $this->get_second_typography_selector( $this->attrs['templateType'] );
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

		if ( 'template_1' === $this->attrs['templateType'] && isset( $this->attrs['thridTitleTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_pl_xs_2 .gvnews_post_title a",
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

		if ( isset( $this->attrs['aHover'] ) ) {
			$selector = $this->get_title_color_selector( $this->attrs['templateType'] );

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
			$selector = $this->get_title_color_selector( $this->attrs['templateType'] );

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

		if ( isset( $this->attrs['listIconColor'] ) ) {
			$selector = 'template_24' === $this->attrs['templateType'] ? '.gvnews_pl_xs_4 .gvnews_postblock_content>i' : '.gvnews_pl_xs_2>i';
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id}  {$selector}",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['listIconColor'],
					'device_control' => false,
				)
			);
		}
	}
	/**
	 * Generate read more style.
	 */
	private function generate_read_more_style() {
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

	/**
	 * Generate style block meta style.
	 */
	private function generate_meta_style() {
		if ( isset( $this->attrs['typographyMeta'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .gvnews_post_meta>div ,.gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .gvnews_post_meta .gvnews_meta_author .by",
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
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .gvnews_post_meta .gvnews_meta_author a",
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
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .gvnews_post_meta .fa ,.gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .gvnews_post_meta .far , .gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .gvnews_post_meta .fas",
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
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .gvnews_post_meta>div:hover .fa ,.gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .gvnews_post_meta>div:hover .far , .gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .gvnews_post_meta>div:hover .fas",
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
	 * Generate style for category labal.
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
	 * Generate style block header style.
	 */
	private function generate_header_style() {

		$with_second_text = isset( $this->attrs['headerType'] ) && in_array( $this->attrs['headerType'], array( 'heading_5', 'heading_6', 'heading_7', 'heading_8' ) );

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
	 * Get selector for the post titile.
	 *
	 * @param string $template_type Related post template.
	 * @return string
	 */
	private function get_title_color_selector( $template_type ) {
		switch ( $template_type ) {
			case 'template_14':
				return '.gvnews_posts .gvnews_pl_md_1 .gvnews_post_title a';
			case 'template_24':
				return '.gvnews_pl_xs_4 .gvnews_post_title a';
		}
		return '.gvnews_postblock .gvnews_post_title a';
	}
	/**
	 * Get selector for the post titile.
	 *
	 * @param string $template_type Related post template.
	 * @return string
	 */
	private function get_second_typography_selector( $template_type ) {
		switch ( $template_type ) {
			case 'template_13':
				return '.gvnews_pl_md_1 .gvnews_post_title';
			case 'template_14':
				return '.gvnews_posts .gvnews_pl_md_1 .gvnews_post_title';
			case 'template_16':
				return '.gvnews_posts .gvnews_pl_xs_2 .gvnews_post_title';
			case 'template_20':
				return '.gvnews_pl_xs .gvnews_post_title';
			case 'template_24':
				return '.gvnews_pl_xs_4 .gvnews_post_title';
		}

		return '.gvnews_pl_sm .gvnews_post_title';
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
	 * Generate style block thumbnail style.
	 *
	 * @return void
	 */
	private function generate_thumbnail_style() {
		if ( isset( $this->attrs['mainClass'] ) ) {
			$selector = ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock {$this->attrs['mainClass']} .thumbnail-container,
						.gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock {$this->attrs['mainClass']} .gvnews_thumb::before
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

		if ( isset( $this->attrs['secondClass'] ) ) {
			$selector = ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock {$this->attrs['secondClass']} .thumbnail-container";
			if ( isset( $this->attrs['borderSecondThumbnail'] ) ) {
				$this->handle_border(
					'borderSecondThumbnail',
					"{$selector}, .gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock {$this->attrs['secondClass']} .gvnews-thumb-overlay"
				);
			}
			if ( isset( $this->attrs['borderResponsiveSecondThumbnail'] ) ) {
				$this->inject_style(
					array(
						'selector'       => "{$selector}, .gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock {$this->attrs['secondClass']} .gvnews-thumb-overlay",
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
		if ( isset( $this->attrs['mainClass'] ) ) {
			$selector = ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock {$this->attrs['mainClass']} .gvnews-thumb-overlay";
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

		if ( isset( $this->attrs['secondClass'] ) ) {
			$selector = ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock {$this->attrs['secondClass']} .gvnews-thumb-overlay";
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
										.{$this->element_id} .gvnews_postblock {$this->attrs['mainClass']} .gvnews_postblock_content,
										.{$this->element_id} .gvnews_postblock {$this->attrs['mainClass']} .gvnews_postblock_heading",
					'property'       => function ( $value ) {
						return "text-align: {$value};";
					},
					'value'          => $this->attrs['contentAlign'],
					'device_control' => true,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_postblock {$this->attrs['mainClass']} .gvnews_postblock_content   .gvnews_post_meta",
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
					'selector'       => ".{$this->element_id} .gvnews_postblock {$this->attrs['mainClass']}",
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
						'selector'       => ".{$this->element_id} .gvnews_postblock {$this->attrs['mainClass']} .gvnews_postblock_content  ",
						'property'       => function ( $value ) {
							return 'background: initial;';
						},
						'value'          => $this->attrs['contentContainerBackground'],
						'device_control' => false,
					)
				);
			}
			$this->handle_background(
				".{$this->element_id} .gvnews_postblock {$this->attrs['mainClass']} .gvnews_postblock_content  ",
				$this->attrs['contentContainerBackground']
			);
		}

		if ( isset( $this->attrs['contentMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_postblock {$this->attrs['mainClass']} .gvnews_postblock_content  ",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['contentMargin'],
					'device_control' => true,
				)
			);
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_postblock {$this->attrs['mainClass']}",
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
					'selector'       => ".{$this->element_id} .gvnews_postblock {$this->attrs['mainClass']} .gvnews_postblock_content  ",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['contentPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['contentBorder'] ) ) {
			$this->handle_border( 'contentBorder', ".{$this->element_id} .gvnews_postblock {$this->attrs['mainClass']} .gvnews_postblock_content  " );
		}

		if ( isset( $this->attrs['contentBorderResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_postblock {$this->attrs['mainClass']} .gvnews_postblock_content  ",
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
					'selector'       => ".{$this->element_id} .gvnews_postblock {$this->attrs['mainClass']} .gvnews_postblock_content  ",
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
					'selector'       => ".{$this->element_id} .gvnews_postblock {$this->attrs['secondClass']} .gvnews_postblock_content  ",
					'property'       => function ( $value ) {
						return "text-align: {$value};";
					},
					'value'          => $this->attrs['contentAlignSecond'],
					'device_control' => true,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_postblock {$this->attrs['secondClass']} .gvnews_postblock_content   .gvnews_post_meta",
					'property'       => function ( $value ) {
						return "justify-content: {$this->handle_align_reverse($value)};";
					},
					'value'          => $this->attrs['contentAlignSecond'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['contentAlignVerticalSecond'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_postblock {$this->attrs['secondClass']}",
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
						'selector'       => ".{$this->element_id} .gvnews_postblock {$this->attrs['secondClass']} .gvnews_postblock_content  ",
						'property'       => function ( $value ) {
							return 'background: initial;';
						},
						'value'          => $this->attrs['contentContainerBackgroundSecond'],
						'device_control' => false,
					)
				);
			}
			$this->handle_background( ".{$this->element_id} .gvnews_postblock {$this->attrs['secondClass']} .gvnews_postblock_content  ", $this->attrs['contentContainerBackgroundSecond'] );
		}

		if ( isset( $this->attrs['contentMarginSecond'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_postblock {$this->attrs['secondClass']} .gvnews_postblock_content  ",
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
					'selector'       => ".{$this->element_id} .gvnews_postblock {$this->attrs['secondClass']} .gvnews_postblock_content  ",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['contentPaddingSecond'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['contentBorderSecond'] ) ) {
			$this->handle_border( 'contentBorderSecond', ".{$this->element_id} .gvnews_postblock {$this->attrs['secondClass']} .gvnews_postblock_content  " );
		}

		if ( isset( $this->attrs['contentBorderResponsiveSecond'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_postblock {$this->attrs['secondClass']} .gvnews_postblock_content  ",
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
					'selector'       => ".{$this->element_id} .gvnews_postblock {$this->attrs['secondClass']} .gvnews_postblock_content  ",
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
	 * Generate style block card style.
	 *
	 * @return void
	 */
	private function generate_card_style() {
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
