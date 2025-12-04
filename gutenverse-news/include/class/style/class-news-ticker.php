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
				'background' => array(
					'normal' => ".{$this->element_id} .gvnews_breakingnews",
					'hover'  => ".{$this->element_id} .gvnews_breakingnews:hover",
				),
				'border'     => array(
					'normal' => ".{$this->element_id} .gvnews_breakingnews",
					'hover'  => ".{$this->element_id} .gvnews_breakingnews:hover",
				),
				'advance'    => ".{$this->element_id} .gvnews_breakingnews",
			)
		);
	}

	/**
	 * Generate style base on attribute.
	 */
	public function generate() {
		// Ticker Title
		if ( isset( $this->attrs['titleTextColor'] ) ) {
			$this->inject_style(
				array(
					'selector' => ".{$this->element_id} .gvnews_breakingnews_title span",
					'property' => function ( $value ) {
						return $this->handle_color( $value, 'color' ); },
					'value'    => $this->attrs['titleTextColor'],
				)
			);
		}
		if ( isset( $this->attrs['titleBackgroundColor'] ) ) {
			$this->handle_background( ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_breakingnews_title", $this->attrs['titleBackgroundColor'] );
		}

		if ( isset( $this->attrs['titleBorder'] ) ) {
			$this->handle_border( 'titleBorder', ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_breakingnews_title" );
		}
		if ( isset( $this->attrs['titleBorderResponsive'] ) ) {

			$this->inject_style(
				array(
					'selector'       => ".gvnews-block.gvnews-block-wrapper.{$this->element_id} .gvnews_breakingnews_title",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['titleBorderResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}
		if ( isset( $this->attrs['titleTextTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector' => ".{$this->element_id} .gvnews_breakingnews_title span",
					'property' => function ( $value ) {},
					'value'    => $this->attrs['titleTextTypography'],
				)
			);
		}
		if ( isset( $this->attrs['iconTextColor'] ) ) {
			$this->inject_style(
				array(
					'selector' => ".{$this->element_id} .gvnews_breakingnews_title i",
					'property' => function ( $value ) {
						return $this->handle_color( $value, 'color' ); },
					'value'    => $this->attrs['iconTextColor'],
				)
			);
		}
		if ( isset( $this->attrs['iconTextSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_breakingnews_title i",
					'property'       => function ( $value ) {
						return "font-size: {$value}px;";
					},
					'value'          => $this->attrs['iconTextSize'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['titleTextPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_breakingnews_title",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['titleTextPadding'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['titleTextGap'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_breakingnews_title",
					'property'       => function ( $value ) {
						return "gap: {$value}px;";
					},
					'value'          => $this->attrs['titleTextGap'],
					'device_control' => true,
				)
			);
		}

		// Navigation Wrapper
		if ( isset( $this->attrs['navWrapperBackgroundColor'] ) ) {
			$this->inject_style(
				array(
					'selector' => ".{$this->element_id} .gvnews_news_ticker_control",
					'property' => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'    => $this->attrs['navWrapperBackgroundColor'],
				)
			);
		}
		if ( isset( $this->attrs['navWrapperBorder'] ) ) {
			$this->handle_border( 'navWrapperBorder', ".{$this->element_id} .gvnews_news_ticker_control" );
		}
		if ( isset( $this->attrs['navWrapperBorderResponsive'] ) ) {

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_news_ticker_control",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['navWrapperBorderResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}
		if ( isset( $this->attrs['navWrapperPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_news_ticker_control",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['navWrapperPadding'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['navSeparatorColor'] ) ) {
			$this->inject_style(
				array(
					'selector' => ".{$this->element_id} .gvnews_news_ticker_control .nav-separator",
					'property' => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'    => $this->attrs['navSeparatorColor'],
				)
			);
		}
		if ( isset( $this->attrs['navSeparatorWidth'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_news_ticker_control .nav-separator",
					'property'       => function ( $value ) {
						return "width: {$value}px;";
					},
					'value'          => $this->attrs['navSeparatorWidth'],
					'device_control' => true,
				)
			);
		}

			// Navigation
		if ( isset( $this->attrs['navColor'] ) ) {
			$this->inject_style(
				array(
					'selector' => ".{$this->element_id} .gvnews_news_ticker_control i",
					'property' => function ( $value ) {
						return $this->handle_color( $value, 'color' ); },
					'value'    => $this->attrs['navColor'],
				)
			);
		}
		if ( isset( $this->attrs['navBackgroundColor'] ) ) {
			$this->inject_style(
				array(
					'selector' => ".{$this->element_id} .gvnews_news_ticker_control .gvnews_news_ticker_arrow",
					'property' => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'    => $this->attrs['navBackgroundColor'],
				)
			);
		}
		if ( isset( $this->attrs['navHoverColor'] ) ) {
			$this->inject_style(
				array(
					'selector' => ".{$this->element_id} .gvnews_news_ticker_control .gvnews_news_ticker_arrow:hover i",
					'property' => function ( $value ) {
						return $this->handle_color( $value, 'color' ); },
					'value'    => $this->attrs['navHoverColor'],
				)
			);
		}
		if ( isset( $this->attrs['navHoverBackgroundColor'] ) ) {
			$this->inject_style(
				array(
					'selector' => ".{$this->element_id} .gvnews_news_ticker_control .gvnews_news_ticker_arrow:hover",
					'property' => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'    => $this->attrs['navHoverBackgroundColor'],
				)
			);
		}
		if ( isset( $this->attrs['navIconSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_news_ticker_control i",
					'property'       => function ( $value ) {
						return "font-size: {$value}px;";
					},
					'value'          => $this->attrs['navIconSize'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['navButtonWidth'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_news_ticker_control .gvnews_news_ticker_arrow",
					'property'       => function ( $value ) {
						return "width: {$value}px;";
					},
					'value'          => $this->attrs['navButtonWidth'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['navButtonHeight'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_news_ticker_control .gvnews_news_ticker_arrow, .{$this->element_id} .gvnews_news_ticker_control .nav-separator",
					'property'       => function ( $value ) {
						return "height: {$value}px;";
					},
					'value'          => $this->attrs['navButtonHeight'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['navButtonBorder'] ) ) {
			$this->handle_border( 'navButtonBorder', ".{$this->element_id} .gvnews_news_ticker_control .gvnews_news_ticker_arrow" );

		}
		if ( isset( $this->attrs['navButtonBorderResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_news_ticker_control .gvnews_news_ticker_arrow",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['navButtonBorderResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		// Border
		if ( isset( $this->attrs['contentBorder'] ) ) {
			$this->handle_border( 'contentBorder', ".{$this->element_id} .gvnews_news_ticker" );
		}
		if ( isset( $this->attrs['contentBorderResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_news_ticker",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['contentBorderResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		// Content (Inner)
		if ( isset( $this->attrs['contentPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_news_ticker",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['contentPadding'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['contentHeight'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_news_ticker, .{$this->element_id} .gvnews_breakingnews .gvnews_breakingnews_title, .{$this->element_id} .gvnews_news_ticker_control",
					'property'       => function ( $value ) {
						return "height: {$value}px;";
					},
					'value'          => $this->attrs['contentHeight'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['tickerLineHeight'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gvnews_news_ticker .gvnews_news_ticker_item",
					'property'       => function ( $value ) {
						return "line-height: {$value}px;";
					},
					'value'          => $this->attrs['tickerLineHeight'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['postTitleColor'] ) ) {
			$this->inject_style(
				array(
					'selector' => ".{$this->element_id} .gvnews_news_ticker_item a",
					'property' => function ( $value ) {
						return $this->handle_color( $value, 'color' ); },
					'value'    => $this->attrs['postTitleColor'],
				)
			);
		}
		if ( isset( $this->attrs['postTitleHoverColor'] ) ) {
			$this->inject_style(
				array(
					'selector' => ".{$this->element_id} .gvnews_news_ticker_item a:hover",
					'property' => function ( $value ) {
						return $this->handle_color( $value, 'color' ); },
					'value'    => $this->attrs['postTitleHoverColor'],
				)
			);
		}
		if ( isset( $this->attrs['postTitleTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector' => ".{$this->element_id} .gvnews_news_ticker_item a",
					'property' => function ( $value ) {},
					'value'    => $this->attrs['postTitleTypography'],

				)
			);
		}
		if ( isset( $this->attrs['metaColor'] ) ) {
			$this->inject_style(
				array(
					'selector' => ".{$this->element_id} .gvnews_news_ticker_item .post-date",
					'property' => function ( $value ) {
						return $this->handle_color( $value, 'color' ); },
					'value'    => $this->attrs['metaColor'],
				)
			);
		}
		if ( isset( $this->attrs['metaTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector' => ".{$this->element_id} .gvnews_news_ticker_item .post-date",
					'property' => function ( $value ) {},
					'value'    => $this->attrs['metaTypography'],
				)
			);
		}
	}
}
