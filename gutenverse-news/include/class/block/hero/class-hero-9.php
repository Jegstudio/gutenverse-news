<?php
/**
 * Hero 9
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block\Hero;

use GUTENVERSE\NEWS\Block\Hero\Hero_View_Abstract;

/**
 * Hero_9
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Hero_9 extends Hero_View_Abstract {


	/**
	 * Number post
	 *
	 * @var int
	 */
	protected $number_post = 2;

	/**
	 * Method render_block_type
	 *
	 * @param object  $post post.
	 * @param integer $index index.
	 *
	 * @return string
	 */
	public function render_block_type( $post, $index ) {
		$index = ++$index;
		if ( $post ) {
			$post_id          = $post->ID;
			$overlay_icon     = $this->get_overlay_icon( $post_id );
			$primary_category = $this->get_primary_category( $post_id );
			$image            = $this->get_thumbnail( $post_id, 'gvnews-featured-750' );
			$permalink        = esc_url( get_the_permalink( $post ) );

			return '<article ' . gvnews_post_class( "gvnews_post gvnews_hero_item_{$index}", $post_id ) . '>
                        <div class="gvnews_block_container"' . $overlay_icon['with_overlay_icon'] . '">
                            ' . gvnews_edit_post( $post_id ) . "
							{$overlay_icon['overlay_icon']}
                            <div class=\"gvnews_thumb\">
                                <a href=\"{$permalink}\" aria-label=\"" . esc_attr( get_the_title( $post ) ) . "\">{$image}</a>
                            </div>
                            <div class=\"gvnews_postblock_content\">
                                <div class=\"gvnews_post_category\">{$primary_category}</div>
                                <div class=\"gvnews_post_info\">
                                    <{$this->post_title_tag} class=\"gvnews_post_title\">
                                        <a href=\"{$permalink}\" aria-label=\"" . esc_attr( get_the_title( $post ) ) . "\">" . esc_attr( get_the_title( $post ) ) . "</a>
                                    </{$this->post_title_tag}>
                                    {$this->post_meta_2($post)}
                                </div>
                            </div>
                        </div>
                    </article>";
		}

		$html_classes = gvnews_build_html_classes(
			array(
				'gvnews_post',
				'gvnews_hero_item_' . esc_attr( $index ),
				'gvnews_hero_empty',
			)
		);

		return '<article class="' . $html_classes . '">
                    <div class="gvnews_block_container"></div>
                </article>';
	}

	/**
	 * Method render_element
	 *
	 * @param array $result result.
	 *
	 * @return string
	 */
	public function render_element( $result ) {
		$output      = '';
		$number_post = $this->get_number_post();

		for ( $i = 0; $i < $number_post; $i++ ) {
			$item    = isset( $result[ $i ] ) ? $result[ $i ] : '';
			$output .= $this->render_block_type( $item, $i );
		}

		return $output;
	}
}
