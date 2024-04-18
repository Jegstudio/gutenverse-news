<?php
/**
 * User list
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
class User_List extends StyleAbstract {


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
		if ( isset( $this->attrs['nameColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}  .gvnews_userlist-name",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['nameColor'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['descColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gutenverse.{$this->element_id} .gvnews_userlist.{$this->attrs['listStyle']} .gvnews_userlist-desc",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['descColor'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['borderColor'] ) ) {
			if ( 'style-1' === $this->attrs['listStyle'] || 'style-2' === $this->attrs['listStyle'] || 'style-3' === $this->attrs['listStyle'] ) {
				$this->inject_style(
					array(
						'selector'       => ".gutenverse.{$this->element_id} .gvnews_userlist.{$this->attrs['listStyle']} .gvnews_userlist-wrap",
						'property'       => function ( $value ) {
							return $this->handle_color( $value, 'border-color' );
						},
						'value'          => $this->attrs['borderColor'],
						'device_control' => false,
					)
				);
			}
		}
		if ( isset( $this->attrs['accentColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gutenverse.{$this->element_id} .gvnews_userlist .gvnews_userlist-name:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['accentColor'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['blockColor'] ) ) {
			if ( 'style-1' === $this->attrs['listStyle'] || 'style-2' === $this->attrs['listStyle'] || 'style-5' === $this->attrs['listStyle'] ) {
				$this->handle_background( ".gutenverse.{$this->element_id} .gvnews_userlist.{$this->attrs['listStyle']} .gvnews_userlist-wrap", $this->attrs['blockColor'] );
			}
		}
		if ( isset( $this->attrs['metaColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gutenverse.{$this->element_id} .gvnews_userlist .gvnews_subscribe_count, .gutenverse.{$this->element_id} .gvnews_userlist .follow-wrapper a, .gutenverse.{$this->element_id} .gvnews_userlist .gvnews_userlist-socials a i",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['metaColor'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['border'] ) ) {
			if ( $this->attrs['border'] ) {
				$selectorbx = array(
					'normal' => ".{$this->element_id} .gvnews_userlist",
					'hover'  => ".{$this->element_id} .gvnews_userlist:hover",
				);
				$this->feature_border( $selectorbx );
			}
		}
		if ( isset( $this->attrs['subBtnBg'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gutenverse.{$this->element_id} .gvnews_userlist.style-2 .gvnews_userlist-content .gvnews_meta_subscribe .follow-wrapper a, .gutenverse.{$this->element_id} .gvnews_userlist.style-3 .gvnews_userlist-content .gvnews_meta_subscribe .follow-wrapper a, .gutenverse.{$this->element_id} .gvnews_userlist.style-5 .gvnews_userlist-content .gvnews_meta_subscribe .follow-wrapper a",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['subBtnBg'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['subBtnCl'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gutenverse.{$this->element_id} .gvnews_userlist.style-2 .gvnews_userlist-content .gvnews_meta_subscribe .follow-wrapper a, .gutenverse.{$this->element_id} .gvnews_userlist.style-3 .gvnews_userlist-content .gvnews_meta_subscribe .follow-wrapper a, .gutenverse.{$this->element_id} .gvnews_userlist.style-5 .gvnews_userlist-content .gvnews_meta_subscribe .follow-wrapper a",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['subBtnCl'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['subBtnBd'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gutenverse.{$this->element_id} .gvnews_userlist.style-2 .gvnews_userlist-content .gvnews_meta_subscribe .follow-wrapper a, .gutenverse.{$this->element_id} .gvnews_userlist.style-3 .gvnews_userlist-content .gvnews_meta_subscribe .follow-wrapper a, .gutenverse.{$this->element_id} .gvnews_userlist.style-5 .gvnews_userlist-content .gvnews_meta_subscribe .follow-wrapper a",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'border-color' );
					},
					'value'          => $this->attrs['subBtnBd'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['subBtnBgHv'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gutenverse.{$this->element_id} .gvnews_userlist.style-2 .gvnews_userlist-content .gvnews_meta_subscribe .follow-wrapper a:hover, .gutenverse.{$this->element_id} .gvnews_userlist.style-3 .gvnews_userlist-content .gvnews_meta_subscribe .follow-wrapper a:hover, .gutenverse.{$this->element_id} .gvnews_userlist.style-5 .gvnews_userlist-content .gvnews_meta_subscribe .follow-wrapper a:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['subBtnBgHv'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['subBtnClHv'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gutenverse.{$this->element_id} .gvnews_userlist.style-2 .gvnews_userlist-content .gvnews_meta_subscribe .follow-wrapper a:hover, .gutenverse.{$this->element_id} .gvnews_userlist.style-3 .gvnews_userlist-content .gvnews_meta_subscribe .follow-wrapper a:hover, .gutenverse.{$this->element_id} .gvnews_userlist.style-5 .gvnews_userlist-content .gvnews_meta_subscribe .follow-wrapper a:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['subBtnClHv'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['subBtnBdHv'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gutenverse.{$this->element_id} .gvnews_userlist.style-2 .gvnews_userlist-content .gvnews_meta_subscribe .follow-wrapper a:hover, .gutenverse.{$this->element_id} .gvnews_userlist.style-3 .gvnews_userlist-content .gvnews_meta_subscribe .follow-wrapper a:hover, .gutenverse.{$this->element_id} .gvnews_userlist.style-5 .gvnews_userlist-content .gvnews_meta_subscribe .follow-wrapper a:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'border-color' );
					},
					'value'          => $this->attrs['subBtnBdHv'],
					'device_control' => false,
				)
			);
		}
	}
}
