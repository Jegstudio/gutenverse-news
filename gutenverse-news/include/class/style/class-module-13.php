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
class Module_13 extends Block {

	/**
	 * Generate style block post item style.
	 */
	public function post_item_style() {
		if ( isset( $this->attrs['rowItemGap'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews-posts-row .gvnews_postsmall , .{$this->element_id} .gvnews-posts-row, .{$this->element_id} .gvnews_posts_wrap .gvnews_posts , .{$this->element_id} .gvnews_block_container",
					'property'       => function ( $value ) {
						return "row-gap: {$value}px;";
					},
					'value'          => $this->attrs['rowItemGap'],
					'device_control' => true,
				)
			);

		}

		if ( isset( $this->attrs['columnItemGap'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_postblock_13 .gvnews-posts-row , .{$this->element_id} .gvnews_postblock_13 .gvnews_posts_wrap .gvnews_posts",
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
