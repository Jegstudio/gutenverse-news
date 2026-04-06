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
use GUTENVERSE\NEWS\Util\Svg_Icons;

/**
 * Post_Meta
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Post_Meta extends Post_Guten {
	/**
	 * Meta components element.
	 *
	 * @var array
	 */
	private $meta_components = array();

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
		$post_id    = ! empty( $this->context['postId'] ) ? esc_html( $this->context['postId'] ) : get_the_ID();
		$this->set_meta_components( $post_id );

		$lefts = isset( $this->attributes['metaLeft'] ) ? $this->attributes['metaLeft'] : array();
		foreach ( $lefts as $index => $left ) {
			$left_html .= $this->render_meta( $left['value'] );
		}
		$left_html = "<div class='meta-part meta-left'>{$left_html}</div>";

		$rights = isset( $this->attributes['metaRight'] ) ? $this->attributes['metaRight'] : array();
		foreach ( $rights as $index => $right ) {
			$right_html .= $this->render_meta( $right['value'] );
		}
		$right_html = "<div class='meta-part meta-right'>{$right_html}</div>";

		return $left_html . $right_html;
	}

	/**
	 * Set meta components element.
	 *
	 * @param integer $post_id Post ID.
	 */
	private function set_meta_components( $post_id ) {
		$meta_components       = array(
			'author'   => $this->render_author(),
			'category' => $this->render_category(),
			'comment'  => $this->render_comment(),
			'date'     => $this->render_date(),
		);
		$meta_components       = apply_filters( 'gvnews_post_meta_components', $meta_components, $this->attributes, $post_id );
		$this->meta_components = $meta_components;
	}

	/**
	 * Method render_meta
	 *
	 * @param string $meta meta.
	 *
	 * @return array
	 */
	public function render_meta( $meta ) {
		if ( empty( $meta ) ) {
			return '';
		}

		if ( isset( $this->meta_components[ $meta ] ) ) {
			$element          = $this->meta_components[ $meta ];
			$additional_class = '';
			if ( isset( $element['element'] ) ) {
				$additional_class = $element['additional_class'];
				$element          = $element['element'];
			}
			return '<div class="meta-items ' . $additional_class . '">'
				. $element .
			'</div>';
		}
	}

	// === PRIVATE ===

	/**
	 * Method render_category
	 *
	 * @return string
	 */
	public function render_category() {
		return '<div class="gvnews-meta-category meta-items">
                <span>
                    <span class="meta-text">' . esc_html__( 'in', 'gutenverse-news' ) . '</span>
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
		$icon_comment = Svg_Icons::render_svg_icon( 'far fa-comment' );

		return '<div class="gvnews-meta-comment meta-items">
					<a aria-label="' . esc_attr__( 'Comments', 'gutenverse-news' ) . '" href="' . esc_url( gvnews_get_respond_link() ) . '">' . $icon_comment . ' ' . esc_html( gvnews_get_comments_number() ) . '</a>
				</div>';
	}

	/**
	 * Method render_author
	 *
	 * @return string
	 */
	public function render_author() {
		global $post;
		$avatar = isset( $this->attributes['showAvatar'] ) && $this->attributes['showAvatar'] ? get_avatar( get_the_author_meta( 'ID', $post->post_author ), 80, null, get_the_author_meta( 'display_name', $post->post_author ) ) : '';
		return '<div class="gvnews-meta-author meta-items">' .
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
	 * @return string
	 */
	public function render_date() {
		global $post;
		$date        = gutenverse_get_post_date( $post, 'default', $this->attributes['postDate'], '' );
		$show_prefix = isset( $this->attributes['datePrefix'] ) && $this->attributes['datePrefix'] ? ' with-prefix' : '';
		return '<div class="gvnews-meta-date meta-items ' . $show_prefix . '">' .
			'<a aria-label="' . esc_attr( $date ) . '" href="#">' . $date . '</a>' .
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
	private function is_last_item( $index, $array_length ) {
		if ( $index === $array_length - 1 ) {
			return ' is-last-item ';
		}
		return '';
	}
}
