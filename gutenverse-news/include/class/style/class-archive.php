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
				'background'  => null,
				'border'      => null,
				'positioning' => null,
				'animation'   => null,
				'advance'     => null,
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
			$name = str_replace( 'gvnews/', '', $name );
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
		$this->archive_description();
		$this->archive_hero();
		$this->archive_block();
	}

	/**
	 * Generate style for archive title
	 */
	private function archive_title() {
		if ( 'gvnews/archive-title' === $this->name ) {
			if ( isset( $this->attrs['titleColor'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .gvnews_archive_title",
						'property'       => function ( $value ) {
							return $this->handle_color( $value, 'color' );
						},
						'value'          => $this->attrs['titleColor'],
						'device_control' => false,
					)
				);
			}
			if ( isset( $this->attrs['fontSize'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .gvnews_archive_title",
						'property'       => function ( $value ) {
							return 'font-size: ' . $value;
						},
						'value'          => $this->attrs['fontSize'],
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
		if ( 'gvnews/archive-breadcrumb' === $this->name ) {
			if ( isset( $this->attrs['textColor'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .gvnews_breadcrumbs span a",
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
						'selector'       => ".{$this->element_id} .gvnews_breadcrumbs span a:hover",
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
						'selector'       => ".{$this->element_id} .gvnews_breadcrumbs i",
						'property'       => function ( $value ) {
							return $this->handle_color( $value, 'color' );
						},
						'value'          => $this->attrs['arrowColor'],
						'device_control' => false,
					)
				);
			}
			if ( isset( $this->attrs['fontSize'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .gvnews_breadcrumbs span a, .{$this->element_id} .gvnews_breadcrumbs i",
						'property'       => function ( $value ) {
							return 'font-size: ' . $value;
						},
						'value'          => $this->attrs['fontSize'],
						'device_control' => false,
					)
				);
			}

			if ( isset( $this->attrs['breadcrumbTypography'] ) ) {
				$this->inject_typography(
					array(
						'selector'       => ".{$this->element_id} .gvnews_breadcrumbs span a",
						'property'       => function ( $value ) {
						},
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
		if ( 'gvnews/archive-pagination' === $this->name ) {
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

	/**
	 * Generate style for archive description
	 */
	private function archive_description() {
		if ( 'gvnews/archive-description' === $this->name ) {
			if ( isset( $this->attrs['textColor'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .gvnews_archive_description",
						'property'       => function ( $value ) {
							return $this->handle_color( $value, 'color' );
						},
						'value'          => $this->attrs['textColor'],
						'device_control' => false,
					)
				);
			}
			if ( isset( $this->attrs['fontSize'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .gvnews_archive_description",
						'property'       => function ( $value ) {
							return 'font-size: ' . $value;
						},
						'value'          => $this->attrs['fontSize'],
						'device_control' => false,
					)
				);
			}
		}
	}

	/**
	 * Generate style for archive hero
	 */
	private function archive_hero() {
		if ( 'gvnews/archive-hero' === $this->name ) {
			if ( isset( $this->attrs['titleTypography'] ) ) {
				$this->inject_typography(
					array(
						'selector'       => ".{$this->element_id} .gvnews_post_title > a",
						'property'       => function ( $value ) {
						},
						'value'          => $this->attrs['titleTypography'],
						'device_control' => false,
					)
				);
			}
			if ( isset( $this->attrs['metaTypography'] ) ) {
				$this->inject_typography(
					array(
						'selector'       => ".{$this->element_id} .gvnews_post_meta, .{$this->element_id} .gvnews_post_meta .fa, .{$this->element_id} .gvnews_postblock .jeg_subcat_list > li > a:hover, .{$this->element_id} .gvnews_pl_md_card .gvnews_post_category a, .{$this->element_id} .gvnews_postblock .jeg_subcat_list > li > a.current, .{$this->element_id} .gvnews_pl_md_5 .gvnews_post_meta, .{$this->element_id} .gvnews_pl_md_5 .gvnews_post_meta .fa, .{$this->element_id} .gvnews_post_category a",
						'property'       => function ( $value ) {
						},
						'value'          => $this->attrs['metaTypography'],
						'device_control' => false,
					)
				);
			}
			$hero_type = array( 1, 2, 3, 4, 5, 6, 7 );
			foreach ( $hero_type as $value ) {
				if ( isset( $this->attrs[ "heroItem{$value}Enable" ] ) && $this->attrs[ "heroItem{$value}Enable" ] ) {
					if ( isset( $this->attrs[ "heroItem{$value}Background" ] ) && ! is_null( $this->attrs[ "heroItem{$value}Background" ] ) ) {
						$this->handle_background( ".{$this->element_id} .gvnews_hero_item_{$value} .gvnews_thumb a > div:" . ( 5 === $value ? 'after' : 'before' ), $this->attrs[ "heroItem{$value}Background" ] );
					}
				}
			}
		}
	}

	/**
	 * Generate style for archive block
	 */
	private function archive_block() {
		if ( 'gvnews/archive-block' === $this->name ) {
			if ( isset( $this->attrs['titleTypography'] ) ) {
				$this->inject_typography(
					array(
						'selector'       => ".{$this->element_id} .gvnews_post_title > a",
						'property'       => function ( $value ) {
						},
						'value'          => $this->attrs['titleTypography'],
						'device_control' => false,
					)
				);
			}
			if ( isset( $this->attrs['metaTypography'] ) ) {
				$this->inject_typography(
					array(
						'selector'       => ".{$this->element_id} .gvnews_post_meta, .{$this->element_id} .gvnews_post_meta .fa, .{$this->element_id} .gvnews_postblock .jeg_subcat_list > li > a:hover, .{$this->element_id} .gvnews_pl_md_card .gvnews_post_category a, .{$this->element_id} .gvnews_postblock .jeg_subcat_list > li > a.current, .{$this->element_id} .gvnews_pl_md_5 .gvnews_post_meta, .{$this->element_id} .gvnews_pl_md_5 .gvnews_post_meta .fa, .{$this->element_id} .gvnews_post_category a",
						'property'       => function ( $value ) {
						},
						'value'          => $this->attrs['metaTypography'],
						'device_control' => false,
					)
				);
			}
			if ( isset( $this->attrs['contentTypography'] ) ) {
				$this->inject_typography(
					array(
						'selector'       => ".{$this->element_id} .gvnews_post_excerpt, .{$this->element_id} .gvnews_readmore",
						'property'       => function ( $value ) {
						},
						'value'          => $this->attrs['contentTypography'],
						'device_control' => false,
					)
				);
			}
		}
	}
}
