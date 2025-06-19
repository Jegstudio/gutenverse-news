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
class Post_Meta extends Style_Abstract {

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
	protected $name = 'post-meta';

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
					'normal' => ".gvnews-block-wrapper .{$this->element_id}.gvnews-post-meta",
					'hover'  => ".gvnews-block-wrapper .{$this->element_id}.gvnews-post-meta:hover",
				),
				'border'     => array(
					'normal' => ".gvnews-block-wrapper .{$this->element_id}.gvnews-post-meta",
					'hover'  => ".gvnews-block-wrapper .{$this->element_id}.gvnews-post-meta:hover",
				),
			)
		);
	}

	/**
	 * Generate style base on attribute.
	 */
	public function generate() {

		// General Panel.
		if ( isset( $this->attrs['metaTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".gvnews-block-wrapper .{$this->element_id}.gvnews-post-meta span a",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['metaTypography'],
					'device_control' => false,
				)
			);
		}

		// Layout Panel.
		if ( isset( $this->attrs['margin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block-wrapper .{$this->element_id}.gvnews-post-meta",
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
					'selector'       => ".gvnews-block-wrapper .{$this->element_id}.gvnews-post-meta",
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
					'selector'       => ".gvnews-block-wrapper .{$this->element_id}.gvnews-post-meta",
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
					'selector'       => ".gvnews-block-wrapper .{$this->element_id}.gvnews-post-meta",
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
					'selector'       => ".gvnews-block-wrapper .{$this->element_id}.gvnews-post-meta",
					'property'       => function ( $value ) {
						return "z-index: {$value};";
					},
					'value'          => $this->attrs['zIndex'],
					'device_control' => true,
				)
			);
		}
	}
}
