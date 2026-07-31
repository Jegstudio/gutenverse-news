<?php
/**
 * Module_24
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Style;

/**
 * Module 24 additional Styling.
 *
 * @package gutenverse-news
 */
class Module_24 extends Block {
	 /**
	 * Generate additional style.
	 */
	protected function generate_additional_style() {
		if ( isset( $this->attrs['listIconSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "
						.{$this->element_id} .gvnews_postblock_24 .gvnews_pl_xs_4 .gvnews_postblock_content > .gutenverse-icon-svg:first-child svg,
						.{$this->element_id} .gvnews_postblock_24 .gvnews_pl_xs_4 .gvnews_postblock_content > .i:first-child
					",
					'property'       => function ( $value ) {
						return "font-size: {$value}px";
					},
					'value'          => $this->attrs['listIconSize'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['listIconSpacing'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_postblock_24 .gvnews_pl_xs_4 .gvnews_postblock_content",
					'property'       => function ( $value ) {
						return "padding: 0 0 0 {$value}px;";
					},
					'value'          => $this->attrs['listIconSpacing'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['listIconAlign'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "
						.{$this->element_id} .gvnews_postblock_24 .gvnews_pl_xs_4 .gvnews_postblock_content > .gutenverse-icon-svg:first-child svg,
						.{$this->element_id} .gvnews_postblock_24 .gvnews_pl_xs_4 .gvnews_postblock_content > .i:first-child
					",
					'property'       => function ( $value ) {
						if ( 'center' === $value ) {
							return 'top: 50%; transform: translateY(-50%);';
						}
						if ( 'bottom' === $value ) {
							return 'bottom: 0;';
						}
						return 'top: 0;';
					},
					'value'          => $this->attrs['listIconAlign'],
					'device_control' => false,
				)
			);
		}
	}
	/**
	 * Generate style block post item style.
	 */
	public function post_item_style() {
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
						return "margin-top: {$value}px;";
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
