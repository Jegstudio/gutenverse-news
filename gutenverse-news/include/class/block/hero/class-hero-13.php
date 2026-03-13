<?php
/**
 * Module 13
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block\Hero;

use GUTENVERSE\NEWS\Block\Hero\Hero_View_Abstract;

/**
 * Hero_13
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Hero_13 extends Hero_View_Abstract {


	/**
	 * Number Post
	 *
	 * @var int
	 */
	protected $number_post = 1;


	/**
	 * Method get_module_name
	 *
	 * @return string
	 */
	public function get_module_name() {
		return esc_html__( 'Gutenverse News - Hero 13', 'gutenverse-news' );
	}

	/**
	 * Method render_block_type_1
	 *
	 * @param object $post post.
	 *
	 * @return string|null
	 */
	public function render_block_type_1( $post ) {
		if ( $post ) {
			$post_id      = $post->ID;
			$overlay_icon = $this->get_overlay_icon( $post_id );
			$permalink    = esc_url( get_the_permalink( $post ) );

			return '<article ' . gvnews_post_class( 'gvnews_post gvnews_hero_item_1', $post_id ) . '>
                        <div class="gvnews_block_container"' . $overlay_icon['with_overlay_icon'] . '">
                            ' . gvnews_edit_post( $post_id ) . "
							{$overlay_icon['overlay_icon']}
                            <div class=\"gvnews_thumb\">
                                <a href=\"{$permalink}\" aria-label=\"" . esc_attr( get_the_title( $post ) ) . "\">{$this->get_thumbnail($post_id, 'gvnews-featured-1140')}</a>
                            </div>
                            <div class=\"gvnews_postblock_content\">
                                <div class=\"gvnews_post_category\">{$this->get_primary_category($post_id)}</div>
                                <div class=\"gvnews_post_info\">
                                    <{$this->post_title_tag} class=\"gvnews_post_title\">
                                        <a href=\"{$permalink}\" aria-label=\"" . esc_attr( get_the_title( $post ) ) . "\">" . esc_attr( get_the_title( $post ) ) . "</a>
                                    </{$this->post_title_tag}>
                                    {$this->post_meta_3($post)}
                                </div>
                            </div>
                        </div>
                    </article>";
		}
		return null;
	}

	/**
	 * Method render_element
	 *
	 * @param array $result result.
	 *
	 * @return string
	 */
	public function render_element( $result ) {
		return $this->render_block_type_1( $result[0] );
	}
}
