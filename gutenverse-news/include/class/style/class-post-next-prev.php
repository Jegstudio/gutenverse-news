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
class Post_Next_Prev extends Style_Abstract {

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
	protected $name = 'post-prev-next';

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

		$this->base_selector = ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_prevnext_post";

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
		if ( isset( $this->attrs['titleTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector' => "{$this->base_selector} .post-title",
					'value'    => $this->attrs['titleTypography'],
				)
			);
		}
		if ( isset( $this->attrs['navTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector' => "{$this->base_selector} .gvnews_prevnext_post .caption",
					'value'    => $this->attrs['navTypography'],
				)
			);
		}

		if ( isset( $this->attrs['titleColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "{$this->base_selector} .post-title",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['titleColor'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['titleColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "{$this->base_selector} .post-title:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['titleColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['navTextColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "{$this->base_selector} .caption",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['navTextColor'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['navTextColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "{$this->base_selector} .caption:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['navTextColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['accentColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "{$this->base_selector} a .post-title",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'border-left-color' );
					},
					'value'          => $this->attrs['accentColor'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['accentColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "{$this->base_selector} a:hover .post-title",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'border-left-color' );
					},
					'value'          => $this->attrs['accentColorHover'],
					'device_control' => false,
				)
			);
		}
	}
}
