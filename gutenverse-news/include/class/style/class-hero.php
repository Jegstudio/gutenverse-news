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
class Hero extends StyleAbstract {


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
					'normal' => ".{$this->element_id}.gvnews-block.gvnews-block-wrapper .gvnews_heroblock",
					'hover'  => ".{$this->element_id}.gvnews-block.gvnews-block-wrapper .gvnews_heroblock:hover",
				),
				'advance' => ".{$this->element_id}.gvnews-block.gvnews-block-wrapper .gvnews_heroblock",
			)
		);
	}

	/**
	 * Generate style base on attribute.
	 */
	public function generate() {

		if ( isset( $this->attrs['heroItemOverlay'] ) ) {
			foreach ( $this->attrs['heroItemOverlay'] as $key => $overlay ) {
				if ( $overlay['overlayEnable'] && isset( $overlay['OverlayGradient'] ) ) {
					$this->handle_background( ".{$this->element_id} .gvnews_hero_item_" . $key + 1 . ' .gvnews_thumb a > div:' . ( ( '5' === $this->attrs['heroStyle'] ) ? 'after' : 'before' ), $overlay['OverlayGradient'] );
				}
			}
		}

		if ( isset( $this->attrs['heroMargin'] ) ) {
			$this->inject_style(
				$this->inject_style(
					array(
						'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_heroblock_wrapper",
						'property'       => function ( $value ) {
							return "margin: 0 0 -{$value}px -{$value}px;";
						},
						'value'          => $this->attrs['heroMargin'],
						'device_control' => false,
					)
				)
			);
			$this->inject_style(
				$this->inject_style(
					array(
						'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} article.gvnews_post",
						'property'       => function ( $value ) {
							return "padding: 0 0 {$value}px {$value}px;";
						},
						'value'          => $this->attrs['heroMargin'],
						'device_control' => false,
					)
				)
			);
		}

		if ( isset( $this->attrs['boxShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.gvnews-block.gvnews-block-wrapper .gvnews_heroblock",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['boxShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['boxShadowHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.gvnews-block.gvnews-block-wrapper .gvnews_heroblock",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['boxShadowHover'],
					'device_control' => false,
				)
			);
		}
		if ( ! empty( $this->attrs['heightDesktop'] ) ) {
			$height = $this->attrs['heightDesktop'];
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_heroblock .gvnews_hero_wrapper .gvnews_heroblock_wrapper",
					'value'          => "height: {$height}px; ",
					'custom'         => '@media only screen and (min-width: 1025px)',
					'device_control' => false,
				)
			);
		}

		if ( ! empty( $this->attrs['height1024'] ) ) {
			$height = $this->attrs['height1024'];
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_heroblock .gvnews_hero_wrapper .gvnews_heroblock_wrapper",
					'value'          => "height: {$height}px; ",
					'custom'         => '@media only screen and (max-width: 1024px) and (min-width: 769px)',
					'device_control' => false,
				)
			);
		}

		if ( ! empty( $this->attrs['height768'] ) ) {
			$height = $this->attrs['height768'];
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_heroblock .gvnews_hero_wrapper .gvnews_heroblock_wrapper",
					'value'          => "height: {$height}px; ",
					'custom'         => '@media only screen and (max-width: 768px) and (min-width: 668px)',
					'device_control' => false,
				)
			);
		}

		if ( ! empty( $this->attrs['height667'] ) ) {
			$height = $this->attrs['height667'];
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_heroblock .gvnews_hero_wrapper .gvnews_heroblock_wrapper",
					'value'          => "height: {$height}px; ",
					'custom'         => '@media only screen and (max-width: 667px) and (min-width: 569px)',
					'device_control' => false,
				)
			);
		}

		if ( ! empty( $this->attrs['height568'] ) ) {
			$height = $this->attrs['height568'];
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_heroblock .gvnews_hero_wrapper .gvnews_heroblock_wrapper",
					'value'          => "height: {$height}px; ",
					'custom'         => '@media only screen and (max-width: 568px) and (min-width: 481px)',
					'device_control' => false,
				)
			);
		}

		if ( ! empty( $this->attrs['height480'] ) ) {
			$height = $this->attrs['height480'];
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
	}
}
