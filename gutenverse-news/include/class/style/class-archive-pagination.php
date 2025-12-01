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
 * Class Archive Pagination Style
 *
 * @package Gutenverse
 */
class Archive_Pagination extends StyleAbstract {


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
					'normal' => ".gvnews-block.gvnews-block-wrapper.gvnews-block.gvnews-block-wrapper.{$this->element_id}",
					'hover'  => ".gvnews-block.gvnews-block-wrapper.gvnews-block.gvnews-block-wrapper.{$this->element_id}:hover",
				),
				'border'      => array(
					'normal' => ".gvnews-block.gvnews-block-wrapper.{$this->element_id}.gvnews-block.gvnews-block-wrapper",
					'hover'  => ".gvnews-block.gvnews-block-wrapper.{$this->element_id}.gvnews-block.gvnews-block-wrapper:hover",
				),
				'advance'     => ".gvnews-block.gvnews-block-wrapper.{$this->element_id}.gvnews-block.gvnews-block-wrapper",
				'positioning' => ".gvnews-block.gvnews-block-wrapper.{$this->element_id}.gvnews-block.gvnews-block-wrapper",
				'animation'   => ".gvnews-block.gvnews-block-wrapper.{$this->element_id}.gvnews-block.gvnews-block-wrapper",
			)
		);
	}



	/**
	 * Generate style base on attribute.
	 */
	public function generate() {
		$is_type_3        = isset( $this->attrs['paginationMode'] ) && 'nav_3' === $this->attrs['paginationMode'];
		$pagination_align = isset( $this->attrs['paginationAlign'] ) ? $this->attrs['paginationAlign'] : '';

		if ( isset( $this->attrs['paginationTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_pagination .nav-item",
					'property'       => function ( $value ) {
					},
					'value'          => $this->attrs['paginationTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['pagintaionInfoTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_pagination .page_info",
					'property'       => function ( $value ) {
					},
					'value'          => $this->attrs['pagintaionInfoTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['paginationButtonTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_pagenav_3 .page_nav",
					'property'       => function ( $value ) {
					},
					'value'          => $this->attrs['paginationButtonTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['paginationColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_pagination .nav-wrapper .nav-item:not(.active)",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['paginationColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['paginationInfoColor'] ) ) {
			$this->inject_style(
				array(
				'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_pagination .page_info",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['paginationInfoColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['paginationCurrentColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_pagination .page_number.active",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['paginationCurrentColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['paginationHoverColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_pagination .nav-wrapper a.nav-item:not(.active):hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['paginationHoverColor'],
					'device_control' => false,
				)
			);
		}

		if ( $is_type_3 ) {
			if ( isset( $this->attrs['paginationCurrentColor'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_pagination .page_number.active",
						'property'       => function ( $value ) {
							return $this->handle_color( $value, 'border-top-color' );
						},
						'value'          => $this->attrs['paginationCurrentColor'],
						'device_control' => false,
					)
				);
			}

			if ( isset( $this->attrs['nextPrevColor'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_pagenav_3 a.page_nav",
						'property'       => function ( $value ) {
							return $this->handle_color( $value, 'color' );
						},
						'value'          => $this->attrs['nextPrevColor'],
						'device_control' => false,
					)
				);
			}

			if ( isset( $this->attrs['nextPrevHoverColor'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_pagenav_3 a.page_nav:hover",
						'property'       => function ( $value ) {
							return $this->handle_color( $value, 'color' );
						},
						'value'          => $this->attrs['nextPrevHoverColor'],
						'device_control' => false,
					)
				);
			}

			if ( isset( $this->attrs['nextPrevBackground'] ) ) {
				$this->handle_background(
					".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_pagenav_3 a.page_nav",
					$this->attrs['nextPrevBackground']
				);
			}

			if ( isset( $this->attrs['nextPrevHoverBackground'] ) ) {
				$this->handle_background(
					".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_pagenav_3 a.page_nav:hover",
					$this->attrs['nextPrevHoverBackground']
				);
			}

			if ( isset( $this->attrs['paginationHoverColor'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_pagination .nav-wrapper a.nav-item:not(.active):hover",
						'property'       => function ( $value ) {
							return $this->handle_color( $value, 'border-top-color' );
						},
						'value'          => $this->attrs['paginationHoverColor'],
						'device_control' => false,
					)
				);
			}

			if ( isset( $this->attrs['paginationPadding'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_pagenav_3 .page_nav",
						'property'       => function ( $value ) {
							return $this->handle_dimension( $value, 'padding' );
						},
						'value'          => $this->attrs['paginationPadding'],
						'device_control' => true,
					)
				);
			}

			if ( isset( $this->attrs['lineThick'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .gvnews_pagenav_3 ,.gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_pagenav_3 .page_number",
						'property'       => function ( $value ) {
							return "border-top-width: {$value}px;";
						},
						'value'          => $this->attrs['lineThick'],
						'device_control' => true,
					)
				);

				$this->inject_style(
					array(
						'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_pagenav_3 .page_number",
						'property'       => function ( $value ) {
							return "margin-top: -{$value}px;";
						},
						'value'          => $this->attrs['lineThick'],
						'device_control' => true,
					)
				);
			}

			if ( isset( $this->attrs['lineGap'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_pagenav_3 .nav-wrapper .nav-item",
						'property'       => function ( $value ) {
											return "padding-top: {$value}px;";
						},
						'value'          => $this->attrs['lineGap'],
						'device_control' => true,
					)
				);
			}
		} else {
			if ( isset( $this->attrs['paginationBackground'] ) ) {
				$this->handle_background(
					".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_pagination a:not(.active)",
					$this->attrs['paginationBackground']
				);
			}

			if ( isset( $this->attrs['paginationCurrentBackground'] ) ) {
				$this->handle_background(
					".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_pagination .page_number.active",
					$this->attrs['paginationCurrentBackground']
				);
			}

			if ( isset( $this->attrs['paginationHoverBackground'] ) ) {
				$this->handle_background(
					".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_pagination a:hover",
					$this->attrs['paginationHoverBackground']
				);
			}

			if ( isset( $this->attrs['paginationPadding'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_pagination .nav-wrapper .page_number , .gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_pagination .nav-wrapper .page_nav",
						'property'       => function ( $value ) {
							return $this->handle_dimension( $value, 'padding' );
						},
						'value'          => $this->attrs['paginationPadding'],
						'device_control' => true,
					)
				);
			}

			if ( isset( $this->attrs['paginationActiveBorder'] ) ) {
				$this->handle_border( 'paginationActiveBorder', ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_navigation .page_number.active" );
			}

			if ( isset( $this->attrs['paginationActiveBorderResponsive'] ) ) {
				$this->handle_border( 'paginationActiveBorderResponsive', ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_navigation .page_number.active" );
			}
		}

		if ( isset( $this->attrs['numberGap'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_pagination .nav-wrapper",
					'property'       => function ( $value ) {
						return "gap: {$value}px;";
					},
					'value'          => $this->attrs['numberGap'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['nextPrevGap'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_pagination .next-prev-button",
					'property'       => function ( $value ) {
						return "gap: {$value}px;";
					},
					'value'          => $this->attrs['nextPrevGap'],
					'device_control' => true,
				)
			);
		}

		if ( 'center' === $pagination_align && isset( $this->attrs['infoGap'] ) ) {
			$selector = $is_type_3 ?
				".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_pagenav_3.gvnews_aligncenter" :
				".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_pagination .page_info";
			$this->inject_style(
				array(
					'selector'       => $selector,
					'property'       => $is_type_3 ? function ( $value ) {
						return "padding-bottom: {$value}px;";
					} : function ( $value ) {
						return "margin-bottom: {$value}px;";
					},
					'value'          => $this->attrs['infoGap'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['paginationBorder'] ) ) {
			$selector = $is_type_3 ?
				".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_pagenav_3 .page_nav" :
				".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_navigation .page_nav, .gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_navigation .page_number";
			$this->handle_border( 'paginationBorder', $selector );
		}

		if ( isset( $this->attrs['paginationBorderResponsive'] ) ) {
			$selector = $is_type_3 ?
				".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_pagenav_3 .page_nav" :
				".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_navigation .page_nav, .gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_navigation .page_number";
			$this->handle_border( 'paginationBorderResponsive', $selector );
		}

		if ( isset( $this->attrs['paginationHoverBorder'] ) ) {
			$selector = $is_type_3 ?
				".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_pagenav_3 .page_nav:hover" :
				".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_navigation .page_nav:hover, .gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_navigation .page_number:hover";
			$this->handle_border( 'paginationHoverBorder', $selector );
		}

		if ( isset( $this->attrs['paginationHoverBorderResponsive'] ) ) {
			$selector = $is_type_3 ?
				".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_pagenav_3 .page_nav:hover" :
				".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_navigation .page_nav:hover, .gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_navigation .page_number:hover";
			$this->handle_border( 'paginationHoverBorderResponsive', $selector );
		}

		if ( ! $is_type_3 && isset( $this->attrs['paginationActiveBorder'] ) ) {
			$this->handle_border( 'paginationActiveBorder', ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_navigation .page_number.active" );
		}

		if ( ! $is_type_3 && isset( $this->attrs['paginationActiveBorderResponsive'] ) ) {
			$this->handle_border( 'paginationActiveBorderResponsive', ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_navigation .page_number.active" );
		}
	}
}
