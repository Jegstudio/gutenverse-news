<?php
/**
 * Caorusel
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
class Carousel extends Grab {


	/**
	 * Method get_content
	 *
	 * @return string
	 */
	public function get_content() {
		$inclpost = '';
		$exclpost = '';
		$inclcat  = '';
		$exclcat  = '';
		$incltag  = '';
		$excltag  = '';
		$inclaut  = '';
		$enbdate  = '';
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
		if ( '' === $this->attributes['gvnewsModule'] ) {
			return false;
		}
		$attr = array(
			'post_type'                => $this->attributes['postType'],
			'content_type'             => $this->attributes['contentType'],
			'number_post'              => $this->attributes['numberPost'],
			'post_offset'              => $this->attributes['postOffset'],
			'unique_content'           => $this->attributes['uniqueContent'],
			'include_post'             => $inclpost,
			'included_only'            => $this->attributes['includeOnly'],
			'exclude_post'             => $exclpost,
			'include_category'         => $inclcat,
			'exclude_category'         => $exclcat,
			'include_author'           => $inclaut,
			'include_tag'              => $incltag,
			'exclude_tag'              => $excltag,
			'sort_by'                  => $this->attributes['sortBy'],
			'date_format'              => $this->attributes['metaDateFormat'],
			'date_format_custom'       => $this->attributes['metaDateFormatCustom'],
			'excerpt_length'           => $this->attributes['excerptLength'],
			'excerpt_ellipsis'         => $this->attributes['excerptEllipsis'],
			'force_normal_image_load'  => $normimage,
			'el_id'                    => '',
			'el_class'                 => '',
			'scheme'                   => '',
			'column_width'             => $this->attributes['columnWidth'],
			'title_color'              => '',
			'accent_color'             => '',
			'alt_color'                => '',
			'excerpt_color'            => '',
			'css'                      => '',
			'compatible_column_notice' => '',
			'show_date'                => $enbdate,
			'show_nav'                 => isset( $this->attributes['showNav'] ) ? $this->attributes['showNav'] : '',
			'margin'                   => isset( $this->attributes['iMargin'] ) ? $this->attributes['iMargin'] : '',
			'number_item'              => isset( $this->attributes['ncolumn'] ) ? $this->attributes['ncolumn'] : '',
			'enable_autoplay'          => isset( $this->attributes['autoplay'] ) ? $this->attributes['autoplay'] : '',
			'autoplay_delay'           => isset( $this->attributes['autoplayDelay'] ) ? $this->attributes['autoplayDelay'] : '',
			'short_code'               => $this->attributes['gvnewsModule'],
		);

		$content = $this->get_module( $attr );

		return $content;
	}
}
