<?php
/**
 * Archives
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
class Archive extends StyleAbstract {


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

		if ( ( 'gutenverse/news-archive-block' === $this->name ) ) {
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
		} else {
			$this->set_feature(
				array(
					'background'  => array(
						'normal' => ".gvnews-block.gvnews-block-wrapper.{$this->element_id}",
						'hover'  => ".gvnews-block.gvnews-block-wrapper.{$this->element_id}:hover",
					),
					'border'      => array(
						'normal' => ".{$this->element_id}.gvnews-block.gvnews-block-wrapper",
						'hover'  => ".{$this->element_id}.gvnews-block.gvnews-block-wrapper:hover",
					),
					'advance'     => ".{$this->element_id}.gvnews-block.gvnews-block-wrapper",
					'positioning' => ".{$this->element_id}.gvnews-block.gvnews-block-wrapper",
					'animation'   => ".{$this->element_id}.gvnews-block.gvnews-block-wrapper",
				)
			);

		}
	}

	/**
	 * Set default attributes
	 *
	 * @param array   $attrs attributes.
	 * @param boolean $name  name.
	 */
	protected function set_attrs( $attrs, $name = false ) {
		if ( $name ) {
			$name = str_replace( 'gutenverse/news-', '', $name );
		} elseif ( isset( $this->name ) ) {
			$name = $this->name;
		}
		if ( $name ) {
			$path = GUTENVERSE_NEWS_DIR . "./block/{$name}/block.json";
			if ( ! file_exists( $path ) ) {
				return;
			}

			$block_json       = gutenverse_get_json( $path );
			$override_overlay = array();
			$hero_type        = array( 1, 2, 3, 4, 5, 6, 7 );
			foreach ( $block_json['attributes'] as $key => $value ) {
				if ( strpos( $key, '__i__' ) !== false ) {
					foreach ( $hero_type as $type ) {
						$override_key                      = str_replace( '__i__', $type, $key );
						$override_overlay[ $override_key ] = $value;
					}
					unset( $block_json['attributes'][ $key ] );
				}
			}
			$block_json['attributes'] = array_merge( $block_json['attributes'], $override_overlay );

			if ( isset( $block_json['attributes'] ) ) {
				foreach ( $block_json['attributes'] as $key => $value ) {
					if ( isset( $attrs[ $key ] ) ) {
						$this->attrs[ $key ] = $attrs[ $key ];
					} elseif ( isset( $value['default'] ) ) {
						$this->attrs[ $key ] = $value['default'];
					}
				}
			}
		}
	}

	/**
	 * Generate style base on attribute.
	 */
	public function generate() {
		$this->archive_title();
		$this->archive_breadcrumb();
		$this->archive_pagination();
		$this->archive_description();
		$this->archive_hero();
		$this->archive_block();
	}

	/**
	 * Generate style for archive title
	 */
	private function archive_title() {
		if ( 'gutenverse/news-archive-title' === $this->name ) {

			if ( isset( $this->attrs['titleTypography'] ) ) {
				$this->inject_typography(
					array(
						'selector'       => ".{$this->element_id} .gvnews-archive-title h1",
						'property'       => function ( $value ) {},
						'value'          => $this->attrs['titleTypography'],
						'device_control' => false,
					)
				);
			}

			if ( isset( $this->attrs['titleColor'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .gvnews-archive-title h1",
						'property'       => function ( $value ) {
							return $this->handle_color( $value, 'color' );
						},
						'value'          => $this->attrs['titleColor'],
						'device_control' => false,
					)
				);
			}
		}
	}

	/**
	 * Generate style for archive breadcrumb
	 */
	private function archive_breadcrumb() {
		if ( 'gutenverse/news-archive-breadcrumb' === $this->name ) {
			if ( isset( $this->attrs['textColor'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .gvnews-archive-breadcrumb span a",
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
						'selector'       => ".{$this->element_id} .gvnews-archive-breadcrumb span a:hover",
						'property'       => function ( $value ) {
							return $this->handle_color( $value, 'color' );
						},
						'value'          => $this->attrs['textColorHover'],
						'device_control' => false,
					)
				);
			}
			if ( isset( $this->attrs['arrowColor'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .gvnews-archive-breadcrumb i",
						'property'       => function ( $value ) {
							return $this->handle_color( $value, 'color' );
						},
						'value'          => $this->attrs['arrowColor'],
						'device_control' => false,
					)
				);
			}

			if ( isset( $this->attrs['breadcrumbTypography'] ) ) {
				$this->inject_typography(
					array(
						'selector'       => ".{$this->element_id}.gvnews-archive-breadcrumb",
						'property'       => function ( $value ) {},
						'value'          => $this->attrs['breadcrumbTypography'],
						'device_control' => false,
					)
				);
			}
		}
	}

	/**
	 * Generate style for archive pagination
	 */
	private function archive_pagination() {
		if ( 'gutenverse/news-archive-pagination' === $this->name ) {
			if ( isset( $this->attrs['paginationTypography'] ) ) {
				$this->inject_typography(
					array(
						'selector'       => ".{$this->element_id}  .gvnews_pagination *",
						'property'       => function ( $value ) {
						},
						'value'          => $this->attrs['paginationTypography'],
						'device_control' => false,
					)
				);
			}
		}
		// missing style or typographpy only?
	}

	/**
	 * Generate style for archive description
	 */
	private function archive_description() {
		if ( 'gutenverse/news-archive-description' === $this->name ) {

			if ( isset( $this->attrs['descTypography'] ) ) {
				$this->inject_typography(
					array(
						'selector'       => ".{$this->element_id} .gvnews-archive-desc h2",
						'property'       => function ( $value ) {},
						'value'          => $this->attrs['descTypography'],
						'device_control' => false,
					)
				);
			}

			if ( isset( $this->attrs['textColor'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .gvnews-archive-desc h2",
						'property'       => function ( $value ) {
							return $this->handle_color( $value, 'color' );
						},
						'value'          => $this->attrs['textColor'],
						'device_control' => false,
					)
				);
			}
		}
	}

	/**
	 * Generate style for archive hero
	 */
	private function archive_hero() {
		if ( 'gutenverse/news-archive-hero' === $this->name ) {
			if ( isset( $this->attrs['heroMargin'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_heroblock_wrapper",
						'property'       => function ( $value ) {
							return "margin: 0 0 -{$value}px -{$value}px;";
						},
						'value'          => $this->attrs['heroMargin'],
						'device_control' => false,
					)
				);
				$this->inject_style(
					array(
						'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} article.gvnews_post",
						'property'       => function ( $value ) {
							return "padding: 0 0 {$value}px {$value}px;";
						},
						'value'          => $this->attrs['heroMargin'],
						'device_control' => false,
					)
				);
			}
			if ( isset( $this->attrs['titleTypography'] ) ) {
				$this->inject_typography(
					array(
						'selector'       => ".{$this->element_id} .gvnews_post_title > a",
						'property'       => function ( $value ) {
						},
						'value'          => $this->attrs['titleTypography'],
						'device_control' => false,
					)
				);
			}
			if ( isset( $this->attrs['metaTypography'] ) ) {
				$this->inject_typography(
					array(
						'selector'       => ".{$this->element_id} .gvnews_post_meta, .{$this->element_id} .gvnews_post_meta .fa, .{$this->element_id} .gvnews_postblock .jeg_subcat_list > li > a:hover, .{$this->element_id} .gvnews_pl_md_card .gvnews_post_category a, .{$this->element_id} .gvnews_postblock .jeg_subcat_list > li > a.current, .{$this->element_id} .gvnews_pl_md_5 .gvnews_post_meta, .{$this->element_id} .gvnews_pl_md_5 .gvnews_post_meta .fa, .{$this->element_id} .gvnews_post_category a",
						'property'       => function ( $value ) {
						},
						'value'          => $this->attrs['metaTypography'],
						'device_control' => false,
					)
				);
			}

			if ( ! empty( $this->attrs['heroHeightDesktop'] ) ) {
				$height = $this->attrs['heroHeightDesktop'];
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .gvnews_heroblock .gvnews_hero_wrapper .gvnews_heroblock_wrapper",
						'value'          => "height: {$height}px; ",
						'custom'         => '@media only screen and (min-width: 1025px)',
						'device_control' => false,
					)
				);
			}

			if ( ! empty( $this->attrs['heroHeight1024'] ) ) {
				$height = $this->attrs['heroHeight1024'];
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .gvnews_heroblock .gvnews_hero_wrapper .gvnews_heroblock_wrapper",
						'value'          => "height: {$height}px; ",
						'custom'         => '@media only screen and (max-width: 1024px) and (min-width: 769px)',
						'device_control' => false,
					)
				);
			}

			if ( ! empty( $this->attrs['heroHeight768'] ) ) {
				$height = $this->attrs['heroHeight768'];
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .gvnews_heroblock .gvnews_hero_wrapper .gvnews_heroblock_wrapper",
						'value'          => "height: {$height}px; ",
						'custom'         => '@media only screen and (max-width: 768px) and (min-width: 668px)',
						'device_control' => false,
					)
				);
			}

			if ( ! empty( $this->attrs['heroHeight667'] ) ) {
				$height = $this->attrs['heroHeight667'];
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .gvnews_heroblock .gvnews_hero_wrapper .gvnews_heroblock_wrapper",
						'value'          => "height: {$height}px; ",
						'custom'         => '@media only screen and (max-width: 667px) and (min-width: 569px)',
						'device_control' => false,
					)
				);
			}

			if ( ! empty( $this->attrs['heroHeight568'] ) ) {
				$height = $this->attrs['heroHeight568'];
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .gvnews_heroblock .gvnews_hero_wrapper .gvnews_heroblock_wrapper",
						'value'          => "height: {$height}px; ",
						'custom'         => '@media only screen and (max-width: 568px) and (min-width: 481px)',
						'device_control' => false,
					)
				);
			}

			if ( ! empty( $this->attrs['heroHeight480'] ) ) {
				$height = $this->attrs['heroHeight480'];
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
			$hero_type = array( 1, 2, 3, 4, 5, 6, 7 );
			foreach ( $hero_type as $value ) {
				if ( isset( $this->attrs[ "heroItem{$value}Enable" ] ) && $this->attrs[ "heroItem{$value}Enable" ] ) {
					if ( isset( $this->attrs[ "heroItem{$value}Background" ] ) && ! is_null( $this->attrs[ "heroItem{$value}Background" ] ) ) {
						$this->handle_background( ".{$this->element_id} .gvnews_hero_item_{$value} .gvnews_thumb a > div:" . ( 5 === $value ? 'after' : 'before' ), $this->attrs[ "heroItem{$value}Background" ] );
					}
				}
			}
		}
	}

	/**
	 * Generate style for archive block
	 */
	private function archive_block() {
		if ( 'gutenverse/news-archive-block' === $this->name ) {
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
						'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .gvnews_post_excerpt p,.gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .gvnews_post_excerpt .gvnews_readmore",
						'property'       => function ( $value ) {},
						'value'          => $this->attrs['contentTypography'],
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

			if ( empty( $this->attrs['showMeta'] ) || ( isset( $this->attrs['showMeta'] ) && $this->attrs['showMeta'] ) ) {
				$this->generate_meta_style();
			}

			if ( ! in_array( $this->attrs['blockType'], array( '3', '4', '7', '9', '10', '25', '35' ) ) ) {
				$this->generate_category_label_style();
			}
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
}
