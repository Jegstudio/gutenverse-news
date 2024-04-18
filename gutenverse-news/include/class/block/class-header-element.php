<?php
/**
 * Header element
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
class Header_Element extends Grab {


	/**
	 * Method get_content
	 *
	 * @return string
	 */
	public function get_content() {
		$content = '';
		if ( 'date' === $this->attributes['headerType'] ) {
			$date    = date_i18n( $this->attributes['dateFormat'] );
			$content = "
					<div class=\"gvnews_nav_item gvnews_top_date\">
						$date
					</div>";
		}

		return '<div class="gvnews_navbar">' . $content . '</div>';
	}
}
