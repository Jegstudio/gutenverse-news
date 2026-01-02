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
						'selector'       => ".{$this->element_id} .gvnews-archive-breadcrumb i, .{$this->element_id} .gvnews-archive-breadcrumb svg",
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
	 * Generate style for archive block
	 */
	private function archive_block() {
		if ( 'gutenverse/news-archive-block' !== $this->name ) {
			return;
		}

		$this->generate_thumbnail_style();
		$this->generate_thumbnail_overlay_style();
		$this->generate_content_container_style();
		$this->title_container_style();

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
		if ( empty( $this->attrs['showMeta'] ) || ( isset( $this->attrs['showMeta'] ) && $this->attrs['showMeta'] ) ) {
			$this->generate_meta_style();
		}
		if ( ! in_array( $this->attrs['blockType'], array( '3', '4', '7', '9', '10', '25', '35' ) ) ) {
			$this->generate_category_label_style();
		}
		$this->no_content_style();
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
}
