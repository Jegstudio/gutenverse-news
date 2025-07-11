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
class Post_Featured extends Style_Abstract {

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
	protected $name = 'post-featured-image'; // based on folder name, not block.json.

	/**
	 * Base Selector.
	 *
	 * @var string
	 */
	protected $base_selector;

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
		$this->base_selector = ".guten-element.{$this->element_id} .gvnews_featured .thumbnail-container";

		$this->set_feature(
			array(
				'background' => array(
					'normal' => ".guten-element.{$this->element_id}",
					'hover'  => ".guten-element.{$this->element_id}:hover",
				),
				'border'     => array(
					'normal' => $this->base_selector,
					'hover'  => "{$this->base_selector}:hover",
				),
				'advance'    => $this->base_selector,
			)
		);
	}

	/**
	 * Generate style base on attribute.
	 */
	public function generate() {
		$this->image_border_style();
	}

	// === PRIVATE FUNCTION ===

	/**
	 * Style for Image Border
	 *
	 * @return void
	 */
	private function image_border_style() {
		$selector = "{$this->base_selector} > *";

		if ( isset( $this->attrs['imageBorder'] ) ) {
			$this->handle_border( 'imageBorder', $selector );
		}

		if ( isset( $this->attrs['imageBorderResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $selector,
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['imageBorderResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['imageBorderHover'] ) ) {
			$this->handle_border( 'imageBorderHover', $selector . ':hover' );
		}

		if ( isset( $this->attrs['imageBorderHoverResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $selector . ':hover',
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['imageBorderHoverResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['imageBoxShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $selector,
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['imageBoxShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['imageBoxShadowHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $selector . ':hover',
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['imageBoxShadowHover'],
					'device_control' => false,
				)
			);
		}
	}
}
