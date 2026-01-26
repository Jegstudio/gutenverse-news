<?php
/**
 * Module 7
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Style;

/**
 * Module 7 additional Styling.
 *
 * @package gutenverse-news
 */
class Module_7 extends Block {

	/**
	 * Generate style block post item style.
	 */
	protected function generate_card_style() {
		if ( isset( $this->attrs['cardPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_postblock .gvnews_pl_lg_6",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['cardPadding'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['cardUseBorder'] ) && $this->attrs['cardUseBorder'] ) {
			if ( isset( $this->attrs['cardBorder'] ) ) {
				$this->handle_border( 'cardBorder', ".{$this->element_id} .gvnews_postblock .gvnews_pl_lg_6" );
			}
			if ( isset( $this->attrs['cardBorderResponsive'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .gvnews_postblock .gvnews_pl_lg_6",
						'property'       => function ( $value ) {
							return $this->handle_border_responsive( $value );
						},
						'value'          => $this->attrs['cardBorderResponsive'],
						'device_control' => true,
						'skip_device'    => array(
							'Desktop',
						),
					)
				);
			}
		} else {
			if ( isset( $this->attrs['cardLineColor'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .gvnews_postblock .gvnews_pl_lg_6:not(:last-of-type)",
						'property'       => function ( $value ) {
							return $this->handle_color( $value, 'border-color' );
						},
						'value'          => $this->attrs['cardLineColor'],
						'device_control' => false,
					)
				);
			}

			if ( isset( $this->attrs['cardLineThick'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .gvnews_postblock .gvnews_pl_lg_6:not(:last-of-type)",
						'property'       => function ( $value ) {
							return "border-width: {$value}px;";
						},
						'value'          => $this->attrs['cardLineThick'],
						'device_control' => true,
					)
				);
			}
		}
	}
}
