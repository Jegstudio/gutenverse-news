<?php
/**
 * Style Generator Templating
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS;

use GUTENVERSE\NEWS\Style\Archive;
use GUTENVERSE\NEWS\Style\Block;
use GUTENVERSE\NEWS\Style\Block_Link;
use GUTENVERSE\NEWS\Style\Carousel;
use GUTENVERSE\NEWS\Style\Hero;
use GUTENVERSE\NEWS\Style\News_Ticker;
use GUTENVERSE\NEWS\Style\Slider;
use GUTENVERSE\NEWS\Style\User_List;

/**
 * Class Style Generator
 *
 * @package gutenverse-news
 */
class Style_Generator {

	/**
	 * Font Families
	 *
	 * @var array font families
	 */
	protected $font_families = array();

	/**
	 * Font Variables
	 *
	 * @var array font variables
	 */
	protected $font_variables = array();

	/**
	 * Init constructor.
	 */
	public function __construct() {
		add_filter( 'gutenverse_block_style_instance', array( $this, 'get_block_style_instance' ), null, 3 );
	}

	/**
	 * Get Block Style Instance.
	 *
	 * @param class  $instance  instance.
	 * @param string $name  Block Name.
	 * @param array  $attrs Block Attribute.
	 *
	 * @return Style_Abstract
	 */
	public function get_block_style_instance( $instance, $name, $attrs ) {
		switch ( true ) {
			case 'gutenverse/news-block-link' === $name:
				$instance = new Block_Link( $attrs, $name );
				break;
			case stristr( $name, 'gutenverse/news-block' ):
				$instance = new Block( $attrs, $name );
				break;
			case stristr( $name, 'gutenverse/news-hero' ):
				$instance = new Hero( $attrs, $name );
				break;
			case stristr( $name, 'gutenverse/news-slider' ):
				$instance = new Slider( $attrs, $name );
				break;
			case stristr( $name, 'gutenverse/news-carousel' ):
				$instance = new Carousel( $attrs, $name );
				break;
			case 'gutenverse/news-news-ticker' === $name:
				$instance = new News_Ticker( $attrs );
				break;
			case 'gutenverse/news-header' === $name:
				$instance = new Block( $attrs, $name );
				break;
			case 'gutenverse/news-user-list' === $name:
				$instance = new User_List( $attrs, $name );
				break;
			case 'gutenverse/news-rss' === $name:
				$instance = new Block( $attrs, $name );
				break;
			case stristr( $name, 'gutenverse/news-archive-' ):
				$instance = new Archive( $attrs, $name );
				break;
		}

		return $instance;
	}
}
