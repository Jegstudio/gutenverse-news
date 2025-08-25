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

		$lefts = is_array( $this->attributes['metaLeft'] ) ? $this->attributes['metaLeft'] : explode( ',', $this->attributes['metaLeft'] );
		foreach ( $lefts as $index => $left ) {
			$left_html .= $this->render_meta( $left['value'], $this->is_last_item( $index, count( $lefts ) ) );
		}
		$left_html = "<div class='meta-left'>{$left_html}</div>";

		$rights = is_array( $this->attributes['metaRight'] ) ? $this->attributes['metaRight'] : explode( ',', $this->attributes['metaRight'] );
		foreach ( $rights as $index => $right ) {
			$right_html .= $this->render_meta( $right['value'], $this->is_last_item( $index, count( $rights ) ) );
		}
		$right_html = "<div class='meta-right'>{$right_html}</div>";

		return '<div class="gvnews-post-meta-inner">'
					. $left_html . $right_html .
				'</div>';
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

		$meta_components = array(
			'author'   => $this->meta_author(),
			'category' => $this->meta_category(),
			'comment'  => $this->meta_comment(),
			'date'     => $this->meta_date(),
		);
		$meta_components = apply_filters( 'gvnews_post_meta_components', $meta_components, $this->attributes );
		if ( isset( $meta_components[ $meta ] ) ) {
			$element          = isset( $meta_components[ $meta ]['element'] ) ? $meta_components[ $meta ]['element'] : '';
			$additional_class = isset( $meta_components[ $meta ]['additional_class'] ) ? $meta_components[ $meta ]['additional_class'] : '';

			return '<div class="meta-items ' . $is_last_item . ' ' . $additional_class . '">'
				. $element .
			'</div>';
		}
	}

	// === PRIVATE ===

	/**
	 * Method meta_category
	 *
	 * @return string
	 */
	private function meta_category() {
		$element = '<span>
                    <span class="meta-text">' . esc_html__( 'in', 'gutenverse-news' ) . '</span>
                    ' . get_the_category_list( '<span class="category-separator">, </span>' ) . ' 
                </span>';

		return array(
			'element'          => $element,
			'additional_class' => 'gvnews-meta-category',
		);
	}

	/**
	 * Method meta_comment
	 *
	 * @return string
	 */
	private function meta_comment() {
		$element = '<a href="' . esc_url( gvnews_get_respond_link() ) . '">
						<i class="far fa-comment"></i> '
						. esc_html( gvnews_get_comments_number() ) .
					'</a>';

		return array(
			'element'          => $element,
			'additional_class' => 'gvnews-meta-comment',
		);
	}

	/**
	 * Method render_author
	 *
	 * @return string
	 */
	private function meta_author() {
		global $post;
		$element = get_avatar( get_the_author_meta( 'ID', $post->post_author ), 80, null, get_the_author_meta( 'display_name', $post->post_author ) ) .
					'<span class="meta-text">' .
						esc_html__( 'by ', 'gutenverse-news' ) .
					'</span>' .
					gvnews_the_author_link( $post->post_author, false );

		return array(
			'element'          => $element,
			'additional_class' => 'gvnews-meta-author',
		);
	}

	/**
	 * Method meta_date
	 *
	 * @return string
	 */
	private function meta_date() {
		global $post;

		$element = '<a href="#">' . gutenverse_get_post_date( $post, 'default', $this->attributes['postDate'], '' ) . '</a>';

		return array(
			'element'          => $element,
			'additional_class' => 'gvnews-meta-date',
		);
	}

	/**
	 * Method is_last_item
	 *
	 * @param integer $index index.
	 * @param integer $array_length lenhgth of array.
	 *
	 * @return string
	 */
	private function is_last_item( $index, $array_length ) {
		if ( $index === $array_length - 1 ) {
			return 'is-last-item';
		}
		return '';
	}
}
