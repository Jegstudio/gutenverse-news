<?php
/**
 * Previouse Next Post
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block;

use GUTENVERSE\NEWS\Block\Post_Guten;


if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


/**
 * Post_Prev_Next
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Post_Prev_Next extends Post_Guten {
	/**
	 * Hold Post Related Classname
	 *
	 * @var array
	 */
	protected $class_name = '';
	/**
	 * Method get_content
	 *
	 * @return string
	 */
	public function get_content() {
		$content = $this->get_next_prev_block();

		return "<div class='gvnews_prev_next_container gvnews_custom_prev_next_wrapper gvnews_prevnext_post'>                
                {$content}                
            </div>";
	}
	/**
	 * Method get_prev_next
	 *
	 * @return string
	 */
	public function get_next_prev_block() {
		$content   = '';
		$prev_post = get_previous_post();
		if ( ! empty( $prev_post ) ) {
			$href     = esc_url( get_permalink( $prev_post->ID ) );
			$title    = wp_kses_post( get_the_title( $prev_post->ID ) );
			$content .= '
			<a href="' . $href . '" class="post prev-post">
				<span class="caption">Previous Post</span>
				<h3 class="post-title">' . $title . '</h3>
			</a>
			';
		}
		$next_post = get_next_post();
		if ( ! empty( $next_post ) ) {
			$href     = esc_url( get_permalink( $next_post->ID ) );
			$title    = wp_kses_post( get_the_title( $next_post->ID ) );
			$content .= '
			<a href="' . $href . '" class="post next-post">
				<span class="caption">Next Post</span>
				<h3 class="post-title">' . $title . '</h3>
			</a>
			';
		}
		return $content;
	}

	/**
	 * Check if this block is already deprecated.
	 *
	 * @return boolean
	 */
	public function check_deprecated() {
		return current_user_can( 'edit_pages' );
	}
}
