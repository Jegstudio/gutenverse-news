<?php
/**
 * Hero
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
class Hero extends Grab {


	/**
	 * Method get_content
	 *
	 * @return string
	 */
	public function get_content() {
		$options = array(
			'post_type'                => $this->attributes['postType'],
			'content_type'             => $this->attributes['contentType'],
			'number_post'              => $this->attributes['numberPost'],
			'post_offset'              => $this->attributes['postOffset'],
			'unique_content'           => $this->attributes['uniqueContent'],
			'included_only'            => $this->attributes['includeOnly'],
			'sort_by'                  => $this->attributes['sortBy'],
			'date_format'              => $this->attributes['metaDateFormat'],
			'date_format_custom'       => $this->attributes['metaDateFormatCustom'],
			'excerpt_length'           => $this->attributes['excerptLength'],
			'excerpt_ellipsis'         => $this->attributes['excerptEllipsis'],
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
			'hero_margin'              => $this->attributes['heroMargin'],
			'hero_style'               => 'gvnews_hero_style_' . $this->attributes['heroStyle'],
			'hero_height_desktop'      => $this->attributes['heightDesktop'],
			'hero_height_1024'         => $this->attributes['height1024'],
			'hero_height_768'          => $this->attributes['height768'],
			'hero_height_667'          => $this->attributes['height667'],
			'hero_height_568'          => $this->attributes['height568'],
			'hero_height_480'          => $this->attributes['height480'],
			'hero_slider_enable'       => $this->attributes['enableslider'],
			'hero_slider_item'         => $this->attributes['sliderItem'],
			'hero_slider_delay'        => $this->attributes['autoplayDelay'],
			'hero_slider_auto_play'    => $this->attributes['autoplay'],
			'short_code'               => $this->attributes['gvnewsModule'],
		);

		foreach ( $this->attributes['includePost'] as $item ) {
			if ( '' === $options['include_post'] ) {
				$options['include_post'] = $item['value'];
			} else {
				$options['include_post'] .= ',' . $item['value'];
			}
		}

		foreach ( $this->attributes['excludePost'] as $item ) {
			if ( '' === $options['exclude_post'] ) {
				$options['exclude_post'] = $item['value'];
			} else {
				$options['exclude_post'] .= ',' . $item['value'];
			}
		}

		foreach ( $this->attributes['includeCategory'] as $item ) {
			if ( '' === $options['include_category'] ) {
				$options['include_category'] = $item['value'];
			} else {
				$options['include_category'] .= ',' . $item['value'];
			}
		}

		foreach ( $this->attributes['excludeCategory'] as $item ) {
			if ( '' === $options['exclude_category'] ) {
				$options['exclude_category'] = $item['value'];
			} else {
				$options['exclude_category'] .= ',' . $item['value'];
			}
		}
		foreach ( $this->attributes['includeTag'] as $item ) {
			if ( '' === $options['include_tag'] ) {
				$options['include_tag'] = $item['value'];
			} else {
				$options['include_tag'] .= ',' . $item['value'];
			}
		}
		foreach ( $this->attributes['excludeTag'] as $item ) {
			if ( '' === $options['exclude_tag'] ) {
				$options['exclude_tag'] = $item['value'];
			} else {
				$options['exclude_tag'] .= ',' . $item['value'];
			}
		}
		if ( $this->attributes['normalImage'] ) {
			$options['normal_image'] = 'true';
		} else {
			$options['normal_image'] = 'false';
		}
		foreach ( $this->attributes['includeAuthor'] as $item ) {
			if ( '' === $options['include_author'] ) {
				$options['include_author'] = $item['value'];
			} else {
				$options['include_author'] .= ',' . $item['value'];
			}
		}
		foreach ( $this->attributes['heroItemOverlay'] as $index => $item ) {
			$number                                        = $index + 1;
			$options[ 'hero_item_' . $number . '_enable' ] = $item['overlayEnable'];
		}
		return $this->get_module( $options );
	}
}
