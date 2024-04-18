<?php
/**
 * About widget
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
class About_Widget extends Grab {


	/**
	 * Method get_content
	 *
	 * @return String
	 */
	public function get_content() {
		$attributes = apply_filters( 'gvnews_about_block_attributes', $this->attributes );

		$aboutdesc = $attributes['aboutDesc'];
		if ( isset( $attributes['aboutImg'] ) ) {
			$aboutimg = wp_get_attachment_image_src( $attributes['aboutImg']['id'], 'full' );
			$aboutimg = isset( $aboutimg[0] ) ? $aboutimg[0] : '';
		} else {
			$aboutimg = get_parent_theme_file_uri( 'assets/img/logo.png' );
		}

		if ( isset( $attributes['aboutImgRetina'] ) ) {
			$aboutimgretina = wp_get_attachment_image_src( $attributes['aboutImgRetina']['id'], 'full' );
			$aboutimgretina = isset( $aboutimgretina[0] ) ? $aboutimgretina[0] : '';
		} else {
			$aboutimgretina = get_parent_theme_file_uri( 'assets/img/logo@2x.png' );
		}

		if ( isset( $attributes['aboutImgDarkMode'] ) && ! empty( $attributes['aboutImgDarkMode'] ) ) {
			$aboutimgdarkmode = wp_get_attachment_image_src( $attributes['aboutImgDarkMode']['id'], 'full' );
			$aboutimgdarkmode = isset( $aboutimgdarkmode[0] ) ? $aboutimgdarkmode[0] : '';
		} else {
			$aboutimgdarkmode = get_parent_theme_file_uri( 'assets/img/logo_darkmode.png' );
		}

		if ( isset( $attributes['aboutImgDarkModeRetina'] ) && ! empty( $attributes['aboutImgDarkModeRetina'] ) ) {
			$aboutimgdarkmoderetina = wp_get_attachment_image_src( $attributes['aboutImgDarkModeRetina']['id'], 'full' );
			$aboutimgdarkmoderetina = isset( $aboutimgdarkmoderetina[0] ) ? $aboutimgdarkmoderetina[0] : '';
		} else {
			$aboutimgdarkmoderetina = get_parent_theme_file_uri( 'assets/img/logo_darkmode@2x.png' );
		}

		if ( isset( $attributes['signature'] ) ) {
			$signature = wp_get_attachment_image_src( $attributes['signature']['id'], 'full' );
			if ( null !== $signature && false !== $signature ) {
				$signature = isset( $signature[0] ) ? $signature[0] : '';
			} else {
				$signature = '';
			}
		} else {
			$signature = '';
		}

		if ( isset( $attributes['signatureRetina'] ) ) {
			$signatureretina = wp_get_attachment_image_src( $attributes['signatureRetina']['id'], 'full' );
			if ( null !== $signatureretina && false !== $signatureretina ) {
				$signatureretina = isset( $signatureretina[0] ) ? $signatureretina[0] : '';
			} else {
				$signatureretina = '';
			}
		} else {
			$signatureretina = '';
		}

		$aboutname       = isset( $attributes['aboutName'] ) ? $attributes['aboutName'] : '';
		$aboutoccupation = isset( $attributes['aboutOccupation'] ) ? $attributes['aboutOccupation'] : '';
		$aboutdesc       = isset( $attributes['aboutDesc'] ) ? $attributes['aboutDesc'] : '';
		$align           = isset( $attributes['align'] ) && $attributes['align'] ? 'gvnews_aligncenter' : '';

		$srcset          = '';
		$src             = 'data-src="' . esc_url( $aboutimg ) . '" ';
		$datasrclight    = 'data-light-src="' . esc_url( $aboutimg ) . '" ';
		$datasrcsetlight = 'data-light-srcset="' . esc_url( $aboutimg ) . ' 1x, ' . esc_url( $aboutimgretina ) . ' 2x" ';
		if ( ! empty( $aboutimgretina ) ) {
			$srcset = 'data-srcset="' . esc_url( $aboutimg ) . ' 1x, ' . esc_url( $aboutimgretina ) . ' 2x"';
		}

		$src    = 'data-src="' . apply_filters( 'gvnews_about_block_data_src', esc_url( $aboutimgdarkmode ) . '" ' );
		$srcset = 'data-srcset="' . apply_filters( 'gvnews_about_block_data_srcset', esc_url( $aboutimgdarkmode ) . ' 1x, ' . esc_url( $aboutimgdarkmoderetina ) . ' 2x"' );

		$footer_logo = ! empty( $aboutimg ) && ! empty( $aboutimgretina ) ? '<a class="footer_logo" href="' . esc_url( home_url_multilang( '/' ) ) . '">
			<img class="lazyload"
					src="' . gvnews_default_empty_image( '' ) . '" ' . gvnews_sanitize_output( $src ) . ' ' . gvnews_sanitize_output( $srcset ) .
		' alt="' . get_bloginfo( 'name' ) . '" ' . gvnews_sanitize_output( $datasrclight ) . ' ' . apply_filters( 'gvnews_about_block_data_img_alt', gvnews_sanitize_output( $datasrcsetlight ) ) .
		'data-pin-no-hover="true"/>
			</a>' : '';

		$about_name = ! empty( $aboutname ) ? '<h2 class="gvnews_about_name">' . wp_kses( $aboutname, wp_kses_allowed_html() ) . '</h2>' : '';

		$about_occupation = ! empty( $aboutoccupation ) ? '<p class="gvnews_about_title">' . wp_kses( $aboutoccupation, wp_kses_allowed_html() ) . '</p><p>' . str_replace( PHP_EOL, '<br>', do_shortcode( $aboutdesc ) ) . '</p>' : '';

		$signature_element = ! empty( $signature ) || ! empty( $signatureretina ) ? '<div class="gvnews_about_autograph"><img class="lazyload" data-src="' . esc_url( $signature ) . '" data-srcset=" ' . esc_url( $signature ) . '1x, ' . esc_url( $signatureretina ) . ' 2x" alt="' . esc_attr( $aboutname ) . '"></div>' : '';

		return '<div class="gvnews_about ' . $align . '">' . $footer_logo . $about_name . $about_occupation . $signature_element . '</div>';
	}
}
