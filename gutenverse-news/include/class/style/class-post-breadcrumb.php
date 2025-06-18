<?php
/**
 * Hero
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
class Post_Breadcrumb extends StyleAbstract {


	/**
	 * Constructor
	 *
	 * @param array  $attrs Attribute.
	 * @param string $name Name.
	 */
	public function __construct( $attrs, $name = false ) {
		parent::__construct( $attrs, $name );

		$this->set_feature(
			array(
				'background' => array(
					'normal' => ".gvnews-block-wrapper.{$this->element_id}",
					'hover'  => ".gvnews-block-wrapper.{$this->element_id}:hover",
				),
				'border'     => array(
					'normal' => ".gvnews-block-wrapper.{$this->element_id}",
					'hover'  => ".gvnews-block-wrapper.{$this->element_id}:hover",
				),
				'advance'    => ".gvnews-block-wrapper.{$this->element_id}",

			)
		);
	}

	/**
	 * Generate style base on attribute.
	 */
	public function generate() {
	}
}
