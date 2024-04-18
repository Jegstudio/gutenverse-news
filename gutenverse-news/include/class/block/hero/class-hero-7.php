<?php
/**
 * Hero 7
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block\Hero;

use GUTENVERSE\NEWS\Block\Hero\Hero_View_Abstract;

/**
 * Hero_7
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Hero_7 extends Hero_View_Abstract {


	/**
	 * Number post
	 *
	 * @var int
	 */
	protected $number_post = 4;

	/**
	 * Method render_block
	 *
	 * @param object  $post  post.
	 * @param integer $index index.
	 *
	 * @return string
	 */
	public function render_block( $post, $index ) {
		$index = ++$index;

		if ( $post ) {
			$post_id   = $post->ID;
			$permalink = esc_url( get_the_permalink( $post ) );

			return '<article ' . gvnews_post_class( "gvnews_post gvnews_hero_item_{$index}", $post_id ) . '>
                        <div class="gvnews_block_container">
                            ' . gvnews_edit_post( $post_id ) . "
                            <span class=\"gvnews_postformat_icon\"></span>
                            <div class=\"gvnews_thumb\">
                                <a href=\"{$permalink}\" >{$this->get_thumbnail($post_id, 'gvnews-featured-750')}</a>
                            </div>
                            <div class=\"gvnews_postblock_content\">
                                <div class=\"gvnews_post_category\">
                                    {$this->get_primary_category($post_id)}
                                </div>
                                <div class=\"gvnews_post_info\">
                                    <h2 class=\"gvnews_post_title\">
                                        <a href=\"{$permalink}\">" . esc_attr( get_the_title( $post ) ) . "</a>
                                    </h2>
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

		return '<article cclass="' . $html_classes . '">
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
		$number_post = $this->get_number_post() - 1;
		for ( $i = 0; $i <= $number_post; $i++ ) {
			$item    = isset( $result[ $i ] ) ? $result[ $i ] : '';
			$output .= $this->render_block( $item, $i );
		}

		return $output;
	}
}
