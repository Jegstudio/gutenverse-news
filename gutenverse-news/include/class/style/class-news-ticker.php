<?php
/**
 * News Ticker
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Style;

use GUTENVERSE\NEWS\Style\StyleAbstract;

/**
 * Class Init
 *
 * @package Gutenverse
 */
class News_Ticker extends StyleAbstract {

	/**
	 * Block Name
	 *
	 * @var array
	 */
	protected $name = 'news-ticker';

	/**
	 * Constructor
	 *
	 * @param array $attrs Attribute.
	 */
	public function __construct( $attrs ) {
		parent::__construct( $attrs );

		$this->set_feature(
			array(
				'background'  => null,
				'border'      => null,
				'positioning' => null,
				'animation'   => null,
				'advance'     => null,
			)
		);
	}

	/**
	 * Generate style base on attribute.
	 */
	public function generate() {
		if ( isset( $this->attrs['titleTextColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_breakingnews_title",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['titleTextColor'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['titleBackgroundColor'] ) ) {
			$this->handle_background( ".{$this->element_id} .gvnews_breakingnews_title", $this->attrs['titleBackgroundColor'] );
		}
	}
}
