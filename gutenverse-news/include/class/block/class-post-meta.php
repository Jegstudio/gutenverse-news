<?php
/**
 * Post Meta
 *
 * @author : Jegtheme
 * @since 1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block;

use GUTENVERSE\NEWS\Block\Grab;
use GUTENVERSE\NEWS\Util\Single\Single_Post;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Post_Meta
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Post_Meta extends Grab {

	/**
	 * Method get_content
	 *
	 * @return string
	 */
	public function get_content() {
		$left_html = '';
		$right_html = '';

		$lefts = is_array( $this->attributes['metaLeft'] ) ? $this->attributes['metaLeft'] : explode( ',', $this->attributes['metaLeft'] );
		foreach ( $lefts as $left ) {
			$left_html .= $this->render_meta( $left['value'] );
		}
		$left_html = "<div class='meta_left'>{$left_html}</div>";

		$rights = is_array( $this->attributes['metaRight'] ) ? $this->attributes['metaRight'] : explode( ',', $this->attributes['metaRight'] );
		foreach ( $rights as $right ) {
			$right_html .= $this->render_meta( $right['value'] );
		}
		$right_html = "<div class='meta_right'>{$right_html}</div>";

		return "<div class='gvnews_post_meta gvnews_custom_meta_wrapper " . esc_attr( $this->get_vc_class_name() ) . "'>" . $left_html . $right_html . '</div>';
	}

	/**
	 * Method render_meta
	 *
	 * @param string $meta meta.
	 *
	 * @return array
	 */
	public function render_meta( $meta ) {
		if ( ! empty( $meta ) ) {
			switch ( $meta ) {
				case 'author':
					return $this->render_author();
				case 'category':
					return $this->render_category();
				case 'comment':
					return $this->render_comment();
					break;
			}
		}
	}


	/**
	 * Method render_category
	 *
	 * @return string
	 */
	public function render_category() {
		return '<div class="gvnews_meta_category">
                <span>
                    <span class="meta_text">' . esc_html__( 'in', 'gutenverse-news' ) . '</span>
                    ' . get_the_category_list( '<span class="category-separator">, </span>' ) . ' 
                </span>
            </div>';
	}

	/**
	 * Method render_comment
	 *
	 * @return string
	 */
	public function render_comment() {
		return '<div class="gvnews_meta_comment"><a href="' . esc_url( gvnews_get_respond_link() ) . '"><i class="far fa-comment"></i> ' . esc_html( gvnews_get_comments_number() ) . '</a></div>';
	}

	/**
	 * Method render_author
	 *
	 * @return string
	 */
	public function render_author() {
		global $post;
		return '<div class="gvnews_meta_author">' .
		get_avatar( get_the_author_meta( 'ID', $post->post_author ), 80, null, get_the_author_meta( 'display_name', $post->post_author ) ) .
		'<span class="meta_text">' .
		esc_html__( 'by', 'gutenverse-news' ) .
		'</span>' .
		gvnews_the_author_link( $post->post_author, false ) .
		'</div>';
	}
}
