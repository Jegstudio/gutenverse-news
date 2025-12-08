<?php
/**
 * Social Author Icon
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Style;

use GUTENVERSE\NEWS\Style\StyleAbstract;


/**
 * Class Social_Author_Icon
 *
 * @package Gutenverse
 */
class Social_Author_Icon extends StyleAbstract {

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
	protected $name = 'social-author-icon';

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
				'background' => array(
					'normal' => ".{$this->element_id}.gvnews-social-author-icon.guten-social-icon",
					'hover'  => ".{$this->element_id}.gvnews-social-author-icon.guten-social-icon:hover",
				),
				'border'     => array(
					'normal' => ".{$this->element_id}.gvnews-social-author-icon.guten-social-icon",
					'hover'  => ".{$this->element_id}.gvnews-social-author-icon.guten-social-icon:hover",
				),
			)
		);
	}

	/**
	 * Generate style base on attribute.
	 */
	public function generate() {

		$this->color_style();

		// Icon Size.
		if ( isset( $this->attrs['iconSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-social-author-icon.{$this->element_id}.guten-social-icon i",
					'property'       => function ( $value ) {
						return "font-size: {$value}px;";
					},
					'value'          => $this->attrs['iconSize'],
					'device_control' => true,
				)
			);
		}

		// Margin.
		if ( isset( $this->attrs['margin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-social-author-icon.{$this->element_id}.guten-social-icon",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['margin'],
					'device_control' => true,
				)
			);
		}

		// Padding.
		if ( isset( $this->attrs['padding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-social-author-icon.{$this->element_id}.guten-social-icon",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['padding'],
					'device_control' => true,
				)
			);
		}

		// Z-Index.
		if ( isset( $this->attrs['zIndex'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-social-author-icon.{$this->element_id}.guten-social-icon",
					'property'       => function ( $value ) {
						return "z-index: {$value};";
					},
					'value'          => $this->attrs['zIndex'],
					'device_control' => true,
				)
			);
		}
	}

	/**
	 * Color style
	 */
	private function color_style() {
		// Icon Color.
		if ( isset( $this->attrs['iconColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-social-author-icon.{$this->element_id}.guten-social-icon a i",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['iconColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['iconColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-social-author-icon.{$this->element_id}.guten-social-icon a:hover i",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['iconColorHover'],
					'device_control' => false,
				)
			);
		}

		// Icon Background.
		// Normal.
		if ( isset( $this->attrs['iconBackground'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-social-author-icon.{$this->element_id}.guten-social-icon a",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['iconBackground'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['iconBackgroundHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-social-author-icon.{$this->element_id}.guten-social-icon a:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['iconBackgroundHover'],
					'device_control' => false,
				)
			);
		}

		// Gradient.
		if ( isset( $this->attrs['iconBackgroundGradient'] ) ) {
			$this->handle_background(
				".gvnews-social-author-icon.{$this->element_id}.guten-social-icon a",
				$this->attrs['iconBackgroundGradient'],
			);
		}
		if ( isset( $this->attrs['iconBackgroundGradientHover'] ) ) {
			$this->handle_background(
				".gvnews-social-author-icon.{$this->element_id}.guten-social-icon a:hover",
				$this->attrs['iconBackgroundGradientHover'],
			);
		}
	}
}
