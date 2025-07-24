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
		$this->like_dislike_button();
		$this->bookmark_style();

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

	/**
	 * Like Disklike Button
	 *
	 * @return void
	 */
	private function like_dislike_button() {
		$base_selector = ".guten-element.{$this->element_id}.gvnews-post-meta > div .meta-items.gvnews-like-dislike-button";

		// Like Panel.
		if ( isset( $this->attrs['likeIconTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => "{$base_selector} .thumb.like i",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['likeIconTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['likeIconColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "{$base_selector} .thumb.like i",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['likeIconColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['likeCountTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => "{$base_selector} .thumb.like span",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['likeCountTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['likeCountColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "{$base_selector} .thumb.like span",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['likeCountColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['likeBackground'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "{$base_selector} .thumb.like",
					'property'       => function ( $value ) use ( $base_selector ) {
						return $this->handle_background(
							"{$base_selector} .thumb.like",
							$value,
						);
					},
					'value'          => $this->attrs['likeBackground'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['likeMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "{$base_selector} .thumb.like",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['likeMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['likePadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "{$base_selector} .thumb.like",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['likePadding'],
					'device_control' => true,
				)
			);
		}

		// Dislike Panel.
		if ( isset( $this->attrs['dislikeIconTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => "{$base_selector} .thumb.like i",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['dislikeIconTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['dislikeIconColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "{$base_selector} .thumb.like i",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['dislikeIconColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['dislikeCountTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => "{$base_selector} .thumb.like span",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['dislikeCountTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['dislikeCountColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "{$base_selector} .thumb.like span",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['dislikeCountColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['dislikeBackground'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "{$base_selector} .thumb.like",
					'property'       => function ( $value ) use ( $base_selector ) {
						return $this->handle_background(
							"{$base_selector} .thumb.like",
							$value,
						);
					},
					'value'          => $this->attrs['dislikeBackground'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['dislikeMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "{$base_selector} .thumb.like",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['dislikeMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['dislikePadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "{$base_selector} .thumb.like",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['dislikePadding'],
					'device_control' => true,
				)
			);
		}
	}

	/**
	 * Bookmark Style.
	 *
	 * @return void
	 */
	private function bookmark_style() {
		$base_selector = ".guten-element.{$this->element_id}.gvnews-post-meta > div .meta-items.gvnews-bookmark a.bookmark-icon-container i";

		if ( isset( $this->attrs['bookmarkIconSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $base_selector,
					'property'       => function ( $value ) {
						return "font-size: {$value}px;";
					},
					'value'          => $this->attrs['bookmarkIconSize'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['bookmarkIconColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $base_selector,
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['bookmarkIconColor'],
					'device_control' => false,
				)
			);
		}
	}
}
