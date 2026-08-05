<?php
/**
 * Post related
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block;

use Gutenverse\Framework\Options;
use GUTENVERSE\NEWS\Util\Single\Single_Post;
use GUTENVERSE\NEWS\Block\Post_Guten;

/**
 * Post_Related
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Post_Related extends Post_Guten {
	/**
	 * Hold Post Related Classname
	 *
	 * @var array
	 */
	protected $class_name = 'gvnews-post-related gvnews-custom-related-wrapper';
	/**
	 * Get content
	 *
	 * @return string
	 */
	public function get_content() {
		$match    = $this->attributes['match'];
		$category = array();
		$tag      = array();
		$result   = array();
		if ( 'category' === $match ) {
			Single_Post::get_instance()->recursive_category( get_the_category(), $result );

			if ( $result ) {
				foreach ( $result as $cat ) {
					$category[] = $cat->term_id;
				}
			}
		} elseif ( 'tag' === $match ) {
			$tags = get_the_tags();
			if ( $tags ) {
				foreach ( $tags as $cat ) {
					$tag[] = $cat->term_id;
				}
			}
		}

		$attribute = array(
			'header_icon'                  => $this->attributes['icon'],
			'icon_type'                    => isset( $this->attributes['iconType'] ) ? $this->attributes['iconType'] : 'icon',
			'icon_svg'                     => isset( $this->attributes['iconSVG'] ) ? $this->attributes['iconSVG'] : '',
			'first_title'                  => $this->attributes['title'],
			'second_title'                 => $this->attributes['second_title'],
			'header_type'                  => $this->attributes['headerType'],
			'date_format'                  => $this->attributes['metaDateFormat'],
			'date_format_custom'           => $this->attributes['metaDateFormatCustom'],
			'excerpt_length'               => $this->attributes['excerptLength'],
			'pagination_number_post'       => $this->attributes['paginationPost'],
			'number_post'                  => $this->attributes['numberPost'],
			'column_width'                 => $this->attributes['columnWidth'],
			'include_category'             => implode( ',', $category ),
			'include_tag'                  => implode( ',', $tag ),
			'exclude_post'                 => get_the_ID(),
			'sort_by'                      => $this->attributes['sortBy'],
			'pagination_mode'              => $this->attributes['paginationMode'],
			'pagination_scroll_limit'      => $this->attributes['autoLoad'],
			'paged'                        => 1,
			'post_offset'                  => 0,
			'pagination_nextprev_showtext' => $this->attributes['showNavText'],
			'disable_readmore'             => isset( $this->attributes['readmoreButtonDisabled'] ) ? $this->attributes['readmoreButtonDisabled'] : false,
			'renderedImageSizeMain'        => isset( $this->attributes['renderedImageSizeMain'] ) ? $this->attributes['renderedImageSizeMain'] : '',
			'renderedImageSizeSecond'      => isset( $this->attributes['renderedImageSizeSecond'] ) ? $this->attributes['renderedImageSizeSecond'] : '',
			'meta_settings'                => array(
				'show_meta'    => isset( $this->attributes['showMeta'] ) ? $this->attributes['showMeta'] : true,
				'meta_date'    => isset( $this->attributes['showMetaDate'] ) ? $this->attributes['showMetaDate'] : true,
				'meta_author'  => isset( $this->attributes['showMetaAuthor'] ) ? $this->attributes['showMetaAuthor'] : true,
				'meta_comment' => isset( $this->attributes['showMetaComment'] ) ? $this->attributes['showMetaComment'] : true,
				'meta_review'  => isset( $this->attributes['showMetaReview'] ) ? $this->attributes['showMetaReview'] : false,
			),
			'list_icon'                    => isset( $this->attributes['listIcon'] ) ? $this->attributes['listIcon'] : '',
			'list_icon_type'               => isset( $this->attributes['listIconType'] ) ? $this->attributes['listIconType'] : 'icon',
			'list_icon_svg'                => isset( $this->attributes['listIconSVG'] ) ? $this->attributes['listIconSVG'] : '',
			'image_load'                   => Options::get_instance()->get_image_load( 'normal', false, $this->attributes['imageLoad'] ),
			'header_html_tag'              => isset( $this->attributes['headerHtmlTag'] ) ? $this->attributes['headerHtmlTag'] : 'h3',
			'post_title_html_tag'          => isset( $this->attributes['postTitleHtmlTag'] ) ? $this->attributes['postTitleHtmlTag'] : 'h3',
			'fetch_priority_high_position' => isset( $this->attributes['fetchPriorityHighPosition'] ) ? $this->attributes['fetchPriorityHighPosition'] : '',
			'fetch_priority_high'          => isset( $this->attributes['fetchPriorityHigh'] ) ? $this->attributes['fetchPriorityHigh'] : false,
			'show_post_format_icon'        => isset( $this->attributes['showPostFormatIcon'] ) ? $this->attributes['showPostFormatIcon'] : false,
			'gallery_format_icon'          => isset( $this->attributes['galleryFormatIcon'] ) ? $this->attributes['galleryFormatIcon'] : '',
			'gallery_format_icon_type'     => isset( $this->attributes['galleryFormatIconType'] ) ? $this->attributes['galleryFormatIconType'] : 'icon',
			'gallery_format_icon_svg'      => isset( $this->attributes['galleryFormatIconSVG'] ) ? $this->attributes['galleryFormatIconSVG'] : '',
			'video_format_icon'            => isset( $this->attributes['videoFormatIcon'] ) ? $this->attributes['videoFormatIcon'] : '',
			'video_format_icon_type'       => isset( $this->attributes['videoFormatIconType'] ) ? $this->attributes['videoFormatIconType'] : 'icon',
			'video_format_icon_svg'        => isset( $this->attributes['videoFormatIconSVG'] ) ? $this->attributes['videoFormatIconSVG'] : '',
			'allow_override_category_color' => isset( $this->attributes['allowOverrideCategoryColor'] ) ? $this->attributes['allowOverrideCategoryColor'] : false,

		);

		$template_type = str_replace( 'template_', '', $this->attributes['templateType'] );

		$name = 'GUTENVERSE\\NEWS\\Block\\Module\\Module_' . $template_type;
		$mod  = gvnews_get_view_class_from_shortcode( $name );

		do_action( 'gvnews_build_shortcode_' . strtolower( $mod ) );

		/**
		 * Call module instance
		 *
		 * @var \GUTENVERSE\NEWS\Block\Module\Module_View_Abstract $instance
		 */
		$instance = call_user_func( array( $mod, 'get_instance' ) );

		$content = $instance->build_module( $attribute );

		$style_hanlder = (int) $template_type > 9 ? 'gutenverse-news-frontend-block-' . $template_type . '-style' : 'gutenverse-news-frontend-block-0' . $template_type . '-style';
		wp_enqueue_style( $style_hanlder );
		return $content;
	}
}
