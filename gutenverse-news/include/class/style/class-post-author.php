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
class Post_Author extends Style_Abstract {

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
	protected $name = 'post-author';

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
					'normal' => ".{$this->element_id}.gvnews-post-author",
					'hover'  => ".{$this->element_id}.gvnews-post-author:hover",
				),
				'border'     => array(
					'normal' => ".{$this->element_id}.gvnews-post-author",
					'hover'  => ".{$this->element_id}.gvnews-post-author:hover",
				),
			)
		);
	}

	/**
	 * Generate style base on attribute.
	 */
	public function generate() {

		$this->bio_style();
		$this->avatar_style();
		$this->name_style();
		$this->social_icon_style();

		if ( isset( $this->attrs['hideName'] ) && $this->attrs['hideName'] ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-element.{$this->element_id}.gvnews-post-author .gvnews-author-name",
					'property'       => function ( $value ) {
						return 'display: none;';
					},
					'value'          => $this->attrs['hideName'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['hideAvatar'] ) && $this->attrs['hideAvatar'] ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-element.{$this->element_id}.gvnews-post-author .gvnews-author-image",
					'property'       => function ( $value ) {
						return 'display: none;';
					},
					'value'          => $this->attrs['hideAvatar'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['hideDesc'] ) && $this->attrs['hideDesc'] ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-element.{$this->element_id}.gvnews-post-author .gvnews-author-desc",
					'property'       => function ( $value ) {
						return 'display: none;';
					},
					'value'          => $this->attrs['hideDesc'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['hideSocial'] ) && $this->attrs['hideSocial'] ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-element.{$this->element_id}.gvnews-post-author .gvnews-author-socials",
					'property'       => function ( $value ) {
						return 'display: none;';
					},
					'value'          => $this->attrs['hideSocial'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['align'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-element.{$this->element_id}.gvnews-post-author",
					'property'       => function ( $value ) {
						return "text-align: {$this->handle_align($value)};justify-content: {$value};align-items: {$value};";
					},
					'value'          => $this->attrs['align'],
					'device_control' => true,
				)
			);
			$this->inject_style(
				array(
					'selector'       => ".guten-element.{$this->element_id}.gvnews-post-author .gvnews-author-socials",
					'property'       => function ( $value ) {
						return "justify-content: {$value};";
					},
					'value'          => $this->attrs['align'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['verticalAlign'] ) && ( 'right' === $this->attrs['avatarPosition'] || 'left' === $this->attrs['avatarPosition'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-element.{$this->element_id}.gvnews-post-author",
					'property'       => function ( $value ) {
						return "align-items: {$value};";
					},
					'value'          => $this->attrs['verticalAlign'],
					'device_control' => true,
				)
			);
		}

		// Layout Panel.
		if ( isset( $this->attrs['margin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.gvnews-post-author",
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
					'selector'       => ".{$this->element_id}.gvnews-post-author",
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
					'selector'       => ".{$this->element_id}.gvnews-post-author",
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
					'selector'       => ".{$this->element_id}.gvnews-post-author",
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
					'selector'       => ".{$this->element_id}.gvnews-post-author",
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
	 * Bio Style
	 */
	private function bio_style() {
		if ( isset( $this->attrs['bioTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id}.gvnews-post-author .gvnews-author-desc",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['bioTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['bioColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.gvnews-post-author .gvnews-author-desc",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['bioColor'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['bioTextShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.gvnews-post-author .gvnews-author-desc",
					'property'       => function ( $value ) {
						return $this->handle_text_shadow( $value );
					},
					'value'          => $this->attrs['bioTextShadow'],
					'device_control' => false,
				)
			);
		}
	}

	/**
	 * Bio Style
	 */
	private function name_style() {
		if ( isset( $this->attrs['authorTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id}.gvnews-post-author .gvnews-author-name",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['authorTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['nameColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.gvnews-post-author .gvnews-author-name",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['nameColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['nameColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.gvnews-post-author .gvnews-author-name:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['nameColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['nameTextShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.gvnews-post-author .gvnews-author-name",
					'property'       => function ( $value ) {
						return $this->handle_text_shadow( $value );
					},
					'value'          => $this->attrs['nameTextShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['nameTextShadowHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.gvnews-post-author .gvnews-author-name:hover",
					'property'       => function ( $value ) {
						return $this->handle_text_shadow( $value );
					},
					'value'          => $this->attrs['nameTextShadowHover'],
					'device_control' => false,
				)
			);
		}
	}

	/**
	 * Avatar Style.
	 */
	private function avatar_style() {
		if ( isset( $this->attrs['avatarSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.gvnews-post-author .gvnews-author-image",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'width' ) . ';' . $this->handle_unit_point( $value, 'height' );
					},
					'value'          => $this->attrs['avatarSize'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['avatarMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.gvnews-post-author .gvnews-author-image",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['avatarMargin'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['avatarOpacity'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.gvnews-post-author .gvnews-author-image img",
					'property'       => function ( $value ) {
						return "opacity: calc({$value}/100);";
					},
					'value'          => $this->attrs['avatarOpacity'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['avatarRotate'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.gvnews-post-author .gvnews-author-image img",
					'property'       => function ( $value ) {
						return "transform: rotate({$value}deg);";
					},
					'value'          => $this->attrs['avatarRotate'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['avatarBorder'] ) ) {
			$this->handle_border(
				'avatarBorder',
				".{$this->element_id}.gvnews-post-author .gvnews-author-image img",
			);
		}
		if ( isset( $this->attrs['avatarBorderResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.gvnews-post-author .gvnews-author-image img",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['avatarBorderResponsive'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['avatarBoxShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.gvnews-post-author .gvnews-author-image img",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['avatarBoxShadow'],
					'device_control' => true,
				)
			);
		}
	}

	/**
	 * Social Icon Style
	 */
	private function social_icon_style() {
		if ( isset( $this->attrs['socialIconSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.gvnews-post-author .gvnews-author-socials i",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'font-size' );
					},
					'value'          => $this->attrs['socialIconSize'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['socialIconGap'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.gvnews-post-author .gvnews-author-socials",
					'property'       => function ( $value ) {
						return "gap: {$value}px;";
					},
					'value'          => $this->attrs['socialIconGap'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['socialIconColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.gvnews-post-author .gvnews-author-socials i",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['socialIconColor'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['socialIconColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.gvnews-post-author .gvnews-author-socials a:hover i",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['socialIconColorHover'],
					'device_control' => false,
				)
			);
		}
	}
}
