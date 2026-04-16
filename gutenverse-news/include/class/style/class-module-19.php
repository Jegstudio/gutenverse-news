<?php
/**
 * Module 13
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Style;

/**
 * Module 13 additional Styling.
 *
 * @package gutenverse-news
 */
class Module_19 extends Block {

	/**
	 * Generate style block post item style.
	 */
	public function post_item_style() {
		if ( isset( $this->attrs['boxMetaColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .gvnews_pl_md_box .gvnews_post_meta, .gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .gvnews_pl_md_box .gvnews_post_meta .by",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['boxMetaColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['boxMetaColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .gvnews_pl_md_box .gvnews_post_meta>div:not(.gvnews_meta_author) a:hover, .gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .gvnews_pl_md_box .gvnews_post_meta>div:not(.gvnews_meta_author) .by",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['boxMetaColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['boxMetaIconColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .gvnews_pl_md_box .gvnews_post_meta svg",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['boxMetaIconColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['boxMetaIconColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .gvnews_pl_md_box .gvnews_post_meta>div:hover svg",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['boxMetaIconColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['metaColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_postblock .gvnews_pl_sm .gvnews_post_meta, .gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .gvnews_pl_sm .gvnews_post_meta .by",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['metaColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['metaColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_postblock .gvnews_pl_sm .gvnews_post_meta>div:not(.gvnews_meta_author) a:hover, .gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .gvnews_post_meta>div:not(.gvnews_meta_author) a:hover",
					// .${elementId} .gvnews_postblock .gvnews_pl_sm .gvnews_post_meta>div:not(.gvnews_meta_author) a:hover
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['metaColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['mainAdditionalGap'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_posts .gvnews_pl_md_box",
					'property'       => function ( $value ) {
							return "margin-bottom: {$value}px;";
					},
					'value'          => $this->attrs['mainAdditionalGap'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['rowItemGap'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .gvnews_posts , .{$this->element_id} .gvnews_postblock .gvnews_postsmall",
					'property'       => function ( $value ) {
						return "row-gap: {$value}px;";
					},
					'value'          => $this->attrs['rowItemGap'],
					'device_control' => true,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_postblock .gvnews_block_navigation",
					'property'       => function ( $value ) {
						return "margin: {$value}px 0;";
					},
					'value'          => $this->attrs['rowItemGap'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['columnItemGap'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_postblock .gvnews_posts",
					'property'       => function ( $value ) {
						return "column-gap: {$value}px;";
					},
					'value'          => $this->attrs['columnItemGap'],
					'device_control' => true,
				)
			);
		}
	}
}
