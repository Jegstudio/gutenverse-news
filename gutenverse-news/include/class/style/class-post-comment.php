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
class Post_Comment extends Style_Abstract {

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
	protected $name = 'post-comment';

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
					'normal' => ".guten-element.{$this->element_id}.gvnews-post-comment",
					'hover'  => ".guten-element.{$this->element_id}.gvnews-post-comment:hover",
				),
				'border'     => array(
					'normal' => ".guten-element.{$this->element_id}.gvnews-post-comment",
					'hover'  => ".guten-element.{$this->element_id}.gvnews-post-comment:hover",
				),
				'advance'    => null,
			)
		);
	}

	/**
	 * Generate style base on attribute.
	 */
	public function generate() {

		$this->layout_style();
		$this->avatar_style();
		$this->button_style();
		$this->input_style();
		$this->main_comment_style();
		$this->reply_style();
		$this->typography_heading_style();
		$this->typography_label_style();
		$this->typography_link_style();
		$this->typography_text_style();
		$this->separator_stye();
	}

	/**
	 * Method For Layout style
	 *
	 * @return void
	 */
	private function layout_style() {
		if ( isset( $this->attrs['margin'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".guten-element.{$this->element_id}.gvnews-post-comment",
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
					'selector'       => ".guten-element.{$this->element_id}.gvnews-post-comment",
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
					'selector'       => ".guten-element.{$this->element_id}.gvnews-post-comment",
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
					'selector'       => ".guten-element.{$this->element_id}.gvnews-post-comment",
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
					'selector'       => ".guten-element.{$this->element_id}.gvnews-post-comment",
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
	 * Method For Avatar style
	 *
	 * @return void
	 */
	private function avatar_style() {
		if ( isset( $this->attrs['avatarMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .comment-author img.avatar",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['avatarMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['avatarBorder'] ) ) {
			$this->handle_border( 'avatarBorder', ".{$this->element_id} .comment-author img.avatar" );
		}

		if ( isset( $this->attrs['avatarBorderResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .comment-author img.avatar",
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
	}

	/**
	 * Method For Button style
	 *
	 * @return void
	 */
	private function button_style() {
		if ( isset( $this->attrs['typographyButton'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id}.gvnews-post-comment input[type=submit]",
					'value'          => $this->attrs['typographyButton'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['colorButton'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.gvnews-post-comment input[type=submit]",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['colorButton'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['bgcolorButton'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.gvnews-post-comment input[type=submit]",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['bgcolorButton'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['bggradientButton'] ) ) {
			$this->handle_background( ".{$this->element_id}.gvnews-post-comment input[type=submit]", $this->attrs['bggradientButton'] );
		}

		if ( isset( $this->attrs['borderButton'] ) ) {
			$this->handle_border( 'borderButton', ".{$this->element_id}.gvnews-post-comment input[type=submit]" );
		}

		if ( isset( $this->attrs['borderButtonResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.gvnews-post-comment input[type=submit]",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['borderButtonResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['marginButton'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.gvnews-post-comment input[type=submit]",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['marginButton'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['paddingButton'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.gvnews-post-comment input[type=submit]",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['paddingButton'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['colorButtonHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.gvnews-post-comment input[type=submit]:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['colorButtonHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['bgcolorButtonHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.gvnews-post-comment input[type=submit]:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['bgcolorButtonHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['bggradientButtonHover'] ) ) {
			$this->handle_background( ".{$this->element_id}.gvnews-post-comment input[type=submit]:hover", $this->attrs['bggradientButtonHover'] );
		}

		if ( isset( $this->attrs['borderButtonHover'] ) ) {
			$this->handle_border( 'borderButtonHover', ".{$this->element_id}.gvnews-post-comment input[type=submit]:hover" );
		}

		if ( isset( $this->attrs['borderButtonHoverResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.gvnews-post-comment input[type=submit]:hover",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['borderButtonHoverResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['marginButtonHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.gvnews-post-comment input[type=submit]:hover",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['marginButtonHover'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['paddingButtonHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.gvnews-post-comment input[type=submit]:hover",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['paddingButtonHover'],
					'device_control' => true,
				)
			);
		}
	}

	/**
	 * Method For Input style
	 *
	 * @return void
	 */
	private function input_style() {
		if ( isset( $this->attrs['inputTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} .comment-form input:not([type=submit]), .{$this->element_id} .comment-form textarea,
						.{$this->element_id} textarea",
					'value'          => $this->attrs['inputTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['inputBorder'] ) ) {
			$this->handle_border(
				'inputBorder',
				".{$this->element_id} .comment-form input:not([type=submit]), 
				.{$this->element_id} .comment-form textarea,
				.{$this->element_id} .commentlist .comment-respond textarea"
			);
		}

		if ( isset( $this->attrs['inputBorderResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .comment-form input:not([type=submit]), .{$this->element_id} .comment-form textarea",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['inputBorderResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['inputBorderHover'] ) ) {
			$this->handle_border(
				'inputBorderHover',
				".{$this->element_id} .comment-form input:not([type=submit]):hover, 
				.{$this->element_id} .comment-form textarea:hover,
				.{$this->element_id} .commentlist .comment-respond textarea:hover"
			);
		}

		if ( isset( $this->attrs['inputBorderHoverResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .comment-form input:not([type=submit]):hover, .{$this->element_id} .comment-form textarea:hover",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['inputBorderHoverResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['inputBorderFocus'] ) ) {
			$this->handle_border(
				'inputBorderFocus',
				".{$this->element_id} .comment-form input:not([type=submit]):focus, 
				.{$this->element_id} .comment-form textarea:focus,
				.{$this->element_id} .commentlist .comment-respond textarea:focus"
			);
		}

		if ( isset( $this->attrs['inputBorderFocusResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .comment-form input:not([type=submit]):focus, .{$this->element_id} .comment-form textarea:focus",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['inputBorderFocusResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['inputMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .comment-form input:not([type=submit]), .{$this->element_id} .comment-form textarea",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['inputMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['inputPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .comment-form input:not([type=submit]), .{$this->element_id} .comment-form textarea",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['inputPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['inputColorNormal'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .comment-form input:not([type=submit]), .{$this->element_id} .comment-form textarea",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['inputColorNormal'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['inputBgColorNormal'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .comment-form input:not([type=submit]), .{$this->element_id} .comment-form textarea",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['inputBgColorNormal'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['inputColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .comment-form input:not([type=submit]):hover, .{$this->element_id} .comment-form textarea:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['inputColorHover'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['inputBgColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .comment-form input:not([type=submit]):hover, .{$this->element_id} .comment-form textarea:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['inputBgColorHover'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['inputColorFocus'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "
					.{$this->element_id} .comment-form input:not([type=submit]):focus, 
					.{$this->element_id} .comment-form textarea:focus, 
					.{$this->element_id} .comment-form input:not([type=submit]):focus-visible, 
					.{$this->element_id} .comment-form textarea:focus-visible
					",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['inputColorFocus'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['inputBgColorFocus'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "
					.{$this->element_id} .comment-form input:not([type=submit]):focus, 
					.{$this->element_id} .comment-form textarea:focus, 
					.{$this->element_id} .comment-form input:not([type=submit]):focus-visible, 
					.{$this->element_id} .comment-form textarea:focus-visible
					",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['inputBgColorFocus'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['inputAreaBoxShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .comment-form input:not([type=submit],[type=checkbox])	, .{$this->element_id} .comment-form textarea	",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['inputAreaBoxShadow'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['inputAreaBoxShadowHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .comment-form input:not([type=submit],[type=checkbox]):hover, .{$this->element_id} .comment-form textarea:hover",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['inputAreaBoxShadowHover'],
					'device_control' => false,
				)
			);
		}
	}

	/**
	 * Method For Main Comment style
	 *
	 * @return void
	 */
	private function main_comment_style() {
		if ( isset( $this->attrs['mainContainerBgColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .commentlist .comment.depth-1",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['mainContainerBgColor'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['mainContainerMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .commentlist .comment.depth-1",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['mainContainerMargin'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['mainContainerPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .commentlist .comment.depth-1",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['mainContainerPadding'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['mainContainerBorder'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .commentlist .comment.depth-1",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['mainContainerBorder'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['mainBgColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .commentlist .comment.depth-1 > .comment-body",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['mainBgColor'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['mainMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .commentlist .comment.depth-1 > .comment-body",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['mainMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['mainPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .commentlist .comment.depth-1 > .comment-body",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['mainPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['mainBorder'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .commentlist .comment.depth-1 > .comment-body",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['mainBorder'],
					'device_control' => true,
				)
			);
		}
	}

	/**
	 * Method For Reply style
	 *
	 * @return void
	 */
	private function reply_style() {
		if ( isset( $this->attrs['replyBgColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .commentlist .comment .children",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['replyBgColor'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['replyMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .commentlist .comment .children",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['replyMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['replyPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .commentlist .comment .children",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['replyPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['replyBorder'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .commentlist .comment .children",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['replyBorder'],
					'device_control' => true,
				)
			);
		}
	}

	/**
	 * Method For Typography Heading style
	 *
	 * @return void
	 */
	private function typography_heading_style() {

		// Form Heading.
		if ( isset( $this->attrs['typographyHeading'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id}.gvnews-post-comment.guten-element .comment-respond h3.comment-reply-title",
					'value'          => $this->attrs['typographyHeading'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['colorHeading'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.gvnews-post-comment.guten-element .comment-respond h3.comment-reply-title",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['colorHeading'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['marginHeading'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.gvnews-post-comment.guten-element .comment-respond h3.comment-reply-title",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['marginHeading'],
					'device_control' => true,
				)
			);
		}

		// Comment Title.
		if ( isset( $this->attrs['typographyCommentTitle'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} .gvnews-comments .comments-title",
					'value'          => $this->attrs['typographyCommentTitle'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['colorCommentTitle'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews-comments .comments-title",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['colorCommentTitle'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['marginCommentTitle'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews-comments .comments-title",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['marginCommentTitle'],
					'device_control' => true,
				)
			);
		}

		// Comment Count.
		if ( isset( $this->attrs['commentCountTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} .gvnews-comments .comments-title .count",
					'value'          => $this->attrs['commentCountTypography'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['commentCountColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews-comments .comments-title .count",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['commentCountColor'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['commentCountBackgroundColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews-comments .comments-title .count",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['commentCountBackgroundColor'],
					'device_control' => false,
				)
			);
		}
	}

	/**
	 * Method For Typography Label style
	 *
	 * @return void
	 */
	private function typography_label_style() {

		$selector = "
			.{$this->element_id} label, 
			.{$this->element_id} .comment-form-author label, 
			.{$this->element_id} .comment-form-comment label, 
			.{$this->element_id} .comment-form-email label, 
			.{$this->element_id} .comment-form-url label
		";

		if ( isset( $this->attrs['typographyLabel'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => $selector,
					'value'          => $this->attrs['typographyLabel'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['colorLabel'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $selector,
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['colorLabel'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['colorRequired'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.gvnews-post-comment label span.required",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['colorRequired'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['marginLabel'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $selector,
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['marginLabel'],
					'device_control' => true,
				)
			);
		}
	}

	/**
	 * Method For Typography Link style
	 *
	 * @return void
	 */
	private function typography_link_style() {

		$selector = ".{$this->element_id}.gvnews-post-comment.guten-element";

		// Form Comment.
		if ( isset( $this->attrs['typographyLink'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => "{$selector} .comment-form a",
					'value'          => $this->attrs['typographyLink'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['colorLink'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "{$selector} .comment-form a",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['colorLink'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['marginLink'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "{$selector} .comment-form a",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['marginLink'],
					'device_control' => true,
				)
			);
		}

		// User.
		if ( isset( $this->attrs['userNameTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => "{$selector} .commentlist b.fn a.url",
					'value'          => $this->attrs['userNameTypography'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['userNameColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "{$selector} .commentlist b.fn a.url",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['userNameColor'],
					'device_control' => false,
				)
			);
		}

		// Date.
		if ( isset( $this->attrs['dateTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => "{$selector} .commentlist .comment-metadata a time",
					'value'          => $this->attrs['dateTypography'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['dateColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "{$selector} .commentlist .comment-metadata a time",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['dateColor'],
					'device_control' => false,
				)
			);
		}

		// Reply.
		if ( isset( $this->attrs['replyLinkTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => "{$selector} .commentlist .reply .comment-reply-link",
					'value'          => $this->attrs['replyLinkTypography'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['replyLinkColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "{$selector} .commentlist .reply .comment-reply-link",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['replyLinkColor'],
					'device_control' => false,
				)
			);
		}
	}

	/**
	 * Method For Typography Text style
	 *
	 * @return void
	 */
	private function typography_text_style() {

		// Text.
		if ( isset( $this->attrs['typographyText'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} .comment-form p",
					'value'          => $this->attrs['typographyText'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['colorText'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .comment-form p",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['colorText'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['marginText'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .comment-form p",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['marginText'],
					'device_control' => true,
				)
			);
		}

		// Comment List.
		if ( isset( $this->attrs['typographyTextCommentList'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} .commentlist .comment-content p",
					'value'          => $this->attrs['typographyTextCommentList'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['colorTextCommentList'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .commentlist .comment-content p",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['colorTextCommentList'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['marginTextCommentList'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .commentlist .comment-content p",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['marginTextCommentList'],
					'device_control' => true,
				)
			);
		}
	}

	/**
	 * Style for separator.
	 *
	 * @return void
	 */
	private function separator_stye() {
		$selector = ".{$this->element_id}.gvnews-post-comment hr.separator";

		if ( isset( $this->attrs['separatorStyle'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $selector,
					'property'       => function ( $value ) {
						return "border-top-style: {$value};";
					},
					'value'          => $this->attrs['separatorStyle'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['separatorColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $selector,
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'border-top-color' );
					},
					'value'          => $this->attrs['separatorColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['separatorWidth'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $selector,
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'width' );
					},
					'value'          => $this->attrs['separatorWidth'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['separatorHeight'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $selector,
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'border-top-width' );
					},
					'value'          => $this->attrs['separatorHeight'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['separatorMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $selector,
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['separatorMargin'],
					'device_control' => true,
				)
			);
		}
	}
}
