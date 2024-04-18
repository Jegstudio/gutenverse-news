<?php
/**
 * Hero 3
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block\Hero;

use GUTENVERSE\NEWS\Block\Hero\Hero_View_Abstract;

/**
 * Hero_3
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Hero_3 extends Hero_View_Abstract {


	/**
	 * Number post
	 *
	 * @var int
	 */
	protected $number_post = 4;

	/**
	 * Method render_block_type
	 *
	 * @param object  $post  post.
	 * @param integer $index index.
	 * @param integer $type  type.
	 *
	 * @return string
	 */
	public function render_block_type( $post, $index, $type = 1 ) {
		$is_column_1 = 1 === $type;
		$index       = 1 === $type ? $index : $index + 1;

		if ( $post ) {
			$post_id   = $post->ID;
			$permalink = esc_url( get_the_permalink( $post ) );
			$image     = $index > 2 ? 'gvnews-350x250' : 'gvnews-featured-750';
			$meta      = $is_column_1 ? $this->post_meta_3( $post ) : $this->post_meta_2( $post );

			return '<article ' . gvnews_post_class( "gvnews_post gvnews_hero_item_{$index}", $post_id ) . '>
                        <div class="gvnews_block_container">
                            ' . gvnews_edit_post( $post_id ) . "
                            <span class=\"gvnews_postformat_icon\"></span>
                            <div class=\"gvnews_thumb\">
                                <a href=\"{$permalink}\" >{$this->get_thumbnail($post_id,$image)}</a>
                            </div>
                            <div class=\"gvnews_postblock_content\">
                                <div class=\"gvnews_post_category\">{$this->get_primary_category($post_id)}</div>
                                <div class=\"gvnews_post_info\">
                                    <h2 class=\"gvnews_post_title\">
                                        <a href=\"{$permalink}\" >" . esc_attr( get_the_title( $post ) ) . "</a>
                                    </h2>
                                    {$meta}
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
		$first_block  = $this->render_block_type( $result[0], 1, 1 );
		$second_block = '';
		$number_post  = $this->get_number_post() - 1;

		for ( $i = 1; $i <= $number_post; $i++ ) {
			$item          = isset( $result[ $i ] ) ? $result[ $i ] : '';
			$second_block .= $this->render_block_type( $item, $i, 2 );
		}

		return "{$first_block}
                <div class=\"gvnews_heroblock_scroller\">
                    {$second_block}
                </div>";
	}
}
