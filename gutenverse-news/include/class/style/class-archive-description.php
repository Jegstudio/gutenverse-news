<?php
/**
 * Archive Description
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Style;

use GUTENVERSE\NEWS\Style\StyleAbstract;

/**
 * Class Archive Description Style
 *
 * @package Gutenverse
 */
class Archive_Description extends StyleAbstract {


	/**
	 * Block Name
	 *
	 * @var string
	 */
	protected $name;


	/**
	 * Method __construct
	 *
	 * @param array   $attrs attribute.
	 * @param boolean $name  name.
	 *
	 * @return void
	 */
	public function __construct( $attrs, $name = false ) {
		$this->name = $name;
		parent::__construct( $attrs, $name );

		$this->set_feature(
			array(
				'background'  => array(
					'normal' => ".{$this->element_id}.gvnews-archive-desc .archive-desc",
					'hover'  => ".{$this->element_id}.gvnews-archive-desc .archive-desc:hover",
				),
				'border'      => array(
					'normal' => ".{$this->element_id}.gvnews-archive-desc .archive-desc",
					'hover'  => ".{$this->element_id}.gvnews-archive-desc .archive-desc:hover",
				),
				'advance'     => ".{$this->element_id}.gvnews-archive-desc .archive-desc",
				'positioning' => ".{$this->element_id}.gvnews-block.gvnews-block-wrapper",
				'animation'   => ".{$this->element_id}.gvnews-archive-desc .archive-desc",
			)
		);
	}



	/**
	 * Generate style base on attribute.
	 */
	public function generate() {
		if ( isset( $this->attrs['descTypography'] ) ) {
				$this->inject_typography(
					array(
						'selector'       => ".{$this->element_id}.gvnews-archive-desc .archive-desc",
						'property'       => function ( $value ) {},
						'value'          => $this->attrs['descTypography'],
						'device_control' => false,
					)
				);
			}

			if ( isset( $this->attrs['textColor'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.gvnews-archive-desc .archive-desc",
						'property'       => function ( $value ) {
							return $this->handle_color( $value, 'color' );
						},
						'value'          => $this->attrs['textColor'],
						'device_control' => false,
					)
				);
			}

			if ( isset( $this->attrs['textAlign'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.gvnews-archive-desc .archive-desc",
						'property'       => function ( $value ) {
							return "text-align: {$value};";
						},
						'value'          => $this->attrs['textAlign'],
						'device_control' => true,
					)
				);
		}
	}
}
