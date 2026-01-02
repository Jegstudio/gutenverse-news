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
					'selector'       => ".{$this->element_id} .gvnews_postblock .gvnews_posts_masonry .gvnews_posts.shuffle .gvnews_post",
					'property'       => function ( $value ) {
						return "row-gap: {$value}px;";
					},
					'value'          => $this->attrs['rowItemGap'],
					'device_control' => true,
				)
			);

		}

		if ( isset( $this->attrs['gutterWidth'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_postblock.gvnews_col_3o3 .gvnews_posts_masonry .gvnews_posts.shuffle .gvnews_post",
					'property'       => function ( $value ) {
						return "width : calc((100% - (2 * {$value}px)) / 3);";
					},
					'value'          => $this->attrs['gutterWidth'],
					'device_control' => true,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_postblock.gvnews_col_2o3 .gvnews_posts_masonry .gvnews_posts.shuffle .gvnews_post",
					'property'       => function ( $value ) {
						return "width : calc((100% - {$value}px) / 2);";
					},
					'value'          => $this->attrs['gutterWidth'],
					'device_control' => true,
				)
			);
		}
	}
}
