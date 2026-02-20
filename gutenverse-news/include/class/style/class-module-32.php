<?php
/**
 * Module 32
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Style;

/**
 * Module 32 additional Styling.
 *
 * @package gutenverse-news
 */
class Module_32 extends Block {

	/**
	 * Generate style block post item style.
	 */
	public function post_item_style() {
		if ( isset( $this->attrs['rowItemGap'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_postblock .gvnews_posts_masonry .gvnews_posts.shuffle .gvnews_post:not(:last-of-type)",
					'property'       => function ( $value ) {
						return "margin-bottom: {$value}px;";
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

		if ( isset( $this->attrs['gutterWidth'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}",
					'property'       => function ( $value ) {
						return "--gvnews-gutter-width: {$value}px;";
					},
					'value'          => $this->attrs['gutterWidth'],
					'device_control' => true,
				)
			);
		}
	}
}
