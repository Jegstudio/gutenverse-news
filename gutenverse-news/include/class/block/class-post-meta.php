<?php
/**
 * Post Meta
 *
 * @author : Jegtheme
 * @since 1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block;

use GUTENVERSE\NEWS\Block\Post_Guten;

/**
 * Post_Meta
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Post_Meta extends Post_Guten {

	/**
	 * Method get_custom_classes;
	 *
	 * @return string
	 */
	public function get_custom_classes() {
		return 'gvnews-post-meta';
	}

	/**
	 * Get content
	 *
	 * @return string
	 */
	public function get_content() {
		$left_html  = '';
		$right_html = '';

		$lefts = isset( $this->attributes['metaLeft'] ) ? $this->attributes['metaLeft'] : array();
		foreach ( $lefts as $index => $left ) {
			$left_html .= $this->render_meta( $left['value'], $this->is_last_item( $index, count( $lefts ) ) );
		}
		$left_html = "<div class='meta-part meta-left'>{$left_html}</div>";

		$rights = isset( $this->attributes['metaRight'] ) ? $this->attributes['metaRight'] : array();
		foreach ( $rights as $index => $right ) {
			$right_html .= $this->render_meta( $right['value'], $this->is_last_item( $index, count( $rights ) ) );
		}
		$right_html = "<div class='meta-part meta-right'>{$right_html}</div>";

		return $left_html . $right_html;
	}

	/**
	 * Method render_meta
	 *
	 * @param string $meta meta.
	 * @param string $is_last_item class is-last-item.
	 *
	 * @return array
	 */
	public function render_meta( $meta, $is_last_item ) {
		if ( empty( $meta ) ) {
			return '';
		}
		switch ( $meta ) {
			case 'author':
				return $this->render_author( $is_last_item );
			case 'category':
				return $this->render_category( $is_last_item );
			case 'comment':
				return $this->render_comment( $is_last_item );
			case 'date':
				return $this->render_date( $is_last_item );
		}
	}

	/**
	 * Method render_category
	 *
	 * @param string $is_last_item class is-last-item.
	 *
	 * @return string
	 */
	public function render_category( $is_last_item ) {
		return '<div class="gvnews-meta-category meta-items ' . $is_last_item . '">
                <span>
                    <span class="meta-text">' . esc_html__( 'in', 'gutenverse-news' ) . '</span>
                    ' . get_the_category_list( '<span class="category-separator">, </span>' ) . ' 
                </span>
            </div>';
	}

	/**
	 * Method render_comment
	 *
	 * @param string $is_last_item class is-last-item.
	 *
	 * @return string
	 */
	public function render_comment( $is_last_item ) {
		return '<div class="gvnews-meta-comment meta-items ' . $is_last_item . '">
					<a href="' . esc_url( gvnews_get_respond_link() ) . '">
						<i class="far fa-comment"></i> '
						. esc_html( gvnews_get_comments_number() ) .
					'</a>
				</div>';
	}

	/**
	 * Method render_author
	 *
	 * @param string $is_last_item class is-last-item.
	 *
	 * @return string
	 */
	public function render_author( $is_last_item ) {
		global $post;
		$avatar = isset( $this->attributes['showAvatar'] ) && $this->attributes['showAvatar'] ? get_avatar( get_the_author_meta( 'ID', $post->post_author ), 80, null, get_the_author_meta( 'display_name', $post->post_author ) ) : '';
		return '<div class="gvnews-meta-author meta-items ' . $is_last_item . '">' .
					$avatar .
					'<span class="meta-text">' .
						esc_html__( 'by ', 'gutenverse-news' ) .
					'</span>' .
					gvnews_the_author_link( $post->post_author, false ) .
				'</div>';
	}

	/**
	 * Method render_author
	 *
	 * @param string $is_last_item class is-last-item.
	 *
	 * @return string
	 */
	public function render_date( $is_last_item ) {
		global $post;
		$date        = gutenverse_get_post_date( $post, 'default', $this->attributes['postDate'], '' );
		$show_prefix = isset( $this->attributes['datePrefix'] ) && $this->attributes['datePrefix'] ? ' with-prefix' : '';
		return '<div class="gvnews-meta-date meta-items ' . $is_last_item . $show_prefix . '">' .
					'<a href="#">' . $date . '</a>' .
				'</div>';
	}

	/**
	 * Method is_last_item
	 *
	 * @param integer $index index.
	 * @param integer $array_length lenhgth of array.
	 *
	 * @return string
	 */
	protected function is_last_item( $index, $array_length ) {
		if ( $index === $array_length - 1 ) {
			return 'is-last-item';
		}
		return '';
	}
}
