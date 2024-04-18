<?php
/**
 * Module 17
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block\Module;

/**
 * Module_17
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Module_17 extends Module_View_Abstract {

	/**
	 * Method render_block_type
	 *
	 * @param object  $post       post.
	 * @param string  $image_size image size.
	 * @param integer $type       type.
	 *
	 * @return string
	 */
	public function render_block_type( $post, $image_size, $type = 1 ) {
		$post_id   = $post->ID;
		$permalink = esc_url( get_the_permalink( $post ) );
		$post_meta = "{$this->post_meta_1($post)}
                        <div class=\"gvnews_post_excerpt\">
                            <p>" . esc_attr( $this->get_excerpt( $post ) ) . '</p>
                        </div>';
		$category  = "<div class=\"gvnews_post_category\">
                            <span>{$this->get_primary_category($post_id)}</span>
                        </div>";
		$pl        = 'gvnews_post gvnews_pl_md_1';

		if ( 2 === $type ) {
			$post_meta        = $this->post_meta_2( $post );
			$category         = '';
			$additional_class = ( ! has_post_thumbnail( $post_id ) ) ? ' no_thumbnail' : '';
			$pl               = 'gvnews_post gvnews_pl_sm' . $additional_class;
		}

		return '<article ' . gvnews_post_class( $pl, $post_id ) . '>
                    <div class="gvnews_thumb">
                        ' . gvnews_edit_post( $post_id ) . "
                        <a href=\"{$permalink}\">{$this->get_thumbnail($post_id,$image_size)}</a>
                        {$category}
                    </div>
                    <div class=\"gvnews_postblock_content\">
                        <h3 class=\"gvnews_post_title\">
                            <a href=\"{$permalink}\">" . esc_attr( get_the_title( $post ) ) . "</a>
                        </h3>
                        {$post_meta}
                    </div>
                </article>";
	}

	/**
	 * Method build_column
	 *
	 * @param array  $results results.
	 * @param string $column_class is ajax.
	 *
	 * @return string
	 */
	public function build_column( $results, $column_class ) {

		$is_col_1o3  = 'gvnews_col_1o3' === $column_class;
		$image_size  = 'gvnews-750x536';
		$first_block = '';
		$start       = 0;
		$limit       = 2;

		if ( $is_col_1o3 ) {
			$first_block = $this->render_block_type( $results[0], 'gvnews-360x180', 1 );
			$start       = 1;
		} elseif ( 'gvnews_col_3o3' === $column_class ) {
			$image_size = 'gvnews-360x180';
			$limit      = 3;
		}

		$second_block = '';
		$size         = count( $results );
		for ( $i = $start; $i < $size; $i++ ) {
			if ( $is_col_1o3 ) {
				$second_block .= $this->render_block_type( $results[ $i ], 'gvnews-120x86', 2 );
			} else {
				$second_block .= $i < $limit ? $this->render_block_type( $results[ $i ], $image_size, 1 ) : $this->render_block_type( $results[ $i ], 'gvnews-120x86', 2 );
			}
		}

		return "<div class=\"gvnews_posts_wrap\">
                    <div class=\"gvnews_posts gvnews_load_more_flag\">
                        {$first_block}
                        {$second_block}
                    </div>
                </div>";
	}

	/**
	 * Method build_column_1_alt
	 *
	 * @param array $results results.
	 *
	 * @return string
	 */
	public function build_column_1_alt( $results ) {
		$first_block = '';
		$size        = count( $results );
		for ( $i = 0; $i < $size; $i++ ) {
			$first_block .= $this->render_block_type( $results[ $i ], 'gvnews-120x86', 2 );
		}

		return $first_block;
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
		return $this->build_column( $result, $column_class );
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
		return $this->build_column_1_alt( $result );
	}
}
