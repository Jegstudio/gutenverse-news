<?php
/**
 * Archives
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
class Archive extends StyleAbstract {


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
					'normal' => ".gvnews-block.gvnews-block-wrapper.{$this->element_id}",
					'hover'  => ".gvnews-block.gvnews-block-wrapper.{$this->element_id}:hover",
				),
				'border'      => array(
					'normal' => ".{$this->element_id}.gvnews-block.gvnews-block-wrapper",
					'hover'  => ".{$this->element_id}.gvnews-block.gvnews-block-wrapper:hover",
				),
				'advance'     => ".{$this->element_id}.gvnews-block.gvnews-block-wrapper",
				'positioning' => ".{$this->element_id}.gvnews-block.gvnews-block-wrapper",
				'animation'   => ".{$this->element_id}.gvnews-block.gvnews-block-wrapper",
			)
		);
	}

	/**
	 * Set default attributes
	 *
	 * @param array   $attrs attributes.
	 * @param boolean $name  name.
	 */
	protected function set_attrs( $attrs, $name = false ) {
		if ( $name ) {
			$name = str_replace( 'gutenverse/news-', '', $name );
		} elseif ( isset( $this->name ) ) {
			$name = $this->name;
		}
		if ( $name ) {
			$path = GUTENVERSE_NEWS_DIR . "./block/{$name}/block.json";
			if ( ! file_exists( $path ) ) {
				return;
			}

			$block_json       = gutenverse_get_json( $path );
			$override_overlay = array();
			$hero_type        = array( 1, 2, 3, 4, 5, 6, 7 );
			foreach ( $block_json['attributes'] as $key => $value ) {
				if ( strpos( $key, '__i__' ) !== false ) {
					foreach ( $hero_type as $type ) {
						$override_key                      = str_replace( '__i__', $type, $key );
						$override_overlay[ $override_key ] = $value;
					}
					unset( $block_json['attributes'][ $key ] );
				}
			}
			$block_json['attributes'] = array_merge( $block_json['attributes'], $override_overlay );

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
	 * Generate style base on attribute.
	 */
	public function generate() {
		$this->archive_title();
		$this->archive_breadcrumb();
		$this->archive_pagination();
	}

	/**
	 * Generate style for archive title
	 */
	private function archive_title() {
		if ( 'gutenverse/news-archive-title' === $this->name ) {

			if ( isset( $this->attrs['titleTypography'] ) ) {
				$this->inject_typography(
					array(
						'selector'       => ".{$this->element_id} .gvnews-archive-title h1",
						'property'       => function ( $value ) {},
						'value'          => $this->attrs['titleTypography'],
						'device_control' => false,
					)
				);
			}

			if ( isset( $this->attrs['titleColor'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .gvnews-archive-title h1",
						'property'       => function ( $value ) {
							return $this->handle_color( $value, 'color' );
						},
						'value'          => $this->attrs['titleColor'],
						'device_control' => false,
					)
				);
			}
		}
	}

	/**
	 * Generate style for archive breadcrumb
	 */
	private function archive_breadcrumb() {
		if ( 'gutenverse/news-archive-breadcrumb' === $this->name ) {
			if ( isset( $this->attrs['textColor'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .gvnews-archive-breadcrumb span a",
						'property'       => function ( $value ) {
							return $this->handle_color( $value, 'color' );
						},
						'value'          => $this->attrs['textColor'],
						'device_control' => false,
					)
				);
			}
			if ( isset( $this->attrs['textColorHover'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .gvnews-archive-breadcrumb span a:hover",
						'property'       => function ( $value ) {
							return $this->handle_color( $value, 'color' );
						},
						'value'          => $this->attrs['textColorHover'],
						'device_control' => false,
					)
				);
			}
			if ( isset( $this->attrs['arrowColor'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .gvnews-archive-breadcrumb i, .{$this->element_id} .gvnews-archive-breadcrumb svg",
						'property'       => function ( $value ) {
							return $this->handle_color( $value, 'color' );
						},
						'value'          => $this->attrs['arrowColor'],
						'device_control' => false,
					)
				);
			}

			if ( isset( $this->attrs['breadcrumbTypography'] ) ) {
				$this->inject_typography(
					array(
						'selector'       => ".{$this->element_id}.gvnews-archive-breadcrumb",
						'property'       => function ( $value ) {},
						'value'          => $this->attrs['breadcrumbTypography'],
						'device_control' => false,
					)
				);
			}
		}
	}

	/**
	 * Generate style for archive pagination
	 */
	private function archive_pagination() {
		if ( 'gutenverse/news-archive-pagination' === $this->name ) {
			if ( isset( $this->attrs['paginationTypography'] ) ) {
				$this->inject_typography(
					array(
						'selector'       => ".{$this->element_id}  .gvnews_pagination *",
						'property'       => function ( $value ) {
						},
						'value'          => $this->attrs['paginationTypography'],
						'device_control' => false,
					)
				);
			}
		}
		// missing style or typographpy only?
	}
}
