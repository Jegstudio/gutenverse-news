<?php
/**
 * Header
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
class Header extends StyleAbstract {

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
				'border'      => array(
					'normal' => ".{$this->element_id}.gvnews-block.gvnews-block-wrapper .gvnews_block_heading",
					'hover'  => ".{$this->element_id}.gvnews-block.gvnews-block-wrapper .gvnews_block_heading:hover",
				),
				'advance'     => ".gvnews-block-wrapper.{$this->element_id} .gvnews_block_heading",
				'positioning' => ".{$this->element_id}.gvnews-block.gvnews-block-wrapper",
			)
		);
	}

	/**
	 * Generate style base on attribute.
	 */
	public function generate() {

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

		if ( isset( $this->attrs['headerIconColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "
						.{$this->element_id} .gvnews_block_title span .gutenverse-icon-svg,
						.{$this->element_id} .gvnews_block_title span i
					",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['headerIconColor'],
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
}
