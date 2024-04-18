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
		if ( isset( $this->attrs['bacground1'] ) && $this->attrs['override1'] ) {
			$this->handle_background( ".{$this->element_id} .gvnews_hero_item_1 .gvnews_thumb a > div:" . ( ( '5' === $this->attrs['heroStyle'] ) ? 'after' : 'before' ), $this->attrs['bacground1'] );
		}
		if ( isset( $this->attrs['bacground2'] ) && $this->attrs['override2'] ) {
			$this->handle_background( ".{$this->element_id} .gvnews_hero_item_2 .gvnews_thumb a > div:" . ( ( '5' === $this->attrs['heroStyle'] ) ? 'after' : 'before' ), $this->attrs['bacground2'] );
		}
		if ( isset( $this->attrs['bacground3'] ) && $this->attrs['override3'] ) {
			$this->handle_background( ".{$this->element_id} .gvnews_hero_item_3 .gvnews_thumb a > div:" . ( ( '5' === $this->attrs['heroStyle'] ) ? 'after' : 'before' ), $this->attrs['bacground3'] );
		}
		if ( isset( $this->attrs['bacground4'] ) && $this->attrs['override4'] ) {
			$this->handle_background( ".{$this->element_id} .gvnews_hero_item_4 .gvnews_thumb a > div:" . ( ( '5' === $this->attrs['heroStyle'] ) ? 'after' : 'before' ), $this->attrs['bacground4'] );
		}
		if ( isset( $this->attrs['bacground5'] ) && $this->attrs['override5'] ) {
			$this->handle_background( ".{$this->element_id} .gvnews_hero_item_5 .gvnews_thumb a > div:" . ( ( '5' === $this->attrs['heroStyle'] ) ? 'after' : 'before' ), $this->attrs['bacground5'] );
		}
		if ( isset( $this->attrs['bacground6'] ) && $this->attrs['override6'] ) {
			$this->handle_background( ".{$this->element_id} .gvnews_hero_item_6 .gvnews_thumb a > div:" . ( ( '5' === $this->attrs['heroStyle'] ) ? 'after' : 'before' ), $this->attrs['bacground6'] );
		}
		if ( isset( $this->attrs['bacground7'] ) && $this->attrs['override7'] ) {
			$this->handle_background( ".{$this->element_id} .gvnews_hero_item_7 .gvnews_thumb a > div:" . ( ( '5' === $this->attrs['heroStyle'] ) ? 'after' : 'before' ), $this->attrs['bacground7'] );
		}

		$selector = array(
			'normal' => ".{$this->element_id} .gvnews_heroblock",
			'hover'  => ".{$this->element_id} .gvnews_heroblock:hover",
		);

		if ( isset( $this->attrs['border'] ) ) {
			$this->handle_border( 'border', $selector['normal'] );
		}

		if ( isset( $this->attrs['borderHover'] ) ) {
			$this->handle_border( 'borderHover', $selector['hover'] );
		}

		if ( isset( $this->attrs['heroMargin'] ) ) {
			$this->inject_style(
				$this->inject_style(
					array(
						'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} article.gvnews_post",
						'property'       => function ( $value ) {
							return "padding: 0 0 ${value}px ${value}px;";
						},
						'value'          => $this->attrs['heroMargin'],
						'device_control' => false,
					)
				)
			);

			$this->inject_style(
				$this->inject_style(
					array(
						'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_heroblock_wrapper",
						'property'       => function ( $value ) {
							return "margin: 0 0 -${value}px -${value}px;";
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
					'selector'       => $selector['normal'],
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
					'selector'       => $selector['hover'],
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['boxShadowHover'],
					'device_control' => false,
				)
			);
		}
	}
}
