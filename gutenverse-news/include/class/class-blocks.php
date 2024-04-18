<?php
/**
 * Blocks
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS;

/**
 * Class Init
 *
 * @package GUTENVERSE\NEWS\Blocks
 */
class Blocks {


	/**
	 * Blocks constructor.
	 */
	public function __construct() {
			add_action( 'init', array( $this, 'register_blocks' ), 99 );
			add_filter( 'gutenverse_block_categories', array( $this, 'block_category' ) );
	}

	/**
	 * Block Category
	 *
	 * @param array $categories Block Categories.
	 *
	 * @return array
	 */
	public function block_category( $categories ) {

		$categories['gvnews-module'] = __( 'Gutenverse News Module', 'gutenverse-news' );
		$categories['gvnews-hero'] = __( 'Gutenverse News Hero', 'gutenverse-news' );
		$categories['gvnews-slider'] = __( 'Gutenverse News Slider', 'gutenverse-news' );
		$categories['gvnews-carousel'] = __( 'Gutenverse News Carousel', 'gutenverse-news' );
		$categories['gvnews-single-post'] = __( 'Gutenverse News Single Post', 'gutenverse-news' );
		$categories['gvnews-archive'] = __( 'Gutenverse News Archive', 'gutenverse-news' );
		$categories['gvnews-element'] = __( 'Gutenverse News Element', 'gutenverse-news' );

		return $categories;
	}


	/**
	 * Method register_blocks
	 *
	 * @return void
	 */
	public function register_blocks() {
		// Static block.
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/block-1/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/block-2/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/block-3/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/block-4/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/block-5/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/block-6/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/block-7/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/block-8/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/block-9/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/block-10/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/block-11/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/block-12/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/block-13/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/block-14/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/block-15/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/block-16/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/block-17/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/block-18/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/block-19/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/block-20/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/block-21/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/block-22/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/block-23/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/block-24/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/block-25/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/block-26/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/block-27/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/block-28/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/block-29/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/block-30/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/block-31/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/block-32/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/block-33/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/block-34/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/block-35/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/block-36/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/block-37/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/block-38/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/block-39/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/hero-1/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/hero-2/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/hero-3/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/hero-4/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/hero-5/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/hero-6/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/hero-7/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/hero-8/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/hero-9/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/hero-10/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/hero-11/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/hero-12/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/hero-13/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/hero-14/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/hero-skew/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/slider-1/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/slider-2/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/slider-3/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/slider-4/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/slider-5/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/slider-6/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/slider-7/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/slider-8/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/slider-9/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/carousel-1/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/carousel-2/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/carousel-3/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/news-ticker/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/header/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/user-list/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/rss/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/post-author/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/post-breadcrumb/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/post-comment/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/post-featured-image/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/post-meta/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/post-prev-next/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/post-related/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/post-tag/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/post-title/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/archive-title/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/archive-description/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/archive-breadcrumb/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/archive-pagination/block.json' );
		$this->register_archive_hero_block( GUTENVERSE_NEWS_DIR . './block/archive-hero/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/archive-block/block.json' );
		$this->register_dynamic_block( GUTENVERSE_NEWS_DIR . './block/about-widget/block.json' );
	}

	/**
	 * Method register_dynamic_block
	 *
	 * @param string $json json.
	 *
	 * @return void
	 */
	private function register_dynamic_block( $json ) {
		if ( ! file_exists( $json ) ) {
			return;
		}

		$block_json = gutenverse_get_json( $json );

		if ( isset( $block_json['class_callback'] ) ) {
			$instance = new $block_json['class_callback']();

			register_block_type(
				$json,
				array(
					'render_callback' => array( $instance, 'render' ),
				)
			);
		}
	}

	/**
	 * Register archive hero.
	 *
	 * @param string $json .
	 */
	private function register_archive_hero_block( $json ) {
		if ( ! file_exists( $json ) ) {
			return;
		}

		$block_json       = gutenverse_get_json( $json );
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

		if ( isset( $block_json['class_callback'] ) ) {
			$instance = new $block_json['class_callback']();
			$data     = array_merge(
				$block_json,
				array(
					'render_callback' => array( $instance, 'render' ),
				)
			);

			register_block_type(
				$data['name'],
				$data
			);
		}
	}
}
