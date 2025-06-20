<?php
/**
 * Hero
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Style;

use Gutenverse\Framework\Style_Abstract;
use GUTENVERSE\NEWS\Style\StyleAbstract;

/**
 * Class Init
 *
 * @package Gutenverse
 */
class Post_Breadcrumb extends Style_Abstract {


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
	protected $name = 'post-breadcrumb';


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
				'background' => array(
					'normal' => ".gvnews-block-wrapper .{$this->element_id}.gvnews-post-breadcrumb",
					'hover'  => ".gvnews-block-wrapper .{$this->element_id}.gvnews-post-breadcrumb:hover",
				),
				'border'     => array(
					'normal' => ".gvnews-block-wrapper .{$this->element_id}.gvnews-post-breadcrumb",
					'hover'  => ".gvnews-block-wrapper .{$this->element_id}.gvnews-post-breadcrumb:hover",
				),
			)
		);
	}

	/**
	 * Generate style base on attribute.
	 */
	public function generate() {

		// Styling Panel.
		if ( isset( $this->attrs['typography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".gvnews-block-wrapper .{$this->element_id}.gvnews-post-breadcrumb span a",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['typography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['gap'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block-wrapper .{$this->element_id}.gvnews-post-breadcrumb span a, .gvnews-block-wrapper .{$this->element_id}.gvnews-post-breadcrumb i",
					'property'       => function ( $value ) {
						return "margin-right: {$value}px;";
					},
					'value'          => $this->attrs['gap'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['textColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block-wrapper .{$this->element_id}.gvnews-post-breadcrumb span a",
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
					'selector'       => ".gvnews-block-wrapper .{$this->element_id}.gvnews-post-breadcrumb span a:hover",
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
					'selector'       => ".gvnews-block-wrapper .{$this->element_id}.gvnews-post-breadcrumb i",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['arrowColor'],
					'device_control' => false,
				)
			);
		}

		// Layout Panel.
		if ( isset( $this->attrs['margin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block-wrapper .{$this->element_id}.gvnews-post-breadcrumb",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['margin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['padding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block-wrapper .{$this->element_id}.gvnews-post-breadcrumb",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['padding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['width'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block-wrapper .{$this->element_id}.gvnews-post-breadcrumb",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'width' );
					},
					'value'          => $this->attrs['width'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['height'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block-wrapper .{$this->element_id}.gvnews-post-breadcrumb",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'height' );
					},
					'value'          => $this->attrs['height'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['zIndex'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block-wrapper .{$this->element_id}.gvnews-post-breadcrumb",
					'property'       => function ( $value ) {
						return "z-index: {$value};";
					},
					'value'          => $this->attrs['zIndex'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['alignment'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block-wrapper .{$this->element_id}.gvnews-post-breadcrumb",
					'property'       => function ( $value ) {
						return "justify-content: {$value};";
					},
					'value'          => $this->attrs['alignment'],
					'device_control' => true,
				)
			);
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block-wrapper .{$this->element_id}.gvnews-post-breadcrumb",
					'property'       => function ( $value ) {
						return 'text-align: ' .
						( 'flex-start' === $value ? 'left' :
						( 'flex-end' === $value ? 'right' : 'center' ) ) .
						';';
					},
					'value'          => $this->attrs['alignment'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['verticalAlignment'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block-wrapper .{$this->element_id}.gvnews-post-breadcrumb",
					'property'       => function ( $value ) {
						return "align-items: {$value};";
					},
					'value'          => $this->attrs['verticalAlignment'],
					'device_control' => true,
				)
			);
		}
	}
}
