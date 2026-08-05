<?php
/**
 * Slider
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Style;

/**
 * Class Init
 *
 * @package Gutenverse
 */
class Slider_3 extends Slider {
    /**
	 * Generate design style.
	 */
    protected function generate_design_style() {
        parent::generate_design_style();
        
		if ( isset( $this->attrs['sliderHeight'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_wrapper, .gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_wrapper .gvnews_slide_item, .gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_wrapper .gvnews_thumb div",
					'property'       => function ( $value ) {
						return "height: {$value}px;";
					},
					'value'          => $this->attrs['sliderHeight'],
					'device_control' => true,
				)
			);
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_wrapper .gvnews_slide_item > a, .gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_wrapper .gvnews_slide_item > a .thumbnail-container",
					'property'       => function ( $value ) {
						return 'height: 100% !important; padding-bottom: 0 !important;';
					},
					'value'          => $this->attrs['sliderHeight'],
					'device_control' => true,
				)
			);
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_wrapper .gvnews_slide_item > a .thumbnail-container img",
					'property'       => function ( $value ) {
						return 'height: 100% !important; width: 100% !important; object-fit: cover !important;';
					},
					'value'          => $this->attrs['sliderHeight'],
					'device_control' => true,
				)
			);
		}
    }
}