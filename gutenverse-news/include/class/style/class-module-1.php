<?php
/**
 * Module 1
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Style;

/**
 * Module 1 additional Styling.
 *
 * @package gutenverse-news
 */
class Module_1 extends Block {
    /**
	 * Generate additional style.
	 */
	protected function generate_additional_style() {
		if ( isset( $this->attrs['listIconSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "
						.{$this->element_id} .gvnews_postblock_1 .gvnews_pl_xs_2 > .gutenverse-icon-svg:first-child svg,
						.{$this->element_id} .gvnews_postblock_1 .gvnews_pl_xs_2 > i:first-child
					",
					'property'       => function ( $value ) {
						return "font-size: {$value}px";
					},
					'value'          => $this->attrs['listIconSize'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['listIconSpacing'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_postblock_1 .gvnews_pl_xs_2",
					'property'       => function ( $value ) {
						return "padding-left: {$value}px;";
					},
					'value'          => $this->attrs['listIconSpacing'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['listIconAlign'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "
						.{$this->element_id} .gvnews_postblock_1 .gvnews_pl_xs_2 > .gutenverse-icon-svg:first-child svg,
						.{$this->element_id} .gvnews_postblock_1 .gvnews_pl_xs_2 > i:first-child
					",
					'property'       => function ( $value ) {
						if ( 'center' === $value ) {
							return 'top: 50%; transform: translateY(-50%);';
						}
						if ( 'bottom' === $value ) {
							return 'bottom: 0;';
						}
						return 'top: 0;';
					},
					'value'          => $this->attrs['listIconAlign'],
					'device_control' => false,
				)
			);
		}
	}
}
