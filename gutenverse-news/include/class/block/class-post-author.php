<?php
/**
 * Post Author
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block;

use Gutenverse\Framework\Block\Block_Abstract;
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
class Post_Author extends Post_Guten {

	/**
	 * Social media array.
	 *
	 * @var array
	 */
	protected $socials = array(
		'url'        => 'fa-globe',
		'facebook'   => 'fa-facebook-official',
		'twitter'    => 'fa-twitter',
		'linkedin'   => 'fa-linkedin',
		'pinterest'  => 'fa-pinterest',
		'behance'    => 'fa-behance',
		'github'     => 'fa-github',
		'flickr'     => 'fa-flickr',
		'tumblr'     => 'fa-tumblr',
		'dribbble'   => 'fa-dribbble',
		'soundcloud' => 'fa-soundcloud',
		'instagram'  => 'fa-instagram',
		'vimeo'      => 'fa-vimeo',
		'youtube'    => 'fa-youtube-play',
		'vk'         => 'fa-vk',
		'reddit'     => 'fa-reddit',
		'weibo'      => 'fa-weibo',
		'rss'        => 'fa-rss',
		'twitch'     => 'fa-twitch',
		'tiktok'     => 'jeg-icon icon-tiktok',
		'threads'    => 'jeg-icon icon-threads',
		'xing'       => 'fa-xing',
		'bluesky'    => 'jeg-icon icon-bluesky',
	);

	/**
	 * Method get_content
	 *
	 * @return string
	 */
	public function get_content() {
		$post_id   = ! empty( $this->context['postId'] ) ? esc_html( $this->context['postId'] ) : get_the_ID();
		$author_id = is_author() ? get_queried_object_id() : get_post_field( 'post_author', $post_id );
		$author    = array(
			'id'   => $author_id,
			'name' => get_the_author_meta( 'display_name', $author_id ),
			'url'  => get_author_posts_url( $author_id ),
			'desc' => get_the_author_meta( 'description', $author_id ),
		);
		$add       = apply_filters( 'gvnews_post_author_components', '', $author );

		$block = '<div class="gvnews-authorbox">
					<div class="gvnews-author-image">' .
						get_avatar( $author['id'], 80, null, $author['name'] ) .
					'</div>' .
					'<div class="gvnews-author-content">
						<h3 class="gvnews-author-name">
							<a href="' . esc_url( $author['url'] ) . '">' . esc_html( $author['name'] ) . '</a>
						</h3>
						<p>' . esc_html( $author['desc'] ) . '</p>
						<div class="gvnews-author-socials">' .
							$this->generate_social_element( $author_id ) .
						'</div>
						' . $add . '
					</div>
				</div>';

		return $block;
	}

	/**
	 * Render view in editor
	 */
	public function render_gutenberg() {
		return null;
	}

	/**
	 * Render view in frontend
	 */
	public function render_frontend() {
		$element_id      = $this->get_element_id();
		$display_classes = $this->set_display_classes();
		$custom_classes = $this->get_custom_classes();

		return '<div class="' .
							$element_id .
							$display_classes .
							// $animation_class .
							$custom_classes .
							'gvnews-post-author guten-element"
				>' . $this->render_content() . '</div>';
	}

	/**
	 * Method generate_social_element
	 *
	 * @param string $author_id id of author.
	 *
	 * @return string
	 */
	protected function generate_social_element( $author_id ) {
		$social_elements = '';

		foreach ( $this->socials as $social => $icon ) {

			$url = get_the_author_meta( $social, $author_id );

			if ( '' !== $url ) {
				$social_elements .=
					'<a href="' . $url . '" class="' . $social . '">
						<i class="fa ' . $icon . '"></i>
					</a>';
			}
		}

		return $social_elements;
	}
}
