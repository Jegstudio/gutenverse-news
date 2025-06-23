<?php
/**
 * Post Title
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Init
 *
 * @package Gutenverse
 */
class Post_Featured extends Style_Abstract {

	/**
	 * Block Directory
	 *
	 * @var string
	 */
	protected $block_dir = GUTENVERSE_NEWS_DIR . '/block/';

	/**
	 * Block Name
	 *
	 * @var array
	 */
	protected $name = 'post-featured-image'; // based on folder name, not block.json.

	/**
	 * Constructor
	 *
	 * @param array $attrs Attribute.
	 * @param bool  $name name.
	 *
	 * @return void
	 */
	public function __construct( $attrs, $name = false ) {
		parent::__construct( $attrs, $name );

		$this->set_feature(
			array(
				'background' => array(
					'normal' => ".guten-element.{$this->element_id} .gvnews_featured.featured_image",
					'hover'  => ".guten-element.{$this->element_id} .gvnews_featured.featured_image:hover",
				),
				'border'     => array(
					'normal' => ".guten-element.{$this->element_id} .gvnews_featured.featured_image",
					'hover'  => ".guten-element.{$this->element_id} .gvnews_featured.featured_image:hover",
				),
			)
		);
	}

	/**
	 * Generate style base on attribute.
	 */
	public function generate() {
		// comment.
	}
}
