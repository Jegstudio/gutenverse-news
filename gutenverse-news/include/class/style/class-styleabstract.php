<?php
/**
 * Gutenverse Abstract Style
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse
 */

namespace GUTENVERSE\NEWS\Style;

use Gutenverse\Framework\Style_Interface;

/**
 * Class Style_Abstract
 *
 * @package Gutenverse
 */
abstract class StyleAbstract extends Style_Interface {

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
			preg_match( '/^block|hero/', $name, $matches );

			if ( ! empty( $matches ) && in_array( $matches[0], array( 'block', 'hero' ) ) ) {
				$name = preg_replace( '/-(\d)$/', '-0$1', $name );
			}

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
	 * Overide the Inject Control Style method from core
	 *
	 * @param array $data Control.
	 */
	public function inject_style( $data ) {
		if ( isset( $data['device_control'] ) && $data['device_control'] && ! $this->is_variable( $data['value'] ) && is_array( $data['value'] ) ) {

			$devices = $this->get_all_device();
			foreach ( $devices as $device ) {
				if ( isset( $data['skip_device'] ) && in_array( $device, $data['skip_device'], true ) ) {
					continue;
				}

				if ( ! gutenverse_truly_empty( $data['value'][ $device ] ) || ( isset( $data['ignore_empty'] ) && $data['ignore_empty'] ) ) {
					$value    = $this->sanitize_value( $data['value'][ $device ] );
					$selector = $data['selector'];
					$property = call_user_func( $data['property'], $value, $device );

					if ( empty( $property ) ) {
						continue;
					}

					if ( ! isset( $this->generated[ $device ][ $selector ] ) ) {
						$this->generated[ $device ][ $selector ] = array();
					}

					$this->generated[ $device ][ $selector ][] = $property;
				}
			}
		} elseif ( isset( $data['value'] ) && isset( $data['property'] ) ) {
			$selector = $data['selector'];
			$value    = $this->sanitize_value( $data['value'] );
			if ( isset( $data['custom'] ) && ! empty( $data['custom'] ) ) {
				$media                                    = $data['custom'];
				$this->generated[ $media ][ $selector ][] = $value;
			} else {
				$property                                  = call_user_func( $data['property'], $value );
				$this->generated['Desktop'][ $selector ][] = $property;
			}
		}
	}

	/**
	 * Override the renderer style method from core.
	 */
	public function render_style() {
		$generated_style = array();

		foreach ( $this->generated as $device => $css ) {
			$device_style = array();

			foreach ( $css as $selector => $property ) {
				$property_string = join( ' ', $property );
				if ( ! empty( $property_string ) ) {
					$device_style[] = "{$selector} { {$property_string} }";
				}
			}

			$generated_device_style = join( ' ', $device_style );

			if ( ! empty( $generated_device_style ) ) {
				if ( 'Desktop' === $device ) {
					$generated_style[] = $generated_device_style;
				} elseif ( 'Tablet' === $device ) {
					$generated_style[] = '@media only screen and (max-width: ' . gutenverse_breakpoint( 'Tablet' ) . 'px) { ' . $generated_device_style . ' }';
				} elseif ( 'Mobile' === $device ) {
					$generated_style[] = '@media only screen and (max-width: ' . gutenverse_breakpoint( 'Mobile' ) . 'px) { ' . $generated_device_style . ' }';
				} else {
					$generated_style[] = "{$device} { {$generated_device_style} }";
				}
			}
		}

		$generated_style = array_merge( $generated_style, $this->get_additional_style() );
		return join( ' ', $generated_style );
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
