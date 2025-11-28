<?php
/**
 * Archive Hero
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Style;

use GUTENVERSE\NEWS\Style\StyleAbstract;

/**
 * Class Archive Pagination Style
 *
 * @package Gutenverse
 */
class Archive_Pagination extends StyleAbstract {


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
					'normal' => ".gvnews-block.gvnews-block-wrapper.gvnews-block.gvnews-block-wrapper.{$this->element_id}",
					'hover'  => ".gvnews-block.gvnews-block-wrapper.gvnews-block.gvnews-block-wrapper.{$this->element_id}:hover",
				),
				'border'      => array(
					'normal' => ".gvnews-block.gvnews-block-wrapper.{$this->element_id}.gvnews-block.gvnews-block-wrapper",
					'hover'  => ".gvnews-block.gvnews-block-wrapper.{$this->element_id}.gvnews-block.gvnews-block-wrapper:hover",
				),
				'advance'     => ".gvnews-block.gvnews-block-wrapper.{$this->element_id}.gvnews-block.gvnews-block-wrapper",
				'positioning' => ".gvnews-block.gvnews-block-wrapper.{$this->element_id}.gvnews-block.gvnews-block-wrapper",
				'animation'   => ".gvnews-block.gvnews-block-wrapper.{$this->element_id}.gvnews-block.gvnews-block-wrapper",
			)
		);
	}



	/**
	 * Generate style base on attribute.
	 */
	public function generate() {
		if ( isset( $this->attrs['paginationTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.gvnews-block.gvnews-block-wrapper.{$this->element_id}  .gvnews_pagination *",
					'property'       => function ( $value ) {
					},
					'value'          => $this->attrs['paginationTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['paginationColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_pagination a:not(.active)",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['paginationColor'],
					'device_control' => false,
				)
			);
		}


	}
}
