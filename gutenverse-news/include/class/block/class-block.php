<?php
/**
 * Block
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
class Block extends Grab {


	/**
	 * Method get_content
	 *
	 * @return string
	 */
	public function get_content() {
		$headercat = '';
		$headeraut = '';
		$headertag = '';
		$inclpost  = '';
		$exclpost  = '';
		$inclcat   = '';
		$exclcat   = '';
		$incltag   = '';
		$excltag   = '';
		$inclaut   = '';
		$enbdate   = '';
		foreach ( $this->attributes['headerCategory'] as $cat ) {
			if ( '' === $headercat ) {
				$headercat = $cat['value'];
			} else {
				$headercat .= ',' . $cat['value'];
			}
		}
		foreach ( $this->attributes['headerAuthor'] as $cat ) {
			if ( '' === $headeraut ) {
				$headeraut = $cat['value'];
			} else {
				$headeraut .= ',' . $cat['value'];
			}
		}
		foreach ( $this->attributes['headerTag'] as $cat ) {
			if ( '' === $headertag ) {
				$headertag = $cat['value'];
			} else {
				$headertag .= ',' . $cat['value'];
			}
		}
		foreach ( $this->attributes['includePost'] as $cat ) {
			if ( '' === $inclpost ) {
				$inclpost = $cat['value'];
			} else {
				$inclpost .= ',' . $cat['value'];
			}
		}
		foreach ( $this->attributes['excludePost'] as $cat ) {
			if ( '' === $exclpost ) {
				$exclpost = $cat['value'];
			} else {
				$exclpost .= ',' . $cat['value'];
			}
		}
		foreach ( $this->attributes['includeCategory'] as $cat ) {
			if ( '' === $inclcat ) {
				$inclcat = $cat['value'];
			} else {
				$inclcat .= ',' . $cat['value'];
			}
		}
		foreach ( $this->attributes['excludeCategory'] as $cat ) {
			if ( '' === $exclcat ) {
				$exclcat = $cat['value'];
			} else {
				$exclcat .= ',' . $cat['value'];
			}
		}
		foreach ( $this->attributes['includeTag'] as $cat ) {
			if ( '' === $incltag ) {
				$incltag = $cat['value'];
			} else {
				$incltag .= ',' . $cat['value'];
			}
		}
		foreach ( $this->attributes['excludeTag'] as $cat ) {
			if ( '' === $excltag ) {
				$excltag = $cat['value'];
			} else {
				$excltag .= ',' . $cat['value'];
			}
		}
		if ( $this->attributes['normalImage'] ) {
			$normimage = 'true';
		} else {
			$normimage = 'false';
		}
		foreach ( $this->attributes['includeAuthor'] as $cat ) {
			if ( '' === $inclaut ) {
				$inclaut = $cat['value'];
			} else {
				$inclaut .= ',' . $cat['value'];
			}
		}
		if ( isset( $this->attributes['showDate'] ) && $this->attributes['showDate'] ) {
			$enbdate = true;
		}
		$attr      = array(
			'first_title'                  => $this->attributes['title'],
			'second_title'                 => $this->attributes['second_title'],
			'url'                          => $this->attributes['url_title'],
			'header_type'                  => $this->attributes['headerType'],
			'header_icon'                  => $this->attributes['icon'],
			'header_background'            => '',
			'header_secondary_background'  => '',
			'header_text_color'            => '',
			'header_line_color'            => '',
			'header_accent_color'          => '',
			'header_filter_category'       => $headercat,
			'header_filter_author'         => $headeraut,
			'header_filter_tag'            => $headertag,
			'header_filter_text'           => $this->attributes['headerDefault'],
			'post_type'                    => $this->attributes['postType'],
			'content_type'                 => $this->attributes['contentType'],
			'number_post'                  => $this->attributes['numberPost'],
			'post_offset'                  => $this->attributes['postOffset'],
			'unique_content'               => $this->attributes['uniqueContent'],
			'include_post'                 => $inclpost,
			'included_only'                => $this->attributes['includeOnly'],
			'exclude_post'                 => $exclpost,
			'include_category'             => $inclcat,
			'exclude_category'             => $exclcat,
			'include_author'               => $inclaut,
			'include_tag'                  => $incltag,
			'exclude_tag'                  => $excltag,
			'sort_by'                      => $this->attributes['sortBy'],
			'date_format'                  => $this->attributes['metaDateFormat'],
			'date_format_custom'           => $this->attributes['metaDateFormatCustom'],
			'excerpt_length'               => $this->attributes['excerptLength'],
			'excerpt_ellipsis'             => $this->attributes['excerptEllipsis'],
			'force_normal_image_load'      => $normimage,
			'pagination_mode'              => $this->attributes['paginationMode'],
			'pagination_nextprev_showtext' => $this->attributes['showNavText'],
			'pagination_number_post'       => $this->attributes['paginationPost'],
			'pagination_scroll_limit'      => $this->attributes['loadLimit'],
			'boxed'                        => $this->attributes['enableBoxed'],
			'boxed_shadow'                 => $this->attributes['enableBoxed'] ? $this->attributes['enableBoxShadow'] : false,
			'el_id'                        => '',
			'el_class'                     => '',
			'scheme'                       => '',
			'column_width'                 => $this->attributes['columnWidth'],
			'title_color'                  => '',
			'accent_color'                 => '',
			'alt_color'                    => '',
			'excerpt_color'                => '',
			'css'                          => '',
			'compatible_column_notice'     => '',
			'show_date'                    => $enbdate,
			'short_code'                   => $this->attributes['gvnewsModule'],
		);
		$sccontent = '';

		return $this->get_module( $attr, $sccontent );
	}
}
