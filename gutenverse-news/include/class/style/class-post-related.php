<?php
/**
 * Post Title
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Init
 *
 * @package Gutenverse
 */
class Post_Related extends Style_Abstract {

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
	protected $name = 'post-related';

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
				'mask'        => null,
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
					'selector'       => ".{$this->element_id} .gvnews_block_heading .gvnews_block_title span",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['headerTextColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['headerBackgroundColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "
						.{$this->element_id} .gvnews_block_heading_1 .gvnews_block_title span,
						.{$this->element_id} .gvnews_block_heading_2 .gvnews_block_title span,
						.{$this->element_id} .gvnews_block_heading_4 .gvnews_block_title span,
						.{$this->element_id} .gvnews_block_heading_5 .gvnews_block_title span
					",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background' );
					},
					'value'          => $this->attrs['headerBackgroundColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['headerBackgroundColor2'] ) ) {
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

		if ( isset( $this->attrs['headerSecondColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_block_heading_2",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background' );
					},
					'value'          => $this->attrs['headerSecondColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['headerLineColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "
						.{$this->element_id} .gvnews_block_heading_1,
						.{$this->element_id} .gvnews_block_heading_6,
						.{$this->element_id} .gvnews_block_heading_9
					",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'border-color' );
					},
					'value'          => $this->attrs['headerLineColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['headerLineColor2'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "
						.{$this->element_id} .gvnews_block_heading_5:before
					",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'border-color' );
					},
					'value'          => $this->attrs['headerLineColor2'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['headerAccentColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "
						.{$this->element_id} .gvnews_block_heading_6:after
					",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background' );
					},
					'value'          => $this->attrs['headerAccentColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['headerAccentColor2'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "
						.{$this->element_id} .gvnews_block_heading_7 .gvnews_block_title span
					",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'border-color' );
					},
					'value'          => $this->attrs['headerAccentColor2'],
					'device_control' => false,
				)
			);
		}
	}
}
