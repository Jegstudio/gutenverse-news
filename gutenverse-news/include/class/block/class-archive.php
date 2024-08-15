<?php
/**
 * Archive
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use GUTENVERSE\NEWS\Block\Grab;


/**
 * Archive
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Archive extends Grab {


	/**
	 * Block Name
	 *
	 * @var string
	 */
	protected $name;

	/**
	 * Get Content
	 *
	 * @return string
	 */
	public function get_content() {
		$name       = str_replace( 'GUTENVERSE\NEWS\Block\Archive\Archive_', 'gutenverse/news-archive-', $this->attributes['gvnewsModule'] );
		$this->name = strtolower( $name );
		$attr       = array(
			'short_code' => $this->attributes['gvnewsModule'],
			'scheme'     => $this->attributes['scheme'],
			'el_class'   => $this->attributes['elClass'],
		);

		$attr = $this->archive_title( $attr );
		$attr = $this->archive_breadcrumb( $attr );
		$attr = $this->archive_pagination( $attr );
		$attr = $this->archive_description( $attr );
		$attr = $this->archive_hero( $attr );
		$attr = $this->archive_block( $attr );

		$content = $this->get_module( $attr );

		return $content;
	}

	/**
	 * Archive Title Handler
	 *
	 * @param array $attr Attribute Element.
	 *
	 * @return array
	 */
	private function archive_title( $attr ) {
		if ( 'gutenverse/news-archive-title' === $this->name ) {
			$attr['title'] = $this->attributes['title'];
		}
		return $attr;
	}
	/**
	 * Archive Breadcrumb Handler
	 *
	 * @param array $attr Attribute Element.
	 *
	 * @return array
	 */
	private function archive_breadcrumb( $attr ) {
		if ( 'gutenverse/news-archive-breadcrumb' === $this->name ) {
			$attr['scheme'] = $this->attributes['scheme'];
		}
		return $attr;
	}
	/**
	 * Archive Pagination Handler
	 *
	 * @param array $attr Attribute Element.
	 *
	 * @return array
	 */
	private function archive_pagination( $attr ) {
		if ( 'gutenverse/news-archive-pagination' === $this->name ) {
			$attr['pagination_mode']     = $this->attributes['paginationMode'];
			$attr['pagination_align']    = $this->attributes['paginationAlign'];
			$attr['pagination_navtext']  = $this->attributes['paginationNavtext'];
			$attr['pagination_pageinfo'] = $this->attributes['paginationPageinfo'];
		}
		return $attr;
	}
	/**
	 * Archive Description Handler
	 *
	 * @param array $attr Attribute Element.
	 *
	 * @return array
	 */
	private function archive_description( $attr ) {
		if ( 'gutenverse/news-archive-desc' === $this->name ) {
			$attr = $attr;
		}
		return $attr;
	}
	/**
	 * Archive Hero Handler
	 *
	 * @param array $attr Attribute Element.
	 *
	 * @return array
	 */
	private function archive_hero( $attr ) {
		if ( 'gutenverse/news-archive-hero' === $this->name ) {
			$attr['hero_type']           = $this->attributes['heroType'];
			$attr['hero_style']          = 'gvnews_hero_style_' . $this->attributes['heroStyle'];
			$attr['hero_margin']         = $this->attributes['heroMargin'];
			$attr['date_format']         = $this->attributes['dateFormat'];
			$attr['date_format_custom']  = $this->attributes['dateFormatCustom'];
			$attr['first_page']          = $this->attributes['firstPage'];
			$attr['hero_height_desktop'] = $this->attributes['heroHeightDesktop'];
			$attr['hero_height_1024']    = $this->attributes['heroHeight1024'];
			$attr['hero_height_768']     = $this->attributes['heroHeight768'];
			$attr['hero_height_667']     = $this->attributes['heroHeight667'];
			$attr['hero_height_568']     = $this->attributes['heroHeight568'];
			$attr['hero_height_480']     = $this->attributes['heroHeight480'];
			$attr['scheme']              = $this->attributes['scheme'];
			$attr['column_width']        = $this->attributes['columnWidth'];
			$hero_type                   = array( 1, 2, 3, 4, 5, 6, 7 );
			foreach ( $hero_type as $value ) {
				$attr[ "hero_item_{$value}_enable" ] = $this->attributes[ "heroItem{$value}Enable" ];
				if ( isset( $this->attributes[ "heroItem{$value}Enable" ] ) && $this->attributes[ "heroItem{$value}Enable" ] ) {
					if ( isset( $this->attributes[ "heroItem{$value}Background" ] ) ) {
						$background = $this->attributes[ "heroItem{$value}Background" ];
						if ( ! is_null( $background ) ) {
							$attr[ "hero_item_{$value}_enable" ] = $this->attributes[ "heroItem{$value}Enable" ];
							if ( isset( $background['gradientAngle'] ) ) {
									$attr[ "hero_item_{$value}_degree" ] = $background['gradientAngle'];
							} else {
								$attr[ "hero_item_{$value}_degree" ] = '0';
							}
							if ( isset( $background['gradientColor'] ) && ! is_null( $background['gradientColor'] ) ) {
								$attr[ "hero_item_{$value}_start_color" ] = reset( $background['gradientColor'] )['color'];
								$attr[ "hero_item_{$value}_end_color" ]   = end( $background['gradientColor'] )['color'];
							} else {
								$attr[ "hero_item_{$value}_start_color" ] = 'rgba(255,255,255,0.5)';
								$attr[ "hero_item_{$value}_end_color" ]   = 'rgba(0,0,0,0.5)';
							}
						}
					}
				}
			}
		}
		return $attr;
	}
	/**
	 * Archive Block Handler
	 *
	 * @param array $attr Attribute Element.
	 *
	 * @return array
	 */
	private function archive_block( $attr ) {
		if ( 'gutenverse/news-archive-block' === $this->name ) {
			$attr['block_type']         = $this->attributes['blockType'];
			$attr['number_post']        = $this->attributes['numberPost'];
			$attr['excerpt_length']     = $this->attributes['excerptLength'];
			$attr['excerpt_ellipsis']   = $this->attributes['excerptEllipsis'];
			$attr['date_format']        = $this->attributes['dateFormat'];
			$attr['date_format_custom'] = $this->attributes['dateFormatCustom'];
			$attr['first_page']         = $this->attributes['firstPage'];
			$attr['column_width']       = $this->attributes['columnWidth'];
		}
		return $attr;
	}
}
