<?php
/**
 * Post Comment
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block;

use GUTENVERSE\NEWS\Util\Comment_Walker;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


/**
 * Post_Comment
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Post_Comment extends Post_Guten {

	/**
	 * Method get_custom_classes;
	 *
	 * @return string
	 */
	public function get_custom_classes() {
		return 'gvnews-post-comment';
	}

	/**
	 * Method get_content
	 *
	 * @return string
	 */
	public function get_content() {
		add_filter( 'comments_open', '__return_true' );
		return $this->comments_template();
	}

	/**
	 * Method comments_template
	 *
	 * @return mixed
	 */
	private function comments_template() {
		global $post;
		ob_start();
		if ( comments_open() || get_comments_number() ) {
			if ( get_option( 'comment_registration' ) && ! is_user_logged_in() ) {
				echo '<div id="comments" class="comment-wrapper section">';

				echo "<span class='comment-login'>" .
					sprintf(
						gvnews_print_translation( "Please <a href='%s' class='%s'>login</a> to join discussion", 'gutenverse-news', 'please_login_join_discussion' ),
						wp_login_url( esc_url( gvnews_home_url_multilang( '/' ) ), false ),
						''
					)
					. '</span>';

				echo '</div>';
			} else {
				if ( $post->comment_count ) { ?>
					<div id="comments" class="gvnews-comments">
						<h3 class="comments-title">
							Comments
							<span class="count"><?php echo esc_html( number_format_i18n( gvnews_get_comments_number() ) ); ?></span>
						</h3>
						<div class="gvnews-commentlist-container">
							<ol class="commentlist">
									<?php
										wp_list_comments(
											array(
												'page'        => $post->ID,
												'avatar_size' => '55',
												'short_ping'  => true,
												'walker'      => new Comment_Walker(),
												'attributes'  => $this->attributes,
											)
										);
									?>
							</ol>
						</div>
						<?php if ( get_comment_pages_count() > 1 && get_option( 'page_comments' ) ) : ?>
						<div class="comment-navigation navigation">
							<div class="prev-comment">
								<?php next_comments_link( gvnews_print_translation( 'Previous', 'gutenverse-news', 'previous' ) ); ?>
							</div>
							<div class="next-comment">
								<?php previous_comments_link( gvnews_print_translation( 'Next', 'gutenverse-news', 'next' ) ); ?>
							</div>
						</div>
						<?php endif; ?>
					</div>
					<hr class="separator"></hr>
					<?php
				}

				comment_form();
			}
		}

		return ob_get_clean();
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
