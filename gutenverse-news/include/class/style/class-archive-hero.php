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
class Archive_Hero extends StyleAbstract {


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
					'normal' => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews-archive-hero .gvnews_heroblock",
					'hover'  => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews-archive-hero .gvnews_heroblock:hover",
				),
				'border'      => array(
					'normal' => ".{$this->element_id}.gvnews-block.gvnews-block-wrapper .gvnews-archive-hero .gvnews_heroblock",
					'hover'  => ".{$this->element_id}.gvnews-block.gvnews-block-wrapper .gvnews-archive-hero .gvnews_heroblock:hover",
				),
				'advance'     => ".{$this->element_id}.gvnews-block.gvnews-block-wrapper .gvnews-archive-hero .gvnews_heroblock",
				'positioning' => ".{$this->element_id}.gvnews-block.gvnews-block-wrapper .gvnews-archive-hero .gvnews_heroblock",
				'animation'   => ".{$this->element_id}.gvnews-block.gvnews-block-wrapper .gvnews-archive-hero .gvnews_heroblock",
			)
		);
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

		if ( ! empty( $this->attrs['heroHeightDesktop'] ) ) {
			$height = $this->attrs['heroHeightDesktop'];
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

		if ( ! empty( $this->attrs['heroHeight1024'] ) ) {
			$height = $this->attrs['heroHeight1024'];
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

		if ( ! empty( $this->attrs['heroHeight768'] ) ) {
			$height = $this->attrs['heroHeight768'];
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

		if ( ! empty( $this->attrs['heroHeight667'] ) ) {
			$height = $this->attrs['heroHeight667'];
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

		if ( ! empty( $this->attrs['heroHeight568'] ) ) {
			$height = $this->attrs['heroHeight568'];
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

		if ( ! empty( $this->attrs['heroHeight480'] ) ) {
			$height = $this->attrs['heroHeight480'];
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

		$hero_type = array( 1, 2, 3, 4, 5, 6, 7 );
		foreach ( $hero_type as $value ) {
			if ( isset( $this->attrs[ "heroItem{$value}Enable" ] ) && $this->attrs[ "heroItem{$value}Enable" ] ) {
				if ( isset( $this->attrs[ "heroItem{$value}Background" ] ) && ! is_null( $this->attrs[ "heroItem{$value}Background" ] ) ) {
					$this->handle_background( ".{$this->element_id} .gvnews_hero_item_{$value} .gvnews_thumb a > div:" . ( 5 === $value ? 'after' : 'before' ), $this->attrs[ "heroItem{$value}Background" ] );
				}
			}
		}
		$this->generate_design_style();
		if ( empty( $this->attrs['showMeta'] ) || ( isset( $this->attrs['showMeta'] ) && $this->attrs['showMeta'] ) ) {
				$this->generate_meta_style();
		}
		$this->category_label_style();
		$this->no_content_style();
	}

	/**
	 * Generate design style.
	 */
	private function generate_design_style() {

		$with_second_typo = in_array( $this->attrs['heroType'], array( '1', '2', '3', '4', '5', '6', '10', '11', '12', '14' ) );
		$with_thrid_typo  = in_array( $this->attrs['heroType'], array( '1', '3', '12' ) );

		if ( isset( $this->attrs['titleTypography'] ) ) {
				$this->inject_typography(
					array(
						'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_heroblock .gvnews_post_title a",
						'property'       => function ( $value ) {},
						'value'          => $this->attrs['titleTypography'],
						'device_control' => false,
					)
				);
		}
		if ( isset( $this->attrs['borderItem'] ) ) {
			$this->handle_border(
				'borderItem',
				".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_heroblock .gvnews_block_container"
			);
		}
		if ( isset( $this->attrs['borderResponsiveItem'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_heroblock .gvnews_block_container",
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

		if ( $with_second_typo ) {
			$selector = $this->get_second_typography_selector( $this->attrs['heroType'] );
			if ( isset( $this->attrs['secondTitleTypography'] ) ) {
				$this->inject_typography(
					array(
						'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} {$selector} .gvnews_post_title a",
						'property'       => function ( $value ) {
						},
						'value'          => $this->attrs['secondTitleTypography'],
						'device_control' => false,
					)
				);
			}
			if ( isset( $this->attrs['borderItemSecond'] ) ) {
				$this->handle_border(
					'borderItemSecond',
					".gvnews-block.gvnews-block-wrapper.{$this->element_id} {$selector} .gvnews_block_container",
				);
			}
			if ( isset( $this->attrs['borderResponsiveItemSecond'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} {$selector} .gvnews_block_container",
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
		}

		if ( $with_thrid_typo ) {
			$selector = ( '12' === $this->attrs['heroType'] ) ? '.gvnews_heroblock .gvnews_post:not(.gvnews_hero_item_1, .gvnews_hero_item_2 , .gvnews_hero_item_3) .gvnews_post_title a' : '.gvnews_heroblock .gvnews_post:not(.gvnews_hero_item_1, .gvnews_hero_item_2)';
			if ( isset( $this->attrs['thridTitleTypography'] ) ) {
				$this->inject_typography(
					array(
						'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} {$selector} .gvnews_post_title a",
						'property'       => function ( $value ) {
						},
						'value'          => $this->attrs['thridTitleTypography'],
						'device_control' => false,
					)
				);
			}
			if ( isset( $this->attrs['borderItemThird'] ) ) {
				$this->handle_border(
					'borderItemThird',
					".gvnews-block.gvnews-block-wrapper.{$this->element_id} {$selector} .gvnews_block_container",
				);
			}
			if ( isset( $this->attrs['borderResponsiveItemThird'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} {$selector} .gvnews_block_container",
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
	}

	/**
	 * Generate style block meta style.
	 */
	private function generate_meta_style() {
		if ( isset( $this->attrs['metaTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_heroblock .gvnews_post_meta>div ,.gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_post_meta .gvnews_meta_author .by",
					'property'       => function ( $value ) {
					},
					'value'          => $this->attrs['metaTypography'],
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
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_post_meta .far, .gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_post_meta svg",
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
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_heroblock .gvnews_post_meta a:hover .far, .gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_heroblock .gvnews_post_meta a:hover svg",
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
	 * Generate style for category label.
	 */
	private function category_label_style() {
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
	}
	/**
	 * Get selector for second list typography.
	 *
	 * @param string $hero_type Hero type attribute.
	 * @return string
	 */
	private function get_second_typography_selector( $hero_type ) {
		switch ( $hero_type ) {
			case '10':
				return '.gvnews_heroblock .gvnews_post:not(.gvnews_hero_item_1, .gvnews_hero_item_5)';
			case '11':
				return '.gvnews_heroblock .gvnews_post.gvnews_hero_item_1';
			case '12':
				return '.gvnews_heroblock .gvnews_post:not(.gvnews_hero_item_1, .gvnews_hero_item_4 , .gvnews_hero_item_5)';
			default:
				return '.gvnews_heroblock .gvnews_post:not(.gvnews_hero_item_1)';
		}
	}

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
}
