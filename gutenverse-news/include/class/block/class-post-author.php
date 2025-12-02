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
	 * @return array
	 */
	public function social_icon_list() {
		return array(
			'url'        => 'fa fa-globe',
			'facebook'   => 'fab fa-facebook',
			'twitter'    => 'fab fa-twitter',
			'linkedin'   => 'fab fa-linkedin',
			'pinterest'  => 'fab fa-pinterest',
			'behance'    => 'fab fa-behance',
			'github'     => 'fab fa-github',
			'flickr'     => 'fab fa-flickr',
			'tumblr'     => 'fab fa-tumblr',
			'dribbble'   => 'fab fa-dribbble',
			'soundcloud' => 'fab fa-soundcloud',
			'instagram'  => 'fab fa-instagram',
			'vimeo'      => 'fab fa-vimeo',
			'youtube'    => 'fab fa-youtube',
			'vk'         => 'fab fa-vk',
			'reddit'     => 'fab fa-reddit',
			'weibo'      => 'fab fa-weibo',
			'rss'        => 'fa fa-rss',
			'twitch'     => 'fab fa-twitch',
			'tiktok'     => 'fa-brands fa-tiktok',
			'threads'    => 'fa-brands fa-threads',
			'xing'       => 'fab fa-xing',
		);
	}

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

		foreach ( $this->social_icon_list() as $social => $icon ) {

			$url = get_the_author_meta( $social, $author_id );

			if ( '' !== $url ) {
				$social_elements .=
					'<a href="' . $url . '" class="' . $social . '">
						<i class="' . $icon . '"></i>
					</a>';
			}
		}

		return $social_elements;
	}
}
