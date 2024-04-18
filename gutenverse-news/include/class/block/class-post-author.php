<?php
/**
 * Post Author
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block;

use GUTENVERSE\NEWS\Block\Grab;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


/**
 * Post_Author
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Post_Author extends Grab {

	/**
	 * Method get_content
	 *
	 * @return string
	 */
	public function get_content() {
		$authors = array();
		$post_id = get_the_ID();

		$author_id = is_author() ? get_queried_object_id() : get_post_field( 'post_author', $post_id );

		$authors[] = array(
			'id'   => $author_id,
			'name' => get_the_author_meta( 'display_name', $author_id ),
			'url'  => get_author_posts_url( $author_id ),
			'desc' => get_the_author_meta( 'description', $author_id ),
		);

		$block = '';

		foreach ( $authors as $author ) {
			$block .= '<div class="gvnews_authorbox">
					<div class="gvnews_author_image">' .
			get_avatar( $author['id'], 80, null, $author['name'] ) .
			'</div>' .
			'<div class="gvnews_author_content">
					  	<h3 class="gvnews_author_name"><a ref="' . esc_url( $author['url'] ) . '">' . esc_html( $author['name'] ) . '</a></h3>
						<p>' . esc_html( $author['desc'] ) . '</p>
					</div>
				</div>';
		}

		$wrapper_classes = gvnews_build_html_classes(
			array(
				'gvnews_custom_author_wrapper',
				'gvnews_author_box_container',
				esc_attr( $this->get_vc_class_name() ),
			)
		);

		return "<div class='{$wrapper_classes}'>" .
		$block .
		'</div>';
	}
}
