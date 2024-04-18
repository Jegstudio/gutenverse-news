<?php
/**
 * Hero 14
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block\Hero;

use GUTENVERSE\NEWS\Block\Hero\Hero_View_Abstract;

/**
 * Hero_14
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Hero_14 extends Hero_View_Abstract {


	/**
	 * Number post
	 *
	 * @var int
	 */
	protected $number_post = 8;

	/**
	 * Method render_block_type_1
	 *
	 * @param array $post post.
	 *
	 * @return string
	 */
	public function render_block_type_1( $post ) {
		if ( $post ) {
			$post_id   = $post->ID;
			$permalink = esc_url( get_the_permalink( $post ) );

			return '<article ' . gvnews_post_class( 'gvnews_post gvnews_pl_lg_7', $post_id ) . '>
                        <div class="gvnews_thumb">
                            ' . gvnews_edit_post( $post_id ) . "
                            <a href=\"{$permalink}\">" . apply_filters( 'gvnews_image_thumbnail', $post_id, 'gvnews-750x536' ) . "</a>
                            <div class=\"gvnews_post_category\">
                                {$this->get_primary_category($post_id)}
                            </div>
                        </div>
                        <div class=\"gvnews_postblock_content\">
                            <h2 class=\"gvnews_post_title\">
                                <a href=\"{$permalink}\">" . esc_attr( get_the_title( $post ) ) . "</a>
                            </h2>
                            <div class=\"gvnews_post_meta\">
                                {$this->post_meta_3($post)}
                            </div>
                            <div class=\"gvnews_post_excerpt\">
                                <p>" . esc_attr( $this->get_excerpt( $post ) ) . "</p>
                                <a href=\"{$permalink}\" class=\"gvnews_readmore\">" . esc_html__( 'Read more', 'gutenverse-news' ) . '</a>
                            </div>
                        </div>
                    </article>';
		}
		return '<article class="gvnews_post gvnews_pl_md_box gvnews_hero_empty">
                    <div class="gvnews_block_container"></div>
                </article>';
	}

	/**
	 * Method render_block_type_2
	 *
	 * @param object $post post.
	 *
	 * @return string
	 */
	public function render_block_type_2( $post ) {
		if ( $post ) {
			$post_id = $post->ID;

			return '<article ' . gvnews_post_class( 'gvnews_post gvnews_pl_sm_2', $post_id ) . ">
                        <div class=\"gvnews_postblock_content\">
                            <div class=\"gvnews_post_category\">
                                {$this->get_primary_category($post_id)}
                            </div>
                            <h3 class=\"gvnews_post_title\">
                                <a href=\"" . esc_url( get_the_permalink( $post ) ) . '">' . esc_attr( get_the_title( $post ) ) . "</a>
                            </h3>
                            {$this->post_meta_2($post)}
                        </div>
                    </article>";
		}
		return '<article class="gvnews_post gvnews_pl_md_box gvnews_hero_empty">
                    <div class="gvnews_block_container"></div>
                </article>';
	}

	/**
	 * Method render_block_type_3
	 *
	 * @param object $post post.
	 *
	 * @return string
	 */
	public function render_block_type_3( $post ) {
		if ( $post ) {
			$post_id   = $post->ID;
			$permalink = esc_url( get_the_permalink( $post ) );

			return '<article ' . gvnews_post_class( 'gvnews_post gvnews_pl_md_box', $post_id ) . '>
                        <div class="box_wrap">
                            <div class="gvnews_thumb">
                                ' . gvnews_edit_post( $post_id ) . "
                                <a href=\"{$permalink}\">" . apply_filters( 'gvnews_image_thumbnail', $post_id, 'gvnews-350x250' ) . "</a>
                            </div>
                            <div class=\"gvnews_postblock_content\">
                                <h3 class=\"gvnews_post_title\">
                                    <a href=\"{$permalink}\">" . esc_attr( get_the_title( $post ) ) . "</a>
                                </h3>
                                {$this->post_meta_2($post)}
                            </div>
                        </div>
                    </article>";
		}
		return '<article class="gvnews_post gvnews_pl_md_box gvnews_hero_empty">
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
		$first_block  = '';
		$second_block = '';
		$third_block  = '';
		$number_post  = $this->get_number_post() - 1;

		for ( $i = 0; $i <= $number_post; $i++ ) {
			$item = isset( $result[ $i ] ) ? $result[ $i ] : '';
			if ( $i < 1 ) {
				$first_block .= $this->render_block_type_1( $item );
			} elseif ( $i < 5 ) {
				$second_block .= $this->render_block_type_2( $item );
			} else {
				$third_block .= $this->render_block_type_3( $item );
			}
		}

		return "<div class=\"gvnews_postbig\">
                    {$first_block}
                </div>
                <div class=\"gvnews_postsmall left\">
                    {$second_block}
                </div>
                <div class=\"gvnews_postsmall right\">
                    {$third_block}
                </div>";
	}

	/**
	 * Method render_output
	 *
	 * @param array  $result       result.
	 * @param array  $attr         attribute attribute.
	 * @param string $column_class column class.
	 *
	 * @return string
	 */
	public function render_output( $result, $attr, $column_class ) {
		$html_classes = gvnews_build_html_classes(
			array(
				'gvnews_heropost',
				'gvnews_heropost_14',
				'gvnews_heropost_1',
				'gvnews_postblock',
				esc_attr( $column_class ),
				esc_attr( $this->get_vc_class_name() ),
			)
		);

		return "<div {$this->element_id($attr)} class=\"" . $html_classes . "\">
                    {$this->render_content($result)}
                </div>";
	}

	/**
	 * Method get_primary_category
	 *
	 * @param integer $post_id post id.
	 *
	 * @return string
	 */
	public function get_primary_category( $post_id ) {
		$cat_id       = gvnews_get_primary_category( $post_id );
		$inline_style = '';
		$category     = '';
		$css          = '';

		if ( $cat_id ) {
			$category = get_category( $cat_id );
			$class    = '';

			if ( isset( $category->slug ) && $category->slug ) {
				$class = 'class="category-' . esc_attr( $category->slug ) . '"';
			}

			$category = '<a href="' . esc_url( get_category_link( $cat_id ) ) . "\" {$inline_style} {$class}>" . esc_attr( $category->name ) . '</a>';
		}

		return $category;
	}

	/**
	 * Method set_hero_option
	 *
	 * @return void
	 */
	public function set_hero_option() {
		$this->options['date_format']        = 'default';
		$this->options['date_format_custom'] = 'Y/m/d';
	}
}
