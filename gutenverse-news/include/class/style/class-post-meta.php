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
					'normal' => ".guten-element.{$this->element_id}.gvnews-post-meta",
					'hover'  => ".guten-element.{$this->element_id}.gvnews-post-meta:hover",
				),
				'border'     => array(
					'normal' => ".guten-element.{$this->element_id}.gvnews-post-meta",
					'hover'  => ".guten-element.{$this->element_id}.gvnews-post-meta:hover",
				),
			)
		);
	}

	/**
	 * Generate style base on attribute.
	 */
	public function generate() {

		// Author Style Panel.
		if ( isset( $this->attrs['authorTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".guten-element.{$this->element_id}.gvnews-post-meta > div .meta-items.gvnews-meta-author",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['authorTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['authorColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-element.{$this->element_id}.gvnews-post-meta > div .meta-items.gvnews-meta-author a",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['authorColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['authorColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-element.{$this->element_id}.gvnews-post-meta > div .meta-items.gvnews-meta-author a:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['authorColorHover'],
					'device_control' => false,
				)
			);
		}

		// Date Style.
		if ( isset( $this->attrs['dateTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".guten-element.{$this->element_id}.gvnews-post-meta > div .meta-items.gvnews-meta-date",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['dateTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['dateColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-element.{$this->element_id}.gvnews-post-meta > div .meta-items.gvnews-meta-date a",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['dateColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['dateColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-element.{$this->element_id}.gvnews-post-meta > div .meta-items.gvnews-meta-date a:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['dateColorHover'],
					'device_control' => false,
				)
			);
		}

		// Category Style.
		if ( isset( $this->attrs['categoryTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".guten-element.{$this->element_id}.gvnews-post-meta > div .meta-items.gvnews-meta-categoy",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['categoryTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['categoryColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-element.{$this->element_id}.gvnews-post-meta > div .meta-items.gvnews-meta-category a",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['categoryColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['categoryColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-element.{$this->element_id}.gvnews-post-meta > div .meta-items.gvnews-meta-category a:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['categoryColorHover'],
					'device_control' => false,
				)
			);
		}

		// Comment Style.
		if ( isset( $this->attrs['commentTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".guten-element.{$this->element_id}.gvnews-post-meta > div .meta-items.gvnews-meta-comment a",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['commentTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['commentColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-element.{$this->element_id}.gvnews-post-meta > div .meta-items.gvnews-meta-comment a",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['commentColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['commentColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-element.{$this->element_id}.gvnews-post-meta > div .meta-items.gvnews-meta-comment a:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['commentColorHover'],
					'device_control' => false,
				)
			);
		}

		// Layout Panel.
		if ( isset( $this->attrs['margin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-element.{$this->element_id}.gvnews-post-meta",
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
					'selector'       => ".guten-element.{$this->element_id}.gvnews-post-meta",
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
					'selector'       => ".guten-element.{$this->element_id}.gvnews-post-meta",
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
					'selector'       => ".guten-element.{$this->element_id}.gvnews-post-meta",
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
					'selector'       => ".guten-element.{$this->element_id}.gvnews-post-meta",
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
