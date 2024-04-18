<?php
/**
 * Module 10
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block\Module;

/**
 * Module_10
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Module_10 extends Module_View_Abstract {


	/**
	 * Method render_block_type_1
	 *
	 * @param object $post       post.
	 * @param string $image_size image size.
	 *
	 * @return string
	 */
	public function render_block_type_1( $post, $image_size ) {
		$permalink = esc_url( get_the_permalink( $post ) );
		$post_id   = $post->ID;

		return '<article ' . gvnews_post_class( 'gvnews_post gvnews_pl_lg_4', $post_id ) . ">
                    <header class=\"gvnews_postblock_heading\">
                        <h3 class=\"gvnews_post_title\">
                            <a href=\"{$permalink}\">" . esc_attr( get_the_title( $post ) ) . "</a>
                        </h3>
                        {$this->post_meta_1($post)}
                    </header>
                    <div class=\"gvnews_postblock_content\">
                    <div class=\"gvnews_thumb\">
                            " . gvnews_edit_post( $post_id, 'right' ) . "
                            <a href=\"{$permalink}\">{$this->get_thumbnail($post_id,$image_size)}</a>
                            <div class=\"gvnews_post_category\">
                                <span>{$this->get_primary_category($post_id)}</span>
                            </div>
                        </div>
                        <div class=\"gvnews_post_excerpt\">
                            <p>" . esc_attr( $this->get_excerpt( $post ) ) . "</p>
                        </div>
                        <a href=\"{$permalink}\" class=\"gvnews_readmore\">" . esc_html__( 'Read more', 'gutenverse-news' ) . '</a>
                    </div>
                </article>';
	}

	/**
	 * Method render_output
	 *
	 * @param array  $attr         attribute.
	 * @param string $column_class column class.
	 *
	 * @return string
	 */
	public function render_output( $attr, $column_class ) {
		$results    = isset( $attr['results'] ) ? $attr['results'] : $this->build_query( $attr );
		$navigation = $this->render_navigation( $attr, $results['next'], $results['prev'], $results['total_page'] );
		$content    = ! empty( $results['result'] ) ? $this->render_column( $results['result'], $column_class ) : $this->empty_content();

		return "<div class=\"gvnews_block_container\">
                    {$this->get_content_before($attr)}
                    {$content}
                    {$this->get_content_after($attr)}
                </div>
                <div class=\"gvnews_block_navigation\">
                    {$this->get_navigation_before($attr)}
                    {$navigation}
                    {$this->get_navigation_after($attr)}
                </div>";
	}

	/**
	 * Method render_column
	 *
	 * @param array  $result       result.
	 * @param string $column_class column class.
	 *
	 * @return string
	 */
	public function render_column( $result, $column_class ) {
		return "<div class=\"gvnews_posts gvnews_load_more_flag\"> {$this->build_column($result,$column_class, false)} </div>";
	}

	/**
	 * Method render_column_alt
	 *
	 * @param array  $result       result.
	 * @param string $column_class column class.
	 *
	 * @return string
	 */
	public function render_column_alt( $result, $column_class ) {
		return $this->build_column( $result, $column_class, true );
	}

	/**
	 * Method build_column
	 *
	 * @param array   $result result.
	 * @param string  $column_class column class.
	 * @param boolean $is_ajax is ajax.
	 *
	 * @return string
	 */
	public function build_column( $result, $column_class, $is_ajax = false ) {
		$image_size = 'gvnews-750x375';
		if ( 'gvnews_col_1o3' === $column_class ) {
			$image_size = 'gvnews-360x180';
		} elseif ( 'gvnews_col_3o3' === $column_class ) {
			$image_size = 'gvnews-1140x570';
		}

		$first_block = '';
		$size        = count( $result );

		for ( $i = 0; $i < $size; $i++ ) {
			$first_block .= $this->render_block_type_1( $result[ $i ], $image_size );
		}

		return $first_block;
	}
}
