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
class Hero_14 extends StyleAbstract {


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
					'normal' => ".gvnews-block-wrapper .{$this->element_id} .gvnews_heropost",
					'hover'  => ".gvnews-block-wrapper .{$this->element_id} .gvnews_heropost:hover",
				),
				'advance' => ".gvnews-block-wrapper .{$this->element_id} .gvnews_heropost",

			)
		);
	}

	/**
	 * Generate style base on attribute.
	 */
	public function generate() {

		$this->generate_design_style();
		$this->generate_category_label_style();
		$this->generate_main_container();

		if ( empty( $this->attrs['readmoreButtonDisabled'] ) || ( isset( $this->attrs['readmoreButtonDisabled'] ) && ! $this->attrs['readmoreButtonDisabled'] ) ) {
			$this->generate_read_more_style();
		}
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
						'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_heropost .gvnews_post_title a",
						'property'       => function ( $value ) {},
						'value'          => $this->attrs['typography'],
						'device_control' => false,
					)
				);
		}

		if ( isset( $this->attrs['secondTitleTypography'] ) ) {

			$this->inject_typography(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_heropost .gvnews_pl_lg_7 .gvnews_post_title a",
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
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_heropost .gvnews_pl_md_box .gvnews_post_title a",
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
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_heropost .gvnews_post_title a",
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
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_heropost .gvnews_post_title a:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['titleColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['thridTitleColor'] ) ) {

			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_heropost .gvnews_postsmall.right .gvnews_post_title a",
					'property'       => function ( $value ) {
								return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['thridTitleColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['thridTitleColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_heropost .gvnews_postsmall.right .gvnews_post_title a:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['thridTitleColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['excerptTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_post_excerpt p",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['excerptTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['excerptColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_post_excerpt p",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['excerptColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['secondTitleColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_pl_lg_7 .gvnews_post_title a",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['secondTitleColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['secondTitleColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_pl_lg_7 .gvnews_post_title a:hover ",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['secondTitleColorHover'],
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
					'selector' => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postbig .gvnews_pl_lg_7 .gvnews_thumb .gvnews_post_category a",
					'value'    => $this->attrs['categoryButtonTypography'],
				)
			);
		}

		if ( isset( $this->attrs['categoryButtonBackground'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_postbig .gvnews_pl_lg_7 .gvnews_thumb .gvnews_post_category a",
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
					'selector'       => ".{$this->element_id} .gvnews_postbig .gvnews_pl_lg_7 .gvnews_thumb .gvnews_post_category a:hover",
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
					'selector'       => ".{$this->element_id} .gvnews_postbig .gvnews_pl_lg_7 .gvnews_thumb .gvnews_post_category a",
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
					'selector'       => ".{$this->element_id} .gvnews_postbig .gvnews_pl_lg_7 .gvnews_thumb .gvnews_post_category a:hover",
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
				".{$this->element_id} .gvnews_postbig .gvnews_pl_lg_7 .gvnews_thumb .gvnews_post_category a"
			);
		}

		if ( isset( $this->attrs['categoryButtonBorderHover'] ) ) {
			$this->handle_border(
				'categoryButtonBorderHover',
				".{$this->element_id} .gvnews_postbig .gvnews_pl_lg_7 .gvnews_thumb .gvnews_post_category a:hover"
			);
		}

		if ( isset( $this->attrs['categoryButtonBoxShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_postbig .gvnews_pl_lg_7 .gvnews_thumb .gvnews_post_category a",
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
					'selector'       => ".{$this->element_id} .gvnews_postbig .gvnews_pl_lg_7 .gvnews_thumb .gvnews_post_category a:hover",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['categoryButtonBoxShadowHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['sideCategoryButtonTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector' => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_pl_sm_2 .gvnews_post_category a",
					'value'    => $this->attrs['sideCategoryButtonTypography'],
				)
			);
		}

		if ( isset( $this->attrs['sideCategoryButtonColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_pl_sm_2 .gvnews_post_category a",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['sideCategoryButtonColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['sideCategoryButtonColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_pl_sm_2 .gvnews_post_category a:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['sideCategoryButtonColorHover'],
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
	 * Generate style block meta style.
	 */
	private function generate_meta_style() {
		if ( isset( $this->attrs['typographyMeta'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_heropost .gvnews_post_meta>div ,.gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_post_meta .gvnews_meta_author .by",
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
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_heropost .gvnews_post_meta>div ,.gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_post_meta .gvnews_meta_author .by , .gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_heropost .gvnews_post_meta a",
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
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_heropost .gvnews_post_meta a:hover",
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
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_heropost .gvnews_post_meta a:hover .far",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['metaIconColorHover'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['thridMetaColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_heropost .gvnews_postsmall.right .gvnews_post_meta a",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['thridMetaColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['thridMetaColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_heropost .gvnews_postsmall.right .gvnews_post_meta a:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['thridMetaColorHover'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['thridMetaIconColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postsmall.right .gvnews_post_meta .far ",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['thridMetaIconColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['thridMetaIconColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_heropost .gvnews_postsmall.right .gvnews_post_meta a:hover .far ",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['thridMetaIconColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( empty( $this->attrs['showMetaAuthor'] ) || ( isset( $this->attrs['showMetaAuthor'] ) && $this->attrs['showMetaAuthor'] ) ) {

			if ( isset( $this->attrs['typographyMetaAuthor'] ) ) {
				$this->inject_typography(
					array(
						'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_heropost .gvnews_meta_author a",
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
								'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_heropost .gvnews_meta_author a",
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
						'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_heropost .gvnews_meta_author a:hover",
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
	/**
	 * Generate main conainer style
	 */
	private function generate_main_container() {
		if ( isset( $this->attrs['mainContainerBackground'] ) ) {
			$this->handle_background( ".{$this->element_id} .gvnews_pl_lg_7 ", $this->attrs['mainContainerBackground'] );
		}

		if ( isset( $this->attrs['mainContainerBorder'] ) ) {
			$this->handle_border(
				'mainContainerBorder',
				".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_pl_lg_7"
			);
		}

		if ( isset( $this->attrs['mainContainerBorderResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_pl_lg_7",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['mainContainerBorderResponsive'],
					'device_control' => true,
					'skip_device'    => isset( $this->attrs['border'] ) ? array(
						'Desktop',
					) : null,
				)
			);
		}

		if ( isset( $this->attrs['mainContainerShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_pl_lg_7",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['mainContainerShadow'],
					'device_control' => false,
				)
			);
		}
	}
}
