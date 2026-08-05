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
class Slider_9 extends Slider {
    /**
	 * Generate design style.
	 */
    protected function generate_design_style() {
        parent::generate_design_style();
        
		if ( isset( $this->attrs['sliderHeight'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_wrapper, .gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_wrapper .gvnews_slide_item, .gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_wrapper .gvnews_slide_wrapper, .gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_slider_wrapper .gvnews_slider_type_9_thumb",
					'property'       => function ( $value ) {
						return "height: {$value}px;";
					},
					'value'          => $this->attrs['sliderHeight'],
					'device_control' => true,
				)
			);
		}
    }
}