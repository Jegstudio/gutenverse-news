<?php
/**
 * Module 2
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block\Module;

/**
 * Module_2
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Module_2 extends Module_View_Abstract {


	/**
	 * Method render_block_type_1
	 *
	 * @param object $post       post.
	 * @param stirng $image_size image size.
	 *
	 * @return string
	 */
	public function render_block_type_1( $post, $image_size ) {
		$post_id   = $post->ID;
		$permalink = esc_url( get_the_permalink( $post ) );

		return '<div class="gvnews_thumb">
                    ' . gvnews_edit_post( $post_id, 'right' ) . "
                    <a href=\"{$permalink}\">{$this->get_thumbnail($post_id,$image_size)}</a>
                    <div class=\"gvnews_post_category\">
                        <span>{$this->get_primary_category($post_id)}</span>
                    </div>
                </div>
                <div class=\"gvnews_postblock_content\">
                    <h3 class=\"gvnews_post_title\">
                        <a href=\"{$permalink}\">" . esc_attr( get_the_title( $post ) ) . "</a>
                    </h3>
                    {$this->post_meta_1($post)}
                    <div class=\"gvnews_post_excerpt\">
                        <p>" . esc_attr( $this->get_excerpt( $post ) ) . "</p>
                        <a href=\"{$permalink}\" class=\"gvnews_readmore\">" . esc_html__( 'Read more', 'gutenverse-news' ) . '</a>
                    </div>
                </div>';
	}


	/**
	 * Method render_block_type_2
	 *
	 * @param object $post       post.
	 * @param string $image_size image size.
	 *
	 * @return string
	 */
	public function render_block_type_2( $post, $image_size ) {
		$post_id          = $post->ID;
		$additional_class = ( ! has_post_thumbnail( $post_id ) ) ? ' no_thumbnail' : '';
		$permalink        = esc_url( get_the_permalink( $post ) );

		return '<article ' . gvnews_post_class( 'gvnews_post gvnews_pl_sm' . $additional_class, $post_id ) . '>
                    <div class="gvnews_thumb">
                        ' . gvnews_edit_post( $post_id ) . "
                        <a href=\"{$permalink}\">
                            {$this->get_thumbnail($post_id,$image_size)}
                        </a>
                    </div>
                    <div class=\"gvnews_postblock_content\">
                        <h3 class=\"gvnews_post_title\">
                            <a href=\"{$permalink}\">" . esc_attr( get_the_title( $post ) ) . "</a>
                        </h3>
                        {$this->post_meta_2($post)}
                    </div>
                </article>";
	}

	/**
	 * Method build_column
	 *
	 * @param object $results results.
	 * @param string $column_class column class.
	 * @param bool   $is_ajax is ajax.
	 *
	 * @return string
	 */
	public function build_column( $results, $column_class, $is_ajax ) {
		$first_block = $this->render_block_type_1( $results[0], 'gvnews-350x250' );

		$second_block = '';
		$size         = count( $results );
		for ( $i = 1; $i < $size; $i++ ) {
			$second_block .= $this->render_block_type_2( $results[ $i ], 'gvnews-120x86' );
		}

		if ( $is_ajax ) {
			return $second_block;
		}

		$content  = '<article ' . gvnews_post_class( 'gvnews_post gvnews_pl_lg_2', $results[0]->ID ) . ">
                        {$first_block}
                    </article>";
		$content .= 'gvnews_col_1o3' !== $column_class ? "<div class=\"gvnews_posts_wrap\">
                                                            <div class=\"gvnews_posts gvnews_load_more_flag\">
                                                                {$second_block}
                                                            </div>
                                                        </div>"
		: "<div class=\"gvnews_posts_wrap gvnews_load_more_flag\">
                                                            {$second_block}
                                                        </div>";

		return 'gvnews_col_1o3' !== $column_class ? $content : "<div class=\"gvnews_posts\">{$content}</div>";
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
		return $this->build_column( $result, $column_class, false );
	}

	/**
	 * Method render_column_alt
	 *
	 * @param array  $result result.
	 * @param string $column_class column class.
	 *
	 * @return string
	 */
	public function render_column_alt( $result, $column_class ) {
		return $this->build_column( $result, $column_class, true );
	}
}
