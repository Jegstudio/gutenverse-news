<?php
/**
 * Gutenverse Abstract Style
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse
 */

namespace GUTENVERSE\NEWS\Style;

use GUTENVERSE\NEWS\Style\StyleInterface;

/**
 * Class Style_Abstract
 *
 * @package Gutenverse
 */
abstract class StyleAbstract extends StyleInterface {

	/**
	 * Block Element Id
	 *
	 * @var string
	 */
	protected $element_id;

	/**
	 * Name
	 *
	 * @var array
	 */
	protected $name;

	/**
	 * Generated Style for each device.
	 *
	 * @var array
	 */
	protected $generated = array(
		'Desktop' => array(),
		'Tablet'  => array(),
		'Mobile'  => array(),
	);

	/**
	 * Block Font Families
	 *
	 * @var array
	 */
	protected $font_families;

	/**
	 * The Constructor
	 *
	 * @param array       $attrs Attribute.
	 * @param string|bool $name Name.
	 */
	public function __construct( $attrs, $name = false ) {
		$this->element_id = $attrs['elementId'];
		if ( $name ) {
			$this->set_attrs( $attrs, $name );
		} else {
			$this->set_attrs( $attrs );
		}
	}

	/**
	 * Set attributes
	 *
	 * @param array       $attrs attributes.
	 * @param bool|string $name name.
	 *
	 * @return bool|void
	 */
	protected function set_attrs( $attrs, $name = false ) {
		if ( $name ) {
			$name = str_replace( 'gutenverse/news-', '', $name );
		} elseif ( isset( $this->name ) ) {
			$name = $this->name;
		}
		if ( $name ) {
			$path = GUTENVERSE_NEWS_DIR . "block/{$name}/block.json";
			if ( ! file_exists( $path ) ) {
				return;
			}

			$block_json = gutenverse_get_json( $path );

			if ( isset( $block_json['attributes'] ) ) {
				foreach ( $block_json['attributes'] as $key => $value ) {
					if ( isset( $attrs[ $key ] ) ) {
						$this->attrs[ $key ] = $attrs[ $key ];
					} elseif ( isset( $value['default'] ) ) {
						$this->attrs[ $key ] = $value['default'];
					}
				}
			}
		}
	}

	/**
	 * Get Name.
	 *
	 * @return string
	 */
	public function get_name() {
		return $this->name;
	}
}
