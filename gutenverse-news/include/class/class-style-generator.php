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
use GUTENVERSE\NEWS\Style\Archive_Description;
use GUTENVERSE\NEWS\Style\Archive_Hero;
use GUTENVERSE\NEWS\Style\Archive_Pagination;
use GUTENVERSE\NEWS\Style\Block;
use GUTENVERSE\NEWS\Style\Block_Link;
use GUTENVERSE\NEWS\Style\Carousel;
use GUTENVERSE\NEWS\Style\Hero;
use GUTENVERSE\NEWS\Style\Hero_14;
use GUTENVERSE\NEWS\Style\Module_13;
use GUTENVERSE\NEWS\Style\Module_19;
use GUTENVERSE\NEWS\Style\Module_20;
use GUTENVERSE\NEWS\Style\Module_24;
use GUTENVERSE\NEWS\Style\News_Ticker;
use GUTENVERSE\NEWS\Style\Post_Author;
use GUTENVERSE\NEWS\Style\Post_Breadcrumb;
use GUTENVERSE\NEWS\Style\Post_Comment;
use GUTENVERSE\NEWS\Style\Post_Featured;
use GUTENVERSE\NEWS\Style\Post_Meta;
use GUTENVERSE\NEWS\Style\Post_Next_Prev;
use GUTENVERSE\NEWS\Style\Post_Related;
use GUTENVERSE\NEWS\Style\Slider;
use GUTENVERSE\NEWS\Style\User_List;
use GUTENVERSE\NEWS\Style\Post_Title;
use GUTENVERSE\NEWS\Style\Post_Tag;
use GUTENVERSE\NEWS\Style\Social_Author_Icon;

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
		if ( ! empty( $name ) ) {
			switch ( true ) {
				case 'gutenverse/news-block-link' === $name:
					$instance = new Block_Link( $attrs, $name );
					break;
				case 'gutenverse/news-block-13' === $name:
					$instance = new Module_13( $attrs, $name );
					break;
				case 'gutenverse/news-block-19' === $name:
					$instance = new Module_19( $attrs, $name );
					break;
				case 'gutenverse/news-block-20' === $name:
					$instance = new Module_20( $attrs, $name );
					break;
				case 'gutenverse/news-block-24' === $name:
					$instance = new Module_24( $attrs, $name );
					break;
				case stristr( $name, 'gutenverse/news-block' ):
					$instance = new Block( $attrs, $name );
					break;
				case 'gutenverse/news-hero-14' === $name:
					$instance = new Hero_14( $attrs, $name );
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
				case 'gutenverse/news-archive-hero' === $name:
					$instance = new Archive_Hero( $attrs, $name );
					break;
				case 'gutenverse/news-archive-description' === $name:
					$instance = new Archive_Description( $attrs, $name );
					break;
				case 'gutenverse/news-archive-pagination' === $name:
					$instance = new Archive_Pagination( $attrs, $name );
					break;
				case stristr( $name, 'gutenverse/news-archive-' ):
					$instance = new Archive( $attrs, $name );
					break;
				case 'gutenverse/news-post-title' === $name:
					$instance = new Post_Title( $attrs, $name );
					break;
				case 'gutenverse/news-post-tag' === $name:
					$instance = new Post_Tag( $attrs, $name );
					break;
				case 'gutenverse/news-post-related' === $name:
					$instance = new Post_Related( $attrs, $name );
					break;
				case 'gutenverse/news-post-meta' === $name:
					$instance = new Post_Meta( $attrs, $name );
					break;
				case stristr( $name, 'gutenverse/news-post-prev-next' ):
					$instance = new Post_Next_Prev( $attrs, $name );
					break;
				case 'gutenverse/news-post-breadcrumb' === $name:
					$instance = new Post_Breadcrumb( $attrs, $name );
					break;
				case 'gutenverse/news-post-comment' === $name:
					$instance = new Post_Comment( $attrs, $name );
					break;
				case 'gutenverse/news-post-author' === $name:
					$instance = new Post_Author( $attrs, $name );
					break;
				case 'gutenverse/news-post-featured' === $name:
					$instance = new Post_Featured( $attrs, $name );
					break;
				case 'gutenverse/news-social-author-icon' === $name:
					$instance = new Social_Author_Icon( $attrs, $name );
					break;
			}
		}

		return $instance;
	}
}
