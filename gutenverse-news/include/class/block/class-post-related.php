<?php
/**
 * Post related
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block;

use GUTENVERSE\NEWS\Block\Grab;

use GUTENVERSE\NEWS\Util\Single\Single_Post;


/**
 * Post_Related
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Post_Related extends Grab {


	/**
	 * Method get_content
	 *
	 * @return string
	 */
	public function get_content() {
		$match    = $this->attributes['match'];
		$category = array();
		$tag = array();
		$result = array();
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
			'first_title'             => $this->attributes['title'],
			'second_title'            => $this->attributes['secondTitle'],
			'header_type'             => $this->attributes['headerType'],
			'date_format'             => $this->attributes['metaDateFormat'],
			'date_format_custom'      => $this->attributes['metaDateFormatCustom'],
			'excerpt_length'          => $this->attributes['excerptLength'],
			'pagination_number_post'  => $this->attributes['paginationPost'],
			'number_post'             => $this->attributes['numberPost'],
			'include_category'        => implode( ',', $category ),
			'include_tag'             => implode( ',', $tag ),
			'exclude_post'            => get_the_ID(),
			'sort_by'                 => $this->attributes['sortBy'],
			'pagination_mode'         => $this->attributes['paginationMode'],
			'pagination_scroll_limit' => $this->attributes['autoLoad'],
			'paged'                   => 1,
			'post_offset'             => 0,
		);

		$name = 'GUTENVERSE\\NEWS\\Block\\Module\\Module_' . str_replace( 'template_', '', $this->attributes['templateType'] );
		$mod  = gvnews_get_view_class_from_shortcode( $name );

		do_action( 'gvnews_build_shortcode_' . strtolower( $mod ) );

		/**
		* Call module instance
		*
		* @var ModuleViewAbstract $instance
		*/
		$instance = call_user_func( array( $mod, 'get_instance' ) );

		$content = $instance->build_module( $attribute );

		$wrapper_classes = gvnews_build_html_classes(
			array(
				'gvnews_related_post_container',
				'gvnews_custom_related_wrapper',
				esc_attr( $this->get_vc_class_name() ),
			)
		);

		return "<div class='{$wrapper_classes}'>" .
		$content .
		'</div>';
	}
}
