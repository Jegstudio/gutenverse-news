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
		$this->reading_time();

		$this->author_style();
		$this->date_style();
		$this->category_style();
		$this->comment_style();
		$this->author_donation();

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

		if ( isset( $this->attrs['forceColumnLeft'] ) && $this->attrs['forceColumnLeft'] ) {
			$this->inject_style(
				array(
					'selector'        => ".{$this->element_id}.gvnews-post-meta .meta-left",
					'property'        => function ( $value ) {
						return 'flex-direction: column; align-items: flex-start;';
					},
					'value'           => $this->attrs['forceColumnLeft'],
					'device_control'  => false,
					'specific_device' => 'Mobile',
				)
			);
		}

		if ( isset( $this->attrs['authorHideMobile'] ) && $this->attrs['authorHideMobile'] ) {
			$this->inject_style(
				array(
					'selector'        => ".{$this->element_id}.gvnews-post-meta .meta-part .gvnews-meta-author",
					'property'        => function ( $value ) {
						return 'display:none;';
					},
					'value'           => $this->attrs['authorHideMobile'],
					'device_control'  => false,
					'specific_device' => 'Mobile',
				)
			);
		}

		if ( isset( $this->attrs['dateHideMobile'] ) && $this->attrs['dateHideMobile'] ) {
			$this->inject_style(
				array(
					'selector'        => ".{$this->element_id}.gvnews-post-meta .meta-part .gvnews-meta-date",
					'property'        => function ( $value ) {
						return 'display:none;';
					},
					'value'           => $this->attrs['dateHideMobile'],
					'device_control'  => false,
					'specific_device' => 'Mobile',
				)
			);
		}

		if ( isset( $this->attrs['categoryHideMobile'] ) && $this->attrs['categoryHideMobile'] ) {
			$this->inject_style(
				array(
					'selector'        => ".{$this->element_id}.gvnews-post-meta .meta-part .gvnews-meta-category",
					'property'        => function ( $value ) {
						return 'display:none;';
					},
					'value'           => $this->attrs['categoryHideMobile'],
					'device_control'  => false,
					'specific_device' => 'Mobile',
				)
			);
		}

		if ( isset( $this->attrs['commentHideMobile'] ) && $this->attrs['commentHideMobile'] ) {
			$this->inject_style(
				array(
					'selector'        => ".{$this->element_id}.gvnews-post-meta .meta-part .gvnews-meta-comment",
					'property'        => function ( $value ) {
						return 'display:none;';
					},
					'value'           => $this->attrs['commentHideMobile'],
					'device_control'  => false,
					'specific_device' => 'Mobile',
				)
			);
		}

		if ( isset( $this->attrs['forceColumnRight'] ) && $this->attrs['forceColumnRight'] ) {
			$this->inject_style(
				array(
					'selector'        => ".{$this->element_id}.gvnews-post-meta .meta-right",
					'property'        => function ( $value ) {
						return 'flex-direction: column; align-items: flex-start;';
					},
					'value'           => $this->attrs['forceColumnRight'],
					'device_control'  => false,
					'specific_device' => 'Mobile',
				)
			);
		}
	}

	/**
	 * Generate author style.
	 */
	private function author_style() {
		if ( isset( $this->attrs['authorTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".guten-element.{$this->element_id}.gvnews-post-meta > div .meta-items.gvnews-meta-author a",
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

		if ( isset( $this->attrs['avatarSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.gvnews-post-meta>div .gvnews-meta-author img",
					'property'       => function ( $value ) {
						return "width: {$value}px;";
					},
					'value'          => $this->attrs['avatarSize'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['avatarGap'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.gvnews-post-meta>div .gvnews-meta-author img",
					'property'       => function ( $value ) {
						return "margin-right: {$value}px;";
					},
					'value'          => $this->attrs['avatarGap'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['avatarOpacity'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.gvnews-post-meta>div .gvnews-meta-author img",
					'property'       => function ( $value ) {
						return "opacity: calc({$value}/100);";
					},
					'value'          => $this->attrs['avatarOpacity'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['avatarBorder'] ) ) {
			$this->handle_border( 'avatarBorder', ".{$this->element_id} .gvnews-meta-author img" );
		}
		if ( isset( $this->attrs['avatarBorderResponsive'] ) ) {

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews-meta-author img",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['avatarBorderResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['avatarBoxShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.gvnews-post-meta>div .gvnews-meta-author img",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['avatarBoxShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['authorPrefixTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".guten-element.{$this->element_id}.gvnews-post-meta > div .meta-items.gvnews-meta-author span",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['authorPrefixTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['authorPrefixColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-element.{$this->element_id}.gvnews-post-meta > div .meta-items.gvnews-meta-author span",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['authorPrefixColor'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['authorPrefixGap'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-element.{$this->element_id}.gvnews-post-meta > div .meta-items.gvnews-meta-author span",
					'property'       => function ( $value ) {
						return "margin-right: {$value}px;";
					},
					'value'          => $this->attrs['authorPrefixGap'],
					'device_control' => true,
				)
			);
		}
	}
	/**
	 * Generate category meta style.
	 */
	private function category_style() {
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

		if ( isset( $this->attrs['categoryPrefixTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".guten-element.{$this->element_id}.gvnews-post-meta > div .meta-items.gvnews-meta-category span",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['categoryPrefixTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['categoryPrefixColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-element.{$this->element_id}.gvnews-post-meta > div .meta-items.gvnews-meta-category span",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['categoryPrefixColor'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['categoryPrefixGap'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-element.{$this->element_id}.gvnews-post-meta > div .meta-items.gvnews-meta-category span",
					'property'       => function ( $value ) {
						return "margin-right: {$value}px;";
					},
					'value'          => $this->attrs['categoryPrefixGap'],
					'device_control' => true,
				)
			);
		}
	}

	/**
	 * Generate comment meta style.
	 */
	private function comment_style() {
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
	}
	/**
	 * Generate date meta style.
	 */
	private function date_style() {
		if ( isset( $this->attrs['dateTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".guten-element.{$this->element_id}.gvnews-post-meta > div .meta-items.gvnews-meta-date a",
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

		if ( isset( $this->attrs['datePrefixColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-element.{$this->element_id}.gvnews-post-meta .gvnews-meta-date.with-prefix:before",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['datePrefixColor'],
					'device_control' => false,
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
		$base_selector = ".guten-element.{$this->element_id}.gvnews-post-meta .meta-items.gvnews-like-dislike-button";

		// gap between like and dislike button
		if ( isset( $this->attrs['likeDislikeGap'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $base_selector,
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'gap' );
					},
					'value'          => $this->attrs['likeDislikeGap'],
					'device_control' => true,
				)
			);
		}

		// Like Panel.
		if ( isset( $this->attrs['likeIconSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "{$base_selector} a.thumb.like svg",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'width' );
					},
					'value'          => $this->attrs['likeIconSize'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['likeIconGap'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "{$base_selector} a.thumb.like svg",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'margin-right' );
					},
					'value'          => $this->attrs['likeIconGap'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['likeIconColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "{$base_selector} .thumb.like svg",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'fill' );
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
		if ( isset( $this->attrs['dislikeIconSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "{$base_selector} .thumb.dislike svg",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'width' );
					},
					'value'          => $this->attrs['dislikeIconSize'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['dislikeIconGap'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "{$base_selector} .thumb.dislike svg",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'margin-right' );
					},
					'value'          => $this->attrs['dislikeIconGap'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['dislikeIconColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "{$base_selector} .thumb.like svg",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'fill' );
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
		$base_selector = ".guten-element.{$this->element_id}.gvnews-post-meta > div .meta-items.gvnews-bookmark a.bookmark-icon-container svg";

		if ( isset( $this->attrs['bookmarkIconSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $base_selector,
					'property'       => function ( $value ) {
						return "width: {$value}px;";
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

	/**
	 * Reading Time Style
	 *
	 * @return void
	 */
	private function reading_time() {
		$selector = '.' . $this->element_id . ' .gvnews-reading-time';

		if ( isset( $this->attrs['readingTimeTextColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $selector,
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['readingTimeTextColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['readingTimeTextTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => $selector,
					'property'       => function ( $value ) {
					},
					'value'          => $this->attrs['readingTimeTextTypography'],
					'device_control' => false,
				)
			);
		}
	}

	private function author_donation() {
		$selector = '.' . $this->element_id . ' .gvnews_meta_donation span';

		if ( isset( $this->attrs['donationTextColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $selector,
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['donationTextColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['donationTextTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => $selector,
					'property'       => function ( $value ) {
					},
					'value'          => $this->attrs['donationTextTypography'],
					'device_control' => false,
				)
			);
		}
	}
}
