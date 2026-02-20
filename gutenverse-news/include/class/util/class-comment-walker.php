<?php
/**
 * Comment_Walker
 *
 * @author  Jegstudio
 * @since   .0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Util;

/**
 * Comment_Wlaker
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Comment_Walker extends \Walker_Comment {

	/**
	 * Output a single comment.
	 *
	 * @access protected
	 * @since 2.0.0
	 *
	 * @see wp_list_comments()
	 *
	 * @param object $comment Comment to display.
	 * @param int    $depth   Depth of comment.
	 * @param array  $args    An array of arguments.
	 */
	protected function comment( $comment, $depth, $args ) {
		if ( 'div' === $args['style'] ) {
			$tag       = 'div';
			$add_below = 'comment';
		} else {
			$tag       = 'li';
			$add_below = 'div-comment';
		}

		$icon_clock = Svg_Icons::render_svg_icon( 'fas fa-clock' );
		?>
		<<?php echo esc_attr( $tag ); ?> 		<?php comment_class( $this->has_children ? 'parent' : '' ); ?> id="comment-<?php comment_ID(); ?>">
			<?php if ( 'div' !== $args['style'] ) : ?>
				<div id="div-comment-<?php comment_ID(); ?>" class="comment-body">
				<?php endif; ?>
				<div class="comment-author vcardi">
					<?php
					if ( 0 !== $args['avatar_size'] ) {
						echo get_avatar( $comment, $args['avatar_size'] );
					}
					?>
					<?php printf( __( '<cite class="fn">%s</cite> <span class="says">says:</span>', 'gutenverse-news' ), get_comment_author_link() ); ?>
				</div>
				<?php if ( '0' === $comment->comment_approved ) : ?>
					<em class="comment-awaiting-moderation">
						<?php gvnews_print_translation( 'Your comment is awaiting moderation', 'gutenverse-news', 'comment_moderation' ); ?>
					</em>
					<br />
				<?php endif; ?>

				<div class="comment-meta commentmetadata">
					<?php echo $icon_clock; ?>
					<a href="<?php echo esc_url( get_comment_link( $comment->comment_ID, $args ) ); ?>">
						<?php echo gvnews_ago_time( human_time_diff( mysql2date( 'U', $comment->comment_date ), current_time( 'timestamp' ) ) ); ?>
					</a>
					<?php edit_comment_link( gvnews_print_translation( '(Edit)', 'gutenverse-news', 'edit_comment' ), '&nbsp;&nbsp;', '' ); ?>
				</div>

				<div class="comment-content">
					<?php
					comment_text(
						get_comment_ID(),
						array_merge(
							$args,
							array(
								'add_below' => $add_below,
								'depth'     => $depth,
								'max_depth' => $args['max_depth'],
							)
						)
					);
					?>
				</div>

				<?php
				comment_reply_link(
					array_merge(
						$args,
						array(
							'add_below' => $add_below,
							'depth'     => $depth,
							'max_depth' => $args['max_depth'],
							'before'    => '<div class="reply">',
							'after'     => '</div>',
						)
					)
				);
				?>

				<?php if ( 'div' !== $args['style'] ) : ?>
				</div>
			<?php endif; ?>
			<?php
	}

	/**
	 * Outputs a comment in the HTML5 format.
	 *
	 * @since 3.6.0
	 *
	 * @see wp_list_comments()
	 *
	 * @param WP_Comment $comment Comment to display.
	 * @param int        $depth   Depth of the current comment.
	 * @param array      $args    An array of arguments.
	 */
	protected function html5_comment( $comment, $depth, $args ) {
		$tag = ( 'div' === $args['style'] ) ? 'div' : 'li';

		$commenter          = wp_get_current_commenter();
		$show_pending_links = ! empty( $commenter['comment_author'] );

		if ( $commenter['comment_author_email'] ) {
			$moderation_note = __( 'Your comment is awaiting moderation.' );
		} else {
			$moderation_note = __( 'Your comment is awaiting moderation. This is a preview; your comment will be visible after it has been approved.' );
		}
		?>
			<<?php echo $tag; ?> id="comment-<?php comment_ID(); ?>" <?php comment_class( $this->has_children ? 'parent' : '', $comment ); ?>>
				<article id="div-comment-<?php comment_ID(); ?>" class="comment-body">
					<footer class="comment-meta">
						<div class="comment-author vcard">
							<?php
							if ( 0 !== $args['avatar_size'] ) {
								echo get_avatar( $comment, $args['avatar_size'] );
							}
							?>
							<?php
							$comment_author = get_comment_author_link( $comment );

							if ( '0' === $comment->comment_approved && ! $show_pending_links ) {
								$comment_author = get_comment_author( $comment );
							}

							printf(
								/* translators: %s: Comment author link. */
								__( '%s <span class="says">says:</span>' ),
								sprintf( '<b class="fn">%s</b>', $comment_author )
							);
							?>
						</div><!-- .comment-author -->

						<div class="comment-metadata">
							<?php
							printf(
								'<a href="%s"><time datetime="%s">%s</time></a>',
								esc_url( get_comment_link( $comment, $args ) ),
								get_comment_time( 'c' ),
								sprintf(
									/* translators: 1: Comment date, 2: Comment time. */
									__( '%1$s at %2$s' ),
									get_comment_date( '', $comment ),
									get_comment_time()
								)
							);

							edit_comment_link( __( 'Edit' ), ' <span class="edit-link">', '</span>' );
							?>
						</div><!-- .comment-metadata -->

						<?php if ( '0' === $comment->comment_approved ) : ?>
							<em class="comment-awaiting-moderation"><?php echo $moderation_note; ?></em>
						<?php endif; ?>
					</footer><!-- .comment-meta -->

					<div class="comment-content">
						<?php comment_text(); ?>
					</div><!-- .comment-content -->

					<?php
					if ( '1' === $comment->comment_approved || $show_pending_links ) {
						comment_reply_link(
							array_merge(
								$args,
								array(
									'add_below' => 'div-comment',
									'depth'     => $depth,
									'max_depth' => $args['max_depth'],
									'before'    => '<div class="reply">',
									'after'     => '</div>',
								)
							)
						);
					}
					?>
				</article><!-- .comment-body -->
				<?php
	}
}
