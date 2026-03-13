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
	 * Build element with wrapper (override from parent)
	 *
	 * @param string $element_name  Element name.
	 * @param string $inner         Inner element.
	 * @param array  $array_classes Classes.
	 * @param array  $array_data    Data attribute.
	 * @param array  $id            Element ID.
	 *
	 * @return string
	 */
	protected function render_wrapper( $element_name, $inner, $array_classes = array(), $array_data = array(), $id = null ) {
		$classes    = '';
		$data       = '';
		$parts      = preg_split( '/[\\\\\/]/', $element_name );
		$block_type = end( $parts );

		foreach ( $array_classes as $class ) {
			$classes = $classes . ' ' . $class;
		}

		if ( isset( $this->attributes['boxed'] ) && $this->attributes['boxed'] ) {
			$classes .= ' gvnews_pb_boxed';

			if ( isset( $this->attributes['boxedShadow'] ) && $this->attributes['boxedShadow'] ) {
				$classes .= ' gvnews_pb_boxed_shadow';
			}
		}

		foreach ( $array_data as $key => $value ) {
			$data = $data . ' data-' . $key . '="' . $value . '"';
		}

		if ( $id ) {
			$id = 'id="' . $id . '"';
		}

		$classes = 'gutenverse gvnews-' . $block_type . $classes . ' ' . $this->get_element_id();
		if ( $this->is_deprecated || $this->is_pro_block ) {
			$classes .= ' gvnews-deprecated-block';
		}

		return '<div ' . $id . ' class="' . $classes . ' ' . esc_attr( $this->attributes['elClass'] ) . '" ' . $data . '>'
					. $inner . $this->render_overlay() .
				'</div>';
	}

	/**
	 * Get Content
	 *
	 * @return string
	 */
	public function get_content() {
		$name       = str_replace( 'GUTENVERSE\NEWS\Block\Archive\Archive_', 'gutenverse/news-archive-', $this->attributes['gvnewsModule'] );
		$this->name = strtolower( $name );
		$attr       = array(
			'short_code'            => $this->attributes['gvnewsModule'],
			'el_class'              => $this->attributes['elClass'],
			'disable_readmore'      => isset( $this->attributes['readmoreButtonDisabled'] ) ? $this->attributes['readmoreButtonDisabled'] : false,
			'renderedImageSizeMain' => isset( $this->attributes['renderedImageSizeMain'] ) ? $this->attributes['renderedImageSizeMain'] : 'default',
			'meta_settings'         => array(
				'show_meta'    => isset( $this->attributes['showMeta'] ) ? $this->attributes['showMeta'] : true,
				'meta_date'    => isset( $this->attributes['showMetaDate'] ) ? $this->attributes['showMetaDate'] : true,
				'meta_author'  => isset( $this->attributes['showMetaAuthor'] ) ? $this->attributes['showMetaAuthor'] : true,
				'meta_comment' => isset( $this->attributes['showMetaComment'] ) ? $this->attributes['showMetaComment'] : true,
				'meta_review'  => isset( $this->attributes['showMetaReview'] ) ? $this->attributes['showMetaReview'] : false,
			),
			'post_title_html_tag'   => isset( $this->attributes['postTitleHtmlTag'] ) ? $this->attributes['postTitleHtmlTag'] : 'h3',
			'fetch_priority_high'   => isset( $this->attributes['fetchPriorityHigh'] ) ? $this->attributes['fetchPriorityHigh'] : false,
		);

		$attr = $this->archive_title( $attr );
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
			$attr['prev_text']           = isset( $this->attributes['paginationPrevText'] ) ? $this->attributes['paginationPrevText'] : esc_html__( 'Previous', 'gutenverse-news' );
			$attr['next_text']           = isset( $this->attributes['paginationNextText'] ) ? $this->attributes['paginationNextText'] : esc_html__( 'Next', 'gutenverse-news' );
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
			if ( $this->attributes['normalImage'] ) {
				$attr['normal_image'] = 'true';
			} else {
				$attr['normal_image'] = 'false';
			}
			$attr['post_title_html_tag']      = isset( $this->attributes['postTitleHtmlTag'] ) ? $this->attributes['postTitleHtmlTag'] : 'h2';
			$attr['fetch_priority_high']      = isset( $this->attributes['fetchPriorityHigh'] ) ? $this->attributes['fetchPriorityHigh'] : false;
			$attr['show_post_format_icon']    = isset( $this->attributes['showPostFormatIcon'] ) ? $this->attributes['showPostFormatIcon'] : false;
			$attr['gallery_format_icon']      = isset( $this->attributes['galleryFormatIcon'] ) ? $this->attributes['galleryFormatIcon'] : '';
			$attr['gallery_format_icon_type'] = isset( $this->attributes['galleryFormatIconType'] ) ? $this->attributes['galleryFormatIconType'] : 'icon';
			$attr['gallery_format_icon_svg']  = isset( $this->attributes['galleryFormatIconSVG'] ) ? $this->attributes['galleryFormatIconSVG'] : '';
			$attr['video_format_icon']        = isset( $this->attributes['videoFormatIcon'] ) ? $this->attributes['videoFormatIcon'] : '';
			$attr['video_format_icon_type']   = isset( $this->attributes['videoFormatIconType'] ) ? $this->attributes['videoFormatIconType'] : 'icon';
			$attr['video_format_icon_svg']    = isset( $this->attributes['videoFormatIconSVG'] ) ? $this->attributes['videoFormatIconSVG'] : '';
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
			$attr['block_type']               = $this->attributes['blockType'];
			$attr['number_post']              = $this->attributes['numberPost'];
			$attr['excerpt_length']           = $this->attributes['excerptLength'];
			$attr['excerpt_ellipsis']         = $this->attributes['excerptEllipsis'];
			$attr['date_format']              = $this->attributes['dateFormat'];
			$attr['date_format_custom']       = $this->attributes['dateFormatCustom'];
			$attr['first_page']               = $this->attributes['firstPage'];
			$attr['column_width']             = $this->attributes['columnWidth'];
			$attr['gutter_width']             = isset( $this->attributes['gutterWidth'] ) ? $this->attributes['gutterWidth'] : 30;
			$attr['image_load']               = isset( $this->attributes['imageLoad'] ) ? $this->attributes['imageLoad'] : '';
			$attr['post_title_html_tag']      = isset( $this->attributes['postTitleHtmlTag'] ) ? $this->attributes['postTitleHtmlTag'] : 'h3';
			$attr['fetch_priority_high']      = isset( $this->attributes['fetchPriorityHigh'] ) ? $this->attributes['fetchPriorityHigh'] : false;
			$attr['show_post_format_icon']    = isset( $this->attributes['showPostFormatIcon'] ) ? $this->attributes['showPostFormatIcon'] : false;
			$attr['gallery_format_icon']      = isset( $this->attributes['galleryFormatIcon'] ) ? $this->attributes['galleryFormatIcon'] : '';
			$attr['gallery_format_icon_type'] = isset( $this->attributes['galleryFormatIconType'] ) ? $this->attributes['galleryFormatIconType'] : 'icon';
			$attr['gallery_format_icon_svg']  = isset( $this->attributes['galleryFormatIconSVG'] ) ? $this->attributes['galleryFormatIconSVG'] : '';
			$attr['video_format_icon']        = isset( $this->attributes['videoFormatIcon'] ) ? $this->attributes['videoFormatIcon'] : '';
			$attr['video_format_icon_type']   = isset( $this->attributes['videoFormatIconType'] ) ? $this->attributes['videoFormatIconType'] : 'icon';
			$attr['video_format_icon_svg']    = isset( $this->attributes['videoFormatIconSVG'] ) ? $this->attributes['videoFormatIconSVG'] : '';
		}
		return $attr;
	}

	/**
	 * Check if this block is already deprecated.
	 *
	 * @return boolean
	 */
	public function check_deprecated() {
		if ( current_user_can( 'edit_pages' ) && ( 'GUTENVERSE\NEWS\Block\Archive\Archive_Title' === $this->attributes['gvnewsModule'] || 'GUTENVERSE\NEWS\Block\Archive\Archive_Breadcrumb' === $this->attributes['gvnewsModule'] ) ) {
			return true;
		}
		return false;
	}
}
