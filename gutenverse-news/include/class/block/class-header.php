<?php
/**
 * Header
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block;

use GUTENVERSE\NEWS\Block\Grab;

/**
 * Class Init
 *
 * @package Gutenverse-News
 */
class Header extends Grab {


	/**
	 * Method get_content
	 *
	 * @return string
	 */
	public function get_content() {
		$icon      = isset( $this->attributes['icon'] ) ? $this->attributes['icon'] : '';
		$icon_type = isset( $this->attributes['iconType'] ) ? $this->attributes['iconType'] : 'icon';
		$icon_svg  = isset( $this->attributes['iconType'] ) ? $this->attributes['iconType'] : '';

		$heading_icon  = gvnews_render_icon( $icon_type, $icon, $icon_svg );
		$subtitle      = ! empty( $this->attributes['second_title'] ) ? '<strong>' . esc_attr( $this->attributes['second_title'] ) . '</strong>' : '';
		$header_class  = 'gvnews_block_' . esc_attr( $this->attributes['headerType'] );
		$heading_title = '<span>' . $heading_icon . esc_attr( $this->attributes['title'] ) . $subtitle . '</span>';
		$heading_title = ! empty( $this->attributes['url_title'] ) ? "<a href='" . esc_url( $this->attributes['url_title'] ) . "'>{$heading_title}</a>" : $heading_title;
		$heading_title = "<h3 class=\"gvnews_block_title\">{$heading_title}</h3>";

		$wrapper_classes = gvnews_build_html_classes(
			array(
				'gvnews_block_heading',
				$header_class,
				'gvnews_alignleft',
			)
		);
		// Now Render Output.
		return "<div class=\"{$wrapper_classes}\">
                {$heading_title}
            </div>";
	}
}
